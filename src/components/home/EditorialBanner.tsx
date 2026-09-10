import React from 'react';
import { ArrowRight } from 'lucide-react';
import { EDITORIAL_BANNER_ASSET } from '../../data/products';
import { PageView } from '../../types';

interface EditorialBannerProps {
  onNavigate: (view: PageView) => void;
}

export const EditorialBanner: React.FC<EditorialBannerProps> = ({ onNavigate }) => {
  return (
    <section id="editorial-banner" className="relative w-full overflow-hidden bg-neutral-900 text-white select-none">
      <div className="relative min-h-[380px] sm:min-h-[440px] md:min-h-[500px] flex items-center">
        {/* Background Image */}
        <img
          src={EDITORIAL_BANNER_ASSET}
          alt="GAZU Editorial Lookbook"
          referrerPolicy="no-referrer"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-65 filter contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-xl">
            <span className="text-[11px] font-bold tracking-[0.26em] uppercase text-neutral-400 block mb-2">
              GAZU EDITORIAL
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight font-['Syne',sans-serif] mb-4">
              THE ART OF<br />MINIMALISM
            </h2>
            <p className="text-sm text-neutral-300 mb-8 leading-relaxed font-light">
              "We strip away the non-essential to reveal clothing that feels organic, weightless, and inherently personal."
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => onNavigate({ type: 'about' })}
                className="bg-white text-black px-7 py-3.5 text-xs font-bold tracking-[0.16em] uppercase hover:bg-neutral-200 transition-colors inline-flex items-center gap-2 group"
              >
                <span>OUR PHILOSOPHY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate({ type: 'category', category: 'MEN' })}
                className="bg-transparent border border-white text-white px-7 py-3.5 text-xs font-bold tracking-[0.16em] uppercase hover:bg-white hover:text-black transition-colors"
              >
                SHOP NEW IN
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
