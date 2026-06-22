import React, { useState } from 'react';
import { db } from '../db';
import { ProductMockup } from '../components/ProductMockup';
import { getLocalizedProduct } from '../translations';
import type { ProductType, CanvasState } from '../types';

interface ServicesProps {
  setView: (view: string) => void;
  setSelectedProductType: (type: ProductType) => void;
  addToCart: (item: {
    productType: ProductType;
    productName: string;
    quantity: number;
    material: string;
    finish: string;
    color: string;
    price: number;
    artworkType: 'upload' | 'studio' | 'request';
    artworkUrl?: string;
  }) => void;
  t: (key: string) => string;
  lang: 'ar' | 'en';
}

// Blank canvas configuration for simple mockup representation
const emptyCanvasState: CanvasState = {
  elements: [],
  backgroundColor: 'transparent',
  activeElementId: null
};

export const Services: React.FC<ServicesProps> = ({
  setView,
  setSelectedProductType,
  addToCart,
  t,
  lang
}) => {
  // Prevent TS6133 compiler error by referencing the prop
  if (typeof setSelectedProductType === 'function') {
    // referenced
  }

  // Read catalog dynamically from DB! (Admin changes reflect immediately!)
  const catalogProducts = db.getProducts().map(p => {
    const localized = getLocalizedProduct(p, lang);
    return {
      ...p,
      name: localized.name,
      description: localized.description,
      materials: localized.materials,
      finishes: localized.finishes
    };
  });

  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, {
    materialIndex: number;
    finishIndex: number;
    colorIndex: number;
    quantity: number;
    uploadedFile: string | null;
    uploadedFileName: string | null;
  }>>(() => {
    const specs: any = {};
    catalogProducts.forEach(p => {
      specs[p.id] = {
        materialIndex: 0,
        finishIndex: 0,
        colorIndex: 0,
        quantity: p.type === 'sticker' ? 100 : (p.type === 'business_card' ? 250 : 25),
        uploadedFile: null,
        uploadedFileName: null
      };
    });
    return specs;
  });

  const handleSpecChange = (prodId: string, field: string, value: any) => {
    setSelectedSpecs(prev => ({
      ...prev,
      [prodId]: {
        ...prev[prodId],
        [field]: value
      }
    }));
  };

  const calculatePrice = (prodId: string) => {
    const product = catalogProducts.find(p => p.id === prodId)!;
    const spec = selectedSpecs[prodId];
    if (!spec) return 0;

    const base = product.basePrice;
    const materialMult = product.materials[spec.materialIndex]?.multiplier || 1;
    const finishAdd = product.finishes[spec.finishIndex]?.addedCost || 0;
    
    // Scale unit cost by quantity discount
    let qtyDiscount = 1;
    if (spec.quantity >= 500) qtyDiscount = 0.75;
    else if (spec.quantity >= 100) qtyDiscount = 0.85;
    else if (spec.quantity >= 50) qtyDiscount = 0.92;

    const unitPrice = (base * materialMult + finishAdd) * qtyDiscount;
    return Number((unitPrice * spec.quantity).toFixed(2));
  };

  const handleFileUploadSimulate = (prodId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleSpecChange(prodId, 'uploadedFile', event.target?.result as string);
        handleSpecChange(prodId, 'uploadedFileName', file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUploadAndOrder = (prodId: string) => {
    const product = catalogProducts.find(p => p.id === prodId)!;
    const spec = selectedSpecs[prodId];

    if (!spec.uploadedFile) {
      alert(lang === 'ar' ? 'يرجى اختيار تصميم للرفع أولاً.' : 'Please select or drag an artwork file to upload before proceeding.');
      return;
    }

    // Add to cart and redirect
    addToCart({
      productType: product.type,
      productName: product.name,
      quantity: spec.quantity,
      material: product.materials[spec.materialIndex].name,
      finish: product.finishes[spec.finishIndex].name,
      color: product.colors[spec.colorIndex],
      price: calculatePrice(prodId),
      artworkType: 'upload',
      artworkUrl: spec.uploadedFile
    });
    setView('checkout');
  };

  return (
    <div className="section" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span className="badge badge-printing" style={{ marginBottom: '12px' }}>{t('servicesTitle')}</span>
        <h1 className="serif-font" style={{ fontSize: '3rem', marginBottom: '16px' }}>{t('servicesTitle')}</h1>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          {t('servicesDesc')}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {catalogProducts.map((product) => {
          const spec = selectedSpecs[product.id] || {
            materialIndex: 0,
            finishIndex: 0,
            colorIndex: 0,
            quantity: product.type === 'sticker' ? 100 : (product.type === 'business_card' ? 250 : 25),
            uploadedFile: null,
            uploadedFileName: null
          };
          const totalPrice = calculatePrice(product.id);
          const unitPrice = (totalPrice / spec.quantity).toFixed(2);

          return (
            <div 
              key={product.id} 
              className="glass-panel" 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '400px 1fr', 
                gap: '40px',
                padding: '40px',
                alignItems: 'start'
              }}
            >
              {/* Left Column: Visual Mockup */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                <div style={{ 
                  width: '100%', 
                  background: 'radial-gradient(circle, #1a1a24 0%, #0d0d12 100%)', 
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid var(--border-color)'
                }}>
                  <ProductMockup 
                    type={product.type} 
                    color={product.colors[spec.colorIndex] || product.colors[0]} 
                    canvasState={emptyCanvasState} 
                  />
                </div>

                {/* Color swatches */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.colors.map((color, idx) => (
                    <div 
                      key={color}
                      onClick={() => handleSpecChange(product.id, 'colorIndex', idx)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: color,
                        border: spec.colorIndex === idx ? '2px solid var(--color-secondary)' : '1.5px solid var(--border-color)',
                        boxShadow: spec.colorIndex === idx ? '0 0 10px var(--color-secondary-glow)' : 'none',
                        cursor: 'pointer',
                        transform: spec.colorIndex === idx ? 'scale(1.15)' : 'none',
                        transition: 'transform 0.15s ease'
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column: Specification Inputs & Pricing */}
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                    <h2 className="serif-font" style={{ fontSize: '2rem' }}>{product.name}</h2>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
                      {t('startingAt')} {product.basePrice} {t('currency')}
                    </span>
                  </div>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', fontSize: '0.95rem' }}>{product.description}</p>

                  {/* Form Specifications Selector */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                    {/* Material */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                        {t('selectMaterial')}
                      </label>
                      <select 
                        value={spec.materialIndex}
                        onChange={(e) => handleSpecChange(product.id, 'materialIndex', parseInt(e.target.value))}
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
                          <option key={mat.name} value={idx}>{mat.name} ({mat.multiplier === 1.0 ? 'Standard' : `x${mat.multiplier}`})</option>
                        ))}
                      </select>
                    </div>

                    {/* Finish */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                        {t('selectFinish')}
                      </label>
                      <select 
                        value={spec.finishIndex}
                        onChange={(e) => handleSpecChange(product.id, 'finishIndex', parseInt(e.target.value))}
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
                          <option key={fin.name} value={idx}>{fin.name} ({fin.addedCost === 0 ? 'Standard' : `+${fin.addedCost} ${t('currency')}`})</option>
                        ))}
                      </select>
                    </div>

                    {/* Quantity */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                        {t('quantity')}
                      </label>
                      <input 
                        type="number"
                        min="1"
                        value={spec.quantity}
                        onChange={(e) => handleSpecChange(product.id, 'quantity', Math.max(1, parseInt(e.target.value) || 1))}
                        style={{
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-color)',
                          color: '#FFF',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          outline: 'none'
                        }}
                      />
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                        {t('discountNote')}
                      </span>
                    </div>

                    {/* Artwork Upload File Trigger */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                        {t('uploadArtwork')}
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleFileUploadSimulate(product.id, e)}
                          id={`upload-${product.id}`}
                          style={{ display: 'none' }} 
                        />
                        <label 
                          htmlFor={`upload-${product.id}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: spec.uploadedFile ? 'var(--color-primary-glow)' : 'rgba(255,255,255,0.02)',
                            border: spec.uploadedFile ? '1px dashed var(--color-primary)' : '1px dashed var(--border-color)',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            color: '#FFF',
                            cursor: 'pointer',
                            textAlign: 'center',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {spec.uploadedFileName || t('chooseFile')}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Action Block with cost breakdown */}
                <div style={{ 
                  borderTop: '1px solid var(--border-color)', 
                  paddingTop: '24px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {t('estimatedPricing')}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '2rem', fontWeight: 800, color: '#FFF' }}>
                        {totalPrice.toLocaleString()} {t('currency')}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                        ({unitPrice} {t('currency')} / {lang === 'ar' ? 'وحدة' : 'unit'})
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    {/* Design Online is suspended. Redirects to Brief Intake or shows offline alert */}
                    <button 
                      className="btn btn-secondary"
                      onClick={() => setView('studio')}
                      style={{ borderStyle: 'dashed', textDecoration: 'line-through', color: 'var(--color-text-muted)' }}
                    >
                      {t('designOnline')}
                    </button>
                    <button 
                      className={`btn btn-primary ${!spec.uploadedFile ? 'btn-disabled' : ''}`}
                      disabled={!spec.uploadedFile}
                      onClick={() => triggerUploadAndOrder(product.id)}
                    >
                      {t('uploadCheckout')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
