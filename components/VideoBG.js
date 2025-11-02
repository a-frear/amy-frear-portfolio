import { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { ReducedMotionContext } from '../context/context.js';
import Play from './icons/Play';
import Pause from './icons/Pause';
import { breakpoints } from '../styles/breakpoints';

export default function VideoBG() {
  const { animation } = useContext(ReducedMotionContext);
  const [isPlaying, setIsPlaying] = useState(() => animation);
  const [player, setPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const iframe = useRef(null);

  const initializePlayer = () => {
    if (window.Vimeo && iframe.current) {
      const vimeoPlayer = new window.Vimeo.Player(iframe.current);
      setPlayer(vimeoPlayer);

      // Listen for the 'loadstart' event to detect when video starts loading
      // Listen for 'canplay' event to know when it's ready to play
      vimeoPlayer.on('canplay', () => {
        setIsVideoReady(true);
      });

      // Also mark as ready after a short delay to ensure it's initialized
      setTimeout(() => {
        setIsVideoReady(true);
      }, 2000);
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

  // Update isPlaying when animation setting changes
  useEffect(() => {
    if (player) {
      if (animation) {
        player.play().catch(() => {
          // Autoplay might be blocked, that's ok
        });
        setIsPlaying(true);
      } else {
        player.pause().catch(() => {
          // Pause might fail, that's ok
        });
        setIsPlaying(false);
        setIsLoading(false);
      }
    }
  }, [animation, player]);

  const togglePlayPause = async () => {
    if (!player) return;

    try {
      const paused = await player.getPaused();
      if (paused) {
        // Only show loading spinner if video hasn't been fully loaded yet
        if (!isVideoReady) {
          setIsLoading(true);
        }
        await player.play();
        setIsPlaying(true);

        // Hide spinner after video plays
        setIsLoading(false);
      } else {
        await player.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error controlling video:', error);
      setIsLoading(false);
    }
  };

  return (
    <VideoBGWrapper>
      <PosterWrapper isPlaying={isPlaying}>
        <iframe
          ref={iframe}
          title="bg-video"
          src={`https://player.vimeo.com/video/547280824?h=050797c24d&autoplay=${
            animation ? 1 : 0
          }&loop=1&background=1&autopause=0&muted=1`}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </PosterWrapper>
      {isLoading && (
        <LoadingSpinner>
          <Spinner />
        </LoadingSpinner>
      )}
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

  iframe {
    width: 100vw;
    height: 56.25vw; /* Given a 16:9 aspect ratio, 9/16*100 = 56.25 */
    min-height: 100vh;
    min-width: 177.77vh; /* Given a 16:9 aspect ratio, 16/9*100 = 177.77 */
    position: absolute;
    top: 50%;
    left: 1%;
    transform: translate(-50%, -50%);
    @media (min-width: ${breakpoints.tablet}) {
      left: 50%;
    }
  }
`;

const PosterWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/assets/eyesite-demo-still.jpeg');
  background-size: cover;
  background-position: center;

  @media (max-width: ${breakpoints.tablet}) {
    background-position: 73% 30%;
  }

  iframe {
    opacity: ${(props) => (props.isPlaying ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`;

const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(204, 209, 49, 0.4);
  border-top-color: #ccd131;
  border-right-color: #ccd131;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  box-shadow: 0 0 10px rgba(204, 209, 49, 0.5);

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Button = styled.button`
  position: absolute;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
  z-index: 10;
  background-color: transparent;
  border: none;
  padding: 10px;
  svg {
    width: 50px;
    height: 50px;
    display: block;
    color: white;
  }
  &:hover {
    opacity: 0.8;
  }
  &:active {
    transform: scale(0.97);
  }
  @media (min-width: ${breakpoints.tablet}) {
    right: 20px;
    bottom: 20px;
  }
`;
