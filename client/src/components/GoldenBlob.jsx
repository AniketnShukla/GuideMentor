// File: src/components/GoldenBlob.jsx

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GoldenBlob({ energy = 0 }) {
  const meshRef = useRef();
  const geometryRef = useRef();

  const initialPositions = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 64, 64);
    return geo.attributes.position.array.slice();
  }, []);

  useFrame(() => {
    const mesh = meshRef.current;
    const geom = geometryRef.current;
    if (!mesh || !geom) return;

    const pos = geom.attributes.position;
    const now = performance.now() / 1000;

    for (let i = 0; i < pos.count; i++) {
      const ix = i * 3;
      const ox = initialPositions[ix];
      const oy = initialPositions[ix + 1];
      const oz = initialPositions[ix + 2];

      const distance = Math.sqrt(ox * ox + oy * oy + oz * oz);
      const lowFreq = Math.sin(now * 2 + distance * 3) * 0.3;
      const highFreq = Math.sin(now * 20 + distance * 12) * 0.2;
      const deformation = lowFreq * (1 - energy) + highFreq * energy;
      const scale = 1 + deformation * energy * 2.0;

      pos.array[ix] = ox * scale;
      pos.array[ix + 1] = oy * scale;
      pos.array[ix + 2] = oz * scale;
    }

    pos.needsUpdate = true;
    mesh.rotation.y += 0.008;
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <sphereGeometry ref={geometryRef} args={[1, 64, 64]} />
      {/* <meshPhysicalMaterial
        transmission={1}
        roughness={0.05}
        thickness={1.5}
        clearcoat={1}
        clearcoatRoughness={0.03}
        transparent={true}
        opacity={0.7}
        reflectivity={0.7}
        metalness={0.1}
        emissive={'#ffeecc'}
        emissiveIntensity={0.3 + energy * 1.5}
        ior={1.52}
        attenuationColor={'#aaffee'}
        attenuationDistance={0.8}
      /> */}
      <meshPhysicalMaterial
  color={'#ffe19c'}
  transmission={1}
  roughness={0.08}
  thickness={2}
  clearcoat={1}
  clearcoatRoughness={0.04}
  transparent={true}
  opacity={0.96}
  reflectivity={0.9}
  metalness={0.35}
  emissive={'#f3b74a'}
  emissiveIntensity={0.35 + energy * 1.2}
  ior={1.52}
  attenuationColor={'#ffe19c'}
  attenuationDistance={0.6}
/>
    </mesh>
  );
}
