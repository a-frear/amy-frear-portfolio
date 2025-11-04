import PropTypes from 'prop-types';
import { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { green } from '../../styles/colors';
import { breakpoints } from '../../styles/breakpoints';
import { ReducedMotionContext } from '../../context/context';

export default function Curve({ fill = green }) {
  const { animation } = useContext(ReducedMotionContext);

  return (
    <CurveWrapper>
      <AnimatedSvg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 900 600"
        preserveAspectRatio="none"
        initial={animation ? { scaleY: 0.2 } : { scaleY: 1 }}
        animate={{ scaleY: 1 }}
        transition={
          animation
            ? {
                duration: 0.8,
                delay: 0.2,
                ease: 'easeOut',
              }
            : { duration: 0 }
        }
      >
        <defs>
          <filter id="slimeShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
            <feOffset dx="0" dy="3" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="slimeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fill} stopOpacity="1" />
            <stop offset="100%" stopColor={fill} stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path
          d="M0 37L6.3 36.5C12.7 36 25.3 35 37.8 29.3C50.3 23.7 62.7 13.3 75.2 9.7C87.7 6 100.3 9 112.8 14.8C125.3 20.7 137.7 29.3 150.2 35.3C162.7 41.3 175.3 44.7 187.8 45.3C200.3 46 212.7 44 225.2 40C237.7 36 250.3 30 262.8 32.2C275.3 34.3 287.7 44.7 300.2 44C312.7 43.3 325.3 31.7 337.8 25C350.3 18.3 362.7 16.7 375.2 22C387.7 27.3 400.3 39.7 412.8 44.3C425.3 49 437.7 46 450 39.3C462.3 32.7 474.7 22.3 487.2 22.7C499.7 23 512.3 34 525 33.5C537.7 33 550.3 21 562.8 18.7C575.3 16.3 587.7 23.7 600.2 30.7C612.7 37.7 625.3 44.3 637.8 48.3C650.3 52.3 662.7 53.7 675.2 46.7C687.7 39.7 700.3 24.3 712.8 18C725.3 11.7 737.7 14.3 750.2 13C762.7 11.7 775.3 6.3 787.8 9.2C800.3 12 812.7 23 825.2 25C837.7 27 850.3 20 862.8 23.8C875.3 27.7 887.7 42.3 893.8 49.7L900 57L900 0L893.8 0C887.7 0 875.3 0 862.8 0C850.3 0 837.7 0 825.2 0C812.7 0 800.3 0 787.8 0C775.3 0 762.7 0 750.2 0C737.7 0 725.3 0 712.8 0C700.3 0 687.7 0 675.2 0C662.7 0 650.3 0 637.8 0C625.3 0 612.7 0 600.2 0C587.7 0 575.3 0 562.8 0C550.3 0 537.7 0 525 0C512.3 0 499.7 0 487.2 0C474.7 0 462.3 0 450 0C437.7 0 425.3 0 412.8 0C400.3 0 387.7 0 375.2 0C362.7 0 350.3 0 337.8 0C325.3 0 312.7 0 300.2 0C287.7 0 275.3 0 262.8 0C250.3 0 237.7 0 225.2 0C212.7 0 200.3 0 187.8 0C175.3 0 162.7 0 150.2 0C137.7 0 125.3 0 112.8 0C100.3 0 87.7 0 75.2 0C62.7 0 50.3 0 37.8 0C25.3 0 12.7 0 6.3 0L0 0Z"
          className="shape-fill"
          fill="url(#slimeGradient)"
          filter="url(#slimeShadow)"
        />
      </AnimatedSvg>
    </CurveWrapper>
  );
}

const AnimatedSvg = motion.svg;

const CurveWrapper = styled.div`
  position: absolute;
  top: 159px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: 5;

  @media (min-width: ${breakpoints.tablet}) {
    top: 129px;
  }

  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 60%;
    transform: rotateY(180deg);
    transform-origin: center top;
  }
`;

Curve.propTypes = {
  fill: PropTypes.string,
};
