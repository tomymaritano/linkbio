import { motion } from "framer-motion";
import { socialConfig } from "../config";
import { ShareButton } from "./ShareButton";

const SocialMedia = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Social Links with Labels */}
      <div className="flex flex-wrap justify-center items-center gap-3">
        {socialConfig.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="group flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl
                bg-white/40 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10
                text-xs sm:text-sm text-black dark:text-white transition-all hover:bg-white/60 dark:hover:bg-black/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              <span className="transition-transform group-hover:translate-x-1 font-body font-semibold">{item.label}</span>
            </motion.a>
          );
        })}
        
        {/* Share Button */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: socialConfig.length * 0.1 }}
        >
          <ShareButton />
        </motion.div>
      </div>
      
      {/* Divider */}
      <div className="w-full max-w-xs">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-[#161B22] px-2 text-gray-400">
              Connect
            </span>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <p className="text-xs text-gray-500 dark:text-gray-600 text-center">
        © {new Date().getFullYear()} All rights reserved
      </p>
    </div>
  );
};

export default SocialMedia;