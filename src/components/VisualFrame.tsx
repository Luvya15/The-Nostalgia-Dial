import React, { useRef, useEffect, useState } from 'react';
import { EraData } from '../types';

interface VisualFrameProps {
  era: EraData;
  accentColor: string;
}

export default function VisualFrame({ era, accentColor }: VisualFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 200 });

  // Handle high-density screens and responsive sizing
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    let frame = 0;

    // Define generative animation particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      angle?: number;
      speed?: number;
      targetSize?: number;
    }> = [];

    // Initialize era-specific particles
    const initParticles = (style: string) => {
      particles.length = 0;
      const count = style === 'cyber' || style === 'glossy' ? 15 : 25;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 8 + 4,
          color: getRandomColorForStyle(style),
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.01
        });
      }
    };

    const getRandomColorForStyle = (style: string) => {
      if (style === 'memphis') {
        const colors = ['#f43f5e', '#3b82f6', '#eab308', '#06b6d4', '#ec4899'];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      if (style === 'frutiger') {
        const colors = ['rgba(16, 185, 129, 0.4)', 'rgba(56, 189, 248, 0.4)', 'rgba(255, 255, 255, 0.6)'];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      return accentColor;
    };

    initParticles(era.visual.canvasStyle);

    // Main animation loop
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const style = era.visual.canvasStyle;

      // Draw active background
      if (style === 'neon' || style === 'cyber') {
        ctx.fillStyle = '#0c0a09';
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      } else if (style === 'glitch') {
        // Windows 95 Teal Background
        ctx.fillStyle = '#008080';
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      } else {
        // Deep background fade matching the era's theme
        const grad = ctx.createLinearGradient(0, 0, 0, dimensions.height);
        grad.addColorStop(0, '#1c1917');
        grad.addColorStop(1, '#0c0a09');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      }

      // Render styles
      if (style === 'neon') {
        // 1980 Atari / Synth Grid
        ctx.strokeStyle = `${accentColor}30`;
        ctx.lineWidth = 1;

        // Vertical converging lines
        const horizon = dimensions.height * 0.4;
        const lineCount = 14;
        for (let i = 0; i <= lineCount; i++) {
          const xProgress = i / lineCount;
          const xStart = xProgress * dimensions.width;
          const xEnd = (xProgress - 0.5) * dimensions.width * 2.5 + dimensions.width / 2;
          ctx.beginPath();
          ctx.moveTo(xStart, horizon);
          ctx.lineTo(xEnd, dimensions.height);
          ctx.stroke();
        }

        // Scrolling horizontal lines
        const horizCount = 8;
        const scrollSpeed = 0.5;
        const scrollOffset = (frame * scrollSpeed) % (dimensions.height - horizon);
        
        for (let i = 0; i < horizCount; i++) {
          const y = horizon + Math.pow(i / horizCount, 2) * (dimensions.height - horizon) + scrollOffset;
          if (y < dimensions.height) {
            ctx.strokeStyle = `${accentColor}${Math.floor((y - horizon) / (dimensions.height - horizon) * 60).toString(16).padStart(2, '0')}`;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(dimensions.width, y);
            ctx.stroke();
          }
        }

        // Draw distant neon mountains or glowing horizon sun
        const sunRad = 50;
        const sunX = dimensions.width / 2;
        const sunY = horizon + 10;
        const sunGrad = ctx.createLinearGradient(0, sunY - sunRad, 0, sunY);
        sunGrad.addColorStop(0, '#ff007f');
        sunGrad.addColorStop(1, '#f59e0b');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunRad, Math.PI, 0);
        ctx.fill();

        // Sun lines split (80s look)
        ctx.fillStyle = '#0c0a09';
        for (let i = 1; i <= 5; i++) {
          const splitY = sunY - i * 8;
          ctx.fillRect(sunX - sunRad, splitY, sunRad * 2, 2);
        }
      }

      else if (style === 'memphis') {
        // 1985 Memphis Group Geometric Shapes
        particles.forEach((p) => {
          ctx.fillStyle = p.color;
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 1.5;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle || 0);

          p.angle = (p.angle || 0) + (p.speed || 0.01);

          // Render triangles, squiggles, and grids
          if (p.size % 3 === 0) {
            // Triangle
            ctx.beginPath();
            ctx.moveTo(0, -p.size);
            ctx.lineTo(p.size, p.size);
            ctx.lineTo(-p.size, p.size);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          } else if (p.size % 3 === 1) {
            // Circle
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          } else {
            // Squiggle
            ctx.beginPath();
            ctx.moveTo(-p.size, 0);
            ctx.bezierCurveTo(-p.size/2, -p.size, p.size/2, p.size, p.size, 0);
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 3;
            ctx.stroke();
          }
          ctx.restore();

          // Movement
          p.x += p.vx * 0.4;
          p.y += p.vy * 0.4;

          if (p.x < -20) p.x = dimensions.width + 20;
          if (p.x > dimensions.width + 20) p.x = -20;
          if (p.y < -20) p.y = dimensions.height + 20;
          if (p.y > dimensions.height + 20) p.y = -20;
        });

        // Background dots grid
        ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
        for (let x = 10; x < dimensions.width; x += 20) {
          for (let y = 10; y < dimensions.height; y += 20) {
            ctx.fillRect(x, y, 2, 2);
          }
        }
      }

      else if (style === 'grunge') {
        // 1990 Grunge Noise & Stencils
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);

        // Scattered record scratches and pixelated noise
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.moveTo(Math.random() * dimensions.width, 0);
          ctx.lineTo(Math.random() * dimensions.width, dimensions.height);
          ctx.stroke();
        }

        // Render graffiti stencil circles and lines
        ctx.fillStyle = `${accentColor}10`;
        ctx.strokeStyle = `${accentColor}30`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(dimensions.width / 2, dimensions.height / 2, 45 + Math.sin(frame * 0.02) * 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.beginPath();
        ctx.moveTo(0, dimensions.height * 0.7);
        ctx.lineTo(dimensions.width, dimensions.height * 0.3);
        ctx.stroke();

        // 90s cup-style teal/purple swirl doodle
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 12;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(20, dimensions.height * 0.6);
        ctx.bezierCurveTo(dimensions.width * 0.3, dimensions.height * 0.1, dimensions.width * 0.6, dimensions.height * 0.9, dimensions.width - 20, dimensions.height * 0.4);
        ctx.stroke();

        ctx.strokeStyle = '#d946ef';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(35, dimensions.height * 0.65);
        ctx.bezierCurveTo(dimensions.width * 0.32, dimensions.height * 0.18, dimensions.width * 0.58, dimensions.height * 0.82, dimensions.width - 10, dimensions.height * 0.45);
        ctx.stroke();
      }

      else if (style === 'glitch') {
        // 1995 Classic Desktop & Glitch
        // Draw file system window
        const winW = dimensions.width - 60;
        const winH = dimensions.height - 50;
        const winX = 30;
        const winY = 25;

        // Shadow
        ctx.fillStyle = '#000000';
        ctx.fillRect(winX + 4, winY + 4, winW, winH);

        // Window base (Windows 95 Gray)
        ctx.fillStyle = '#c0c0c0';
        ctx.fillRect(winX, winY, winW, winH);

        // Window blue header bar
        ctx.fillStyle = '#000080';
        ctx.fillRect(winX + 2, winY + 2, winW - 4, 18);

        // Header Text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px monospace';
        ctx.fillText('NostalgiaMachine.exe', winX + 8, winY + 14);

        // [X] Button
        ctx.fillStyle = '#c0c0c0';
        ctx.fillRect(winX + winW - 16, winY + 4, 12, 12);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.strokeRect(winX + winW - 16, winY + 4, 12, 12);
        ctx.fillStyle = '#000000';
        ctx.font = '7px sans-serif';
        ctx.fillText('X', winX + winW - 12, winY + 12);

        // Inner frame (Bevel effect)
        ctx.strokeStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(winX, winY); ctx.lineTo(winX + winW, winY);
        ctx.moveTo(winX, winY); ctx.lineTo(winX, winY + winH);
        ctx.stroke();

        ctx.strokeStyle = '#808080';
        ctx.beginPath();
        ctx.moveTo(winX, winY + winH); ctx.lineTo(winX + winW, winY + winH);
        ctx.moveTo(winX + winW, winY); ctx.lineTo(winX + winW, winY + winH);
        ctx.stroke();

        // Contents - simulated blue progress bar
        ctx.fillStyle = '#808080';
        ctx.fillRect(winX + 15, winY + 30, winW - 30, 15);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(winX + 16, winY + 31, winW - 32, 13);

        const progress = (frame * 0.8) % (winW - 36);
        ctx.fillStyle = '#000080';
        ctx.fillRect(winX + 18, winY + 33, progress, 9);

        ctx.fillStyle = '#000000';
        ctx.font = '8px monospace';
        ctx.fillText('Connecting to dialup... 56k', winX + 15, winY + 65);

        // Periodic horizontal glitch bars
        if (frame % 40 < 4) {
          ctx.fillStyle = 'rgba(255, 0, 255, 0.2)';
          ctx.fillRect(0, Math.random() * dimensions.height, dimensions.width, 10);
          ctx.fillStyle = 'rgba(0, 255, 255, 0.2)';
          ctx.fillRect(0, Math.random() * dimensions.height, dimensions.width, 4);
        }
      }

      else if (style === 'glossy') {
        // 2000 Glossy Y2K Liquid Chrome
        // Morphing blobs using circles with heavy blur/overlapping gradients
        const numBlobs = 3;
        for (let i = 0; i < numBlobs; i++) {
          const x = dimensions.width / 2 + Math.sin(frame * 0.015 + i) * (dimensions.width * 0.25);
          const y = dimensions.height / 2 + Math.cos(frame * 0.02 + i) * (dimensions.height * 0.25);
          const r = 35 + Math.sin(frame * 0.03 + i) * 8;

          // Liquid metallic gel shading
          const radial = ctx.createRadialGradient(x - r/3, y - r/3, 2, x, y, r);
          radial.addColorStop(0, '#ffffff');
          radial.addColorStop(0.2, '#a5f3fc');
          radial.addColorStop(0.6, '#0891b2');
          radial.addColorStop(0.9, '#1e40af');
          radial.addColorStop(1, '#0f172a');

          ctx.fillStyle = radial;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }

        // Futuristic vector arcs
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(dimensions.width / 2, dimensions.height / 2, 70 + Math.sin(frame * 0.01) * 10, 0, Math.PI * 2);
        ctx.stroke();
      }

      else if (style === 'frutiger') {
        // 2005 Frutiger Aero
        // Draw a glossy sky blue gradient background
        const bgGrad = ctx.createLinearGradient(0, 0, 0, dimensions.height);
        bgGrad.addColorStop(0, '#38bdf8');
        bgGrad.addColorStop(0.6, '#bae6fd');
        bgGrad.addColorStop(1, '#10b981'); // Green rolling hill transition
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);

        // Draw rolling green hills
        ctx.fillStyle = '#34d399';
        ctx.beginPath();
        ctx.moveTo(0, dimensions.height);
        ctx.bezierCurveTo(dimensions.width * 0.3, dimensions.height * 0.7, dimensions.width * 0.7, dimensions.height * 0.95, dimensions.width, dimensions.height * 0.75);
        ctx.lineTo(dimensions.width, dimensions.height);
        ctx.fill();

        ctx.fillStyle = '#059669';
        ctx.beginPath();
        ctx.moveTo(0, dimensions.height);
        ctx.bezierCurveTo(dimensions.width * 0.25, dimensions.height * 0.8, dimensions.width * 0.6, dimensions.height * 0.65, dimensions.width, dimensions.height * 0.85);
        ctx.lineTo(dimensions.width, dimensions.height);
        ctx.fill();

        // Animated glossy glass bubbles
        particles.forEach((p) => {
          // Glass highlight effect
          const bubbleGrad = ctx.createRadialGradient(p.x - p.size/3, p.y - p.size/3, 1, p.x, p.y, p.size);
          bubbleGrad.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
          bubbleGrad.addColorStop(0.3, 'rgba(186, 230, 253, 0.4)');
          bubbleGrad.addColorStop(0.9, 'rgba(14, 116, 144, 0.2)');
          bubbleGrad.addColorStop(1, 'rgba(255, 255, 255, 0.15)');

          ctx.fillStyle = bubbleGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Float upwards
          p.y -= Math.abs(p.vy) * 0.3 + 0.1;
          p.x += Math.sin(frame * 0.01 + p.size) * 0.15;

          if (p.y < -p.size) {
            p.y = dimensions.height + p.size;
            p.x = Math.random() * dimensions.width;
          }
        });

        // Abstract abstract glowing light rays (Aura)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.bezierCurveTo(dimensions.width * 0.4, dimensions.height * 0.4, dimensions.width * 0.6, dimensions.height * 0.1, dimensions.width + 10, dimensions.height * 0.8);
        ctx.stroke();
      }

      else if (style === 'flat') {
        // 2010 Flat Material Design Geometric mesh
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);

        // Low-poly flat shards
        const cols = 6;
        const rows = 4;
        const cellW = dimensions.width / (cols - 1);
        const cellH = dimensions.height / (rows - 1);
        
        // Draw polygonal segments
        for (let r = 0; r < rows - 1; r++) {
          for (let c = 0; c < cols - 1; c++) {
            const x1 = c * cellW;
            const y1 = r * cellH + Math.sin(frame * 0.01 + c + r) * 6;
            const x2 = (c + 1) * cellW;
            const y2 = r * cellH + Math.sin(frame * 0.01 + c + 1 + r) * 6;
            const x3 = c * cellW;
            const y3 = (r + 1) * cellH + Math.sin(frame * 0.01 + c + r + 1) * 6;
            const x4 = (c + 1) * cellW;
            const y4 = (r + 1) * cellH + Math.sin(frame * 0.01 + c + 1 + r + 1) * 6;

            // Shade variations
            const colorFactor = Math.abs(Math.sin((c * r) / 2 + frame * 0.005));
            ctx.fillStyle = `rgba(249, 115, 22, ${0.05 + colorFactor * 0.12})`;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
            ctx.lineWidth = 0.5;

            // Triangle 1
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Triangle 2
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x4, y4);
            ctx.lineTo(x3, y3);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          }
        }
      }

      else if (style === 'minimal') {
        // 2015 Minimalist Pastel Gradient Waves
        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);

        // Soft smooth gradient blobs fading
        const gradient = ctx.createRadialGradient(
          dimensions.width / 2 + Math.sin(frame * 0.01) * 40,
          dimensions.height / 2 + Math.cos(frame * 0.01) * 20,
          10,
          dimensions.width / 2,
          dimensions.height / 2,
          120
        );
        gradient.addColorStop(0, '#a78bfa');
        gradient.addColorStop(0.5, '#4c1d95');
        gradient.addColorStop(1, '#1e1b4b');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);

        // Elegant geometric rings
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 4; i++) {
          ctx.beginPath();
          ctx.arc(dimensions.width / 2, dimensions.height / 2, i * 28 + Math.sin(frame * 0.01) * 8, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Single delicate floating circle
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.beginPath();
        ctx.arc(dimensions.width / 2, dimensions.height / 2, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      else if (style === 'cyber') {
        // 2025 Neural Net / Matrix Code Lines
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);

        // Tech grid lines
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.03)';
        ctx.lineWidth = 1;
        for (let x = 0; x < dimensions.width; x += 25) {
          ctx.beginPath();
          ctx.moveTo(x, 0); ctx.lineTo(x, dimensions.height);
          ctx.stroke();
        }
        for (let y = 0; y < dimensions.height; y += 25) {
          ctx.beginPath();
          ctx.moveTo(0, y); ctx.lineTo(dimensions.width, y);
          ctx.stroke();
        }

        // Interconnecting nodes/circuit points
        const nodes = [
          { x: dimensions.width * 0.2, y: dimensions.height * 0.3 },
          { x: dimensions.width * 0.5, y: dimensions.height * 0.25 },
          { x: dimensions.width * 0.8, y: dimensions.height * 0.35 },
          { x: dimensions.width * 0.3, y: dimensions.height * 0.7 },
          { x: dimensions.width * 0.7, y: dimensions.height * 0.75 },
          { x: dimensions.width * 0.5, y: dimensions.height * 0.55 },
        ];

        // Connect lines
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        ctx.lineTo(nodes[1].x, nodes[1].y);
        ctx.lineTo(nodes[5].x, nodes[5].y);
        ctx.lineTo(nodes[3].x, nodes[3].y);
        ctx.moveTo(nodes[1].x, nodes[1].y);
        ctx.lineTo(nodes[2].x, nodes[2].y);
        ctx.lineTo(nodes[5].x, nodes[5].y);
        ctx.lineTo(nodes[4].x, nodes[4].y);
        ctx.stroke();

        // Nodes drawing with glowing effect
        nodes.forEach((node, idx) => {
          const pulse = Math.abs(Math.sin(frame * 0.02 + idx)) * 4 + 2;
          ctx.fillStyle = '#22c55e';
          ctx.beginPath();
          ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = 'rgba(34, 197, 94, 0.4)';
          ctx.beginPath();
          ctx.arc(node.x, node.y, 3 + pulse, 0, Math.PI * 2);
          ctx.stroke();
        });

        // Floating bits stream
        ctx.fillStyle = 'rgba(34, 197, 94, 0.3)';
        ctx.font = '8px monospace';
        for (let i = 0; i < 4; i++) {
          const val = Math.random() > 0.5 ? '1' : '0';
          const rx = (frame * (i + 1) * 0.5) % dimensions.width;
          const ry = 40 + i * 30;
          ctx.fillText(val, rx, ry);
        }
      }

      requestRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [dimensions, era, accentColor]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden" ref={containerRef}>
      {/* Canvas layer */}
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        className="absolute inset-0 z-0"
      />

      {/* Decorative mechanical bezel window */}
      <div className="absolute inset-0 border-2 border-stone-800 pointer-events-none z-10 rounded-md shadow-inner" />

      {/* Canvas HUD Overlay */}
      <div className="absolute top-2 left-2 z-10 flex gap-1 bg-stone-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-stone-800 text-[9px] font-mono select-none">
        <span className="text-stone-500">VISUAL FEED // </span>
        <span className="uppercase font-bold" style={{ color: accentColor }}>{era.visual.eraName}</span>
      </div>

      <div className="absolute top-2 right-2 z-10 flex gap-1 bg-stone-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-stone-800 text-[9px] font-mono text-stone-400 select-none">
        <span>FPS: 60</span>
      </div>

      {/* Retro Archive Info Panel at bottom */}
      <div className="absolute bottom-2 inset-x-2 z-10 bg-stone-950/90 backdrop-blur-md p-2.5 rounded border border-stone-800 flex flex-col gap-1 select-none">
        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-wider text-stone-500 font-mono">FASHION & CULTURE MEMORY</span>
          <div className="flex gap-1">
            {era.visual.keywords.slice(0, 3).map((kw) => (
              <span key={kw} className="text-[8px] font-mono px-1 bg-stone-900 border border-stone-800 text-stone-300 uppercase rounded">
                #{kw}
              </span>
            ))}
          </div>
        </div>
        <p className="text-[11px] leading-snug text-stone-200 mt-1 pl-1 border-l-2" style={{ borderColor: accentColor }}>
          {era.visual.fashionMotif}
        </p>
      </div>
    </div>
  );
}
