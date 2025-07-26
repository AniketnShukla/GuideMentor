// // File: src/pages/Visualizer.jsx

// import React from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Environment } from '@react-three/drei';
// import GoldenBlob from '../components/GoldenBlob';
// import EqualizerBars from '../components/EqualizerBars';
// import useAudioAnalyzer from '../hooks/useAudioAnalyzer';
// import useSpeechWordsWithMood from '../hooks/useSpeechWordsWithMood';
// function BlobBars({ spectrum, radius = 1.3 }) {
//   return (
//     <group>
//       {spectrum.map((value, i) => {
//         const angle = (i / spectrum.length) * Math.PI * 2;
//         const x = Math.cos(angle) * radius;
//         const y = Math.sin(angle) * radius;
//         return (
//           <mesh position={[x, y, 0]} key={i}>
//             <boxGeometry args={[0.04, 0.04, 0.3 + value * 0.006]} />
//             <meshStandardMaterial color="#ffe19c" emissive="#fffbe2" />
//           </mesh>
//         );
//       })}
//     </group>
//   );
// }

// export default function Visualizer() {
//   // Call the hook ONCE inside the component
//   const { energy, spectrum } = useAudioAnalyzer();
// //   const words = useSpeechWords();
//   const { words, mood } = useSpeechWordsWithMood();
//   return (
//     <div style={{ width: '100vw', height: '100vh', background: '#0f2027' }}>
//       <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }}>
//         <ambientLight intensity={0.6} />
//         <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
//         <pointLight position={[0, 2, 2]} intensity={1} color={'#fff8e3'} />
//         <pointLight position={[-2, -2, 2]} intensity={0.4} color={'#ffe19c'} />

//         <GoldenBlob energy={energy} />
//         {/* <BlobBars spectrum={spectrum} /> */}
//         {/* <EqualizerBars energy={energy} /> */}
//         {/* <EqualizerBars spectrum={spectrum} /> */}

//         {/* <Environment preset="studio" background={false} /> */}
//         <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
//       </Canvas>
//     {/* Live word overlay (bottom center) */}
//     <div style={{
//         position: 'absolute',
//         bottom: 32,
//         left: 0,
//         right: 0,
//         textAlign: 'center',
//         color: '#ffe19c',
//         fontSize: 32,
//         fontWeight: 'bold',
//         textShadow: '0 2px 16px #000, 0 0px 1px #ffe19c',
//         pointerEvents: 'none',
//         letterSpacing: 2,
//         userSelect: 'none',
//         transition: 'opacity 0.3s',
//       }}>
//         {words.join(' ')}
//       </div>
//       {/* Live mood overlay (top right) */}
//       <div style={{
//         position: 'absolute', top: 24, right: 32,
//         fontSize: 22, color: '#fff', background: '#222b', borderRadius: 10, padding: '8px 22px',
//         fontWeight: 700, letterSpacing: 1, userSelect: 'none'
//       }}>
//         Mood: {mood.charAt(0).toUpperCase() + mood.slice(1)}
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import GoldenBlob from '../components/GoldenBlob';
import EqualizerBars from '../components/EqualizerBars';
import useAudioAnalyzer from '../hooks/useAudioAnalyzer';
import useSpeechWordsWithMood from '../hooks/useSpeechWordsWithMood';
import { useSelector } from 'react-redux';
function BlobBars({ spectrum, radius = 1.3 }) {
  return (
    <group>
      {spectrum.map((value, i) => {
        const angle = (i / spectrum.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <mesh position={[x, y, 0]} key={i}>
            <boxGeometry args={[0.04, 0.04, 0.3 + value * 0.006]} />
            <meshStandardMaterial color="#ffe19c" emissive="#fffbe2" />
          </mesh>
        );
      })}
    </group>
  );
}

