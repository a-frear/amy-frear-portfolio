import React from 'react';
import styled from 'styled-components';
import Curve2 from './icons/Curve2';

export default function FrontPage() {
  return <IntroSection />;
}

const IntroSection = styled.section`
  position: relative;
  height: 100vh;
  background-image: url(assets/blob.jpg);
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  z-index: -1;
  margin-top: 0;
`;
