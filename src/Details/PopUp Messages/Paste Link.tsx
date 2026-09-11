import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, X } from 'lucide-react';

interface PasteLinkPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (url: string, newTab: boolean, noFollow: boolean) => void;
  initialUrl?: string;
  initialNewTab?: boolean;
  initialNoFollow?: boolean;
}

export function PasteLinkPopup({ isOpen, onClose, onSave, initialUrl = '', initialNewTab = true, initialNoFollow = false }: PasteLinkPopupProps) {
  const [url, setUrl] = useState(initialUrl);
  const [newTab, setNewTab] = useState(initialNewTab);
  const [noFollow, setNoFollow] = useState(initialNoFollow);

  useEffect(() => {
    if (isOpen) {
      setUrl(initialUrl);
      setNewTab(initialNewTab);
      setNoFollow(initialNoFollow);
    }
  }, [isOpen, initialUrl, initialNewTab, initialNoFollow]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(url, newTab, noFollow);
    onClose();
  };

  const handleRemove = () => {
    onSave('', false, false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-2xl z-[101] overflow-hidden border border-gray-100"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2 text-gray-800 font-bold">
                <Link2 size={18} className="text-blue-600" />
                Add Link
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5">
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  autoFocus
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                />
              </div>

              <div className="flex flex-col gap-3 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={newTab} onChange={e => setNewTab(e.target.checked)} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                  <span className="text-sm font-medium text-gray-700">Open link in a new tab</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={noFollow} onChange={e => setNoFollow(e.target.checked)} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                  <span className="text-sm font-medium text-gray-700">Set as NoFollow (SEO)</span>
                </label>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <button
                  type="button"
                  onClick={handleRemove}
                  className="text-sm text-red-600 hover:text-red-700 font-bold px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Remove Link
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
