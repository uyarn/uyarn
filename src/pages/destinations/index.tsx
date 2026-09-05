import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Image, ImageViewer } from 'tdesign-react';

import RootContext from '@/layouts/rootContext';
import { ELang } from '@/hooks/useLang';
import { EThemes } from '@/hooks/useMode';
import { destinationMetadata } from './trips';
import type { TripRecord } from './trips';
import styles from './index.module.css';

const HOME: [number, number] = [22.5431, 114.0579];
const INITIAL_FOCUS: [number, number] = [35, 105];
const EARTH_RADIUS = 2;

function pointOnEarth([lat, lng]: [number, number], radius = EARTH_RADIUS): THREE.Vector3 {
  const latitude = THREE.MathUtils.degToRad(lat);
  const longitude = THREE.MathUtils.degToRad(lng);
  return new THREE.Vector3(
    radius * Math.cos(latitude) * Math.cos(longitude),
    radius * Math.sin(latitude),
    -radius * Math.cos(latitude) * Math.sin(longitude),
  );
}

function northUpOrientation(coordinates: [number, number]): THREE.Quaternion {
  const forward = pointOnEarth(coordinates).normalize();
  const north = new THREE.Vector3(0, 1, 0)
    .sub(forward.clone().multiplyScalar(forward.y))
    .normalize();
  const right = north.clone().cross(forward).normalize();
  return new THREE.Quaternion()
    .setFromRotationMatrix(new THREE.Matrix4().makeBasis(right, north, forward))
    .invert();
}

interface GlobeState {
  group: THREE.Group;
  targetQuaternion: THREE.Quaternion | null;
  targetDistance: number | null;
  pins: THREE.Mesh[];
  arcs: THREE.Line[];
  controls: OrbitControls;
}

interface AlbumNode {
  name: string;
  type: string;
  originPath?: string;
  children?: AlbumNode[];
}

const ALBUMS_ENDPOINT = 'https://1251590861-3vml8627u8.ap-shanghai.tencentscf.com/images';

function findAlbum(nodes: AlbumNode[], name: string): AlbumNode | undefined {
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index];
    if (node.name.toLowerCase() === name.toLowerCase()) return node;
    const nested = node.children ? findAlbum(node.children, name) : undefined;
    if (nested) return nested;
  }
  return undefined;
}

function recordsFromTravelAlbum(nodes: AlbumNode[]): TripRecord[] {
  const travel = nodes.find((node) => node.type === 'directory' && node.name.toLowerCase() === 'travel');
  if (!travel?.children) return [];

  return travel.children
    .map((album): TripRecord | null => {
      const match = album.name.match(/^(\d{4})\.(\d{2})-(.+)$/);
      if (!match || album.type !== 'directory') return null;
      const [, year, month, rawDestination] = match;
      const metadata = destinationMetadata[rawDestination.toLowerCase()];
      if (!metadata) return null;
      const destination = rawDestination.charAt(0).toUpperCase() + rawDestination.slice(1);
      return {
        date: `${year}-${month}-01`,
        destination,
        country: metadata.country,
        coordinates: metadata.coordinates,
        album: album.name,
      };
    })
    .filter((record): record is TripRecord => record !== null)
    .sort((first, second) => second.date.localeCompare(first.date));
}

