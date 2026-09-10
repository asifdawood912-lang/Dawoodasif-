import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { SearchOverlay } from './components/common/SearchOverlay';
import { ProductQuickView } from './components/common/ProductQuickView';
import { SizeGuideModal } from './components/common/SizeGuideModal';

import { HomePage } from './components/home/HomePage';
import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { WishlistPage } from './components/wishlist/WishlistPage';
import { AccountPage } from './components/account/AccountPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { FaqPage } from './components/pages/FaqPage';
import { ShippingReturnsPage } from './components/pages/ShippingReturnsPage';
import { LegalPages } from './components/pages/LegalPages';

import { PageView, Product } from './types';

const MainApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>({ type: 'home' });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Scroll to top upon page navigation
  const navigateTo = (view: PageView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView.type]);

  // Determine active category for navbar underline
  const activeNavCategory =
    currentView.type === 'category' ? currentView.category : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-['Plus_Jakarta_Sans',sans-serif] antialiased selection:bg-black selection:text-white">
      {/* 1. Announcement Bar */}
      <AnnouncementBar onNavigate={navigateTo} />

      {/* 2. Main Navigation Bar */}
      <Navbar
        currentView={currentView}
        activeCategory={activeNavCategory}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 3. Main Routed View */}
      <main className="flex-1">
        {currentView.type === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        )}

        {currentView.type === 'category' && (
          <ShopPage
            category={currentView.category}
            onNavigate={navigateTo}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        )}

        {currentView.type === 'product' && (
          <ProductDetailPage
            productId={currentView.productId}
            onNavigate={navigateTo}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        )}

        {currentView.type === 'cart' && <CartPage onNavigate={navigateTo} />}

        {currentView.type === 'checkout' && <CheckoutPage onNavigate={navigateTo} />}

        {currentView.type === 'wishlist' && <WishlistPage onNavigate={navigateTo} />}

        {currentView.type === 'search' && (
          <ShopPage
            searchQuery={currentView.query}
            onNavigate={navigateTo}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        )}

        {currentView.type === 'account' && (
          <AccountPage initialTab={currentView.tab} onNavigate={navigateTo} />
        )}

        {currentView.type === 'about' && <AboutPage onNavigate={navigateTo} />}

        {currentView.type === 'contact' && <ContactPage onNavigate={navigateTo} />}

        {currentView.type === 'faq' && <FaqPage onNavigate={navigateTo} />}

        {currentView.type === 'shipping-returns' && (
          <ShippingReturnsPage onNavigate={navigateTo} />
        )}

        {currentView.type === 'privacy' && (
          <LegalPages type="privacy" onNavigate={navigateTo} />
        )}

        {currentView.type === 'terms' && (
          <LegalPages type="terms" onNavigate={navigateTo} />
        )}
      </main>

      {/* 4. Global Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Drawers & Overlays */}
      <CartDrawer onNavigate={navigateTo} />
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigateTo}
      />
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onNavigate={navigateTo}
      />
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <AuthProvider>
            <MainApp />
          </AuthProvider>
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}
