import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  ArrowRight,
  Package
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { PageView, Order } from '../../types';

interface CheckoutPageProps {
  onNavigate: (view: PageView) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { cart, total, subtotal, deliveryFee, appliedCoupon, discountAmount, clearCart } = useCart();
  const { user, createOrder } = useAuth();
  const { showToast } = useToast();

  // Multi-step checkout states
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Form Fields
  const primaryAddress = user?.addresses?.[0];
  const [formData, setFormData] = useState({
    name: user?.name || 'Aarav Sharma',
    email: user?.email || 'aarav.sharma@example.com',
    phone: user?.phone || '+91 98765 43210',
    address: primaryAddress?.address || '42, Studio Residences, 5th Avenue, Indiranagar',
    apartment: primaryAddress?.apartment || 'Apt 4B',
    city: primaryAddress?.city || 'Bengaluru',
    state: primaryAddress?.state || 'Karnataka',
    pinCode: primaryAddress?.pinCode || '560038'
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('aarav@okaxis');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('•••');

  const expressSurcharge = deliveryMethod === 'express' ? 199 : 0;
  const finalTotal = total + expressSurcharge;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.address || !formData.city || !formData.pinCode) {
      showToast('Please fill all mandatory shipping fields', 'info');
      return;
    }
    setCurrentStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Your bag is empty', 'info');
      return;
    }

