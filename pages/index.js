import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import HeaderMobile from '../components/HeaderMobile';
import Intro from '../components/Intro';
import About from '../components/About';
import FrontPage from '../components/FrontPage';
import Work from '../components/Work';

export default function Home() {
  return (
    <HomeWrapper>
      <Header />
      <HeaderMobile />
      <FrontPage />
      <Intro />
      <About />
      <Work />
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  position: relative;
`;
