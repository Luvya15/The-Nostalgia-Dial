import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, HelpCircle } from 'lucide-react';
import { EraData } from '../types';

interface SynthEngineProps {
  era: EraData;
  accentColor: string;
}

export default function SynthEngine({ era, accentColor }: SynthEngineProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);
  const intervalIdRef = useRef<number | null>(null);
  const stepRef = useRef<number>(0);

  // Real-time animated waveform bars
  const [waveBars, setWaveBars] = useState<number[]>(Array(18).fill(4));

  // Initialize Audio Context and Main Gain
  const initAudio = () => {
    if (audioCtxRef.current) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(isMuted ? 0 : volume, ctx.currentTime);
      mainGain.connect(ctx.destination);

      audioCtxRef.current = ctx;
      mainGainRef.current = mainGain;
    } catch (e) {
      console.error('Failed to initialize Web Audio context', e);
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    initAudio();
    
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    setIsPlaying(!isPlaying);
  };

  // Update volume in real-time
  useEffect(() => {
    if (mainGainRef.current && audioCtxRef.current) {
      const currentVol = isMuted ? 0 : volume;
      mainGainRef.current.gain.linearRampToValueAtTime(currentVol * 0.15, audioCtxRef.current.currentTime + 0.1);
    }
  }, [volume, isMuted]);

  // Handle playing music loops
  useEffect(() => {
    if (!isPlaying) {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      return;
    }

    const playStep = () => {
      const ctx = audioCtxRef.current;
      const mainGain = mainGainRef.current;
      if (!ctx || !mainGain) return;

      const time = ctx.currentTime;
      const step = stepRef.current;
      const type = era.music.synthType;

      // Animate waveform representation on beat ticks
      setWaveBars((prev) => prev.map(() => Math.floor(Math.random() * 24) + 6));

      // 16-step sequencer loops
      try {
        if (type === '8bit') {
          // 1980: Square-wave bouncy arpeggio
          const notes = [130, 164, 196, 220, 261, 329, 392, 440];
          const activeNote = notes[step % notes.length];
          
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(activeNote, time);

          // Fast decay filter envelope
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(2000, time);
          filter.frequency.exponentialRampToValueAtTime(100, time + 0.1);

          gain.gain.setValueAtTime(0.3, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(mainGain);

          osc.start(time);
          osc.stop(time + 0.15);

          // Simple Chiptune Bleep
          if (step % 4 === 2) {
            const noise = ctx.createOscillator();
            const noiseGain = ctx.createGain();
            noise.type = 'triangle';
            noise.frequency.setValueAtTime(1000, time);
            noiseGain.gain.setValueAtTime(0.15, time);
            noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);
            noise.connect(noiseGain);
            noiseGain.connect(mainGain);
            noise.start(time);
            noise.stop(time + 0.06);
          }
        } 
        
        else if (type === 'synthwave') {
          // 1985: Bouncy synthwave bass + retro chord
          const bassline = [110, 110, 130, 130, 98, 98, 87, 87];
          const bassNote = bassline[Math.floor(step / 2) % bassline.length];

          // Sub bass saw
          const bassOsc = ctx.createOscillator();
          const bassGain = ctx.createGain();
          bassOsc.type = 'sawtooth';
          bassOsc.frequency.setValueAtTime(bassNote / 2, time);
          bassGain.gain.setValueAtTime(0.4, time);
          bassGain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

          bassOsc.connect(bassGain);
          bassGain.connect(mainGain);
          bassOsc.start(time);
          bassOsc.stop(time + 0.2);

          // Synth Brass chord lead on beat 1 & 9
          if (step % 8 === 0) {
            const chords = [
              [220, 261, 329], // Am
              [261, 329, 392], // C
              [196, 246, 293], // G
              [174, 220, 261]  // F
            ];
            const activeChord = chords[Math.floor(step / 8) % chords.length];

            activeChord.forEach((f) => {
              const chordOsc = ctx.createOscillator();
              const chordGain = ctx.createGain();
              chordOsc.type = 'sawtooth';
              chordOsc.frequency.setValueAtTime(f, time);

              const filter = ctx.createBiquadFilter();
              filter.type = 'lowpass';
              filter.frequency.setValueAtTime(1500, time);
              filter.frequency.exponentialRampToValueAtTime(500, time + 0.4);

              chordGain.gain.setValueAtTime(0.15, time);
              chordGain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

              chordOsc.connect(filter);
              filter.connect(chordGain);
              chordGain.connect(mainGain);

              chordOsc.start(time);
              chordOsc.stop(time + 0.65);
            });
          }
        } 
        
        else if (type === 'eurodance') {
          // 1990: Deep organ-bass + 90s Club Piano Chord
          const bassline = [130, 146, 164, 196];
          const note = bassline[Math.floor(step / 4) % bassline.length];

          const bassOsc = ctx.createOscillator();
          const bassGain = ctx.createGain();
          bassOsc.type = 'triangle';
          bassOsc.frequency.setValueAtTime(note, time);
          bassGain.gain.setValueAtTime(0.5, time);
          bassGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);

          bassOsc.connect(bassGain);
          bassGain.connect(mainGain);
          bassOsc.start(time);
          bassOsc.stop(time + 0.25);

          // M1 Piano Chord Stabs on upbeat
          if (step % 4 === 1 || step % 4 === 3) {
            const notes = [261, 329, 392, 493]; // Major 7th
            notes.forEach((f) => {
              const pianoOsc = ctx.createOscillator();
              const pianoGain = ctx.createGain();
              pianoOsc.type = 'sine';
              pianoOsc.frequency.setValueAtTime(f, time);
              pianoGain.gain.setValueAtTime(0.08, time);
              pianoGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

              pianoOsc.connect(pianoGain);
              pianoGain.connect(mainGain);
              pianoOsc.start(time);
              pianoOsc.stop(time + 0.16);
            });
          }
        } 
        
        else if (type === 'grunge') {
          // 1995: Slow alternative grunge minor groove
          const chordNotes = [
            [146, 174, 220], // D minor
            [130, 164, 196], // C major
            [110, 130, 164], // A minor
            [116, 146, 174]  // Bb major
          ];
          const activeIndex = Math.floor(step / 4) % chordNotes.length;

          // Low guitar-synth hum
          if (step % 2 === 0) {
            const sub = ctx.createOscillator();
            const subGain = ctx.createGain();
            sub.type = 'sawtooth';
            sub.frequency.setValueAtTime(chordNotes[activeIndex][0] / 2, time);

            const lowpass = ctx.createBiquadFilter();
            lowpass.type = 'lowpass';
            lowpass.frequency.setValueAtTime(300, time);

            subGain.gain.setValueAtTime(0.25, time);
            subGain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

            sub.connect(lowpass);
            lowpass.connect(subGain);
            subGain.connect(mainGain);
            sub.start(time);
            sub.stop(time + 0.38);
          }
        } 
        
        else if (type === 'y2k') {
          // 2000: Glossy Trance Arpeggiator Sweep
          const melody = [261, 293, 329, 392, 440, 392, 329, 293];
          const activeFreq = melody[step % melody.length];

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const delay = ctx.createDelay();
          const feedback = ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(activeFreq * 1.5, time);

          const bp = ctx.createBiquadFilter();
          bp.type = 'bandpass';
          bp.frequency.setValueAtTime(1200 + Math.sin(step * 0.1) * 600, time);

          gain.gain.setValueAtTime(0.08, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

          // Trance delay feedback loop
          delay.delayTime.setValueAtTime(0.24, time);
          feedback.gain.setValueAtTime(0.4, time);

          osc.connect(bp);
          bp.connect(gain);
          gain.connect(mainGain);

          // Connect delay
          gain.connect(delay);
          delay.connect(feedback);
          feedback.connect(delay);
          feedback.connect(mainGain);

          osc.start(time);
          osc.stop(time + 0.15);
        } 
        
        else if (type === 'rnb') {
          // 2005: Smooth electric piano chill progression
          if (step % 8 === 0) {
            const chords = [
              [196, 246, 293, 349], // Gmaj7
              [220, 261, 329, 392], // Amin7
              [164, 207, 246, 293], // Emaj7
              [174, 220, 261, 311]  // Fmaj7
            ];
            const currentChord = chords[Math.floor(step / 8) % chords.length];

            currentChord.forEach((f, index) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sine';
              // Arpeggiate chord notes slightly for electric piano vibe
              osc.frequency.setValueAtTime(f, time + index * 0.04);
              
              gain.gain.setValueAtTime(0.12, time + index * 0.04);
              gain.gain.exponentialRampToValueAtTime(0.001, time + 1.2);

              osc.connect(gain);
              gain.connect(mainGain);
              osc.start(time + index * 0.04);
              osc.stop(time + 1.3);
            });
          }
        } 
        
        else if (type === 'electro') {
          // 2010: Heavy saw club loop
          const melody = [110, 110, 220, 110, 130, 130, 196, 146];
          const f = melody[step % melody.length];

          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = 'sawtooth';
          osc1.frequency.setValueAtTime(f, time);
          
          // Detune osc2 for that classic EDM supersaw fatness
          osc2.type = 'sawtooth';
          osc2.frequency.setValueAtTime(f + 4, time);

          gain.gain.setValueAtTime(0.14, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(mainGain);

          osc1.start(time);
          osc1.stop(time + 0.15);
          osc2.start(time);
          osc2.stop(time + 0.15);
        } 
        
        else if (type === 'tropical') {
          // 2015: Tropical house marimba/wood block sound
          const pattern = [329, 392, 440, 523, 587, 523, 440, 392];
          const f = pattern[step % pattern.length];

          if (step % 2 === 0) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f * 1.5, time);

            // Fast organic strike decay
            gain.gain.setValueAtTime(0.2, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

            osc.connect(gain);
            gain.connect(mainGain);
            osc.start(time);
            osc.stop(time + 0.1);
          }
        } 
        
        else if (type === 'vapor') {
          // 2020: Slow vaporwave warm low-pass sweep
          if (step % 8 === 0) {
            const chords = [
              [164, 207, 246], // E Major
              [146, 185, 220], // D Major
              [130, 164, 196], // C Major
              [146, 185, 220]  // D Major
            ];
            const currentChord = chords[Math.floor(step / 8) % chords.length];

            currentChord.forEach((f) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(f, time);

              // Lowpass filter sweeping downwards slowly
              const filter = ctx.createBiquadFilter();
              filter.type = 'lowpass';
              filter.frequency.setValueAtTime(800, time);
              filter.frequency.exponentialRampToValueAtTime(150, time + 1.2);

              gain.gain.setValueAtTime(0.18, time);
              gain.gain.exponentialRampToValueAtTime(0.001, time + 1.5);

              osc.connect(filter);
              filter.connect(gain);
              gain.connect(mainGain);

              osc.start(time);
              osc.stop(time + 1.6);
            });
          }
        } 
        
        else if (type === 'cyberpunk') {
          // 2025: Futuristic high-frequency lasers + industrial glitches
          const pitch = [180, 60, 400, 100, 90, 800, 50, 120];
          const activePitch = pitch[step % pitch.length];

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(activePitch, time);
          // Glitchy exponential pitch modulation (sweeps)
          osc.frequency.exponentialRampToValueAtTime(20, time + 0.1);

          gain.gain.setValueAtTime(0.15, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.11);

          osc.connect(gain);
          gain.connect(mainGain);
          osc.start(time);
          osc.stop(time + 0.12);
        }
      } catch (err) {
        console.warn('Synth trigger error', err);
      }

      stepRef.current = (step + 1) % 16;
      setCurrentStep(stepRef.current);
    };

    // Calculate dynamic delay time based on era's BPM tempo
    const stepDurationMs = (60000 / era.music.tempo) / 4; // 16th notes
    intervalIdRef.current = window.setInterval(playStep, stepDurationMs);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isPlaying, era]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  // Soft animation for visualizer blocks when paused
  useEffect(() => {
    if (isPlaying) return;
    const interval = setInterval(() => {
      setWaveBars((prev) => prev.map((bar) => {
        const diff = (Math.random() - 0.5) * 1.5;
        const next = Math.max(2, Math.min(10, bar + diff));
        return next;
      }));
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex flex-col h-full justify-between p-4 bg-transparent" id="sonic-engine">
      
      {/* Header and Status */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-white/[0.03] border border-white/10 text-zinc-400">
            <Music className="w-4 h-4" style={{ color: isPlaying ? accentColor : undefined }} />
          </div>
          <div>
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">ERA SONIC FEED</span>
            <span className="text-xs font-sans font-bold tracking-tight text-zinc-200">
              {era.music.track}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">ARTIST</span>
          <span className="text-xs font-mono font-semibold" style={{ color: accentColor }}>
            {era.music.artist}
          </span>
        </div>
      </div>

      {/* Embedded Visualizer Graphic (Synthesized) */}
      <div className="my-4 h-16 flex items-center justify-center bg-black/40 rounded border border-white/5 px-3 relative overflow-hidden">
        
        {/* Neon scanline overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_50%,_rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none" />

        {/* LED Level bars */}
        <div className="flex items-end gap-1.5 w-full justify-between h-10 z-10">
          {waveBars.map((val, idx) => (
            <div
              key={idx}
              className="w-1.5 rounded-t-sm transition-all duration-75"
              style={{
                height: `${(val / 30) * 100}%`,
                backgroundColor: isPlaying ? accentColor : '#52525b',
                boxShadow: isPlaying ? `0 0 12px ${accentColor}dd` : 'none',
              }}
            />
          ))}
        </div>

        {/* Floating text stats */}
        <div className="absolute bottom-1 right-2 text-[8px] font-mono text-zinc-600 flex gap-2">
          <span>BPM: {era.music.tempo}</span>
          <span>KEY: {era.music.keyName}</span>
        </div>
      </div>

      {/* Player controls */}
      <div className="flex items-center justify-between bg-[#121212]/80 rounded-md border border-white/5 p-2.5">
        
        {/* Play trigger button */}
        <button
          onClick={togglePlay}
          id="play-button"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-mono font-bold tracking-wide uppercase transition-all shadow border cursor-pointer"
          style={{
            backgroundColor: isPlaying ? '#18181b' : accentColor,
            color: isPlaying ? accentColor : '#09090b',
            borderColor: isPlaying ? `${accentColor}40` : 'transparent',
            boxShadow: isPlaying ? 'none' : `0 0 10px ${accentColor}50`,
          }}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>PAUSE LINK</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>SYNTH PLAY</span>
            </>
          )}
        </button>

        {/* Audio context click-to-activate notice */}
        <span className="text-[9px] font-mono text-zinc-500 uppercase flex items-center gap-1">
          <HelpCircle className="w-3 h-3" />
          WebAudio Synth
        </span>

        {/* Volume controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" style={{ color: isPlaying ? accentColor : undefined }} />
            )}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-16 h-1 rounded bg-zinc-800 appearance-none cursor-pointer"
            style={{
              accentColor: isPlaying ? accentColor : '#71717a',
            }}
          />
        </div>

      </div>

    </div>
  );
}
