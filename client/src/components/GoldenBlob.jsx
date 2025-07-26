import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function subtleNoise(x, y, z, t) {
  return (
    Math.sin(x * 3.1 + t * 1.7) * 0.04 +
    Math.cos(y * 2.3 - t * 2.3) * 0.04 +
    Math.sin(z * 4.0 + t * 2.2) * 0.025
  );
}
export default function GoldenBlob({
    energy = 0,
    color = "#f4f8fb",
    attenuationColor = "#eaf1fb"
  }) {
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

      const baseDistance = Math.sqrt(ox * ox + oy * oy + oz * oz);

      // Almost static idle
      const idle = 1 + Math.sin(now * 0.8 + baseDistance * 7) * 0.010;

      // Very subtle surface noise
      const noise = subtleNoise(ox, oy, oz, now) * 0.07;

      // Audio excitement - crisp, but not overdone
      const audioMorph =
        1 +
        (Math.sin(now * 5.6 + baseDistance * 13 + ox * 2.3) +
          Math.cos(now * 4.1 + oy * 5.0 + oz * 1.2)) *
          (0.028 + energy * 0.19) * energy;

      // Blend - very subtle
      const scale =
        idle * (1 + noise) * audioMorph;

      pos.array[ix] = ox * scale;
      pos.array[ix + 1] = oy * scale;
      pos.array[ix + 2] = oz * scale;
    }

    pos.needsUpdate = true;
    mesh.rotation.y += 0.006 + energy * 0.010;
    mesh.rotation.x += 0.0007 * Math.sin(now * 0.31);
  });
console.log("Blob got energy:", energy);

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <sphereGeometry ref={geometryRef} args={[1, 64, 64]} />
      <meshPhysicalMaterial
        color={color}          // NOT pure white, subtle neutral blue-gray
  transmission={0.98}           // Ultra high, but not 1.0 (for subtle lensing)
  roughness={0.05}              // Smooth but not perfect
  thickness={0.1}               // How “deep” the glass feels
  clearcoat={1}
  clearcoatRoughness={0.008}
  transparent={true}
  opacity={0.86}                // Low opacity for real glass layering
  reflectivity={0.93}
  metalness={0.09}
  ior={1.5}
  attenuationColor={attenuationColor}  // Soft, slightly blueish—like frosted glass
  attenuationDistance={0.24}
  emissive="#000"
  emissiveIntensity={0.02 + energy * 0.09}
/>
    </mesh>
  );
}
