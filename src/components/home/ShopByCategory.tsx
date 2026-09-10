import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Category, PageView } from '../../types';

interface ShopByCategoryProps {
  onNavigate: (view: PageView) => void;
}

const CATEGORY_CARDS: {
  category: Category;
  title: string;
  desc: string;
  image: string;
}[] = [
  {
    category: 'MEN',
    title: 'MEN',
    desc: 'Understated classics & structured streetwear.',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=900'
  },
  {
    category: 'WOMEN',
    title: 'WOMEN',
    desc: 'Fluid tailoring, knitwear, and modern dresses.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=900'
  },
  {
    category: 'KIDS',
    title: 'KIDS',
    desc: 'Soft organic staples built for everyday play.',
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&q=80&w=900'
  },
  {
    category: 'BEAUTY',
    title: 'BEAUTY',
    desc: 'Clean, botanical formulas for skin and hair.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=900'
  }
];

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({ onNavigate }) => {
  return (
    <section id="shop-by-category-section" className="bg-white py-16 sm:py-20 border-b border-neutral-200 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-neutral-400 block mb-1">
              CURATED DEPARTMENTS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-neutral-900 font-['Syne',sans-serif]">
              SHOP BY CATEGORY
            </h2>
          </div>
          <span className="text-xs text-neutral-500 tracking-wider uppercase mt-2 sm:mt-0 font-medium">
            SPRING / SUMMER 2026
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORY_CARDS.map((card) => (
            <div
              key={card.category}
              id={`shop-category-card-${card.category.toLowerCase()}`}
              onClick={() => onNavigate({ type: 'category', category: card.category })}
              className="group relative aspect-[3/4] overflow-hidden bg-neutral-100 cursor-pointer border border-neutral-200"
            >
              <img
                src={card.image}
                alt={card.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white">
                <span className="text-[10px] tracking-[0.2em] font-semibold text-neutral-300 uppercase">
                  DEPARTMENT
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight uppercase font-['Syne',sans-serif] mt-0.5">
                  {card.title}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2 mt-1 mb-4">
                  {card.desc}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] uppercase text-white group-hover:text-amber-200 transition-colors">
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
