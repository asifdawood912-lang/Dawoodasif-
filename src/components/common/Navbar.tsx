import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { PageView, Category } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: PageView) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories: Category[] = ['MEN', 'WOMEN', 'KIDS', 'BEAUTY'];

  const isCurrentCategory = (cat: Category) => {
    return currentView.type === 'category' && currentView.category === cat;
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`sticky top-0 z-40 w-full bg-[#FAF9F7]/95 backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border-b border-neutral-200/80'
            : 'py-4 md:py-5 border-b border-neutral-200/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* MOBILE LEFT: Hamburger menu */}
          <div className="flex md:hidden items-center">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 -ml-1.5 text-neutral-900 hover:text-black focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* DESKTOP LEFT: Navigation links */}
          <nav
            id="desktop-category-nav"
            className="hidden md:flex items-center space-x-7 lg:space-x-8 text-[13px] font-medium tracking-[0.14em] uppercase text-neutral-800"
            aria-label="Categories"
          >
            {categories.map((category) => (
              <button
                key={category}
                id={`nav-link-${category.toLowerCase()}`}
                type="button"
                onClick={() => handleNavClick({ type: 'category', category })}
                className={`relative py-1 transition-colors duration-150 ${
                  isCurrentCategory(category)
                    ? 'text-black font-bold'
                    : 'hover:text-black text-neutral-600'
                }`}
              >
                {category}
                {isCurrentCategory(category) && (
                  <motion.div
                    layoutId="activeCategoryUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* CENTER: GAZU Brand Logo */}
          <div className="flex-1 md:flex-none text-center">
            <button
              id="brand-logo-btn"
              type="button"
              onClick={() => handleNavClick({ type: 'home' })}
              className="inline-block group focus:outline-none"
              aria-label="GAZU Home"
            >
              <span className="font-extrabold tracking-[-0.04em] text-2xl sm:text-3xl md:text-4xl text-black select-none font-['Syne',sans-serif]">
                GAZU
              </span>
            </button>
          </div>

          {/* RIGHT ICONS & ACTIONS */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-[12px] font-medium tracking-[0.12em] uppercase text-neutral-900">
            {/* Search Button */}
            <button
              id="navbar-search-btn"
              type="button"
              onClick={onOpenSearch}
              className="flex items-center space-x-1.5 hover:text-black py-1 transition-colors focus:outline-none"
              aria-label="Search items"
            >
              <Search className="w-4 h-4 sm:w-[17px] sm:h-[17px] stroke-[1.6]" />
              <span className="hidden lg:inline">SEARCH</span>
            </button>

            {/* Account / Login Link */}
            <button
              id="navbar-account-btn"
              type="button"
              onClick={() => handleNavClick(isLoggedIn ? { type: 'account' } : { type: 'login' })}
              className="hidden sm:flex items-center space-x-1.5 hover:text-black py-1 transition-colors focus:outline-none"
              aria-label="User Account"
            >
              <User className="w-4 h-4 sm:w-[17px] sm:h-[17px] stroke-[1.6]" />
              <span className="hidden lg:inline">
                {isLoggedIn ? (user?.name?.split(' ')[0] || 'ACCOUNT') : 'LOGIN'}
              </span>
            </button>

            {/* Wishlist Link with count */}
            <button
              id="navbar-wishlist-btn"
              type="button"
              onClick={() => handleNavClick({ type: 'wishlist' })}
              className="hidden sm:flex items-center space-x-1.5 hover:text-black py-1 transition-colors relative focus:outline-none"
              aria-label={`Wishlist, ${wishlistCount} items`}
            >
              <div className="relative">
                <Heart className="w-4 h-4 sm:w-[17px] sm:h-[17px] stroke-[1.6]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline">WISHLIST</span>
            </button>

            {/* Cart Bag with counter */}
            <button
              id="navbar-cart-btn"
              type="button"
              onClick={openCart}
              className="flex items-center space-x-1.5 hover:text-black py-1 transition-colors focus:outline-none"
              aria-label={`Shopping bag with ${totalCount} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.6]" />
                {totalCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {totalCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline">CART ({totalCount})</span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-HEIGHT NAVIGATION DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide drawer */}
            <motion.div
              id="mobile-nav-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl flex flex-col z-10"
            >
              {/* Drawer header */}
              <div className="p-5 flex items-center justify-between border-b border-neutral-100">
                <span className="font-extrabold text-2xl font-['Syne',sans-serif] tracking-tight">
                  GAZU
                </span>
                <button
                  id="mobile-drawer-close-btn"
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-neutral-500 hover:text-black"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                <div className="space-y-4">
                  <span className="text-[10px] tracking-[0.2em] font-semibold text-neutral-400 uppercase">
                    COLLECTIONS
                  </span>
                  <div className="space-y-3 text-lg font-medium tracking-[0.08em] uppercase">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleNavClick({ type: 'category', category: cat })}
                        className="w-full text-left py-1 flex items-center justify-between group text-neutral-900 hover:text-black"
                      >
                        <span>{cat}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-neutral-100 pt-5 space-y-3">
                  <span className="text-[10px] tracking-[0.2em] font-semibold text-neutral-400 uppercase">
                    HIGHLIGHTS
                  </span>
                  <div className="space-y-3 text-sm font-medium tracking-[0.1em] uppercase text-neutral-700">
                    <button
                      type="button"
                      onClick={() => handleNavClick({ type: 'category', category: 'MEN' })}
                      className="block w-full text-left py-1 hover:text-black"
                    >
                      NEW ARRIVALS
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavClick({ type: 'category', category: 'WOMEN' })}
                      className="block w-full text-left py-1 hover:text-black"
                    >
                      BEST SELLERS
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavClick({ type: 'category', category: 'MEN' })}
                      className="block w-full text-left py-1 text-red-700 font-semibold"
                    >
                      SALE (UP TO 35% OFF)
                    </button>
                  </div>
                </div>

                <div className="border-t border-neutral-100 pt-5 space-y-3">
                  <span className="text-[10px] tracking-[0.2em] font-semibold text-neutral-400 uppercase">
                    ACCOUNT & ASSISTANCE
                  </span>
                  <div className="space-y-3 text-sm font-medium tracking-[0.1em] uppercase text-neutral-700">
                    <button
                      type="button"
                      onClick={() => handleNavClick(isLoggedIn ? { type: 'account' } : { type: 'login' })}
                      className="block w-full text-left py-1 hover:text-black"
                    >
                      {isLoggedIn ? 'MY ACCOUNT' : 'LOGIN / REGISTER'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavClick({ type: 'wishlist' })}
                      className="block w-full text-left py-1 hover:text-black flex items-center justify-between"
                    >
                      <span>WISHLIST</span>
                      {wishlistCount > 0 && (
                        <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {wishlistCount}
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavClick({ type: 'faq' })}
                      className="block w-full text-left py-1 hover:text-black"
                    >
                      HELP & FAQ
                    </button>
                  </div>
                </div>
              </div>

              {/* Drawer footer */}
              <div className="p-6 bg-neutral-50 border-t border-neutral-200/60 text-xs text-neutral-500">
                <p className="tracking-wider uppercase font-medium text-neutral-800">
                  FREE DELIVERY ON ORDERS &gt; ₹999
                </p>
                <p className="text-[11px] text-neutral-400 mt-1">
                  15-Day Effortless Returns
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
