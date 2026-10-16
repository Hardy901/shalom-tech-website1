import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ScenePinProps {
  scrollProgress: number; // 0.0 to 1.0 throughout the 620vh container
}

export const InteractiveScenePin: React.FC<ScenePinProps> = ({ scrollProgress }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Group & Mesh references
  const masterGroupRef = useRef<THREE.Group | null>(null);
  const seedContainerRef = useRef<THREE.Group | null>(null);
  const topShellGroupRef = useRef<THREE.Group | null>(null);
  const bottomShellGroupRef = useRef<THREE.Group | null>(null);
  const creamInteriorRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Material references for opacity fading
  const shellMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const interiorMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  // Target and smoothed scroll progress
  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);

  // Mouse interaction
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDown: false, lastX: 0, lastY: 0 });

  useEffect(() => {
    targetProgress.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera Setup (FOV 40, distance 7.2)
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.2);

    // 3. Renderer with transparent background
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // 4. Studio Multi-Angle Lighting (Balanced, rich organic tone)
    const hemiLight = new THREE.HemisphereLight(0xfff9f0, 0x1a2618, 1.3);
    scene.add(hemiLight);

    const keySunLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    keySunLight.position.set(4, 6, 6);
    scene.add(keySunLight);

    const warmAmberLight = new THREE.DirectionalLight(0xe29d37, 1.5);
    warmAmberLight.position.set(-5, 2, 4);
    scene.add(warmAmberLight);

    const frontFillLight = new THREE.DirectionalLight(0xffffff, 1.1);
    frontFillLight.position.set(0, -2, 5);
    scene.add(frontFillLight);

    const backRimLight = new THREE.DirectionalLight(0xffe386, 1.6);
    backRimLight.position.set(0, 4, -5);
    scene.add(backRimLight);

    // 5. Master Scene Groups
    const masterGroup = new THREE.Group();
    masterGroupRef.current = masterGroup;
    scene.add(masterGroup);

    // Seed Container: Holds the whole seed (smaller, elegant proportion)
    const seedContainer = new THREE.Group();
    seedContainerRef.current = seedContainer;
    masterGroup.add(seedContainer);

    // Top Shell Group (lifts up on crack)
    const topShellGroup = new THREE.Group();
    topShellGroupRef.current = topShellGroup;
    seedContainer.add(topShellGroup);

    // Bottom Shell Group (lowers down on crack)
    const bottomShellGroup = new THREE.Group();
    bottomShellGroupRef.current = bottomShellGroup;
    seedContainer.add(bottomShellGroup);

    // ============================================
    // 6. LOAD JACKBLOOM 3D MODEL
    // ============================================
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/jackbloom/model.glb',
      (gltf) => {
        const root = gltf.scene;
        const foundMeshes: Record<string, THREE.Mesh> = {};

        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.geometry.computeVertexNormals();

            const name = (mesh.name || child.parent?.name || '').toLowerCase();
            if (name.includes('interior') || name.includes('cream')) {
              foundMeshes['interior'] = mesh;
            } else if (name.includes('shell') || name.includes('cutaway')) {
              foundMeshes['shell'] = mesh;
            } else if (name.includes('whole') || name.includes('seed')) {
              foundMeshes['whole'] = mesh;
            }
          }
        });

        // Roasted seed coat material (rich caramel golden brown)
        const shellMaterial = new THREE.MeshStandardMaterial({
          color: 0x986337,
          roughness: 0.52,
          metalness: 0.06,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 1.0,
        });
        shellMaterialRef.current = shellMaterial;

        // Velvety ivory cream flour interior material
        const interiorMaterial = new THREE.MeshStandardMaterial({
          color: 0xfcf6ea,
          roughness: 0.38,
          metalness: 0.03,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 1.0,
        });
        interiorMaterialRef.current = interiorMaterial;

        // Center offset to position meshes at origin (0, 0, 0)
        const centerOffsetX = -0.883;
        const centerOffsetY = 0.0;
        const centerOffsetZ = -0.190;

        if (foundMeshes['shell']) {
          // 1. TOP SHELL
          const topMesh = foundMeshes['shell'];
          topMesh.geometry.computeVertexNormals();
          topMesh.material = shellMaterial;
          topMesh.position.set(centerOffsetX, centerOffsetY, centerOffsetZ);
          topShellGroup.add(topMesh);

          // 2. BOTTOM SHELL (Mirrored along Y to form matching bottom half)
          const bottomMesh = topMesh.clone();
          bottomMesh.geometry = topMesh.geometry.clone();
          bottomMesh.material = shellMaterial;
          bottomMesh.scale.set(1, -1, 1);
          bottomMesh.position.set(centerOffsetX, centerOffsetY, centerOffsetZ);
          bottomShellGroup.add(bottomMesh);
        }

        if (foundMeshes['interior']) {
          // 3. CREAM INTERIOR KERNEL
          const interiorMesh = foundMeshes['interior'];
          interiorMesh.geometry.computeVertexNormals();
          interiorMesh.material = interiorMaterial;
          interiorMesh.position.set(centerOffsetX, centerOffsetY, centerOffsetZ);
          creamInteriorRef.current = interiorMesh;
          seedContainer.add(interiorMesh);
        }

        // Refined, smaller scale (not oversized)
        seedContainer.scale.setScalar(0.95);

        console.log('JackBloom 3D seed loaded: refined scale, clamshell crack, no product popout.');
      },
      undefined,
      (err) => console.warn('GLTF load notice:', err)
    );

    // ============================================
    // 7. FLOATING MICRO-FLOUR PARTICLES
    // ============================================
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfffbee,
      size: 0.035,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = particles;
    scene.add(particles);

    // ============================================
    // 8. MOUSE INTERACTION
    // ============================================
    const onMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (mouseRef.current.isDown) {
        const deltaX = e.clientX - mouseRef.current.lastX;
        const deltaY = e.clientY - mouseRef.current.lastY;
        mouseRef.current.targetX += deltaX * 0.005;
        mouseRef.current.targetY += deltaY * 0.005;
        mouseRef.current.lastX = e.clientX;
        mouseRef.current.lastY = e.clientY;
      }
    };

    const onMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // ============================================
    // 9. MAIN ANIMATION LOOP
    // ============================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Responsive interpolation for smooth scroll tracking
      smoothProgress.current += (targetProgress.current - smoothProgress.current) * 0.2;
      const p = smoothProgress.current;

      // Mouse drag damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      if (masterGroupRef.current) {
        masterGroupRef.current.rotation.y = mouseRef.current.x;
        masterGroupRef.current.rotation.x = mouseRef.current.y;
      }

      const seedContainer = seedContainerRef.current;
      const topShell = topShellGroupRef.current;
      const bottomShell = bottomShellGroupRef.current;
      const interior = creamInteriorRef.current;
      const shellMat = shellMaterialRef.current;
      const interiorMat = interiorMaterialRef.current;

      if (seedContainer && topShell && bottomShell) {
        // =========================================================================
        // CONTINUOUS DOWNWARD DESCENT TIMELINE:
        // Every single scroll tick moves the seed DOWN on the screen!
        // 1. 0.00 → 0.25: HERO — Starts high up (Y=+1.4, X=1.2), DROPS DOWN to Y=+0.1, cracks open!
        // 2. 0.25 → 0.65: BENEFITS — Centered in badges, continues descending from Y=+0.1 to Y=-0.45!
        // 3. 0.65 → 0.88: JOURNEY (Page 3) — Right side (X=1.1), continues descending to Y=-0.95!
        // 4. 0.88 → 1.00: DISAPPEAR — Plunges down to Y=-2.6 off-screen & fades out to 0 opacity!
        // =========================================================================

        if (p < 0.25) {
          // --- 1. HERO SECTION: VISIBLE DOWNWARD FALL & CRACK ---
          const t = p / 0.25;

          seedContainer.visible = true;

          if (shellMat) shellMat.opacity = 1.0;
          if (interiorMat) interiorMat.opacity = 1.0;

          // CONTINUOUS DOWNWARD DESCENT: Y drops from +1.40 down to +0.10!
          // X moves from +1.20 to 0.00 (centering)!
          seedContainer.position.set(
            THREE.MathUtils.lerp(1.20, 0.0, t),
            THREE.MathUtils.lerp(1.40, 0.10, t), // DIRECT, OBVIOUS DOWNWARD TRAVEL!
            THREE.MathUtils.lerp(0.0, 0.15, t)
          );

          // Seed rotation: natural tilt facing camera
          seedContainer.rotation.set(
            THREE.MathUtils.lerp(0.3, 0.08, t) + Math.sin(elapsedTime * 0.8) * 0.03,
            THREE.MathUtils.lerp(-0.4, 0.35, t) + elapsedTime * 0.06,
            THREE.MathUtils.lerp(0.12, -0.04, t)
          );

          // Smaller, refined scale
          seedContainer.scale.setScalar(THREE.MathUtils.lerp(0.85, 0.92, t));

          // NATURAL CRACK: Opens cleanly as it descends
          const crackAmount = THREE.MathUtils.clamp(t / 0.85, 0, 1);
          const crackEase = crackAmount * crackAmount * (3 - 2 * crackAmount);

          // Top shell lifts up (+0.38) & tilts back (-0.28)
          topShell.position.set(
            THREE.MathUtils.lerp(0, 0.20, crackEase),
            THREE.MathUtils.lerp(0, 0.38, crackEase),
            THREE.MathUtils.lerp(0, 0.12, crackEase)
          );
          topShell.rotation.set(
            THREE.MathUtils.lerp(0, -0.28, crackEase),
            THREE.MathUtils.lerp(0, 0.12, crackEase),
            THREE.MathUtils.lerp(0, -0.10, crackEase)
          );

          // Bottom shell lowers down (-0.18) & tilts forward (+0.12)
          bottomShell.position.set(
            THREE.MathUtils.lerp(0, -0.12, crackEase),
            THREE.MathUtils.lerp(0, -0.18, crackEase),
            THREE.MathUtils.lerp(0, -0.06, crackEase)
          );
          bottomShell.rotation.set(
            THREE.MathUtils.lerp(0, 0.12, crackEase),
            THREE.MathUtils.lerp(0, -0.08, crackEase),
            THREE.MathUtils.lerp(0, 0.05, crackEase)
          );

          if (interior) {
            interior.position.set(
              -0.883,
              0.0,
              -0.190 + THREE.MathUtils.lerp(0, 0.05, crackEase)
            );
          }
        } else if (p < 0.65) {
          // --- 2. BENEFITS SECTION: CRACKED OPEN IN CENTER, CONTINUES MOVING DOWN ---
          const t = (p - 0.25) / 0.40;

          seedContainer.visible = true;

          if (shellMat) shellMat.opacity = 1.0;
          if (interiorMat) interiorMat.opacity = 1.0;

          // CONTINUES DESCENDING: Y moves from +0.10 down to -0.45!
          seedContainer.position.set(
            0.0,
            THREE.MathUtils.lerp(0.10, -0.45, t) + Math.sin(elapsedTime * 0.7) * 0.03, // TRAVELS DOWN!
            0.15
          );

          // Turntable spin showing cream kernel
          seedContainer.rotation.set(
            0.08 + Math.sin(elapsedTime * 0.5) * 0.02,
            0.35 + t * Math.PI * 1.5 + elapsedTime * 0.05,
            -0.04
          );

          seedContainer.scale.setScalar(0.92);

          // Keep open clamshell
          topShell.position.set(0.20, 0.38, 0.12);
          topShell.rotation.set(-0.28, 0.12, -0.10);

          bottomShell.position.set(-0.12, -0.18, -0.06);
          bottomShell.rotation.set(0.12, -0.08, 0.05);

          if (interior) {
            interior.position.set(-0.883, 0.0, -0.190 + 0.05);
          }
        } else if (p < 0.88) {
          // --- 3. JACKFRUIT JOURNEY (PAGE 3): RIGHT SIDE, CONTINUES MOVING DOWN ---
          const t = (p - 0.65) / 0.23;

          seedContainer.visible = true;

          if (shellMat) shellMat.opacity = 1.0;
          if (interiorMat) interiorMat.opacity = 1.0;

          // CONTINUES DESCENDING: Y moves from -0.45 down to -0.95!
          // X moves to +1.10 (right side beside "JACKFRUIT")!
          seedContainer.position.set(
            THREE.MathUtils.lerp(0.0, 1.10, t),
            THREE.MathUtils.lerp(-0.45, -0.95, t) + Math.sin(elapsedTime * 0.6) * 0.03, // TRAVELS DOWN!
            0.10
          );

          seedContainer.rotation.set(
            0.08,
            0.35 + Math.PI * 1.5 + t * 0.4,
            -0.04
          );

          seedContainer.scale.setScalar(THREE.MathUtils.lerp(0.92, 0.82, t));

          // Retain open cracked state
          topShell.position.set(0.20, 0.38, 0.12);
          topShell.rotation.set(-0.28, 0.12, -0.10);

          bottomShell.position.set(-0.12, -0.18, -0.06);
          bottomShell.rotation.set(0.12, -0.08, 0.05);

          if (interior) {
            interior.position.set(-0.883, 0.0, -0.190 + 0.05);
          }
        } else {
          // --- 4. DISAPPEAR AFTER PAGE 3: PLUNGES DOWN TO Y=-2.6 & FADES OUT ---
          const t = THREE.MathUtils.clamp((p - 0.88) / 0.12, 0, 1);

          if (t >= 0.98) {
            seedContainer.visible = false;
          } else {
            seedContainer.visible = true;

            // Plunges down off the bottom of the screen!
            seedContainer.position.set(
              1.10,
              THREE.MathUtils.lerp(-0.95, -2.60, t), // PLUNGES OFF BOTTOM!
              0.10
            );
            seedContainer.scale.setScalar(THREE.MathUtils.lerp(0.82, 0.20, t));

            const fadeOpacity = THREE.MathUtils.lerp(1.0, 0.0, t);
            if (shellMat) shellMat.opacity = fadeOpacity;
            if (interiorMat) interiorMat.opacity = fadeOpacity;
          }
        }
      }

      // Floating particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.02;
        particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.015) * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Handle Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      id="coconut-canvas-pin"
      className="h-screen sticky top-0 left-0 w-full overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <div
        ref={mountRef}
        className="w-full h-full relative"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
};
