import React, { useState } from 'react';
import {
  Star,
  Heart,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Maximize2,
  X,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Product, PageView } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { ProductCard } from '../common/ProductCard';
import { SizeGuideModal } from '../common/SizeGuideModal';
import { PRODUCTS } from '../../data/products';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (view: PageView) => void;
  onQuickView: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onNavigate,
  onQuickView
}) => {
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Accordion tabs
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    details: true,
    care: false,
    shipping: false,
    reviews: false
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onNavigate({ type: 'checkout' });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard');
    } else {
      showToast('Sharing GAZU product link');
    }
  };

  // Recommendations: products from same category or random
  const recommendations = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  return (
    <div id="product-detail-page" className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            {
              label: product.category,
              view: { type: 'category', category: product.category }
            },
            {
              label: product.name
            }
          ]}
          onNavigate={onNavigate}
        />

        {/* MAIN PRODUCT GRID (Left: Gallery, Right: Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-4 pb-16">
          {/* LEFT: IMAGE GALLERY (Section 14) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Vertical Thumbnails (Desktop) */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[640px] shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 sm:w-20 aspect-[3/4] border overflow-hidden transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-black ring-1 ring-black opacity-100'
                      : 'border-neutral-200 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="relative flex-1 aspect-[3/4] bg-[#F5F4F0] overflow-hidden group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.isNew && (
                  <span className="bg-black text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1">
                    NEW
                  </span>
                )}
                {product.isBestSeller && !product.isNew && (
                  <span className="bg-neutral-800 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1">
                    BESTSELLER
                  </span>
                )}
              </div>

              {/* Fullscreen Trigger */}
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 hover:bg-white text-neutral-800 shadow-sm transition-transform hover:scale-105"
                title="Fullscreen zoom"
                aria-label="Fullscreen zoom"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Mobile Prev/Next arrows */}
              {product.images.length > 1 && (
                <div className="md:hidden absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) =>
                        prev === 0 ? product.images.length - 1 : prev - 1
                      );
                    }}
                    className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 text-black flex items-center justify-center shadow-md"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) =>
                        prev === product.images.length - 1 ? 0 : prev + 1
                      );
                    }}
                    className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 text-black flex items-center justify-center shadow-md"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO & ACTIONS (Section 13) */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Category & Code */}
            <div className="flex items-center justify-between text-xs tracking-wider uppercase text-neutral-400 mb-1">
              <span>{product.category} / {product.subcategory}</span>
              <span className="font-mono">REF. {product.id.toUpperCase()}</span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-neutral-900 leading-tight font-['Syne',sans-serif] mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 text-neutral-900">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-black stroke-black'
                          : 'fill-neutral-200 stroke-neutral-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold ml-1">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-neutral-400">
                ({product.reviewCount} customer reviews)
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 pb-6 border-b border-neutral-200 mb-6">
              <span className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-neutral-400 line-through">
                  MRP ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discount > 0 && (
                <span className="text-xs font-bold text-neutral-900 bg-neutral-100 border border-neutral-300 px-2 py-0.5 uppercase tracking-wider">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 font-normal">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs tracking-wider uppercase font-medium text-neutral-700 mb-2.5">
                  <span>
                    COLOR: <strong className="text-black">{selectedColor}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                        selectedColor === c.name
                          ? 'ring-2 ring-black ring-offset-2 border-black scale-105'
                          : 'border-neutral-300 hover:scale-110'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={`Color ${c.name}`}
                    >
                      {selectedColor === c.name && (
                        <Check
                          className={`w-4 h-4 ${
                            c.hex === '#FFFFFF' || c.hex.toLowerCase().includes('fff')
                              ? 'text-black'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector + Size Guide */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs tracking-wider uppercase font-medium text-neutral-700 mb-2.5">
                  <span>
                    SIZE: <strong className="text-black">{selectedSize}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-neutral-500 hover:text-black underline text-[11px] font-semibold tracking-wider uppercase"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-[48px] px-3.5 py-2.5 text-xs font-bold tracking-wider uppercase border transition-all ${
                        selectedSize === s
                          ? 'bg-black text-white border-black shadow-xs'
                          : 'bg-white text-neutral-800 border-neutral-200 hover:border-black'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-700">
                Quantity:
              </span>
              <div className="flex items-center border border-neutral-300 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center text-sm font-semibold text-neutral-600 hover:bg-neutral-100"
                >
                  -
                </button>
                <span className="w-10 text-center text-xs font-bold text-black">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center text-sm font-semibold text-neutral-600 hover:bg-neutral-100"
                >
                  +
                </button>
              </div>
              <span className="text-[11px] text-emerald-700 font-medium tracking-wider uppercase">
                In Stock ({product.stock} units ready to ship)
              </span>
            </div>

            {/* ACTION BUTTONS (ADD TO BAG, BUY NOW, WISHLIST, SHARE) */}
            <div className="space-y-3 mb-8">
              <div className="flex gap-3">
                <button
                  id="pdp-add-to-bag-btn"
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-black text-white py-4 text-xs font-bold tracking-[0.18em] uppercase hover:bg-neutral-800 transition-colors shadow-md active:scale-98"
                >
                  ADD TO BAG
                </button>

                <button
                  id="pdp-wishlist-toggle-btn"
                  type="button"
                  onClick={() => toggleWishlist(product.id, product.name)}
                  className={`w-14 border flex items-center justify-center transition-colors ${
                    wishlisted
                      ? 'bg-neutral-100 border-black text-black'
                      : 'border-neutral-300 hover:border-black text-neutral-700'
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-black' : ''}`} />
                </button>

                <button
                  id="pdp-share-btn"
                  type="button"
                  onClick={handleShare}
                  className="w-14 border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 transition-colors"
                  aria-label="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <button
                id="pdp-buy-now-btn"
                type="button"
                onClick={handleBuyNow}
                className="w-full bg-[#FAF9F7] border border-black text-black py-3.5 text-xs font-bold tracking-[0.18em] uppercase hover:bg-black hover:text-white transition-colors active:scale-98"
              >
                BUY NOW
              </button>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="grid grid-cols-3 gap-2 py-4 border-y border-neutral-200 text-center text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-6">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-neutral-900" />
                <span>Free Shipping &gt; ₹999</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-neutral-900" />
                <span>15-Day Free Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-neutral-900" />
                <span>Quality Assured</span>
              </div>
            </div>

            {/* ACCORDIONS (Section 13) */}
            <div className="divide-y divide-neutral-200 border-b border-neutral-200">
              {/* Product Details */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex items-center justify-between text-xs font-bold tracking-[0.16em] uppercase text-neutral-900 text-left"
                >
                  <span>PRODUCT DETAILS</span>
                  {openAccordions.details ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  )}
                </button>
                {openAccordions.details && (
                  <div className="pt-3 text-xs text-neutral-600 space-y-1.5 leading-relaxed">
                    <ul className="list-disc pl-4 space-y-1">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                      {product.fit && <li>Silhouetted in our signature {product.fit}</li>}
                    </ul>
                  </div>
                )}
              </div>

              {/* Fabric & Care */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex items-center justify-between text-xs font-bold tracking-[0.16em] uppercase text-neutral-900 text-left"
                >
                  <span>FABRIC & CARE</span>
                  {openAccordions.care ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  )}
                </button>
                {openAccordions.care && (
                  <div className="pt-3 text-xs text-neutral-600 space-y-1.5 leading-relaxed">
                    <ul className="list-disc pl-4 space-y-1">
                      {product.fabricCare.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between text-xs font-bold tracking-[0.16em] uppercase text-neutral-900 text-left"
                >
                  <span>SHIPPING & RETURNS</span>
                  {openAccordions.shipping ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  )}
                </button>
                {openAccordions.shipping && (
                  <div className="pt-3 text-xs text-neutral-600 space-y-2 leading-relaxed">
                    <p>
                      Orders above ₹999 qualify for complimentary express delivery across India. Standard delivery takes 2–4 business days.
                    </p>
                    <p>
                      We accept returns and size exchanges within 15 days of delivery. The item must be unused, unwashed, and in its original tag packaging.
                    </p>
                  </div>
                )}
              </div>

              {/* Customer Reviews */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('reviews')}
                  className="w-full flex items-center justify-between text-xs font-bold tracking-[0.16em] uppercase text-neutral-900 text-left"
                >
                  <span>REVIEWS ({product.reviewCount})</span>
                  {openAccordions.reviews ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  )}
                </button>
                {openAccordions.reviews && (
                  <div className="pt-3 text-xs text-neutral-600 space-y-4">
                    <div className="bg-neutral-50 p-3.5 border border-neutral-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-neutral-900">Devansh K.</span>
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-neutral-700">
                        "The fabric drape is unbelievable for this price point. Clean collar and fits oversized just right."
                      </p>
                    </div>

                    <div className="bg-neutral-50 p-3.5 border border-neutral-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-neutral-900">Rhea S.</span>
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-neutral-700">
                        "Minimalist perfection. Wore it all weekend and it held shape completely after a gentle cold wash."
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* YOU MAY ALSO LIKE RECOMMENDATIONS */}
        {recommendations.length > 0 && (
          <section className="pt-12 border-t border-neutral-200 select-none">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-neutral-400 block mb-1">
                  CURATED RECOMMENDATIONS
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-900 font-['Syne',sans-serif]">
                  YOU MAY ALSO LIKE
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {recommendations.map((rec) => (
                <ProductCard
                  key={rec.id}
                  product={rec}
                  onSelect={(p) => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    onNavigate({ type: 'product', productId: p.id });
                  }}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* FULLSCREEN ZOOM MODAL */}
      {isFullscreen && (
        <div
          id="fullscreen-gallery-modal"
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 text-white hover:text-neutral-300 p-2 z-20"
            aria-label="Close fullscreen"
          >
            <X className="w-7 h-7" />
          </button>
          <div className="max-w-4xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-[85vh] w-auto mx-auto object-contain"
            />
          </div>
        </div>
      )}

      {/* SIZE GUIDE MODAL */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
};
