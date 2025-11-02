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
        viewBox="0 0 1200 120"
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
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
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
  top: 179px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: 5;

  @media (min-width: ${breakpoints.tablet}) {
    top: 159px;
  }

  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    transform: rotateY(180deg);
    transform-origin: center top;
  }
`;

Curve.propTypes = {
  fill: PropTypes.string,
};
