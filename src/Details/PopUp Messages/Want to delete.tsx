import { AlertTriangle, Loader2, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface WantToDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
}

export function WantToDelete({ isOpen, onClose, onConfirm, count }: WantToDeleteProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onConfirm();
        onClose(); // Explicitly close the modal
      }, 1000);
    }, 1200); // 1.2s loading animation
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {status === 'success' ? (
          <div className="p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Deleted!</h3>
            <p className="text-gray-500">Successfully removed {count} {count === 1 ? 'image' : 'images'}.</p>
          </div>
        ) : (
          <>
            <div className="p-5 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete {count} {count === 1 ? 'image' : 'images'}?</h3>
              <p className="text-sm text-gray-500">
                Are you sure you want to delete the selected {count === 1 ? 'image' : 'images'}? This action cannot be undone.
              </p>
            </div>
            <div className="flex bg-gray-50 border-t border-gray-200 p-3 gap-3">
              <button
                onClick={onClose}
                disabled={status === 'loading'}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={status === 'loading'}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm disabled:opacity-75"
              >
                {status === 'loading' ? (
                  <><Loader2 size={16} className="animate-spin" /> Deleting...</>
                ) : (
                  'Yes, Delete'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
