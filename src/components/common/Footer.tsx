import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, Pin as Pinterest, ArrowRight, Check } from 'lucide-react';
import { PageView } from '../../types';
import { useToast } from '../../context/ToastContext';

interface FooterProps {
  onNavigate: (view: PageView) => void;
  onOpenSizeGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSizeGuide }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'info');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to GAZU drops & editorial updates!', 'success');
    setEmail('');
  };

  return (
    <footer id="main-footer" className="bg-black text-white pt-16 pb-12 border-t border-neutral-800 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP ROW: BRAND & NEWSLETTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-neutral-800/80">
          {/* Brand Intro */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-extrabold text-3xl sm:text-4xl tracking-[-0.04em] font-['Syne',sans-serif] block">
              GAZU
            </span>
            <p className="text-neutral-400 text-sm max-w-sm tracking-wide leading-relaxed">
              Modern fashion for every day. Modern, minimalist, premium everyday fashion for Men, Women and Kids.
            </p>
            <div className="pt-2 flex items-center gap-4 text-neutral-400">
              <a
                href="#instagram"
                aria-label="Instagram"
                onClick={(e) => { e.preventDefault(); showToast('Instagram @gazu.official'); }}
                className="hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5 stroke-[1.6]" />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                onClick={(e) => { e.preventDefault(); showToast('Facebook @gazu.fashion'); }}
                className="hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5 stroke-[1.6]" />
              </a>
              <a
                href="#pinterest"
                aria-label="Pinterest"
                onClick={(e) => { e.preventDefault(); showToast('Pinterest @gazu_looks'); }}
                className="hover:text-white transition-colors"
              >
                <Pinterest className="w-5 h-5 stroke-[1.6]" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                onClick={(e) => { e.preventDefault(); showToast('YouTube @gazu_films'); }}
                className="hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5 stroke-[1.6]" />
              </a>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 bg-neutral-950 p-6 sm:p-8 border border-neutral-800">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-1">
              NEWSLETTER
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
              STAY IN THE LOOP
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Sign up for new arrivals, exclusive drops and more.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                id="footer-newsletter-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 px-4 py-3 text-xs tracking-wider focus:outline-none focus:border-white transition-colors"
                required
              />
              <button
                id="footer-subscribe-btn"
                type="submit"
                className="bg-white text-black px-6 py-3 text-xs font-bold tracking-[0.14em] uppercase hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 group"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>SUBSCRIBED</span>
                  </>
                ) : (
                  <>
                    <span>SUBSCRIBE</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* MIDDLE ROW: FOUR NAV COLUMNS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-b border-neutral-800/80">
          {/* Column 1: SHOP */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-white mb-5">
              SHOP
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'category', category: 'MEN' })}
                  className="hover:text-white transition-colors"
                >
                  Men
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'category', category: 'WOMEN' })}
                  className="hover:text-white transition-colors"
                >
                  Women
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'category', category: 'KIDS' })}
                  className="hover:text-white transition-colors"
                >
                  Kids
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'category', category: 'BEAUTY' })}
                  className="hover:text-white transition-colors"
                >
                  Beauty
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'category', category: 'MEN' })}
                  className="hover:text-white transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'category', category: 'WOMEN' })}
                  className="hover:text-white transition-colors"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'category', category: 'MEN' })}
                  className="hover:text-white transition-colors text-amber-400"
                >
                  Sale
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: HELP */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-white mb-5">
              HELP
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'contact' })}
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'faq' })}
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'shipping-returns' })}
                  className="hover:text-white transition-colors"
                >
                  Shipping
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'shipping-returns' })}
                  className="hover:text-white transition-colors"
                >
                  Returns
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'account', tab: 'orders' })}
                  className="hover:text-white transition-colors"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenSizeGuide?.() || onNavigate({ type: 'faq' })}
                  className="hover:text-white transition-colors"
                >
                  Size Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: ABOUT */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-white mb-5">
              ABOUT
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'about' })}
                  className="hover:text-white transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'about' })}
                  className="hover:text-white transition-colors"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'about' })}
                  className="hover:text-white transition-colors"
                >
                  Sustainability
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'contact' })}
                  className="hover:text-white transition-colors"
                >
                  Store Locator
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: LEGAL */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-white mb-5">
              LEGAL
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'privacy' })}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'terms' })}
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'privacy' })}
                  className="hover:text-white transition-colors"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM ROW: COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 GAZU. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px] tracking-wider uppercase">
            <span>IN / INR (₹)</span>
            <span>SECURE 256-BIT ENCRYPTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
