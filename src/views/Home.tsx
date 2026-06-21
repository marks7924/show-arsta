import React from 'react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

interface HomeProps {
  setView: (view: string) => void;
  setSelectedProductType: (type: any) => void;
  t: (key: string) => string;
}

export const Home: React.FC<HomeProps> = ({ setView, setSelectedProductType, t }) => {
  const categories = [
    {
      id: 'tshirt',
      nameAr: 'تي شيرت وملابس مخصصة',
      nameEn: 'T-Shirts & Apparel',
      descAr: 'قطن عضوي ثقيل الوزن بقصة واسعة وخيارات طباعة بارزة.',
      descEn: 'Heavyweight organic cotton, boxy fits, and puff printing options.',
      icon: '👕',
      tag: 'prod-tshirt'
    },
    {
      id: 'mug',
      nameAr: 'أكواب سيراميك فاخرة',
      nameEn: 'Ceramic Mugs',
      descAr: 'أكواب قهوة مصنوعة يدوياً من السيراميك المطلي المقاوم للحرارة.',
      descEn: 'Premium matte glaze craft coffee mugs built to last.',
      icon: '☕',
      tag: 'prod-mug'
    },
    {
      id: 'sticker',
      nameAr: 'ملصقات فينيل مقصوصة',
      nameEn: 'Die-Cut Stickers',
      descAr: 'ملصقات فينيل متينة ومقاومة للماء والعوامل الجوية بطبقة لامعة أو ثلاثية الأبعاد.',
      descEn: 'Holographic, glossy, and matte heavy-duty vinyl stickers.',
      icon: '✨',
      tag: 'prod-sticker'
    },
    {
      id: 'business_card',
      nameAr: 'بطاقات عمل فاخرة',
      nameEn: 'Business Cards',
      descAr: 'بطاقات من الورق القطني والكتان الفاخر مع حفر بارز وختم رقائق ذهبية ونحاسية.',
      descEn: 'Cotton linen textured cards with blind debossing and foil stamping.',
      icon: '📇',
      tag: 'prod-business-card'
    },
    {
      id: 'packaging',
      nameAr: 'صناديق كرتون صديقة للبيئة',
      nameEn: 'Eco Cardboard Boxes',
      descAr: 'صناديق شحن وعرض كرتونية مخصصة بأبعاد وطباعة بيئية ملائمة.',
      descEn: 'Custom-fit kraft paper shipping and display boxes.',
      icon: '📦',
      tag: 'prod-packaging'
    }
  ];

  const handleCategoryClick = (id: string, workflow: 'design' | 'upload') => {
    setSelectedProductType(id);
    if (workflow === 'design') {
      // Studio is suspended temporarily
      setView('studio');
    } else {
      setView('services');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-subtitle">{t('expressShipping')}</div>
        <h1 className="hero-title serif-font" dangerouslySetInnerHTML={{ __html: t('heroTitle') }} />
        <p className="hero-desc">{t('heroDesc')}</p>
        
        {/* Studio Offline Warn Label */}
        <div style={{
          background: 'rgba(255, 45, 85, 0.12)',
          border: '1.5px dashed rgba(255, 45, 85, 0.4)',
          borderRadius: '8px',
          padding: '12px 24px',
          marginBottom: '32px',
          fontSize: '0.85rem',
          maxWidth: '650px',
          lineHeight: '1.6',
          color: '#FFF'
        }}>
          📢 <strong>{t('studioOfflineTitle')}:</strong> {t('studioOfflineDesc')}
        </div>

        <div className="hero-ctas">
          <button 
            className="btn btn-primary" 
            onClick={() => setView('services')}
          >
            {t('navServices')} ✦
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => setView('request-design')}
          >
            {t('requestDesignCTA')}
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
            <h4 style={{ color: 'var(--color-secondary)' }}>{t('expressShipping')}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{t('expressShippingDesc')}</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--color-secondary)' }}>{t('printAssurance')}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{t('printAssuranceDesc')}</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--color-secondary)' }}>{t('carbonNeutral')}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{t('carbonNeutralDesc')}</p>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      <section className="section">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="serif-font" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{t('exploreServices')}</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            {t('exploreServicesDesc')}
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
                  <h3 className="serif-font" style={{ marginTop: '4px' }}>
                    {t('navHome') === 'الرئيسية' ? cat.nameAr : cat.nameEn}
                  </h3>
                  <p style={{ marginTop: '8px', fontSize: '0.85rem', lineHeight: '1.6' }}>
                    {t('navHome') === 'الرئيسية' ? cat.descAr : cat.descEn}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                <button 
                  className="btn btn-secondary" 
                  style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem', borderStyle: 'dashed', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}
                  onClick={() => handleCategoryClick(cat.id, 'design')}
                  title={t('studioOfflineTitle')}
                >
                  {t('designOnline')}
                </button>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem' }}
                  onClick={() => handleCategoryClick(cat.id, 'upload')}
                >
                  {t('detailsAction')}
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
              <span className="badge badge-indesign" style={{ marginBottom: '16px' }}>{t('featuredCaseStudy')}</span>
              <h2 className="serif-font" style={{ fontSize: '3rem', marginBottom: '24px', lineHeight: 1.1 }}>
                {t('zenithTitle')}
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '20px', lineHeight: '1.8' }}>
                {t('zenithDesc')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: 'var(--color-secondary)' }}>✓</span>
                  <div>
                    {t('sliderHint')}
                  </div>
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => setView('portfolio')}>
                {t('viewPortfolio')}
              </button>
            </div>

            {/* Slider container mapping simulated SVG representations */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <BeforeAfterSlider 
                titleBefore={t('navHome') === 'الرئيسية' ? 'مسودة فكرة العميل' : 'Client Brief Sketch'}
                titleAfter={t('navHome') === 'الرئيسية' ? 'نموذج مطبوع حقيقي فاخر' : 'Production-Ready Mockup'}
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
                    <h3>{t('navHome') === 'الرئيسية' ? '[مسودة تصميم العميل]' : '[CLIENT SKETCH CONCEPT]'}</h3>
                    <div style={{ border: '2px dashed #3E2723', width: '200px', height: '140px', margin: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      ZENITH BAG DESIGN V1
                    </div>
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
          <h2 className="serif-font" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{t('howItWorks')}</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
            {t('howItWorksDesc')}
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '32px' 
        }}>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>❶</div>
            <h4 style={{ marginBottom: '8px' }}>{t('step1Title')}</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{t('step1Desc')}</p>
          </div>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>❷</div>
            <h4 style={{ marginBottom: '8px' }}>{t('step2Title')}</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{t('step2Desc')}</p>
          </div>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>❸</div>
            <h4 style={{ marginBottom: '8px' }}>{t('step3Title')}</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{t('step3Desc')}</p>
          </div>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>❹</div>
            <h4 style={{ marginBottom: '8px' }}>{t('step4Title')}</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{t('step4Desc')}</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: '#0F0F15', padding: '100px 24px' }}>
        <div className="section" style={{ padding: 0 }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="serif-font" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{t('testimonialsTitle')}</h2>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px' 
          }}>
            <div className="glass-panel" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', color: '#D4AF37', gap: '4px', marginBottom: '12px' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', marginBottom: '20px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.8' }}>
                {t('testimonial1Text')}
              </p>
              <h5 style={{ fontWeight: 600 }}>{t('testimonial1Author')}</h5>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t('testimonial1Role')}</span>
            </div>
            <div className="glass-panel" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', color: '#D4AF37', gap: '4px', marginBottom: '12px' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', marginBottom: '20px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.8' }}>
                {t('testimonial2Text')}
              </p>
              <h5 style={{ fontWeight: 600 }}>{t('testimonial2Author')}</h5>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t('testimonial2Role')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
