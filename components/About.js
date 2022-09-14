import React from 'react';
import styled from 'styled-components';
import { orange, lightYellow, green, pink } from '../styles/colors';

export default function About() {
  return (
    <AboutWrapper>
      <Content>
        <Heading>About</Heading>
      </Content>
    </AboutWrapper>
  );
}

const AboutWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  grid-gap: 10%;
`;

const Content = styled.div`
  grid-column: 1 / 2;
  background-color: ${pink};
  padding-bottom: 200px;
`;

const Heading = styled.h1`
  font-size: clamp(24px, 8vw, 76px);
  font-family: 'Bowlby One SC';
  color: ${lightYellow};
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;
`;
