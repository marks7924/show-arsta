import React from 'react';
import type { UserRole } from '../types';

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
  activeRole: UserRole;
  setRole: (role: UserRole) => void;
  cartCount: number;
  lang: 'ar' | 'en';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setView,
  activeRole,
  setRole,
  cartCount,
  lang,
  toggleLanguage,
  t
}) => {
  return (
    <header className="app-header glass-panel">
      {/* Brand Logo */}
      <div 
        onClick={() => setView('home')} 
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <span style={{
          background: 'var(--gradient-brand)',
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          boxShadow: '0 0 10px var(--color-secondary-glow)'
        }}>
          A
        </span>
        <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.03em' }}>
          ARSTA <span className="text-gradient">PRINT</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="header-nav">
        <span 
          onClick={() => setView('home')} 
          style={{ 
            cursor: 'pointer', 
            fontWeight: 600, 
            fontSize: '0.95rem',
            color: currentView === 'home' ? 'var(--color-secondary)' : 'var(--color-text-secondary)',
            transition: 'var(--transition-fast)'
          }}
        >
          {t('navHome')}
        </span>
        <span 
          onClick={() => setView('services')} 
          style={{ 
            cursor: 'pointer', 
            fontWeight: 600, 
            fontSize: '0.95rem',
            color: currentView === 'services' ? 'var(--color-secondary)' : 'var(--color-text-secondary)',
            transition: 'var(--transition-fast)'
          }}
        >
          {t('navServices')}
        </span>
        <span 
          onClick={() => setView('portfolio')} 
          style={{ 
            cursor: 'pointer', 
            fontWeight: 600, 
            fontSize: '0.95rem',
            color: currentView === 'portfolio' ? 'var(--color-secondary)' : 'var(--color-text-secondary)',
            transition: 'var(--transition-fast)'
          }}
        >
          {t('navPortfolio')}
        </span>
        <span 
          onClick={() => setView('request-design')} 
          style={{ 
            cursor: 'pointer', 
            fontWeight: 600, 
            fontSize: '0.95rem',
            color: currentView === 'request-design' ? 'var(--color-secondary)' : 'var(--color-text-secondary)',
            transition: 'var(--transition-fast)'
          }}
        >
          {t('navRequestDesign')}
        </span>
        
        {/* Studio Editor (Offline Warning Badge) */}
        <span 
          onClick={() => setView('studio')} 
          style={{ 
            cursor: 'pointer', 
            fontWeight: 600, 
            fontSize: '0.95rem',
            color: 'var(--color-text-muted)',
            transition: 'var(--transition-fast)',
            border: '1px dashed rgba(255, 45, 85, 0.3)',
            padding: '4px 10px',
            borderRadius: '50px',
            background: 'rgba(255, 45, 85, 0.05)',
            textDecoration: 'line-through'
          }}
          title={lang === 'ar' ? 'معطل مؤقتاً للصيانة' : 'Temporarily suspended'}
        >
          {t('navStudio')} {lang === 'ar' ? '(معطل)' : '(Offline)'}
        </span>

        {activeRole !== 'guest' && (
          <span 
            onClick={() => setView(activeRole === 'admin' ? 'admin-dashboard' : 'customer-dashboard')} 
            style={{ 
              cursor: 'pointer', 
              fontWeight: 600, 
              fontSize: '0.95rem',
              color: (currentView === 'customer-dashboard' || currentView === 'admin-dashboard') ? 'var(--color-secondary)' : 'var(--color-text-secondary)',
              transition: 'var(--transition-fast)'
            }}
          >
            {activeRole === 'admin' ? t('navAdmin') : t('navDashboard')}
          </span>
        )}
      </nav>

      {/* Role Switcher & Language */}
      <div className="header-actions">
        {/* Quick Language Toggle Link in Header */}
        <span 
          onClick={toggleLanguage}
          style={{
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--color-secondary)',
            textTransform: 'uppercase',
            borderRight: lang === 'ar' ? '1px solid var(--border-color)' : 'none',
            borderLeft: lang === 'en' ? '1px solid var(--border-color)' : 'none',
            paddingRight: lang === 'ar' ? '12px' : '0',
            paddingLeft: lang === 'en' ? '12px' : '0',
          }}
        >
          {lang === 'ar' ? 'EN' : 'عربي'}
        </span>

        {/* Role Selector dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>{t('previewMode')}</span>
          <select 
            value={activeRole} 
            onChange={(e) => {
              const role = e.target.value as UserRole;
              setRole(role);
              // Auto route to corresponding dashboard if toggling
              if (role === 'admin') setView('admin-dashboard');
              else if (role === 'customer') setView('customer-dashboard');
              else setView('home');
            }}
            style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-color)',
              color: 'var(--color-text-primary)',
              padding: '6px 12px',
              borderRadius: '6px',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="guest">{t('guest')}</option>
            <option value="customer">{t('customer')}</option>
            <option value="admin">{t('admin')}</option>
          </select>
        </div>

        {/* Checkout Cart Button */}
        {cartCount > 0 && (
          <div 
            onClick={() => setView('checkout')}
            style={{
              position: 'relative',
              cursor: 'pointer',
              background: 'var(--color-primary-glow)',
              border: '1px solid rgba(94, 92, 230, 0.4)',
              color: 'var(--color-text-primary)',
              padding: '6px 14px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'var(--transition-fast)'
            }}
          >
            <span>{t('cart')}</span>
            <span style={{
              background: 'var(--color-primary)',
              color: '#FFF',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem'
            }}>
              {cartCount}
            </span>
          </div>
        )}
      </div>
    </header>
  );
};
