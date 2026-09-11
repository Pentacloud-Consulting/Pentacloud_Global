import { CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

interface CopiedPathPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export function CopiedPathPopup({ isOpen, onClose, message = "URL copied!" }: CopiedPathPopupProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Automatically close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-3 rounded-lg shadow-xl flex items-center gap-3">
        <CheckCircle2 size={18} className="text-blue-600" />
        <span className="text-sm font-bold tracking-wide">{message}</span>
      </div>
    </div>
  );
}
