// Performance detection utilities

export function isHighPerformanceDevice(): boolean {
  // Check if we're on a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check hardware concurrency (number of CPU cores)
  const cores = navigator.hardwareConcurrency || 1;
  
  // Check device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory || 4; // GB
  
  // Check connection type
  const connection = (navigator as any).connection;
  const isSlowConnection = connection && (
    connection.saveData || 
    connection.effectiveType === 'slow-2g' || 
    connection.effectiveType === '2g'
  );
  
  // Device is considered high performance if:
  // - Not on mobile
  // - Has more than 2 cores
  // - Has more than 2GB RAM
  // - Not on a slow connection
  // - User doesn't prefer reduced motion
  return !isMobile && 
         cores > 2 && 
         deviceMemory > 2 && 
         !isSlowConnection && 
         !prefersReducedMotion;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}