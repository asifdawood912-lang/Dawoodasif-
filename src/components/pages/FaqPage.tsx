import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { PageView } from '../../types';

interface FaqPageProps {
  onNavigate: (view: PageView) => void;
}

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_DATA: { category: string; questions: FaqItem[] }[] = [
  {
    category: 'ORDERS & PAYMENT',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major UPI applications (Google Pay, PhonePe, Paytm, CRED), Visa, MasterCard, RuPay debit & credit cards, Net Banking across 40+ Indian banks, and Cash on Delivery (COD).'
      },
      {
        q: 'Can I cancel or modify my order after placing it?',
        a: 'Orders can be modified or cancelled within 2 hours of placement directly from your Account order history or by reaching out to support@gazu.fashion with your Order ID.'
      },
      {
        q: 'Do you charge sales tax or GST separately?',
        a: 'No. All prices listed on GAZU are completely all-inclusive of 12% or 5% apparel GST. The price you see on the product page is the final product amount.'
      }
    ]
  },
  {
    category: 'SHIPPING & DELIVERY',
    questions: [
      {
        q: 'How long does delivery take?',
        a: 'Standard deliveries arrive in 2–4 business days across tier-1 cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata). For other locations, allow 3–5 business days. We also offer Express Next-Day delivery at checkout.'
      },
      {
        q: 'What are the delivery charges?',
        a: 'Orders above ₹999 qualify for complimentary FREE DELIVERY nationwide. Orders below ₹999 incur a nominal flat shipping fee of ₹99.'
      },
      {
        q: 'How can I track my shipment?',
        a: 'As soon as your order leaves our fulfillment center, you will receive an SMS and email notification with an active tracking link. You can also monitor real-time tracking in your GAZU Account under "My Orders".'
      }
    ]
  },
  {
    category: 'RETURNS & EXCHANGES',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer an easy 15-day return and size exchange window from the delivery date. Items must be unwashed, unworn, and accompanied by the original tags and security cord.'
      },
      {
        q: 'How are refunds credited?',
        a: 'Prepaid orders are refunded back to the original payment source (bank account / UPI / credit card) within 48 hours of inspection at our warehouse. COD orders are refunded via direct bank transfer or UPI ID provided by the customer.'
      },
      {
        q: 'Are returns free of cost?',
        a: 'Yes! We arrange complimentary doorstep reverse pickup for all approved return requests.'
      }
    ]
  },
  {
    category: 'SIZING & FABRICS',
    questions: [
      {
        q: 'How do GAZU garments fit?',
        a: 'Our silhouettes are designed with a relaxed, modern drape. If you prefer a tailored fit, choose your regular size. If you want an exaggerated streetwear slouch, we recommend going one size up.'
      },
      {
        q: 'How should I care for heavyweight cotton garments?',
        a: 'We recommend a gentle machine wash in cold water (30°C) with like colors. Turn garments inside out to protect fabric integrity. Do not bleach or tumble dry on high heat; line dry in shade.'
      }
    ]
  }
];

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({
    '0-0': true,
    '1-0': true
  });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCategories = FAQ_DATA.map((cat) => {
    const questions = cat.questions.filter(
      (item) =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, questions };
  }).filter((cat) => cat.questions.length > 0);

  return (
    <div id="faq-page-wrapper" className="bg-white min-h-screen select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <Breadcrumbs items={[{ label: 'FAQ' }]} onNavigate={onNavigate} />

        <div className="py-8 sm:py-12 text-center border-b border-neutral-200 mb-8">
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-neutral-400 block mb-1">
            CLIENT ASSISTANCE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-neutral-900 font-['Syne',sans-serif]">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-md mx-auto">
            Everything you need to know about purchasing, shipping, fabrications, and customer support.
          </p>

          {/* FAQ Search Bar */}
          <div className="relative max-w-md mx-auto mt-6">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g., returns, sizing, shipping)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-black text-black"
            />
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-10">
          {filteredCategories.map((cat, catIdx) => (
            <div key={cat.category} className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400 pb-1 border-b border-neutral-200">
                {cat.category}
              </h2>

              <div className="divide-y divide-neutral-200 border border-neutral-200 bg-white">
                {cat.questions.map((item, qIdx) => {
                  const key = `${catIdx}-${qIdx}`;
                  const isOpen = !!openItems[key];
                  return (
                    <div key={qIdx} className="p-4 sm:p-5">
                      <button
                        type="button"
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold uppercase tracking-wide text-neutral-900"
                      >
                        <span className="pr-4">{item.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                          {item.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
