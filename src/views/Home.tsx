import React from 'react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

interface HomeProps {
  setView: (view: string) => void;
  setSelectedProductType: (type: any) => void;
}

export const Home: React.FC<HomeProps> = ({ setView, setSelectedProductType }) => {
  const categories = [
    {
      id: 'tshirt',
      name: 'T-Shirts & Apparel',
      desc: 'Heavyweight organic cotton, boxy fits, and puff printing options.',
      icon: '👕',
      tag: 'From $24.99'
    },
    {
      id: 'mug',
      name: 'Ceramic Mugs',
      desc: 'Premium matte glaze craft coffee mugs built to last.',
      icon: '☕',
      tag: 'From $12.99'
    },
    {
      id: 'sticker',
      name: 'Die-Cut Stickers',
      desc: 'Holographic, glossy, and matte heavy-duty vinyl stickers.',
      icon: '✨',
      tag: 'From $1.49'
    },
    {
      id: 'business_card',
      name: 'Business Cards',
      desc: 'Cotton linen textured cards with blind debossing and foil stamping.',
      icon: '📇',
      tag: 'From $0.25'
    },
    {
      id: 'packaging',
      name: 'Eco Cardboard Boxes',
      desc: 'Custom-fit kraft paper shipping and display boxes.',
      icon: '📦',
      tag: 'From $2.99'
    }
  ];

  const handleCategoryClick = (id: string, workflow: 'design' | 'upload') => {
    setSelectedProductType(id);
    if (workflow === 'design') {
      setView('studio');
    } else {
      setView('services');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-subtitle">Premium Custom Printing</div>
        <h1 className="hero-title serif-font">
          Design. Print. <span className="text-gradient">Deliver.</span>
        </h1>
        <p className="hero-desc">
          Create high-fidelity print designs on our intuitive web canvas or hire our world-class designers to bring your vision to life.
        </p>
        <div className="hero-ctas">
          <button 
            className="btn btn-primary" 
            onClick={() => {
              setSelectedProductType('tshirt');
              setView('studio');
            }}
          >
            Start Designing ✦
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => setView('request-design')}
          >
            Request Custom Design
          </button>
        </div>
      </section>

      {/* Trust Badges */}
      <section style={{ 
        padding: '24px', 
        borderTop: '1px solid var(--border-color)', 
        borderBottom: '1px solid var(--border-color)',
        background: 'rgba(255,255,255,0.01)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-around', 
          flexWrap: 'wrap', 
          gap: '24px',
          textAlign: 'center'
        }}>
          <div>
            <h4 style={{ color: 'var(--color-secondary)' }}>⚡ Express Shipping</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Production + delivery in 48-72h</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--color-secondary)' }}>🛡️ Premium Print Assurance</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Every file reviewed by printing experts</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--color-secondary)' }}>🌱 Carbon-Neutral Stock</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>100% sustainable paper and cotton</p>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      <section className="section">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="serif-font" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Explore Print Services</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Choose from our premium selection of curated products and begin customizing immediately.
          </p>
        </div>

        <div className="grid-categories">
          {categories.map((cat) => (
            <div key={cat.id} className="category-card">
              <div>
                <div className="category-icon-wrap" style={{ fontSize: '1.8rem' }}>
                  {cat.icon}
                </div>
                <div style={{ marginTop: '24px' }}>
                  <span className="badge badge-printing" style={{ marginBottom: '8px' }}>{cat.tag}</span>
                  <h3 className="serif-font" style={{ marginTop: '4px' }}>{cat.name}</h3>
                  <p style={{ marginTop: '8px' }}>{cat.desc}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem' }}
                  onClick={() => handleCategoryClick(cat.id, 'design')}
                >
                  Design
                </button>
                <button 
                  className="btn btn-secondary" 
                  style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem' }}
                  onClick={() => handleCategoryClick(cat.id, 'upload')}
                >
                  Specs
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Case Study Teaser */}
      <section style={{ background: '#0F0F15', padding: '100px 24px' }}>
        <div className="section" style={{ padding: 0 }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '60px', 
            alignItems: 'center' 
          }}>
            <div>
              <span className="badge badge-indesign" style={{ marginBottom: '16px' }}>Featured Case Study</span>
              <h2 className="serif-font" style={{ fontSize: '3rem', marginBottom: '24px', lineHeight: 1.1 }}>
                Zenith Specialty Coffee Roasters
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
                Zenith needed corporate packaging that felt as clean and pure as their single-origin coffee. We built a visual identity relying on high-density copper hot stamping on natural brown kraft stock.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: 'var(--color-secondary)' }}>✓</span>
                  <div>
                    <strong>Interactive Slide Preview:</strong> Drag the slider to compare client sketch briefs with finalized premium physical items.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: 'var(--color-secondary)' }}>✓</span>
                  <div>
                    <strong>Precision Layouts:</strong> Realized using select eco-kraft structures.
                  </div>
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => setView('portfolio')}>
                View Case Studies Library
              </button>
            </div>

            {/* Slider container mapping simulated SVG representations */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <BeforeAfterSlider 
                beforeNode={
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    background: '#C2B280', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    padding: '40px',
                    color: '#3E2723',
                    textAlign: 'center',
                    fontFamily: 'Courier New'
                  }}>
                    <h3>[CLIENT SKETCH CONCEPT]</h3>
                    <div style={{ border: '2px dashed #3E2723', width: '200px', height: '140px', margin: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      ZENITH BAG DESIGN V1
                    </div>
                    <p style={{ fontSize: '0.8rem' }}>"Please use organic materials and dark lettering."</p>
                  </div>
                }
                afterNode={
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    background: '#1A1A1A', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    padding: '40px',
                    color: '#FFF',
                    position: 'relative'
                  }}>
                    {/* Golden luxury graphic representation */}
                    <div style={{
                      background: 'var(--gradient-gold)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontFamily: 'serif',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      letterSpacing: '0.1em'
                    }}>
                      ZENITH
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#D4AF37', letterSpacing: '0.2em', marginTop: '4px' }}>
                      COFFEE ROASTERS
                    </div>
                    <div style={{
                      marginTop: '40px',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      padding: '12px 24px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      color: '#EAE6DF',
                      background: 'rgba(0,0,0,0.5)',
                      fontFamily: 'monospace'
                    }}>
                      NATURAL CRAFT BAG
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works section */}
      <section className="section" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="serif-font" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>How It Works</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
            A simplified, secure workflow from digital idea to physical delivery.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '32px' 
        }}>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>❶</div>
            <h4 style={{ marginBottom: '8px' }}>Select & Customize</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              Choose a product, write ideas or select custom templates in the online studio, or upload your logo files.
            </p>
          </div>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>❷</div>
            <h4 style={{ marginBottom: '8px' }}>Instant Estimate</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              Configure finishes, volume, and material grades. Receive precise, real-time cost feedback instantly.
            </p>
          </div>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>❸</div>
            <h4 style={{ marginBottom: '8px' }}>Expert Preflight Review</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              Before printing, our design team tests your file layout, margins, and DPI. No failures allowed.
            </p>
          </div>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>❹</div>
            <h4 style={{ marginBottom: '8px' }}>Premium Delivery</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              We print using industry-leading machinery and ship directly to your storefront. Track live on your dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: '#0F0F15', padding: '100px 24px' }}>
        <div className="section" style={{ padding: 0 }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="serif-font" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Loved by Leading Brands</h2>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px' 
          }}>
            <div className="glass-panel" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', color: '#D4AF37', gap: '4px', marginBottom: '12px' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', marginBottom: '20px', color: 'var(--color-text-secondary)' }}>
                "We ordered 500 custom linen cards for our executive team. The blind debossing was pristine and the thick layered edge is a major talking point."
              </p>
              <h5 style={{ fontWeight: 600 }}>Marcus Chen</h5>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Co-Founder, Apex Logistics</span>
            </div>
            <div className="glass-panel" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', color: '#D4AF37', gap: '4px', marginBottom: '12px' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', marginBottom: '20px', color: 'var(--color-text-secondary)' }}>
                "The web studio editor was super smooth. I was warning-flagged for a low-res logo asset, which prevented a printing mistake. Excellent attention to quality."
              </p>
              <h5 style={{ fontWeight: 600 }}>Elena Rostova</h5>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Marketing Lead, NovaTech DevConf</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
