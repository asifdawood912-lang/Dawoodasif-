import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Send, Check } from 'lucide-react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { PageView } from '../../types';
import { useToast } from '../../context/ToastContext';

interface ContactPageProps {
  onNavigate: (view: PageView) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Order & Shipping Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill all required fields', 'info');
      return;
    }
    setSubmitted(true);
    showToast('Message dispatched! Our concierge will respond within 4 hours.', 'success');
    setForm({ name: '', email: '', subject: 'Order & Shipping Inquiry', message: '' });
  };

  return (
    <div id="contact-page-wrapper" className="bg-white min-h-screen select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <Breadcrumbs items={[{ label: 'Contact Us' }]} onNavigate={onNavigate} />

        <div className="py-8 sm:py-12 border-b border-neutral-200 mb-12">
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-neutral-400 block mb-1">
            CLIENT CONCIERGE
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-neutral-900 font-['Syne',sans-serif]">
            GET IN TOUCH
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-lg">
            Have questions about styling, fits, order logistics, or bulk studio inquiries? Our customer experience team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: CONTACT CARDS & INFO */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-[#FAF9F7] border border-neutral-200 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    EMAIL CONCIERGE
                  </h3>
                  <a
                    href="mailto:support@gazu.fashion"
                    className="text-xs text-neutral-600 hover:text-black hover:underline mt-0.5 block"
                  >
                    support@gazu.fashion
                  </a>
                  <span className="text-[11px] text-neutral-400 block mt-0.5">
                    Guaranteed response within 4 hours
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-neutral-200/80">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    PHONE & WHATSAPP
                  </h3>
                  <a
                    href="tel:+918001234567"
                    className="text-xs text-neutral-600 hover:text-black hover:underline mt-0.5 block"
                  >
                    +91 800 123 4567
                  </a>
                  <span className="text-[11px] text-neutral-400 block mt-0.5">
                    Toll-free across India
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-neutral-200/80">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    HOURS OF OPERATION
                  </h3>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Monday - Saturday, 9:00 AM - 8:00 PM IST
                  </p>
                  <span className="text-[11px] text-neutral-400 block mt-0.5">
                    Sundays reserved for warehouse dispatch
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-neutral-200/80">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    FLAGSHIP STUDIO
                  </h3>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    GAZU Atelier, 100 Ft Road, Indiranagar, Bengaluru, KA 560038
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: MESSAGE FORM */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 p-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-neutral-900 pb-3 border-b border-neutral-200 mb-6">
              SEND A MESSAGE
            </h2>

            {submitted ? (
              <div className="text-center py-12 bg-emerald-50/50 border border-emerald-200 p-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-900 mb-1">
                  Message Sent Successfully
                </h3>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto mb-4">
                  Thank you for reaching out. We have logged ticket #{Math.floor(1000 + Math.random() * 9000)} and will reply shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold uppercase tracking-wider text-emerald-900 underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      placeholder="e.g. Maya Roy"
                      className="w-full border border-neutral-300 p-3 text-black focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      placeholder="maya@example.com"
                      className="w-full border border-neutral-300 p-3 text-black focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-neutral-300 p-3 text-black focus:outline-none focus:border-black bg-white cursor-pointer"
                  >
                    <option>Order & Shipping Inquiry</option>
                    <option>Returns & Exchanges</option>
                    <option>Product Sizing & Fit Guidance</option>
                    <option>Wholesale & Press Relations</option>
                    <option>Other General Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Message Details *
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    placeholder="Tell us how we can assist you..."
                    className="w-full border border-neutral-300 p-3 text-black focus:outline-none focus:border-black resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3.5 text-xs font-bold tracking-[0.18em] uppercase hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>SEND MESSAGE</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
