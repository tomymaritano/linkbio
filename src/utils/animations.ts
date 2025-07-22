// Framer Motion animation variants

export const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export const scaleIn = {
  initial: { 
    scale: 0.8, 
    opacity: 0 
  },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.215, 0.61, 0.355, 1]
    }
  },
  exit: { 
    scale: 0.8, 
    opacity: 0 
  }
};

export const slideIn = {
  initial: { 
    x: -20, 
    opacity: 0 
  },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
};

export const springScale = {
  whileHover: { 
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  whileTap: { 
    scale: 0.95 
  }
};

export const glowEffect = {
  initial: { 
    boxShadow: "0 0 0 rgba(99, 102, 241, 0)" 
  },
  whileHover: { 
    boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
    transition: {
      duration: 0.3
    }
  }
};