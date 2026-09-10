import React from 'react';

interface AnnouncementBarProps {
  onNavigate: (view: any) => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onNavigate }) => {
  return (
    <div
      id="announcement-bar"
      className="bg-black text-white text-[11px] sm:text-xs tracking-wider uppercase py-2 px-4 select-none relative z-40"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Centered or left message */}
        <div className="w-full md:w-auto text-center md:text-left flex-1 font-medium tracking-[0.15em]">
          <span>FREE DELIVERY ON ORDERS ABOVE ₹999</span>
        </div>

        {/* Right side links (desktop only) */}
        <div className="hidden md:flex items-center space-x-6 text-[11px] font-normal text-neutral-300">
          <button
            id="link-download-app"
            type="button"
            onClick={() => onNavigate({ type: 'about' })}
            className="hover:text-white transition-colors duration-150 tracking-wider"
          >
            DOWNLOAD APP
          </button>
          <span className="text-neutral-700">|</span>
          <button
            id="link-track-order"
            type="button"
            onClick={() => onNavigate({ type: 'account', tab: 'orders' })}
            className="hover:text-white transition-colors duration-150 tracking-wider"
          >
            TRACK ORDER
          </button>
          <span className="text-neutral-700">|</span>
          <button
            id="link-help"
            type="button"
            onClick={() => onNavigate({ type: 'faq' })}
            className="hover:text-white transition-colors duration-150 tracking-wider"
          >
            HELP
          </button>
        </div>
      </div>
    </div>
  );
};
