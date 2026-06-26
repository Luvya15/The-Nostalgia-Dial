import React, { useState } from 'react';
import { Share2, Download, Check, Sparkles } from 'lucide-react';
import { EraData } from '../types';

interface ShareCapsuleProps {
  era: EraData;
  accentColor: string;
}

export default function ShareCapsule({ era, accentColor }: ShareCapsuleProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const generateAndDownloadPNG = () => {
    setIsExporting(true);

    setTimeout(() => {
      try {
        // Create an offscreen canvas optimized for 9:16 vertical mobile story sharing (1080 x 1920)
        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1920;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // --- BACKGROUND GRAPHICS ---
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#0c0a09');
        grad.addColorStop(0.3, era.color.bg === 'bg-stone-900' ? '#1c1917' : '#0f172a');
        grad.addColorStop(0.8, '#090504');
        grad.addColorStop(1, '#020101');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw decorative retro background grid or vectors
        ctx.strokeStyle = `${accentColor}15`;
        ctx.lineWidth = 2;
        for (let x = 0; x < canvas.width; x += 60) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 60) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        // --- HEADER LOGO BRANDING ---
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px sans-serif';
        ctx.letterSpacing = '6px';
        ctx.textAlign = 'center';
        ctx.fillText('THE NOSTALGIA DIAL', canvas.width / 2, 130);

        ctx.fillStyle = accentColor;
        ctx.font = 'bold 20px monospace';
        ctx.letterSpacing = '8px';
        ctx.fillText('CULTURAL TIME MACHINE', canvas.width / 2, 175);

        // Header separator bar
        ctx.fillStyle = accentColor;
        ctx.fillRect(canvas.width / 2 - 150, 205, 300, 4);

        // --- THE DYNAMIC ERA GLOW CARD ---
        const cardX = 100;
        const cardY = 260;
        const cardW = 880;
        const cardH = 1450;
        const cardRadius = 40;

        // Shadow / Outer Glow for the main capsule container
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 40;
        ctx.fillStyle = 'rgba(12, 10, 9, 0.95)';
        ctx.beginPath();
        ctx.roundRect(cardX, cardY, cardW, cardH, cardRadius);
        ctx.fill();

        // Border
        ctx.shadowBlur = 0; // Reset shadow
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(cardX, cardY, cardW, cardH, cardRadius);
        ctx.stroke();

        // Inner highlight trim
        ctx.strokeStyle = `${accentColor}30`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(cardX + 12, cardY + 12, cardW - 24, cardH - 24, cardRadius - 10);
        ctx.stroke();

        // --- DIGITAL DATE DISPLAY (VCR STYLE) ---
        ctx.fillStyle = '#020101';
        ctx.fillRect(cardX + 100, cardY + 80, cardW - 200, 160);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.strokeRect(cardX + 100, cardY + 80, cardW - 200, 160);

        ctx.fillStyle = accentColor;
        ctx.font = 'bold 96px Courier New, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`OCT ${era.label}`, canvas.width / 2, cardY + 190);

        // Glow LED text overlay
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 25;
        ctx.fillText(`OCT ${era.label}`, canvas.width / 2, cardY + 190);
        ctx.shadowBlur = 0;

        // --- ERA TITLE ---
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 50px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(era.title.toUpperCase(), canvas.width / 2, cardY + 340);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = 'italic 28px sans-serif';
        ctx.fillText('A snapshot from the archives...', canvas.width / 2, cardY + 395);

        // Inner Divider
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(cardX + 80, cardY + 440, cardW - 160, 2);

        // --- TILE 1: SONIC CHAMPION ---
        ctx.textAlign = 'left';
        ctx.fillStyle = accentColor;
        ctx.font = 'bold 24px monospace';
        ctx.fillText('BILLBOARD TOP TRACK', cardX + 80, cardY + 495);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 44px sans-serif';
        ctx.fillText(era.music.track, cardX + 80, cardY + 555);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '30px sans-serif';
        ctx.fillText(`by ${era.music.artist}`, cardX + 80, cardY + 605);

        // Track subtext
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = 'italic 22px sans-serif';
        ctx.fillText(`Genre: ${era.music.genre} // BPM: ${era.music.tempo}`, cardX + 80, cardY + 645);

        // Inner Divider
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(cardX + 80, cardY + 690, cardW - 160, 2);

        // --- TILE 2: POP-CULTURE NEWS ---
        ctx.fillStyle = accentColor;
        ctx.font = 'bold 24px monospace';
        ctx.fillText('GLOBAL ARCHIVE HEADLINES', cardX + 80, cardY + 745);

        ctx.fillStyle = '#f3f4f6';
        ctx.font = '30px sans-serif';
        
        let startHeadlineY = cardY + 805;
        era.news.forEach((headline, i) => {
          // Wrapped text helper
          const words = headline.split(' ');
          let line = '';
          const maxWidth = cardW - 160;
          const lineHeight = 42;

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 30px monospace';
          ctx.fillText(`${i + 1}.`, cardX + 80, startHeadlineY);

          ctx.font = '28px sans-serif';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          
          let lineX = cardX + 130;
          let currentY = startHeadlineY;

          for (let n = 0; n < words.length; n++) {
            let testLine = line + words[n] + ' ';
            let metrics = ctx.measureText(testLine);
            let testWidth = metrics.width;
            
            if (testWidth > maxWidth - 50 && n > 0) {
              ctx.fillText(line, lineX, currentY);
              line = words[n] + ' ';
              currentY += lineHeight;
              lineX = cardX + 130; // reset indentation
            } else {
              line = testLine;
            }
          }
          ctx.fillText(line, lineX, currentY);
          startHeadlineY = currentY + 65; // Spacer to next headline
        });

        // --- TILE 3: INFLATION INDEX ---
        const priceY = cardY + 1150;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(cardX + 80, priceY, cardW - 160, 2);

        ctx.fillStyle = accentColor;
        ctx.font = 'bold 24px monospace';
        ctx.fillText('THE COST DIAL VS MODERN INFLATION', cardX + 80, priceY + 55);

        ctx.fillStyle = '#ffffff';
        ctx.font = '26px sans-serif';
        
        // Draw grid of item costs
        const drawPriceItem = (label: string, cost: string, inflation: string, px: number, py: number) => {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.font = '24px sans-serif';
          ctx.fillText(label, px, py);

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 36px sans-serif';
          ctx.fillText(cost, px, py + 45);

          ctx.fillStyle = accentColor;
          ctx.font = '22px monospace';
          ctx.fillText(`(Adjusted: ${inflation})`, px, py + 80);
        };

        drawPriceItem('Gasoline', era.prices.gas.cost, era.prices.gas.inflation, cardX + 80, priceY + 115);
        drawPriceItem('Gallon of Milk', era.prices.milk.cost, era.prices.milk.inflation, cardX + 460, priceY + 115);
        drawPriceItem('Movie Ticket', era.prices.ticket.cost, era.prices.ticket.inflation, cardX + 80, priceY + 265);
        drawPriceItem('Average Home', era.prices.house.cost, era.prices.house.inflation, cardX + 460, priceY + 265);

        // --- BOTTOM WATERMARK BRANDING ---
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.font = 'bold 22px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('NOSTALGIA-DIAL.APP // TRAVEL TIMELINES INSTANTLY', canvas.width / 2, canvas.height - 85);

        // Trigger safe file download
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `Nostalgia_Capsule_${era.label}.png`;
        link.href = dataUrl;
        link.click();

        setExportComplete(true);
        setTimeout(() => setExportComplete(false), 3000);
      } catch (err) {
        console.error('Failed to export PNG', err);
      } finally {
        setIsExporting(false);
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-3" id="share-capsule">
      
      {/* Decorative Title */}
      <div className="flex items-center gap-1.5 text-stone-400">
        <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
        <span className="text-[9px] uppercase tracking-[0.25em] font-mono font-bold">VIRAL SHARING EXPORTS</span>
      </div>

      {/* Sharing Panel Content */}
      <div className="bg-stone-950/80 rounded border border-stone-800 p-4 flex flex-col gap-3 relative overflow-hidden">
        
        {/* Background glow shadow */}
        <div
          className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-3xl opacity-20 transition-all pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        <p className="text-xs text-stone-400 leading-relaxed">
          Generate an elegant, high-fidelity portrait smartphone wallpaper card containing your active 
          <strong> {era.label}</strong> snapshots, ideal for sharing on Instagram, TikTok, or Pinterest!
        </p>

        {/* Action Button */}
        <button
          onClick={generateAndDownloadPNG}
          disabled={isExporting}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded text-xs font-mono font-bold uppercase transition-all tracking-wider border relative overflow-hidden group select-none cursor-pointer"
          style={{
            backgroundColor: exportComplete ? '#14532d' : 'transparent',
            borderColor: exportComplete ? '#22c55e' : accentColor,
            color: exportComplete ? '#4ade80' : '#ffffff',
          }}
        >
          {isExporting ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-stone-300 border-t-transparent rounded-full animate-spin" />
              <span>COMPILING HIGH-RES CAPSULE...</span>
            </>
          ) : exportComplete ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span>CAPSULE EXPORTED!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" style={{ color: accentColor }} />
              <span>EXPORT DATED CAPSULE (.PNG)</span>
            </>
          )}
        </button>

        {/* Meta data sizes for reassurance */}
        <div className="flex justify-between items-center text-[9px] font-mono text-stone-600">
          <span>RATIO: 9:16 vertical</span>
          <span>SIZE: 1080 x 1920 (HD)</span>
        </div>
      </div>

    </div>
  );
}
