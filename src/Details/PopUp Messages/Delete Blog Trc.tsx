'use client';
import { Trash2 } from 'lucide-react';

interface DeleteBlogTrcProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
}

export function DeleteBlogTrc({ isOpen, onClose, onConfirm, count }: DeleteBlogTrcProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Tracked Keywords?</h3>
          <p className="text-gray-500 text-sm">Are you sure you want to stop tracking {count} {count === 1 ? 'keyword' : 'keywords'}? This will remove all historical ranking data.</p>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-md transition-colors">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md shadow-sm transition-colors flex items-center gap-2">
            <Trash2 size={14} /> Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
