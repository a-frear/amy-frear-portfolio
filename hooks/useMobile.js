import { useState, useEffect } from 'react';
import { breakpoints } from '../styles/breakpoints';

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < parseInt(breakpoints.tablet);
      setIsMobile(mobile);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    const handleResize = () => checkMobile();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}
