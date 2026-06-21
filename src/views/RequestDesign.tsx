import React, { useState } from 'react';
import { db } from '../db';
import type { ProductType, DesignRequest } from '../types';
import { products } from '../mockData';

interface RequestDesignProps {
  setView: (view: string) => void;
  activeRole: string;
  setRole: (role: any) => void;
}

export const RequestDesign: React.FC<RequestDesignProps> = ({
  setView,
  activeRole,
  setRole
}) => {
  const [productType, setProductType] = useState<ProductType>('tshirt');
  const [description, setDescription] = useState<string>('');
  const [budgetRange, setBudgetRange] = useState<string>('$500 - $1,000 (Standard Brand Pack)');
  const [urgency, setUrgency] = useState<'standard' | 'rush' | 'express'>('standard');
  const [refImage, setRefImage] = useState<string | null>(null);
  const [refImageName, setRefImageName] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleRefImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setRefImage(event.target?.result as string);
        setRefImageName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      alert('Please describe your design idea to help our creative team.');
      return;
    }

    if (activeRole === 'guest') {
      setRole('customer');
    }

    const newRequest: DesignRequest = {
      id: `req-${Date.now()}`,
      userId: 'user-current',
      userName: 'Alex Rivers',
      userEmail: 'alex@designstudio.io',
      productType,
      description,
      referenceImage: refImage || undefined,
      budgetRange,
      urgency,
      status: 'pending',
      date: new Date().toLocaleDateString()
    };

    db.saveDesignRequest(newRequest);
    setFormSubmitted(true);
  };

  if (formSubmitted) {
    return (
      <div className="section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="glass-panel" style={{ padding: '48px', maxWidth: '500px', textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', color: 'var(--color-secondary)', marginBottom: '24px' }}>✦</div>
          <h2 className="serif-font" style={{ fontSize: '2rem', marginBottom: '16px' }}>Brief Submitted</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', fontSize: '0.95rem' }}>
            Your design brief has been securely transmitted to our administrative studio. A professional lead designer will review it and upload a mockup proof within 24 hours.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button 
              className="btn btn-primary" 
              style={{ flex: 1 }}
              onClick={() => {
                setFormSubmitted(false);
                setDescription('');
                setRefImage(null);
                setRefImageName(null);
                setView('customer-dashboard');
              }}
            >
              Track on Dashboard
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setFormSubmitted(false);
                setDescription('');
                setRefImage(null);
                setRefImageName(null);
                setView('home');
              }}
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'start' }}>
      {/* Description column */}
      <div style={{ padding: '20px 0' }}>
        <span className="badge badge-indesign" style={{ marginBottom: '16px' }}>Professional Design Service</span>
        <h1 className="serif-font" style={{ fontSize: '3rem', marginBottom: '24px', lineHeight: 1.1 }}>
          Let Our Designers Craft Your Print Asset
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', marginBottom: '32px' }}>
          Don't have print-ready artwork? Work directly with our design agency team. We design, review, and print under one roof.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary-glow)', 
              display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: 'var(--color-secondary)', fontWeight: 'bold'
            }}>1</div>
            <div>
              <h4 style={{ marginBottom: '4px' }}>Detailed Briefing Intake</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                Outline your ideas, branding references, colors, font guides, and timeline preferences in the brief form.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary-glow)', 
              display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: 'var(--color-secondary)', fontWeight: 'bold'
            }}>2</div>
            <div>
              <h4 style={{ marginBottom: '4px' }}>Mockup Collaboration</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                Your assigned designer uploads proof concepts directly to your account. You can request revisions or approve them instantly.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary-glow)', 
              display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: 'var(--color-secondary)', fontWeight: 'bold'
            }}>3</div>
            <div>
              <h4 style={{ marginBottom: '4px' }}>Production Blueprint Release</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                Once approved, the file coordinates are sent to our printing queue. You track production steps through packaging and courier shipment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Form column */}
      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 className="serif-font" style={{ fontSize: '1.6rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          Create Design Brief
        </h3>

        {/* Product Type selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Product Category</label>
          <select 
            value={productType}
            onChange={(e) => setProductType(e.target.value as ProductType)}
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

        {/* Description brief textarea */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Describe Your Idea</label>
          <textarea 
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please detail your color desires, text components, logos, and general layout expectations..."
            style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-color)',
              color: '#FFF',
              padding: '12px 14px',
              borderRadius: '8px',
              outline: 'none',
              resize: 'vertical',
              fontSize: '0.9rem',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Upload Reference Simulation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Reference Images / Logos</label>
          <div>
            <input 
              type="file" 
              accept="image/*"
              id="ref-upload"
              style={{ display: 'none' }}
              onChange={handleRefImageChange} 
            />
            <label 
              htmlFor="ref-upload"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: refImage ? 'var(--color-primary-glow)' : 'rgba(255,255,255,0.02)',
                border: refImage ? '1px dashed var(--color-primary)' : '1px dashed var(--border-color)',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                color: '#FFF',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              {refImageName ? `✓ ${refImageName}` : 'Upload sketches, logos, details (Max 10MB)'}
            </label>
          </div>
        </div>

        {/* Budget select */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Target Budget Range</label>
          <select 
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
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
            <option value="$100 - $300 (Single item concept)">$100 - $300 (Single item concept)</option>
            <option value="$300 - $500 (Detailed logo and print placement)">$300 - $500 (Detailed logo and print placement)</option>
            <option value="$500 - $1,000 (Standard Brand Pack)">$500 - $1,000 (Standard Brand Pack)</option>
            <option value="$1,000+ (Full corporate collateral kit)">$1,000+ (Full corporate collateral kit)</option>
          </select>
        </div>

        {/* Urgency select */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Delivery Urgency</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['standard', 'rush', 'express'].map((urg) => (
              <button
                key={urg}
                type="button"
                onClick={() => setUrgency(urg as any)}
                style={{
                  flex: 1,
                  background: urgency === urg ? 'var(--color-primary-glow)' : 'rgba(255,255,255,0.02)',
                  border: urgency === urg ? '1.5px solid var(--color-primary)' : '1px solid var(--border-color)',
                  color: '#FFF',
                  padding: '10px 6px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {urg === 'standard' ? 'Standard (5-7d)' : (urg === 'rush' ? '⚡ Rush (2-3d)' : '✦ Express (24h)')}
              </button>
            ))}
          </div>
        </div>

        {/* Submit triggers */}
        <button type="submit" className="btn btn-primary" style={{ marginTop: '12px' }}>
          Submit Brief to Agency
        </button>
      </form>
    </div>
  );
};
