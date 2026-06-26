import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  TrendingUp, 
  Newspaper, 
  Tv,
  Clock, 
  ArrowUpRight, 
  Home, 
  Film, 
  Coffee,
  Sparkles,
  CheckCircle,
  HelpCircle,
  Info
} from 'lucide-react';
import { ERAS_DATA } from './data';
import { EraData } from './types';
import NostalgiaDial from './components/NostalgiaDial';
import VisualFrame from './components/VisualFrame';
import SynthEngine from './components/SynthEngine';
import ShareCapsule from './components/ShareCapsule';
import BlueprintView from './components/BlueprintView';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(1); // Default to 1985 (Best starting era!)
  const [showBlueprint, setShowBlueprint] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState('');

  const activeEra = ERAS_DATA[currentIndex];
  const accentColor = activeEra.color.accent;

  // Real-time clock for the VCR cabinet cluster
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getUTCHours()).padStart(2, '0');
      const mins = String(now.getUTCMinutes()).padStart(2, '0');
      const secs = String(now.getUTCSeconds()).padStart(2, '0');
      setCurrentTimeStr(`${hrs}:${mins}:${secs} UTC`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="min-h-screen md:h-screen md:max-h-screen overflow-y-auto md:overflow-hidden text-[#e0e0e0] p-4 md:p-6 flex flex-col justify-between transition-colors duration-1000 bg-[#080808]"
      style={{
        backgroundImage: `radial-gradient(circle at center, ${accentColor}0f 0%, #080808 100%)`
      }}
    >
      
      {/* ---------------- SLEEK INTERFACE HEADER ---------------- */}
      <header className="border-b border-[#333] pb-3 mb-2 flex flex-col md:flex-row items-center justify-between gap-4 select-none relative">
        
        {/* Brand Logo & Glowing LED Indicator */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <h1 
              className="font-led font-black text-xl tracking-[4px] transition-all duration-700 select-none"
              style={{
                color: accentColor,
                textShadow: `0 0 10px ${accentColor}`,
              }}
            >
              THE NOSTALGIA DIAL
            </h1>
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.25em] mt-0.5">
              Sleek skeuomorphic Rotary Timeline Sweep
            </span>
          </div>
          
          {/* Glowing Hardware Power LED */}
          <div className="flex items-center gap-1.5 bg-[#121212] px-2 py-0.5 rounded border border-white/[0.05]">
            <div 
              className="w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 0 10px ${accentColor}`,
              }}
            />
            <span className="text-[8px] font-mono text-zinc-400 tracking-wider">ONLINE</span>
          </div>
        </div>

        {/* Central Display Panel - Recessed glowing VCR LED Display */}
        <div 
          className="bg-black border border-white/10 px-6 py-2 rounded flex items-center justify-center gap-8 relative overflow-hidden crt-glow shadow-inner min-w-[280px] md:min-w-[340px]"
          style={{
            boxShadow: `inset 0 0 15px rgba(0,0,0,0.9), 0 0 10px ${accentColor}15`
          }}
        >
          {/* CRT scanline simulation layer */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_50%,_rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none" />

          {/* VCR icon decals */}
          <div className="flex flex-col items-center font-mono text-[7px] text-stone-600 gap-1">
            <span className="flex items-center gap-1">
              <Tv className="w-2.5 h-2.5 text-stone-500" /> VTR
            </span>
            <span className="text-stone-500 tracking-wider">▲ L-SYNC</span>
          </div>

          {/* Date string */}
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-mono text-stone-500 uppercase tracking-[0.25em] mb-0.5">ACTIVE EPOCH</span>
            <span 
              className="font-led text-xl md:text-2xl font-black tracking-widest transition-all duration-700"
              style={{ 
                color: accentColor,
                textShadow: `0 0 10px ${accentColor}aa`
              }}
            >
              OCT {activeEra.label}
            </span>
          </div>

          <div className="flex flex-col items-center font-mono text-[7px] text-stone-500">
            <span className="tracking-wider animate-pulse">● REC</span>
            <span className="text-stone-600">CH 03</span>
          </div>
        </div>

        {/* Right side Status Capsule & Utility */}
        <div className="flex items-center gap-5">
          {/* Status Capsule */}
          <div className="hidden lg:flex items-center gap-4 font-mono text-[10px] text-zinc-500 tracking-wider border-r border-white/10 pr-5">
            <span>LATENCY: 12MS</span>
            <span>SIGNAL: HIGH_FIDELITY</span>
            <span>SNAP: ENABLED</span>
          </div>

          {/* Specification Toggle Button */}
          <button
            onClick={() => setShowBlueprint(true)}
            id="view-blueprint-button"
            className="flex items-center gap-2 px-3 py-1.5 rounded border border-[#333] bg-[#121212] hover:bg-zinc-900 text-zinc-300 text-xs font-mono font-bold tracking-wide transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            <span>SPEC BLUEPRINT</span>
          </button>
        </div>

      </header>

      {/* ---------------- BENTO GRID DASHBOARD ---------------- */}
      <main className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 my-4 min-h-0 overflow-y-auto md:overflow-hidden">
        
        {/* ========= LEFT COLUMN (Tiles 1 & 4) ========= */}
        <section className="md:col-span-4 flex flex-col gap-4 min-h-0 overflow-hidden" id="left-column">
          
          {/* TILE 1 (The Sonic Engine) */}
          <div className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-lg shadow-lg backdrop-blur-sm overflow-hidden flex flex-col justify-between relative">
            <div className="absolute top-1 left-1.5 text-zinc-700 font-mono text-[9px]">⊖</div>
            <div className="absolute top-1 right-1.5 text-zinc-700 font-mono text-[9px]">⊖</div>
            
            <div className="p-4 pb-0">
              <div className="font-mono text-[9px] uppercase tracking-[1.3px] text-zinc-400 border-b border-white/10 pb-1.5 mb-1.5 w-full">
                [01] SONIC ENGINE
              </div>
            </div>

            <div className="flex-1">
              <SynthEngine era={activeEra} accentColor={accentColor} />
            </div>
          </div>

          {/* TILE 4 (The Price Check Index) */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-4 shadow-lg backdrop-blur-sm relative select-none">
            
            {/* Decal corners */}
            <div className="absolute top-1 left-1.5 text-zinc-700 font-mono text-[9px]">⊖</div>
            <div className="absolute top-1 right-1.5 text-zinc-700 font-mono text-[9px]">⊖</div>

            {/* Header */}
            <div className="font-mono text-[9px] uppercase tracking-[1.3px] text-zinc-400 border-b border-white/10 pb-1.5 mb-3 w-full">
              [04] PRICE CHECK INDEX
            </div>

            <p className="text-[10px] text-zinc-400 mb-3 leading-relaxed font-sans">
              Comparison of average costs in <strong>{activeEra.label}</strong> vs modern day. Observe the dynamic purchase power shifting.
            </p>

            {/* Price Cards Grid */}
            <div className="space-y-1">
              
              {/* Item: Gasoline */}
              <div className="flex justify-between items-center font-mono text-xs py-2 border-b border-white/[0.03] hover:bg-white/[0.01] px-1 transition-colors">
                <span className="text-zinc-400 font-semibold uppercase tracking-wide">GALLON GAS</span>
                <div className="text-right">
                  <span className="text-white font-bold">{activeEra.prices.gas.cost}</span>
                  <span className="text-[10px] text-zinc-500 ml-2 font-normal">({activeEra.prices.gas.inflation} adj)</span>
                </div>
              </div>

              {/* Item: Gallon of Milk */}
              <div className="flex justify-between items-center font-mono text-xs py-2 border-b border-white/[0.03] hover:bg-white/[0.01] px-1 transition-colors">
                <span className="text-zinc-400 font-semibold uppercase tracking-wide">GALLON MILK</span>
                <div className="text-right">
                  <span className="text-white font-bold">{activeEra.prices.milk.cost}</span>
                  <span className="text-[10px] text-zinc-500 ml-2 font-normal">({activeEra.prices.milk.inflation} adj)</span>
                </div>
              </div>

              {/* Item: Movie Ticket */}
              <div className="flex justify-between items-center font-mono text-xs py-2 border-b border-white/[0.03] hover:bg-white/[0.01] px-1 transition-colors">
                <span className="text-zinc-400 font-semibold uppercase tracking-wide">MOVIE TICKET</span>
                <div className="text-right">
                  <span className="text-white font-bold">{activeEra.prices.ticket.cost}</span>
                  <span className="text-[10px] text-zinc-500 ml-2 font-normal">({activeEra.prices.ticket.inflation} adj)</span>
                </div>
              </div>

              {/* Item: Average House */}
              <div className="flex justify-between items-center font-mono text-xs py-2 hover:bg-white/[0.01] px-1 transition-colors">
                <span className="text-zinc-400 font-semibold uppercase tracking-wide">NEW HOME</span>
                <div className="text-right">
                  <span className="text-white font-bold">{activeEra.prices.house.cost}</span>
                  <span className="text-[10px] text-zinc-500 ml-2 font-normal">({activeEra.prices.house.inflation} adj)</span>
                </div>
              </div>

            </div>
          </div>

        </section>

        {/* ========= MIDDLE COLUMN (The Primary Control Deck) ========= */}
        <section className="md:col-span-4 bg-white/[0.02] border border-white/[0.05] rounded-lg p-5 shadow-2xl flex flex-col justify-between items-center relative overflow-hidden" id="middle-column">
          
          {/* Subtle grid mesh overlays matching the Sleek style */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#080808]/80 z-0 pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          {/* Frame decorative screws */}
          <div className="absolute top-1.5 left-2 text-zinc-700 font-mono text-[9px] z-10">⊖</div>
          <div className="absolute top-1.5 right-2 text-zinc-700 font-mono text-[9px] z-10">⊖</div>
          <div className="absolute bottom-1.5 left-2 text-zinc-700 font-mono text-[9px] z-10">⊖</div>
          <div className="absolute bottom-1.5 right-2 text-zinc-700 font-mono text-[9px] z-10">⊖</div>

          {/* Module Label */}
          <div className="w-full text-center border-b border-white/10 pb-2 z-10 select-none">
            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-[0.25em] font-black">
              CONSOLE MASTER CONTROL DECK
            </span>
            <p className="text-[10px] text-zinc-500 font-sans mt-0.5">Skeuomorphic Rotary Timeline Sweep</p>
          </div>

          {/* Central Dial Component */}
          <div className="my-auto z-10">
            <NostalgiaDial 
              eras={ERAS_DATA} 
              currentIndex={currentIndex} 
              onChange={setCurrentIndex} 
              accentColor={accentColor}
            />
          </div>

          {/* Status logs */}
          <div className="w-full bg-[#121212]/90 border border-white/[0.05] p-3 rounded text-center z-10 select-none">
            <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
              <span>TIMELINE STATUS // </span>
              <span className="font-bold uppercase" style={{ color: accentColor }}>STABILIZED</span>
            </div>
            <p className="text-[11px] font-sans text-zinc-300 leading-relaxed mt-1 text-center font-medium px-2">
              "{activeEra.vibeDescription}"
            </p>
          </div>

        </section>

        {/* ========= RIGHT COLUMN (Tiles 2 & 3) ========= */}
        <section className="md:col-span-4 flex flex-col gap-4 min-h-0 overflow-hidden" id="right-column">
          
          {/* TILE 2 (The News Canvas) */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-4 shadow-lg backdrop-blur-sm relative select-none">
            
            {/* Decal corners */}
            <div className="absolute top-1 left-1.5 text-zinc-700 font-mono text-[9px]">⊖</div>
            <div className="absolute top-1 right-1.5 text-zinc-700 font-mono text-[9px]">⊖</div>

            {/* Header */}
            <div className="font-mono text-[9px] uppercase tracking-[1.3px] text-zinc-400 border-b border-white/10 pb-1.5 mb-3 w-full">
              [02] NEWS CANVAS
            </div>

            <p className="text-[10px] text-zinc-400 mb-3.5 leading-relaxed font-sans">
              Exactly 3 pop-culture or global headlines curated from the active time node:
            </p>

            {/* Curated Headlines List */}
            <div className="space-y-3.5">
              {activeEra.news.map((item, idx) => (
                <div 
                  key={idx} 
                  className="border-l-2 pl-3.5 py-0.5 transition-colors duration-200"
                  style={{ borderColor: accentColor }}
                >
                  <p className="text-xs font-sans leading-relaxed text-zinc-300 text-left font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* TILE 3 (The Visual Frame) */}
          <div className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-lg shadow-lg backdrop-blur-sm overflow-hidden flex flex-col relative">
            
            {/* Bezel screws */}
            <div className="absolute top-1 left-1.5 text-zinc-700 font-mono text-[9px] z-20">⊖</div>
            <div className="absolute top-1 right-1.5 text-zinc-700 font-mono text-[9px] z-20">⊖</div>

            {/* Frame Section Header */}
            <div className="bg-black/60 px-4 py-2 border-b border-white/[0.05] flex items-center justify-between select-none z-10">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" style={{ color: accentColor }} />
                <span className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-wider">
                  [03] VISUAL FRAME
                </span>
              </div>
              <span className="text-[8px] font-mono text-zinc-600">CANVAS_ACTIVE //</span>
            </div>

            {/* Generative Frame Canvas Body */}
            <div className="flex-1 min-h-[140px] relative">
              <VisualFrame era={activeEra} accentColor={accentColor} />
            </div>

          </div>

        </section>

      </main>

      {/* ---------------- CHASSIS DECK FOOTER (Viral Share Capsule & Meta) ---------------- */}
      <footer className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-4 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-4 select-none relative">
        
        {/* Screw Decals */}
        <div className="absolute top-1 left-1.5 text-zinc-700 font-mono text-[9px]">⊖</div>
        <div className="absolute top-1 right-1.5 text-zinc-700 font-mono text-[9px]">⊖</div>

        {/* Technical patent watermark */}
        <div className="text-left font-mono text-[9px] text-zinc-500">
          <span>MODEL ID: ND-V1-1980_2025 // PATENT PENDING // MADE IN THE AI AGENT LABS</span>
          <span className="block text-[8px] text-zinc-600 mt-0.5">TERMS: 100% Client-Side Synthesized Experience. No External CD-ROM Required.</span>
        </div>

        {/* Dynamic active era info banner */}
        <div className="flex items-center gap-2 bg-[#121212]/80 px-3.5 py-1.5 rounded border border-white/[0.05] text-xs font-mono font-bold text-zinc-400">
          <Info className="w-3.5 h-3.5 text-zinc-500" style={{ color: accentColor }} />
          <span>CURRENT TIMELINE SEED CORRELATION INDEX:</span>
          <span style={{ color: accentColor }} className="animate-pulse">+{activeEra.year}</span>
        </div>

        {/* Integrated Viral Share Capsule UI */}
        <div className="min-w-[280px]">
          <ShareCapsule era={activeEra} accentColor={accentColor} />
        </div>

      </footer>

      {/* ---------------- BLUEPRINT VIEW MODAL ---------------- */}
      {showBlueprint && (
        <BlueprintView 
          onClose={() => setShowBlueprint(false)} 
          accentColor={accentColor} 
        />
      )}

    </div>
  );
}
