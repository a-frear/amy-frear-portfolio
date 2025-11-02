import PropTypes from 'prop-types';
import '../styles/globals.css';
import { useLenis } from '../hooks/useLenis';
import { ReducedMotionProvider } from '../context/context';

function MyApp({ Component, pageProps }) {
  // Initialize Lenis smooth scrolling
  useLenis();

  return (
    <ReducedMotionProvider>
      <Component {...pageProps} />
    </ReducedMotionProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
