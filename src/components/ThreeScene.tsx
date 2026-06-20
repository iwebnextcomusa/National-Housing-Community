import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 400;

    // Create scene with a clean light slate background
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 8, 12);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    setLoading(false);

    // Group to hold our entire community scene
    const communityGroup = new THREE.Group();
    scene.add(communityGroup);

    // Create a beautiful, subtle wireframe grid as our foundation
    const gridHelper = new THREE.GridHelper(24, 24, 0x10b981, 0x3b82f6);
    gridHelper.position.y = -1.5;
    // Cast simple slate color
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach(m => {
        m.transparent = true;
        m.opacity = 0.35;
      });
    } else {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.35;
    }
    communityGroup.add(gridHelper);

    // Create a glowing community platform disk
    const platformGeom = new THREE.CylinderGeometry(8, 8.5, 0.4, 32);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.95
    });
    const platform = new THREE.Mesh(platformGeom, platformMat);
    platform.position.y = -1.7;
    platform.receiveShadow = true;
    communityGroup.add(platform);

    // Helpers to create trees and futuristic modular houses
    const createHouse = (x: number, z: number, height: number, color: number, roofColor: number) => {
      const houseGroup = new THREE.Group();
      houseGroup.position.set(x, -1.5 + height / 2, z);

      // Body of the home
      const bodyGeom = new THREE.BoxGeometry(1.2, height, 1.2);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.2,
        metalness: 0.1,
        transparent: true,
        opacity: 0.95
      });
      const body = new THREE.Mesh(bodyGeom, bodyMat);
      body.castShadow = true;
      body.receiveShadow = true;
      houseGroup.add(body);

      // Roof (Modern sloped roof style)
      const roofGeom = new THREE.ConeGeometry(0.9, 0.8, 4);
      roofGeom.rotateY(Math.PI / 4); // Align roof square
      const roofMat = new THREE.MeshStandardMaterial({
        color: roofColor,
        roughness: 0.3,
        metalness: 0.2
      });
      const roof = new THREE.Mesh(roofGeom, roofMat);
      roof.position.y = height / 2 + 0.4;
      roof.castShadow = true;
      houseGroup.add(roof);

      // Glowing house doors/windows represented by self-illuminated small meshes
      const windowGeom = new THREE.BoxGeometry(0.3, 0.3, 0.1);
      const windowMat = new THREE.MeshBasicMaterial({ color: 0xfef08a }); // warm yellow glow

      // Front window
      const win1 = new THREE.Mesh(windowGeom, windowMat);
      win1.position.set(0, 0.2, 0.61);
      houseGroup.add(win1);

      // Side window
      const win2 = new THREE.Mesh(windowGeom, windowMat);
      win2.rotation.y = Math.PI / 2;
      win2.position.set(0.61, 0.2, 0);
      houseGroup.add(win2);

      communityGroup.add(houseGroup);
      return houseGroup;
    };

    const createTree = (x: number, z: number) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(x, -1.5, z);

      // Trunk
      const trunkGeom = new THREE.CylinderGeometry(0.12, 0.15, 1, 8);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
      const trunk = new THREE.Mesh(trunkGeom, trunkMat);
      trunk.position.y = 0.5;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Foliage green sphere
      const foliageGeom = new THREE.SphereGeometry(0.6, 8, 8);
      const foliageMat = new THREE.MeshStandardMaterial({
        color: 0x10b981, // emerald green
        roughness: 0.6,
        flatShading: true
      });
      const foliage = new THREE.Mesh(foliageGeom, foliageMat);
      foliage.position.y = 1.1;
      foliage.castShadow = true;
      treeGroup.add(foliage);

      communityGroup.add(treeGroup);
      return treeGroup;
    };

    // Plant beautiful houses in our safe community platform ring
    const houseList = [
      createHouse(-3, -2, 1.6, 0x3b82f6, 0x1e3a8a), // Blue house
      createHouse(2.5, -3, 1.3, 0x10b981, 0x064e3b), // Green house
      createHouse(-2, 3.5, 2.0, 0xf59e0b, 0x78350f), // Warm Amber house
      createHouse(3.5, 2.0, 1.4, 0x6366f1, 0x312e81), // Indigo house
      createHouse(0, 0, 2.4, 0x3b82f6, 0x1d4ed8)     // Community Center (Central)
    ];

    // Add lovely trees surrounding the houses
    const treeList = [
      createTree(-4.5, 0),
      createTree(4.2, -1),
      createTree(-1, -4.5),
      createTree(1.5, 4),
      createTree(3.5, -3.5),
      createTree(-3.5, 2.5),
      createTree(1, -2.5)
    ];

    // Orbiting community shield ring (glowing protective path metaphor)
    const ringGeom = new THREE.RingGeometry(7, 7.15, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // cyan protective orbit
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4
    });
    const orbits = new THREE.Mesh(ringGeom, ringMat);
    orbits.rotation.x = Math.PI / 2;
    orbits.position.y = -1.2;
    communityGroup.add(orbits);

    const orbitSatelliteGeom = new THREE.SphereGeometry(0.25, 16, 16);
    const orbitSatelliteMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2
    });
    const satellite = new THREE.Mesh(orbitSatelliteGeom, orbitSatelliteMat);
    communityGroup.add(satellite);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(10, 20, 15);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Beautiful cyan soft point light under the central community block
    const glowLight = new THREE.PointLight(0x06b6d4, 3, 10);
    glowLight.position.set(0, 1, 0);
    scene.add(glowLight);

    // Interaction states
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;
    let targetX = 0;
    let targetY = 0;

    // Handle mouse move to gently tilt the visual axis (interactive hover/tilt effect)
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      // Map to centralized -1 to 1 coordinates
      mouseX = (x / rect.width) * 2 - 1;
      mouseY = -(y / rect.height) * 2 + 1;
    };

    // Handle scroll events dynamically (scroll-triggered 3D dynamics)
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Handle window risizes dynamically
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse coordinates tracking with easing
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Base rotation + mouse tilt reaction (smooth camera-like tilt)
      communityGroup.rotation.y = elapsedTime * 0.08 + targetX * 0.35;
      communityGroup.rotation.x = targetY * 0.2;

      // React to scroll dynamically: shift pitch, speed up rotation, and animate scale slightly
      const scrollRatio = Math.min(scrollY / 1000, 1.2);
      communityGroup.rotation.y += scrollRatio * 0.5;
      gridHelper.position.y = -1.5 - scrollRatio * 0.4;
      platform.position.y = -1.7 - scrollRatio * 0.4;

      // Scale pulse on hover or time
      const scaleVal = 1 + Math.sin(elapsedTime * 1.5) * 0.02;
      communityGroup.scale.set(scaleVal, scaleVal, scaleVal);

      // Animate satellite path
      const satAngle = elapsedTime * 0.6;
      satellite.position.x = Math.sin(satAngle) * 7.0;
      satellite.position.z = Math.cos(satAngle) * 7.0;
      satellite.position.y = -1.2 + Math.sin(elapsedTime * 2) * 0.25;

      // Wave effect on individual houses
      houseList.forEach((house, index) => {
        house.position.y = (-1.5 + house.scale.y * 0.5) + Math.sin(elapsedTime * 2 + index * 1.5) * 0.04;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] md:h-[450px] bg-white rounded-3xl overflow-hidden shadow-sm shadow-slate-100 border border-slate-200/85">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 z-10">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-600 font-sans tracking-wide text-sm">Building Safe Community 3D Model...</p>
        </div>
      )}
      
      {/* Container where WebGL embeds */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" id="community-canvas-stage" />

      {/* Futuristic UI Frame Indicator to reinforce craft concept */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono text-blue-600 tracking-wider">PROJECT: GRID PLATFORM</span>
          <p className="text-xs font-semibold text-slate-900 tracking-tight">Interactive Community Visualization</p>
        </div>
        <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 text-[10px] font-mono text-blue-600">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping"></span>
          <span>INTERACTIVE 3D STAGE</span>
        </div>
      </div>
    </div>
  );
}
