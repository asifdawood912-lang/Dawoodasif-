import React from 'react';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { PageView } from '../../types';

interface WishlistPageProps {
  onNavigate: (view: PageView) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onNavigate }) => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveToBag = (productId: string) => {
    const item = PRODUCTS.find((p) => p.id === productId);
    if (!item) return;
    const defaultSize = item.sizes[0] || 'M';
    const defaultColor = item.colors[0]?.name || 'Standard';
    addToCart(item, defaultSize, defaultColor, 1);
    removeFromWishlist(productId);
  };

  return (
    <div id="wishlist-page-wrapper" className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <Breadcrumbs
          items={[{ label: 'Wishlist' }]}
          onNavigate={onNavigate}
        />

        {/* Title and Controls */}
        <div className="flex items-end justify-between py-6 sm:py-8 border-b border-neutral-200 mb-8">
          <div>
            <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-neutral-400 block mb-1">
              SAVED PIECES
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-neutral-900 font-['Syne',sans-serif]">
              MY WISHLIST ({wishlistedProducts.length})
            </h1>
          </div>

          {wishlistedProducts.length > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              className="text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-black underline pb-1"
            >
              Clear All
            </button>
          )}
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="text-center py-24 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mx-auto mb-4 border border-neutral-200">
              <Heart className="w-8 h-8 stroke-[1.2]" />
            </div>
            <h2 className="text-lg font-bold uppercase tracking-wider text-neutral-900 mb-2">
              YOUR WISHLIST IS EMPTY
            </h2>
            <p className="text-xs text-neutral-500 mb-8 leading-relaxed">
              Save your favorite items to keep track of seasonal drops, restocks, and exclusive styling edits.
            </p>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'category', category: 'MEN' })}
              className="bg-black text-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] hover:bg-neutral-800 transition-colors inline-flex items-center gap-2"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white border border-neutral-200/90 flex flex-col justify-between overflow-hidden"
              >
                {/* Product Card Media */}
                <div>
                  <div
                    className="relative aspect-[3/4] bg-neutral-100 overflow-hidden cursor-pointer"
                    onClick={() => onNavigate({ type: 'product', productId: product.id })}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(product.id);
                      }}
                      className="absolute top-2.5 right-2.5 p-2 bg-white/90 hover:bg-white text-neutral-400 hover:text-red-600 transition-colors shadow-xs"
                      title="Remove from wishlist"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-3.5">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block mb-0.5">
                      {product.category}
                    </span>
                    <h3
                      onClick={() => onNavigate({ type: 'product', productId: product.id })}
                      className="text-xs font-bold uppercase tracking-tight text-neutral-900 cursor-pointer hover:underline line-clamp-1 mb-1.5"
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-black">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-[11px] text-neutral-400 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Move to Bag Action */}
                <div className="p-3.5 pt-0">
                  <button
                    type="button"
                    onClick={() => handleMoveToBag(product.id)}
                    className="w-full bg-black text-white text-[11px] font-bold tracking-[0.14em] uppercase py-2.5 hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>MOVE TO BAG</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
