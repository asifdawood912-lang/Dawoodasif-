import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PageView } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  onNavigate: (view: PageView) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    total,
    freeShippingThreshold,
    amountNeededForFreeDelivery
  } = useCart();

  const handleCheckoutClick = () => {
    closeCart();
    onNavigate({ type: 'checkout' });
  };

  const freeDeliveryProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div id="cart-drawer-wrapper" className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={closeCart}
          />

          {/* Drawer Panel */}
          <motion.div
            id="cart-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: 'easeOut' }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
                <h2 className="text-sm font-bold tracking-[0.16em] uppercase text-black">
                  YOUR BAG ({cart.reduce((acc, i) => acc + i.quantity, 0)})
                </h2>
              </div>
              <button
                id="cart-drawer-close-btn"
                type="button"
                onClick={closeCart}
                className="p-1.5 text-neutral-400 hover:text-black transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Delivery Bar */}
            <div className="bg-[#FAF9F7] px-5 py-3 border-b border-neutral-200/60">
              <div className="flex items-center justify-between text-[11px] tracking-wider uppercase font-semibold text-neutral-800 mb-1.5">
                {amountNeededForFreeDelivery === 0 ? (
                  <span className="text-emerald-700 font-bold">
                    ✓ You've unlocked FREE DELIVERY!
                  </span>
                ) : (
                  <span>
                    Add <strong>₹{amountNeededForFreeDelivery.toLocaleString('en-IN')}</strong> more for FREE DELIVERY
                  </span>
                )}
                <span className="text-neutral-500 font-normal">₹999 GOAL</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-200 overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-300 ease-out"
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 text-neutral-400">
                  <ShoppingBag className="w-12 h-12 stroke-[1] text-neutral-300 mb-3" />
                  <p className="text-xs uppercase tracking-[0.16em] font-semibold text-neutral-800 mb-1">
                    Your bag is empty
                  </p>
                  <p className="text-xs text-neutral-500 max-w-[220px] mb-6">
                    Explore our latest seasonal collections and add your favorite pieces.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      closeCart();
                      onNavigate({ type: 'category', category: 'MEN' });
                    }}
                    className="bg-black text-white text-[11px] font-bold tracking-[0.14em] uppercase px-6 py-3 hover:bg-neutral-800 transition-colors"
                  >
                    START SHOPPING
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-neutral-100 last:border-b-0"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-20 h-26 bg-neutral-100 shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-xs font-semibold text-neutral-900 tracking-tight line-clamp-1">
                            {item.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-400 hover:text-black p-1 -mr-1"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-neutral-500 uppercase tracking-wider mt-1">
                          <span>Size: <strong className="text-neutral-900">{item.size}</strong></span>
                          <span>•</span>
                          <span>Color: <strong className="text-neutral-900">{item.color}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-neutral-300">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs text-neutral-600 hover:bg-neutral-100"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs text-neutral-600 hover:bg-neutral-100"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-xs font-bold text-neutral-900">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer / Summary */}
            {cart.length > 0 && (
              <div className="p-5 bg-[#FAF9F7] border-t border-neutral-200/80 space-y-3">
                {/* Cost Breakdown */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-neutral-900">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Estimated Delivery</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <strong className="text-emerald-700 uppercase font-semibold">
                          FREE
                        </strong>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                    <span>Total (Incl. Taxes)</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  id="cart-proceed-checkout-btn"
                  type="button"
                  onClick={handleCheckoutClick}
                  className="w-full bg-black text-white text-xs font-bold tracking-[0.16em] uppercase py-3.5 hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 group active:scale-98"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 uppercase tracking-widest pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                  <span>100% Secure Checkout & Easy 15-Day Returns</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
