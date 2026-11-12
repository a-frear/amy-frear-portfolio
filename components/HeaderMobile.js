import React, { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { ReducedMotionContext } from '../context/context.js';
import ReducedMotionToggle from './ReducedMotionToggle.js';
import MenuButton from './MenuButton';
import NavSlime from './icons/NavSlime';
import { useScrollToSection } from '../hooks/useScrollToSection';
import { useNavModal } from '../hooks/useNavModal';
import Curve from './icons/Curve.js';
import { isFeatureEnabled } from '../config/featureFlags.js';
import { red, lightYellow, green, black, yellow } from '../styles/colors';
import { breakpoints } from '../styles/breakpoints';
import OutlinedText from './OutlinedText';
import { SubtitleIntro } from '../styles/animations';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const { animation, mounted } = useContext(ReducedMotionContext);
  const [openNav, setOpenNav] = useState(false);
  const scrollToSection = useScrollToSection();
  const navRef = useRef(null);
  const navButtonRef = useRef(null);
  const overlayRef = useRef(null);
  const toggleRef = useRef(null);
  useNavModal({
    open: openNav,
    setOpen: setOpenNav,
    navRef,
    buttonRef: navButtonRef,
    overlayRef,
    toggleRef,
  });

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
          <div className="toggle-wrapper" ref={toggleRef}>
            <ReducedMotionToggle />
          </div>
        )}
        {isFeatureEnabled('SHOW_SIDENAV') && (
          <>
            {/* Dark tint over the page while the menu is open; clicking it
                closes the menu (Escape does too, for keyboard users) */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
              ref={overlayRef}
              className="nav-overlay"
              aria-hidden="true"
              onClick={() => setOpenNav(false)}
            />
            <dialog
              ref={navRef}
              id="site-nav-mobile"
              className="sidenav"
              aria-label="Site"
              // Closed menu links can't be tabbed to
              inert={!openNav}
            >
              <NavSlime fill={yellow} />
              {/* In page order; picking a link closes the menu and glides there */}
              {NAV_LINKS.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  // Position in the list, for the staggered fade-in
                  style={{ '--i': index }}
                  onClick={(event) => {
                    setOpenNav(false);
                    scrollToSection(event);
                  }}
                >
                  {link.label}
                </a>
              ))}
            </dialog>
            {/* Morphs into the X that closes the menu */}
            <div className="nav-button" ref={navButtonRef}>
              <MenuButton
                open={openNav}
                onClick={() => setOpenNav(!openNav)}
                controls="site-nav-mobile"
              />
            </div>
          </>
        )}
        <div className="header-title">
          <h1>
            <OutlinedText outline={2.5}>Frear Projects</OutlinedText>
          </h1>
          {/* Fades up once the slime has dropped in */}
          <p className={animation ? 'animate-in' : undefined}>
            Independent web development for creative teams.
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
  @media (min-width: ${breakpoints.desktop}) {
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
  height: 176px;
`;

const HeaderContainer = styled.div`
  position: relative;
  z-index: 10;
  display: grid;
  justify-content: space-between;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  background-color: transparent;
  height: 176px;
  @media (min-width: ${breakpoints.desktop}) {
    display: none;
  }
  /* Extra room below the Animate and menu buttons before the title */
  /* Animate button stays on top of (and usable in) the open menu */
  .toggle-wrapper {
    position: relative;
    z-index: 2;
    margin: 1.5rem 0 1.5rem 1rem;
    @media (min-width: ${breakpoints.tablet}) {
      margin-left: 2rem;
    }
    height: 20px;
  }
  /* Sits above the menu, so the menu drops in behind the title */
  .header-title {
    position: relative;
    z-index: 2;
    text-align: center;
    grid-column: 1 / -1;
  }
  h1 {
    font-family: 'Bowlby One SC';
    /* Sized so "Frear Projects" always fits on one line */
    font-size: min(58px, 9.6vw);
    line-height: 1;
    white-space: nowrap;
    color: ${lightYellow};
    padding: 0 10px;
  }

  p {
    ${SubtitleIntro}
    margin-top: 8px;
    padding: 0 10px;
    font-family: 'Fjalla One', sans-serif;
    font-size: clamp(17px, 2.8vw, 20px);
    line-height: 1.2;
    color: ${black};
    text-transform: lowercase;
  }

  /* Menu button in the top-right corner. While the menu is open it's
     pinned to the screen, so the X stays reachable if you scroll. */
  .nav-button {
    position: ${(props) => (props.openNav ? 'fixed' : 'absolute')};
    z-index: 2;
    top: 1rem;
    right: 1rem;
    @media (min-width: ${breakpoints.tablet}) {
      right: 2rem;
    }
  }

  /* Subtle dark tint over the page while the menu is open. Clicking
     anywhere outside the menu lands here and closes it. */
  .nav-overlay {
    position: fixed;
    inset: 0;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.25);
    opacity: ${(props) => (props.openNav ? 1 : 0)};
    visibility: ${(props) => (props.openNav ? 'visible' : 'hidden')};
    transition: ${(props) => {
      if (!props.animation) return 'none';
      return props.openNav
        ? 'opacity 0.4s ease'
        : 'opacity 0.3s ease, visibility 0s linear 0.3s';
    }};
  }

  /* The site menu: drops down from the top like falling slime, with drips
     hanging off its bottom edge (NavSlime). Lands with a little bounce. */
  .sidenav {
    display: block;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    max-width: none;
    max-height: none;
    margin: 0;
    /* Links start below the site title and subtitle */
    padding: 220px 20px 24px;
    border: none;
    background: transparent;
    color: black;
    /* Fully above the screen when closed, drips included */
    transform: ${(props) =>
      props.openNav ? 'translateY(0)' : 'translateY(calc(-100% - 70px))'};
    visibility: ${(props) => (props.openNav ? 'visible' : 'hidden')};
    transition: ${(props) => {
      if (!props.animation) return 'none';
      return props.openNav
        ? 'transform 0.6s cubic-bezier(0.34, 1.3, 0.64, 1)'
        : 'transform 0.35s ease-in, visibility 0s linear 0.35s';
    }};
  }

  /* The menu links: stacked and centered */
  .sidenav a {
    position: relative;
    display: block;
    width: fit-content;
    margin: 0 auto;
    padding: 10px 16px;
    font-family: 'Fjalla One', sans-serif;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 28px;
    color: black;
    text-align: center;
    /* Fade down into place one after another while the menu drops,
       all in by the time it lands (~0.6s). Quick fade out on close. */
    opacity: ${(props) => (props.openNav ? 1 : 0)};
    transform: ${(props) =>
      props.openNav ? 'translateY(0)' : 'translateY(-8px)'};
    transition: ${(props) => {
      if (!props.animation) return 'none';
      return props.openNav
        ? 'opacity 0.3s ease-out, transform 0.3s ease-out'
        : 'opacity 0.15s ease-in, transform 0.15s ease-in';
    }};
    transition-delay: ${(props) =>
      props.openNav && props.animation
        ? 'calc(100ms + var(--i, 0) * 60ms)'
        : '0s'};
  }

  .sidenav a:hover {
    color: #c8140e;
  }

  #main {
    transition: margin-left 0.5s;
    padding: 20px;
  }

  @media screen and (max-height: 450px) {
    .sidenav a {
      font-size: 18px;
    }
  }
`;
