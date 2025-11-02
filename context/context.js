/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const ReducedMotionContext = createContext();

export const ReducedMotionProvider = ({ children }) => {
  const [animation, setAnimation] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Initialize animation preference on client side only
  useEffect(() => {
    // Check if user has saved a preference in localStorage
    const savedPreference = localStorage.getItem('animationPreference');
    if (savedPreference !== null) {
      setAnimation(savedPreference === 'true');
    } else {
      // Fall back to system preference if no saved preference
      const QUERY = '(prefers-reduced-motion: no-preference)';
      setAnimation(window.matchMedia(QUERY).matches);
    }
    setMounted(true);

    // Listen for system preference changes
    const QUERY = '(prefers-reduced-motion: no-preference)';
    const mediaQueryList = window.matchMedia(QUERY);
    const listener = (event) => {
      // Only update if user hasn't set a preference
      if (localStorage.getItem('animationPreference') === null) {
        setAnimation(event.matches);
      }
    };
    mediaQueryList.addEventListener('change', listener);
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);

  const handleSetAnimation = (value) => {
    setAnimation(value);
    localStorage.setItem('animationPreference', String(value));
  };

  return (
    <ReducedMotionContext.Provider
      value={{
        animation,
        setAnimation: handleSetAnimation,
      }}
    >
      {children}
    </ReducedMotionContext.Provider>
  );
};

ReducedMotionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
