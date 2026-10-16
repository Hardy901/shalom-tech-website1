import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Sparkles, RotateCcw } from 'lucide-react';

export const Hero3DSeed: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  // States: 'seed' | 'milling' | 'atta'
  const [mode, setMode] = useState<'seed' | 'milling' | 'atta'>('seed');

  // Animation progress refs (0 = whole seed, 1 = bowl filled with atta)
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const isMillingStreamActive = useRef(false);

  // 360° Mouse drag orbit
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isDown: false,
    lastX: 0,
    lastY: 0,
  });

  // Handle transformation triggers
  const handleStartMilling = () => {
    setMode('milling');
    targetProgress.current = 1;
    isMillingStreamActive.current = true;

    // Settle into atta mode after stream finishes
    setTimeout(() => {
      isMillingStreamActive.current = false;
      setMode('atta');
    }, 2200);
  };

  const handleResetToSeed = () => {
    setMode('seed');
    targetProgress.current = 0;
    isMillingStreamActive.current = false;
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    // Balanced, elegant editorial 3D perspective with generous breathing room
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    const aspect = width / height;
    camera.position.set(0, 1.85, 4.6 / Math.min(1.0, Math.max(0.62, aspect)));
    camera.lookAt(0, 0.18, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mountRef.current.appendChild(renderer.domElement);

    // ==========================================
    // 1. Studio Lighting Setup
    // ==========================================
    const hemiLight = new THREE.HemisphereLight(0xfffaee, 0x1a2618, 1.7);
    scene.add(hemiLight);

    const keySunLight = new THREE.DirectionalLight(0xfffaed, 2.6);
    keySunLight.position.set(4, 5, 5);
    scene.add(keySunLight);

    const topFlourLight = new THREE.DirectionalLight(0xfffdf5, 2.0);
    topFlourLight.position.set(0, 4.5, 2);
    scene.add(topFlourLight);

    const warmAmberLight = new THREE.DirectionalLight(0xe29d37, 1.8);
    warmAmberLight.position.set(-4, 2, 3);
    scene.add(warmAmberLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.1);
    fillLight.position.set(0, -2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffe386, 2.0);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // ==========================================
    // 2. Root Group & Seed Setup
    // ==========================================
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Seed Container: Holds the proportional seed
    const seedContainer = new THREE.Group();
    rootGroup.add(seedContainer);
    seedContainer.position.set(0, 0.18, 0);

    let wholeMesh: THREE.Mesh | null = null;

    // Load authentic 3D Seed GLB
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
            if (name.includes('whole') || name.includes('seed')) {
              foundMeshes['whole'] = mesh;
            } else if (name.includes('shell') || name.includes('cutaway')) {
              foundMeshes['cutaway'] = mesh;
            }
          }
        });

        const seedShellMaterial = new THREE.MeshStandardMaterial({
          color: 0x9e673c, // warm organic golden-brown jackfruit seed coat
          roughness: 0.52,
          metalness: 0.04,
          side: THREE.DoubleSide,
        });

        if (foundMeshes['whole']) {
          wholeMesh = foundMeshes['whole'];
          wholeMesh.geometry.computeVertexNormals();
          wholeMesh.geometry.center();
          wholeMesh.material = seedShellMaterial;
          seedContainer.add(wholeMesh);
        } else if (foundMeshes['cutaway']) {
          wholeMesh = foundMeshes['cutaway'];
          wholeMesh.geometry.computeVertexNormals();
          wholeMesh.geometry.center();
          wholeMesh.material = seedShellMaterial;
          seedContainer.add(wholeMesh);
        }

        seedContainer.scale.setScalar(0.65);
      },
      undefined,
      (err) => console.warn('GLTF load error:', err)
    );

    // ==========================================
    // 3. Artisanal Ceramic Bowl & Powder Flour (Perfect Proportion & Zero Clipping)
    // ==========================================
    const bowlContainer = new THREE.Group();
    rootGroup.add(bowlContainer);
    bowlContainer.position.set(0, -0.05, 0);
    bowlContainer.scale.setScalar(0.001); // starts hidden below

    // 3a. Handcrafted Ceramic Bowl (LatheGeometry with authentic proportions)
    const bowlPoints: THREE.Vector2[] = [
      new THREE.Vector2(0.00, 0.00), // foot base center
      new THREE.Vector2(0.38, 0.00), // foot flat ring
      new THREE.Vector2(0.42, 0.04), // foot rise
      new THREE.Vector2(0.58, 0.18), // lower ceramic curve
      new THREE.Vector2(0.78, 0.42), // mid body flare
      new THREE.Vector2(0.92, 0.68), // upper body flare
      new THREE.Vector2(0.96, 0.80), // outer rim lip
      new THREE.Vector2(0.93, 0.83), // rounded rim top
      new THREE.Vector2(0.88, 0.82), // inner rim lip
      new THREE.Vector2(0.84, 0.68), // inner upper wall
      new THREE.Vector2(0.70, 0.42), // inner mid wall
      new THREE.Vector2(0.50, 0.18), // inner lower wall
      new THREE.Vector2(0.00, 0.12), // inner bowl floor
    ];
    const bowlGeo = new THREE.LatheGeometry(bowlPoints, 64);
    bowlGeo.computeVertexNormals();

    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0x143222, // brand deep forest glazed ceramic
      roughness: 0.28,
      metalness: 0.10,
      side: THREE.DoubleSide,
    });
    const bowlMesh = new THREE.Mesh(bowlGeo, ceramicMat);
    bowlContainer.add(bowlMesh);

    // 3b. Elegant Gold Rim Accent Ring
    const goldRimGeo = new THREE.TorusGeometry(0.92, 0.02, 16, 64);
    goldRimGeo.rotateX(Math.PI / 2);
    const goldRimMat = new THREE.MeshStandardMaterial({
      color: 0xe29d37,
      roughness: 0.28,
      metalness: 0.85,
    });
    const goldRimMesh = new THREE.Mesh(goldRimGeo, goldRimMat);
    goldRimMesh.position.set(0, 0.82, 0);
    bowlContainer.add(goldRimMesh);

    // 3c. Pure Powder Atta Substance (Filled till top brim with ZERO clipping through ceramic walls!)
    // Smooth level powder surface resting naturally at the inner rim lip with a soft 0.02 crowning
    const flourPoints: THREE.Vector2[] = [
      new THREE.Vector2(0.00, 0.84), // subtle organic crown (+0.02 above rim, totally natural, zero cartoon peak)
      new THREE.Vector2(0.25, 0.837),
      new THREE.Vector2(0.50, 0.83),
      new THREE.Vector2(0.72, 0.822),
      new THREE.Vector2(0.86, 0.815), // rests cleanly inside the 0.88 inner rim lip
      new THREE.Vector2(0.80, 0.76),  // gentle downward bevel inside inner wall (0.80 < 0.84)
      new THREE.Vector2(0.60, 0.65),  // inner thickness (0.60 < 0.70)
      new THREE.Vector2(0.00, 0.60),  // closed underside
    ];
    const flourGeo = new THREE.LatheGeometry(flourPoints, 64);
    flourGeo.computeVertexNormals();

    // Procedural organic micro-powder grain texture for authentic silky stoneground flour
    const powderCanvas = document.createElement('canvas');
    powderCanvas.width = 256;
    powderCanvas.height = 256;
    const pCtx = powderCanvas.getContext('2d')!;
    pCtx.fillStyle = '#fcf8ee';
    pCtx.fillRect(0, 0, 256, 256);
    const imgData = pCtx.getImageData(0, 0, 256, 256);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const n = (Math.random() - 0.5) * 14;
      imgData.data[i] = Math.min(255, Math.max(0, 253 + n));
      imgData.data[i + 1] = Math.min(255, Math.max(0, 248 + n));
      imgData.data[i + 2] = Math.min(255, Math.max(0, 238 + n));
    }
    pCtx.putImageData(imgData, 0, 0);
    const powderTexture = new THREE.CanvasTexture(powderCanvas);
    powderTexture.wrapS = THREE.RepeatWrapping;
    powderTexture.wrapT = THREE.RepeatWrapping;
    powderTexture.repeat.set(6, 6);

    const flourMat = new THREE.MeshStandardMaterial({
      color: 0xfffaef, // warm creamy ivory stoneground flour
      emissive: 0x16130e, // subtle warm bounce
      map: powderTexture,
      roughness: 0.98, // ultra-soft velvety matte flour finish
      metalness: 0.0,
      side: THREE.DoubleSide,
      flatShading: false,
    });
    const flourMesh = new THREE.Mesh(flourGeo, flourMat);
    bowlContainer.add(flourMesh);
    flourMesh.scale.set(0.001, 0.001, 0.001); // starts hidden before milling

    // ==========================================
    // 4. Clean Falling Atta Stream Particle Cascade
    // ==========================================
    const streamCount = 280;
    const streamGeo = new THREE.BufferGeometry();
    const streamPositions = new Float32Array(streamCount * 3);
    const streamColors = new Float32Array(streamCount * 3);

    interface StreamParticleData {
      y: number;
      speed: number;
      radiusMult: number;
      angle: number;
      rotSpeed: number;
    }
    const streamMeta: StreamParticleData[] = [];

    const ivoryColor = new THREE.Color(0xfffaef);
    const warmWheatColor = new THREE.Color(0xf5e9d2);

    for (let i = 0; i < streamCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const progress = Math.random();
      const y = 0.85 - progress * 0.39;
      const fallT = Math.max(0, Math.min(1, (0.85 - y) / 0.39));
      const radius = THREE.MathUtils.lerp(0.03, 0.16, fallT) * Math.sqrt(Math.random());

      streamPositions[i * 3] = Math.cos(angle) * radius;
      streamPositions[i * 3 + 1] = y;
      streamPositions[i * 3 + 2] = Math.sin(angle) * radius;

      const c = ivoryColor.clone().lerp(warmWheatColor, Math.random() * 0.35);
      streamColors[i * 3] = c.r;
      streamColors[i * 3 + 1] = c.g;
      streamColors[i * 3 + 2] = c.b;

      streamMeta.push({
        y,
        speed: 2.2 + Math.random() * 1.4,
        radiusMult: Math.random(),
        angle,
        rotSpeed: (Math.random() - 0.5) * 1.2,
      });
    }

    streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPositions, 3));
    streamGeo.setAttribute('color', new THREE.BufferAttribute(streamColors, 3));

    const streamMaterial = new THREE.PointsMaterial({
      size: 0.032,
      vertexColors: true,
      transparent: true,
      opacity: 0.0,
    });
    const streamPoints = new THREE.Points(streamGeo, streamMaterial);
    rootGroup.add(streamPoints);

    // 4b. Ambient flour dust motes hovering above the filled bowl
    const dustCount = 45;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 0.9;
      dustPos[i + 1] = 0.86 + Math.random() * 0.25;
      dustPos[i + 2] = (Math.random() - 0.5) * 0.9;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: 0xfffbee,
      size: 0.020,
      transparent: true,
      opacity: 0.0,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMaterial);
    bowlContainer.add(dustPoints);

    // ==========================================
    // 5. Mouse Orbit / 360° Drag Handlers
    // ==========================================
    const dom = mountRef.current;
    const onMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (mouseRef.current.isDown) {
        mouseRef.current.targetX += (e.clientX - mouseRef.current.lastX) * 0.008;
        mouseRef.current.targetY += (e.clientY - mouseRef.current.lastY) * 0.008;
        mouseRef.current.targetY = Math.max(-0.35, Math.min(0.35, mouseRef.current.targetY));
        mouseRef.current.lastX = e.clientX;
        mouseRef.current.lastY = e.clientY;
      }
    };
    const onMouseUp = () => { mouseRef.current.isDown = false; };
    const onMouseLeave = () => { mouseRef.current.isDown = false; };

    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('mouseleave', onMouseLeave);

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        mouseRef.current.isDown = true;
        mouseRef.current.lastX = e.touches[0].clientX;
        mouseRef.current.lastY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (mouseRef.current.isDown && e.touches.length === 1) {
        mouseRef.current.targetX += (e.touches[0].clientX - mouseRef.current.lastX) * 0.008;
        mouseRef.current.targetY += (e.touches[0].clientY - mouseRef.current.lastY) * 0.008;
        mouseRef.current.targetY = Math.max(-0.35, Math.min(0.35, mouseRef.current.targetY));
        mouseRef.current.lastX = e.touches[0].clientX;
        mouseRef.current.lastY = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => { mouseRef.current.isDown = false; };

    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    // ==========================================
    // 6. Animation Render Loop
    // ==========================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const delta = Math.min(clock.getDelta(), 0.1);

      // Smooth interpolation of mode progress (0 = whole seed, 1 = milled in bowl)
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.06;
      const progress = currentProgress.current;
      const pEase = progress * progress * (3 - 2 * progress);

      // Mouse rotation damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Natural gentle float
      rootGroup.rotation.y = mouseRef.current.x + Math.sin(elapsed * 0.45) * 0.10;
      rootGroup.rotation.x = mouseRef.current.y + Math.cos(elapsed * 0.35) * 0.05;
      rootGroup.position.y = Math.sin(elapsed * 0.75) * 0.03;

      // --------------------------------------------------
      // A. SEED TRANSFORMATIONS
      // --------------------------------------------------
      if (progress < 0.99) {
        seedContainer.visible = true;

        // Seed rises cleanly from y = 0.18 to y = 0.85, spins, and diminishes cleanly
        seedContainer.position.y = THREE.MathUtils.lerp(0.18, 0.85, pEase);
        const seedScale = Math.max(0.0001, 0.65 * (1 - pEase));
        seedContainer.scale.setScalar(seedScale);

        if (progress > 0.05 && progress < 0.95) {
          seedContainer.rotation.y += 0.06; // stoneground spinning
        }
      } else {
        seedContainer.visible = false;
      }

      // --------------------------------------------------
      // B. ARTISANAL BOWL & NATURAL ATTA FLOUR (Fits Space Cleanly)
      // --------------------------------------------------
      // Scaled to 0.65 so it comfortably fits any viewport width with ample padding
      const targetBowlScale = 0.65;
      const bowlScale = Math.min(targetBowlScale, pEase * targetBowlScale);
      bowlContainer.scale.setScalar(bowlScale);
      bowlContainer.position.y = THREE.MathUtils.lerp(-0.45, -0.05, pEase);

      // Flour expands and rises cleanly inside the bowl - filled to the brim with zero clipping
      flourMesh.visible = progress > 0.01;
      const flourFill = Math.max(0.001, pEase);
      flourMesh.scale.set(flourFill, flourFill, flourFill);
      flourMesh.position.y = THREE.MathUtils.lerp(-0.25, 0.0, flourFill);

      // --------------------------------------------------
      // C. CLEAN FALLING ATTA CASCADE
      // --------------------------------------------------
      const isStreaming = isMillingStreamActive.current || (progress > 0.08 && progress < 0.92);

      if (isStreaming) {
        streamMaterial.opacity = THREE.MathUtils.lerp(streamMaterial.opacity, 0.92, 0.12);
      } else {
        streamMaterial.opacity = THREE.MathUtils.lerp(streamMaterial.opacity, 0.0, 0.15);
      }

      // Update falling stream particles
      const posArr = streamGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < streamCount; i++) {
        const meta = streamMeta[i];

        if (streamMaterial.opacity > 0.01) {
          meta.y -= meta.speed * delta;
          meta.angle += meta.rotSpeed * delta;

          // Reached the flour surface inside bowl (around y = 0.46)
          if (meta.y < 0.46) {
            meta.y = 0.85 + Math.random() * 0.06;
          }

          const fallT = Math.max(0, Math.min(1, (0.85 - meta.y) / 0.39));
          const r = THREE.MathUtils.lerp(0.03, 0.16, fallT) * Math.sqrt(meta.radiusMult);

          posArr[i * 3] = Math.cos(meta.angle) * r;
          posArr[i * 3 + 1] = meta.y;
          posArr[i * 3 + 2] = Math.sin(meta.angle) * r;
        }
      }
      streamGeo.attributes.position.needsUpdate = true;

      // Ambient flour dust motes hover above filled bowl
      if (progress >= 0.9) {
        dustMaterial.opacity = THREE.MathUtils.lerp(dustMaterial.opacity, 0.35, 0.05);
        dustPoints.rotation.y = elapsed * 0.03;
      } else {
        dustMaterial.opacity = THREE.MathUtils.lerp(dustMaterial.opacity, 0.0, 0.1);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      const asp = w / h;
      camera.aspect = asp;
      camera.position.z = 4.6 / Math.min(1.0, Math.max(0.62, asp));
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('mouseleave', onMouseLeave);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] sm:h-[460px] lg:h-[490px] flex items-center justify-center select-none">
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Ultra-Clean Minimalist Luxury Transformation Pill Button */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20 pointer-events-auto">
        {mode !== 'atta' ? (
          <button
            type="button"
            disabled={mode === 'milling'}
            onClick={handleStartMilling}
            className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#122B1E] hover:bg-[#1A3E2B] text-[#FDFBF7] border border-[#D98A2B]/40 shadow-md font-inter text-sm font-semibold tracking-wide hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-85 group cursor-pointer"
          >
            <Sparkles className={`size-4 text-[#D98A2B] ${mode === 'milling' ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`} />
            <span>{mode === 'milling' ? 'Milling into Bowl...' : 'Mill into Superfood Atta'}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleResetToSeed}
            className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#F5EFE4] hover:bg-[#ECE4D4] text-[#122B1E] font-semibold font-inter text-sm tracking-wide hover:scale-105 active:scale-95 transition-all duration-300 shadow-md border border-[#122B1E]/15 cursor-pointer"
          >
            <RotateCcw className="size-4 text-[#122B1E]" />
            <span>Reform Whole Seed</span>
          </button>
        )}

        <div className="text-[12px] text-[#122B1E]/70 font-inter tracking-normal">
          {mode === 'milling' ? 'Pouring fresh stoneground atta into the bowl...' : mode === 'atta' ? 'Ready for soft rotis & everyday cooking' : 'Drag to rotate 360° • Click to mill'}
        </div>
      </div>
    </div>
  );
};
