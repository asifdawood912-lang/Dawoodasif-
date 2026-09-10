import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, ShippingAddress, UserProfile } from '../types';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string) => boolean;
  register: (name: string, email: string, phone: string) => boolean;
  logout: () => void;
  continueAsGuest: () => void;
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status'>) => Order;
  savedAddresses: ShippingAddress[];
  addAddress: (address: ShippingAddress) => void;
  deleteAddress: (index: number) => void;
}

const USER_STORAGE_KEY = 'gazu_user_profile_v1';
const ORDERS_STORAGE_KEY = 'gazu_orders_list_v1';
const ADDRESSES_STORAGE_KEY = 'gazu_saved_addresses_v1';

const INITIAL_MOCK_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'GAZU-2026-8812',
    date: '2026-03-02',
    items: [
      {
        productId: 'men-1',
        name: 'Essential Relaxed Tee',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000',
        color: 'Charcoal',
        size: 'L',
        quantity: 1,
        price: 899
      },
      {
        productId: 'men-7',
        name: 'Relaxed Cargo Pants',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1000',
        color: 'Washed Black',
        size: '32',
        quantity: 1,
        price: 2199
      }
    ],
    subtotal: 3098,
    deliveryFee: 0,
    discount: 0,
    total: 3098,
    status: 'Delivered',
    shippingAddress: {
      fullName: 'Aarav Sharma',
      phone: '+91 98765 43210',
      email: 'aarav.sharma@example.com',
      address: '42, Studio Residences, 5th Avenue, Indiranagar',
      apartment: 'Apt 4B',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560038'
    },
    deliveryMethod: 'standard',
    paymentMethod: 'upi'
  },
  {
    id: 'ord-102',
    orderNumber: 'GAZU-2026-9043',
    date: '2026-03-08',
    items: [
      {
        productId: 'women-1',
        name: 'Relaxed Knit Top',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000',
        color: 'Oatmeal Milk',
        size: 'M',
        quantity: 1,
        price: 1499
      }
    ],
    subtotal: 1499,
    deliveryFee: 0,
    discount: 0,
    total: 1499,
    status: 'Shipped',
    shippingAddress: {
      fullName: 'Aarav Sharma',
      phone: '+91 98765 43210',
      email: 'aarav.sharma@example.com',
      address: '42, Studio Residences, 5th Avenue, Indiranagar',
      apartment: 'Apt 4B',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560038'
    },
    deliveryMethod: 'standard',
    paymentMethod: 'card'
  }
];

const INITIAL_ADDRESSES: ShippingAddress[] = [
  {
    fullName: 'Aarav Sharma',
    phone: '+91 98765 43210',
    email: 'aarav.sharma@example.com',
    address: '42, Studio Residences, 5th Avenue, Indiranagar',
    apartment: 'Apt 4B',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560038'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            name: 'Aarav Sharma',
            email: 'aarav.sharma@example.com',
            phone: '+91 98765 43210',
            addresses: INITIAL_ADDRESSES
          };
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_MOCK_ORDERS;
    } catch {
      return INITIAL_MOCK_ORDERS;
    }
  });

  const [savedAddresses, setSavedAddresses] = useState<ShippingAddress[]>(() => {
    try {
      const saved = localStorage.getItem(ADDRESSES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
    } catch {
      return INITIAL_ADDRESSES;
    }
  });

  const { showToast } = useToast();

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(savedAddresses));
    } catch (e) {
      console.error(e);
    }
  }, [savedAddresses]);

  const login = (email: string, name?: string) => {
    const newUser: UserProfile = {
      name: name || (email.split('@')[0] || 'User').replace(/[^a-zA-Z]/g, ' ').trim() || 'Valued Client',
      email,
      phone: '+91 98765 43210',
      addresses: savedAddresses
    };
    setUser(newUser);
    showToast(`Welcome back, ${newUser.name}`);
    return true;
  };

  const register = (name: string, email: string, phone: string) => {
    const newUser: UserProfile = {
      name,
      email,
      phone,
      addresses: []
    };
    setUser(newUser);
    showToast(`Account created. Welcome to GAZU, ${name}!`);
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out of GAZU', 'info');
  };

  const continueAsGuest = () => {
    const guestUser: UserProfile = {
      name: 'Guest Shopper',
      email: 'guest@gazu-store.com',
      phone: '',
      addresses: []
    };
    setUser(guestUser);
    showToast('Continuing as Guest');
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status'>): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `GAZU-2026-${randomSuffix}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Confirmed'
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const addAddress = (address: ShippingAddress) => {
    setSavedAddresses((prev) => [...prev, address]);
    showToast('Address saved successfully');
  };

  const deleteAddress = (index: number) => {
    setSavedAddresses((prev) => prev.filter((_, i) => i !== index));
    showToast('Address removed', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        register,
        logout,
        continueAsGuest,
        orders,
        createOrder,
        savedAddresses,
        addAddress,
        deleteAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
