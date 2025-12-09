"use client";

import React, { useRef, useState } from 'react';
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
          <icosahedronGeometry args={[1, 30]} />
          <MeshDistortMaterial
            color={hovered ? accentColor : mainColor}
            attach="material"
            distort={0.4} // Strength of distortion
            speed={3} // Speed of distortion animation
            roughness={0.2}
            metalness={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>
      
      {/* Floating Rings */}
      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
         <Torus args={[3.5, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
             <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.8} wireframe opacity={0.5} transparent />
         </Torus>
      </Float>
       <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
         <Torus args={[4.2, 0.02, 16, 100]} rotation={[0, Math.PI / 4, 0]}>
             <meshStandardMaterial color={mainColor} emissive={mainColor} emissiveIntensity={0.5} wireframe opacity={0.3} transparent />
         </Torus>
      </Float>
    </group>
  );
};

const Scene3D: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none md:pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }} 
        className="w-full h-full"
        dpr={[1, 2]} // Optimize pixel ratio for performance
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} color={isDark ? "#8b5cf6" : "#7c3aed"} />
        
        <AnimatedShape isDark={isDark} />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

export default Scene3D;