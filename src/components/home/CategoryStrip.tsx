import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageView, Category } from '../../types';

interface CategoryStripProps {
  onNavigate: (view: PageView) => void;
}

const CATEGORIES_DATA: {
  category: Category;
  title: string;
  desc: string;
  buttonText: string;
  image: string;
}[] = [
  {
    category: 'MEN',
    title: 'MEN',
    desc: 'Elevated everyday essentials.',
    buttonText: 'SHOP MEN',
    image: 'https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?auto=format&fit=crop&q=80&w=900'
  },
  {
    category: 'WOMEN',
    title: 'WOMEN',
    desc: 'Effortless style for every you.',
    buttonText: 'SHOP WOMEN',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=900'
  },
  {
    category: 'KIDS',
    title: 'KIDS',
    desc: 'Comfort meets cool everyday.',
    buttonText: 'SHOP KIDS',
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=900'
  }
];

export const CategoryStrip: React.FC<CategoryStripProps> = ({ onNavigate }) => {
  return (
    <section id="category-strip" className="bg-black text-white py-14 sm:py-18 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES_DATA.map((item) => (
            <div
              key={item.category}
              id={`cat-strip-${item.category.toLowerCase()}`}
              className="group relative bg-neutral-950 border border-neutral-800/80 overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:border-neutral-600"
              onClick={() => onNavigate({ type: 'category', category: item.category })}
            >
              {/* Image Block */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover object-center grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />

                {/* Overlaid Title & Desc */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                  <span className="text-[10px] tracking-[0.24em] font-semibold text-neutral-400 uppercase">
                    COLLECTION
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase font-['Syne',sans-serif] mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1.5 line-clamp-2">
                    {item.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-white group-hover:text-neutral-300 transition-colors">
                    <span>{item.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
