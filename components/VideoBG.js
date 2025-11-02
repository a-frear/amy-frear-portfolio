import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Play from './icons/Play';
import Pause from './icons/Pause';

export default function VideoBG() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [player, setPlayer] = useState(null);
  const iframe = useRef(null);

  const initializePlayer = () => {
    if (window.Vimeo && iframe.current) {
      const vimeoPlayer = new window.Vimeo.Player(iframe.current);
      setPlayer(vimeoPlayer);

      // Listen to play/pause events
      vimeoPlayer.on('play', () => setIsPlaying(true));
      vimeoPlayer.on('pause', () => setIsPlaying(false));
    }
  };

  useEffect(() => {
    // Check if Vimeo API is already loaded
    if (window.Vimeo) {
      initializePlayer();
    } else {
      // Load Vimeo Player API only once
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      script.onload = initializePlayer;
      document.head.appendChild(script);
    }
  }, []);

  const togglePlayPause = async () => {
    if (!player) return;

    try {
      const paused = await player.getPaused();
      if (paused) {
        await player.play();
        setIsPlaying(true);
      } else {
        await player.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error controlling video:', error);
    }
  };

  return (
    <VideoBGWrapper>
      <iframe
        ref={iframe}
        title="bg-video"
        src="https://player.vimeo.com/video/547280824?h=050797c24d&autoplay=1&loop=1&background=1&autopause=0&muted=1"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      />
      <Button type="button" onClick={togglePlayPause}>
        {isPlaying ? <Pause /> : <Play />}
      </Button>
    </VideoBGWrapper>
  );
}

const VideoBGWrapper = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  animation: fadeIn 2s ease-in forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

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
  z-index: 10;
  background-color: transparent;
  border: none;
  padding: 0;
  svg {
    width: 50px;
    height: 50px;
    display: block;
    color: white;
  }
  &:hover {
    filter: brightness(0.8);
  }
  &:active {
    transform: scale(0.97);
  }
`;
