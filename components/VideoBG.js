import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

export default function VideoBG() {
  return (
    <VideoBGWrapper>
      <Overlay />
      <iframe
        title="bg-video"
        src="https://player.vimeo.com/video/547280824?h=050797c24d?autoplay=1&loop=1&background=1"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    </VideoBGWrapper>
  );
}

const VideoBGWrapper = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
  iframe {
    width: 100vw;
    height: 56.25vw; /* Given a 16:9 aspect ratio, 9/16*100 = 56.25 */
    min-height: 100vh;
    min-width: 177.77vh; /* Given a 16:9 aspect ratio, 16/9*100 = 177.77 */
    position: absolute;
    top: 50%;
    left: 1%;
    transform: translate(-50%, -50%);
    @media (min-width: 750px) {
      left: 50%;
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 2;
  /* background: linear-gradient(0deg, rgba(0, 42, 61, 0), rgba(0, 42, 61, 0.3)); */
  /* background: rgba(187, 192, 133, 0.2); */
`;
