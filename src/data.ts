import { EraData } from './types';

export const ERAS_DATA: EraData[] = [
  {
    id: '1980',
    year: 1980,
    label: '1980',
    title: 'The Arcade Awakening',
    vibeDescription: 'Step into the neon-lit grid of the early 80s: a world dominated by wood-paneled Atari systems, retro vector lines, synthesizer experiments, and the birth of a global arcade culture.',
    color: {
      bg: 'bg-stone-900',
      text: 'text-stone-100',
      accent: '#ff007f', // Neon pink
      glow: 'rgba(255, 0, 127, 0.6)',
      border: 'border-stone-700',
      textAccent: 'text-pink-500',
      panelBg: 'bg-stone-950/80',
    },
    music: {
      track: 'Call Me',
      artist: 'Blondie',
      genre: 'New Wave / Synth-Pop',
      tempo: 142,
      keyName: 'D Minor',
      synthType: '8bit',
    },
    news: [
      'Pac-Man is released by Namco in Japan, quickly triggering a massive global video game craze.',
      'John Lennon is tragically shot and killed outside his New York apartment building, shockwaves echo worldwide.',
      'CNN launches as the world\'s first 24-hour television news network, reshaping media forever.'
    ],
    visual: {
      eraName: 'Arcade Neon Vector',
      keywords: ['Neon Pink', 'Atari Grid', 'Pacman', 'Wood Panel'],
      canvasStyle: 'neon',
      fashionMotif: 'Terrycloth headbands, high-waisted jeans, and aviator sunglasses.',
    },
    prices: {
      gas: { cost: '$1.19', inflation: '$4.40' },
      milk: { cost: '$1.60', inflation: '$5.90' },
      ticket: { cost: '$2.69', inflation: '$10.00' },
      house: { cost: '$68,700', inflation: '$255,000' }
    }
  },
  {
    id: '1985',
    year: 1985,
    label: '1985',
    title: 'The Synthwave Peak',
    vibeDescription: 'Behold the peak of retro-futurism. Gated-reverb drums, analog synthesizer brass, VHS tracking lines, double-denim jackets, and oversized sunglasses define the electric vibe of 1985.',
    color: {
      bg: 'bg-indigo-950',
      text: 'text-slate-100',
      accent: '#00f0ff', // Electric cyan
      glow: 'rgba(0, 240, 255, 0.6)',
      border: 'border-purple-900/50',
      textAccent: 'text-cyan-400',
      panelBg: 'bg-slate-950/90',
    },
    music: {
      track: 'Take On Me',
      artist: 'a-ha',
      genre: 'Synth-Pop / Synthwave',
      tempo: 169,
      keyName: 'A Major',
      synthType: 'synthwave',
    },
    news: [
      'Live Aid concerts in London and Philadelphia raise over $127 million in famine relief for Africa.',
      'Nintendo launches the Entertainment System (NES) in North America, reviving the video game industry.',
      'Blockbuster Video opens its very first store in Dallas, Texas, kicking off the video rental revolution.'
    ],
    visual: {
      eraName: 'Memphis Synthwave',
      keywords: ['Laser Grid', 'Pastel Zigzags', 'Cassette Tapes', 'VHS Noise'],
      canvasStyle: 'memphis',
      fashionMotif: 'Shoulder pads, fingerless mesh gloves, neon leg warmers, and crimped hair.',
    },
    prices: {
      gas: { cost: '$1.12', inflation: '$3.20' },
      milk: { cost: '$2.20', inflation: '$6.20' },
      ticket: { cost: '$3.55', inflation: '$10.10' },
      house: { cost: '$84,300', inflation: '$239,000' }
    }
  },
  {
    id: '1990',
    year: 1990,
    label: '1990',
    title: 'The Alternative Shift',
    vibeDescription: 'A decade opens with acid house dance rhythms, neon windbreakers, and the rumble of grunge rock starting to brew. Skate culture, MTV domination, and retro floppy disks are everywhere.',
    color: {
      bg: 'bg-zinc-900',
      text: 'text-zinc-100',
      accent: '#39ff14', // Acid Green
      glow: 'rgba(57, 255, 20, 0.6)',
      border: 'border-zinc-700',
      textAccent: 'text-lime-400',
      panelBg: 'bg-zinc-950/80',
    },
    music: {
      track: 'Vogue',
      artist: 'Madonna',
      genre: 'Eurodance / House',
      tempo: 116,
      keyName: 'C Minor',
      synthType: 'eurodance',
    },
    news: [
      'Tim Berners-Lee introduces the concept of the World Wide Web and builds the first web server.',
      'Nelson Mandela is released from Victor Verster Prison after serving 27 years of captivity.',
      'German reunification is completed as East and West Germany officially merge after 45 years.'
    ],
    visual: {
      eraName: 'Grunge Pixel Rave',
      keywords: ['Graffiti', '90s Cups Swirl', 'Floppy Disks', 'Acid Green'],
      canvasStyle: 'grunge',
      fashionMotif: 'Neon windbreakers, backward baseball caps, baggy denim, and Doc Martens.',
    },
    prices: {
      gas: { cost: '$1.16', inflation: '$2.70' },
      milk: { cost: '$2.78', inflation: '$6.50' },
      ticket: { cost: '$4.22', inflation: '$9.80' },
      house: { cost: '$123,000', inflation: '$287,000' }
    }
  },
  {
    id: '1995',
    year: 1995,
    label: '1995',
    title: 'The Internet Dawn',
    vibeDescription: 'Dial-up screech, CD-ROM enclosures, and industrial gray computing. Alternative rock is in full bloom alongside Windows 95, pager beeps, and neon cyber cafes.',
    color: {
      bg: 'bg-gray-950',
      text: 'text-gray-100',
      accent: '#008080', // Classic Teal (Win95)
      glow: 'rgba(0, 128, 128, 0.7)',
      border: 'border-gray-800',
      textAccent: 'text-teal-400',
      panelBg: 'bg-gray-900/90',
    },
    music: {
      track: "Gangsta's Paradise",
      artist: 'Coolio',
      genre: 'Hip-Hop / Orchestral',
      tempo: 80,
      keyName: 'G# Minor',
      synthType: 'grunge',
    },
    news: [
      'Amazon and eBay are founded, marking the official commercial birth of modern e-commerce.',
      'Sony launches the first PlayStation in North America, turning 3D gaming into a cultural staple.',
      'The DVD format is officially announced as the replacement for magnetic tape and VHS.'
    ],
    visual: {
      eraName: 'Classic Teal Desktop',
      keywords: ['Teal Canvas', 'Beige PCs', 'Dial-up Noise', 'VHS Glitch'],
      canvasStyle: 'glitch',
      fashionMotif: 'Flannel shirts tied around waist, platform sneakers, butterfly clips, and chokers.',
    },
    prices: {
      gas: { cost: '$1.15', inflation: '$2.30' },
      milk: { cost: '$2.50', inflation: '$5.00' },
      ticket: { cost: '$4.35', inflation: '$8.70' },
      house: { cost: '$110,000', inflation: '$220,000' }
    }
  },
  {
    id: '2000',
    year: 2000,
    label: '2000',
    title: 'The Y2K Millennium',
    vibeDescription: 'Inflatable silver chairs, translucent iMacs, and shiny bubble metallic apparel. The digital age arrives with Napster, Nokia 3310 ringtones, and deep house euro-trance melodies.',
    color: {
      bg: 'bg-cyan-950',
      text: 'text-cyan-50',
      accent: '#00ffff', // Holographic cyan
      glow: 'rgba(0, 255, 255, 0.6)',
      border: 'border-cyan-800/60',
      textAccent: 'text-cyan-300',
      panelBg: 'bg-cyan-950/80',
    },
    music: {
      track: 'Oops!... I Did It Again',
      artist: 'Britney Spears',
      genre: 'Y2K Pop / Trance',
      tempo: 95,
      keyName: 'C# Minor',
      synthType: 'y2k',
    },
    news: [
      'The Y2K Bug fails to cause global computer systems to crash, triggering immense technological relief.',
      'Napster peer-to-peer file sharing program peaks, causing major panic in the music industry.',
      'Sony releases the PlayStation 2, which goes on to become the best-selling gaming console of all time.'
    ],
    visual: {
      eraName: 'Y2K Metallic Fluid',
      keywords: ['Chrome Blue', 'Frosted Glass', 'iMac G3', 'Pulse Waves'],
      canvasStyle: 'glossy',
      fashionMotif: 'Metallic silver pants, rhinestone bandanas, bucket hats, and rimless sunglasses.',
    },
    prices: {
      gas: { cost: '$1.51', inflation: '$2.70' },
      milk: { cost: '$2.78', inflation: '$4.90' },
      ticket: { cost: '$5.39', inflation: '$9.50' },
      house: { cost: '$119,600', inflation: '$211,000' }
    }
  },
  {
    id: '2005',
    year: 2005,
    label: '2005',
    title: 'The Web 2.0 Bloom',
    vibeDescription: 'The glossy skeuomorphism of Frutiger Aero sweeps the design world. Click-wheel iPods, glossy glass surfaces, organic vector leaves, and active Myspace profile layouts.',
    color: {
      bg: 'bg-teal-950',
      text: 'text-emerald-50',
      accent: '#10b981', // Frutiger emerald
      glow: 'rgba(16, 185, 129, 0.6)',
      border: 'border-emerald-800',
      textAccent: 'text-emerald-400',
      panelBg: 'bg-slate-900/80',
    },
    music: {
      track: 'Since U Been Gone',
      artist: 'Kelly Clarkson',
      genre: 'Pop-Rock / R&B',
      tempo: 131,
      keyName: 'G Major',
      synthType: 'rnb',
    },
    news: [
      'YouTube is founded in a small garage, launching the global creator and video sharing era.',
      'Apple dominates portable tech by releasing the iPod Nano, replacing cassette tapes permanently.',
      'Hurricane Katrina makes landfall in New Orleans, leading to catastrophic flooding and national panic.'
    ],
    visual: {
      eraName: 'Frutiger Aero Gloss',
      keywords: ['Vibrant Green', 'Glass Orbs', 'iPod Wheel', 'Aura Rays'],
      canvasStyle: 'frutiger',
      fashionMotif: 'Low-rise jeans, thick chunky belts, layered polo shirts, and trucker hats.',
    },
    prices: {
      gas: { cost: '$2.30', inflation: '$3.60' },
      milk: { cost: '$3.24', inflation: '$5.10' },
      ticket: { cost: '$6.41', inflation: '$10.00' },
      house: { cost: '$240,000', inflation: '$375,000' }
    }
  },
  {
    id: '2010',
    year: 2010,
    label: '2010',
    title: 'The App Explosion',
    vibeDescription: 'Skeuomorphism begins to fade as flat minimalist grids appear. Smartphones go mainstream, Instagram debuts, hipster skinny jeans are tight, and EDM music festivals ignite the youth.',
    color: {
      bg: 'bg-slate-900',
      text: 'text-slate-100',
      accent: '#f97316', // Orange
      glow: 'rgba(249, 115, 22, 0.6)',
      border: 'border-slate-800',
      textAccent: 'text-orange-400',
      panelBg: 'bg-slate-950/80',
    },
    music: {
      track: 'Tik Tok',
      artist: 'Kesha',
      genre: 'Dance-Pop / Electro',
      tempo: 120,
      keyName: 'D Major',
      synthType: 'electro',
    },
    news: [
      'Steve Jobs unveils the very first Apple iPad, establishing the consumer tablet market.',
      'Instagram is officially released on iOS, forever altering social media and photography.',
      'The Deepwater Horizon oil spill in the Gulf of Mexico triggers a massive environmental disaster.'
    ],
    visual: {
      eraName: 'Minimal Polygon Mesh',
      keywords: ['Flat Shapes', 'Vibrant Orange', 'App Icons', 'Low Poly'],
      canvasStyle: 'flat',
      fashionMotif: 'Skinny jeans, checkerboard sunglasses, mustache motifs, and oversized cardigans.',
    },
    prices: {
      gas: { cost: '$2.73', inflation: '$3.80' },
      milk: { cost: '$3.19', inflation: '$4.40' },
      ticket: { cost: '$7.89', inflation: '$11.00' },
      house: { cost: '$221,800', inflation: '$310,000' }
    }
  },
  {
    id: '2015',
    year: 2015,
    label: '2015',
    title: 'The Streaming Era',
    vibeDescription: 'The arrival of flat vector design, vaporwave pastel subcultures, and tropical house plinks. Binge-watching, Spotify playlists, and smart wearable accessories are mainstream.',
    color: {
      bg: 'bg-violet-950',
      text: 'text-violet-50',
      accent: '#a78bfa', // Lavender
      glow: 'rgba(167, 139, 250, 0.6)',
      border: 'border-violet-800',
      textAccent: 'text-violet-300',
      panelBg: 'bg-slate-950/70',
    },
    music: {
      track: 'Uptown Funk',
      artist: 'Mark Ronson ft. Bruno Mars',
      genre: 'Funk-Pop / Electro',
      tempo: 115,
      keyName: 'D Minor',
      synthType: 'tropical',
    },
    news: [
      'SpaceX achieves the first successful landing of a Falcon 9 rocket, pioneering reusable aerospace.',
      'The landmark Paris Climate Agreement is signed by 196 nations to combat rising temperatures.',
      'LIGO observatories detect gravitational waves for the first time, proving Einstein\'s century-old theory.'
    ],
    visual: {
      eraName: 'Vaporwave Minimal Grid',
      keywords: ['Lavender Grids', 'Gradients', 'Flat Vectors', 'Smooth Curves'],
      canvasStyle: 'minimal',
      fashionMotif: 'Athleisure wear, minimalist leather boots, flannel wrap, and bomber jackets.',
    },
    prices: {
      gas: { cost: '$2.43', inflation: '$3.10' },
      milk: { cost: '$3.42', inflation: '$4.40' },
      ticket: { cost: '$8.43', inflation: '$10.80' },
      house: { cost: '$294,000', inflation: '$377,000' }
    }
  },
  {
    id: '2020',
    year: 2020,
    label: '2020',
    title: 'The Virtual Sanctuary',
    vibeDescription: 'The pandemic lockdown triggers a hyper-digital, insulated world. TikTok dance loops, Zoom school, remote workspace setups, and neon-drenched retro-synth pop revivals.',
    color: {
      bg: 'bg-zinc-950',
      text: 'text-zinc-100',
      accent: '#c084fc', // Bright purple
      glow: 'rgba(192, 132, 252, 0.6)',
      border: 'border-zinc-800',
      textAccent: 'text-purple-400',
      panelBg: 'bg-zinc-900/95',
    },
    music: {
      track: 'Blinding Lights',
      artist: 'The Weeknd',
      genre: '80s Synth-Pop Revival',
      tempo: 171,
      keyName: 'F Minor',
      synthType: 'vapor',
    },
    news: [
      'Global lockdowns and the pandemic work-from-home revolution completely reshape daily life.',
      'SpaceX Crew Dragon carries astronauts to the ISS, returning crewed spaceflight to US soil.',
      'Sony launches the PlayStation 5 and Microsoft releases the Xbox Series X amid massive high-tech demand.'
    ],
    visual: {
      eraName: 'Dark Cyber Glitch',
      keywords: ['Matrix Glitch', 'Vibrant Violet', 'TikTok Scan', 'Grid Lines'],
      canvasStyle: 'neon',
      fashionMotif: 'Over-sized loungewear, tie-dye hoodies, wireless headphones, and face masks.',
    },
    prices: {
      gas: { cost: '$2.17', inflation: '$2.55' },
      milk: { cost: '$3.49', inflation: '$4.10' },
      ticket: { cost: '$9.16', inflation: '$10.80' },
      house: { cost: '$336,900', inflation: '$395,000' }
    }
  },
  {
    id: '2025',
    year: 2025,
    label: '2025',
    title: 'The AI Frontier',
    vibeDescription: 'Step into the present-future. Agentic AI copilots, real-time translations, smart glasses, neural-mesh graphics, cyber green details, and high-fidelity futuristic glitch synthesizers.',
    color: {
      bg: 'bg-neutral-950',
      text: 'text-neutral-50',
      accent: '#22c55e', // Acid Green
      glow: 'rgba(34, 197, 94, 0.6)',
      border: 'border-neutral-800',
      textAccent: 'text-green-400',
      panelBg: 'bg-neutral-900/95',
    },
    music: {
      track: 'Quantum Glitch',
      artist: 'Cyber Synthetics',
      genre: 'Experimental Cyberpunk',
      tempo: 135,
      keyName: 'E Minor',
      synthType: 'cyberpunk',
    },
    news: [
      'Agentic AI systems achieve advanced autonomy, integrating deeply into global software development.',
      'Commercial nuclear fusion startups successfully feed continuous carbon-free electricity to municipal power grids.',
      'Sleek, lightweight AR glasses achieve mainstream adoption, replacing standard smartphone displays in cities.'
    ],
    visual: {
      eraName: 'Neural Net Cyberpunk',
      keywords: ['Matrix Rain', 'Liquid Chrome', 'Acid Green', 'Node Networks'],
      canvasStyle: 'cyber',
      fashionMotif: 'Technical wear, sleek smart-glasses, metallic accents, and solar-woven jackets.',
    },
    prices: {
      gas: { cost: '$3.45', inflation: '$3.45' },
      milk: { cost: '$4.15', inflation: '$4.15' },
      ticket: { cost: '$11.50', inflation: '$11.50' },
      house: { cost: '$420,000', inflation: '$420,000' }
    }
  }
];
