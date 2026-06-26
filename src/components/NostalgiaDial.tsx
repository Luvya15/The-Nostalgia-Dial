import React, { useRef, useState, useEffect } from 'react';
import { EraData } from '../types';

interface NostalgiaDialProps {
  eras: EraData[];
  currentIndex: number;
  onChange: (index: number) => void;
  accentColor: string;
}

export default function NostalgiaDial({ eras, currentIndex, onChange, accentColor }: NostalgiaDialProps) {
  const dialRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Helper to trigger a realistic mechanical click sound using Web Audio API
  const playClickSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Synthesize a nice mechanical click
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.015);

      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.015);
    } catch (e) {
      console.warn('Audio click failed to play', e);
    }
  };

  // Convert an index to its target angle in degrees (-120 to +120)
  const indexToAngle = (idx: number) => {
    const sweep = 240; // Total sweep angle
    const minAngle = -120;
    const step = sweep / (eras.length - 1);
    return minAngle + idx * step;
  };

  const currentAngle = indexToAngle(currentIndex);

  // Handle dial rotation drag math
  const handleMove = (clientX: number, clientY: number) => {
    if (!dialRef.current) return;

    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate angle in radians, then convert to degrees
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    let angleRad = Math.atan2(deltaY, deltaX);
    let angleDeg = angleRad * (180 / Math.PI);

    // Normalize angle so 0 is at the top (pointing up), and goes from -180 to 180
    // Currently, atan2 has 0 at the right, pointing right.
    // Let's rotate it by 90 degrees clockwise to make top correspond to 0 degrees.
    angleDeg = angleDeg + 90;
    if (angleDeg > 180) angleDeg -= 360;
    if (angleDeg < -180) angleDeg += 360;

    // Constrain angle to the -120 to 120 sweep range
    const clampedAngle = Math.max(-120, Math.min(120, angleDeg));

    // Map clamped angle back to index
    const sweep = 240;
    const minAngle = -120;
    const percentage = (clampedAngle - minAngle) / sweep;
    const targetIdx = Math.round(percentage * (eras.length - 1));

    if (targetIdx !== currentIndex && targetIdx >= 0 && targetIdx < eras.length) {
      onChange(targetIdx);
      playClickSound();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX, e.clientY);
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      window.addEventListener('touchend', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging, currentIndex]);

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 select-none" id="control-deck">
      {/* Ticks and dial container */}
      <div className="relative w-72 h-72 flex items-center justify-center bg-stone-900 rounded-full border-4 border-stone-800 shadow-inner">
        
        {/* Static mechanical details */}
        <div className="absolute inset-2 rounded-full border border-stone-800 bg-stone-950/60" />

        {/* Dynamic circular track of tick marks */}
        {eras.map((era, idx) => {
          const tickAngle = indexToAngle(idx);
          const isActive = idx === currentIndex;
          
          return (
            <button
              key={era.id}
              onClick={() => {
                onChange(idx);
                playClickSound();
              }}
              style={{
                transform: `rotate(${tickAngle}deg) translateY(-118px)`,
              }}
              className="absolute group flex flex-col items-center cursor-pointer origin-bottom h-[118px] transition-all"
              title={`Jump to ${era.label}`}
              id={`tick-${era.id}`}
            >
              {/* Highlight active indicator tick */}
              <div
                className="w-1.5 h-4 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isActive ? accentColor : '#44403c',
                  boxShadow: isActive ? `0 0 10px ${accentColor}` : 'none',
                }}
              />
              
              {/* Year Label, rotated back upright for readability */}
              <span
                className={`text-[10px] font-mono mt-1 font-bold tracking-tight transition-all duration-300 ${
                  isActive ? 'scale-110 opacity-100' : 'opacity-40 group-hover:opacity-75'
                }`}
                style={{
                  color: isActive ? accentColor : '#a8a29e',
                  transform: `rotate(${-tickAngle}deg) translateY(4px)`,
                  textShadow: isActive ? `0 0 8px ${accentColor}40` : 'none',
                }}
              >
                {era.label}
              </span>
            </button>
          );
        })}

        {/* The prominent skeuomorphic dial itself */}
        <div
          ref={dialRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{
            transform: `rotate(${currentAngle}deg)`,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
          className={`relative w-44 h-44 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center select-none shadow-[0_15px_30px_rgba(0,0,0,0.8),_inset_0_2px_4px_rgba(255,255,255,0.2)] bg-gradient-to-br from-stone-600 via-stone-800 to-stone-950 border-[6px] border-stone-800 ${
            isDragging ? 'scale-[1.02]' : 'hover:scale-[1.01]'
          } transition-transform duration-200`}
        >
          {/* Brushed magnesium circular gradient effect overlay */}
          <div className="absolute inset-0.5 rounded-full bg-[radial-gradient(circle_at_center,_#57534e_0%,_#292524_80%,_#1c1917_100%)] opacity-85" />
          
          {/* Concentric grooved ring textures */}
          <div className="absolute w-36 h-36 rounded-full border border-stone-700/50" />
          <div className="absolute w-28 h-28 rounded-full border border-stone-700/30" />
          <div className="absolute w-20 h-20 rounded-full border border-stone-950 bg-stone-900/40" />

          {/* Knurled grip ridges on the dial rim (Visual simulation) */}
          <div className="absolute inset-0 rounded-full border border-dashed border-stone-900/30 rotate-12" />
          <div className="absolute inset-0 rounded-full border border-dashed border-stone-900/30 rotate-45" />

          {/* Physical pointer notch */}
          <div className="absolute top-2 w-1.5 h-10 rounded-full bg-stone-200 shadow-[0_1px_4px_rgba(0,0,0,0.6)] z-10">
            {/* Indented indicator dot on the tip of the pointer */}
            <div
              className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          </div>

          {/* Center cap piece */}
          <div className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-stone-900 to-stone-700 border border-stone-600 flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 rounded-full bg-stone-950 border border-stone-800" />
          </div>
        </div>

        {/* Calibration center line at 0 degrees */}
        <div className="absolute top-1.5 w-0.5 h-1.5 bg-stone-600" />
      </div>

      {/* Instructional Tag */}
      <p className="text-[10px] uppercase tracking-[0.25em] font-mono text-stone-500 mt-3 flex items-center gap-1.5 animate-pulse">
        <span>◀</span> Drag Dial or Tap Year to Move Timeline <span>▶</span>
      </p>
    </div>
  );
}
