import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ReducedMotionContext } from '../context/context.js';
import ReducedMotionToggle from './ReducedMotionToggle.js';
import Hamburger from './icons/Hamburger.js';
import { red, lightYellow } from '../styles/colors';

export default function Header() {
  const { animation } = useContext(ReducedMotionContext);
  const [openNav, setOpenNav] = useState(false);

  return (
    <HeaderWrapper openNav={openNav} animation={animation}>
      <div className="toggle-wrapper">
        <ReducedMotionToggle />
      </div>
      <h1>Amy Frear</h1>
      <h2>Web Developer</h2>
      <dialog id="mySidenav" className="sidenav">
        <button
          className="closebtn"
          onClick={() => setOpenNav(!openNav)}
          type="button"
        >
          &times;
        </button>

        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#clients">Clients</a>
        <a href="#contact">Contact</a>

        <div ariah-hidden="true" className="curve-vertical" />
      </dialog>
      <button onClick={() => setOpenNav(!openNav)} type="button">
        <Hamburger />
      </button>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr; */
  position: relative;
  display: flex;
  align-items: center;
  /* margin-top: 4rem; */
  .toggle-wrapper {
    position: absolute;
    left: 1rem;
    top: 2rem;
    width: 300px;
  }
  h1 {
    position: absolute;
    left: 0;
    right: 0;
    top: 2rem;
    margin: 0 auto;
    width: 550px;
    font-family: 'Bowlby One SC';
    font-size: clamp(18px, 10vw, 85px);
    color: ${lightYellow};
    text-shadow: -2px 2px 0 #000, 2px 2px 0 #000, 2px -2px 0 #000,
      -2px -2px 0 #000;
  }

  h2 {
    position: absolute;
    left: 0;
    right: 0;
    top: 8rem;
    margin: 0 auto;
    width: 550px;
    font-family: 'Bowlby One SC';
    font-size: clamp(14px, 4vw, 42px);
    color: ${lightYellow};
    text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
      -1px -1px 0 #000;
  }

  button {
    position: absolute;
    right: 2rem;
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
    /* background-color: #ccff66; */
    background-color: ${lightYellow};
    border-radius: 50% 0 0 50%;
    border: ${(props) => (props.openNav ? `2px solid black` : `none`)};
    border-right: none;
    /* border-top-left-radius: 50% 100%;
    border-bottom-left-radius: 50% 100%; */
    overflow-x: hidden;
    padding: 60px 0 0 0; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
    button {
      /* color: ${red}; */
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
