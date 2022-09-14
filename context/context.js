/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const ReducedMotionContext = createContext();

export const ReducedMotionProvider = ({ children }) => {
  const [animation, setAnimation] = useState(false);

  // check users settings
  useEffect(() => {
    const QUERY = '(prefers-reduced-motion: no-preference)';
    setAnimation(window.matchMedia(QUERY).matches);
    const mediaQueryList = window.matchMedia(QUERY);
    const listener = (event) => {
      setAnimation(event.matches);
    };
    mediaQueryList.addEventListener('change', listener);
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);

  return (
    <ReducedMotionContext.Provider
      value={{
        animation,
        setAnimation,
      }}
    >
      {children}
    </ReducedMotionContext.Provider>
  );
};

ReducedMotionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
