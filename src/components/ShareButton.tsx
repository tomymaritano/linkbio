import { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../hooks/useToast';

export const ShareButton = () => {
  const [copied, setCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { showToast } = useToast();

  const handleShare = async () => {
    const shareData = {
      title: 'Tomás Maritano - LinkBio',
      text: 'Check out my links and projects!',
      url: window.location.href
    };

    // Check if Web Share API is available
    if (navigator.share && /mobile|android|iphone/i.test(navigator.userAgent)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error occurred
        console.log('Share cancelled');
      }
    } else {
      // Show share options for desktop
      setShowOptions(!showOptions);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast('Link copied to clipboard!', 'success');
      setTimeout(() => {
        setCopied(false);
        setShowOptions(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      showToast('Failed to copy link', 'error');
    }
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent('Check out my links and projects!');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    setShowOptions(false);
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    setShowOptions(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleShare}
        className="group flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl
                   bg-white/40 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10
                   text-xs sm:text-sm text-black dark:text-white transition-all hover:bg-white/60 dark:hover:bg-black/30"
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98 }}
        aria-label="Share this page"
      >
        <Share2 className="w-5 h-5" />
        <span className="transition-transform group-hover:translate-x-1 font-body font-semibold">Share</span>
      </motion.button>

      {/* Share options dropdown */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 bottom-full mb-2 p-2 rounded-xl bg-white dark:bg-gray-900 
                       shadow-xl border border-gray-200 dark:border-gray-700 z-50
                       min-w-[200px]"
          >
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                         text-sm text-gray-700 dark:text-gray-300"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy link</span>
                </>
              )}
            </button>
            
            <button
              onClick={shareToTwitter}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                         text-sm text-gray-700 dark:text-gray-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>Share on X</span>
            </button>
            
            <button
              onClick={shareToLinkedIn}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                         text-sm text-gray-700 dark:text-gray-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>Share on LinkedIn</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {showOptions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowOptions(false)}
        />
      )}
    </div>
  );
};