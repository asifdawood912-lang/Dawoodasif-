import React from 'react';
import { Truck, RotateCcw, PackageCheck, AlertCircle } from 'lucide-react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { PageView } from '../../types';

interface ShippingReturnsPageProps {
  onNavigate: (view: PageView) => void;
}

export const ShippingReturnsPage: React.FC<ShippingReturnsPageProps> = ({ onNavigate }) => {
  return (
    <div id="shipping-returns-wrapper" className="bg-white min-h-screen select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <Breadcrumbs items={[{ label: 'Shipping & Returns' }]} onNavigate={onNavigate} />

        <div className="py-8 sm:py-12 border-b border-neutral-200 mb-10 text-center">
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-neutral-400 block mb-1">
            CLIENT POLICIES
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-neutral-900 font-['Syne',sans-serif]">
            SHIPPING & RETURNS
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-lg mx-auto">
            Transparent timelines, complimentary returns, and insured carbon-neutral fulfillment across India.
          </p>
        </div>

        <div className="space-y-12">
          {/* Shipping Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-neutral-900">
                SHIPPING TIMELINES & CHARGES
              </h2>
            </div>

            <div className="border border-neutral-200 divide-y divide-neutral-200 text-xs">
              <div className="p-4 sm:p-5 flex justify-between items-center bg-[#FAF9F7]">
                <div>
                  <h3 className="font-bold text-neutral-900 uppercase">
                    COMPLIMENTARY STANDARD DELIVERY (ORDERS &gt; ₹999)
                  </h3>
                  <p className="text-neutral-500 mt-0.5">
                    2–4 business days delivery in metro cities. 3–5 days across rest of India.
                  </p>
                </div>
                <span className="font-bold text-emerald-700 text-sm">FREE</span>
              </div>

              <div className="p-4 sm:p-5 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-neutral-900 uppercase">
                    STANDARD DELIVERY (ORDERS &lt; ₹999)
                  </h3>
                  <p className="text-neutral-500 mt-0.5">
                    Standard insured ground transit.
                  </p>
                </div>
                <span className="font-bold text-neutral-900 text-sm">₹99</span>
              </div>

              <div className="p-4 sm:p-5 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-neutral-900 uppercase">
                    EXPRESS NEXT-DAY AIR DISPATCH
                  </h3>
                  <p className="text-neutral-500 mt-0.5">
                    Priority flight handling with guaranteed arrival within 24 hours.
                  </p>
                </div>
                <span className="font-bold text-neutral-900 text-sm">₹199</span>
              </div>
            </div>
          </section>

          {/* Returns Policy Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                <RotateCcw className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-neutral-900">
                15-DAY DOORSTEP RETURNS & EXCHANGES
              </h2>
            </div>

            <div className="p-6 bg-[#FAF9F7] border border-neutral-200 text-xs leading-relaxed space-y-4 text-neutral-700">
              <p>
                We want you to love your GAZU pieces. If the fit isn't right or you've reconsidered your selection, we happily accept returns and size exchanges within <strong>15 days</strong> of order receipt.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white p-4 border border-neutral-200">
                  <span className="font-bold uppercase tracking-wider text-neutral-900 block mb-1">
                    1. INITIATE REQUEST
                  </span>
                  <p className="text-[11px] text-neutral-500">
                    Log in to your Account &gt; My Orders and click "Return / Exchange".
                  </p>
                </div>

                <div className="bg-white p-4 border border-neutral-200">
                  <span className="font-bold uppercase tracking-wider text-neutral-900 block mb-1">
                    2. DOORSTEP PICKUP
                  </span>
                  <p className="text-[11px] text-neutral-500">
                    Our courier will arrive within 24–48 hours to collect the boxed garment.
                  </p>
                </div>

                <div className="bg-white p-4 border border-neutral-200">
                  <span className="font-bold uppercase tracking-wider text-neutral-900 block mb-1">
                    3. INSTANT REFUND
                  </span>
                  <p className="text-[11px] text-neutral-500">
                    Refund is triggered to your original payment method within 48 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-neutral-100 border border-neutral-200 flex items-start gap-3 text-xs text-neutral-700">
              <AlertCircle className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
              <p>
                Please note that items must be returned unwashed, unworn, without cologne or deodorant marks, and with original GAZU swing tags intact. For hygiene reasons, undergarments and beauty formulations cannot be returned once unsealed.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
