import { useRef, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { hotPink } from '../../styles/colors';
import { useParallax } from '../../hooks/useParallax';
import { useMobile } from '../../hooks/useMobile';
import { ReducedMotionContext } from '../../context/context';
import { breakpoints } from '../../styles/breakpoints';

/*
 * The pink wave, drawn as one long unbroken line (25 waves, 3000px) and
 * cropped to the space it sits in, centered. It used to be a CSS mask made
 * of repeating gradient tiles, which left faint lines where the tiles met.
 */
const WAVES = 25;
const WAVE_WIDTH = 120;
const LENGTH = WAVES * WAVE_WIDTH;
const HEIGHT = 48;
const MID = HEIGHT / 2;
// Each wave is a smooth arch up then a dip down, both 60px wide and 16px
// high (curves that flow into each other, so there are no corners where
// they cross the middle)
const wavePath = `M0 ${MID}c16-21.3 44-21.3 60 0s44 21.3 60 0${'s44-21.3 60 0s44 21.3 60 0'.repeat(
  WAVES - 1
)}`;

export default function ParallaxWave() {
  const waveRef = useRef(null);
  const isMobile = useMobile();
  const { animation } = useContext(ReducedMotionContext);
  // Subtle parallax on mobile, standard on desktop (respects reduced motion)
  let intensity = 0.1;
  if (!animation) intensity = 0;
  else if (isMobile) intensity = 0.05;
  const waveY = useParallax(intensity, waveRef);

  return (
    <Wave ref={waveRef} style={{ y: waveY }} aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${LENGTH} ${HEIGHT}`}
        width={LENGTH}
        height={HEIGHT}
        focusable="false"
      >
        <path d={wavePath} fill="none" stroke={hotPink} strokeWidth="8" />
      </svg>
    </Wave>
  );
}

const Wave = styled(motion.div)`
  position: relative;
  overflow: hidden;
  height: 100px;
  margin-bottom: 50px;
  @media (min-width: ${breakpoints.tablet}) {
    height: 200px;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    max-width: none;
    transform: translate(-50%, -50%);
  }
`;
