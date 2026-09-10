import React from 'react';
import { X } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="size-guide-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl p-6 sm:p-8 shadow-2xl border border-neutral-200 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-black p-1"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-1">
          FIT & MEASUREMENTS
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 mb-4">
          GAZU SIZE GUIDE
        </h2>
        <p className="text-xs text-neutral-600 mb-6 leading-relaxed">
          Our silhouettes are crafted with modern, relaxed ease. If you prefer a tailored fit, we suggest ordering true to size; for an exaggerated slouchy drape, size up.
        </p>

        {/* Tops Table */}
        <h3 className="text-xs font-bold tracking-[0.14em] uppercase text-neutral-900 mb-2">
          TOPS & T-SHIRTS (IN INCHES)
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-xs text-left border-collapse border border-neutral-200">
            <thead>
              <tr className="bg-neutral-100 text-neutral-800 uppercase tracking-wider font-semibold">
                <th className="p-2.5 border border-neutral-200">Size</th>
                <th className="p-2.5 border border-neutral-200">Chest</th>
                <th className="p-2.5 border border-neutral-200">Length</th>
                <th className="p-2.5 border border-neutral-200">Shoulder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-neutral-700">
              <tr>
                <td className="p-2.5 font-bold border border-neutral-200">XS</td>
                <td className="p-2.5 border border-neutral-200">36 - 38</td>
                <td className="p-2.5 border border-neutral-200">26.5</td>
                <td className="p-2.5 border border-neutral-200">18.0</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold border border-neutral-200">S</td>
                <td className="p-2.5 border border-neutral-200">38 - 40</td>
                <td className="p-2.5 border border-neutral-200">27.5</td>
                <td className="p-2.5 border border-neutral-200">19.0</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold border border-neutral-200">M</td>
                <td className="p-2.5 border border-neutral-200">40 - 42</td>
                <td className="p-2.5 border border-neutral-200">28.5</td>
                <td className="p-2.5 border border-neutral-200">20.0</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold border border-neutral-200">L</td>
                <td className="p-2.5 border border-neutral-200">42 - 44</td>
                <td className="p-2.5 border border-neutral-200">29.5</td>
                <td className="p-2.5 border border-neutral-200">21.0</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold border border-neutral-200">XL</td>
                <td className="p-2.5 border border-neutral-200">44 - 46</td>
                <td className="p-2.5 border border-neutral-200">30.5</td>
                <td className="p-2.5 border border-neutral-200">22.0</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold border border-neutral-200">XXL</td>
                <td className="p-2.5 border border-neutral-200">46 - 48</td>
                <td className="p-2.5 border border-neutral-200">31.5</td>
                <td className="p-2.5 border border-neutral-200">23.0</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottoms Table */}
        <h3 className="text-xs font-bold tracking-[0.14em] uppercase text-neutral-900 mb-2">
          BOTTOMS & TROUSERS (IN INCHES)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-neutral-200">
            <thead>
              <tr className="bg-neutral-100 text-neutral-800 uppercase tracking-wider font-semibold">
                <th className="p-2.5 border border-neutral-200">Waist Size</th>
                <th className="p-2.5 border border-neutral-200">Waist</th>
                <th className="p-2.5 border border-neutral-200">Hip</th>
                <th className="p-2.5 border border-neutral-200">Inseam</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-neutral-700">
              <tr>
                <td className="p-2.5 font-bold border border-neutral-200">30 (S)</td>
                <td className="p-2.5 border border-neutral-200">30 - 31</td>
                <td className="p-2.5 border border-neutral-200">38</td>
                <td className="p-2.5 border border-neutral-200">30.5</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold border border-neutral-200">32 (M)</td>
                <td className="p-2.5 border border-neutral-200">32 - 33</td>
                <td className="p-2.5 border border-neutral-200">40</td>
                <td className="p-2.5 border border-neutral-200">31.0</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold border border-neutral-200">34 (L)</td>
                <td className="p-2.5 border border-neutral-200">34 - 35</td>
                <td className="p-2.5 border border-neutral-200">42</td>
                <td className="p-2.5 border border-neutral-200">31.5</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold border border-neutral-200">36 (XL)</td>
                <td className="p-2.5 border border-neutral-200">36 - 37</td>
                <td className="p-2.5 border border-neutral-200">44</td>
                <td className="p-2.5 border border-neutral-200">32.0</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-black text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-neutral-800"
          >
            GOT IT
          </button>
        </div>
      </div>
    </div>
  );
};
