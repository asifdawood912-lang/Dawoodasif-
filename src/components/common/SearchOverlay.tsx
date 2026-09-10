import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Clock, Trash2 } from 'lucide-react';
import { PRODUCTS, POPULAR_SEARCHES } from '../../data/products';
import { Product, PageView } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: PageView) => void;
}

const RECENT_SEARCHES_KEY = 'gazu_recent_searches_v1';

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
      return saved ? JSON.parse(saved) : ['Oversized Tee', 'Cargo Pants', 'Blazer'];
    } catch {
      return ['Oversized Tee', 'Cargo Pants', 'Blazer'];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 6);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredProducts: Product[] = query.trim()
    ? PRODUCTS.filter((product) => {
        const q = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.subcategory.toLowerCase().includes(q) ||
          product.tags.some((t) => t.toLowerCase().includes(q)) ||
          product.description.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    saveRecentSearch(query.trim());
    onClose();
    onNavigate({ type: 'search', query: query.trim() });
  };

  const handleSelectTerm = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
    onClose();
    onNavigate({ type: 'search', query: term });
  };

  const handleSelectProduct = (product: Product) => {
    saveRecentSearch(product.name);
    onClose();
    onNavigate({ type: 'product', productId: product.id });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#FAF9F7]/98 backdrop-blur-md flex flex-col"
        >
          {/* Top Bar with Close */}
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex items-center justify-between">
            <span className="font-extrabold text-2xl font-['Syne',sans-serif] tracking-tight">
              GAZU
            </span>
            <button
              id="search-overlay-close-btn"
              type="button"
              onClick={onClose}
              className="p-2 text-neutral-600 hover:text-black transition-colors"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Content Container */}
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col overflow-y-auto">
            {/* Header prompt */}
            <div className="text-center mb-6">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400">
                EXPLORE CATALOGUE
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
                WHAT ARE YOU LOOKING FOR?
              </h2>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSearchSubmit} className="relative mb-8">
              <div className="relative border-b-2 border-black flex items-center pb-2">
                <Search className="w-6 h-6 text-neutral-400 mr-3 shrink-0" />
                <input
                  ref={inputRef}
                  id="search-overlay-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories, fits..."
                  className="w-full bg-transparent text-lg sm:text-2xl font-medium placeholder-neutral-400 focus:outline-none text-neutral-900 tracking-tight"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="p-1 text-neutral-400 hover:text-black mr-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-black text-white px-5 py-2 text-xs font-bold tracking-wider uppercase hover:bg-neutral-800 transition-colors"
                >
                  SEARCH
                </button>
              </div>
            </form>

            {/* If Query is empty: Show Popular & Recent Searches */}
            {!query.trim() ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                {/* Popular Searches */}
                <div>
                  <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-neutral-400 mb-4">
                    POPULAR SEARCHES
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => handleSelectTerm(term)}
                        className="text-xs font-medium px-3.5 py-2 bg-white border border-neutral-200 text-neutral-800 hover:border-black hover:text-black transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Searches */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-neutral-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      RECENT SEARCHES
                    </h3>
                    {recentSearches.length > 0 && (
                      <button
                        type="button"
                        onClick={clearRecentSearches}
                        className="text-[11px] text-neutral-400 hover:text-black flex items-center gap-1 uppercase tracking-wider"
                      >
                        <Trash2 className="w-3 h-3" />
                        Clear
                      </button>
                    )}
                  </div>
                  {recentSearches.length === 0 ? (
                    <p className="text-xs text-neutral-400">No recent searches yet.</p>
                  ) : (
                    <div className="space-y-1.5">
                      {recentSearches.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => handleSelectTerm(term)}
                          className="w-full text-left py-2 px-3 text-xs font-medium text-neutral-700 hover:bg-white hover:text-black flex items-center justify-between group transition-colors"
                        >
                          <span>{term}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Live Results View */
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold tracking-[0.14em] uppercase text-neutral-500">
                    MATCHING PRODUCTS ({filteredProducts.length})
                  </span>
                  {filteredProducts.length > 0 && (
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="text-xs font-bold uppercase tracking-wider text-black hover:underline flex items-center gap-1"
                    >
                      <span>View all results</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12 bg-white border border-neutral-200 p-8">
                    <p className="text-sm font-semibold text-neutral-800 uppercase tracking-wider mb-2">
                      No products found for "{query}"
                    </p>
                    <p className="text-xs text-neutral-500 mb-6">
                      Try searching with another keyword or explore our core departments.
                    </p>
                    <div className="flex justify-center gap-2 flex-wrap">
                      {(['MEN', 'WOMEN', 'KIDS', 'BEAUTY'] as const).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            onClose();
                            onNavigate({ type: 'category', category: c });
                          }}
                          className="text-xs font-semibold px-4 py-2 bg-neutral-100 hover:bg-black hover:text-white transition-colors uppercase tracking-wider"
                        >
                          SHOP {c}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {filteredProducts.slice(0, 8).map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSelectProduct(product)}
                        className="bg-white p-2 border border-neutral-200/70 hover:border-black cursor-pointer group transition-all"
                      >
                        <div className="aspect-[3/4] bg-neutral-100 overflow-hidden mb-2">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                          {product.category}
                        </span>
                        <h4 className="text-xs font-semibold text-neutral-900 line-clamp-1">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-black">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-[10px] text-neutral-400 line-through">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
