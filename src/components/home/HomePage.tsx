import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroSection } from './HeroSection';
import { CategoryStrip } from './CategoryStrip';
import { NewSeasonBanner } from './NewSeasonBanner';
import { BenefitsStrip } from './BenefitsStrip';
import { ShopByCategory } from './ShopByCategory';
import { EditorialBanner } from './EditorialBanner';
import { ProductCard } from '../common/ProductCard';
import { PRODUCTS } from '../../data/products';
import { PageView, Product, Category } from '../../types';

interface HomePageProps {
  onNavigate: (view: PageView) => void;
  onQuickView: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onQuickView }) => {
  const [newArrivalsTab, setNewArrivalsTab] = useState<'ALL' | Category>('ALL');

  // Best of GAZU: First 4 flagship items
  const bestOfGazu = PRODUCTS.slice(0, 4);

  // New Arrivals
  const newArrivals = PRODUCTS.filter((p) => {
    if (newArrivalsTab === 'ALL') return p.isNew;
    return p.isNew && p.category === newArrivalsTab;
  }).slice(0, 8);

  // Best Sellers: 4-8 items with high ratings and bestSeller flag
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div id="home-page-container" className="flex flex-col w-full bg-white">
      {/* 3. HERO SECTION */}
      <HeroSection onNavigate={onNavigate} />

      {/* 4. MEN/WOMEN/KIDS CATEGORY STRIP */}
      <CategoryStrip onNavigate={onNavigate} />

      {/* 5. NEW SEASON EDITORIAL BANNER */}
      <NewSeasonBanner onNavigate={onNavigate} />

      {/* 6. BENEFITS STRIP */}
      <BenefitsStrip />

      {/* 7. BEST OF GAZU PRODUCT GRID */}
      <section id="best-of-gazu" className="py-16 sm:py-20 border-b border-neutral-200 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-neutral-400 block mb-1">
                TIMELESS FOUNDATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-neutral-900 font-['Syne',sans-serif]">
                BEST OF GAZU
              </h2>
            </div>
            <button
              id="view-all-best-of-gazu-btn"
              type="button"
              onClick={() => onNavigate({ type: 'category', category: 'MEN' })}
              className="group flex items-center gap-1.5 text-xs font-bold tracking-[0.16em] uppercase text-black hover:text-neutral-600 transition-colors"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestOfGazu.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => onNavigate({ type: 'product', productId: p.id })}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. NEW ARRIVALS */}
      <section id="new-arrivals" className="py-16 sm:py-20 bg-[#FAF9F7] border-b border-neutral-200 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-neutral-400 block mb-1">
                FRESH SILHOUETTES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-neutral-900 font-['Syne',sans-serif]">
                NEW ARRIVALS
              </h2>
            </div>

            {/* Department Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {(['ALL', 'MEN', 'WOMEN', 'KIDS', 'BEAUTY'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setNewArrivalsTab(tab)}
                  className={`text-xs font-bold tracking-[0.14em] uppercase px-3.5 py-1.5 transition-all whitespace-nowrap ${
                    newArrivalsTab === tab
                      ? 'bg-black text-white'
                      : 'bg-white text-neutral-600 border border-neutral-200 hover:border-black'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => onNavigate({ type: 'product', productId: p.id })}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 9. SHOP BY CATEGORY (MEN, WOMEN, KIDS, BEAUTY) */}
      <ShopByCategory onNavigate={onNavigate} />

      {/* 10. EDITORIAL FASHION BANNER */}
      <EditorialBanner onNavigate={onNavigate} />

      {/* 11. BEST SELLERS */}
      <section id="best-sellers" className="py-16 sm:py-20 bg-white border-b border-neutral-200 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-neutral-400 block mb-1">
                COMMUNITY FAVORITES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-neutral-900 font-['Syne',sans-serif]">
                BEST SELLERS
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'category', category: 'WOMEN' })}
              className="group flex items-center gap-1.5 text-xs font-bold tracking-[0.16em] uppercase text-black hover:text-neutral-600 transition-colors"
            >
              <span>EXPLORE ALL</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => onNavigate({ type: 'product', productId: p.id })}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
