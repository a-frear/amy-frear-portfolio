import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Play from './icons/Play';

export default function VideoBG() {
  const [pause, setPause] = useState(false);
  const iframe = useRef(null);

  const controlVideo = function (e) {
    console.log('hi');
    if (iframe) {
      const iframeSrc = iframe.src;
      iframe.src = iframeSrc;
    }
    if (iframe.video) {
      iframe.video.pause();
    }
  };
  return (
    <VideoBGWrapper>
      <iframe
        ref={iframe}
        title="bg-video"
        src="https://player.vimeo.com/video/547280824?h=050797c24d?autoplay=1&loop=1&background=1&autopause=0"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      />
      <Button type="button" onClick={() => controlVideo()}>
        <Play />
      </Button>
    </VideoBGWrapper>
  );
}

const VideoBGWrapper = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  width: 100%;
  height: 100%;
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

const Button = styled.button`
  position: absolute;
  right: 20px;
  bottom: 40px;
  cursor: pointer;
  z-index: 2;
  background-color: transparent;
  svg {
    width: 50px;
    height: 50px;
  }
  &:hover {
    background-color: green;
  }
`;
