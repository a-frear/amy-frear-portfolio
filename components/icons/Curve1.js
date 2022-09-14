import React, { useContext } from 'react';
import { animated, useSpring } from 'react-spring';
import PropTypes from 'prop-types';
import { ReducedMotionContext } from '../../context/context';

export default function Curve1({ fill = '#CCFF66', animate = false }) {
  const { animation } = useContext(ReducedMotionContext);
  const springProps = useSpring({
    config: { mass: 1, friction: 100 },
    from: { y: animation ? 0 : -200 },
    to: { y: 0 },
  });

  return animate ? (
    <animated.div style={springProps} className="curve-1">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="shape-fill"
          fill={fill}
        />
      </svg>
    </animated.div>
  ) : (
    <div className="curve-2">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="shape-fill"
          fill={fill}
        />
      </svg>
    </div>
  );
}

Curve1.propTypes = {
  fill: PropTypes.string,
  animate: PropTypes.bool,
};
