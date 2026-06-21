import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Home } from './views/Home';
import { Services } from './views/Services';
import { Portfolio } from './views/Portfolio';
import { RequestDesign } from './views/RequestDesign';
import { Checkout } from './views/Checkout';
import { CustomerDashboard } from './views/CustomerDashboard';
import { AdminDashboard } from './views/AdminDashboard';
import { translations } from './translations';
import type { Language } from './translations';
import type { UserRole, ProductType } from './types';
import './index.css';

interface CartItem {
  productType: ProductType;
  productName: string;
  quantity: number;
  material: string;
  finish: string;
  color: string;
  price: number;
  artworkType: 'upload' | 'studio' | 'request';
  artworkUrl?: string;
  canvasState?: any;
}

function App() {
  const [currentView, setView] = useState<string>('home');
  const [activeRole, setRole] = useState<UserRole>('customer'); // Default to customer to make exploring dashboards easy
  const [selectedProductType, setSelectedProductType] = useState<ProductType>('tshirt');
  const [cart, setCart] = useState<CartItem | null>(null);
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  const [lang, setLang] = useState<Language>('ar'); // Arabic first by default!

  // Prevent TS6133 compiler error by referencing the state variable
  useEffect(() => {
    if (selectedProductType) {
      // referenced
    }
  }, [selectedProductType]);

  // Toggle Theme helper
  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  const addToCart = (item: CartItem) => {
    setCart(item);
  };

  const clearCart = () => {
    setCart(null);
  };

  const loadCartDirectly = (item: CartItem) => {
    setCart(item);
  };

  // Translation lookup helper
  const t = (key: keyof typeof translations['en'] | string): string => {
    const section = translations[lang];
    return (section as any)[key] || key;
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const renderActiveView = () => {
    // If the Studio view is requested, render a bilingual suspended notice
    if (currentView === 'studio') {
      return (
        <div className="section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <div className="glass-panel" style={{ padding: '48px', maxWidth: '550px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: 'var(--color-accent)', marginBottom: '20px' }}>⚠️</div>
            <h2 className="serif-font" style={{ fontSize: '2rem', marginBottom: '16px' }}>{t('studioOfflineTitle')}</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', fontSize: '0.95rem', lineHeight: '1.8' }}>
              {t('studioOfflineDesc')}
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={() => setView('request-design')}>
                {t('requestDesignCTA')}
              </button>
              <button className="btn btn-secondary" onClick={() => setView('services')}>
                {t('navServices')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'home':
        return (
          <Home 
            setView={setView} 
            setSelectedProductType={setSelectedProductType} 
            t={t}
          />
        );
      case 'services':
        return (
          <Services 
            setView={setView} 
            setSelectedProductType={setSelectedProductType} 
            addToCart={addToCart}
            t={t}
            lang={lang}
          />
        );
      case 'portfolio':
        return (
          <Portfolio 
            setView={setView} 
            activeRole={activeRole} 
            t={t}
          />
        );
      case 'request-design':
        return (
          <RequestDesign 
            setView={setView} 
            activeRole={activeRole}
            setRole={setRole}
            t={t}
          />
        );
      case 'checkout':
        return (
          <Checkout 
            setView={setView} 
            cart={cart} 
            clearCart={clearCart}
            activeRole={activeRole}
            setRole={setRole}
            t={t}
          />
        );
      case 'customer-dashboard':
        return (
          <CustomerDashboard 
            setView={setView} 
            setSelectedProductType={setSelectedProductType}
            loadCartDirectly={loadCartDirectly}
            t={t}
          />
        );
      case 'admin-dashboard':
        return (
          <AdminDashboard 
            t={t}
            lang={lang}
          />
        );
      default:
        return <Home setView={setView} setSelectedProductType={setSelectedProductType} t={t} />;
    }
  };

  return (
    <div 
      className="app-container" 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      style={{
        textAlign: lang === 'ar' ? 'right' : 'left',
        fontFamily: lang === 'ar' ? 'Tahoma, Arial, sans-serif' : 'var(--font-sans)'
      }}
    >
      {/* Top Navbar */}
      <Header 
        currentView={currentView} 
        setView={setView} 
        activeRole={activeRole} 
        setRole={setRole} 
        cartCount={cart ? 1 : 0}
        lang={lang}
        toggleLanguage={toggleLanguage}
        t={t}
      />

      {/* Main Work Area */}
      <main className="main-content">
        {renderActiveView()}
      </main>

      {/* Floating Theme / Assistance panel */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: lang === 'ar' ? '24px' : 'auto',
        right: lang === 'ar' ? 'auto' : '24px',
        zIndex: 90,
        display: 'flex',
        gap: '8px'
      }}>
        {/* Toggle Theme */}
        <button 
          onClick={() => setIsLightMode(!isLightMode)}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-color)',
            color: 'var(--color-secondary)',
            fontSize: '1.2rem',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title={isLightMode ? 'Dark Theme' : 'Light Theme'}
        >
          {isLightMode ? '🌙' : '☀️'}
        </button>

        {/* Language Toggler Switcher */}
        <button 
          onClick={toggleLanguage}
          style={{
            padding: '0 16px',
            height: '44px',
            borderRadius: '22px',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-color)',
            color: 'var(--color-secondary)',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {lang === 'ar' ? 'English' : 'العربية'}
        </button>

        {/* Demo Guide Help */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => {
              alert(
                lang === 'ar' ?
                "💡 إرشادات تشغيل العرض التجريبي للمنصة:\n\n" +
                "1. تبديل اللغات: استخدم زر (English / العربية) العائم بالأسفل لتبديل الواجهة واتجاه الموقع بالكامل RTL / LTR تلقائياً.\n" +
                "2. استوديو التصميم معطل: تماشياً مع طلبكم، تم تعليق محرر التصميم. النقر عليه سيعرض شاشة صيانة بليغة توجه المستخدم للمسارات البديلة.\n" +
                "3. لوحة المسؤول الكاملة (CRUD): قم بالتبديل لوضع 'مسؤول' بالأعلى. اذهب لتبويب 'تسعير المنتجات' لإضافة منتج جديد للكتالوج أو تعديل اسم/وصف وخامات منتج حالي، وشاهد التغيير الفوري بصفحة الخدمات. وتعديل مواصفات/تكاليف أي طلب للعملاء بالكامل." :
                "💡 ARSTA Print & Design Platform Demo Instructions:\n\n" +
                "1. Bilingual Layouts: Use the floating language toggle at the bottom to transition the site direction (RTL / LTR) and language dictionary instantly.\n" +
                "2. Design Studio Offline: As requested, the canvas studio is offline. Attempting to enter it triggers an upgrade notification screen guiding users to other features.\n" +
                "3. Full Administrator CRUD: Swap preview mode to Administrator. Use the Pricing panel to Add New products, edit descriptions, or modify order prices and materials, instantly reflecting changes on user dashboards."
              );
            }}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--color-primary-glow)',
              border: '1px solid rgba(94, 92, 230, 0.4)',
              color: '#FFF',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Help"
          >
            ℹ
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        padding: '40px 24px',
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-surface)',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: 'var(--color-text-muted)',
        marginTop: '60px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <span>© 2026 ARSTA Print & Design Ltd. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>{lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
            <span>{lang === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}</span>
            <span>{lang === 'ar' ? 'الاستدامة والبيئة' : 'Environmental Impact'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
