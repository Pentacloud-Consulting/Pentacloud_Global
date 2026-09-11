import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteDuplicateBlogPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  blogTitle?: string;
}

export function DeleteDuplicateBlogPopup({ isOpen, onClose, onConfirm, blogTitle }: DeleteDuplicateBlogPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-red-50/50">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle size={20} />
            <h2 className="text-sm font-bold uppercase tracking-wider">Delete Duplicate Blog</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 hover:bg-white rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Are you sure you want to permanently delete this duplicate blog? This action cannot be undone.
          </p>
          {blogTitle && (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 font-medium line-clamp-2">
              "{blogTitle}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded text-xs font-bold hover:bg-gray-100 uppercase tracking-wider transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2.5 bg-red-600 text-white rounded text-xs font-bold hover:bg-red-700 uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
          >
            <Trash2 size={14} /> Yes, Delete It
          </button>
        </div>
      </div>
    </div>
  );
}
