import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import HeaderMobile from '../components/HeaderMobile';
import Intro from '../components/Intro';
import FrontPage from '../components/FrontPage';
import About from '../components/About';
import Projects from '../components/Projects';

export default function Home() {
  return (
    <HomeWrapper>
      <Header />
      <HeaderMobile />
      <FrontPage />
      <Intro />
      <About />
      <Projects />
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  position: relative;
`;
