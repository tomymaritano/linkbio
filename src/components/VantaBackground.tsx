import { useEffect, useRef, useState } from 'react';
import { isHighPerformanceDevice } from '../utils/performance';

interface VantaBackgroundProps {
  className?: string;
}

const VantaBackground = ({ className = '' }: VantaBackgroundProps) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only load Vanta on high performance devices
    if (!isHighPerformanceDevice()) {
      return;
    }

    const loadVanta = async () => {
      try {
        // Dynamically import Vanta and Three.js
        const [{ default: FOG }, THREE] = await Promise.all([
          import('vanta/dist/vanta.fog.min'),
          import('three')
        ]);

        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (!vantaEffect.current && vantaRef.current) {
          vantaEffect.current = FOG({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: isDarkMode ? 0x4B82EE : 0xe5e5e5,
            midtoneColor: isDarkMode ? 0x5F5BE9 : 0xd4d4d4,
            lowlightColor: isDarkMode ? 0x282828 : 0xf5f5f5,
            baseColor: isDarkMode ? 0x181818 : 0xfafafa,
            blurFactor: 0.9,
            zoom: 0.7,
            speed: 1
          });
          setIsLoaded(true);
        }
      } catch (error) {
        console.error('Error loading Vanta:', error);
      }
    };

    loadVanta();
    
    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
          vantaEffect.current = null;
        } catch (error) {
          console.error('Error destroying Vanta effect:', error);
        }
      }
    };
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
          if (vantaEffect.current) {
            vantaEffect.current.setOptions({
              highlightColor: isDarkMode ? 0x4B82EE : 0xe5e5e5,
              midtoneColor: isDarkMode ? 0x5F5BE9 : 0xd4d4d4,
              lowlightColor: isDarkMode ? 0x282828 : 0xf5f5f5,
              baseColor: isDarkMode ? 0x181818 : 0xfafafa,
            });
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  // Show a gradient background on low-performance devices or while loading
  const fallbackGradient = (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{
        background: `radial-gradient(circle at 30% 30%, 
          ${document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'rgba(75, 130, 238, 0.1) 0%, rgba(24, 24, 24, 0.9) 50%' 
            : 'rgba(99, 102, 241, 0.05) 0%, rgba(255, 255, 255, 0.9) 50%'
          })`
      }}
    />
  );

  return (
    <>
      <div ref={vantaRef} className={`absolute inset-0 ${className}`} />
      {!isLoaded && !isHighPerformanceDevice() && fallbackGradient}
    </>
  );
};

export default VantaBackground;