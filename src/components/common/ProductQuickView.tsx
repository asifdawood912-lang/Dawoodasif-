import React, { useState } from 'react';
import { X, Star, Heart, Check, ArrowRight } from 'lucide-react';
import { Product, PageView } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onNavigate: (view: PageView) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onNavigate
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  const handleGoToFullDetails = () => {
    onClose();
    onNavigate({ type: 'product', productId: product.id });
  };

  return (
    <div
      id="quickview-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        id="quickview-modal-content"
        className="relative bg-white w-full max-w-3xl overflow-hidden shadow-2xl border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          id="quickview-close-btn"
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-black transition-colors"
          aria-label="Close preview"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Gallery side */}
          <div className="bg-[#F5F4F0] p-6 flex flex-col items-center justify-center relative">
            <div className="w-full aspect-[3/4] max-h-[420px] overflow-hidden">
              <img
                src={product.images[activeImgIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImgIndex(i)}
                    className={`w-12 h-14 border overflow-hidden ${
                      activeImgIndex === i ? 'border-black' : 'border-neutral-200 opacity-60'
                    }`}
                  >
                    <img
                      src={img}
                      alt="thumbnail"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details side */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Ratings */}
              <div className="flex items-center justify-between text-xs uppercase tracking-wider text-neutral-500 mb-2">
                <span>{product.category} / {product.subcategory}</span>
                <div className="flex items-center gap-1 text-neutral-900">
                  <Star className="w-3.5 h-3.5 fill-black stroke-black" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-neutral-400">({product.reviewCount})</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-semibold text-black tracking-tight mb-3">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-xl font-bold text-black">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-neutral-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="text-xs font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 uppercase tracking-wider">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-xs text-neutral-600 leading-relaxed mb-6 line-clamp-3">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs tracking-wider uppercase font-medium text-neutral-800 mb-2">
                    <span>Color: <strong className="text-black">{selectedColor}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                          selectedColor === c.name
                            ? 'ring-2 ring-black ring-offset-2 border-black'
                            : 'border-neutral-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                        aria-label={`Select color ${c.name}`}
                      >
                        {selectedColor === c.name && (
                          <Check
                            className={`w-3.5 h-3.5 ${
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

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs tracking-wider uppercase font-medium text-neutral-800 mb-2">
                    <span>Size: <strong className="text-black">{selectedSize}</strong></span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`min-w-[40px] px-3 py-2 text-xs font-semibold tracking-wider uppercase border transition-all ${
                          selectedSize === s
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs uppercase tracking-wider font-medium text-neutral-700">
                  Quantity:
                </span>
                <div className="flex items-center border border-neutral-300">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-100"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-semibold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-neutral-100">
              <div className="flex gap-2">
                <button
                  id="quickview-add-to-bag-btn"
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 bg-black text-white text-xs tracking-[0.14em] uppercase py-3.5 font-bold hover:bg-neutral-800 transition-colors"
                >
                  ADD TO BAG
                </button>
                <button
                  id="quickview-wishlist-btn"
                  type="button"
                  onClick={() => toggleWishlist(product.id, product.name)}
                  className={`px-4 border flex items-center justify-center transition-colors ${
                    wishlisted
                      ? 'bg-neutral-100 border-black text-black'
                      : 'border-neutral-300 hover:border-black text-neutral-700'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-black' : ''}`} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleGoToFullDetails}
                className="w-full text-center text-xs font-semibold tracking-wider uppercase text-neutral-600 hover:text-black py-1 flex items-center justify-center gap-1 group"
              >
                <span>View Full Product Details</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
