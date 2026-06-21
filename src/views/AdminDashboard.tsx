import React, { useState } from 'react';
import { db } from '../db';
import { products } from '../mockData';
import type { Order, DesignRequest, PortfolioProject, OrderStatus } from '../types';

interface AdminDashboardProps {
}

export const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'briefs' | 'catalog' | 'portfolio'>('orders');
  
  // Data
  const [orders, setOrders] = useState<Order[]>(() => db.getAllOrders());
  const [briefs, setBriefs] = useState<DesignRequest[]>(() => db.getDesignRequests());
  const [localCatalog, setLocalCatalog] = useState(() => [...products]);
  
  // Modals / Details
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedBrief, setSelectedBrief] = useState<DesignRequest | null>(null);
  
  // Action state values
  const [revisionNote, setRevisionNote] = useState<string>('');
  const [proofUrl, setProofUrl] = useState<string>('https://images.unsplash.com/photo-1523381210434-271e8be1f52b'); // sample default mockup proof
  
  // Portfolio creation form state
  const [newProjTitle, setNewProjTitle] = useState<string>('');
  const [newProjCategory, setNewProjCategory] = useState<string>('');
  const [newProjClient, setNewProjClient] = useState<string>('');
  const [newProjBrief, setNewProjBrief] = useState<string>('');
  const [newProjProcess, setNewProjProcess] = useState<string>('');

  const refreshData = () => {
    setOrders(db.getAllOrders());
    setBriefs(db.getDesignRequests());
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    db.updateOrderStatus(orderId, status);
    refreshData();
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleSendRevisionNote = (orderId: string) => {
    if (!revisionNote.trim()) {
      alert('Please write revision suggestions for the customer.');
      return;
    }
    db.updateOrderStatus(orderId, 'in_design', `Designer note: "${revisionNote}"`);
    refreshData();
    setRevisionNote('');
    setSelectedOrder(null);
    alert('Revision request sent to the customer dashboard.');
  };

  const handleSendProof = (briefId: string) => {
    db.updateRequestStatus(briefId, 'in_design', 'Designer has uploaded a mockup draft proof for review. Please approve or comment.', proofUrl);
    refreshData();
    setSelectedBrief(null);
    alert('Mockup proof uploaded. The customer will find it on their dashboard tracking.');
  };

  const handleSaveCatalogPrice = (prodId: string, basePrice: number) => {
    // In a production setup, we modify products globally. We will write to a local storage list for the demo
    const updated = localCatalog.map(p => {
      if (p.id === prodId) {
        return { ...p, basePrice };
      }
      return p;
    });
    setLocalCatalog(updated);
    // Persist to sync across views
    localStorage.setItem('show_arsta_catalog_base', JSON.stringify(updated));
    alert('Product pricing rule updated successfully.');
  };

  const handleAddPortfolioProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle || !newProjCategory || !newProjClient || !newProjBrief || !newProjProcess) {
      alert('Please fill out all required fields to submit this case study project.');
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
    
    // Reset Form
    setNewProjTitle('');
    setNewProjCategory('');
    setNewProjClient('');
    setNewProjBrief('');
    setNewProjProcess('');
    
    alert('New agency portfolio project uploaded and released to public portfolio pages!');
  };

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <div className="dashboard-sidebar" style={{ background: '#181822' }}>
        <div style={{ padding: '0 16px 20px', borderBottom: '1px solid var(--border-color)', marginBottom: '20px' }}>
          <h3 className="serif-font" style={{ fontSize: '1.2rem', color: 'var(--color-secondary)' }}>Admin Control</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Studio Lead Administrator</span>
        </div>
        <div onClick={() => setActiveSubTab('orders')} className={`dashboard-link ${activeSubTab === 'orders' ? 'active' : ''}`}>
          <span>📋</span> All Orders ({orders.length})
        </div>
        <div onClick={() => setActiveSubTab('briefs')} className={`dashboard-link ${activeSubTab === 'briefs' ? 'active' : ''}`}>
          <span>✍</span> Custom Design Briefs ({briefs.length})
        </div>
        <div onClick={() => setActiveSubTab('catalog')} className={`dashboard-link ${activeSubTab === 'catalog' ? 'active' : ''}`}>
          <span>🏷️</span> Catalog Rules
        </div>
        <div onClick={() => setActiveSubTab('portfolio')} className={`dashboard-link ${activeSubTab === 'portfolio' ? 'active' : ''}`}>
          <span>🖼️</span> Add Case Study
        </div>
      </div>

      {/* CONTENT */}
      <div className="dashboard-content" style={{ background: '#0D0D12' }}>
        
        {/* ORDERS SUB-TAB */}
        {activeSubTab === 'orders' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 className="serif-font" style={{ fontSize: '2.2rem' }}>Printing Orders Console</h2>
              <button className="btn btn-secondary" onClick={refreshData}>🔄 Refresh List</button>
            </div>

            <div className="custom-table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Customer Name</th>
                    <th>Product Type</th>
                    <th>Finishing Specs</th>
                    <th>Total Price</th>
                    <th>Current Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: 700 }}>#{order.id}</td>
                      <td>{order.userName}</td>
                      <td>{order.productName}</td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                        {order.material} / {order.finish}
                      </td>
                      <td style={{ fontWeight: 600 }}>${order.price.toLocaleString()}</td>
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
                            Manage Workflow
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BRIEFS SUB-TAB */}
        {activeSubTab === 'briefs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 className="serif-font" style={{ fontSize: '2.2rem' }}>Custom Agency Briefs</h2>
              <span className="badge badge-indesign">{briefs.length} Intake Briefs</span>
            </div>

            {briefs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
                <p style={{ color: 'var(--color-text-secondary)' }}>No professional design requests have been filed yet.</p>
              </div>
            ) : (
              <div className="custom-table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Brief ID</th>
                      <th>Client Name</th>
                      <th>Product</th>
                      <th>Budget Range</th>
                      <th>Urgency</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {briefs.map((brief) => (
                      <tr key={brief.id}>
                        <td style={{ fontWeight: 700 }}>#{brief.id}</td>
                        <td>{brief.userName}</td>
                        <td style={{ textTransform: 'capitalize' }}>{brief.productType}</td>
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
                            Review Brief & Upload Proof
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

        {/* CATALOG RULES SUB-TAB */}
        {activeSubTab === 'catalog' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 className="serif-font" style={{ fontSize: '2.2rem' }}>Dynamic Catalog Pricing Rules</h2>
            </div>
            
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', maxWidth: '600px' }}>
              Adjust base catalog pricing tiers dynamically. Adjustments are instantly calculated during user design customization sessions and catalog requests.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {localCatalog.map((prod) => (
                <div key={prod.id} className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 className="serif-font" style={{ fontSize: '1.25rem' }}>{prod.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Category: {prod.type}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>Base cost:</span>
                      <input 
                        type="number" 
                        step="0.01"
                        defaultValue={prod.basePrice}
                        id={`input-price-${prod.id}`}
                        style={{
                          background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                          color: '#FFF', padding: '8px 12px', borderRadius: '6px', width: '90px', outline: 'none'
                        }}
                      />
                    </div>
                    <button 
                      className="btn btn-primary" 
                      style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                      onClick={() => {
                        const val = parseFloat((document.getElementById(`input-price-${prod.id}`) as HTMLInputElement).value) || 0;
                        handleSaveCatalogPrice(prod.id, val);
                      }}
                    >
                      Save Rule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PORTFOLIO SUB-TAB */}
        {activeSubTab === 'portfolio' && (
          <div style={{ maxWidth: '650px' }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 className="serif-font" style={{ fontSize: '2.2rem' }}>Release Agency Case Study</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginTop: '8px' }}>
                Upload high-end visuals and outlining descriptions of completed print operations.
              </p>
            </div>

            <form onSubmit={handleAddPortfolioProject} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Project Title</label>
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
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Client Name</label>
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
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Category Badge</label>
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
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Client Brief</label>
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
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Design Process</label>
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
                Publish Case Study Project
              </button>
            </form>
          </div>
        )}
      </div>

      {/* MANAGE ORDER WORKFLOW MODAL */}
      {selectedOrder && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            width: '100%', maxWidth: '650px', background: '#111116',
            borderRadius: '16px', padding: '32px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 className="serif-font" style={{ fontSize: '1.6rem' }}>Admin Action Panel</h3>
              <button className="btn btn-secondary" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <strong>Order Reference: #{selectedOrder.id}</strong>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                  Submitted by {selectedOrder.userName} ({selectedOrder.userEmail}) on {selectedOrder.date}.
                </p>
              </div>

              {/* Status workflow dropdown setter */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Production Phase Progress</label>
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
                      {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Revision note launcher */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Request Artwork Revision (Optional)</label>
                <textarea
                  rows={2}
                  value={revisionNote}
                  onChange={(e) => setRevisionNote(e.target.value)}
                  placeholder="Explain why the design isn't print-ready (e.g. Center logo larger, low resolution, margin issues)..."
                  style={{
                    background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                    color: '#FFF', padding: '8px', borderRadius: '6px', fontSize: '0.85rem', resize: 'vertical'
                  }}
                />
                <button className="btn btn-primary" onClick={() => handleSendRevisionNote(selectedOrder.id)}>
                  Reject Layout & Ask Revision
                </button>
              </div>
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
            width: '100%', maxWidth: '650px', background: '#111116',
            borderRadius: '16px', padding: '32px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 className="serif-font" style={{ fontSize: '1.6rem' }}>Brief Intake Evaluation</h3>
              <button className="btn btn-secondary" onClick={() => setSelectedBrief(null)}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.9rem' }}>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <strong>Client Identity:</strong> {selectedBrief.userName} ({selectedBrief.userEmail})
                <br /><strong>Date Filed:</strong> {selectedBrief.date}
                <br /><strong>Urgency level:</strong> <span style={{ color: 'var(--color-accent)' }}>{selectedBrief.urgency.toUpperCase()}</span>
                <br /><strong>Proposed budget:</strong> {selectedBrief.budgetRange}
              </div>

              <div>
                <strong>Brief Details:</strong>
                <p style={{ color: 'var(--color-text-secondary)', marginTop: '6px', background: 'rgba(255,255,255,0.01)', padding: '12px', borderRadius: '6px' }}>
                  {selectedBrief.description}
                </p>
              </div>

              {/* Simulated designer proof upload */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Designer Proof Mockup URL (Simulation)</label>
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
                  Upload Mockup & Request Client Approval
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