export default function Visualizer({
  energy: externalEnergy,
  spectrum: externalSpectrum,
  mini = false,
  showShards = true,
  style = {},
}) {
  // Only use hooks if not externally passed (for full version)
  const { energy, spectrum } = !externalEnergy
    ? useAudioAnalyzer()
    : { energy: externalEnergy, spectrum: externalSpectrum || new Array(64).fill(0) };
  const { words, mood } = !mini ? useSpeechWordsWithMood() : { words: [], mood: '' };
  const moodColors = {
    angry:      { color: "#fde8e6", attenuation: "#fbb9b4" },  // light reddish
    overwhelmed:{ color: "#fdf2ea", attenuation: "#f7e3c9" },  // peachy
    frustrated: { color: "#fdf6ea", attenuation: "#f4eac9" },  // light yellow
    insecure:   { color: "#eaf3fb", attenuation: "#c8def6" },  // gentle blue
    lonely:     { color: "#f1eafd", attenuation: "#d3c8f6" },  // purple tint
    sad:        { color: "#eaf0fb", attenuation: "#b4c9f5" },  // cool blue
    fear:       { color: "#fdfaea", attenuation: "#f7f5c9" },  // pale yellow
    jealous:    { color: "#edfaea", attenuation: "#bdf7c9" },  // pale green
    lacking_motivation: { color: "#ececec", attenuation: "#cbcbcb" }, // grayish
    procrastinating:    { color: "#fbfbea", attenuation: "#e8e7b9" }, // sand
    gloomy:     { color: "#eaeafa", attenuation: "#b9b9e8" },  // dusty blue
    neutral:    { color: "#f4f8fb", attenuation: "#eaf1fb" },  // soft neutral
  };
  const emotion = useSelector(state => state.mood || "neutral"); // or however you access the current mood

  const glassColors = moodColors[emotion] || moodColors["neutral"];
  
  return (
    <div
      style={{
        width: mini ? 64 : '100vw',
        height: mini ? 64 : '100vh',
        position: mini ? 'fixed' : 'relative',
        bottom: mini ? 24 : undefined,
        right: mini ? 24 : undefined,
        zIndex: mini ? 100 : 1,
        opacity: mini ? 0.95 : 1,
        pointerEvents: mini ? 'none' : 'auto',
        borderRadius: mini ? '50%' : 0,
        // boxShadow: mini ? '0 2px 12px #0007' : 'none',
        ...style,
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, mini ? 3.2 : 4],
          fov: mini ? 48 : 45,
        }}
        style={{
          background: 'transparent',
          borderRadius: mini ? '50%' : 0,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
        <pointLight position={[0, 2, 2]} intensity={1} color={'#fff8e3'} />
        <pointLight position={[-2, -2, 2]} intensity={0.4} color={'#ffe19c'} />

        {/* <GoldenBlob energy={energy} /> */}
        <GoldenBlob
  energy={energy}
  color={glassColors.color}
  attenuationColor={glassColors.attenuation}
/>
        {showShards && <EqualizerBars energy={energy} />}
        {/* Or show BlobBars for the ring style: */}
        {/* showShards && <BlobBars spectrum={spectrum} /> */}
        {!mini && (
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
        )}
      </Canvas>

      {/* UI overlays only for non-mini */}
      {!mini && (
        <>
          <div style={{
            position: 'absolute',
            bottom: 32,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: '#ffe19c',
            fontSize: 32,
            fontWeight: 'bold',
            textShadow: '0 2px 16px #000, 0 0px 1px #ffe19c',
            pointerEvents: 'none',
            letterSpacing: 2,
            userSelect: 'none',
            transition: 'opacity 0.3s',
          }}>
            {words.join(' ')}
          </div>
          <div style={{
            position: 'absolute', top: 24, right: 32,
            fontSize: 22, color: '#fff', background: '#222b', borderRadius: 10, padding: '8px 22px',
            fontWeight: 700, letterSpacing: 1, userSelect: 'none'
          }}>
            Mood: {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </div>
        </>
      )}
    </div>
  );
}
