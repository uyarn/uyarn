export interface VideoCompressOptions {
  maxWidth: number;
  videoBitsPerSecond: number;
  format: 'webm' | 'mp4';
  onProgress: (progress: number) => void;
  onStage: (stage: 'loading' | 'processing') => void;
}

const getRecorderMimeType = () =>
  ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'].find((type) =>
    MediaRecorder.isTypeSupported(type),
  );

const compressVideoToWebm = async (file: File, options: VideoCompressOptions): Promise<Blob> => {
  if (!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream) {
    throw new Error('unsupported');
  }

  const mimeType = getRecorderMimeType();
  if (!mimeType) throw new Error('unsupported');

  const url = URL.createObjectURL(file);
  const video = document.createElement('video');
  video.src = url;
  video.playsInline = true;
  video.preload = 'auto';

  try {
    await new Promise<void>((resolve, reject) => {
      video.onloadedmetadata = () => resolve();
      video.onerror = () => reject(new Error('invalid-video'));
    });

    const scale = Math.min(1, options.maxWidth / video.videoWidth);
    const width = Math.max(2, Math.round((video.videoWidth * scale) / 2) * 2);
    const height = Math.max(2, Math.round((video.videoHeight * scale) / 2) * 2);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('unsupported');

    const outputStream = canvas.captureStream(30);
    let audioContext: AudioContext | undefined;
    try {
      audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(video);
      const destination = audioContext.createMediaStreamDestination();
      source.connect(destination);
      destination.stream.getAudioTracks().forEach((track) => outputStream.addTrack(track));
    } catch {
      audioContext = undefined;
    }

    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(outputStream, {
      mimeType,
      videoBitsPerSecond: options.videoBitsPerSecond,
    });

    const result = new Promise<Blob>((resolve, reject) => {
      recorder.ondataavailable = (event) => {
        if (event.data.size) chunks.push(event.data);
      };
      recorder.onerror = () => reject(new Error('compression-failed'));
      recorder.onstop = () => resolve(new Blob(chunks, { type: mimeType.split(';')[0] }));
    });

    let animationFrame = 0;
    const drawFrame = () => {
      context.drawImage(video, 0, 0, width, height);
      options.onProgress(video.duration ? video.currentTime / video.duration : 0);
      if (!video.ended) animationFrame = requestAnimationFrame(drawFrame);
    };

    video.onended = () => recorder.stop();
    recorder.start(1000);
    await video.play();
    drawFrame();
    const blob = await result;
    cancelAnimationFrame(animationFrame);
    await audioContext?.close();
    options.onProgress(1);
    return blob;
  } finally {
    video.pause();
    URL.revokeObjectURL(url);
  }
};

let ffmpegInstance: import('@ffmpeg/ffmpeg').FFmpeg | undefined;

const FFMPEG_CORE_BASE_URL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd';

const getFFmpeg = async (onStage: VideoCompressOptions['onStage']) => {
  if (!ffmpegInstance) {
    const { FFmpeg } = await import('@ffmpeg/ffmpeg');
    ffmpegInstance = new FFmpeg();
  }
  if (!ffmpegInstance.loaded) {
    onStage('loading');
    const { toBlobURL } = await import('@ffmpeg/util');
    const [coreURL, wasmURL] = await Promise.all([
      toBlobURL(`${FFMPEG_CORE_BASE_URL}/ffmpeg-core.js`, 'text/javascript'),
      toBlobURL(`${FFMPEG_CORE_BASE_URL}/ffmpeg-core.wasm`, 'application/wasm'),
    ]);
    await ffmpegInstance.load({ coreURL, wasmURL });
  }
  return ffmpegInstance;
};