    const newOrder = createOrder({
      items: cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: item.price
      })),
      subtotal,
      deliveryFee: deliveryFee + expressSurcharge,
      discount: discountAmount,
      total: finalTotal,
      shippingAddress: {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        apartment: formData.apartment,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pinCode
      },
      deliveryMethod,
      paymentMethod
    });

    setPlacedOrder(newOrder);
    clearCart();
    showToast('Order confirmed! Confirmation sent to email.', 'success');
  };

  // Section 20: Order Confirmation View
  if (placedOrder) {
    return (
      <div id="order-confirmation-screen" className="bg-[#FAF9F7] min-h-screen py-16 px-4 sm:px-6 select-none">
        <div className="max-w-2xl mx-auto bg-white border border-neutral-200 p-8 sm:p-12 shadow-sm">
          <div className="text-center pb-8 border-b border-neutral-200">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-emerald-700 block mb-1">
              PAYMENT VERIFIED
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-900 font-['Syne',sans-serif]">
              THANK YOU FOR YOUR ORDER!
            </h1>
            <p className="text-xs text-neutral-500 mt-2">
              Order #{placedOrder.orderNumber || placedOrder.id} has been placed successfully and is being prepped.
            </p>
          </div>

          <div className="py-6 border-b border-neutral-200 space-y-4 text-xs">
            <div className="flex justify-between">
              <span className="text-neutral-500 uppercase tracking-wider">Estimated Delivery</span>
              <span className="font-bold text-neutral-900">
                {deliveryMethod === 'express' ? 'Tomorrow by 8:00 PM' : '3-4 Business Days'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500 uppercase tracking-wider">Payment Method</span>
              <span className="font-bold text-neutral-900 uppercase">{placedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500 uppercase tracking-wider">Shipping To</span>
              <span className="font-bold text-neutral-900 text-right max-w-[280px]">
                {placedOrder.shippingAddress.fullName}, {placedOrder.shippingAddress.address},{' '}
                {placedOrder.shippingAddress.city} - {placedOrder.shippingAddress.pinCode}
              </span>
            </div>
          </div>

          {/* Ordered items preview */}
          <div className="py-6 border-b border-neutral-200">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-900 mb-4">
              ORDERED ITEMS ({placedOrder.items.length})
            </h3>
            <div className="space-y-3">
              {placedOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-16 object-cover bg-neutral-100"
                  />
                  <div className="flex-1 text-xs">
                    <h4 className="font-bold text-neutral-900">{item.name}</h4>
                    <span className="text-neutral-500">
                      Qty: {item.quantity} • {item.size} • {item.color}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-neutral-900">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-between text-sm font-extrabold text-neutral-900">
              <span>Total Paid</span>
              <span>₹{placedOrder.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => onNavigate({ type: 'account', tab: 'orders' })}
              className="flex-1 bg-black text-white py-3.5 text-xs font-bold tracking-[0.16em] uppercase hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>VIEW YOUR ORDERS</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'home' })}
              className="flex-1 border border-neutral-300 py-3.5 text-xs font-bold tracking-[0.16em] uppercase hover:border-black transition-colors text-neutral-900 text-center"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Checkout Flow
  return (
    <div id="checkout-page-container" className="bg-[#FAF9F7] min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal Header */}
        <div className="flex items-center justify-between pb-8 border-b border-neutral-200 mb-8">
          <div
            onClick={() => onNavigate({ type: 'home' })}
            className="cursor-pointer font-extrabold text-2xl sm:text-3xl tracking-tight font-['Syne',sans-serif]"
          >
            GAZU
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-widest font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>ENCRYPTED SECURE CHECKOUT</span>
          </div>
        </div>

        {/* 3 Step Indicator */}
        <div className="flex items-center justify-center gap-3 sm:gap-8 mb-10 text-xs tracking-wider uppercase font-semibold">
          <div
            className={`flex items-center gap-2 ${
              currentStep >= 1 ? 'text-black' : 'text-neutral-400'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                currentStep >= 1 ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-600'
              }`}
            >
              1
            </span>
            <span className="hidden sm:inline">Address</span>
          </div>
          <div className="w-8 sm:w-16 h-[1px] bg-neutral-300" />
          <div
            className={`flex items-center gap-2 ${
              currentStep >= 2 ? 'text-black' : 'text-neutral-400'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                currentStep >= 2 ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-600'
              }`}
            >
              2
            </span>
            <span className="hidden sm:inline">Delivery</span>
          </div>
          <div className="w-8 sm:w-16 h-[1px] bg-neutral-300" />
          <div
            className={`flex items-center gap-2 ${
              currentStep >= 3 ? 'text-black' : 'text-neutral-400'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                currentStep >= 3 ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-600'
              }`}
            >
              3
            </span>
            <span className="hidden sm:inline">Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: STEP FORMS */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-neutral-200 shadow-xs">
            {/* STEP 1: SHIPPING ADDRESS */}
            {currentStep === 1 && (
              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div className="pb-3 border-b border-neutral-100">
                  <h2 className="text-sm font-bold tracking-[0.16em] uppercase text-neutral-900">
                    STEP 1: SHIPPING ADDRESS
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Where should we deliver your GAZU package?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-neutral-300 p-2.5 text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-neutral-300 p-2.5 text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-neutral-300 p-2.5 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Street Address / House No. *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-neutral-300 p-2.5 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Apartment / Suite / Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full border border-neutral-300 p-2.5 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-neutral-300 p-2.5 text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-neutral-300 p-2.5 text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-neutral-300 p-2.5 text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3.5 text-xs font-bold tracking-[0.18em] uppercase hover:bg-neutral-800 transition-colors mt-6 flex items-center justify-center gap-2"
                >
                  <span>CONTINUE TO DELIVERY</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 2: DELIVERY OPTIONS */}
            {currentStep === 2 && (
              <form onSubmit={handleStep2Submit} className="space-y-6">
                <div className="pb-3 border-b border-neutral-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold tracking-[0.16em] uppercase text-neutral-900">
                      STEP 2: DELIVERY SPEED
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Select how swiftly you'd like your order delivered.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-neutral-400 hover:text-black underline uppercase tracking-wider"
                  >
                    Edit Address
                  </button>
                </div>

                <div className="space-y-3">
                  <label
                    className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${
                      deliveryMethod === 'standard'
                        ? 'border-black bg-[#FAF9F7]'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'standard'}
                        onChange={() => setDeliveryMethod('standard')}
                        className="mt-1 accent-black"
                      />
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                          Standard Delivery (2-4 Business Days)
                        </span>
                        <span className="text-xs text-neutral-500">
                          Handled via our primary courier network with carbon-neutral transit.
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-neutral-900">
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </label>

                  <label
                    className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${
                      deliveryMethod === 'express'
                        ? 'border-black bg-[#FAF9F7]'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'express'}
                        onChange={() => setDeliveryMethod('express')}
                        className="mt-1 accent-black"
                      />
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                          Express Next-Day Delivery
                        </span>
                        <span className="text-xs text-neutral-500">
                          Priority dispatch. Guaranteed delivery within 24 hours.
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-neutral-900">
                      +₹199
                    </span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="w-1/3 border border-neutral-300 py-3.5 text-xs font-bold tracking-wider uppercase hover:border-black"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-black text-white py-3.5 text-xs font-bold tracking-[0.18em] uppercase hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>CONTINUE TO PAYMENT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: PAYMENT METHOD */}
            {currentStep === 3 && (
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="pb-3 border-b border-neutral-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold tracking-[0.16em] uppercase text-neutral-900">
                      STEP 3: SELECT PAYMENT METHOD
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      All transactions are protected by end-to-end 256-bit encryption.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs text-neutral-400 hover:text-black underline uppercase tracking-wider"
                  >
                    Change Delivery
                  </button>
                </div>

                {/* Method Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 border text-center flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-black bg-neutral-900 text-white'
                        : 'border-neutral-200 text-neutral-700 hover:border-black'
                    }`}
                  >
                    <QrCode className="w-5 h-5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 border text-center flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-black bg-neutral-900 text-white'
                        : 'border-neutral-200 text-neutral-700 hover:border-black'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">CARD</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 border text-center flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'border-black bg-neutral-900 text-white'
                        : 'border-neutral-200 text-neutral-700 hover:border-black'
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">NET BANKING</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 border text-center flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-black bg-neutral-900 text-white'
                        : 'border-neutral-200 text-neutral-700 hover:border-black'
                    }`}
                  >
                    <Banknote className="w-5 h-5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">CASH ON DEL</span>
                  </button>
                </div>

                {/* Sub-form based on selection */}
                {paymentMethod === 'upi' && (
                  <div className="p-4 bg-[#FAF9F7] border border-neutral-200 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                      Pay using UPI ID / VPA
                    </span>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@oksbi"
                      className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black focus:outline-none focus:border-black"
                    />
                    <div className="flex gap-2 text-[10px] uppercase tracking-wider text-neutral-500">
                      <span>Supported: Google Pay</span>
                      <span>•</span>
                      <span>PhonePe</span>
                      <span>•</span>
                      <span>Paytm</span>
                      <span>•</span>
                      <span>CRED</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="p-4 bg-[#FAF9F7] border border-neutral-200 space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black font-mono focus:outline-none focus:border-black"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                          Expiry MM/YY
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black font-mono focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black font-mono focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="p-4 bg-[#FAF9F7] border border-neutral-200 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                      Select Preferred Bank
                    </span>
                    <select className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black focus:outline-none focus:border-black">
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>State Bank of India (SBI)</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                    <span className="font-bold uppercase tracking-wider block">
                      Cash on Delivery Selected
                    </span>
                    <p>
                      You can pay via cash or UPI QR code at your doorstep upon courier arrival.
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-1/3 border border-neutral-300 py-3.5 text-xs font-bold tracking-wider uppercase hover:border-black"
                  >
                    BACK
                  </button>
                  <button
                    id="place-order-submit-btn"
                    type="submit"
                    className="w-2/3 bg-black text-white py-3.5 text-xs font-bold tracking-[0.18em] uppercase hover:bg-neutral-800 transition-colors shadow-md active:scale-98"
                  >
                    PLACE ORDER (₹{finalTotal.toLocaleString('en-IN')})
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT: ORDER SUMMARY PREVIEW */}
          <div className="lg:col-span-5 bg-white p-6 border border-neutral-200">
            <h3 className="text-xs font-bold tracking-[0.18em] uppercase text-neutral-900 pb-3 border-b border-neutral-200 mb-4">
              IN YOUR BAG ({cart.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>

            <div className="max-h-60 overflow-y-auto divide-y divide-neutral-100 pr-1 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-16 object-cover bg-neutral-100 shrink-0"
                  />
                  <div className="flex-1 text-xs">
                    <h4 className="font-bold text-neutral-900 line-clamp-1">{item.name}</h4>
                    <span className="text-[11px] text-neutral-500">
                      Qty: {item.quantity} • {item.size} • {item.color}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-neutral-900">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-3 border-t border-neutral-200 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span>
                  {deliveryFee === 0 && expressSurcharge === 0 ? (
                    <strong className="text-emerald-700">FREE</strong>
                  ) : (
                    `₹${deliveryFee + expressSurcharge}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-neutral-900 pt-3 border-t border-neutral-200">
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
