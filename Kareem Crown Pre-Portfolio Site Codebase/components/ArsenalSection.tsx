"use client";

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, useCursor } from '@react-three/drei';
import { Layers, BrainCircuit, ShieldCheck, ChevronRight } from 'lucide-react';
import * as THREE from 'three';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

// Arsenal Data
const arsenalItems = [
  {
    icon: <BrainCircuit size={40} className="text-midas-gold-glossy" />,
    title: "AI Architecture",
    description: "Proprietary neural systems that serve as strategic weapons.",
    metric: "98% Efficiency"
  },
  {
    icon: <Layers size={40} className="text-midas-gold-glossy" />,
    title: "Autonomous Dev",
    description: "Full-stack orchestration from concept to deployment.",
    metric: "Zero-Latency"
  },
  {
    icon: <ShieldCheck size={40} className="text-midas-gold-glossy" />,
    title: "SEO Warfare",
    description: "Engineering 'Beast Mode' performance for dominance.",
    metric: "Rank #1"
  },
];

function Card({ item, position, rotation, index }: any) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <group position={position} rotation={rotation}>
      {/* 3D Backing Plate (Glass) */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[3.2, 4.5, 0.1]} />
        <meshPhysicalMaterial
          color={hovered ? "#333" : "#000"}
          transparent
          opacity={0.8}
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
        />
      </mesh>

      {/* Glow Border */}
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[3.3, 4.6]} />
        <meshBasicMaterial color={hovered ? "#FFD700" : "#444"} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* HTML Content Overlay */}
      <Html
        transform
        occlude
        position={[0, 0, 0.06]}
        style={{
          width: '300px',
          height: '420px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none', // Let mesh handle events
          userSelect: 'none'
        }}
      >
        <div className={`flex flex-col items-center justify-between h-full p-6 text-center transition-all duration-500 ${hovered ? 'scale-105' : 'scale-100'}`}>

          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-4 backdrop-blur-md">
            {item.icon}
          </div>

          <h3 className="text-2xl font-bold font-serif text-white mb-2">{item.title}</h3>

          <div className="h-px w-12 bg-midas-gold-glossy/50 mb-4" />

          <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
            {item.description}
          </p>

          <button className="flex items-center gap-2 text-xs uppercase tracking-widest text-midas-gold-glossy border border-midas-gold-glossy/30 px-4 py-2 rounded-full hover:bg-midas-gold-glossy hover:text-black transition-colors">
            Analyze <ChevronRight size={14} />
          </button>

          {/* HUD Tech Elements */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/30" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/30" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/30" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/30" />

          <div className="absolute bottom-4 right-4 text-[10px] text-gray-500 font-mono">
            SYS.ID_0{index + 1}
          </div>
        </div>
      </Html>
    </group>
  );
}

function Carousel() {
  const groupRef = useRef<THREE.Group>(null);
  const RADIUS = 6;

  // Mouse interaction logic
  // We'll just rotate the group based on mouse X normalized
  useFrame(({ mouse }) => {
    if (groupRef.current) {
      // Lerp rotation for smoothness
      // Target rotation based on mouse.x
      const targetRotationY = mouse.x * 0.5; // Slight tilt capability
      const targetRotationX = -mouse.y * 0.2;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {arsenalItems.map((item, i) => {
        // Calculate position on the arc
        // 3 items, center them.
        // -30deg, 0deg, 30deg
        const angleStep = 0.6; // ~35 degrees in radians
        const startAngle = -angleStep * ((arsenalItems.length - 1) / 2);
        const angle = startAngle + i * angleStep;

        const x = Math.sin(angle) * RADIUS;
        const z = Math.cos(angle) * RADIUS - RADIUS; // Offset to keep center close to 0

        return (
          <Card
            key={i}
            item={item}
            index={i}
            position={[x, 0, z]}
            rotation={[0, -angle, 0]} // Rotate card to face center
          />
        );
      })}
    </group>
  );
}

export const ArsenalSection = () => {
  return (
    <section className="relative w-full h-[80vh] bg-obsidian-black flex flex-col items-center justify-center overflow-hidden">

      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-black via-transparent to-black z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-20 text-center mb-0 mt-10 pointer-events-none">
        <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-2">
          The Armory
        </h2>
        <p className="text-midas-gold-glossy/80 text-sm uppercase tracking-[0.3em]">
          Classified Systems
        </p>
      </div>

      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 9], fov: 40 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#FFD700" intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#4444ff" intensity={0.5} />

          <Carousel />

          {/* Floor Reflection/Grid (Optional) */}
          <gridHelper args={[20, 20, 0x222222, 0x111111]} position={[0, -3, 0]} />
        </Canvas>
      </div>
    </section>
  );
};

export default ArsenalSection;
