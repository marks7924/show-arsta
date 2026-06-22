import React, { useState, useEffect } from 'react';
import { db } from '../db';
import { getLocalizedProduct } from '../translations';
import type { Order, DesignRequest, PortfolioProject, OrderStatus, Product, ProductType } from '../types';

interface AdminDashboardProps {
  t: (key: string) => string;
  lang: 'ar' | 'en';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ t, lang }) => {
  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'briefs' | 'catalog' | 'portfolio'>('orders');
  
  // Data lists
  const [orders, setOrders] = useState<Order[]>(() => db.getAllOrders());
  const [briefs, setBriefs] = useState<DesignRequest[]>(() => db.getDesignRequests());
  const [localCatalog, setLocalCatalog] = useState<Product[]>(() => db.getProducts());
  
  // Modals & workflows
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedBrief, setSelectedBrief] = useState<DesignRequest | null>(null);
  
  // Revision and proofs workflow
  const [revisionNote, setRevisionNote] = useState<string>('');
  const [proofUrl, setProofUrl] = useState<string>('https://images.unsplash.com/photo-1523381210434-271e8be1f52b'); 
  
  // Order full edit sub-form state
  const [isEditingOrderDetails, setIsEditingOrderDetails] = useState<boolean>(false);
  const [editOrderName, setEditOrderName] = useState<string>('');
  const [editOrderEmail, setEditOrderEmail] = useState<string>('');
  const [editOrderPrice, setEditOrderPrice] = useState<number>(0);
  const [editOrderQuantity, setEditOrderQuantity] = useState<number>(0);
  const [editOrderMaterial, setEditOrderMaterial] = useState<string>('');
  const [editOrderFinish, setEditOrderFinish] = useState<string>('');
  const [editOrderColor, setEditOrderColor] = useState<string>('');

  // Catalog product CRUD form states
  const [showProductForm, setShowProductForm] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [prodType, setProdType] = useState<ProductType>('tshirt');
  const [prodNameAr, setProdNameAr] = useState<string>('');
  const [prodNameEn, setProdNameEn] = useState<string>('');
  const [prodDescAr, setProdDescAr] = useState<string>('');
  const [prodDescEn, setProdDescEn] = useState<string>('');
  const [prodBasePrice, setProdBasePrice] = useState<number>(0);
  const [prodColors, setProdColors] = useState<string>('');
  const [prodMaterials, setProdMaterials] = useState<string>('');
  const [prodFinishes, setProdFinishes] = useState<string>('');

  // Portfolio case study creation form state
  const [newProjTitle, setNewProjTitle] = useState<string>('');
  const [newProjCategory, setNewProjCategory] = useState<string>('');
  const [newProjClient, setNewProjClient] = useState<string>('');
  const [newProjBrief, setNewProjBrief] = useState<string>('');
  const [newProjProcess, setNewProjProcess] = useState<string>('');

  // Hook to pre-fill order edit fields when a selectedOrder is opened
  useEffect(() => {
    if (selectedOrder) {
      setEditOrderName(selectedOrder.userName);
      setEditOrderEmail(selectedOrder.userEmail);
      setEditOrderPrice(selectedOrder.price);
      setEditOrderQuantity(selectedOrder.quantity);
      setEditOrderMaterial(selectedOrder.material);
      setEditOrderFinish(selectedOrder.finish);
      setEditOrderColor(selectedOrder.color);
      setIsEditingOrderDetails(false);
    }
  }, [selectedOrder]);

  const refreshData = () => {
    setOrders(db.getAllOrders());
    setBriefs(db.getDesignRequests());
    setLocalCatalog(db.getProducts());
  };

  // ------------------------------
  // ORDER WORKFLOW ACTIONS
  // ------------------------------
  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    db.updateOrderStatus(orderId, status);
    refreshData();
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleSendRevisionNote = (orderId: string) => {
    if (!revisionNote.trim()) {
      alert(lang === 'ar' ? 'يرجى كتابة ملاحظات التعديل أولاً.' : 'Please write revision suggestions for the customer.');
      return;
    }
    db.updateOrderStatus(orderId, 'in_design', `Designer note: "${revisionNote}"`);
    refreshData();
    setRevisionNote('');
    setSelectedOrder(null);
    alert(lang === 'ar' ? 'تم إرسال طلب التعديل إلى لوحة تحكم العميل.' : 'Revision request sent to the customer dashboard.');
  };

  const handleSaveOrderDetails = () => {
    if (!selectedOrder) return;
    
    db.updateOrderDetails(selectedOrder.id, {
      userName: editOrderName,
      userEmail: editOrderEmail,
      price: Number(editOrderPrice) || 0,
      quantity: Number(editOrderQuantity) || 1,
      material: editOrderMaterial,
      finish: editOrderFinish,
      color: editOrderColor
    });

    const updated = db.getAllOrders();
    setOrders(updated);
    setSelectedOrder(updated.find(o => o.id === selectedOrder.id) || null);
    setIsEditingOrderDetails(false);
    alert(lang === 'ar' ? 'تم تحديث تفاصيل ومواصفات الطلب بنجاح.' : 'Order specifications modified successfully.');
  };

  // ------------------------------
  // DESIGN BRIEF ACTIONS
  // ------------------------------
  const handleSendProof = (briefId: string) => {
    db.updateRequestStatus(briefId, 'in_design', 'Designer has uploaded a mockup draft proof for review. Please approve or comment.', proofUrl);
    refreshData();
    setSelectedBrief(null);
    alert(lang === 'ar' ? 'تم رفع نموذج التصميم الأولي. سيظهر للعميل في لوحة التحكم لمراجعته.' : 'Mockup proof uploaded. The customer will find it on their dashboard tracking.');
  };

  // ------------------------------
  // CATALOG PRODUCT CRUD ACTIONS
  // ------------------------------
  const openAddProduct = () => {
    setEditingProduct(null);
    setProdType('tshirt');
    setProdNameAr('');
    setProdNameEn('');
    setProdDescAr('');
    setProdDescEn('');
    setProdBasePrice(15.00);
    setProdColors('#FFFFFF, #0A0A0A, #AF52DE');
    setProdMaterials('Organic Cotton:1.0, Heavy Canvas:1.3');
    setProdFinishes('Standard Print:0.0, Premium Foil:3.5');
    setShowProductForm(true);
  };

  const openEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProdType(prod.type);
    
    // Split name 'Ar | En' if exists
    const nameParts = prod.name.split('|');
    setProdNameAr(nameParts[0]?.trim() || prod.name);
    setProdNameEn(nameParts[1]?.trim() || prod.name);

    const descParts = prod.description.split('|');
    setProdDescAr(descParts[0]?.trim() || prod.description);
    setProdDescEn(descParts[1]?.trim() || prod.description);

    setProdBasePrice(prod.basePrice);
    setProdColors(prod.colors.join(', '));
    setProdMaterials(prod.materials.map(m => `${m.name}:${m.multiplier}`).join(', '));
    setProdFinishes(prod.finishes.map(f => `${f.name}:${f.addedCost}`).join(', '));
    setShowProductForm(true);
  };

  const handleDeleteProduct = (prodId: string) => {
    const confirmMsg = lang === 'ar' 
      ? 'هل أنت متأكد من رغبتك في حذف هذا المنتج نهائياً من الكتالوج والتسعير؟' 
      : 'Are you sure you want to permanently delete this product from the catalog?';
    
    if (window.confirm(confirmMsg)) {
      db.deleteProduct(prodId);
      refreshData();
      alert(lang === 'ar' ? 'تم حذف المنتج من الكتالوج.' : 'Product deleted successfully.');
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodNameAr.trim() || !prodNameEn.trim() || !prodDescAr.trim() || !prodDescEn.trim()) {
      alert(lang === 'ar' ? 'يرجى إدخال اسم ووصف المنتج باللغتين.' : 'Please enter the name and description in both languages.');
      return;
    }

    const finalName = `${prodNameAr.trim()} | ${prodNameEn.trim()}`;
    const finalDesc = `${prodDescAr.trim()} | ${prodDescEn.trim()}`;
    const colorsList = prodColors.split(',').map(c => c.trim()).filter(c => c);
    
    const materialsList = prodMaterials.split(',').map(m => {
      const parts = m.split(':');
      const name = parts[0]?.trim() || 'Standard';
      const multiplier = parseFloat(parts[1]?.trim()) || 1.0;
      return { name, multiplier };
    }).filter(m => m.name);

    const finishesList = prodFinishes.split(',').map(f => {
      const parts = f.split(':');
      const name = parts[0]?.trim() || 'Standard';
      const addedCost = parseFloat(parts[1]?.trim()) || 0.0;
      return { name, addedCost };
    }).filter(f => f.name);

    const DEFAULT_MOCKUPS: Record<ProductType, string> = {
      tshirt: 'tshirt',
      mug: 'mug',
      sticker: 'sticker',
      business_card: 'business_card',
      packaging: 'packaging',
    };

    const DEFAULT_SAFE_AREAS: Record<ProductType, { x: number; y: number; width: number; height: number }> = {
      tshirt: { x: 22, y: 20, width: 56, height: 60 },
      mug: { x: 15, y: 15, width: 70, height: 70 },
      sticker: { x: 10, y: 10, width: 80, height: 80 },
      business_card: { x: 5, y: 5, width: 90, height: 90 },
      packaging: { x: 20, y: 20, width: 60, height: 60 },
    };

    const targetProduct: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      type: prodType,
      name: finalName,
      description: finalDesc,
      basePrice: Number(prodBasePrice) || 0.0,
      colors: colorsList.length > 0 ? colorsList : ['#FFFFFF'],
      materials: materialsList.length > 0 ? materialsList : [{ name: 'Standard Cotton', multiplier: 1.0 }],
      finishes: finishesList.length > 0 ? finishesList : [{ name: 'Standard Print', addedCost: 0.0 }],
      mockupUrl: editingProduct ? editingProduct.mockupUrl : DEFAULT_MOCKUPS[prodType],
      safeAreaRatio: editingProduct ? editingProduct.safeAreaRatio : DEFAULT_SAFE_AREAS[prodType]
    };

    db.saveProduct(targetProduct);
    refreshData();
    setShowProductForm(false);
    setEditingProduct(null);
    alert(lang === 'ar' ? 'تم حفظ مواصفات المنتج بنجاح.' : 'Product specifications saved successfully.');
  };

  // ------------------------------
  // PORTFOLIO ACTIONS
  // ------------------------------
  const handleAddPortfolioProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle || !newProjCategory || !newProjClient || !newProjBrief || !newProjProcess) {
      alert(lang === 'ar' ? 'يرجى تعبئة كافة الحقول لحفظ دراسة الحالة.' : 'Please fill out all required fields.');
      return;
    }

    const newProject: PortfolioProject = {
      id: `proj-custom-${Date.now()}`,
      title: newProjTitle,
      category: newProjCategory,
      client: newProjClient,
      brief: newProjBrief,
      process: newProjProcess,
      beforeImage: 'sketch-custom',
      afterImage: 'render-custom',
      realWorldImage: 'real-custom'
    };

    db.savePortfolioProject(newProject);
    setNewProjTitle('');
    setNewProjCategory('');
    setNewProjClient('');
    setNewProjBrief('');
    setNewProjProcess('');
    alert(lang === 'ar' ? 'تم نشر دراسة الحالة للجمهور بنجاح.' : 'New portfolio project uploaded and released to public portfolio pages!');
  };

  return (
    <div className="dashboard-layout" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
      {/* SIDEBAR */}
      <div className="dashboard-sidebar" style={{ background: '#14141d', borderLeft: lang === 'ar' ? '1px solid var(--border-color)' : 'none', borderRight: lang === 'en' ? '1px solid var(--border-color)' : 'none' }}>
        <div style={{ padding: '0 16px 20px', borderBottom: '1px solid var(--border-color)', marginBottom: '20px' }}>
          <h3 className="serif-font" style={{ fontSize: '1.25rem', color: 'var(--color-secondary)', margin: 0 }}>{t('adminConsole')}</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            {lang === 'ar' ? 'مدير عام خطوط الإنتاج والكتالوج' : 'Lead Production & Catalog Administrator'}
          </span>
        </div>
        <div onClick={() => setActiveSubTab('orders')} className={`dashboard-link ${activeSubTab === 'orders' ? 'active' : ''}`}>
          <span>📋</span> {t('allOrdersTab')} ({orders.length})
        </div>
        <div onClick={() => setActiveSubTab('briefs')} className={`dashboard-link ${activeSubTab === 'briefs' ? 'active' : ''}`}>
          <span>✍</span> {t('designBriefsTab')} ({briefs.length})
        </div>
        <div onClick={() => { setActiveSubTab('catalog'); setShowProductForm(false); }} className={`dashboard-link ${activeSubTab === 'catalog' ? 'active' : ''}`}>
          <span>🏷️</span> {t('catalogRulesTab')}
        </div>
        <div onClick={() => setActiveSubTab('portfolio')} className={`dashboard-link ${activeSubTab === 'portfolio' ? 'active' : ''}`}>
          <span>🖼️</span> {t('addCaseStudyTab')}
        </div>
      </div>

      {/* CONTENT */}
      <div className="dashboard-content" style={{ background: '#09090d', textAlign: lang === 'ar' ? 'right' : 'left' }}>
        
        {/* ORDERS TAB */}
        {activeSubTab === 'orders' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <h2 className="serif-font" style={{ fontSize: '2rem', margin: 0 }}>{t('ordersConsoleTitle')}</h2>
              <button className="btn btn-secondary" onClick={refreshData}>{t('refreshList')}</button>
            </div>

            <div className="custom-table-container">
              <table className="custom-table" style={{ width: '100%', textAlign: lang === 'ar' ? 'right' : 'left' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{t('refId')}</th>
                    <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{t('clientName')}</th>
                    <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{t('productItem')}</th>
                    <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{t('finishingSpecs')}</th>
                    <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{t('finalCost')}</th>
                    <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{t('status')}</th>
                    <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: 700 }}>#{order.id}</td>
                      <td>{order.userName}</td>
                      <td>
                        {lang === 'ar' 
                          ? (order.productType === 'tshirt' ? 'تيشيرت' : order.productType === 'mug' ? 'كوب سيراميك' : order.productType === 'sticker' ? 'ملصقات فينيل' : order.productType === 'business_card' ? 'بطاقة عمل كتان' : 'صندوق شحن كرافت') 
                          : order.productName}
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                        {order.material} / {order.finish}
                      </td>
                      <td style={{ fontWeight: 600 }}>{order.price.toLocaleString()} {t('currency')}</td>
                      <td>
                        <span className={`badge badge-${order.status.replace('_', '')}`}>
                          {lang === 'ar' 
                            ? (order.status === 'pending' ? 'قيد المراجعة' : order.status === 'in_design' ? 'تحت التعديل' : order.status === 'approved' ? 'تم الاعتماد' : order.status === 'printing' ? 'طباعة' : order.status === 'packaging' ? 'تغليف' : order.status === 'shipped' ? 'تم الشحن' : 'تم التسليم') 
                            : order.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                          onClick={() => setSelectedOrder(order)}
                        >
                          {t('manageWorkflow')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BRIEFS TAB */}
        {activeSubTab === 'briefs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 className="serif-font" style={{ fontSize: '2rem', margin: 0 }}>{t('intakeBriefsTitle')}</h2>
              <span className="badge badge-indesign">{briefs.length} {lang === 'ar' ? 'طلب فني' : 'Brief Tiers'}</span>
            </div>

            {briefs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
                <p style={{ color: 'var(--color-text-secondary)' }}>{t('noBriefs')}</p>
              </div>
            ) : (
              <div className="custom-table-container">
                <table className="custom-table" style={{ width: '100%', textAlign: lang === 'ar' ? 'right' : 'left' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{t('refId')}</th>
                      <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{t('clientName')}</th>
                      <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{t('productItem')}</th>
                      <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{t('budgetRange')}</th>
                      <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{t('urgency')}</th>
                      <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{t('status')}</th>
                      <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {briefs.map((brief) => (
                      <tr key={brief.id}>
                        <td style={{ fontWeight: 700 }}>#{brief.id}</td>
                        <td>{brief.userName}</td>
                        <td style={{ textTransform: 'capitalize' }}>
                          {lang === 'ar' 
                            ? (brief.productType === 'tshirt' ? 'تيشيرت' : brief.productType === 'mug' ? 'كوب سيراميك' : brief.productType === 'sticker' ? 'ملصقات فينيل' : brief.productType === 'business_card' ? 'بطاقة عمل كتان' : 'صندوق شحن كرافت') 
                            : brief.productType}
                        </td>
                        <td>{brief.budgetRange}</td>
                        <td>
                          <span className={`badge ${brief.urgency === 'express' ? 'badge-pending' : 'badge-approved'}`}>
                            {brief.urgency}
                          </span>
                        </td>
                        <td>
                          <span className={`badge badge-indesign`}>
                            {brief.status}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-primary" 
                            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                            onClick={() => setSelectedBrief(brief)}
                          >
                            {t('briefEvaluation')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* CATALOG RULES TAB */}
        {activeSubTab === 'catalog' && (
          <div>
            {!showProductForm ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h2 className="serif-font" style={{ fontSize: '2rem', margin: '0 0 8px 0' }}>{t('catalogTitle')}</h2>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', fontSize: '0.9rem', margin: 0 }}>
                      {t('catalogDesc')}
                    </p>
                  </div>
                  <button className="btn btn-primary" onClick={openAddProduct}>
                    ➕ {t('addProductBtn')}
                  </button>
                </div>

                <div className="custom-table-container">
                  <table className="custom-table" style={{ width: '100%', textAlign: lang === 'ar' ? 'right' : 'left' }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{lang === 'ar' ? 'اسم المنتج' : 'Product Name'}</th>
                        <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{lang === 'ar' ? 'النوع' : 'Category'}</th>
                        <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{lang === 'ar' ? 'السعر الأساسي' : 'Base Price'}</th>
                        <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{lang === 'ar' ? 'الخامات المتاحة' : 'Materials'}</th>
                        <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{lang === 'ar' ? 'التشطيبات المتاحة' : 'Finishes'}</th>
                        <th style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>{t('actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {localCatalog.map((prod) => {
                        const localized = getLocalizedProduct(prod, lang);
                        return (
                          <tr key={prod.id}>
                            <td style={{ fontWeight: 600 }}>{localized.name}</td>
                            <td style={{ textTransform: 'capitalize' }}>{prod.type}</td>
                            <td style={{ color: 'var(--color-secondary)', fontWeight: 'bold' }}>{prod.basePrice} {t('currency')}</td>
                            <td>
                              <span style={{ fontSize: '0.8rem' }}>
                                {localized.materials.map(m => m.name).join(', ')}
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: '0.8rem' }}>
                                {localized.finishes.map(f => f.name).join(', ')}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button 
                                  className="btn btn-secondary" 
                                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                                  onClick={() => openEditProduct(prod)}
                                >
                                  ✏️ {t('edit')}
                                </button>
                                <button 
                                  className="btn btn-primary" 
                                  style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#e03e3e', border: 'none' }}
                                  onClick={() => handleDeleteProduct(prod.id)}
                                >
                                  🗑️ {t('delete')}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              // Add/Edit Catalog Product Form
              <div style={{ maxWidth: '750px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 className="serif-font" style={{ fontSize: '1.8rem', margin: 0 }}>
                    {editingProduct ? t('editProductBtn') : t('addProductBtn')}
                  </h3>
                  <button className="btn btn-secondary" onClick={() => setShowProductForm(false)}>
                    {lang === 'ar' ? 'رجوع للقائمة ✕' : 'Back to Catalog ✕'}
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Category Selection */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('productCategory')}</label>
                    <select
                      value={prodType}
                      onChange={(e) => setProdType(e.target.value as ProductType)}
                      style={{
                        background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                        color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none', cursor: 'pointer'
                      }}
                    >
                      <option value="tshirt">{lang === 'ar' ? 'تيشيرت' : 'T-Shirt'}</option>
                      <option value="mug">{lang === 'ar' ? 'كوب سيراميك' : 'Ceramic Mug'}</option>
                      <option value="sticker">{lang === 'ar' ? 'ملصقات فينيل' : 'Vinyl Sticker'}</option>
                      <option value="business_card">{lang === 'ar' ? 'بطاقة عمل كتان' : 'Business Card'}</option>
                      <option value="packaging">{lang === 'ar' ? 'صندوق شحن كرافت' : 'Packaging Box'}</option>
                    </select>
                  </div>

                  {/* Names: AR and EN */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('productNameAr')} *</label>
                      <input 
                        type="text"
                        value={prodNameAr}
                        onChange={(e) => setProdNameAr(e.target.value)}
                        placeholder="مثال: تيشيرت قطني فاخر للشركات"
                        required
                        style={{
                          background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                          color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none'
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('productNameEn')} *</label>
                      <input 
                        type="text"
                        value={prodNameEn}
                        onChange={(e) => setProdNameEn(e.target.value)}
                        placeholder="e.g. Premium Executive Linen Cards"
                        required
                        style={{
                          background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                          color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Descriptions: AR and EN */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('productDescAr')} *</label>
                    <textarea 
                      rows={3}
                      value={prodDescAr}
                      onChange={(e) => setProdDescAr(e.target.value)}
                      placeholder="وصف تفصيلي للمواد والجودة باللغة العربية..."
                      required
                      style={{
                        background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                        color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none', resize: 'vertical'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('productDescEn')} *</label>
                    <textarea 
                      rows={3}
                      value={prodDescEn}
                      onChange={(e) => setProdDescEn(e.target.value)}
                      placeholder="English catalog detailed specifications..."
                      required
                      style={{
                        background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                        color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none', resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Pricing and Colors */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('productBasePrice')} *</label>
                      <input 
                        type="number" 
                        step="0.01"
                        value={prodBasePrice}
                        onChange={(e) => setProdBasePrice(parseFloat(e.target.value) || 0)}
                        required
                        style={{
                          background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                          color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none'
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('productColorsComma')} *</label>
                      <input 
                        type="text" 
                        value={prodColors}
                        onChange={(e) => setProdColors(e.target.value)}
                        placeholder="e.g. #FFF, #000, #5E5CE6"
                        required
                        style={{
                          background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                          color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Materials specification rules */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('productMaterialsAr')} *</label>
                    <input 
                      type="text" 
                      value={prodMaterials}
                      onChange={(e) => setProdMaterials(e.target.value)}
                      placeholder="e.g. Cotton Linen | كتان قطني:1.0, Matte Board | ورق مطفأ:1.2"
                      required
                      style={{
                        background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                        color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none'
                      }}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {lang === 'ar' 
                        ? 'تنبيه: افصل الخامات بفواصل، واكتب النسبة بمستند الضرب، مثل: اسم الخامة بالعربية | English:معامل الضرب (مثال: قطن فاخر | Organic Cotton:1.25)' 
                        : 'Format: Name Arabic | Name English:Multiplier, Name2 Arabic | Name2 English:Multiplier2 (e.g. Cotton | قطن:1.0)'}
                    </span>
                  </div>

                  {/* Finishes specification rules */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('productFinishesAr')} *</label>
                    <input 
                      type="text" 
                      value={prodFinishes}
                      onChange={(e) => setProdFinishes(e.target.value)}
                      placeholder="e.g. Standard Ink | حبر قياسي:0.0, Foil Stamping | ختم حراري:2.5"
                      required
                      style={{
                        background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                        color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none'
                      }}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {lang === 'ar' 
                        ? 'تنبيه: افصل التشطيبات بفواصل، واكتب السعر الإضافي، مثل: اسم التشطيب بالعربية | English:تكلفة إضافية (مثال: ختم ذهبي | Gold Foil:1.5)' 
                        : 'Format: Name Arabic | Name English:AddedCost, Name2 Arabic | Name2 English:AddedCost (e.g. Gold Foil | ختم ذهبي:1.5)'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                      {editingProduct ? (lang === 'ar' ? 'تحديث مواصفات المنتج' : 'Update Catalog Rules') : (lang === 'ar' ? 'إضافة المنتج الجديد للكتالوج' : 'Add New Product to Catalog')}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowProductForm(false)} style={{ flex: 1 }}>
                      {t('cancel')}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* PORTFOLIO TAB */}
        {activeSubTab === 'portfolio' && (
          <div style={{ maxWidth: '650px' }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 className="serif-font" style={{ fontSize: '2rem', margin: '0 0 8px 0' }}>{t('releaseCaseStudy')}</h2>
              <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '0.9rem' }}>
                {t('releaseCaseStudyDesc')}
              </p>
            </div>

            <form onSubmit={handleAddPortfolioProject} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('projectTitle')}</label>
                <input 
                  type="text" 
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  placeholder="e.g. Neon Apparel Kits"
                  style={{
                    background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                    color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('clientNameLabel')}</label>
                  <input 
                    type="text" 
                    value={newProjClient}
                    onChange={(e) => setNewProjClient(e.target.value)}
                    placeholder="e.g. NovaTech Inc."
                    style={{
                      background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                      color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('categoryBadge')}</label>
                  <input 
                    type="text" 
                    value={newProjCategory}
                    onChange={(e) => setNewProjCategory(e.target.value)}
                    placeholder="e.g. Packaging, Apparel"
                    style={{
                      background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                      color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('projectBrief')}</label>
                <textarea 
                  rows={3}
                  value={newProjBrief}
                  onChange={(e) => setNewProjBrief(e.target.value)}
                  placeholder="What did the client require?..."
                  style={{
                    background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                    color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none', resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('projectProcess')}</label>
                <textarea 
                  rows={3}
                  value={newProjProcess}
                  onChange={(e) => setNewProjProcess(e.target.value)}
                  placeholder="How did the design team realize the visual elements?..."
                  style={{
                    background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                    color: '#FFF', padding: '10px 14px', borderRadius: '8px', outline: 'none', resize: 'vertical'
                  }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '12px' }}>
                {t('publishProject')}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* MANAGE ORDER WORKFLOW & DETAILED CRUD MODAL */}
      {selectedOrder && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            width: '100%', maxWidth: '650px', background: '#101015',
            borderRadius: '16px', padding: '32px', overflowY: 'auto', maxHeight: '90vh',
            direction: lang === 'ar' ? 'rtl' : 'ltr'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 className="serif-font" style={{ fontSize: '1.6rem', margin: 0 }}>
                {isEditingOrderDetails 
                  ? t('editOrderDetails') 
                  : t('adminActionPanel')}
              </h3>
              <button className="btn btn-secondary" onClick={() => { setSelectedOrder(null); setIsEditingOrderDetails(false); }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <strong>{t('orderRef')}: #{selectedOrder.id}</strong>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                  {lang === 'ar' 
                    ? `بواسطة ${selectedOrder.userName} (${selectedOrder.userEmail}) في ${selectedOrder.date}` 
                    : `by ${selectedOrder.userName} (${selectedOrder.userEmail}) on ${selectedOrder.date}`}
                </p>
              </div>

              {/* TOGGLE EDIT VS STATIC VIEW */}
              {!isEditingOrderDetails ? (
                <>
                  {/* Static workflow display */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div className="dashboard-details-grid" style={{ fontSize: '0.9rem', borderTop: 'none', paddingTop: 0 }}>
                      <div><strong>{lang === 'ar' ? 'الاسم المستلم:' : 'Client Name:'}</strong> {selectedOrder.userName}</div>
                      <div><strong>{lang === 'ar' ? 'البريد للاتصال:' : 'Contact Email:'}</strong> {selectedOrder.userEmail}</div>
                      <div><strong>{lang === 'ar' ? 'الخامة المختارة:' : 'Selected Material:'}</strong> {selectedOrder.material}</div>
                      <div><strong>{lang === 'ar' ? 'نوع التشطيب:' : 'Selected Finish:'}</strong> {selectedOrder.finish}</div>
                      <div><strong>{lang === 'ar' ? 'الكمية المطلوبة:' : 'Quantity Count:'}</strong> {selectedOrder.quantity}</div>
                      <div><strong>{lang === 'ar' ? 'اللون (Hex):' : 'Color hex:'}</strong> {selectedOrder.color}</div>
                      <div><strong>{lang === 'ar' ? 'التكلفة الإجمالية:' : 'Total Cost:'}</strong> {selectedOrder.price} {t('currency')}</div>
                      <div><strong>{lang === 'ar' ? 'نوع التصميم:' : 'Artwork Type:'}</strong> {selectedOrder.artworkType.toUpperCase()}</div>
                    </div>

                    <button 
                      className="btn btn-secondary" 
                      style={{ marginTop: '16px', width: '100%', padding: '8px 12px', fontSize: '0.85rem' }}
                      onClick={() => setIsEditingOrderDetails(true)}
                    >
                      ✏️ {t('editOrderDetails')}
                    </button>
                  </div>

                  {/* Status workflow dropdown setter */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('productionPhaseProgress')}</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {['pending', 'in_design', 'approved', 'printing', 'packaging', 'shipped', 'delivered'].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleUpdateOrderStatus(selectedOrder.id, status as any)}
                          style={{
                            padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--border-color)',
                            background: selectedOrder.status === status ? 'var(--color-primary)' : 'rgba(255,255,255,0.02)',
                            color: '#FFF', fontSize: '0.75rem', cursor: 'pointer', textTransform: 'uppercase'
                          }}
                        >
                          {lang === 'ar' 
                            ? (status === 'pending' ? 'قيد الانتظار' : status === 'in_design' ? 'تحت التعديل' : status === 'approved' ? 'معتمد' : status === 'printing' ? 'جار الطباعة' : status === 'packaging' ? 'تعبئة' : status === 'shipped' ? 'شحن' : 'تسليم')
                            : status.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Revision note launcher */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('requestArtworkRevision')}</label>
                    <textarea
                      rows={2}
                      value={revisionNote}
                      onChange={(e) => setRevisionNote(e.target.value)}
                      placeholder={t('revisionPlaceholderAdmin')}
                      style={{
                        background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                        color: '#FFF', padding: '8px', borderRadius: '6px', fontSize: '0.85rem', resize: 'vertical'
                      }}
                    />
                    <button className="btn btn-primary" onClick={() => handleSendRevisionNote(selectedOrder.id)}>
                      {t('rejectLayoutBtn')}
                    </button>
                  </div>
                </>
              ) : (
                // Detailed edit fields (Full Admin CRUD Control)
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>{lang === 'ar' ? 'اسم المستلم' : 'Contact Name'}</label>
                      <input 
                        type="text" 
                        value={editOrderName}
                        onChange={(e) => setEditOrderName(e.target.value)}
                        style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', color: '#FFF', padding: '8px', borderRadius: '6px' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>{lang === 'ar' ? 'البريد الإلكتروني للاتصال' : 'Contact Email'}</label>
                      <input 
                        type="email" 
                        value={editOrderEmail}
                        onChange={(e) => setEditOrderEmail(e.target.value)}
                        style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', color: '#FFF', padding: '8px', borderRadius: '6px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>{lang === 'ar' ? 'الكمية المطلوبة' : 'Quantity'}</label>
                      <input 
                        type="number" 
                        value={editOrderQuantity}
                        onChange={(e) => setEditOrderQuantity(parseInt(e.target.value) || 1)}
                        style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', color: '#FFF', padding: '8px', borderRadius: '6px' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>{lang === 'ar' ? `السعر الكلي (${t('currency')})` : `Total Price (${t('currency')})`}</label>
                      <input 
                        type="number" 
                        step="0.01"
                        value={editOrderPrice}
                        onChange={(e) => setEditOrderPrice(parseFloat(e.target.value) || 0)}
                        style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', color: '#FFF', padding: '8px', borderRadius: '6px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>{lang === 'ar' ? 'نوع الخامة' : 'Material Name'}</label>
                      <input 
                        type="text" 
                        value={editOrderMaterial}
                        onChange={(e) => setEditOrderMaterial(e.target.value)}
                        style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', color: '#FFF', padding: '8px', borderRadius: '6px' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>{lang === 'ar' ? 'نوع التشطيب' : 'Finish Name'}</label>
                      <input 
                        type="text" 
                        value={editOrderFinish}
                        onChange={(e) => setEditOrderFinish(e.target.value)}
                        style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', color: '#FFF', padding: '8px', borderRadius: '6px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>{lang === 'ar' ? 'اللون (كود هيكس)' : 'Color (Hex code)'}</label>
                    <input 
                      type="text" 
                      value={editOrderColor}
                      onChange={(e) => setEditOrderColor(e.target.value)}
                      style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', color: '#FFF', padding: '8px', borderRadius: '6px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button className="btn btn-primary" onClick={handleSaveOrderDetails} style={{ flex: 1 }}>
                      {lang === 'ar' ? 'حفظ التعديلات' : 'Save Details'}
                    </button>
                    <button className="btn btn-secondary" onClick={() => setIsEditingOrderDetails(false)} style={{ flex: 1 }}>
                      {t('cancel')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MANAGE BRIEF MODAL */}
      {selectedBrief && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            width: '100%', maxWidth: '650px', background: '#101015',
            borderRadius: '16px', padding: '32px',
            direction: lang === 'ar' ? 'rtl' : 'ltr'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 className="serif-font" style={{ fontSize: '1.6rem', margin: 0 }}>{t('briefEvaluation')}</h3>
              <button className="btn btn-secondary" onClick={() => setSelectedBrief(null)}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.9rem' }}>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <strong>{t('clientIdentity')}</strong> {selectedBrief.userName} ({selectedBrief.userEmail})
                <br /><strong>{lang === 'ar' ? 'تاريخ التقديم:' : 'Date Filed:'}</strong> {selectedBrief.date}
                <br /><strong>{t('urgency')}:</strong> <span style={{ color: 'var(--color-accent)' }}>{selectedBrief.urgency.toUpperCase()}</span>
                <br /><strong>{t('budgetRange')}:</strong> {selectedBrief.budgetRange}
              </div>

              <div>
                <strong>{t('briefDetailsText')}</strong>
                <p style={{ color: 'var(--color-text-secondary)', marginTop: '6px', background: 'rgba(255,255,255,0.01)', padding: '12px', borderRadius: '6px' }}>
                  {selectedBrief.description}
                </p>
              </div>

              {/* Upload designer proof mockup draft simulation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('designerProofSim')}</label>
                <input 
                  type="text" 
                  value={proofUrl}
                  onChange={(e) => setProofUrl(e.target.value)}
                  style={{
                    background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                    color: '#FFF', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', outline: 'none'
                  }}
                />
                <button className="btn btn-primary" style={{ marginTop: '8px' }} onClick={() => handleSendProof(selectedBrief.id)}>
                  {t('uploadProofBtn')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
