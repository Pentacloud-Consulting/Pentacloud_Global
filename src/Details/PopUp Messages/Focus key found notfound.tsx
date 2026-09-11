import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, X } from 'lucide-react';

interface FocusKeyNotFoundProps {
  isOpen: boolean;
  onClose: () => void;
  keyword?: string;
}

export function FocusKeyNotFound({ isOpen, onClose, keyword }: FocusKeyNotFoundProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 z-10"
          >
            <div className="p-6 text-center">
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4">
                <XCircle size={26} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">Keyword Not Found</h3>

              {/* Message */}
              <p className="text-sm text-gray-600 mb-2">
                We don&apos;t have{' '}
                {keyword ? (
                  <strong className="text-gray-900">&quot;{keyword}&quot;</strong>
                ) : (
                  'this keyword'
                )}{' '}
                in your tracked keywords list.
              </p>
              <p className="text-xs text-gray-400 mb-6">
                Please check your keyword or go to the{' '}
                <strong>Analytics → Rank Tracker</strong> to add it first.
              </p>

              {/* Button */}
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Got it
              </button>
            </div>

            {/* Close X */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
            >
              <X size={18} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
