export interface EraColor {
  bg: string;          // Page background color (Tailwind class or hex)
  text: string;        // Text color
  accent: string;      // Accent color (LED glows, button active, etc.)
  glow: string;        // CSS filter shadow / drop-shadow color for active LED glow
  border: string;      // Border color
  textAccent: string;  // Text color for highlights
  panelBg: string;     // Background color for retro dashboard panels
}

export interface EraMusic {
  track: string;
  artist: string;
  genre: string;
  tempo: number;
  keyName: string;
  synthType: '8bit' | 'synthwave' | 'eurodance' | 'grunge' | 'y2k' | 'rnb' | 'electro' | 'tropical' | 'vapor' | 'cyberpunk';
}

export interface EraVisual {
  eraName: string;
  keywords: string[];
  canvasStyle: 'grid' | 'memphis' | 'grunge' | 'glitch' | 'glossy' | 'frutiger' | 'flat' | 'minimal' | 'neon' | 'cyber';
  fashionMotif: string;
}

export interface PriceItem {
  cost: string;
  inflation: string;
}

export interface EraPrices {
  gas: PriceItem;
  milk: PriceItem;
  ticket: PriceItem;
  house: PriceItem;
}

export interface EraData {
  id: string;
  year: number;
  label: string;
  title: string;
  vibeDescription: string;
  color: EraColor;
  music: EraMusic;
  news: string[];
  visual: EraVisual;
  prices: EraPrices;
}
