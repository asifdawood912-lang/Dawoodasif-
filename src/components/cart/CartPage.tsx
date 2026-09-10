import React, { useState } from 'react';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { PageView } from '../../types';

interface CartPageProps {
  onNavigate: (view: PageView) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    total,
    appliedCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    amountNeededForFreeDelivery
  } = useCart();

  const [couponCode, setCouponCode] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    applyCoupon(couponCode.trim());
    setCouponCode('');
  };

  const freeDeliveryProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  return (
    <div id="cart-page-wrapper" className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <Breadcrumbs items={[{ label: 'Shopping Bag' }]} onNavigate={onNavigate} />

        <div className="py-6 sm:py-8 border-b border-neutral-200 mb-8">
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-neutral-400 block mb-1">
            BAG REVIEW
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-neutral-900 font-['Syne',sans-serif]">
            YOUR SHOPPING BAG ({cart.reduce((acc, i) => acc + i.quantity, 0)})
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mx-auto mb-4 border border-neutral-200">
              <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
            </div>
            <h2 className="text-lg font-bold uppercase tracking-wider text-neutral-900 mb-2">
              YOUR BAG IS CURRENTLY EMPTY
            </h2>
            <p className="text-xs text-neutral-500 mb-8 leading-relaxed">
              Explore our latest seasonal arrivals and build your elevated wardrobe.
            </p>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'category', category: 'MEN' })}
              className="bg-black text-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] hover:bg-neutral-800 transition-colors inline-flex items-center gap-2"
            >
              <span>CONTINUE SHOPPING</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* LEFT: CART ITEMS & PROMO */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free delivery progress banner */}
              <div className="bg-[#FAF9F7] p-4 border border-neutral-200">
                <div className="flex items-center justify-between text-xs tracking-wider uppercase font-semibold text-neutral-800 mb-2">
                  {amountNeededForFreeDelivery === 0 ? (
                    <span className="text-emerald-700 font-bold">
                      ✓ You qualify for complimentary FREE DELIVERY!
                    </span>
                  ) : (
                    <span>
                      Add <strong>₹{amountNeededForFreeDelivery.toLocaleString('en-IN')}</strong> more for Free Delivery
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

              {/* Items List */}
              <div className="divide-y divide-neutral-200 border-y border-neutral-200">
                {cart.map((item) => (
                  <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    {/* Item Thumbnail */}
                    <div
                      className="w-24 h-32 bg-neutral-100 shrink-0 overflow-hidden cursor-pointer"
                      onClick={() => onNavigate({ type: 'product', productId: item.productId })}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Information */}
                    <div className="flex-1">
                      <h3
                        className="text-sm font-bold uppercase tracking-tight text-neutral-900 cursor-pointer hover:underline"
                        onClick={() => onNavigate({ type: 'product', productId: item.productId })}
                      >
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-neutral-500 uppercase tracking-wider mt-1 mb-3">
                        <span>Size: <strong className="text-neutral-900">{item.size}</strong></span>
                        <span>•</span>
                        <span>Color: <strong className="text-neutral-900">{item.color}</strong></span>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Stepper */}
                        <div className="flex items-center border border-neutral-300">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-xs text-neutral-600 hover:bg-neutral-100"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-xs text-neutral-600 hover:bg-neutral-100"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-neutral-400 hover:text-black uppercase tracking-wider flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right sm:self-center">
                      <span className="text-sm sm:text-base font-bold text-neutral-900">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      {item.quantity > 1 && (
                        <span className="block text-[11px] text-neutral-400">
                          (₹{item.price} each)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Coupon Form */}
              <div className="p-5 bg-neutral-50 border border-neutral-200">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-neutral-700" />
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    HAVE A PROMO CODE?
                  </span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 p-3">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-700" />
                      <span className="text-xs font-bold text-emerald-800 tracking-wider">
                        {appliedCoupon.code} APPLIED (-{appliedCoupon.discountPercent}%)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-neutral-500 hover:text-black underline font-semibold uppercase"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      id="cart-promo-input"
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Try GAZU10 or FIRST20"
                      className="flex-1 bg-white border border-neutral-300 px-3.5 py-2.5 text-xs uppercase tracking-wider text-black focus:outline-none focus:border-black placeholder-neutral-400"
                    />
                    <button
                      type="submit"
                      className="bg-black text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                    >
                      APPLY
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* RIGHT: ORDER SUMMARY (Section 18) */}
            <div className="lg:col-span-4 bg-[#FAF9F7] border border-neutral-200 p-6 sm:p-7 sticky top-28">
              <h2 className="text-xs font-bold tracking-[0.18em] uppercase text-neutral-900 pb-4 border-b border-neutral-200 mb-4">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3 text-xs tracking-wider">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span className="font-semibold">
                      -₹{discountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-600">
                  <span>Estimated Shipping</span>
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

                <div className="flex justify-between text-neutral-600">
                  <span>Estimated Tax</span>
                  <span className="text-neutral-500 font-normal">Included</span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-neutral-900 pt-4 border-t border-neutral-200">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                id="cart-page-checkout-btn"
                type="button"
                onClick={() => onNavigate({ type: 'checkout' })}
                className="w-full bg-black text-white py-4 text-xs font-bold tracking-[0.18em] uppercase hover:bg-neutral-800 transition-colors mt-6 flex items-center justify-center gap-2 group shadow-md active:scale-98"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-5 pt-4 border-t border-neutral-200/80 space-y-2 text-[10px] uppercase tracking-wider text-neutral-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-neutral-700 shrink-0" />
                  <span>256-bit encrypted secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>15 days hassle-free doorstep returns</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
