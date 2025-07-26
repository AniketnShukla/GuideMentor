// File: src/components/EqualizerBars.jsx

import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
export default function EqualizerBars({ energy }) {
    const shardCount = 64;
  
    const shards = useMemo(() => {
      return new Array(shardCount).fill().map((_, i) => {
        const angle = (i / shardCount) * Math.PI * 2;
        const elevation = (Math.random() - 0.5) * 0.30;   // less vertical spread for neatness
        const baseRadius = 1.13 + Math.random() * 0.08;   // *hug* the blob!
        return {
          id: i,
          ref: React.createRef(),
          direction: new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize(),
          elevation,
          angle,
          baseRadius
        };
      });
    }, []);
  
    useFrame(({ clock, mouse }) => {
      const t = clock.getElapsedTime();
      const mx = mouse.x * 2;
      const mz = mouse.y * 2;
  
      // Make “blowout” snap out more on strong beats/energy
      const blowout = 1 + Math.pow(energy, 1.5) * 3; // More snappy, especially at high energy
  
      shards.forEach(({ ref, direction, elevation, baseRadius, angle }, i) => {
        if (!ref.current) return;
  
        const band = (i % 16) / 16;
        const freqInfluence = Math.sin(t * 10 + i * 0.4 + energy * 20) * band;
        const pulse = 0.18 * freqInfluence * energy;
  
        const dynamicDir = direction.clone().add(new THREE.Vector3(mx, 0, mz).normalize().multiplyScalar(0.1));
        const pos = dynamicDir.multiplyScalar(baseRadius * blowout);
  
        ref.current.position.set(pos.x, elevation + pulse, pos.z);
        ref.current.rotation.set(Math.sin(t + i), angle + t * 0.3, Math.cos(t * 0.5 + i));
        ref.current.scale.set(1, 1.35 + energy * 3.5 + Math.abs(freqInfluence), 1);
      });
    });
  
    return (
      <group>
        {shards.map(({ id, ref }, i) => (
          <mesh
            key={id}
            ref={ref}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
          >
            <boxGeometry args={[0.025, 0.4, 0.02]} />
            <meshPhysicalMaterial
              transmission={1}
              roughness={0.02}
              thickness={1.2}
              clearcoat={1}
              clearcoatRoughness={0.02}
              transparent={true}
              opacity={0.5}
              reflectivity={0.8}
              metalness={0.15}
              emissive={'#ffeedd'}
              emissiveIntensity={0.4 + energy * 1.0}
            />
          </mesh>
        ))}
      </group>
    );
  }
  