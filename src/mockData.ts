import type { Product, PortfolioProject, CanvasState } from './types';

export const products: Product[] = [
  {
    id: 'prod-tshirt',
    type: 'tshirt',
    name: 'Premium Crewneck Tee',
    description: 'Heavyweight 240GSM organic cotton. Boxy fit, drop shoulders, with high-density printing.',
    basePrice: 24.99,
    materials: [
      { name: '100% Organic Cotton', multiplier: 1.0 },
      { name: 'Recycled Poly-Blend', multiplier: 0.9 },
      { name: 'Luxury Pima Cotton', multiplier: 1.25 }
    ],
    finishes: [
      { name: 'Standard Screen Print', addedCost: 0.0 },
      { name: 'High-Density Puff Print', addedCost: 3.5 },
      { name: 'Premium Embroidery', addedCost: 5.0 }
    ],
    colors: ['#0A0A0A', '#F5F5F7', '#3C3C3E', '#1A365D', '#2F5D3E', '#6B2D5C'],
    mockupUrl: 'tshirt',
    safeAreaRatio: { x: 22, y: 20, width: 56, height: 60 } // Centered print area on shirt chest
  },
  {
    id: 'prod-mug',
    type: 'mug',
    name: 'Craft Ceramic Mug',
    description: '12oz matte ceramic finish. Dishwasher safe, high-temperature firing for durability.',
    basePrice: 12.99,
    materials: [
      { name: 'Glazed Ceramic', multiplier: 1.0 },
      { name: 'Matte Earthware', multiplier: 1.15 },
      { name: 'Double-Walled Steel', multiplier: 1.5 }
    ],
    finishes: [
      { name: 'Standard Sublimation', addedCost: 0.0 },
      { name: 'Laser Engraved', addedCost: 2.5 },
      { name: 'Gloss-Enamel Decal', addedCost: 1.5 }
    ],
    colors: ['#FFFFFF', '#1E1E1E', '#EAE6DF', '#654321'],
    mockupUrl: 'mug',
    safeAreaRatio: { x: 15, y: 15, width: 70, height: 70 }
  },
  {
    id: 'prod-sticker',
    type: 'sticker',
    name: 'Premium Vinyl Stickers',
    description: 'Thick, weather-resistant vinyl with UV protection. Perfect for outdoor/indoor gear.',
    basePrice: 1.49,
    materials: [
      { name: 'Matte Vinyl', multiplier: 1.0 },
      { name: 'Glossy Weatherproof', multiplier: 1.1 },
      { name: 'Holographic Prism', multiplier: 1.3 }
    ],
    finishes: [
      { name: 'Die-Cut Shape', addedCost: 0.0 },
      { name: 'Kiss-Cut Sheet', addedCost: 0.2 },
      { name: 'Cracked Ice Laminate', addedCost: 0.4 }
    ],
    colors: ['#FFFFFF', '#000000'],
    mockupUrl: 'sticker',
    safeAreaRatio: { x: 5, y: 5, width: 90, height: 90 }
  },
  {
    id: 'prod-business-card',
    type: 'business_card',
    name: 'Linen Executive Cards',
    description: '350GSM premium cotton-linen stock. Elegant texture with tactile debossing options.',
    basePrice: 0.25,
    materials: [
      { name: 'Textured Cotton Linen', multiplier: 1.0 },
      { name: 'Smooth Soft-Touch', multiplier: 1.1 },
      { name: 'Triple-Layer Color-Core', multiplier: 1.4 }
    ],
    finishes: [
      { name: 'Flat Matte Ink', addedCost: 0.0 },
      { name: 'Blind Debossing', addedCost: 0.08 },
      { name: 'Metallic Foil Stamping', addedCost: 0.12 }
    ],
    colors: ['#FAF9F6', '#12161A', '#2D3130', '#1C2C26'],
    mockupUrl: 'business_card',
    safeAreaRatio: { x: 5, y: 5, width: 90, height: 90 }
  },
  {
    id: 'prod-packaging',
    type: 'packaging',
    name: 'Eco-Kraft Shipping Box',
    description: 'Thick corrugated kraft cardboard. Flat-packed, easy tab locking, fully recyclable.',
    basePrice: 2.99,
    materials: [
      { name: 'Natural Brown Kraft', multiplier: 1.0 },
      { name: 'Bleached White Board', multiplier: 1.1 },
      { name: 'Matte Black Premium Card', multiplier: 1.3 }
    ],
    finishes: [
      { name: 'Flexo Eco-Ink', addedCost: 0.0 },
      { name: 'UV Selective Gloss', addedCost: 0.4 },
      { name: 'Hot Foil Emboss', addedCost: 0.6 }
    ],
    colors: ['#D2B48C', '#FFFFFF', '#1A1A1A'],
    mockupUrl: 'packaging',
    safeAreaRatio: { x: 25, y: 25, width: 50, height: 50 }
  }
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'proj-zenith',
    title: 'Minimalist Specialty Coffee Branding',
    category: 'Packaging & Mug Design',
    client: 'Zenith Coffee Roasters',
    brief: 'A specialty coffee roaster focusing on single-origin beans wanted to redesign their packaging and ceramic wares to convey a sense of pure craft, sustainability, and minimal organic design.',
    process: 'We developed a high-contrast geometric layout utilizing thin san-serif typography paired with earthy textured paper backgrounds. The ceramic mug features a debossed matte branding element that is highly tactile.',
    beforeImage: 'sketch-zenith', // Will map to unique SVG renders
    afterImage: 'render-zenith',
    realWorldImage: 'real-zenith'
  },
  {
    id: 'proj-novatech',
    title: 'Neon Developer Conference Apparel',
    category: 'T-Shirts & Merch Kits',
    client: 'NovaTech DevConf',
    brief: 'Create apparel and sticker swag that tech conference attendees actually want to wear outside the venue. The design needed to feel futuristic, cybernetic, and premium.',
    process: 'We engineered a glowing cyber-grid graphic overlay using neon gradient ink. The typography was custom-kerned and printed using puffy screen inks for a heavy 3D feel on organic charcoal cotton.',
    beforeImage: 'sketch-novatech',
    afterImage: 'render-novatech',
    realWorldImage: 'real-novatech'
  },
  {
    id: 'proj-apex',
    title: 'Tactile Executive Identity',
    category: 'Corporate Business Cards',
    client: 'Apex Logistics Group',
    brief: 'Apex Logistics needed a corporate business card that radiates solid structure, reliability, and elite status. The design must be extremely clean yet immediately premium.',
    process: 'Using triple-layered 600GSM linen paper with a midnight blue core, we implemented minimal silver foil stamping on the logo and a crisp deep letterpress deboss for the contact details.',
    beforeImage: 'sketch-apex',
    afterImage: 'render-apex',
    realWorldImage: 'real-apex'
  }
];

