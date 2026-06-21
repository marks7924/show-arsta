import React from 'react';
import type { ProductType, CanvasState } from '../types';

interface ProductMockupProps {
  type: ProductType;
  color: string;
  canvasState: CanvasState;
  showGuides?: boolean;
  scale?: number;
  highlightedElementId?: string | null;
}

export const ProductMockup: React.FC<ProductMockupProps> = ({
  type,
  color,
  canvasState,
  showGuides = false,
  scale = 1,
  highlightedElementId = null
}) => {
  // Bounding boxes in percentage relative to the mockup viewport (500x500)
  const getSafeArea = () => {
    switch (type) {
      case 'tshirt':
        return { x: 22, y: 20, width: 56, height: 58 };
      case 'mug':
        return { x: 20, y: 18, width: 50, height: 64 };
      case 'sticker':
        return { x: 8, y: 8, width: 84, height: 84 };
      case 'business_card':
        return { x: 6, y: 6, width: 88, height: 88 };
      case 'packaging':
        return { x: 25, y: 25, width: 50, height: 50 };
      default:
        return { x: 10, y: 10, width: 80, height: 80 };
    }
  };

  const safeArea = getSafeArea();

  const renderMockupBase = () => {
    switch (type) {
      case 'tshirt':
        return (
          <svg viewBox="0 0 500 500" width="100%" height="100%" style={{ display: 'block' }}>
            <defs>
              <linearGradient id="tshirt-shading" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#000000" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {/* T-Shirt base contour */}
            <path 
              d="M150,90 C165,85 190,80 250,80 C310,80 335,85 350,90 C370,95 430,120 450,130 C465,138 460,165 440,175 C425,182 405,190 395,195 C390,170 385,150 380,140 L380,430 C380,450 360,460 340,460 C280,460 220,460 160,460 C140,460 120,450 120,430 L120,140 C115,150 110,170 105,195 C95,190 75,182 60,175 C40,165 35,138 50,130 C70,120 130,95 150,90 Z" 
              fill={color}
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="2"
            />
            {/* Neck Collar Detail */}
            <path 
              d="M175,93 C190,115 220,120 250,120 C280,120 310,115 325,93 C310,85 290,82 250,82 C210,82 190,85 175,93 Z" 
              fill="rgba(0,0,0,0.15)" 
              stroke="rgba(255,255,255,0.08)"
            />
            <path d="M175,93 C190,105 220,110 250,110 C280,110 310,105 325,93" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
            {/* Shading/Wrinkle Overlays (Multiply style) */}
            <path 
              d="M150,90 C165,85 190,80 250,80 C310,80 335,85 350,90 C370,95 430,120 450,130 C465,138 460,165 440,175 C425,182 405,190 395,195 C390,170 385,150 380,140 L380,430 C380,450 360,460 340,460 C280,460 220,460 160,460 C140,460 120,450 120,430 L120,140 C115,150 110,170 105,195 C95,190 75,182 60,175 C40,165 35,138 50,130 C70,120 130,95 150,90 Z" 
              fill="url(#tshirt-shading)"
              style={{ mixBlendMode: 'multiply' }}
            />
            {/* Subtle Fabric wrinkles */}
            <path d="M125,150 Q140,165 160,155" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="2" />
            <path d="M375,150 Q360,165 340,155" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="2" />
            <path d="M150,420 Q200,430 250,422 Q300,430 350,420" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
          </svg>
        );

      case 'mug':
        return (
          <svg viewBox="0 0 500 500" width="100%" height="100%" style={{ display: 'block' }}>
            <defs>
              <linearGradient id="mug-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
                <stop offset="3%" stopColor="#FFFFFF" stopOpacity="0.1" />
                <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.0" />
                <stop offset="80%" stopColor="#000000" stopOpacity="0.0" />
                <stop offset="97%" stopColor="#000000" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            {/* Mug Handle */}
            <path 
              d="M165,130 C90,130 90,370 165,370 L165,330 C120,330 120,170 165,170 Z" 
              fill={color}
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="2"
            />
            <path 
              d="M165,130 C90,130 90,370 165,370 L165,330 C120,330 120,170 165,170 Z" 
              fill="rgba(0, 0, 0, 0.15)"
              style={{ mixBlendMode: 'multiply' }}
            />
            {/* Mug Body */}
            <rect 
              x="160" 
              y="90" 
              width="240" 
              height="320" 
              rx="15" 
              fill={color} 
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="2"
            />
            {/* Top Lip */}
            <ellipse cx="280" cy="90" rx="120" ry="12" fill={color} stroke="rgba(0,0,0,0.08)" />
            <ellipse cx="280" cy="90" rx="114" ry="8" fill="rgba(0,0,0,0.2)" />
            {/* Shading Cylinder overlay */}
            <rect 
              x="160" 
              y="90" 
              width="240" 
              height="320" 
              rx="15" 
              fill="url(#mug-gradient)"
              style={{ mixBlendMode: 'multiply' }}
            />
            {/* Bottom Ellipse contour */}
            <path d="M160,395 C160,405 200,410 280,410 C360,410 400,405 400,395" fill="none" stroke="rgba(0,0,0,0.15)" />
          </svg>
        );

      case 'sticker':
        return (
          <svg viewBox="0 0 500 500" width="100%" height="100%" style={{ display: 'block' }}>
            <defs>
              <filter id="sticker-shadow" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="0" dy="12" stdDeviation="15" floodColor="#000000" floodOpacity="0.25" />
              </filter>
            </defs>
            {/* White Sticker border */}
            <rect 
              x="30" 
              y="30" 
              width="440" 
              height="440" 
              rx="60" 
              fill="#FFFFFF" 
              filter="url(#sticker-shadow)"
            />
            {/* Inner fill area representing sticker paper background */}
            <rect 
              x="45" 
              y="45" 
              width="410" 
              height="410" 
              rx="45" 
              fill={color === '#FFFFFF' ? '#FAF9F6' : color} 
              stroke="rgba(0,0,0,0.05)"
              strokeWidth="1"
            />
            {/* Peel hint line */}
            <path d="M430,45 L455,70" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        );

      case 'business_card':
        return (
          <svg viewBox="0 0 500 500" width="100%" height="100%" style={{ display: 'block' }}>
            <defs>
              <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="3" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.3" />
              </filter>
              <pattern id="linen-texture" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 0 5 L 10 5 M 5 0 L 5 10" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
              </pattern>
            </defs>
            {/* Stack background cards (creates premium depth) */}
            <rect 
              x="36" 
              y="110" 
              width="430" 
              height="260" 
              rx="8" 
              fill="#222" 
              transform="rotate(2 250 250)"
              opacity="0.3"
            />
            <rect 
              x="28" 
              y="105" 
              width="430" 
              height="260" 
              rx="8" 
              fill="#555" 
              transform="rotate(-1.5 250 250)"
              opacity="0.4"
            />
            {/* Active Card Body */}
            <rect 
              x="25" 
              y="100" 
              width="450" 
              height="270" 
              rx="8" 
              fill={color} 
              filter="url(#card-shadow)"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1.5"
            />
            {/* Linen Pattern texture overlay */}
            <rect 
              x="25" 
              y="100" 
              width="450" 
              height="270" 
              rx="8" 
              fill="url(#linen-texture)" 
              pointerEvents="none"
            />
            {/* Card edge trim */}
            <rect 
              x="27" 
              y="102" 
              width="446" 
              height="266" 
              rx="6" 
              fill="none" 
              stroke="rgba(255,255,255,0.03)" 
              strokeWidth="1" 
              pointerEvents="none"
            />
          </svg>
        );

      case 'packaging':
        return (
          <svg viewBox="0 0 500 500" width="100%" height="100%" style={{ display: 'block' }}>
            <defs>
              <filter id="box-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="15" stdDeviation="20" floodColor="#000000" floodOpacity="0.35" />
              </filter>
            </defs>
            {/* 3D Box mockup using custom paths */}
            <g filter="url(#box-shadow)">
              {/* Left Face */}
              <path 
                d="M100,200 L250,270 L250,420 L100,340 Z" 
                fill={color} 
                style={{ filter: 'brightness(80%)' }}
                stroke="rgba(0,0,0,0.15)"
                strokeWidth="1"
              />
              {/* Right Face */}
              <path 
                d="M250,270 L400,200 L400,340 L250,420 Z" 
                fill={color} 
                style={{ filter: 'brightness(60%)' }}
                stroke="rgba(0,0,0,0.15)"
                strokeWidth="1"
              />
              {/* Top Face */}
              <path 
                d="M100,200 L250,130 L400,200 L250,270 Z" 
                fill={color}
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="1"
              />
            </g>
            {/* Highlight creases */}
            <path d="M100,200 L250,270" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            <path d="M250,270 L400,200" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <path d="M250,270 L250,420" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
            
            {/* Flexo board seam details */}
            <path d="M245,133 L245,265" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
          </svg>
        );

      default:
        return <rect width="500" height="500" fill="#fff" />;
    }
  };

  return (
    <div 
      className="mockup-container" 
      style={{ 
        position: 'relative', 
        width: '100%', 
        maxWidth: '500px', 
        aspectRatio: '1',
        transform: `scale(${scale})`,
        transition: 'transform 0.2s ease',
        margin: '0 auto'
      }}
    >
      {/* Mockup SVG */}
      {renderMockupBase()}

      {/* Clipped Canvas Design Overlay (maps coordinates matching safeArea) */}
      <div 
        style={{
          position: 'absolute',
          top: `${safeArea.y}%`,
          left: `${safeArea.x}%`,
          width: `${safeArea.width}%`,
          height: `${safeArea.height}%`,
          overflow: 'hidden',
          pointerEvents: 'none', // Allow clicking handles through
          zIndex: 5
        }}
      >
        {/* Simulating Canvas Content */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: type === 'sticker' || type === 'business_card' ? 'transparent' : canvasState.backgroundColor,
          }}
        >
          {canvasState.elements.map((el) => {
            const isActive = el.id === highlightedElementId;
            return (
              <div 
                key={el.id}
                style={{
                  position: 'absolute',
                  left: `${el.x}%`,
                  top: `${el.y}%`,
                  transform: `translate(-50%, -50%) rotate(${el.rotation}deg)`,
                  width: `${el.width}%`,
                  height: `${el.height}%`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: el.align || 'center',
                  fontSize: el.fontSize ? `${el.fontSize * 0.45}px` : '12px', // scaled for preview
                  fontFamily: el.fontFamily || 'var(--font-sans)',
                  color: el.color || 'var(--color-text-primary)',
                  fontWeight: el.type === 'text' ? 'bold' : 'normal',
                  textAlign: el.align || 'center',
                  whiteSpace: 'pre-wrap',
                  border: isActive && showGuides ? '1px dashed var(--color-primary)' : 'none',
                }}
              >
                {el.type === 'text' ? (
                  el.content
                ) : (
                  <img 
                    src={el.content} 
                    alt="Canvas asset" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain',
                      opacity: 0.95
                    }} 
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Guide lines overlays (Safe Area & Bleed bounds) */}
      {showGuides && (
        <div 
          style={{
            position: 'absolute',
            top: `${safeArea.y}%`,
            left: `${safeArea.x}%`,
            width: `${safeArea.width}%`,
            height: `${safeArea.height}%`,
            pointerEvents: 'none',
            zIndex: 6
          }}
        >
          {/* Safe Print Area */}
          <div 
            style={{
              position: 'absolute',
              top: '5%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              border: '1px dashed rgba(94, 92, 230, 0.7)',
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: '2px',
                left: '4px',
                fontSize: '8px',
                color: 'var(--color-primary)',
                fontWeight: 600,
                letterSpacing: '0.05em'
              }}
            >
              SAFE ZONE
            </div>
          </div>
          {/* Bleed Margin */}
          <div 
            style={{
              position: 'absolute',
              top: '0%',
              left: '0%',
              right: '0%',
              bottom: '0%',
              border: '1px dashed rgba(255, 45, 85, 0.6)',
            }}
          >
            <div 
              style={{
                position: 'absolute',
                bottom: '2px',
                right: '4px',
                fontSize: '8px',
                color: 'var(--color-accent)',
                fontWeight: 600,
                letterSpacing: '0.05em'
              }}
            >
              BLEED LIMIT
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
