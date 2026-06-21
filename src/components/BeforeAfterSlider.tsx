import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeNode: React.ReactNode;
  afterNode: React.ReactNode;
  titleBefore?: string;
  titleAfter?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeNode,
  afterNode,
  titleBefore = 'Client Brief Sketch',
  titleAfter = 'Production-Ready Mockup'
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0 - 100)
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleTouchStart = () => {
    isDragging.current = true;
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length === 0) return;
      handleMove(e.touches[0].clientX);
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="slider-container"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{ cursor: 'ew-resize' }}
    >
      {/* Before Content */}
      <div 
        className="slider-img slider-before"
        style={{ width: '100%', height: '100%' }}
      >
        {beforeNode}
        <span 
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            background: 'rgba(0,0,0,0.7)',
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#FFFFFF',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          {titleBefore}
        </span>
      </div>

      {/* After Content (Clipped) */}
      <div 
        className="slider-img slider-after"
        style={{ 
          width: '100%', 
          height: '100%',
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
        }}
      >
        {afterNode}
        <span 
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            background: 'var(--color-primary)',
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#FFFFFF',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          {titleAfter}
        </span>
      </div>

      {/* Handle */}
      <div 
        className="slider-handle"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="slider-handle-button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '-4px' }}>
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </div>
      </div>
    </div>
  );
};
