import React from 'react';
import { db } from '../db';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import type { PortfolioProject } from '../types';

interface PortfolioProps {
  setView: (view: string) => void;
  activeRole: string;
}

export const Portfolio: React.FC<PortfolioProps> = ({ setView, activeRole }) => {
  const projects = db.getPortfolioProjects();

  // Helper to render customized SVG drafts (Before)
  const renderBeforeDraft = (sketchType: string) => {
    switch (sketchType) {
      case 'sketch-zenith':
        return (
          <div style={{
            width: '100%', height: '100%', background: '#F4ECE1',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: '#5C4033', padding: '30px', fontFamily: 'Courier New', border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7 }}>Zenith Coffee Brief</h4>
            <div style={{
              width: '120px', height: '120px', border: '1.5px dashed #5C4033',
              borderRadius: '50%', margin: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <span style={{ fontSize: '0.8rem' }}>Logo Circle V1</span>
            </div>
            <p style={{ fontSize: '0.75rem', maxWidth: '240px' }}>"We want a hand-drawn circle logo with serif typography centered."</p>
          </div>
        );
      case 'sketch-novatech':
        return (
          <div style={{
            width: '100%', height: '100%', background: '#EAEAEA',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: '#121212', padding: '30px', fontFamily: 'Courier New'
          }}>
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7 }}>NovaTech Swag T-Shirt</h4>
            <div style={{
              width: '140px', height: '100px', border: '1px dashed #121212',
              margin: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>NOVATECH</span>
              <span style={{ fontSize: '0.6rem' }}>DEVCONF 2026</span>
            </div>
            <p style={{ fontSize: '0.75rem', maxWidth: '240px' }}>"Standard front print. Maybe code snippet or grid."</p>
          </div>
        );
      case 'sketch-apex':
        return (
          <div style={{
            width: '100%', height: '100%', background: '#E6EAEB',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: '#2F4F4F', padding: '30px', fontFamily: 'Courier New'
          }}>
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7 }}>Apex Executive Card</h4>
            <div style={{
              width: '180px', height: '100px', border: '1px dashed #2F4F4F',
              margin: '20px 0', display: 'flex', flexDirection: 'column', padding: '12px', gap: '4px'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>APEX LOGISTICS</span>
              <span style={{ fontSize: '0.6rem' }}>Alex Rivers, Creative Lead</span>
              <span style={{ fontSize: '0.55rem', opacity: 0.7 }}>alex@apex.com | +1 555 1200</span>
            </div>
            <p style={{ fontSize: '0.75rem', maxWidth: '240px' }}>"Keep it simple. White card with blue ink, typical business look."</p>
          </div>
        );
      default:
        return (
          <div style={{
            width: '100%', height: '100%', background: '#333',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF'
          }}>
            Draft Sketch Layout
          </div>
        );
    }
  };

  // Helper to render customized SVG finishes (After)
  const renderAfterMockup = (renderType: string) => {
    switch (renderType) {
      case 'render-zenith':
        return (
          <div style={{
            width: '100%', height: '100%', background: '#121215',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: '#FFF', padding: '30px'
          }}>
            <div style={{
              background: 'var(--gradient-gold)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '2.2rem',
              fontWeight: 800,
              fontFamily: 'var(--font-serif)',
              letterSpacing: '0.05em'
            }}>
              ZENITH
            </div>
            <div style={{ color: '#D4AF37', fontSize: '0.7rem', letterSpacing: '0.25em', marginTop: '4px' }}>
              SPECIALTY COFFEE
            </div>
            <div style={{
              marginTop: '32px',
              padding: '12px 24px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '6px',
              fontSize: '0.8rem',
              color: '#F4ECE1',
              fontFamily: 'monospace'
            }}>
              COPPER FOIL STAMP ON BLACK KRAFT
            </div>
          </div>
        );
      case 'render-novatech':
        return (
          <div style={{
            width: '100%', height: '100%', background: '#09090E',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: '#FFF', padding: '30px'
          }}>
            {/* Cyberpunk grid mockup representation */}
            <div style={{
              position: 'relative',
              width: '160px',
              height: '160px',
              border: '2px solid var(--color-secondary)',
              borderRadius: '8px',
              boxShadow: '0 0 20px var(--color-secondary-glow)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 255, 204, 0.05)'
            }}>
              <span style={{
                color: '#FFF',
                fontFamily: 'monospace',
                fontSize: '1.2rem',
                fontWeight: 700,
                letterSpacing: '0.1em'
              }}>
                NOVA_TECH
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-primary)', marginTop: '8px' }}>
                &lt; DEV_CONF /&gt;
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '16px' }}>
              NEON SILKSCREEN + SHIELD GLOW
            </div>
          </div>
        );
      case 'render-apex':
        return (
          <div style={{
            width: '100%', height: '100%', background: '#0D131A',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: '#FFF', padding: '30px'
          }}>
            <div style={{
              width: '240px',
              height: '140px',
              background: '#0B0B0F',
              borderRadius: '6px',
              border: '1.5px solid rgba(255,255,255,0.06)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
            }}>
              <div style={{ display: 'flex', justifySelf: 'start', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', background: '#D4AF37', borderRadius: '2px' }} />
                <span style={{ fontSize: '0.85rem', letterSpacing: '0.1em', fontWeight: 600 }}>APEX LOGISTICS</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFF' }}>Alex Rivers</span>
                <span style={{ fontSize: '0.6rem', color: '#D4AF37' }}>Lead Brand Developer</span>
                <span style={{ fontSize: '0.55rem', color: 'var(--color-text-secondary)', marginTop: '8px' }}>
                  alex@apex.com | +1 (555) 0122
                </span>
              </div>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '16px' }}>
              TRIPLE LAYER CORE + FOIL INSET
            </div>
          </div>
        );
      default:
        return (
          <div style={{
            width: '100%', height: '100%', background: '#555',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF'
          }}>
            Finished Mockup Render
          </div>
        );
    }
  };

  // Helper to render final real world simulation
  const renderRealWorldOutcome = (project: PortfolioProject) => {
    // Beautiful SVGs representing physical outcomes in context
    return (
      <div style={{
        background: 'radial-gradient(circle, #1c1c28 0%, #0c0c10 100%)',
        borderRadius: '12px',
        padding: '30px',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: '280px',
        position: 'relative'
      }}>
        {project.id === 'proj-zenith' && (
          <svg viewBox="0 0 200 200" width="160" height="160">
            {/* Wooden table outline */}
            <rect x="10" y="160" width="180" height="30" rx="4" fill="#5c4033" />
            {/* Ceramic Mug standing on table */}
            <path d="M60,60 L140,60 L140,150 C140,160 130,165 120,165 L80,165 C70,165 60,160 60,150 Z" fill="#EAE6DF" stroke="#000" strokeWidth="1" />
            <path d="M140,80 C165,80 165,130 140,130" fill="none" stroke="#EAE6DF" strokeWidth="15" strokeLinecap="round" />
            {/* Shading */}
            <path d="M120,60 C135,60 140,70 140,150 C140,160 130,165 120,165 Z" fill="rgba(0,0,0,0.06)" />
            {/* Debossed logo text */}
            <text x="100" y="115" fontFamily="serif" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#8B7D6B">ZENITH</text>
            {/* Steam spirals */}
            <path d="M90,40 Q95,30 90,20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
            <path d="M110,45 Q115,35 110,25" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}

        {project.id === 'proj-novatech' && (
          <svg viewBox="0 0 200 200" width="160" height="160">
            {/* Laptop mockup standing on desk */}
            <rect x="20" y="120" width="160" height="10" rx="2" fill="#555" />
            <path d="M30,30 L170,30 L160,120 L40,120 Z" fill="#222" />
            {/* Laptop screen glow */}
            <path d="M35,35 L165,35 L155,115 L45,115 Z" fill="#0C0C12" />
            {/* Stickers overlayed on Laptop outer casing */}
            <rect x="60" y="55" width="40" height="40" rx="4" fill="#000" stroke="#00FFCC" strokeWidth="2" transform="rotate(-15 80 75)" />
            <text x="80" y="77" fill="#00FFCC" fontSize="6" fontWeight="bold" textAnchor="middle" transform="rotate(-15 80 75)">NOVA</text>
            <circle cx="120" cy="80" r="18" fill="#5E5CE6" stroke="#FFF" strokeWidth="1.5" transform="rotate(10 120 80)" />
            <text x="120" y="83" fill="#FFF" fontSize="6" fontWeight="bold" textAnchor="middle" transform="rotate(10 120 80)">DEVCONF</text>
          </svg>
        )}

        {project.id === 'proj-apex' && (
          <svg viewBox="0 0 200 200" width="160" height="160">
            {/* Stack of Business Cards on office blotter */}
            <path d="M40,90 L130,60 L170,105 L80,135 Z" fill="#0B0B0F" stroke="#222" />
            <path d="M40,95 L130,65 L170,110 L80,140 Z" fill="#0B0B0F" stroke="#222" />
            <path d="M40,100 L130,70 L170,115 L80,145 Z" fill="#0A0D14" stroke="rgba(255,255,255,0.06)" />
            {/* Foil logo shine */}
            <polygon points="65,95 80,90 90,98 75,103" fill="#D4AF37" opacity="0.8" />
            <text x="110" y="105" fill="#FFF" fontSize="6" fontWeight="bold" transform="rotate(-18 110 105)">APEX</text>
          </svg>
        )}

        {/* Fallback if project is custom-added */}
        {project.id.startsWith('proj-custom') && (
          <div style={{ color: 'var(--color-secondary)', fontSize: '2.5rem' }}>✦</div>
        )}

        <div style={{
          position: 'absolute',
          bottom: '12px',
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Simulated Physical Outcome
        </div>
      </div>
    );
  };

  return (
    <div className="section" style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span className="badge badge-indesign" style={{ marginBottom: '12px' }}>Agency Work</span>
        <h1 className="serif-font" style={{ fontSize: '3rem', marginBottom: '16px' }}>Creative Portfolio</h1>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Explore Case Studies from real clients, evaluating the flow from their primary draft ideas to production printing runs.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
        {projects.map((project) => (
          <div 
            key={project.id} 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1.1fr', 
              gap: '60px',
              alignItems: 'start',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '80px'
            }}
          >
            {/* Text details column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span className="badge badge-approved">{project.category}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Client: {project.client}</span>
              </div>
              <h2 className="serif-font" style={{ fontSize: '2.5rem', marginBottom: '24px', lineHeight: 1.1 }}>{project.title}</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div>
                  <h4 style={{ color: 'var(--color-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    01 // Client Brief & Objectives
                  </h4>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>{project.brief}</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--color-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    02 // Design Development Process
                  </h4>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>{project.process}</p>
                </div>
              </div>

              <div style={{ marginTop: '40px' }}>
                <button 
                  className="btn btn-primary"
                  onClick={() => setView('services')}
                >
                  Order Similar Print Services
                </button>
              </div>
            </div>

            {/* Visuals showcase column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Slider widget */}
              <div>
                <BeforeAfterSlider 
                  beforeNode={renderBeforeDraft(project.beforeImage)} 
                  afterNode={renderAfterMockup(project.afterImage)}
                />
              </div>

              {/* Physical outcomes block */}
              {renderRealWorldOutcome(project)}
            </div>
          </div>
        ))}
      </div>
      
      {activeRole === 'admin' && (
        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
          <h4 style={{ marginBottom: '12px' }}>Admin Mode Active</h4>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
            You can upload a new project case study directly to this list from the Administrator Dashboard.
          </p>
          <button className="btn btn-secondary" onClick={() => setView('admin-dashboard')}>
            Go to Admin Panel
          </button>
        </div>
      )}
    </div>
  );
};
