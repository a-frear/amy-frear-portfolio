import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { ReducedMotionContext } from '../context/context.js';
import ReducedMotionToggle from './ReducedMotionToggle.js';
import Hamburger from './icons/Hamburger.js';
import Curve from './icons/Curve.js';
import { isFeatureEnabled } from '../config/featureFlags.js';
import { red, lightYellow, green, black } from '../styles/colors';
import { breakpoints } from '../styles/breakpoints';
import { HeroIntro } from '../styles/animations';
import { useHeroIntro } from '../hooks/useHeroIntro';

export default function Header() {
  const { animation, mounted } = useContext(ReducedMotionContext);
  const [openNav, setOpenNav] = useState(false);
  const introClass = useHeroIntro();

  return (
    <HeaderWrapper>
      {mounted && animation && (
        <AnimatedBackground
          key="animated"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{
            type: 'spring',
            mass: 2,
            damping: 50,
          }}
        >
          <Curve />
        </AnimatedBackground>
      )}
      {mounted && !animation && (
        <AnimatedBackground
          key="static"
          initial={false}
          animate={{ y: 0 }}
          transition={{ duration: 0 }}
        >
          <Curve />
        </AnimatedBackground>
      )}
      <HeaderContainer openNav={openNav} animation={animation}>
        {isFeatureEnabled('SHOW_ANIMATION_TOGGLE') && (
          <div
            className={['toggle-wrapper', introClass].filter(Boolean).join(' ')}
          >
            <ReducedMotionToggle />
          </div>
        )}
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
        <div className="header-title">
          <h1 className={introClass}>Frear Projects</h1>
          {/* Title, subtitle, then toggle fade up once the slime has dropped in */}
          <p className={introClass}>
            Independent web development for creative teams
          </p>
        </div>
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
  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const AnimatedBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  pointer-events: none;
  background-color: ${green};
  height: 160px;
`;

const HeaderContainer = styled.div`
  position: relative;
  z-index: 10;
  display: grid;
  justify-content: space-between;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  background-color: transparent;
  height: 160px;
  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
  .toggle-wrapper {
    ${HeroIntro}
    --intro-delay: 1.4s;
    margin: 1.5rem 0 0.5rem 1rem;
    height: 20px;
  }
  .header-title {
    text-align: center;
    grid-column: 1 / -1;
  }
  h1 {
    ${HeroIntro}
    --intro-delay: 1s;
    font-family: 'Bowlby One SC';
    /* Sized so "Frear Projects" always fits on one line */
    font-size: min(58px, 9.6vw);
    line-height: 1;
    white-space: nowrap;
    color: ${black};
    padding: 0 10px;
  }

  p {
    ${HeroIntro}
    --intro-delay: 1.2s;
    margin-top: 8px;
    padding: 0 10px;
    font-family: 'Fjalla One', sans-serif;
    font-size: clamp(17px, 2.8vw, 20px);
    line-height: 1.2;
    color: ${black};
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
    height: 100%;
    width: ${(props) => (props.openNav ? `250px` : `0px`)};
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    left: unset;
    background-color: ${lightYellow};
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
