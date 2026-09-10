import React from 'react';
import { Truck, RotateCcw, Award, ShieldCheck } from 'lucide-react';

export const BenefitsStrip: React.FC = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'FAST DELIVERY',
      desc: 'Quick & safe delivery'
    },
    {
      icon: RotateCcw,
      title: 'EASY RETURNS',
      desc: 'Within 15 days'
    },
    {
      icon: Award,
      title: 'QUALITY ASSURED',
      desc: 'Best fashion, best quality'
    },
    {
      icon: ShieldCheck,
      title: 'SECURE PAYMENT',
      desc: '100% secure checkout'
    }
  ];

  return (
    <section id="benefits-strip" className="bg-[#FAF9F7] py-12 sm:py-16 border-b border-neutral-200/80 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-4 rounded-xs hover:bg-white transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 mb-3 border border-neutral-200">
                  <Icon className="w-5 h-5 stroke-[1.6]" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-neutral-900 mb-1">
                  {b.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-neutral-500 font-normal">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
