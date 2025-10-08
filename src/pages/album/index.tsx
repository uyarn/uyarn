import React, { useEffect, useContext } from 'react';
import { ImageViewer, List, Loading } from 'tdesign-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import RootContext from '@/layouts/rootContext';
import queryPostList from '@/requests/query-post-list';

const scene: THREE.Scene = new THREE.Scene();
const points: any = [];
export default () => {
  const { data: postList } = queryPostList();
  const { mode } = useContext(RootContext);

  useEffect(() => {
    if (mode === 'dark') {
      scene.background = new THREE.Color('#000');
    } else {
      scene.background = new THREE.Color('#fff');
    }
  }, [mode]);

  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.pages-album')?.appendChild(renderer.domElement);
    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.5;

    // Create Earth sphere
    const geometry = new THREE.SphereGeometry(5, 32, 32, 9.45);

    // Load Earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('./test.jpg');

    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Add light
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 3, 5);
    scene.add(directionalLight);

    const travelPoints = [
      { lon: -28.06, lat: 41.65 },
      { lon: -104.06, lat: 30.65 },
      { lon: -114.06, lat: 22.1 },
      { lon: 0.118092, lat: 51.509865 },
    ];

    function onClick(event: any) {
      // 计算鼠标点击位置
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // 更新射线投射器
      raycaster.update();
      raycaster.setFromCamera(mouse, camera);

      // 检测与物体的交集
      const intersects = raycaster.intersectObjects(points);

      if (intersects.length > 0) {
        // 如果点击到点，变更该点的颜色为红色
        console.log(1, 1);
      }
    }

    const addPoint = (lat: number, lon: number) => {
      // 经纬度转XYZ坐标
      const phi = THREE.MathUtils.degToRad(90 - lat); // 纬度
      const theta = THREE.MathUtils.degToRad(lon + 180); // 经度

      const x = 5 * Math.sin(phi) * Math.cos(theta);
      const y = 5 * Math.cos(phi);
      const z = 5 * Math.sin(phi) * Math.sin(theta);

      const pointGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff6347 });
      const point = new THREE.Mesh(pointGeometry, pointMaterial);

      point.position.set(x, y, z);
      scene.add(point);
      points.push(point);
    };

    travelPoints.forEach((point) => {
      addPoint(point.lat, point.lon);
    });

    function updatePointPositions() {
      points.forEach((point: any) => {
        const lon = Math.atan2(point.position.z, point.position.x) * (180 / Math.PI) + 180;
        const lat = Math.acos(point.position.y / 5) * (180 / Math.PI) - 90;

        // 更新点的位置，这里是根据地球的旋转来更新点的位置
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + earth.rotation.y * (180 / Math.PI)) * (Math.PI / 180);

        const x = 5 * Math.sin(phi) * Math.cos(theta);
        const y = 5 * Math.cos(phi);
        const z = 5 * Math.sin(phi) * Math.sin(theta);

        point.position.set(point.position.x, point.position.y + 0.002, point.position.z);
      });
    }

    // Position camera
    camera.position.z = 10;

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      // earth.rotation.y += 0.002;
      // Recalculate the point position based on Earth's rotation
      // updatePointPositions();

      controls.update();
      renderer.render(scene, camera);
    }

    window.addEventListener('click', onClick, false);
    animate();
  }, []);
  return <div className="pages-album" />;
};
