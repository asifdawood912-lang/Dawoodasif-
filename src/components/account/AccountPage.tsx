import React, { useState } from 'react';
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Plus,
  Truck,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { PageView, ShippingAddress } from '../../types';

interface AccountPageProps {
  initialTab?: 'profile' | 'orders' | 'wishlist' | 'addresses' | 'payments';
  onNavigate: (view: PageView) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  initialTab = 'profile',
  onNavigate
}) => {
  const { user, isLoggedIn, orders, login, register, logout, savedAddresses, addAddress, deleteAddress } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>(
    initialTab === 'orders' ? 'orders' : initialTab === 'addresses' ? 'addresses' : 'profile'
  );

  // Auth toggle when logged out
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');

  // Address editing
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState<ShippingAddress>({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pinCode: ''
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail) {
      showToast('Please enter your email', 'info');
      return;
    }
    login(authEmail);
    showToast(`Welcome back, ${authEmail.split('@')[0]}!`, 'success');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authName) {
      showToast('Please enter your name and email', 'info');
      return;
    }
    register(authName, authEmail, authPhone || '+91 98765 43210');
    showToast(`Account created successfully for ${authName}!`, 'success');
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.fullName || !addressForm.address || !addressForm.city || !addressForm.pinCode) {
      showToast('Please fill required address details', 'info');
      return;
    }
    addAddress(addressForm);
    setIsAddingAddress(false);
    setAddressForm({
      fullName: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      pinCode: ''
    });
  };

  if (!isLoggedIn) {
    return (
      <div id="auth-page-wrapper" className="bg-[#FAF9F7] min-h-screen py-16 px-4 sm:px-6 select-none">
        <div className="max-w-md mx-auto bg-white border border-neutral-200 p-8 shadow-xs">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="font-extrabold text-2xl tracking-tight font-['Syne',sans-serif] block mb-2">
              GAZU
            </span>
            <div className="flex border-b border-neutral-200 mt-6">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`flex-1 pb-3 text-xs font-bold tracking-[0.16em] uppercase transition-colors ${
                  authMode === 'login'
                    ? 'border-b-2 border-black text-black'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                SIGN IN
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`flex-1 pb-3 text-xs font-bold tracking-[0.16em] uppercase transition-colors ${
                  authMode === 'register'
                    ? 'border-b-2 border-black text-black'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                CREATE ACCOUNT
              </button>
            </div>
          </div>

          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full border border-neutral-300 p-3 text-xs text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => showToast('Password reset instructions dispatched')}
                    className="text-[10px] text-neutral-500 hover:text-black underline uppercase"
                  >
                    Forgot?
                  </button>
                </div>
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-neutral-300 p-3 text-xs text-black focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3.5 text-xs font-bold tracking-[0.18em] uppercase hover:bg-neutral-800 transition-colors mt-4"
              >
                SIGN IN
              </button>

              <div className="pt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    login('aarav.sharma@example.com', 'Aarav Sharma');
                  }}
                  className="text-xs text-neutral-500 hover:text-black underline uppercase tracking-wider"
                >
                  Quick Sign-In with Demo Profile
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  placeholder="e.g. Maya Roy"
                  required
                  className="w-full border border-neutral-300 p-3 text-xs text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full border border-neutral-300 p-3 text-xs text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={authPhone}
                  onChange={(e) => setAuthPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full border border-neutral-300 p-3 text-xs text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Create Password
                </label>
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-neutral-300 p-3 text-xs text-black focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3.5 text-xs font-bold tracking-[0.18em] uppercase hover:bg-neutral-800 transition-colors mt-4"
              >
                CREATE ACCOUNT
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Logged-in Account View
  return (
    <div id="account-page-wrapper" className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <Breadcrumbs items={[{ label: 'My Account' }]} onNavigate={onNavigate} />

        <div className="py-6 sm:py-8 border-b border-neutral-200 mb-8">
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-neutral-400 block mb-1">
            CLIENT PORTAL
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-neutral-900 font-['Syne',sans-serif]">
            WELCOME, {user?.name.toUpperCase()}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDEBAR NAVIGATION */}
          <aside className="lg:col-span-3 bg-[#FAF9F7] border border-neutral-200 p-4 space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'profile'
                  ? 'bg-black text-white'
                  : 'text-neutral-700 hover:bg-neutral-200/60'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile Details</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'orders'
                  ? 'bg-black text-white'
                  : 'text-neutral-700 hover:bg-neutral-200/60'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>My Orders ({orders.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-black text-white'
                  : 'text-neutral-700 hover:bg-neutral-200/60'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses ({savedAddresses.length})</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate({ type: 'wishlist' })}
              className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-3 text-neutral-700 hover:bg-neutral-200/60 transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist</span>
            </button>

            <div className="pt-4 border-t border-neutral-200">
              <button
                type="button"
                onClick={logout}
                className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-3 text-neutral-400 hover:text-black transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>

          {/* RIGHT MAIN CONTENT AREA */}
          <main className="lg:col-span-9 bg-white border border-neutral-200 p-6 sm:p-8">
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-neutral-900 pb-3 border-b border-neutral-200">
                  PERSONAL INFORMATION
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div>
                    <span className="text-neutral-400 uppercase tracking-wider block mb-1">
                      Full Name
                    </span>
                    <p className="font-bold text-neutral-900 text-sm">{user?.name}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 uppercase tracking-wider block mb-1">
                      Email Address
                    </span>
                    <p className="font-bold text-neutral-900 text-sm">{user?.email}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 uppercase tracking-wider block mb-1">
                      Phone Number
                    </span>
                    <p className="font-bold text-neutral-900 text-sm">{user?.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 uppercase tracking-wider block mb-1">
                      Member Since
                    </span>
                    <p className="font-bold text-neutral-900 text-sm">January 2026</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-2">
                    GAZU LOYALTY CLUB
                  </span>
                  <div className="p-4 bg-[#FAF9F7] border border-neutral-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-black uppercase">
                        TIER: EDITORIAL BLACK
                      </span>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Complimentary express shipping & private early-access on all season drops.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-neutral-900 bg-white px-3 py-1.5 border border-neutral-300">
                      ACTIVE
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-neutral-900 pb-3 border-b border-neutral-200">
                  ORDER HISTORY ({orders.length})
                </h2>

                {orders.length === 0 ? (
                  <div className="text-center py-16 text-neutral-400">
                    <Package className="w-12 h-12 stroke-[1] mx-auto mb-3" />
                    <p className="text-xs uppercase tracking-wider font-semibold text-neutral-800">
                      No orders placed yet
                    </p>
                    <p className="text-xs text-neutral-500 mt-1 mb-6">
                      Explore our collections and make your first order.
                    </p>
                    <button
                      type="button"
                      onClick={() => onNavigate({ type: 'category', category: 'MEN' })}
                      className="bg-black text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider"
                    >
                      SHOP NOW
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-neutral-200 p-5 space-y-4 bg-white hover:border-neutral-400 transition-colors"
                      >
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100 text-xs">
                          <div>
                            <span className="font-bold text-neutral-900 block text-sm">
                              ORDER #{order.orderNumber || order.id}
                            </span>
                            <span className="text-neutral-500">{order.date}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-black text-sm">
                              ₹{order.total.toLocaleString('en-IN')}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 ${
                                order.status === 'Delivered'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>

                        {/* Items Preview */}
                        <div className="space-y-2.5">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-xs">
                              <img
                                src={item.image}
                                alt={item.name}
                                referrerPolicy="no-referrer"
                                className="w-10 h-14 object-cover bg-neutral-100"
                              />
                              <div className="flex-1">
                                <h4 className="font-bold text-neutral-900">{item.name}</h4>
                                <span className="text-neutral-500">
                                  Qty: {item.quantity} • Size: {item.size} • Color: {item.color}
                                </span>
                              </div>
                              <span className="font-semibold text-neutral-900">
                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Actions */}
                        <div className="pt-3 border-t border-neutral-100 flex flex-wrap gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() =>
                              showToast(`Order #${order.orderNumber || order.id} is currently in transit with BlueDart.`)
                            }
                            className="bg-neutral-100 hover:bg-black hover:text-white px-4 py-2 font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Track Package</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              showToast(`Downloading Tax Invoice for Order #${order.orderNumber || order.id}`)
                            }
                            className="border border-neutral-300 hover:border-black px-4 py-2 font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Download Invoice</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SAVED ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                  <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-neutral-900">
                    SAVED DELIVERY ADDRESSES ({savedAddresses.length})
                  </h2>
                  {!isAddingAddress && (
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(true)}
                      className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1 hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Address</span>
                    </button>
                  )}
                </div>

                {isAddingAddress ? (
                  <form onSubmit={handleSaveAddress} className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={addressForm.fullName}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, fullName: e.target.value })
                          }
                          required
                          className="w-full border border-neutral-300 p-2.5 text-black focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="text"
                          value={addressForm.phone}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, phone: e.target.value })
                          }
                          required
                          className="w-full border border-neutral-300 p-2.5 text-black focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                        Street Address / Building *
                      </label>
                      <input
                        type="text"
                        value={addressForm.address}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, address: e.target.value })
                        }
                        required
                        className="w-full border border-neutral-300 p-2.5 text-black focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                        Apartment / Suite (Optional)
                      </label>
                      <input
                        type="text"
                        value={addressForm.apartment}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, apartment: e.target.value })
                        }
                        className="w-full border border-neutral-300 p-2.5 text-black focus:outline-none focus:border-black"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          value={addressForm.city}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, city: e.target.value })
                          }
                          required
                          className="w-full border border-neutral-300 p-2.5 text-black focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          value={addressForm.state}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, state: e.target.value })
                          }
                          required
                          className="w-full border border-neutral-300 p-2.5 text-black focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          value={addressForm.pinCode}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, pinCode: e.target.value })
                          }
                          required
                          className="w-full border border-neutral-300 p-2.5 text-black focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="px-5 py-2.5 border border-neutral-300 uppercase tracking-wider font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-black text-white uppercase tracking-wider font-bold hover:bg-neutral-800"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {savedAddresses.map((addr, idx) => (
                      <div key={idx} className="p-5 border border-neutral-200 bg-[#FAF9F7] space-y-2 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-black">
                            {addr.fullName}
                          </span>
                          {idx === 0 && (
                            <span className="text-[10px] font-bold bg-neutral-200 px-2 py-0.5 text-neutral-800">
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-700 leading-relaxed">
                          {addr.address}
                          {addr.apartment && `, ${addr.apartment}`}
                          <br />
                          {addr.city}, {addr.state} - {addr.pinCode}
                          <br />
                          {addr.phone}
                        </p>
                        <div className="pt-2 border-t border-neutral-200/60 flex justify-end">
                          <button
                            type="button"
                            onClick={() => deleteAddress(idx)}
                            className="text-[11px] text-neutral-400 hover:text-red-600 uppercase tracking-wider"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
