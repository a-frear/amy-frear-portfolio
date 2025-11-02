import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { ReducedMotionContext } from '../context/context.js';
import ReducedMotionToggle from './ReducedMotionToggle.js';
import Hamburger from './icons/Hamburger.js';
import Curve from './icons/Curve.js';
import { isFeatureEnabled } from '../config/featureFlags.js';
import { red, lightYellow, green, yellow } from '../styles/colors';
import { breakpoints } from '../styles/breakpoints';

export default function Header() {
  const { animation, mounted } = useContext(ReducedMotionContext);
  const [openNav, setOpenNav] = useState(false);

  return (
    <HeaderWrapper>
      {mounted && animation && (
        <AnimatedBackground
          key="animated"
          initial={{ y: -150 }}
          animate={{ y: 0 }}
          transition={{
            type: 'spring',
            mass: 2,
            damping: 50,
          }}
        >
          <Curve animate="true" />
        </AnimatedBackground>
      )}
      {mounted && !animation && (
        <AnimatedBackground
          key="static"
          initial={false}
          animate={{ y: 0 }}
          transition={{ duration: 0 }}
        >
          <Curve animate="true" />
        </AnimatedBackground>
      )}
      <HeaderContainer openNav={openNav} animation={animation}>
        {isFeatureEnabled('SHOW_ANIMATION_TOGGLE') && (
          <div className="toggle-wrapper">
            <ReducedMotionToggle />
          </div>
        )}
        <div className="header-title">
          <h1>Amy Frear</h1>
          <h2>Web Developer</h2>
        </div>
        {isFeatureEnabled('SHOW_SIDENAV') && (
          <>
            <dialog id="mySidenav" className="sidenav">
              <button
                className="closebtn"
                onClick={() => setOpenNav(!openNav)}
                type="button"
              >
                &times;
              </button>

              <a href="#about">About</a>
              <a href="#work">Work</a>
              <a href="#contact">Contact</a>

              <div aria-hidden="true" className="curve-vertical" />
            </dialog>
            <div className="nav-button-wrapper">
              <button
                className="nav-button"
                onClick={() => setOpenNav(!openNav)}
                type="button"
              >
                <Hamburger />
              </button>
            </div>
          </>
        )}
      </HeaderContainer>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100%;
`;

const AnimatedBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  pointer-events: none;
  @media (min-width: ${breakpoints.tablet}) {
    background-color: ${green};
    height: 160px;
  }
`;

const HeaderContainer = styled.div`
  position: relative;
  z-index: 10;
  display: none;
  width: 100%;
  @media (min-width: ${breakpoints.tablet}) {
    display: grid;
    background-color: transparent;
    justify-content: space-between;
    width: 100%;
    grid-template-columns: 1fr 2fr 1fr;
    height: 160px;
  }
  .toggle-wrapper {
    margin: 2rem 0 0 2rem;
  }
  .header-title {
    text-align: center;
    grid-column: 2 / 3;
  }
  h1 {
    margin-top: 1rem;
    font-family: 'Bowlby One SC';
    font-size: clamp(18px, 10vw, 86px);
    color: ${lightYellow};
    text-shadow: -4px 4px 0 #000, 4px 4px 0 #000, 4px -4px 0 #000,
      -4px -4px 0 #000;
  }

  h2 {
    font-family: 'Bowlby One SC';
    font-size: clamp(14px, 4vw, 34px);
    color: ${lightYellow};
    text-shadow: -3px 3px 0 #000, 3px 3px 0 #000, 3px -3px 0 #000,
      -3px -3px 0 #000;
  }

  .nav-button-wrapper {
    position: relative;
  }

  .nav-button {
    position: absolute;
    right: 10%;
    top: 1rem;
    color: ${red};
    background-color: transparent;
    cursor: pointer;
  }

  /* The side navigation menu */
  .sidenav {
    display: block;
    height: 100%; /* 100% Full-height */
    width: ${(props) => (props.openNav ? `250px` : `0px`)};
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    right: 0;
    left: unset;
    background-color: ${yellow};
    border-radius: 50% 0 0 50%;
    border: ${(props) => (props.openNav ? `2px solid black` : `none`)};
    border-right: none;
    overflow-x: hidden;
    padding: 60px 0 0 0;
    transition: 0.5s;
    button {
      margin-top: 1rem;
      color: black;
      background-color: transparent;
    }
  }

  /* The navigation menu links */
  .sidenav a {
    padding: 60px 30px 8px 32px;
    display: block;
    transition: 0.3s;
    z-index: 3;
    transform: ${(props) =>
      props.openNav ? `translateX(0), scale(1)` : `translateX(500px)`};
    transition: transform 0.3s ease-out;

    font-family: 'Fjalla One', sans-serif;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 25px;
    color: black;
    text-align: right;
  }

  .sidenav a:hover {
    color: #f72c25;
  }

  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    font-weight: 100;
    margin-left: 50px;
    transform: scale(1.5);
  }

  #main {
    transition: margin-left 0.5s;
    padding: 20px;
  }

  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
    .sidenav a {
      font-size: 18px;
    }
  }
`;
