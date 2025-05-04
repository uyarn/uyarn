import React, { useEffect, useContext } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ImageViewer, List, Loading } from 'tdesign-react';

import RootContext from '@/layouts/rootContext';
import queryPostList from '@/requests/query-post-list';

const scene: THREE.Scene = new THREE.Scene();
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
    const geometry = new THREE.SphereGeometry(5, 64, 64);

    // Load Earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('./texture.png');

    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
    });

    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Add light
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Position camera
    camera.position.z = 10;

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      earth.rotation.y += 0.001;
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }, []);
  return <div className="pages-album" />;
};