// Pre-designed templates for Canvas Editor
export const templates: Record<string, CanvasState[]> = {
  tshirt: [
    {
      backgroundColor: '#0A0A0A',
      activeElementId: null,
      elements: [
        {
          id: 't-ts-1',
          type: 'text',
          content: 'CREATIVE STUDIO',
          x: 50,
          y: 35,
          width: 80,
          height: 12,
          rotation: 0,
          color: '#FAF9F6',
          fontSize: 32,
          fontFamily: 'Outfit',
          align: 'center',
          layer: 2
        },
        {
          id: 't-ts-2',
          type: 'text',
          content: 'TOKYO // LONDON // NY',
          x: 50,
          y: 50,
          width: 60,
          height: 6,
          rotation: 0,
          color: '#8A8A8E',
          fontSize: 14,
          fontFamily: 'Courier New',
          align: 'center',
          layer: 1
        },
        {
          id: 't-ts-3',
          type: 'text',
          content: '✦ EST. 2026 ✦',
          x: 50,
          y: 65,
          width: 40,
          height: 8,
          rotation: 0,
          color: '#D4AF37',
          fontSize: 16,
          fontFamily: 'Georgia',
          align: 'center',
          layer: 3
        }
      ]
    },
    {
      backgroundColor: '#3C3C3E',
      activeElementId: null,
      elements: [
        {
          id: 't-ts-v1',
          type: 'text',
          content: 'VINTAGE CLUB',
          x: 50,
          y: 40,
          width: 80,
          height: 18,
          rotation: -5,
          color: '#F5E6C4',
          fontSize: 42,
          fontFamily: 'Georgia',
          align: 'center',
          layer: 1
        },
        {
          id: 't-ts-v2',
          type: 'text',
          content: 'Riders & Dreamers',
          x: 50,
          y: 60,
          width: 70,
          height: 10,
          rotation: 2,
          color: '#E07A5F',
          fontSize: 22,
          fontFamily: 'Pacifico',
          align: 'center',
          layer: 2
        }
      ]
    }
  ],
  mug: [
    {
      backgroundColor: '#EAE6DF',
      activeElementId: null,
      elements: [
        {
          id: 't-mg-1',
          type: 'text',
          content: 'BREW FUEL',
          x: 50,
          y: 40,
          width: 80,
          height: 15,
          rotation: 0,
          color: '#5C4033',
          fontSize: 28,
          fontFamily: 'Impact',
          align: 'center',
          layer: 1
        },
        {
          id: 't-mg-2',
          type: 'text',
          content: '99% Caffeine • 1% Code',
          x: 50,
          y: 60,
          width: 70,
          height: 8,
          rotation: 0,
          color: '#7B3F00',
          fontSize: 14,
          fontFamily: 'Courier New',
          align: 'center',
          layer: 2
        }
      ]
    }
  ],
  sticker: [
    {
      backgroundColor: '#FFFFFF',
      activeElementId: null,
      elements: [
        {
          id: 't-st-1',
          type: 'text',
          content: 'DEV LIFE',
          x: 50,
          y: 40,
          width: 80,
          height: 20,
          rotation: -10,
          color: '#00FFCC',
          fontSize: 36,
          fontFamily: 'Outfit',
          align: 'center',
          layer: 2
        },
        {
          id: 't-st-2',
          type: 'text',
          content: 'COFFEE. CODE. SLEEP. REPEAT.',
          x: 50,
          y: 65,
          width: 80,
          height: 8,
          rotation: 0,
          color: '#121212',
          fontSize: 12,
          fontFamily: 'Courier New',
          align: 'center',
          layer: 1
        }
      ]
    }
  ],
  business_card: [
    {
      backgroundColor: '#12161A',
      activeElementId: null,
      elements: [
        {
          id: 't-bc-1',
          type: 'text',
          content: 'ALEX RIVERS',
          x: 50,
          y: 35,
          width: 70,
          height: 10,
          rotation: 0,
          color: '#D4AF37',
          fontSize: 24,
          fontFamily: 'Outfit',
          align: 'center',
          layer: 1
        },
        {
          id: 't-bc-2',
          type: 'text',
          content: 'Lead Creative Designer',
          x: 50,
          y: 50,
          width: 60,
          height: 6,
          rotation: 0,
          color: '#8A8A8E',
          fontSize: 12,
          fontFamily: 'Outfit',
          align: 'center',
          layer: 2
        },
        {
          id: 't-bc-3',
          type: 'text',
          content: 'alex@designstudio.io | +1 555 0199',
          x: 50,
          y: 70,
          width: 80,
          height: 6,
          rotation: 0,
          color: '#AEAEB2',
          fontSize: 10,
          fontFamily: 'Courier New',
          align: 'center',
          layer: 3
        }
      ]
    }
  ],
  packaging: [
    {
      backgroundColor: '#D2B48C', // Kraft brown
      activeElementId: null,
      elements: [
        {
          id: 't-pk-1',
          type: 'text',
          content: 'ORGANIC CRAFT',
          x: 50,
          y: 40,
          width: 80,
          height: 12,
          rotation: 0,
          color: '#2B1B10',
          fontSize: 22,
          fontFamily: 'Georgia',
          align: 'center',
          layer: 1
        },
        {
          id: 't-pk-2',
          type: 'text',
          content: 'Handle with Care. 100% Recyclable.',
          x: 50,
          y: 60,
          width: 70,
          height: 6,
          rotation: 0,
          color: '#4B3621',
          fontSize: 11,
          fontFamily: 'Courier New',
          align: 'center',
          layer: 2
        }
      ]
    }
  ]
};
