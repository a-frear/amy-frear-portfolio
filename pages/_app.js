import '../styles/globals.css';
import { ReducedMotionProvider } from '../context/context';

function MyApp({ Component, pageProps }) {
  return (
    <ReducedMotionProvider>
      <Component {...pageProps} />
    </ReducedMotionProvider>
  );
}

export default MyApp;
