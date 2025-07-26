// File: src/pages/Visualizer.jsx
import { useEffect, useRef } from 'react';

const Visualizer = () => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const lastFrameRef = useRef([]);

  useEffect(() => {
    let stream;

    async function setupAudio() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        const source = audioCtx.createMediaStreamSource(stream);

        audioContextRef.current = audioCtx;
        analyserRef.current = analyser;
        sourceRef.current = source;

        source.connect(analyser);
        analyser.fftSize = 256;

        const bufferLength = analyser.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        draw();
      } catch (err) {
        console.error("Mic access denied or error:", err);
      }
    }

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    setupAudio();

    return () => {
      window.removeEventListener('resize', resizeCanvas);

      if (audioContextRef.current) audioContextRef.current.close();
      if (sourceRef.current) sourceRef.current.disconnect();
      if (analyserRef.current) analyserRef.current.disconnect();
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, []);

  function draw() {
    requestAnimationFrame(draw);
    if (!analyserRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);

    // Soothing background gradient
    const gradientBg = ctx.createLinearGradient(0, 0, 0, height);
    gradientBg.addColorStop(0, "#0f2027");
    gradientBg.addColorStop(0.5, "#203a43");
    gradientBg.addColorStop(1, "#2c5364");
    ctx.fillStyle = gradientBg;
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    const bufferLength = dataArrayRef.current.length;

    ctx.save();
    ctx.translate(centerX, centerY);

    for (let i = 0; i < bufferLength; i++) {
      const angle = (i / bufferLength) * Math.PI * 2;
      const prev = lastFrameRef.current[i] || 0;
      const current = dataArrayRef.current[i];
      const smoothed = prev * 0.8 + current * 0.2;
      lastFrameRef.current[i] = smoothed;

      const innerRadius = radius * 0.6;
      const outerRadius = innerRadius + smoothed / 4;

      const x1 = innerRadius * Math.cos(angle);
      const y1 = innerRadius * Math.sin(angle);
      const x2 = outerRadius * Math.cos(angle);
      const y2 = outerRadius * Math.sin(angle);

      const hue = 200 + (i / bufferLength) * 100; // soft blues and teals
      ctx.strokeStyle = `hsl(${hue}, 60%, 60%)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    ctx.restore();
  }

  return (
    <div className="w-100" style={{ height: '100vh', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ display: 'block' }}
      ></canvas>
    </div>
  );
};

export default Visualizer;
