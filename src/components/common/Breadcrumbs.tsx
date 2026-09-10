import React from 'react';
import { ChevronRight } from 'lucide-react';
import { PageView } from '../../types';

interface BreadcrumbsProps {
  items: {
    label: string;
    view?: PageView;
  }[];
  onNavigate: (view: PageView) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav
      id="breadcrumbs-nav"
      aria-label="Breadcrumbs"
      className="py-4 text-[11px] sm:text-xs font-medium tracking-[0.14em] uppercase text-neutral-400 flex items-center flex-wrap gap-1.5"
    >
      <button
        type="button"
        onClick={() => onNavigate({ type: 'home' })}
        className="hover:text-black transition-colors"
      >
        HOME
      </button>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-neutral-400 stroke-[2] shrink-0" />
            {isLast || !item.view ? (
              <span className="text-neutral-900 font-semibold truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => item.view && onNavigate(item.view)}
                className="hover:text-black transition-colors truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
