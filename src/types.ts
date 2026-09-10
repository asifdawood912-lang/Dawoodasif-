export type Category = 'MEN' | 'WOMEN' | 'KIDS' | 'BEAUTY';

export interface Product {
  id: string;
  name: string;
  category: Category;
  subcategory: string;
  price: number;
  originalPrice: number;
  discount: number; // percentage, e.g. 30 for 30% off
  images: string[];
  colors: {
    name: string;
    hex: string;
  }[];
  sizes: string[];
  description: string;
  details: string[];
  fabricCare: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  stock: number;
  tags: string[];
  fit?: string;
}

export interface CartItem {
  id: string; // unique item id composed of productId-color-size
  productId: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  category: Category;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pinCode: string;
}

export type DeliveryMethod = 'standard' | 'express';
export type PaymentMethod = 'upi' | 'card' | 'cod' | 'netbanking';

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered';
  shippingAddress: ShippingAddress;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  addresses: ShippingAddress[];
}

export interface FilterState {
  category?: Category | 'ALL';
  subcategories: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  sort: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'bestseller' | 'rating';
  isNewOnly: boolean;
  isBestsellerOnly: boolean;
  inStockOnly: boolean;
}

export type PageView =
  | { type: 'home' }
  | { type: 'category'; category: Category }
  | { type: 'product'; productId: string }
  | { type: 'search'; query: string }
  | { type: 'wishlist' }
  | { type: 'cart' }
  | { type: 'checkout' }
  | { type: 'order-confirmation'; orderId: string }
  | { type: 'account'; tab?: 'profile' | 'orders' | 'wishlist' | 'addresses' | 'payments' }
  | { type: 'login' }
  | { type: 'register' }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'faq' }
  | { type: 'shipping-returns' }
  | { type: 'privacy' }
  | { type: 'terms' }
  | { type: '404' };
