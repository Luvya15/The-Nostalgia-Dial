import React from 'react';
import { BookOpen, X, Code, Palette, Zap, Cpu, Award } from 'lucide-react';

interface BlueprintViewProps {
  onClose: () => void;
  accentColor: string;
}

export default function BlueprintView({ onClose, accentColor }: BlueprintViewProps) {
  return (
    <div className="fixed inset-0 bg-stone-950/95 backdrop-blur-lg z-50 flex justify-end select-text animate-fade-in">
      <div 
        className="w-full max-w-2xl h-full bg-stone-900 border-l border-stone-800 flex flex-col justify-between shadow-2xl relative"
        id="blueprint-panel"
      >
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" style={{ color: accentColor }} />
            <span className="font-display font-bold text-stone-200 uppercase tracking-tight">
              UX SPECIFICATION & DEVELOPMENT BLUEPRINT
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-850 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable blueprint body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 font-sans text-stone-300 leading-relaxed text-sm">
          
          {/* Intro Section */}
          <section className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-stone-950 border border-stone-800 text-xs font-mono" style={{ color: accentColor }}>
              <Award className="w-3.5 h-3.5" />
              <span>THE NOSTALGIA DIAL // CULTURAL TIME MACHINE</span>
            </div>
            <p className="text-stone-400">
              This technical document outlines the high-fidelity UI/UX architecture, visual style guides, state mechanics, and viral hooks engineered for "The Nostalgia Dial." It functions as the comprehensive blueprints for full-scale development.
            </p>
          </section>

          {/* Layer 1: Interactive Interface */}
          <section className="space-y-4">
            <h3 className="text-base font-bold text-stone-100 flex items-center gap-2 font-display uppercase tracking-tight border-b border-stone-800 pb-1">
              <Cpu className="w-4 h-4" style={{ color: accentColor }} />
              1. Interactive Interface & Control Deck
            </h3>
            
            <div className="space-y-4 pl-2 border-l border-stone-800">
              <div>
                <strong className="text-stone-200 block text-xs uppercase font-mono tracking-wider">The Control Deck:</strong>
                <p className="text-stone-400 mt-1">
                  At the core is a prominent, skeuomorphic rotary dial or slider that mimics solid, sandblasted hardware. It utilizes radial CSS gradients and linear shadow offsets for realistic depth. Drag mechanics translate Cartesian cursor coordinates to polar angles (using <code className="font-mono text-xs px-1 py-0.5 bg-stone-950 rounded text-amber-500">Math.atan2</code>). Dial steps snap tightly to pre-configured era intervals, triggering synthesized 15ms high-frequency audio pops to simulate mechanical clicks.
                </p>
              </div>

              <div>
                <strong className="text-stone-200 block text-xs uppercase font-mono tracking-wider">The Modular Grid Layout:</strong>
                <p className="text-stone-400 mt-1">
                  A high-density 4-tile grid dashboard designed to fit completely within a single, non-scrolling desktop viewport:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-stone-400">
                  <li><strong>Tile 1 (Sonic Engine):</strong> Embedded micro-player. Displays Billboard top track, artist, and keys. Hosts an animated LED/SVG waveform synced to active playback.</li>
                  <li><strong>Tile 2 (News Canvas):</strong> Highly curated typography panel displaying exactly 3 critical global pop-culture headlines of that period.</li>
                  <li><strong>Tile 3 (Visual Frame):</strong> Interactive HTML5 Canvas rendering real-time generative art matching historical visual epochs (e.g. Memphis pastels, Y2K fluid chrome, Frutiger Aero drops).</li>
                  <li><strong>Tile 4 (Price Check Index):</strong> Tabular inflation index checking historical cost parameters (Gas, Milk, Tickets, Houses) against modern values.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Layer 2: Visual Style System */}
          <section className="space-y-4">
            <h3 className="text-base font-bold text-stone-100 flex items-center gap-2 font-display uppercase tracking-tight border-b border-stone-800 pb-1">
              <Palette className="w-4 h-4" style={{ color: accentColor }} />
              2. Visual Style System (Skeuomorphic Retrowave)
            </h3>

            <div className="space-y-4 pl-2 border-l border-stone-800">
              <div>
                <strong className="text-stone-200 block text-xs uppercase font-mono tracking-wider">Interface Textures & Tactility:</strong>
                <p className="text-stone-400 mt-1">
                  Surfaces simulate metallic panels (magnesium / aluminum) with dual outer borders (<code className="font-mono text-xs px-1 bg-stone-950 rounded text-amber-500">border-stone-800</code> & <code className="font-mono text-xs px-1 bg-stone-950 rounded text-amber-500">border-stone-700/50</code>) and deep inner shadows. Active date nodes glow inside recessed panels styled like glowing VCR tape feeds or vacuum fluorescent tube displays.
                </p>
              </div>

              <div>
                <strong className="text-stone-200 block text-xs uppercase font-mono tracking-wider">Dynamic Color Matrix Matrix:</strong>
                <p className="text-stone-400 mt-1">
                  Color schemes adjust fluidly between era points to anchor the visitor's subconscious:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-stone-400">
                  <li><strong className="text-pink-500 font-mono text-xs uppercase">1980s:</strong> Pitch charcoal backgrounds, neon magenta lasers, wireframe grids.</li>
                  <li><strong className="text-cyan-400 font-mono text-xs uppercase">Y2K (2000s):</strong> Translucent frosty icy cyan, metallic fluid drops, glossy buttons.</li>
                  <li><strong className="text-emerald-400 font-mono text-xs uppercase">Frutiger (2005):</strong> Vibrant grass greens, bright sky-blue gradients, glossy glass bubbles.</li>
                  <li><strong className="text-orange-400 font-mono text-xs uppercase">2010s:</strong> Minimalist flat charcoal layouts with sharp vivid accent lines.</li>
                  <li><strong className="text-green-500 font-mono text-xs uppercase">2025:</strong> Obsidian grids, cybernetic matrix neon green lines, network flows.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Layer 3: Logic & Data Schema */}
          <section className="space-y-4">
            <h3 className="text-base font-bold text-stone-100 flex items-center gap-2 font-display uppercase tracking-tight border-b border-stone-800 pb-1">
              <Code className="w-4 h-4" style={{ color: accentColor }} />
              3. Logic & Unified Data Schema
            </h3>

            <div className="space-y-4 pl-2 border-l border-stone-800">
              <div>
                <strong className="text-stone-200 block text-xs uppercase font-mono tracking-wider">Simultaneous Transition State Orchestrator:</strong>
                <p className="text-stone-400 mt-1">
                  When the dial transitions:
                  1. The Web Audio synthesizer triggers a decay-envelope pitch click and schedules a custom oscillator sequencer.
                  2. The canvas clears and re-renders the specific era visual system.
                  3. Text blocks fade out and translate upwards with CSS transform transitions.
                </p>
              </div>

              <div>
                <strong className="text-stone-200 block text-xs uppercase font-mono tracking-wider font-bold">Standardized JSON Data Node Schema:</strong>
                <pre className="text-xs p-4 bg-stone-950 rounded-lg text-emerald-400 overflow-x-auto border border-stone-800 mt-2 font-mono">
{`{
  "id": "1985",
  "year": 1985,
  "title": "The Synthwave Peak",
  "color": {
    "bg": "bg-indigo-950",
    "accent": "#00f0ff",
    "panelBg": "bg-slate-950/90"
  },
  "music": {
    "track": "Take On Me",
    "artist": "a-ha",
    "synthType": "synthwave"
  },
  "news": [
    "Live Aid concerts raise over $127 million.",
    "Nintendo launches the NES in North America.",
    "Blockbuster opens its first store."
  ],
  "prices": {
    "gas": { "cost": "$1.12", "inflation": "$3.20" },
    "milk": { "cost": "$2.20", "inflation": "$6.20" }
  }
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Layer 4: Virality Mechanics */}
          <section className="space-y-4">
            <h3 className="text-base font-bold text-stone-100 flex items-center gap-2 font-display uppercase tracking-tight border-b border-stone-800 pb-1">
              <Zap className="w-4 h-4" style={{ color: accentColor }} />
              4. User Engagement & Virality Mechanics
            </h3>

            <div className="space-y-4 pl-2 border-l border-stone-800">
              <div>
                <strong className="text-stone-200 block text-xs uppercase font-mono tracking-wider">The "Share Capsule" Engine:</strong>
                <p className="text-stone-400 mt-1">
                  Instead of static link sharing, clicking the export button triggers a high-fidelity rendering pipeline. An offscreen HTML5 canvas compiles a customized 1080x1920 (9:16 portrait) smartphone wallpaper poster. It stamps custom glowing LED timestamps, historical headlines, billboard track records, and inflation-indexed data overlays. The canvas is outputted as a standalone PNG, allowing seamless, high-engagement story sharing across Instagram, TikTok, and Pinterest.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-950 border-t border-stone-800 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-stone-900 hover:bg-stone-850 text-xs font-mono font-bold uppercase transition-all select-none cursor-pointer"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            DISMISS ARCHIVE BLUEPRINT
          </button>
        </div>

      </div>
    </div>
  );
}
