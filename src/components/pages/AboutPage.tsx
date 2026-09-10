import React from 'react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { PageView } from '../../types';
import { EDITORIAL_BANNER_ASSET } from '../../data/products';
import { ArrowRight, Feather, HeartHandshake, Recycle } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: PageView) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div id="about-page-wrapper" className="bg-white min-h-screen select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <Breadcrumbs items={[{ label: 'Our Story' }]} onNavigate={onNavigate} />

        {/* Hero Header */}
        <div className="py-12 sm:py-16 text-center max-w-3xl mx-auto">
          <span className="text-[11px] font-bold tracking-[0.28em] uppercase text-neutral-400 block mb-3">
            ABOUT GAZU
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-neutral-900 font-['Syne',sans-serif] leading-tight mb-6">
            MODERN FASHION<br />FOR EVERYDAY LIFE.
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
            We believe fashion should feel effortless, personal, and modern. Built on the belief that everyday clothing deserves thoughtful craftsmanship, fluid architecture, and enduring minimalism.
          </p>
        </div>

        {/* Visual Editorial Spread */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-neutral-100 mb-16 border border-neutral-200">
          <img
            src={EDITORIAL_BANNER_ASSET}
            alt="GAZU Atelier and Design Process"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter contrast-105"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-6 left-6 text-white text-xs tracking-widest uppercase font-semibold">
            THE GAZU ATELIER • EST. 2026
          </div>
        </div>

        {/* Three Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 bg-[#FAF9F7] border border-neutral-200">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black border border-neutral-200 mb-4">
              <Feather className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-neutral-900 mb-2">
              MINIMAL DESIGN
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Clean lines, purposeful details, and absence of visual clutter. We calibrate each silhouette so that the wearer’s natural presence always takes center stage.
            </p>
          </div>

          <div className="p-8 bg-[#FAF9F7] border border-neutral-200">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black border border-neutral-200 mb-4">
              <HeartHandshake className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-neutral-900 mb-2">
              EVERYDAY COMFORT
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              High-quality combed organic cottons, bi-stretch linens, and structured French terry weaves made to wear with total freedom from dawn through evening.
            </p>
          </div>

          <div className="p-8 bg-[#FAF9F7] border border-neutral-200">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black border border-neutral-200 mb-4">
              <Recycle className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-neutral-900 mb-2">
              SUSTAINABLE APPROACH
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Thoughtful limited batch production, low-impact botanical dyes, and 100% plastic-free recyclable paper packaging on all shipments.
            </p>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="bg-black text-white p-10 sm:p-14 text-center max-w-4xl mx-auto">
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-neutral-400 block mb-2">
            DISCOVER THE WARDROBE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-4 font-['Syne',sans-serif]">
            EXPERIENCE THE GAZU AESTHETIC
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto mb-8 font-light leading-relaxed">
            Engineered silhouettes, understated neutrals, and modern proportions across Men, Women, and Kids.
          </p>
          <button
            type="button"
            onClick={() => onNavigate({ type: 'category', category: 'MEN' })}
            className="bg-white text-black px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] hover:bg-neutral-200 transition-colors inline-flex items-center gap-2"
          >
            <span>SHOP THE COLLECTION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
