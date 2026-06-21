import type { Order, DesignRequest, PortfolioProject, CanvasState, ProductType, Product } from './types';
import { portfolioProjects, products as initialProducts } from './mockData';

export interface SavedDesign {
  id: string;
  productType: ProductType;
  name: string;
  canvasState: CanvasState;
  date: string;
  previewUrl: string; // Screenshot or SVG representation
}

const STORAGE_KEYS = {
  DESIGNS: 'show_arsta_saved_designs',
  ORDERS: 'show_arsta_orders',
  REQUESTS: 'show_arsta_requests',
  PORTFOLIO: 'show_arsta_portfolio',
  CATALOG: 'show_arsta_catalog',
};

// Seed initial dashboard orders for premium feel if empty
const seedOrders = (userId: string): Order[] => {
  return [
    {
      id: 'ord-1001',
      userId,
      userName: 'Alex Rivers',
      userEmail: 'alex@designstudio.io',
      productType: 'tshirt',
      productName: 'Premium Crewneck Tee',
      quantity: 50,
      material: '100% Organic Cotton',
      finish: 'High-Density Puff Print',
      color: '#0A0A0A',
      price: 1424.50,
      artworkType: 'studio',
      status: 'printing',
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 4 days ago
    },
    {
      id: 'ord-1002',
      userId,
      userName: 'Alex Rivers',
      userEmail: 'alex@designstudio.io',
      productType: 'business_card',
      productName: 'Linen Executive Cards',
      quantity: 500,
      material: 'Textured Cotton Linen',
      finish: 'Metallic Foil Stamping',
      color: '#12161A',
      price: 185.00,
      artworkType: 'upload',
      status: 'approved',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 1 day ago
    }
  ];
};

export const db = {
  // Products Catalog (Admin editable)
  getProducts: (): Product[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CATALOG);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(initialProducts));
      return initialProducts;
    }
    return JSON.parse(data);
  },

  saveProduct: (product: Product) => {
    const list = db.getProducts();
    const index = list.findIndex(p => p.id === product.id);
    if (index >= 0) {
      list[index] = product;
    } else {
      list.push(product);
    }
    localStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(list));
  },

  deleteProduct: (id: string) => {
    const list = db.getProducts();
    const updated = list.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(updated));
  },

  // Saved Designs
  getSavedDesigns: (): SavedDesign[] => {
    const data = localStorage.getItem(STORAGE_KEYS.DESIGNS);
    return data ? JSON.parse(data) : [];
  },

  saveDesign: (design: SavedDesign) => {
    const list = db.getSavedDesigns();
    const index = list.findIndex(d => d.id === design.id);
    if (index >= 0) {
      list[index] = design;
    } else {
      list.push(design);
    }
    localStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(list));
  },

  deleteDesign: (id: string) => {
    const list = db.getSavedDesigns();
    const updated = list.filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(updated));
  },

  // Orders
  getOrders: (userId: string = 'user-current'): Order[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    let list: Order[] = data ? JSON.parse(data) : [];
    if (list.length === 0) {
      list = seedOrders(userId);
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(list));
    }
    return list;
  },

  getAllOrders: (): Order[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : seedOrders('user-current');
  },

  saveOrder: (order: Order) => {
    const list = db.getAllOrders();
    const index = list.findIndex(o => o.id === order.id);
    if (index >= 0) {
      list[index] = order;
    } else {
      list.push(order);
    }
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(list));
  },

  updateOrderStatus: (orderId: string, status: Order['status'], revisionNote?: string) => {
    const list = db.getAllOrders();
    const index = list.findIndex(o => o.id === orderId);
    if (index >= 0) {
      list[index].status = status;
      if (revisionNote) {
        if (!list[index].revisions) list[index].revisions = [];
        list[index].revisions?.push(revisionNote);
      }
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(list));
    }
  },

  updateOrderDetails: (orderId: string, details: Partial<Order>) => {
    const list = db.getAllOrders();
    const index = list.findIndex(o => o.id === orderId);
    if (index >= 0) {
      list[index] = { ...list[index], ...details };
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(list));
    }
  },

  // Design Requests
  getDesignRequests: (userId?: string): DesignRequest[] => {
    const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    const list: DesignRequest[] = data ? JSON.parse(data) : [];
    if (userId) {
      return list.filter(r => r.userId === userId);
    }
    return list;
  },

  saveDesignRequest: (request: DesignRequest) => {
    const list = db.getDesignRequests();
    const index = list.findIndex(r => r.id === request.id);
    if (index >= 0) {
      list[index] = request;
    } else {
      list.push(request);
    }
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(list));
  },

  updateRequestStatus: (requestId: string, status: DesignRequest['status'], adminNotes?: string, proofUrl?: string) => {
    const list = db.getDesignRequests();
    const index = list.findIndex(r => r.id === requestId);
    if (index >= 0) {
      list[index].status = status;
      if (adminNotes !== undefined) list[index].adminNotes = adminNotes;
      if (proofUrl !== undefined) list[index].proofUrl = proofUrl;
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(list));
    }
  },

  // Portfolio
  getPortfolioProjects: (): PortfolioProject[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolioProjects));
      return portfolioProjects;
    }
    return JSON.parse(data);
  },

  savePortfolioProject: (project: PortfolioProject) => {
    const list = db.getPortfolioProjects();
    const index = list.findIndex(p => p.id === project.id);
    if (index >= 0) {
      list[index] = project;
    } else {
      list.push(project);
    }
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(list));
  }
};
