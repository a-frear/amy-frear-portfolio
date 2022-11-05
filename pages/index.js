import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import HeaderMobile from '../components/HeaderMobile';
import Curve2 from '../components/icons/Curve2';
import Intro from '../components/Intro';
import FrontPage from '../components/FrontPage';
import About from '../components/About';

export default function Home() {
  return (
    <HomeWrapper>
      <Curve2 animate="true" />
      <Header />
      <HeaderMobile />
      <FrontPage />
      <Intro />
      <About />
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  position: relative;
`;
