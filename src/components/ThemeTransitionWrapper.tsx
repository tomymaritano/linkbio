// components/ThemeTransitionWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const ThemeTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsChanging(true);
      setTimeout(() => setIsChanging(false), 600); // duración del fade
    };

    window.addEventListener("theme-changed", handler);
    return () => window.removeEventListener("theme-changed", handler);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isChanging && (
          <motion.div
            key="theme-transition"
            className="fixed inset-0 z-[9999] pointer-events-none backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      {children}
    </>
  );
};