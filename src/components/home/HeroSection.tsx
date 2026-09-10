import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageView } from '../../types';
import { HERO_ASSET } from '../../data/products';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onNavigate: (view: PageView) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section
      id="hero-section"
      className="relative w-full bg-[#EBE9E4] overflow-hidden min-h-[72vh] md:min-h-[78vh] lg:min-h-[82vh] flex items-center border-b border-neutral-300/60 select-none"
    >
      {/* MASSIVE BACKGROUND TYPOGRAPHY BEHIND MODEL */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <span className="font-extrabold text-[22vw] md:text-[25vw] lg:text-[27vw] tracking-[-0.06em] text-neutral-300/80 uppercase font-['Syne',sans-serif] leading-none select-none translate-y-2 md:translate-y-0">
          GAZU
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 py-10 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* LEFT EDITORIAL TEXT & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 text-left"
          >
            {/* Small uppercase manifesto */}
            <div className="mb-4">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.24em] uppercase text-neutral-500 block mb-1">
                SEASON LOOKBOOK 26
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-[-0.03em] uppercase text-neutral-900 leading-[1.04] font-['Syne',sans-serif]">
                FASHION<br />
                THAT MOVES<br />
                WITH YOU.
              </h1>
            </div>

            {/* Thin Horizontal Line */}
            <div className="w-16 h-[1.5px] bg-neutral-900 my-4 sm:my-6" />

            <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mb-6 leading-relaxed">
              Architectural silhouettes, premium heavyweight organic fabrics, and fluid cuts engineered for modern daily life.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                id="hero-shop-now-btn"
                type="button"
                onClick={() => onNavigate({ type: 'category', category: 'MEN' })}
                className="bg-black text-white px-7 py-3.5 text-xs font-bold tracking-[0.18em] uppercase hover:bg-neutral-800 transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 group"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-new-btn"
                type="button"
                onClick={() => onNavigate({ type: 'category', category: 'WOMEN' })}
                className="bg-transparent border border-black text-neutral-900 px-7 py-3.5 text-xs font-bold tracking-[0.18em] uppercase hover:bg-black hover:text-white transition-all active:scale-98 text-center"
              >
                EXPLORE NEW IN
              </button>
            </div>
          </motion.div>

          {/* CENTER/RIGHT: LARGE FASHION MODEL OVERLAPPING TYPOGRAPHY */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-7 flex justify-center lg:justify-end items-end relative order-1 lg:order-2"
          >
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[520px] aspect-[3/4] overflow-hidden shadow-2xl border border-neutral-300/50 bg-[#E3E1DB]">
              <img
                src={HERO_ASSET}
                alt="GAZU Modern Fashion Editorial Model"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top mix-blend-multiply filter contrast-105"
              />

              {/* Lower Right Season Stamp */}
              <div className="absolute bottom-4 right-4 bg-black/85 backdrop-blur-xs text-white p-3 text-right">
                <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-neutral-400 block">
                  EDITION
                </span>
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-tight block font-['Syne',sans-serif]">
                  NEW<br />COLLECTION<br />2026
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
