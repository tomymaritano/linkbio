import { profileConfig } from '../config';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa6';
import { useTheme } from '../hooks/useTheme';

const Profile = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
      {/* Avatar */}
      <div className="relative group">
        <img
          src={profileConfig.image.src}
          alt={profileConfig.image.alt}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-white/20 dark:ring-white/10"
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-500/20 to-transparent" />
        
        {/* Theme Toggle as Status Indicator */}
        <motion.button
          onClick={toggleTheme}
          className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
            bg-white dark:bg-gray-900 shadow-lg border-2 border-white dark:border-gray-900
            cursor-pointer hover:scale-110 transition-transform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isDark ? "dark" : "light"}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? (
                <FaMoon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
              ) : (
                <FaSun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
              )}
            </motion.div>
          </AnimatePresence>
          
          {/* Pulse animation */}
          <motion.div
            className="absolute inset-0 rounded-full bg-current opacity-20"
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.5, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        </motion.button>
      </div>

      {/* Identity */}
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 dark:text-white">
          {profileConfig.name}
        </h1>

        <p className="text-sm sm:text-base font-body text-gray-600 dark:text-gray-400 font-medium">
          {profileConfig.title}
          <span className="block sm:inline sm:before:content-['_•_'] sm:before:mx-2">
            {profileConfig.location}
          </span>
        </p>
      </div>

      {/* Bio */}
      <p className="text-sm sm:text-base font-body text-gray-700 dark:text-gray-300 max-w-md leading-relaxed px-4 sm:px-0">
        {profileConfig.description}{" "}
        <a 
          href={profileConfig.currentWork.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-accent-500 hover:text-accent-600 dark:hover:text-accent-400 underline-offset-2 hover:underline font-semibold transition-colors"
        >
          {profileConfig.currentWork.name}
        </a>
      </p>
    </div>
  );
};

export default Profile;