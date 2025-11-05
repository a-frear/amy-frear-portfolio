import { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { ReducedMotionContext } from '../context/context.js';
import Play from './icons/Play';
import Pause from './icons/Pause';
import { breakpoints } from '../styles/breakpoints';
import VisuallyHiddenText from './VisuallyHiddenText';

export default function VideoBG() {
  const { animation } = useContext(ReducedMotionContext);
  const [isPlaying, setIsPlaying] = useState(() => animation);
  const [player, setPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videoHasStarted, setVideoHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isIframeReady, setIsIframeReady] = useState(false);
  const iframe = useRef(null);
  const hasPlayedBeforeRef = useRef(false);
  const initialMountRef = useRef(true);
  const playerStateRef = useRef({ isPlaying: false });
  const isSeekingRef = useRef(false);
  const lastStateUpdateRef = useRef(0);

  const initializePlayer = () => {
    if (window.Vimeo && iframe.current) {
      const vimeoPlayer = new window.Vimeo.Player(iframe.current);
      setPlayer(vimeoPlayer);
      // Mark iframe as ready once Vimeo player is initialized
      setIsIframeReady(true);
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

  // Only handle autoplay on initial mount based on animation setting
  useEffect(() => {
    if (player && initialMountRef.current) {
      if (animation) {
        player.play().catch(() => {
          // Autoplay might be blocked, that's ok
        });
        setIsPlaying(true);
        setVideoHasStarted(true);
        hasPlayedBeforeRef.current = true;
      } else {
        // If animation is off on mount, make sure button shows Play icon
        setIsPlaying(false);
      }
      initialMountRef.current = false;
    }
  }, [player, animation]);

  // Set up video event listeners for duration and progress tracking
  useEffect(() => {
    if (!player) return;

    const handlePlay = () => {
      playerStateRef.current.isPlaying = true;
    };

    const handlePause = () => {
      playerStateRef.current.isPlaying = false;
    };

    const handleDurationChange = (event) => {
      setDuration(event.duration);
    };

    // Handle time updates from Vimeo player with throttling
    const handleTimeUpdate = (event) => {
      const time = event.seconds;

      // Skip state updates while seeking - we'll update in handleSeeked instead
      if (isSeekingRef.current) {
        return;
      }

      // Throttle state updates to 100ms to avoid performance issues
      const now = Date.now();
      if (now - lastStateUpdateRef.current > 100) {
        setCurrentTime(time);
        lastStateUpdateRef.current = now;
      }
    };

    // Handle seek completion
    const handleSeeked = (event) => {
      isSeekingRef.current = false;
      const time = event.seconds;
      setCurrentTime(time);
      lastStateUpdateRef.current = Date.now();
    };

    player.on('play', handlePlay);
    player.on('pause', handlePause);
    player.on('loadedmetadata', handleDurationChange);
    player.on('timeupdate', handleTimeUpdate);
    player.on('seeked', handleSeeked);

    // Get initial duration
    player.getDuration().then((dur) => {
      setDuration(dur);
    });

    return () => {
      player.off('play', handlePlay);
      player.off('pause', handlePause);
      player.off('loadedmetadata', handleDurationChange);
      player.off('timeupdate', handleTimeUpdate);
      player.off('seeked', handleSeeked);
    };
  }, [player]);

  const togglePlayPause = async () => {
    if (!player) return;

    try {
      const paused = await player.getPaused();

      if (paused) {
        // Show spinner on first play
        if (!hasPlayedBeforeRef.current) {
          setIsLoading(true);
          hasPlayedBeforeRef.current = true;
        }
        await player.play();
        setIsPlaying(true);
        setVideoHasStarted(true);

        // Hide spinner after 2 seconds (covers most buffering)
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } else {
        await player.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error controlling video:', error);
      setIsLoading(false);
    }
  };

  // Handle scrubber change - seek video when user interacts with range input
  const handleTimelineChange = async (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    isSeekingRef.current = true;

    try {
      await player.setCurrentTime(newTime);
      // The 'seeked' event will fire when seek completes and clear isSeekingRef
    } catch (error) {
      console.error('Error seeking video:', error);
      isSeekingRef.current = false;
    }
  };

  return (
    <VideoBGWrapper>
      <PosterWrapper isPlaying={videoHasStarted} isIframeReady={isIframeReady}>
        <iframe
          ref={iframe}
          title="bg-video"
          src="https://player.vimeo.com/video/547280824?h=050797c24d&autoplay=0&loop=1&background=1&autopause=0&muted=1"
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
      <TimelineInput
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={handleTimelineChange}
        step="0.1"
        aria-label="Video progress"
      />
      <Button type="button" onClick={togglePlayPause}>
        {isPlaying ? <Pause /> : <Play />}
        <VisuallyHiddenText>
          {isPlaying ? 'Pause background video' : 'Play background video'}
        </VisuallyHiddenText>
      </Button>
    </VideoBGWrapper>
  );
}

const VideoBGWrapper = styled.div`
  position: absolute;
  top: 0;
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
    transform: translate3d(-50%, -50%, 0);
    will-change: opacity;
    backface-visibility: hidden;
    perspective: 1000px;
    background-color: #000;
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
    opacity: ${(props) => (props.isPlaying && props.isIframeReady ? 1 : 0)};
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
  width: 80px;
  height: 80px;
  border: 6px solid rgba(204, 209, 49, 0.4);
  border-top-color: #ccd131;
  border-right-color: #ccd131;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  box-shadow: 0 0 20px rgba(204, 209, 49, 0.5);

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const TimelineInput = styled.input`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 6px;
  z-index: 12;
  margin: 0;
  padding: 20px 0 0 0;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  box-sizing: border-box;
  -webkit-appearance: none;
  appearance: none;

  /* Track styling */
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 12px;
    background: linear-gradient(
      to right,
      #ccd131 0%,
      #ccd131
        ${(props) => (props.max > 0 ? (props.value / props.max) * 100 : 0)}%,
      rgba(255, 255, 255, 0.2)
        ${(props) => (props.max > 0 ? (props.value / props.max) * 100 : 0)}%,
      rgba(255, 255, 255, 0.2) 100%
    );
    border-radius: 2px;
  }

  &::-moz-range-track {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    border: none;
  }

  &::-moz-range-progress {
    background-color: #ccd131;
    border-radius: 2px;
    height: 6px;
  }

  /* Hide thumb/slider */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0;
    height: 0;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 0;
    height: 0;
    cursor: pointer;
    border: none;
    background: transparent;
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
  &:hover,
  &:focus-visible {
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
