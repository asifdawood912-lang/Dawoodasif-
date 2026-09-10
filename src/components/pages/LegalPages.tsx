import React from 'react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { PageView } from '../../types';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onNavigate: (view: PageView) => void;
}

export const LegalPages: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'PRIVACY POLICY' : 'TERMS & CONDITIONS';
  const lastUpdated = 'February 24, 2026';

  return (
    <div id="legal-page-wrapper" className="bg-white min-h-screen select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <Breadcrumbs items={[{ label: title }]} onNavigate={onNavigate} />

        <div className="py-8 sm:py-12 border-b border-neutral-200 mb-8">
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-neutral-400 block mb-1">
            LEGAL COMPLIANCE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-neutral-900 font-['Syne',sans-serif]">
            {title}
          </h1>
          <p className="text-xs text-neutral-500 mt-2">
            Effective Date: {lastUpdated} • GAZU India Apparel Private Limited
          </p>
        </div>

        <div className="prose prose-neutral max-w-none text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-6">
          {isPrivacy ? (
            <>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-black mb-2">
                  1. Information We Collect
                </h2>
                <p>
                  At GAZU, we respect your confidentiality. We collect personal identification details (name, email address, contact number, shipping destination) purely for fulfillment purposes, transactional order updates, and optional newsletter subscriptions.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-black mb-2">
                  2. Payment Security
                </h2>
                <p>
                  We do not retain, store, or sell your credit/debit card numbers or bank credentials. All financial gateways are handled through PCI-DSS Level 1 compliant aggregators with 256-bit encryption.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-black mb-2">
                  3. Cookies & Session Storage
                </h2>
                <p>
                  We utilize cookies strictly to remember your bag selections, currency preferences, and active authentication session. You can manage or disable cookie preferences in your browser at any time.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-black mb-2">
                  1. Agreement to Terms
                </h2>
                <p>
                  By accessing or purchasing from the GAZU digital platform, you agree to be bound by these Terms and Conditions. If you do not accept these provisions, please refrain from using the platform.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-black mb-2">
                  2. Product Availability & Pricing
                </h2>
                <p>
                  All products are subject to stock availability. We reserve the right to limit order quantities or withdraw styles from the catalogue without prior notice. Prices are subject to revision but will always be transparently declared before order checkout.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-black mb-2">
                  3. Intellectual Property
                </h2>
                <p>
                  All graphic designs, editorial photography, brand trademarks, copy, typography, and website interface layouts are the exclusive property of GAZU. Unauthorized commercial reproduction is strictly prohibited.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
