import { motion } from "framer-motion";
import { socialConfig } from "../config";

const SocialMediaAlt = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Minimal Icon-only Design */}
      <div className="flex items-center gap-2 bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-lg p-2 border border-white/10">
        {socialConfig.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="relative group p-2 rounded-lg hover:bg-white/80 dark:hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-lg bg-accent-500/20 scale-0 
                group-hover:scale-150 transition-transform duration-300" />
              
              <div className="relative">
                <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400 
                  group-hover:text-accent-500 transition-colors duration-200" />
              </div>
              
              {/* Label on hover */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                text-xs font-medium text-gray-600 dark:text-gray-400
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                whitespace-nowrap">
                {item.label}
              </span>
            </motion.a>
          );
        })}
      </div>
      
      {/* Copyright with fade effect */}
      <motion.p 
        className="text-xs text-gray-400 dark:text-gray-600 text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        © {new Date().getFullYear()} All rights reserved
      </motion.p>
    </div>
  );
};

export default SocialMediaAlt;