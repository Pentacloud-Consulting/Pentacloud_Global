import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface AddedKeywordPopupProps {
  isOpen: boolean;
  onClose: () => void;
  count: number;
  location: string;
}

export function AddedKeywordPopup({ isOpen, onClose, count, location }: AddedKeywordPopupProps) {
  // Auto-close the toast after 4 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-white border-l-4 border-l-emerald-500 border-t border-b border-r border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg p-4 flex items-start gap-4 min-w-[320px] max-w-sm">
        <div className="mt-0.5">
          <CheckCircle2 size={20} className="text-emerald-500" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-gray-900">Keywords Added</h4>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Successfully added <strong>{count}</strong> keyword{count > 1 ? 's' : ''} to rank tracker for <span className="font-semibold text-gray-800">{location}</span>.
          </p>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1 rounded-full transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
