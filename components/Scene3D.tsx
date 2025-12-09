"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Stars, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

// Workaround to fix missing R3F types in the current environment
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      icosahedronGeometry: any;
      meshStandardMaterial: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
    }
  }
}

const AnimatedShape = ({ isDark }: { isDark: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  // Color palette based on theme
  const mainColor = isDark ? "#06b6d4" : "#0891b2"; // Primary (Cyan)
  const accentColor = isDark ? "#8b5cf6" : "#7c3aed"; // Secondary (Violet)

  useFrame((state) => {
    // Gentle rotation
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
         meshRef.current.rotation.x = time * 0.2;
         meshRef.current.rotation.y = time * 0.3;

         // Mouse interaction (lerp to mouse position for parallax effect)
         // state.mouse x/y are normalized -1 to 1
         const mouseX = state.mouse.x * 2;
         const mouseY = state.mouse.y * 2;

         meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouseX, 0.1);
         meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouseY, 0.1);
    }
  });

  return (
    <group>
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <mesh
            ref={meshRef}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            scale={2.2}
        >
          <icosahedronGeometry args={[1, 15]} />
          <MeshDistortMaterial
            color={hovered ? accentColor : mainColor}
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>

      {/* Floating Rings */}
      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
         <Torus args={[3.5, 0.05, 16, 50]} rotation={[Math.PI / 2, 0, 0]}>
             <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.8} wireframe opacity={0.5} transparent />
         </Torus>
      </Float>
       <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
         <Torus args={[4.2, 0.02, 16, 50]} rotation={[0, Math.PI / 4, 0]}>
             <meshStandardMaterial color={mainColor} emissive={mainColor} emissiveIntensity={0.5} wireframe opacity={0.3} transparent />
         </Torus>
      </Float>
    </group>
  );
};

const Scene3D: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isLowPerf, setIsLowPerf] = useState(false);

  useEffect(() => {
    // Detect low performance devices (mobile or low memory)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const lowMemory = navigator.deviceMemory !== undefined && navigator.deviceMemory < 4;
    setIsLowPerf(isMobile || lowMemory);
  }, []);

  // Skip 3D rendering on low performance devices
  if (isLowPerf) {
    return (
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none md:pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        className="w-full h-full"
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        frameloop="demand"
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} color={isDark ? "#8b5cf6" : "#7c3aed"} />

        <AnimatedShape isDark={isDark} />

        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
};

export default Scene3D;