const compressVideoToMp4 = async (file: File, options: VideoCompressOptions): Promise<Blob> => {
  const [{ fetchFile }, ffmpeg] = await Promise.all([import('@ffmpeg/util'), getFFmpeg(options.onStage)]);
  options.onStage('processing');
  const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const extension = file.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'video';
  const inputName = `input-${token}.${extension}`;
  const outputName = `output-${token}.mp4`;
  const progressHandler = ({ progress }: { progress: number }) => {
    options.onProgress(Math.min(1, Math.max(0, progress)));
  };

  ffmpeg.on('progress', progressHandler);
  try {
    await ffmpeg.writeFile(inputName, await fetchFile(file));
    const bitrate = `${Math.round(options.videoBitsPerSecond / 1000)}k`;
    const exitCode = await ffmpeg.exec([
      '-i', inputName,
      '-vf', `scale=min(iw\\,${options.maxWidth}):-2`,
      '-c:v', 'libx264',
      '-preset', 'ultrafast',
      '-b:v', bitrate,
      '-maxrate', bitrate,
      '-bufsize', `${Math.round(options.videoBitsPerSecond / 500)}k`,
      '-pix_fmt', 'yuv420p',
      '-c:a', 'aac',
      '-b:a', '128k',
      '-movflags', '+faststart',
      outputName,
    ]);
    if (exitCode !== 0) throw new Error('compression-failed');
    const data = await ffmpeg.readFile(outputName);
    if (typeof data === 'string') throw new Error('compression-failed');
    options.onProgress(1);
    return new Blob([data.slice().buffer as ArrayBuffer], { type: 'video/mp4' });
  } finally {
    ffmpeg.off('progress', progressHandler);
    await Promise.allSettled([ffmpeg.deleteFile(inputName), ffmpeg.deleteFile(outputName)]);
  }
};

export const compressVideo = (file: File, options: VideoCompressOptions): Promise<Blob> => {
  if (options.format === 'mp4') return compressVideoToMp4(file, options);
  options.onStage('processing');
  return compressVideoToWebm(file, options);
};

const canvasToPng = (canvas: HTMLCanvasElement) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('conversion-failed'))), 'image/png');
  });

export const imageToIco = async (file: File): Promise<Blob> => {
  const isSvg = file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg');
  let imageSource: Blob = file;
  if (isSvg) {
    const source = await file.text();
    const parsed = new DOMParser().parseFromString(source, 'image/svg+xml');
    if (parsed.querySelector('parsererror') || parsed.documentElement.tagName.toLowerCase() !== 'svg') {
      throw new Error('invalid-image');
    }
    imageSource = new Blob([source], { type: 'image/svg+xml' });
  }

  const url = URL.createObjectURL(imageSource);
  const image = new Image();
  try {
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error('invalid-image'));
      image.src = url;
    });

    const sizes = [16, 32, 48, 64, 128, 256];
    const pngs = await Promise.all(
      sizes.map(async (size) => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('conversion-failed');
        const scale = Math.min(size / image.naturalWidth, size / image.naturalHeight);
        const width = image.naturalWidth * scale;
        const height = image.naturalHeight * scale;
        context.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);
        return new Uint8Array(await (await canvasToPng(canvas)).arrayBuffer());
      }),
    );

    const headerSize = 6 + sizes.length * 16;
    const totalSize = headerSize + pngs.reduce((total, png) => total + png.byteLength, 0);
    const buffer = new ArrayBuffer(totalSize);
    const view = new DataView(buffer);
    view.setUint16(0, 0, true);
    view.setUint16(2, 1, true);
    view.setUint16(4, sizes.length, true);

    let offset = headerSize;
    pngs.forEach((png, index) => {
      const entry = 6 + index * 16;
      const size = sizes[index];
      view.setUint8(entry, size === 256 ? 0 : size);
      view.setUint8(entry + 1, size === 256 ? 0 : size);
      view.setUint8(entry + 2, 0);
      view.setUint8(entry + 3, 0);
      view.setUint16(entry + 4, 1, true);
      view.setUint16(entry + 6, 32, true);
      view.setUint32(entry + 8, png.byteLength, true);
      view.setUint32(entry + 12, offset, true);
      new Uint8Array(buffer, offset, png.byteLength).set(png);
      offset += png.byteLength;
    });

    return new Blob([buffer], { type: 'image/x-icon' });
  } finally {
    URL.revokeObjectURL(url);
  }
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
