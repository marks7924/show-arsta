import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Home } from './views/Home';
import { Services } from './views/Services';
import { Portfolio } from './views/Portfolio';
import { DesignStudio } from './views/DesignStudio';
import { RequestDesign } from './views/RequestDesign';
import { Checkout } from './views/Checkout';
import { CustomerDashboard } from './views/CustomerDashboard';
import { AdminDashboard } from './views/AdminDashboard';
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

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return (
          <Home 
            setView={setView} 
            setSelectedProductType={setSelectedProductType} 
          />
        );
      case 'services':
        return (
          <Services 
            setView={setView} 
            setSelectedProductType={setSelectedProductType} 
            addToCart={addToCart}
          />
        );
      case 'portfolio':
        return (
          <Portfolio 
            setView={setView} 
            activeRole={activeRole} 
          />
        );
      case 'studio':
        return (
          <DesignStudio 
            setView={setView} 
            selectedProductType={selectedProductType}
            setSelectedProductType={setSelectedProductType}
            addToCart={addToCart}
          />
        );
      case 'request-design':
        return (
          <RequestDesign 
            setView={setView} 
            activeRole={activeRole}
            setRole={setRole}
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
          />
        );
      case 'customer-dashboard':
        return (
          <CustomerDashboard 
            setView={setView} 
            setSelectedProductType={setSelectedProductType}
            loadCartDirectly={loadCartDirectly}
          />
        );
      case 'admin-dashboard':
        return (
          <AdminDashboard />
        );
      default:
        return <Home setView={setView} setSelectedProductType={setSelectedProductType} />;
    }
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Header 
        currentView={currentView} 
        setView={setView} 
        activeRole={activeRole} 
        setRole={setRole} 
        cartCount={cart ? 1 : 0}
      />

      {/* Main Work Area */}
      <main className="main-content">
        {renderActiveView()}
      </main>

      {/* Floating Theme / Assistance panel */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
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
          title={isLightMode ? 'Switch to Dark Luxury Theme' : 'Switch to Light Crisp Theme'}
        >
          {isLightMode ? '🌙' : '☀️'}
        </button>

        {/* Demo Guide Help */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => {
              alert(
                "💡 ARSTA Print & Design Platform Demo Instructions:\n\n" +
                "1. Role Swapping: Use the 'Preview Mode' selector in the top navbar to toggle roles (Guest, Customer, Admin).\n" +
                "2. Self-Service Canvas: Click 'Studio Editor' in the nav. Drag, rotate, and resize elements, choose templates, or upload logo files. Note the resolution DPI warn-flags.\n" +
                "3. Professional Intake: Click 'Request Design' in the nav. Fill out the brand packaging/briefing sheets to simulate administrative workflows.\n" +
                "4. Catalog Adjustments: Toggle your role to Administrator, click 'Catalog Rules' to modify base pricing tiers, and see it sync across editor pages instantly!\n" +
                "5. Preflight Reviews: Checkout a design. Switch your role to Administrator. Under 'All Orders', manage the order, type revision requests, or click 'Approve Proof' to launch printing lines."
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
            title="View Demo Instructions"
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
          <span>© 2026 ARSTA Print & Design Ltd. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Environmental Impact Statement</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
