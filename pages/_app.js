import PropTypes from 'prop-types';
import '../styles/globals.css';
import { ReducedMotionProvider } from '../context/context';

function MyApp({ Component, pageProps }) {
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
