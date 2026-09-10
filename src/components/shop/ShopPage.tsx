import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ChevronDown, X, Grid3X3, LayoutGrid, Check } from 'lucide-react';
import { ProductCard } from '../common/ProductCard';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { PRODUCTS } from '../../data/products';
import { Category, Product, PageView } from '../../types';

interface ShopPageProps {
  category?: Category;
  searchQuery?: string;
  onNavigate: (view: PageView) => void;
  onQuickView: (product: Product) => void;
}

type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'bestseller' | 'rating';

export const ShopPage: React.FC<ShopPageProps> = ({
  category,
  searchQuery,
  onNavigate,
  onQuickView
}) => {
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridColumns, setGridColumns] = useState<3 | 4>(4);

  // Determine category specific header copy
  const getHeaderInfo = () => {
    if (searchQuery) {
      return {
        title: `Search: "${searchQuery}"`,
        desc: `Displaying search results matching "${searchQuery}".`,
        crumb: `Search: ${searchQuery}`
      };
    }
    switch (category) {
      case 'MEN':
        return {
          title: "Men's Collection",
          desc: 'Essential silhouettes, relaxed fits and modern everyday pieces.',
          crumb: 'Men'
        };
      case 'WOMEN':
        return {
          title: "Women's Collection",
          desc: 'Effortless tailoring, fluid drapery, and elevated everyday luxury.',
          crumb: 'Women'
        };
      case 'KIDS':
        return {
          title: "Kids Collection",
          desc: 'Comfort meets cool everyday. Soft organic cottons engineered for play.',
          crumb: 'Kids'
        };
      case 'BEAUTY':
        return {
          title: 'Beauty & Wellness',
          desc: 'Clean, minimalist skincare and hair treatments formulated without compromise.',
          crumb: 'Beauty'
        };
      default:
        return {
          title: 'All Collections',
          desc: 'Explore the complete universe of GAZU modern minimalist apparel.',
          crumb: 'Shop'
        };
    }
  };

  const header = getHeaderInfo();

  // Filter pool based on primary category or search
  const baseProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      if (category) {
        return p.category === category;
      }
      return true;
    });
  }, [category, searchQuery]);

  // Extract available filter options dynamically
  const availableSubcategories = useMemo(() => {
    const set = new Set<string>();
    baseProducts.forEach((p) => set.add(p.subcategory));
    return Array.from(set);
  }, [baseProducts]);

  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    baseProducts.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [baseProducts]);

  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    baseProducts.forEach((p) => {
      p.colors.forEach((c) => {
        if (!map.has(c.name)) map.set(c.name, c.hex);
      });
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [baseProducts]);

  // Apply filters
  const filteredProducts = useMemo(() => {
    let list = baseProducts.filter((p) => {
      if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(p.subcategory)) {
        return false;
      }
      if (selectedSizes.length > 0 && !p.sizes.some((s) => selectedSizes.includes(s))) {
        return false;
      }
      if (selectedColors.length > 0 && !p.colors.some((c) => selectedColors.includes(c.name))) {
        return false;
      }
      if (p.price > priceMax) {
        return false;
      }
      if (inStockOnly && p.stock <= 0) {
        return false;
      }
      return true;
    });

    // Sorting
    list = [...list].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'bestseller':
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        case 'rating':
          return b.rating - a.rating;
        case 'featured':
        default:
          return 0;
      }
    });

    return list;
  }, [
    baseProducts,
    selectedSubcategories,
    selectedSizes,
    selectedColors,
    priceMax,
    inStockOnly,
    sortBy
  ]);

  const toggleSubcategory = (sub: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const resetFilters = () => {
    setSelectedSubcategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceMax(5000);
    setInStockOnly(false);
  };

  const activeFiltersCount =
    selectedSubcategories.length +
    selectedSizes.length +
    selectedColors.length +
    (priceMax < 5000 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  // Filter sidebar element (reused in desktop sidebar and mobile modal)
  const renderFilterControls = () => (
    <div className="space-y-6 text-xs select-none">
      {/* Active Filter Clear */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <span className="font-semibold text-neutral-800 tracking-wider uppercase">
            Filters ({activeFiltersCount})
          </span>
          <button
            type="button"
            onClick={resetFilters}
            className="text-neutral-500 hover:text-black font-semibold uppercase tracking-wider underline text-[11px]"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Category / Subcategory */}
      {availableSubcategories.length > 0 && (
        <div className="pb-6 border-b border-neutral-200">
          <h4 className="font-bold uppercase tracking-[0.14em] text-neutral-900 mb-3">
            Category
          </h4>
          <div className="space-y-2">
            {availableSubcategories.map((sub) => (
              <label
                key={sub}
                className="flex items-center gap-2.5 cursor-pointer text-neutral-600 hover:text-black py-0.5"
              >
                <input
                  type="checkbox"
                  checked={selectedSubcategories.includes(sub)}
                  onChange={() => toggleSubcategory(sub)}
                  className="rounded-none border-neutral-300 text-black focus:ring-black w-4 h-4 cursor-pointer accent-black"
                />
                <span className="capitalize">{sub}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Size Filter */}
      {availableSizes.length > 0 && (
        <div className="pb-6 border-b border-neutral-200">
          <h4 className="font-bold uppercase tracking-[0.14em] text-neutral-900 mb-3">
            Size
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {availableSizes.map((size) => {
              const isSelected = selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`min-w-[36px] px-2.5 py-1.5 text-xs font-semibold tracking-wider uppercase border transition-colors ${
                    isSelected
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color Filter */}
      {availableColors.length > 0 && (
        <div className="pb-6 border-b border-neutral-200">
          <h4 className="font-bold uppercase tracking-[0.14em] text-neutral-900 mb-3">
            Color
          </h4>
          <div className="flex flex-wrap gap-2">
            {availableColors.map((color) => {
              const isSelected = selectedColors.includes(color.name);
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => toggleColor(color.name)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'ring-2 ring-black ring-offset-2 border-black'
                      : 'border-neutral-300 hover:scale-110'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Filter by ${color.name}`}
                >
                  {isSelected && (
                    <Check
                      className={`w-3.5 h-3.5 ${
                        color.hex === '#FFFFFF' || color.hex.toLowerCase().includes('fff')
                          ? 'text-black'
                          : 'text-white'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Price Slider */}
      <div className="pb-6 border-b border-neutral-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold uppercase tracking-[0.14em] text-neutral-900">
            Max Price
          </h4>
          <span className="font-bold text-black">
            ₹{priceMax.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="5000"
          step="100"
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-black cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
          <span>₹500</span>
          <span>₹5,000</span>
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="flex items-center gap-2.5 cursor-pointer text-neutral-700 hover:text-black py-1">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="rounded-none border-neutral-300 text-black focus:ring-black w-4 h-4 cursor-pointer accent-black"
          />
          <span className="font-semibold uppercase tracking-wider text-xs">
            In Stock Only
          </span>
        </label>
      </div>
    </div>
  );

  return (
    <div id="shop-page-wrapper" className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            {
              label: header.crumb,
              view: category ? { type: 'category', category } : undefined
            }
          ]}
          onNavigate={onNavigate}
        />

        {/* Collection Header */}
        <div className="py-6 sm:py-8 border-b border-neutral-200 mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-neutral-900 font-['Syne',sans-serif]">
            {header.title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-xl font-normal leading-relaxed">
            {header.desc}
          </p>
        </div>

        {/* CONTROLS BAR: Filter trigger, Sort dropdown, and View mode */}
        <div className="flex items-center justify-between py-3 border-b border-neutral-200 mb-8 text-xs tracking-wider uppercase font-medium">
          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 border border-neutral-300 hover:border-black"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>FILTER {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          {/* Desktop Product Count */}
          <div className="hidden lg:block text-neutral-500">
            Showing <strong className="text-neutral-900">{filteredProducts.length}</strong> Products
          </div>

          {/* Sort & Grid Controls */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-neutral-400">SORT BY:</span>
              <div className="relative">
                <select
                  id="shop-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-transparent border border-neutral-300 py-1.5 pl-3 pr-8 text-xs font-semibold focus:outline-none focus:border-black cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="bestseller">Best Selling</option>
                  <option value="rating">Customer Rating</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500" />
              </div>
            </div>

            {/* Grid Density Switcher (Desktop) */}
            <div className="hidden md:flex items-center gap-1 pl-2 border-l border-neutral-200">
              <button
                type="button"
                onClick={() => setGridColumns(3)}
                className={`p-1.5 border transition-colors ${
                  gridColumns === 3
                    ? 'border-black text-black bg-neutral-100'
                    : 'border-transparent text-neutral-400 hover:text-black'
                }`}
                title="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setGridColumns(4)}
                className={`p-1.5 border transition-colors ${
                  gridColumns === 4
                    ? 'border-black text-black bg-neutral-100'
                    : 'border-transparent text-neutral-400 hover:text-black'
                }`}
                title="4 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* MAIN BODY: LEFT SIDEBAR + PRODUCT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-3 pr-6 sticky top-28">
            {renderFilterControls()}
          </aside>

          {/* PRODUCT GRID SECTION */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-neutral-50 border border-neutral-200 p-8">
                <h3 className="text-base font-bold uppercase tracking-wider text-neutral-800 mb-2">
                  No matching items found
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-6">
                  Try adjusting your filter options or clearing active parameters to view more pieces.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="bg-black text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                >
                  RESET ALL FILTERS
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-2 ${
                  gridColumns === 3
                    ? 'sm:grid-cols-2 md:grid-cols-3'
                    : 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                } gap-4 sm:gap-6`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(p) => onNavigate({ type: 'product', productId: p.id })}
                    onQuickView={onQuickView}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTER MODAL / DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10">
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-black">
                FILTERS ({activeFiltersCount})
              </span>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-neutral-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {renderFilterControls()}
            </div>
            <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex gap-2">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 py-3 text-xs font-bold uppercase tracking-wider border border-neutral-300 hover:border-black"
              >
                RESET
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 text-xs font-bold uppercase tracking-wider bg-black text-white hover:bg-neutral-800"
              >
                APPLY ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
