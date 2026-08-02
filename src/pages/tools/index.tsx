import React, { ChangeEvent, useContext, useRef, useState } from 'react';
import { Button, Input, Loading, Progress, QRCode, Select, Space, Tabs, Typography } from 'tdesign-react';
import { DownloadIcon, FileAddIcon } from 'tdesign-icons-react';

import RootContext from '@/layouts/rootContext';
import { compressVideo, downloadBlob, imageToIco } from './utils';
import Style from './index.module.css';

const { TabPanel } = Tabs;

const baseName = (filename: string) => filename.replace(/\.[^.]+$/, '');

export default () => {
  const { currentLang } = useContext(RootContext);
  const text = currentLang.tools;
  const [videoFile, setVideoFile] = useState<File>();
  const [imageFile, setImageFile] = useState<File>();
  const [maxWidth, setMaxWidth] = useState(1280);
  const [bitrate, setBitrate] = useState(2_500_000);
  const [format, setFormat] = useState<'webm' | 'mp4'>('webm');
  const [progress, setProgress] = useState(0);
  const [videoStage, setVideoStage] = useState<'loading' | 'processing'>('processing');
  const [videoBusy, setVideoBusy] = useState(false);
  const [icoBusy, setIcoBusy] = useState(false);
  const [videoError, setVideoError] = useState('');
  const [icoError, setIcoError] = useState('');
  const [qrValue, setQrValue] = useState('https://uyarn.me');
  const [qrIcon, setQrIcon] = useState('');
  const qrCodeRef = useRef<HTMLDivElement>(null);
  let videoActionText = text.video.action;
  if (videoBusy) videoActionText = videoStage === 'loading' ? text.video.loadingResources : text.video.processing;

  const selectFile = (setter: React.Dispatch<React.SetStateAction<File | undefined>>) =>
    (event: ChangeEvent<HTMLInputElement>) => setter(event.target.files?.[0]);

  const handleCompress = async () => {
    if (!videoFile) return;
    setVideoBusy(true);
    setVideoError('');
    setProgress(0);
    setVideoStage(format === 'mp4' ? 'loading' : 'processing');
    try {
      const blob = await compressVideo(videoFile, {
        maxWidth,
        videoBitsPerSecond: bitrate,
        format,
        onProgress: setProgress,
        onStage: setVideoStage,
      });
      downloadBlob(blob, `${baseName(videoFile.name)}-compressed.${format}`);
    } catch {
      setVideoError(text.video.error);
    } finally {
      setVideoBusy(false);
    }
  };

  const handleConvert = async () => {
    if (!imageFile) return;
    setIcoBusy(true);
    setIcoError('');
    try {
      const blob = await imageToIco(imageFile);
      downloadBlob(blob, `${baseName(imageFile.name)}.ico`);
    } catch {
      setIcoError(text.ico.error);
    } finally {
      setIcoBusy(false);
    }
  };

  const handleQrIcon = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setQrIcon(typeof reader.result === 'string' ? reader.result : '');
    reader.readAsDataURL(file);
    input.value = '';
  };

  const handleDownloadQrCode = () => {
    const canvas = qrCodeRef.current?.querySelector('canvas');
    canvas?.toBlob((blob) => {
      if (blob) downloadBlob(blob, 'qrcode.png');
    }, 'image/png');
  };

  return (
    <div className={Style.pageTools}>
      <Tabs defaultValue="video">
        <TabPanel value="video" label={text.video.title}>
          <div className={Style.panel}>
            <Space direction="vertical" size={20} className={Style.form}>
              <Typography.Text>{text.video.description}</Typography.Text>
              <label>
                <input type="file" accept="video/*" hidden onChange={selectFile(setVideoFile)} />
                <Button tag="div" variant="outline" icon={<FileAddIcon />} disabled={videoBusy}>
                  {text.selectFile}
                </Button>
              </label>
              {videoFile && <span className={Style.fileName}>{videoFile.name}</span>}
              <Space breakLine>
                <Select
                  label={text.video.format}
                  value={format}
                  onChange={(value) => setFormat(value as 'webm' | 'mp4')}
                  options={[
                    { label: 'WebM', value: 'webm' },
                    { label: 'MP4 (H.264)', value: 'mp4' },
                  ]}
                />
                <Select
                  label={text.video.resolution}
                  value={maxWidth}
                  onChange={(value) => setMaxWidth(Number(value))}
                  options={[
                    { label: '480p', value: 854 },
                    { label: '720p', value: 1280 },
                    { label: '1080p', value: 1920 },
                  ]}
                />
                <Select
                  label={text.video.quality}
                  value={bitrate}
                  onChange={(value) => setBitrate(Number(value))}
                  options={[
                    { label: text.video.qualityLow, value: 1_000_000 },
                    { label: text.video.qualityMedium, value: 2_500_000 },
                    { label: text.video.qualityHigh, value: 5_000_000 },
                  ]}
                />
              </Space>
              <Typography.Text theme="secondary">
                {format === 'mp4' ? text.video.mp4Note : text.video.webmNote}
              </Typography.Text>
              <div className={Style.actions}>
                <Button theme="primary" loading={videoBusy} disabled={!videoFile} onClick={handleCompress}>
                  {videoActionText}
                </Button>
              </div>
              {videoBusy && videoStage === 'loading' && <Loading text={text.video.loadingResources} />}
              {videoBusy && videoStage === 'processing' && (
                <Progress className={Style.progress} percentage={Math.round(progress * 100)} />
              )}
              {videoError && <Typography.Text theme="error">{videoError}</Typography.Text>}
            </Space>
          </div>
        </TabPanel>
        <TabPanel value="ico" label={text.ico.title}>
          <div className={Style.panel}>
            <Space direction="vertical" size={20} className={Style.form}>
              <Typography.Text>{text.ico.description}</Typography.Text>
              <label>
                <input type="file" accept="image/*,.svg" hidden onChange={selectFile(setImageFile)} />
                <Button tag="div" variant="outline" icon={<FileAddIcon />} disabled={icoBusy}>
                  {text.selectFile}
                </Button>
              </label>
              {imageFile && <span className={Style.fileName}>{imageFile.name}</span>}
              <div className={Style.actions}>
                <Button theme="primary" loading={icoBusy} disabled={!imageFile} onClick={handleConvert}>
                  {text.ico.action}
                </Button>
              </div>
              {icoError && <Typography.Text theme="error">{icoError}</Typography.Text>}
            </Space>
          </div>
        </TabPanel>
        <TabPanel value="qrcode" label={text.qrcode.title}>
          <div className={Style.panel}>
            <div className={Style.qrLayout}>
              <Space direction="vertical" size={20} className={Style.qrForm}>
                <Typography.Text>{text.qrcode.description}</Typography.Text>
                <Input
                  value={qrValue}
                  placeholder={text.qrcode.urlPlaceholder}
                  onChange={(value) => setQrValue(value)}
                />
                <div className={Style.actions}>
                  <label>
                    <input type="file" accept="image/*" hidden onChange={handleQrIcon} />
                    <Button tag="div" variant="outline" icon={<FileAddIcon />}>
                      {text.qrcode.selectIcon}
                    </Button>
                  </label>
                  {qrIcon && (
                    <Button variant="text" onClick={() => setQrIcon('')}>
                      {text.qrcode.removeIcon}
                    </Button>
                  )}
                </div>
              </Space>
              <div className={Style.qrPreview}>
                <div ref={qrCodeRef}>
                  <QRCode value={qrValue || ' '} icon={qrIcon} iconSize={48} level={qrIcon ? 'H' : 'M'} size={240} />
                </div>
                <Button
                  theme="primary"
                  icon={<DownloadIcon />}
                  disabled={!qrValue.trim()}
                  onClick={handleDownloadQrCode}
                >
                  {text.qrcode.download}
                </Button>
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};
