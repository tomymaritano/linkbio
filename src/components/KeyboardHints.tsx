import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard } from 'lucide-react';

export const KeyboardHints = () => {
  const [showHints, setShowHints] = useState(false);
  const [hasSeenHints, setHasSeenHints] = useState(false);

  useEffect(() => {
    // Show hints on first visit
    const seen = localStorage.getItem('hasSeenKeyboardHints');
    if (!seen) {
      setTimeout(() => {
        setShowHints(true);
        setTimeout(() => {
          setShowHints(false);
          localStorage.setItem('hasSeenKeyboardHints', 'true');
        }, 5000);
      }, 2000);
    } else {
      setHasSeenHints(true);
    }
  }, []);

  const toggleHints = () => setShowHints(!showHints);

  const shortcuts = [
    { keys: ['1', '2', '3'], description: 'Switch tabs' },
    { keys: ['/'], description: 'Open search' },
    { keys: ['⌘', 'K'], description: 'Open search' },
    { keys: ['⌘', 'D'], description: 'Toggle theme' },
    { keys: ['Esc'], description: 'Close dialogs' },
  ];

  return (
    <>
      {/* Floating button */}
      {hasSeenHints && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={toggleHints}
          className="fixed bottom-4 right-4 p-2 rounded-lg bg-white/80 dark:bg-black/80 
                     backdrop-blur-sm border border-gray-200 dark:border-gray-700
                     shadow-lg hover:scale-110 transition-transform z-50"
          aria-label="Keyboard shortcuts"
        >
          <Keyboard className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </motion.button>
      )}

      {/* Hints popup */}
      <AnimatePresence>
        {showHints && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed bottom-20 right-4 p-4 rounded-xl bg-white dark:bg-gray-900 
                       shadow-2xl border border-gray-200 dark:border-gray-700 z-50
                       max-w-xs"
          >
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Keyboard Shortcuts
            </h3>
            <div className="space-y-2">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex items-center justify-between gap-4 text-xs">
                  <div className="flex gap-1">
                    {shortcut.keys.map((key, i) => (
                      <kbd
                        key={i}
                        className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 
                                   border border-gray-300 dark:border-gray-600
                                   font-mono text-gray-700 dark:text-gray-300"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {shortcut.description}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};