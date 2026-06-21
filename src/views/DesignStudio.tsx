import React, { useState, useRef, useEffect } from 'react';
import { db } from '../db';
import type { SavedDesign } from '../db';
import { products, templates } from '../mockData';
import { ProductMockup } from '../components/ProductMockup';
import type { ProductType, CanvasState, CanvasElement } from '../types';

interface DesignStudioProps {
  setView: (view: string) => void;
  selectedProductType: ProductType;
  setSelectedProductType: (type: ProductType) => void;
  addToCart: (item: any) => void;
}

export const DesignStudio: React.FC<DesignStudioProps> = ({
  setView,
  selectedProductType,
  setSelectedProductType,
  addToCart
}) => {
  const product = products.find(p => p.type === selectedProductType) || products[0];

  // Editor states
  const [canvasState, setCanvasState] = useState<CanvasState>(() => {
    // Load first template by default if available
    const productTemplates = templates[selectedProductType];
    if (productTemplates && productTemplates.length > 0) {
      return {
        elements: JSON.parse(JSON.stringify(productTemplates[0].elements)),
        backgroundColor: productTemplates[0].backgroundColor,
        activeElementId: null
      };
    }
    return {
      elements: [],
      backgroundColor: '#FFFFFF',
      activeElementId: null
    };
  });

  const [history, setHistory] = useState<CanvasElement[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Specifications
  const [selectedMaterialIdx, setSelectedMaterialIdx] = useState<number>(0);
  const [selectedFinishIdx, setSelectedFinishIdx] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [quantity, setQuantity] = useState<number>(product.type === 'sticker' ? 100 : (product.type === 'business_card' ? 250 : 25));
  const [designName, setDesignName] = useState<string>('My Custom Design');
  const [showGuides, setShowGuides] = useState<boolean>(true);

  // Dragging/Transform refs
  const workspaceRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const isRotating = useRef<boolean>(false);
  const isResizing = useRef<boolean>(false);
  const dragStart = useRef<{ x: number; y: number; elX: number; elY: number }>({ x: 0, y: 0, elX: 0, elY: 0 });
  const transformStart = useRef<{ angle: number; startAngle: number; width: number; height: number; mouseX: number; mouseY: number }>({ angle: 0, startAngle: 0, width: 0, height: 0, mouseX: 0, mouseY: 0 });

  // Update canvas when product type changes
  useEffect(() => {
    const productTemplates = templates[selectedProductType];
    const initialElements = productTemplates && productTemplates.length > 0 
      ? JSON.parse(JSON.stringify(productTemplates[0].elements))
      : [];
    const defaultColor = products.find(p => p.type === selectedProductType)?.colors[0] || '#FFFFFF';
    
    const newState = {
      elements: initialElements,
      backgroundColor: selectedProductType === 'sticker' || selectedProductType === 'business_card' ? '#FFFFFF' : '#1A1A1A',
      activeElementId: null
    };
    
    setCanvasState(newState);
    setSelectedColor(defaultColor);
    setSelectedMaterialIdx(0);
    setSelectedFinishIdx(0);
    setQuantity(selectedProductType === 'sticker' ? 100 : (selectedProductType === 'business_card' ? 250 : 25));
    
    // Reset History
    setHistory([newState.elements]);
    setHistoryIndex(0);
  }, [selectedProductType]);

  // History tracking
  const pushHistory = (newElements: CanvasElement[]) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(JSON.parse(JSON.stringify(newElements)));
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      setCanvasState(prev => ({
        ...prev,
        elements: JSON.parse(JSON.stringify(history[prevIdx])),
        activeElementId: null
      }));
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setCanvasState(prev => ({
        ...prev,
        elements: JSON.parse(JSON.stringify(history[nextIdx])),
        activeElementId: null
      }));
    }
  };

  // Add elements
  const addTextElement = () => {
    const maxLayer = canvasState.elements.reduce((max, el) => Math.max(max, el.layer), 0);
    const newEl: CanvasElement = {
      id: `el-${Date.now()}`,
      type: 'text',
      content: 'Tap to edit text',
      x: 50,
      y: 50,
      width: 60,
      height: 10,
      rotation: 0,
      color: '#FFFFFF',
      fontSize: 24,
      fontFamily: 'Outfit',
      align: 'center',
      layer: maxLayer + 1
    };
    const updated = [...canvasState.elements, newEl];
    setCanvasState(prev => ({ ...prev, elements: updated, activeElementId: newEl.id }));
    pushHistory(updated);
  };

  const handleLogoUploadSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const maxLayer = canvasState.elements.reduce((max, el) => Math.max(max, el.layer), 0);
        const newEl: CanvasElement = {
          id: `el-${Date.now()}`,
          type: 'image',
          content: event.target?.result as string, // base64 representation
          x: 50,
          y: 40,
          width: 35,
          height: 35,
          rotation: 0,
          layer: maxLayer + 1,
          dpi: 72 // Initial low res simulation to show warning indicator
        };
        const updated = [...canvasState.elements, newEl];
        setCanvasState(prev => ({ ...prev, elements: updated, activeElementId: newEl.id }));
        pushHistory(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  // Delete Element
  const deleteActiveElement = () => {
    if (!canvasState.activeElementId) return;
    const updated = canvasState.elements.filter(el => el.id !== canvasState.activeElementId);
    setCanvasState(prev => ({ ...prev, elements: updated, activeElementId: null }));
    pushHistory(updated);
  };

  // Layer Reordering
  const changeLayerOrder = (direction: 'up' | 'down') => {
    if (!canvasState.activeElementId) return;
    const elements = [...canvasState.elements];
    const index = elements.findIndex(el => el.id === canvasState.activeElementId);
    if (index === -1) return;

    if (direction === 'up' && index < elements.length - 1) {
      // Swap layers
      const temp = elements[index].layer;
      elements[index].layer = elements[index + 1].layer;
      elements[index + 1].layer = temp;
    } else if (direction === 'down' && index > 0) {
      const temp = elements[index].layer;
      elements[index].layer = elements[index - 1].layer;
      elements[index - 1].layer = temp;
    }
    
    // Sort elements by layer
    elements.sort((a, b) => a.layer - b.layer);
    setCanvasState(prev => ({ ...prev, elements }));
    pushHistory(elements);
  };

  // Update properties of active element
  const updateActiveElementProps = (props: Partial<CanvasElement>) => {
    if (!canvasState.activeElementId) return;
    const updated = canvasState.elements.map(el => {
      if (el.id === canvasState.activeElementId) {
        // If changing size of image, scale DPI dynamically to simulate safety
        let newDpi = el.dpi;
        if (el.type === 'image' && (props.width || props.height)) {
          const w = props.width || el.width;
          // Smaller sizes yields higher resolution
          newDpi = Math.round(300 * (30 / w));
        }
        return { ...el, ...props, dpi: newDpi };
      }
      return el;
    });
    setCanvasState(prev => ({ ...prev, elements: updated }));
  };

  const commitPropertyChange = () => {
    pushHistory(canvasState.elements);
  };

  // Mouse Move / Transform Handlers
  const handleElementMouseDown = (el: CanvasElement, e: React.MouseEvent) => {
    e.stopPropagation();
    setCanvasState(prev => ({ ...prev, activeElementId: el.id }));
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      elX: el.x,
      elY: el.y
    };
  };

  const handleResizeMouseDown = (el: CanvasElement, e: React.MouseEvent) => {
    e.stopPropagation();
    isResizing.current = true;
    transformStart.current = {
      angle: el.rotation,
      startAngle: 0,
      width: el.width,
      height: el.height,
      mouseX: e.clientX,
      mouseY: e.clientY
    };
  };

  const handleRotateMouseDown = (el: CanvasElement, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!workspaceRef.current) return;
    isRotating.current = true;
    
    // Calculate rotation center in screen coordinates
    const rect = workspaceRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width * (el.x / 100);
    const centerY = rect.top + rect.height * (el.y / 100);

    const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    transformStart.current = {
      angle: el.rotation,
      startAngle,
      width: el.width,
      height: el.height,
      mouseX: centerX,
      mouseY: centerY
    };
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!canvasState.activeElementId) return;
      
      if (isDragging.current) {
        if (!workspaceRef.current) return;
        const rect = workspaceRef.current.getBoundingClientRect();
        
        // Calculate movement offsets as percentages
        const deltaX = ((e.clientX - dragStart.current.x) / rect.width) * 100;
        const deltaY = ((e.clientY - dragStart.current.y) / rect.height) * 100;
        
        let newX = dragStart.current.elX + deltaX;
        let newY = dragStart.current.elY + deltaY;

        // Alignment guides / Snapping
        if (Math.abs(newX - 50) < 2) newX = 50; // center snap
        if (Math.abs(newY - 50) < 2) newY = 50;

        updateActiveElementProps({ x: newX, y: newY });
      }

      else if (isResizing.current) {
        if (!workspaceRef.current) return;
        const rect = workspaceRef.current.getBoundingClientRect();
        const deltaX = ((e.clientX - transformStart.current.mouseX) / rect.width) * 100;
        const deltaY = ((e.clientY - transformStart.current.mouseY) / rect.height) * 100;
        
        const newWidth = Math.max(5, transformStart.current.width + deltaX * 2);
        const newHeight = Math.max(3, transformStart.current.height + deltaY * 2);

        updateActiveElementProps({ width: newWidth, height: newHeight });
      }

      else if (isRotating.current) {
        const angle = Math.atan2(e.clientY - transformStart.current.mouseY, e.clientX - transformStart.current.mouseX);
        const diff = angle - transformStart.current.startAngle;
        let deg = transformStart.current.angle + (diff * 180) / Math.PI;
        
        // Snap to grid angles (0, 90, 180, 270)
        if (Math.abs(deg % 90) < 4) deg = Math.round(deg / 90) * 90;

        updateActiveElementProps({ rotation: deg });
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging.current || isResizing.current || isRotating.current) {
        isDragging.current = false;
        isResizing.current = false;
        isRotating.current = false;
        commitPropertyChange(); // Save to undo stack
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [canvasState]);

  // Pricing calculations
  const calculatePrice = () => {
    const base = product.basePrice;
    const materialMult = product.materials[selectedMaterialIdx]?.multiplier || 1;
    const finishAdd = product.finishes[selectedFinishIdx]?.addedCost || 0;
    
    // Scale unit cost by quantity discount
    let qtyDiscount = 1;
    if (quantity >= 500) qtyDiscount = 0.75;
    else if (quantity >= 100) qtyDiscount = 0.85;
    else if (quantity >= 50) qtyDiscount = 0.92;

    const unitPrice = (base * materialMult + finishAdd) * qtyDiscount;
    return Number((unitPrice * quantity).toFixed(2));
  };

  // Save design triggers
  const handleSaveDesign = () => {
    const newDesign: SavedDesign = {
      id: `des-${Date.now()}`,
      productType: selectedProductType,
      name: designName,
      canvasState: {
        elements: canvasState.elements,
        backgroundColor: canvasState.backgroundColor,
        activeElementId: null
      },
      date: new Date().toLocaleDateString(),
      previewUrl: '' // simulated screenshot
    };
    db.saveDesign(newDesign);
    alert(`"${designName}" saved successfully in your Customer Dashboard!`);
  };

  // Checkout order submission
  const handleCheckoutOrder = () => {
    addToCart({
      productType: product.type,
      productName: product.name,
      quantity,
      material: product.materials[selectedMaterialIdx].name,
      finish: product.finishes[selectedFinishIdx].name,
      color: selectedColor,
      price: calculatePrice(),
      artworkType: 'studio',
      canvasState: {
        elements: canvasState.elements,
        backgroundColor: canvasState.backgroundColor,
        activeElementId: null
      }
    });
    setView('checkout');
  };

  const activeElement = canvasState.elements.find(el => el.id === canvasState.activeElementId);

  return (
    <div className="studio-layout">
      {/* LEFT PANEL: Editing Controls */}
      <div className="studio-panel">
        <div className="studio-panel-header">Studio Toolbox</div>
        <div className="studio-panel-content">
          {/* Product type selection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Product Template</label>
            <select 
              value={selectedProductType}
              onChange={(e) => setSelectedProductType(e.target.value as ProductType)}
              style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-color)',
                color: '#FFF',
                padding: '10px 14px',
                borderRadius: '8px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {products.map(p => (
                <option key={p.id} value={p.type}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Add Layer Triggers */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary" style={{ flex: 1, padding: '10px' }} onClick={addTextElement}>
              ＋ Add Text
            </button>
            <div style={{ flex: 1, position: 'relative' }}>
              <input 
                type="file" 
                accept="image/*" 
                id="image-uploader" 
                style={{ display: 'none' }}
                onChange={handleLogoUploadSimulate} 
              />
              <label 
                htmlFor="image-uploader" 
                className="btn btn-secondary" 
                style={{ display: 'flex', width: '100%', padding: '10px', textAlign: 'center', cursor: 'pointer' }}
              >
                ✦ Load Logo
              </label>
            </div>
          </div>

          {/* Guidelines toggler */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Print Boundary Guides</span>
            <input 
              type="checkbox" 
              checked={showGuides} 
              onChange={(e) => setShowGuides(e.target.checked)}
              style={{ cursor: 'pointer', width: '18px', height: '18px' }} 
            />
          </div>

          {/* Active element modification fields */}
          {activeElement ? (
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-secondary)' }}>Element Settings</span>
                <button className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '0.75rem' }} onClick={deleteActiveElement}>
                  Delete
                </button>
              </div>

              {/* Text editing fields */}
              {activeElement.type === 'text' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Text Content</label>
                    <input 
                      type="text" 
                      value={activeElement.content}
                      onChange={(e) => updateActiveElementProps({ content: e.target.value })}
                      onBlur={commitPropertyChange}
                      style={{
                        background: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-color)',
                        color: '#FFF',
                        padding: '10px',
                        borderRadius: '6px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Font Size</label>
                      <input 
                        type="number" 
                        value={activeElement.fontSize}
                        onChange={(e) => updateActiveElementProps({ fontSize: parseInt(e.target.value) || 12 })}
                        onBlur={commitPropertyChange}
                        style={{
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-color)',
                          color: '#FFF',
                          padding: '10px',
                          borderRadius: '6px',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Text Color</label>
                      <input 
                        type="color" 
                        value={activeElement.color}
                        onChange={(e) => updateActiveElementProps({ color: e.target.value })}
                        onBlur={commitPropertyChange}
                        style={{
                          width: '100%',
                          height: '40px',
                          border: '1px solid var(--border-color)',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          background: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Font Family</label>
                    <select
                      value={activeElement.fontFamily}
                      onChange={(e) => {
                        updateActiveElementProps({ fontFamily: e.target.value });
                        pushHistory(canvasState.elements);
                      }}
                      style={{
                        background: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-color)',
                        color: '#FFF',
                        padding: '10px',
                        borderRadius: '6px',
                        outline: 'none'
                      }}
                    >
                      <option value="Outfit">Outfit (Sans)</option>
                      <option value="Playfair Display">Playfair (Serif)</option>
                      <option value="Courier New">Courier (Code)</option>
                      <option value="Impact">Impact (Heavy)</option>
                    </select>
                  </div>
                </>
              )}

              {/* Image Resolution Warnings */}
              {activeElement.type === 'image' && activeElement.dpi && (
                <div style={{
                  background: activeElement.dpi < 150 ? 'rgba(255, 45, 85, 0.15)' : 'rgba(52, 199, 89, 0.15)',
                  border: activeElement.dpi < 150 ? '1px solid rgba(255, 45, 85, 0.3)' : '1px solid rgba(52, 199, 89, 0.3)',
                  padding: '12px',
                  borderRadius: '6px',
                  fontSize: '0.8rem'
                }}>
                  <strong>Print Safety Resolution:</strong>
                  <div style={{ marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Estimated Quality:</span>
                    <span style={{ color: activeElement.dpi < 150 ? 'var(--color-accent)' : '#30D158', fontWeight: 600 }}>
                      {activeElement.dpi < 150 ? '⚠️ Low DPI' : '✓ Good DPI'}
                    </span>
                  </div>
                  <div style={{ marginTop: '4px', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    Current layout DPI: ~{activeElement.dpi}. {activeElement.dpi < 150 ? 'Downscale size or upload a 300 DPI logo for crisp outcomes.' : 'Perfect resolution for standard print files.'}
                  </div>
                </div>
              )}

              {/* Layer controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Layer Depth</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-secondary" style={{ flex: 1, padding: '6px' }} onClick={() => changeLayerOrder('up')}>▲ Move Up</button>
                  <button className="btn btn-secondary" style={{ flex: 1, padding: '6px' }} onClick={() => changeLayerOrder('down')}>▼ Move Down</button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: 'var(--color-text-muted)',
              fontSize: '0.9rem',
              border: '1px dashed var(--border-color)',
              borderRadius: '8px'
            }}>
              Click an element on the mockup to configure placement, colors, sizes, or layer depth.
            </div>
          )}

          {/* Undo/Redo Controls */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', gap: '12px' }}>
            <button 
              className={`btn btn-secondary ${historyIndex <= 0 ? 'btn-disabled' : ''}`} 
              disabled={historyIndex <= 0} 
              onClick={handleUndo} 
              style={{ flex: 1, padding: '8px' }}
            >
              Undo
            </button>
            <button 
              className={`btn btn-secondary ${historyIndex >= history.length - 1 ? 'btn-disabled' : ''}`} 
              disabled={historyIndex >= history.length - 1} 
              onClick={handleRedo} 
              style={{ flex: 1, padding: '8px' }}
            >
              Redo
            </button>
          </div>
        </div>
      </div>

      {/* MIDDLE WORKSPACE: Interactive canvas with guides */}
      <div className="studio-workspace">
        <div 
          ref={workspaceRef}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '450px',
            aspectRatio: '1',
            borderRadius: '12px',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* The interactive Mockup wraps our canvases */}
          <ProductMockup 
            type={selectedProductType} 
            color={selectedColor} 
            canvasState={canvasState} 
            showGuides={showGuides}
            highlightedElementId={canvasState.activeElementId}
          />

          {/* Clickable transparent click handlers mapped over mockup relative area to enable dragging */}
          <div 
            style={{
              position: 'absolute',
              // Mapped exactly to safeArea bounding percents to handle drags
              top: 'calc(24px + 18%)', 
              left: 'calc(24px + 22%)',
              width: '56%',
              height: '56%',
              pointerEvents: 'none' // elements themselves will override
            }}
          >
            {canvasState.elements.map((el) => {
              const isActive = el.id === canvasState.activeElementId;
              return (
                <div 
                  key={el.id}
                  onMouseDown={(e) => handleElementMouseDown(el, e)}
                  style={{
                    position: 'absolute',
                    left: `${el.x}%`,
                    top: `${el.y}%`,
                    transform: `translate(-50%, -50%) rotate(${el.rotation}deg)`,
                    width: `${el.width}%`,
                    height: `${el.height}%`,
                    pointerEvents: 'auto',
                    cursor: 'move',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: el.layer + 10,
                  }}
                  className={`interactive-element-wrapper ${isActive ? 'active' : ''}`}
                >
                  {el.type === 'text' ? (
                    <span style={{ 
                      fontSize: el.fontSize ? `${el.fontSize * 0.45}px` : '12px',
                      fontFamily: el.fontFamily || 'var(--font-sans)',
                      color: el.color || '#FFF',
                      fontWeight: 'bold',
                      pointerEvents: 'none',
                      textAlign: el.align || 'center'
                    }}>
                      {el.content}
                    </span>
                  ) : (
                    <img 
                      src={el.content} 
                      alt="Logo upload" 
                      style={{ width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }} 
                    />
                  )}

                  {/* Resizing & Rotation handles */}
                  {isActive && (
                    <>
                      <div 
                        className="resize-handle" 
                        onMouseDown={(e) => handleResizeMouseDown(el, e)} 
                      />
                      <div 
                        className="rotate-handle" 
                        onMouseDown={(e) => handleRotateMouseDown(el, e)} 
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Product Settings & Checkout Action */}
      <div className="studio-panel studio-panel-right">
        <div className="studio-panel-header">Specifications & Value</div>
        <div className="studio-panel-content">
          {/* Custom design name input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Design Name</label>
            <input 
              type="text" 
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-color)',
                color: '#FFF',
                padding: '10px 14px',
                borderRadius: '8px',
                outline: 'none'
              }}
            />
          </div>

          {/* Color Selection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Product Color</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {product.colors.map((color) => (
                <div 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: color,
                    border: selectedColor === color ? '2px solid var(--color-secondary)' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    boxShadow: selectedColor === color ? '0 0 10px var(--color-secondary-glow)' : 'none'
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Material Select */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Material Selection</label>
            <select 
              value={selectedMaterialIdx}
              onChange={(e) => setSelectedMaterialIdx(parseInt(e.target.value))}
              style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-color)',
                color: '#FFF',
                padding: '10px 14px',
                borderRadius: '8px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {product.materials.map((mat, idx) => (
                <option key={mat.name} value={idx}>{mat.name} ({mat.multiplier === 1 ? 'Standard' : `x${mat.multiplier}`})</option>
              ))}
            </select>
          </div>

          {/* Finish Select */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Print Finish / Edge Trim</label>
            <select 
              value={selectedFinishIdx}
              onChange={(e) => setSelectedFinishIdx(parseInt(e.target.value))}
              style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-color)',
                color: '#FFF',
                padding: '10px 14px',
                borderRadius: '8px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {product.finishes.map((fin, idx) => (
                <option key={fin.name} value={idx}>{fin.name} ({fin.addedCost === 0 ? 'Included' : `+$${fin.addedCost}`})</option>
              ))}
            </select>
          </div>

          {/* Quantity Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Print Quantity</label>
            <input 
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-color)',
                color: '#FFF',
                padding: '10px 14px',
                borderRadius: '8px',
                outline: 'none'
              }}
            />
          </div>

          {/* Instant Price Summary Card */}
          <div className="glass-panel" style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              <span>Base cost:</span>
              <span>${product.basePrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              <span>Material grade:</span>
              <span>x{product.materials[selectedMaterialIdx]?.multiplier}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              <span>Finish surcharge:</span>
              <span>+${product.finishes[selectedFinishIdx]?.addedCost}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              <span>Discounts:</span>
              <span style={{ color: 'var(--color-secondary)' }}>
                {quantity >= 500 ? '25% (Bulk)' : (quantity >= 100 ? '15% (Wholesale)' : (quantity >= 50 ? '8% (Promo)' : 'None'))}
              </span>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '12px', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: '1rem' }}>Total Cost:</strong>
              <strong style={{ fontSize: '1.6rem', color: 'var(--color-secondary)' }}>
                ${calculatePrice().toLocaleString()}
              </strong>
            </div>
          </div>

          {/* Call to action buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            <button 
              className="btn btn-primary"
              onClick={handleCheckoutOrder}
            >
              Order custom design
            </button>
            <button 
              className="btn btn-secondary"
              onClick={handleSaveDesign}
            >
              Save in Saved Designs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
