import React, { useState } from 'react';
import { db } from '../db';
import type { SavedDesign } from '../db';
import type { Order, OrderStatus } from '../types';

interface CustomerDashboardProps {
  setView: (view: string) => void;
  setSelectedProductType: (type: any) => void;
  loadCartDirectly: (item: any) => void;
  t: (key: string) => string;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  setView,
  setSelectedProductType,
  loadCartDirectly,
  t
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'designs'>('orders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [revisionFeedback, setRevisionFeedback] = useState<string>('');
  const [showRevisionInput, setShowRevisionInput] = useState<boolean>(false);

  // Fetch data
  const orders = db.getOrders('user-current');
  const savedDesigns = db.getSavedDesigns();

  // Timeline definition
  const timelineSteps: { key: OrderStatus; label: string; icon: string }[] = [
    { key: 'pending', label: t('navHome') === 'الرئيسية' ? 'قيد المراجعة' : 'Pending', icon: '📝' },
    { key: 'in_design', label: t('navHome') === 'الرئيسية' ? 'تحت التعديل' : 'In Design', icon: '🎨' },
    { key: 'approved', label: t('navHome') === 'الرئيسية' ? 'معتمد' : 'Approved', icon: '✓' },
    { key: 'printing', label: t('navHome') === 'الرئيسية' ? 'جارٍ الطباعة' : 'Printing', icon: '🖨️' },
    { key: 'packaging', label: t('navHome') === 'الرئيسية' ? 'التعبئة والتغليف' : 'Packaging', icon: '📦' },
    { key: 'shipped', label: t('navHome') === 'الرئيسية' ? 'تم الشحن' : 'Shipped', icon: '🚚' },
    { key: 'delivered', label: t('navHome') === 'الرئيسية' ? 'تم التسليم' : 'Delivered', icon: '🏠' }
  ];

  const getStepProgressIndex = (status: OrderStatus) => {
    return timelineSteps.findIndex(step => step.key === status);
  };

  const handleApproveProof = (orderId: string) => {
    db.updateOrderStatus(orderId, 'approved');
    const updated = db.getOrders('user-current').find(o => o.id === orderId)!;
    setSelectedOrder(updated);
    alert(t('proofApprovedSuccess'));
  };

  const handleRequestRevision = (orderId: string) => {
    if (!revisionFeedback.trim()) {
      alert(t('explainRevisionPlaceholder'));
      return;
    }
    db.updateOrderStatus(orderId, 'in_design', `Customer feedback: "${revisionFeedback}"`);
    const updated = db.getOrders('user-current').find(o => o.id === orderId)!;
    setSelectedOrder(updated);
    setRevisionFeedback('');
    setShowRevisionInput(false);
    alert(t('revisionSubmittedSuccess'));
  };

  const triggerReorder = (order: Order) => {
    loadCartDirectly({
      productType: order.productType,
      productName: order.productName,
      quantity: order.quantity,
      material: order.material,
      finish: order.finish,
      color: order.color,
      price: order.price,
      artworkType: order.artworkType,
      artworkUrl: order.artworkUrl,
      canvasState: order.canvasState
    });
    setView('checkout');
  };

  const loadSavedDesignToEditor = (design: SavedDesign) => {
    setSelectedProductType(design.productType);
    localStorage.setItem('show_arsta_active_editor_load', JSON.stringify(design.canvasState));
    setView('studio');
  };

  const deleteSavedDesign = (id: string) => {
    db.deleteDesign(id);
    alert(t('navHome') === 'الرئيسية' ? 'تم حذف التصميم بنجاح.' : 'Design deleted successfully.');
  };

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <div className="dashboard-sidebar">
        <div style={{ padding: '0 16px 20px', borderBottom: '1px solid var(--border-color)', marginBottom: '20px' }}>
          <h3 className="serif-font" style={{ fontSize: '1.2rem' }}>{t('navDashboard')}</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>alex@designstudio.io</span>
        </div>
        <div 
          onClick={() => setActiveTab('orders')}
          className={`dashboard-link ${activeTab === 'orders' ? 'active' : ''}`}
        >
          <span>🛒</span> {t('orderHistory')}
        </div>
        <div 
          onClick={() => setActiveTab('designs')}
          className={`dashboard-link ${activeTab === 'designs' ? 'active' : ''}`}
        >
          <span>🎨</span> {t('savedDesigns')}
        </div>
        <div 
          onClick={() => setView('services')}
          className="dashboard-link"
          style={{ marginTop: '20px', color: 'var(--color-secondary)' }}
        >
          <span>＋</span> {t('navHome') === 'الرئيسية' ? 'طلب طباعة جديد' : 'New Print Job'}
        </div>
      </div>

      {/* WORKSPACE */}
      <div className="dashboard-content">
        {activeTab === 'orders' ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 className="serif-font" style={{ fontSize: '2.2rem' }}>{t('orderHistory')}</h2>
              <span className="badge badge-approved">{orders.length} {t('cartCount') !== '0' ? t('navHome') === 'الرئيسية' ? 'طلبات نشطة' : 'Active Orders' : ''}</span>
            </div>

            <div className="custom-table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>{t('orderRef')}</th>
                    <th>{t('datePlaced')}</th>
                    <th>{t('productItem')}</th>
                    <th>{t('qtyConfig')}</th>
                    <th>{t('finalCost')}</th>
                    <th>{t('productionStatus')}</th>
                    <th>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: 700, color: 'var(--color-secondary)' }}>#{order.id}</td>
                      <td>{order.date}</td>
                      <td>{order.productName}</td>
                      <td>{order.quantity} units</td>
                      <td style={{ fontWeight: 600 }}>{order.price.toLocaleString()} {t('currency')}</td>
                      <td>
                        <span className={`badge badge-${order.status.replace('_', '')}`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                            onClick={() => setSelectedOrder(order)}
                          >
                            {t('detailsAction')}
                          </button>
                          <button 
                            className="btn btn-primary" 
                            style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'var(--color-secondary)', color: '#000' }}
                            onClick={() => triggerReorder(order)}
                          >
                            {t('reorder')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 className="serif-font" style={{ fontSize: '2.2rem' }}>{t('savedDesigns')}</h2>
              <span className="badge badge-indesign">{savedDesigns.length} {t('navHome') === 'الرئيسية' ? 'محفوظة' : 'saved'}</span>
            </div>

            {savedDesigns.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>{t('noSavedDesigns')}</p>
                <button className="btn btn-primary" onClick={() => setView('studio')}>{t('openStudio')}</button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {savedDesigns.map((design) => (
                  <div key={design.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '240px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span className="badge badge-printing" style={{ fontSize: '0.65rem' }}>{design.productType}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{design.date}</span>
                      </div>
                      <h4 className="serif-font" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{design.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                        {t('navHome') === 'الرئيسية' ? `يحتوي القالب على ${design.canvasState.elements.length} عناصر.` : `Custom canvas layout containing ${design.canvasState.elements.length} components.`}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '16px' }}>
                      <button 
                        className="btn btn-primary" 
                        style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }}
                        onClick={() => loadSavedDesignToEditor(design)}
                      >
                        {t('openStudio')}
                      </button>
                      <button 
                        className="btn btn-danger" 
                        style={{ padding: '8px', fontSize: '0.8rem' }}
                        onClick={() => deleteSavedDesign(design.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* DETAILED ORDER POPUP MODAL (Timeline and Revisions) */}
      {selectedOrder && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            width: '100%', maxWidth: '850px', background: '#111116',
            borderRadius: '16px', display: 'flex', flexDirection: 'column',
            maxHeight: '90vh', overflowY: 'auto'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '24px 32px', borderBottom: '1px solid var(--border-color)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div>
                <span className="badge badge-printing" style={{ marginBottom: '4px' }}>{t('detailsAction')}</span>
                <h3 className="serif-font" style={{ fontSize: '1.8rem' }}>{t('orderRef')} #{selectedOrder.id}</h3>
              </div>
              <button 
                className="btn btn-secondary" 
                style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}
                onClick={() => {
                  setSelectedOrder(null);
                  setShowRevisionInput(false);
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '32px' }}>
              
              {/* TIMELINE PROGRESS SYSTEM */}
              <div style={{ marginBottom: '40px' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px' }}>
                  {t('timelineTitle')}
                </h4>
                
                <div className="timeline">
                  {/* Progress Line */}
                  <div 
                    className="timeline-progress" 
                    style={{
                      width: `${(getStepProgressIndex(selectedOrder.status) / (timelineSteps.length - 1)) * 100}%`
                    }}
                  />
                  
                  {timelineSteps.map((step, index) => {
                    const orderIndex = getStepProgressIndex(selectedOrder.status);
                    const isCompleted = index < orderIndex;
                    const isActive = index === orderIndex;
                    
                    return (
                      <div 
                        key={step.key} 
                        className={`timeline-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                      >
                        <div className="timeline-icon" style={{ fontSize: '1.1rem' }}>
                          {isCompleted ? '✓' : step.icon}
                        </div>
                        <span className="timeline-label">{step.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SPEC DETAILS & PROOF REVIEW RULE */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                {/* Product Specifications */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                    {t('specificationsTitle')}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{t('productItem')}:</span>
                      <strong>{selectedOrder.productName}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{t('qtyConfig')}:</span>
                      <strong>{selectedOrder.quantity}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{t('finish')}:</span>
                      <strong>{selectedOrder.finish}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{t('material')}:</span>
                      <strong>{selectedOrder.material}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{t('color')}</span>
                      <strong style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: selectedOrder.color, border: '1px solid #777' }} />
                        {selectedOrder.color}
                      </strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: '10px' }}>
                      <span style={{ fontWeight: 700 }}>{t('finalCost')}:</span>
                      <strong style={{ color: 'var(--color-secondary)', fontSize: '1.25rem' }}>{selectedOrder.price.toLocaleString()} {t('currency')}</strong>
                    </div>
                  </div>
                </div>

                {/* Designer Proofing Segment */}
                <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                    {t('proofingTitle')}
                  </h4>

                  {selectedOrder.status === 'pending' && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      {t('proofingDescQueue')}
                    </div>
                  )}

                  {selectedOrder.status === 'in_design' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                        {t('proofingDescProof')}
                      </div>
                      
                      {/* Revision Logs */}
                      {selectedOrder.revisions && selectedOrder.revisions.length > 0 && (
                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '6px', fontSize: '0.75rem' }}>
                          <strong>{t('revisionHistoryTitle')}</strong>
                          <ul style={{ paddingLeft: '16px', marginTop: '4px', color: 'var(--color-text-muted)' }}>
                            {selectedOrder.revisions.map((rev, i) => <li key={i}>{rev}</li>)}
                          </ul>
                        </div>
                      )}

                      {!showRevisionInput ? (
                        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                          <button className="btn btn-primary" style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem' }} onClick={() => handleApproveProof(selectedOrder.id)}>
                            {t('approveProofBtn')}
                          </button>
                          <button className="btn btn-secondary" style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem' }} onClick={() => setShowRevisionInput(true)}>
                            {t('requestRevisionBtn')}
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                          <textarea
                            rows={2}
                            value={revisionFeedback}
                            onChange={(e) => setRevisionFeedback(e.target.value)}
                            placeholder={t('explainRevisionPlaceholder')}
                            style={{
                              background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                              color: '#FFF', padding: '8px', borderRadius: '6px', fontSize: '0.8rem', resize: 'vertical'
                            }}
                          />
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-primary" style={{ flex: 1, padding: '6px', fontSize: '0.8rem' }} onClick={() => handleRequestRevision(selectedOrder.id)}>
                              {t('submitFeedback')}
                            </button>
                            <button className="btn btn-secondary" style={{ padding: '6px', fontSize: '0.8rem' }} onClick={() => setShowRevisionInput(false)}>
                              {t('cancel')}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedOrder.status !== 'pending' && selectedOrder.status !== 'in_design' && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      {t('printReleaseSuccess')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
