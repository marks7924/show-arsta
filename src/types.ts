export type ProductType = 'tshirt' | 'mug' | 'sticker' | 'business_card' | 'packaging';

export interface Product {
  id: string;
  type: ProductType;
  name: string;
  description: string;
  basePrice: number;
  materials: { name: string; multiplier: number }[];
  finishes: { name: string; addedCost: number }[];
  colors: string[];
  mockupUrl: string; // Base mockup image to render under designs
  safeAreaRatio: { x: number; y: number; width: number; height: number }; // Relative bounding box for designs
}

export interface CanvasElement {
  id: string;
  type: 'text' | 'image';
  content: string; // text content or base64/URL image src
  x: number; // percent layout (0-100) or pixels relative to design canvas
  y: number;
  width: number;
  height: number;
  rotation: number; // in degrees
  color?: string; // for text
  fontSize?: number; // in pixels
  fontFamily?: string;
  align?: 'left' | 'center' | 'right';
  layer: number; // z-ordering
  dpi?: number; // computed resolution rating
}

export interface CanvasState {
  elements: CanvasElement[];
  backgroundColor: string;
  activeElementId: string | null;
}

export type OrderStatus = 'pending' | 'in_design' | 'approved' | 'printing' | 'packaging' | 'shipped' | 'delivered';

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  productType: ProductType;
  productName: string;
  quantity: number;
  material: string;
  finish: string;
  color: string;
  price: number;
  artworkType: 'upload' | 'studio' | 'request';
  artworkUrl?: string; // canvas screenshot or uploaded file
  canvasState?: CanvasState; // serialized JSON if created in studio
  status: OrderStatus;
  date: string;
  revisions?: string[]; // Admin notes or requested alterations
}

export interface DesignRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  productType: ProductType;
  description: string;
  referenceImage?: string;
  budgetRange: string;
  urgency: 'standard' | 'rush' | 'express';
  status: 'pending' | 'reviewing' | 'in_design' | 'completed';
  date: string;
  adminNotes?: string;
  proofUrl?: string; // link to mock uploaded by designer
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  client: string;
  brief: string;
  process: string;
  beforeImage: string; // Raw client sketch/idea layout
  afterImage: string; // Finished premium render
  realWorldImage: string; // Photo of print outcome
}

export type UserRole = 'guest' | 'customer' | 'admin';