const TripGlobe = ({
  active,
  dark,
  records,
  focusVersion,
  resetVersion,
  onSelect,
}: {
  active: number | null;
  dark: boolean;
  records: TripRecord[];
  focusVersion: number;
  resetVersion: number;
  onSelect: (index: number) => void;
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<GlobeState | null>(null);
  const activeRef = useRef(active);
  activeRef.current = active;
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const sceneActive = activeRef.current;
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0.15, sceneActive === null ? 7.4 : 5.25);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.055;
    controls.enablePan = false;
    controls.minDistance = 4.6;
    controls.maxDistance = 10;
    controls.rotateSpeed = 0.45;
    controls.zoomSpeed = 0.65;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.28;

    const textureLoader = new THREE.TextureLoader();
    const dayMap = textureLoader.load('/textures/earth/day.jpg');
    const normalMap = textureLoader.load('/textures/earth/normal.jpg');
    const specularMap = textureLoader.load('/textures/earth/specular.jpg');
    const cloudsMap = textureLoader.load('/textures/earth/clouds.png');
    const textures = [dayMap, normalMap, specularMap, cloudsMap];
    for (let textureIndex = 0; textureIndex < textures.length; textureIndex += 1) {
      const loadedTexture = textures[textureIndex];
      loadedTexture.colorSpace = loadedTexture === normalMap || loadedTexture === specularMap ? THREE.NoColorSpace : THREE.SRGBColorSpace;
      loadedTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    }

    const earthGroup = new THREE.Group();
    earthGroup.quaternion.copy(northUpOrientation(
      sceneActive === null || !records[sceneActive] ? INITIAL_FOCUS : records[sceneActive].coordinates,
    ));
    scene.add(earthGroup);

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_RADIUS, 96, 96),
      new THREE.MeshPhongMaterial({
        map: dayMap,
        normalMap,
        normalScale: new THREE.Vector2(0.32, 0.32),
        specularMap,
        specular: new THREE.Color(0x5e7388),
        shininess: 18,
      }),
    );
    earthGroup.add(earth);

    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_RADIUS * 1.008, 96, 96),
      new THREE.MeshPhongMaterial({ map: cloudsMap, transparent: true, opacity: 0.6, depthWrite: false }),
    );
    earthGroup.add(clouds);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_RADIUS * 1.022, 96, 96),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
            vPosition = viewPosition.xyz;
            gl_Position = projectionMatrix * viewPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vec3 viewDirection = normalize(-vPosition);
            float rim = pow(1.0 - max(dot(vNormal, viewDirection), 0.0), 3.1);
            gl_FragColor = vec4(0.12, 0.38, 0.92, rim * 0.28);
          }
        `,
      }),
    );
    earthGroup.add(atmosphere);

    const sun = new THREE.DirectionalLight(0xffffff, 4.2);
    sun.position.set(-4, 2.5, 5);
    scene.add(sun);
    scene.add(new THREE.HemisphereLight(dark ? 0x496ca0 : 0xbad8ed, dark ? 0x02040a : 0x637c91, dark ? 0.3 : 0.52));

    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i += 1) {
      const radius = 18 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.cos(phi);
      starPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    scene.add(new THREE.Points(starGeometry, new THREE.PointsMaterial({
      color: dark ? 0xffffff : 0x71859a,
      size: dark ? 0.025 : 0.018,
      transparent: true,
      opacity: dark ? 0.72 : 0.24,
    })));

    const pins: THREE.Mesh[] = [];
    const arcs: THREE.Line[] = [];
    const origin = pointOnEarth(HOME, EARTH_RADIUS * 1.016);
    records.forEach((trip, index) => {
      const destination = pointOnEarth(trip.coordinates, EARTH_RADIUS * 1.018);
      const distance = origin.distanceTo(destination);
      const midpoint = origin.clone().add(destination).multiplyScalar(0.5).normalize().multiplyScalar(EARTH_RADIUS + 0.18 + distance * 0.15);
      const curve = new THREE.QuadraticBezierCurve3(origin, midpoint, destination);
      const arc = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(72)),
        new THREE.LineBasicMaterial({ color: 0xffbf36, transparent: true, opacity: index === sceneActive ? 0.95 : 0.28 }),
      );
      earthGroup.add(arc);
      arcs.push(arc);

      const pin = new THREE.Mesh(
        new THREE.SphereGeometry(index === sceneActive ? 0.04 : 0.025, 20, 20),
        new THREE.MeshBasicMaterial({ color: index === sceneActive ? 0xffffff : 0xffbe32 }),
      );
      pin.position.copy(destination);
      pin.userData.index = index;
      earthGroup.add(pin);
      pins.push(pin);

      const halo = new THREE.Mesh(
        new THREE.RingGeometry(0.04, 0.058, 32),
        new THREE.MeshBasicMaterial({ color: 0xffbe32, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false }),
      );
      halo.position.copy(destination.clone().multiplyScalar(1.003));
      halo.lookAt(destination.clone().multiplyScalar(2));
      earthGroup.add(halo);
    });

    stateRef.current = { group: earthGroup, targetQuaternion: null, targetDistance: null, pins, arcs, controls };

    const raycaster = new THREE.Raycaster();
    raycaster.params.Points.threshold = 0.1;
    const pointer = new THREE.Vector2();
    let pointerStart = { x: 0, y: 0 };
    const onPointerDown = (event: PointerEvent) => {
      pointerStart = { x: event.clientX, y: event.clientY };
      controls.autoRotate = false;
    };
    const onPointerUp = (event: PointerEvent) => {
      if (Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 5) return;
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -((event.clientY - bounds.top) / bounds.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(pins)[0];
      if (hit) onSelectRef.current(hit.object.userData.index);
    };
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    let frame = 0;
    const animate = (time = 0) => {
      frame = requestAnimationFrame(animate);
      const elapsed = time / 1000;
      clouds.rotation.y = elapsed * 0.006;
      pins.forEach((pin, index) => {
        const pulse = index === activeRef.current ? 1 + Math.sin(elapsed * 4) * 0.18 : 1;
        pin.scale.setScalar(pulse);
      });
      if (stateRef.current?.targetQuaternion) {
        earthGroup.quaternion.slerp(stateRef.current.targetQuaternion, 0.045);
        if (earthGroup.quaternion.angleTo(stateRef.current.targetQuaternion) < 0.004) stateRef.current.targetQuaternion = null;
      }
      if (stateRef.current?.targetDistance) {
        const currentDistance = camera.position.length();
        const nextDistance = THREE.MathUtils.lerp(currentDistance, stateRef.current.targetDistance, 0.055);
        camera.position.setLength(nextDistance);
        if (Math.abs(nextDistance - stateRef.current.targetDistance) < 0.01) stateRef.current.targetDistance = null;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.dispose();
      scene.traverse((object) => {
        const disposable = object as THREE.Mesh;
        disposable.geometry?.dispose();
        const { material } = disposable;
        if (Array.isArray(material)) material.forEach((item) => item.dispose());
        else material?.dispose();
      });
      textures.forEach((loadedTexture) => loadedTexture.dispose());
      mount.removeChild(renderer.domElement);
      stateRef.current = null;
    };
  }, [dark, records]);

  useEffect(() => {
    const globeState = stateRef.current;
    if (!globeState) return;
    globeState.pins.forEach((pin, index) => {
      const material = pin.material as THREE.MeshBasicMaterial;
      material.color.set(index === active ? 0xffffff : 0xffbe32);
    });
    globeState.arcs.forEach((arc, index) => {
      const material = arc.material as THREE.LineBasicMaterial;
      material.opacity = index === active ? 0.95 : 0.22;
    });
    if (active === null || !records[active]) return;
    globeState.targetQuaternion = northUpOrientation(records[active].coordinates);
    globeState.targetDistance = 5.25;
    globeState.controls.autoRotate = false;
  }, [active, focusVersion, records]);

  useEffect(() => {
    if (resetVersion === 0) return;
    const globeState = stateRef.current;
    if (!globeState) return;
    globeState.targetQuaternion = northUpOrientation(INITIAL_FOCUS);
    globeState.targetDistance = 7.4;
    globeState.controls.autoRotate = true;
  }, [resetVersion]);

  return <div className={styles.globe} ref={mountRef} aria-label="Interactive realistic 3D Earth showing trip destinations" />;
};

export default () => {
  const { lang, mode } = useContext(RootContext);
  const dark = mode !== EThemes.light;
  const [active, setActive] = useState<number | null>(null);
  const [focusVersion, setFocusVersion] = useState(0);
  const [resetVersion, setResetVersion] = useState(0);
  const [albums, setAlbums] = useState<AlbumNode[]>([]);
  const [records, setRecords] = useState<TripRecord[]>([]);
  const [albumLoading, setAlbumLoading] = useState(true);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const selectTrip = useCallback((index: number) => {
    setActive(index);
    setFocusVersion((version) => version + 1);
    setViewerVisible(false);
  }, []);
  const selected = active === null ? null : records[active];
  const selectedAlbum = selected ? findAlbum(albums, selected.album) : undefined;
  const remoteAlbumImages = selectedAlbum?.children
    ?.filter((node) => node.type === 'file' && node.originPath)
    .map((node) => node.originPath as string) || [];
  const albumImages = remoteAlbumImages;

  useEffect(() => {
    let mounted = true;
    fetch(ALBUMS_ENDPOINT)
      .then((response) => {
        if (!response.ok) throw new Error(`Album request failed: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (mounted) {
          const albumNodes = Array.isArray(data) ? data : [];
          setAlbums(albumNodes);
          setRecords(recordsFromTravelAlbum(albumNodes));
        }
      })
      .catch(() => {
        if (mounted) setAlbums([]);
      })
      .finally(() => {
        if (mounted) setAlbumLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const resetGlobe = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (viewerVisible || target.closest('[class*="t-image-viewer"]') || target.closest('[data-destinations-interactive]')) return;
    setActive(null);
    setViewerVisible(false);
    setResetVersion((version) => version + 1);
  };

  return (
    <main className={`${styles.page} ${dark ? styles.dark : styles.light}`} onClick={resetGlobe}>
      <section className={`${styles.hero} ${selected ? styles.hasAlbum : styles.noAlbum}`}>
        <div className={styles.intro}>
          <div className={styles.destinationList} aria-label="Trip destinations" data-destinations-interactive>
            {records.map((trip, index) => (
              <button
                type="button"
                key={`${trip.date}-${trip.destination}`}
                className={`${styles.destinationItem} ${active === index ? styles.active : ''}`}
                onClick={() => selectTrip(index)}
              >
                <span>{(index + 1).toString().padStart(2, '0')}</span>
                <span className={styles.destinationMeta}>
                  <strong>{trip.destination}</strong>
                  <small>{trip.country}</small>
                </span>
                <time>{new Date(`${trip.date}T00:00:00`).toLocaleDateString(lang === ELang.zhCN ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'short' })}</time>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.globeWrap} data-destinations-interactive>
          <TripGlobe active={active} dark={dark} records={records} focusVersion={focusVersion} resetVersion={resetVersion} onSelect={selectTrip} />
          <div className={styles.controls}><span>DRAG TO ORBIT</span><i /><span>SCROLL TO ZOOM</span></div>
        </div>
        {selected && (
          <aside className={styles.albumPanel} aria-live="polite" data-destinations-interactive>
            <div className={styles.albumHeading}>
              <span>Selected album</span>
              <strong>{selected.destination}</strong>
            </div>
            {albumLoading && <div className={styles.albumStatus}>Loading photos…</div>}
            {!albumLoading && albumImages.length === 0 && <div className={styles.albumStatus}>No photos found</div>}
            {albumImages.length > 0 && (
              <div className={styles.albumGrid}>
                {albumImages.slice(0, 3).map((src, index) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`${selected.destination} trip ${index + 1}`}
                    fit="cover"
                    lazy
                    className={styles.albumImage}
                    onClick={() => {
                      setViewerIndex(index);
                      setViewerVisible(true);
                    }}
                  />
                ))}
                {albumImages.length > 3 && <span className={styles.morePhotos}>+{albumImages.length - 3} photos</span>}
              </div>
            )}
            <ImageViewer
              images={albumImages}
              index={viewerIndex}
              visible={viewerVisible}
              trigger={() => null}
              zIndex={10000}
              onIndexChange={(index) => setViewerIndex(index)}
              onClose={() => setViewerVisible(false)}
            />
          </aside>
        )}
      </section>

    </main>
  );
};
