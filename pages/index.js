import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import HeaderMobile from '../components/HeaderMobile';
import Intro from '../components/Intro';
import About from '../components/About';
import FrontPage from '../components/FrontPage';
import Work from '../components/Work';
import { useScrollColor } from '../hooks/useScrollColor';
import { blue, darkBlue, gold, green, orange } from '../styles/colors';

export default function Home() {
  // Define the color palette for the gradient transition
  const colors = [gold, green, darkBlue];

  const backgroundColor = useScrollColor(colors);

  return (
    <HomeWrapper backgroundColor={backgroundColor}>
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
  background-color: ${(props) => props.backgroundColor};
  transition: background-color 0.1s ease-out;
`;
