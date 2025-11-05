import { useRef, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { hotPink } from '../../styles/colors';
import { useParallax } from '../../hooks/useParallax';
import { useMobile } from '../../hooks/useMobile';
import { ReducedMotionContext } from '../../context/context';
import { breakpoints } from '../../styles/breakpoints';

export default function ParallaxWave() {
  const waveRef = useRef(null);
  const isMobile = useMobile();
  const { animation } = useContext(ReducedMotionContext);
  // Subtle parallax on mobile, standard on desktop (respects reduced motion)
  const waveY = useParallax(!animation ? 0 : isMobile ? 0.05 : 0.1, waveRef);

  return <Wave ref={waveRef} style={{ y: waveY }} />;
}

const Wave = styled(motion.div)`
  background: ${hotPink};
  height: 100px;
  margin-bottom: 50px;
  --mask: radial-gradient(
        38.99px at 50% calc(100% + 18px),
        #0000 calc(99% - 8px),
        #000 calc(101% - 8px) 99%,
        #0000 101%
      )
      calc(50% - 60px) calc(50% - 19px + 0.5px) / 120px 38px repeat-x,
    radial-gradient(
        38.99px at 50% -18px,
        #0000 calc(99% - 8px),
        #000 calc(101% - 8px) 99%,
        #0000 101%
      )
      50% calc(50% + 19px) / 120px 38px repeat-x;
  -webkit-mask: var(--mask);
  mask: var(--mask);
  @media (min-width: ${breakpoints.tablet}) {
    height: 200px;
  }
`;
