import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

interface WishlistContextType {
  wishlist: string[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string, productName?: string) => void;
  removeFromWishlist: (productId: string) => void;
  wishlistCount: number;
}

const WISHLIST_STORAGE_KEY = 'gazu_wishlist_ids_v1';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to persist wishlist', e);
    }
  }, [wishlist]);

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const toggleWishlist = (productId: string, productName?: string) => {
    const exists = wishlist.includes(productId);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast(productName ? `Removed "${productName}" from wishlist` : 'Removed from wishlist', 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast(productName ? `Added "${productName}" to wishlist` : 'Added to wishlist', 'success');
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
    showToast('Removed from wishlist', 'info');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        wishlistCount: wishlist.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
