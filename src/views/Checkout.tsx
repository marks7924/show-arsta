import React, { useState } from 'react';
import { db } from '../db';
import type { ProductType, Order } from '../types';

interface CheckoutProps {
  setView: (view: string) => void;
  cart: {
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
  } | null;
  clearCart: () => void;
  activeRole: string;
  setRole: (role: any) => void;
  t: (key: string) => string;
}

export const Checkout: React.FC<CheckoutProps> = ({
  setView,
  cart,
  clearCart,
  activeRole,
  setRole,
  t
}) => {
  const [shippingName, setShippingName] = useState<string>('Alex Rivers');
  const [shippingEmail, setShippingEmail] = useState<string>('alex@designstudio.io');
  const [shippingAddress, setShippingAddress] = useState<string>('42 Creative Way, London, UK');
  
  // Card Inputs
  const [cardNumber, setCardNumber] = useState<string>('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvv, setCardCvv] = useState<string>('385');
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');

  if (!cart && !orderConfirmed) {
    return (
      <div className="section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="glass-panel" style={{ padding: '48px', maxWidth: '400px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', color: 'var(--color-text-muted)', marginBottom: '24px' }}>🛒</div>
          <h2 className="serif-font" style={{ fontSize: '1.8rem', marginBottom: '16px' }}>{t('cart')}</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
            {t('navHome') === 'الرئيسية' ? 'سلتك فارغة حالياً. يرجى اختيار منتج من الخدمات وتهيئة مواصفاته.' : 'Your cart is currently empty. Choose a product and configure its specs.'}
          </p>
          <button className="btn btn-primary" onClick={() => setView('services')}>
            {t('navServices')}
          </button>
        </div>
      </div>
    );
  }

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart) return;

    if (!shippingName || !shippingEmail || !shippingAddress) {
      alert(t('navHome') === 'الرئيسية' ? 'يرجى تعبئة كافة الحقول المطلوبة.' : 'Please fill out all required shipping and contact information.');
      return;
    }

    if (activeRole === 'guest') {
      setRole('customer');
    }

    const orderId = `ord-${1000 + Math.floor(Math.random() * 9000)}`;
    const newOrder: Order = {
      id: orderId,
      userId: 'user-current',
      userName: shippingName,
      userEmail: shippingEmail,
      productType: cart.productType,
      productName: cart.productName,
      quantity: cart.quantity,
      material: cart.material,
      finish: cart.finish,
      color: cart.color,
      price: cart.price,
      artworkType: cart.artworkType,
      artworkUrl: cart.artworkUrl,
      canvasState: cart.canvasState,
      status: 'pending',
      date: new Date().toLocaleDateString()
    };

    db.saveOrder(newOrder);
    setConfirmedOrderId(orderId);
    setOrderConfirmed(true);
    clearCart();
  };

  if (orderConfirmed) {
    return (
      <div className="section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="glass-panel" style={{ padding: '48px', maxWidth: '500px', textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', color: 'var(--color-secondary)', marginBottom: '24px' }}>✓</div>
          <h2 className="serif-font" style={{ fontSize: '2.2rem', marginBottom: '16px' }}>{t('paymentApproved')}</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '12px' }}>
            {t('paymentApprovedDesc')} <strong>#{confirmedOrderId}</strong>.
          </p>
          <p style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600, background: 'rgba(255, 45, 85, 0.1)', padding: '8px', borderRadius: '4px', marginBottom: '32px' }}>
            {t('reviewNotice')}
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button 
              className="btn btn-primary" 
              style={{ flex: 1 }}
              onClick={() => {
                setOrderConfirmed(false);
                setView('customer-dashboard');
              }}
            >
              {t('trackOrderProgress')}
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setOrderConfirmed(false);
                setView('home');
              }}
            >
              {t('backHome')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'start' }}>
      {/* Shipping details and Cart items column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <h1 className="serif-font" style={{ fontSize: '2.5rem' }}>{t('checkoutSummary')}</h1>

        {/* Selected Product Specifications card */}
        {cart && (
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{
              width: '100px', height: '100px', borderRadius: '8px',
              background: 'radial-gradient(circle, #1a1a24 0%, #0d0d12 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)'
            }}>
              <span style={{ fontSize: '2rem' }}>
                {cart.productType === 'tshirt' ? '👕' : (cart.productType === 'mug' ? '☕' : (cart.productType === 'sticker' ? '✨' : (cart.productType === 'business_card' ? '📇' : '📦')))}
              </span>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <h3 className="serif-font">{cart.productName}</h3>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-secondary)' }}>${cart.price.toLocaleString()}</strong>
              </div>
              
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.85rem',
                color: 'var(--color-text-secondary)', marginTop: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '12px'
              }}>
                <div>{t('color')} <span style={{ color: '#FFF', fontWeight: 600 }}>{cart.color}</span></div>
                <div>{t('quantity')}: <span style={{ color: '#FFF', fontWeight: 600 }}>{cart.quantity}</span></div>
                <div>{t('material')} <span style={{ color: '#FFF', fontWeight: 600 }}>{cart.material}</span></div>
                <div>{t('finish')} <span style={{ color: '#FFF', fontWeight: 600 }}>{cart.finish}</span></div>
                <div>{t('artwork')} <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{cart.artworkType === 'studio' ? 'Designed in Studio' : 'Uploaded file'}</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Shipping details Form */}
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 className="serif-font" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>{t('shippingAddressTitle')}</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{t('contactName')}</label>
            <input 
              type="text" 
              value={shippingName} 
              onChange={(e) => setShippingName(e.target.value)}
              style={{
                background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{t('contactEmail')}</label>
            <input 
              type="email" 
              value={shippingEmail} 
              onChange={(e) => setShippingEmail(e.target.value)}
              style={{
                background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{t('destinationAddress')}</label>
            <input 
              type="text" 
              value={shippingAddress} 
              onChange={(e) => setShippingAddress(e.target.value)}
              style={{
                background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Credit Card / Payment Simulation column */}
      {cart && (
        <form onSubmit={handlePay} className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 className="serif-font" style={{ fontSize: '1.6rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
            {t('secureCheckout')}
          </h3>

          {/* Credit Card Mockup Panel */}
          <div style={{
            background: 'linear-gradient(135deg, #1C0F35 0%, #0F092B 100%)',
            border: '1.5px solid rgba(94, 92, 230, 0.4)',
            borderRadius: '16px',
            padding: '24px',
            color: '#FFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '170px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Glowing accents */}
            <div style={{
              position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px',
              borderRadius: '50%', background: 'var(--color-primary-glow)', filter: 'blur(30px)', pointerEvents: 'none'
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.6)' }}>ARSTA PRINT CARD</span>
              <span style={{ fontSize: '1.4rem' }}>💳</span>
            </div>

            <div style={{ fontSize: '1.3rem', letterSpacing: '0.15em', fontFamily: 'monospace', margin: '14px 0 0' }}>
              {cardNumber || '•••• •••• •••• ••••'}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{t('navHome') === 'الرئيسية' ? 'صاحب البطاقة' : 'Cardholder'}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{shippingName || 'Cardholder Name'}</div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{t('navHome') === 'الرئيسية' ? 'الانتهاء' : 'Expires'}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{cardExpiry || 'MM/YY'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{t('cvv')}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{cardCvv || '•••'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Real Input form fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{t('cardNumber')}</label>
            <input 
              type="text" 
              value={cardNumber} 
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="4111 2222 3333 4444"
              style={{
                background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{t('expirationDate')}</label>
              <input 
                type="text" 
                value={cardExpiry} 
                onChange={(e) => setCardExpiry(e.target.value)}
                placeholder="MM/YY"
                style={{
                  background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                  color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none'
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{t('cvv')}</label>
              <input 
                type="text" 
                value={cardCvv} 
                onChange={(e) => setCardCvv(e.target.value)}
                placeholder="385"
                style={{
                  background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                  color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Pricing summary */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              <span>{t('subtotal')}</span>
              <span>${cart.price.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              <span>{t('navHome') === 'الرئيسية' ? 'الشحن والمراجعة الفنية' : 'Shipping & Preflight Review'}:</span>
              <span style={{ color: 'var(--color-secondary)' }}>{t('free')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '12px', fontSize: '1.2rem', fontWeight: 700 }}>
              <span>{t('finalCost')}:</span>
              <span style={{ color: 'var(--color-secondary)' }}>${cart.price.toLocaleString()}</span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '12px' }}>
            {t('simulatePayment')} ${cart.price.toLocaleString()}
          </button>
        </form>
      )}
    </div>
  );
};
