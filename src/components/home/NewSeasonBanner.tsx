import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageView } from '../../types';
import { NEW_SEASON_ASSET } from '../../data/products';

interface NewSeasonBannerProps {
  onNavigate: (view: PageView) => void;
}

export const NewSeasonBanner: React.FC<NewSeasonBannerProps> = ({ onNavigate }) => {
  return (
    <section id="new-season-banner" className="bg-[#EAE8E3] py-16 sm:py-20 border-b border-neutral-300/70 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F2F1EC] border border-neutral-300/80 p-8 sm:p-12 shadow-sm">
          {/* Left Text */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-neutral-500 mb-2">
              NEW SEASON
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-[-0.03em] text-neutral-900 leading-[0.95] font-['Syne',sans-serif] mb-4">
              NEW<br />VIBES
            </h2>
            <div className="w-12 h-[2px] bg-black mb-5" />
            <p className="text-sm sm:text-base text-neutral-600 max-w-sm mb-8 leading-relaxed font-normal">
              Discover everything new and now. Crafted with timeless monochrome precision, tailored drape, and all-day ease.
            </p>
            <div>
              <button
                id="new-season-explore-btn"
                type="button"
                onClick={() => onNavigate({ type: 'category', category: 'WOMEN' })}
                className="bg-black text-white px-8 py-4 text-xs font-bold tracking-[0.18em] uppercase hover:bg-neutral-800 transition-all shadow-md active:scale-98 inline-flex items-center gap-2 group"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-[4/3] sm:aspect-[16/11] overflow-hidden shadow-xl border border-neutral-300 bg-[#E0DED8] group">
              <img
                src={NEW_SEASON_ASSET}
                alt="GAZU New Season Campaign"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-black">
                LIMITED DROP
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
