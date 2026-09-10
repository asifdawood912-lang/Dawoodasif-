import React, { useState } from 'react';
import { Heart, Star, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickView
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const wishlisted = isInWishlist(product.id);

  const defaultSize = product.sizes[0] || 'M';
  const defaultColor = product.colors[0]?.name || 'Standard';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id, product.name);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const hasSecondaryImage = product.images.length > 1;

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white transition-all cursor-pointer select-none"
      onClick={() => onSelect(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* IMAGE CONTAINER */}
      <div className="relative w-full aspect-[3/4] bg-[#F5F4F0] overflow-hidden">
        {/* Main Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className={`w-full h-full object-cover object-center transition-all duration-500 ease-out ${
            isHovered && hasSecondaryImage ? 'opacity-0 scale-105' : 'opacity-100'
          } ${isHovered && !hasSecondaryImage ? 'scale-105' : 'scale-100'}`}
        />

        {/* Secondary Image on Hover */}
        {hasSecondaryImage && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate angle`}
            referrerPolicy="no-referrer"
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* BADGES (NEW, BESTSELLER, DISCOUNT) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="bg-black text-white text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5">
              NEW
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="bg-neutral-800 text-white text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5">
              BESTSELLER
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-white/95 text-neutral-900 border border-neutral-200 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* WISHLIST HEART BUTTON */}
        <button
          id={`wishlist-btn-${product.id}`}
          type="button"
          onClick={handleWishlistClick}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 ${
            wishlisted
              ? 'bg-black text-white scale-105'
              : 'bg-white/90 text-neutral-800 hover:bg-white hover:scale-110 shadow-xs'
          }`}
        >
          <Heart
            className={`w-4 h-4 ${
              wishlisted ? 'fill-white stroke-white' : 'stroke-[1.6]'
            }`}
          />
        </button>

        {/* QUICK VIEW BUTTON (Desktop Hover) */}
        {onQuickView && (
          <button
            id={`quickview-btn-${product.id}`}
            type="button"
            onClick={handleQuickViewClick}
            aria-label="Quick preview"
            className="hidden sm:flex absolute top-12 right-2.5 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-800 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xs hover:scale-110"
          >
            <Eye className="w-4 h-4 stroke-[1.6]" />
          </button>
        )}

        {/* ADD TO BAG BUTTON (Hover on desktop, sticky bottom on mobile) */}
        <div className="absolute inset-x-2 bottom-2 z-20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 sm:transition-all duration-200 sm:block hidden">
          <button
            id={`quick-add-bag-${product.id}`}
            type="button"
            onClick={handleQuickAdd}
            className="w-full bg-black text-white text-[11px] font-semibold tracking-[0.14em] uppercase py-2.5 hover:bg-neutral-800 transition-colors shadow-lg active:scale-98"
          >
            ADD TO BAG
          </button>
        </div>
      </div>

      {/* PRODUCT INFORMATION */}
      <div className="pt-3 pb-2 flex flex-col flex-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-[11px] text-neutral-500 uppercase tracking-wider mb-1">
          <span>{product.subcategory || product.category}</span>
          <div className="flex items-center gap-1 text-neutral-700">
            <Star className="w-3 h-3 fill-neutral-900 stroke-neutral-900" />
            <span className="font-semibold text-[11px]">{product.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="text-[13px] sm:text-[14px] font-medium text-neutral-900 line-clamp-1 tracking-tight group-hover:text-neutral-600 transition-colors">
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="text-[14px] sm:text-[15px] font-bold text-black tracking-tight">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-[12px] text-neutral-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Color swatches preview */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2.5">
            {product.colors.slice(0, 4).map((c, i) => (
              <span
                key={i}
                title={c.name}
                className="w-2.5 h-2.5 rounded-full border border-neutral-300 shadow-2xs"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-neutral-400 font-mono">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Mobile Quick Add Button */}
        <div className="mt-3 sm:hidden">
          <button
            id={`mobile-quick-add-${product.id}`}
            type="button"
            onClick={handleQuickAdd}
            className="w-full bg-neutral-900 active:bg-black text-white text-[11px] font-medium tracking-wider uppercase py-2 transition-colors"
          >
            ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  );
};
