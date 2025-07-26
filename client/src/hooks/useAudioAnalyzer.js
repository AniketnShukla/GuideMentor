import { useEffect, useRef, useState } from 'react';

export default function useAudioAnalyzer() {
  const [energy, setEnergy] = useState(0);
  const [spectrum, setSpectrum] = useState(new Array(64).fill(0)); // 64 frequency bins
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    let audioCtx, source, stream, rafId;

    async function setupAudio() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        analyser.fftSize = 128;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        analyserRef.current = analyser;
        dataArrayRef.current = dataArray;

        function tick() {
          if (!analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArrayRef.current);

          // Copy for React state
          setSpectrum(Array.from(dataArrayRef.current));

          const avg = dataArrayRef.current.reduce((a, b) => a + b, 0) / bufferLength;
          setEnergy(avg / 255);

          rafId = requestAnimationFrame(tick);
        }
        tick();
      } catch (err) {
        console.error('Mic access denied or error:', err);
      }
    }

    setupAudio();

    return () => {
      if (audioCtx) audioCtx.close();
      if (stream) stream.getTracks().forEach(track => track.stop());
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Return both energy and spectrum array
  return { energy, spectrum };
}
