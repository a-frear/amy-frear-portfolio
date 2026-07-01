import { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { ReducedMotionContext } from '../context/context.js';
import Play from './icons/Play';
import Pause from './icons/Pause';
import Mute from './icons/Mute';
import BlobSpinner from './icons/BlobSpinner';
import { breakpoints } from '../styles/breakpoints';
import VisuallyHiddenText from './VisuallyHiddenText';

export default function VideoBG() {
  const { animation } = useContext(ReducedMotionContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videoHasStarted, setVideoHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isIframeReady, setIsIframeReady] = useState(false);
  const [isVideoActuallyPlaying, setIsVideoActuallyPlaying] = useState(false);
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

  // Initialize video state on mount - no autoplay
  // useEffect(() => {
  //   if (initialMountRef.current) {
  //     // Always start paused, user must click play
  //     setIsPlaying(false);
  //     initialMountRef.current = false;
  //   }
  // }, []);

  // Set up video event listeners for duration and progress tracking
  useEffect(() => {
    if (!player) return;

    const handlePlay = () => {
      playerStateRef.current.isPlaying = true;
      // Delay revealing iframe by 300ms to ensure Vimeo player is fully rendered
      // This prevents blur artifacts on initial load
      setTimeout(() => {
        setIsVideoActuallyPlaying(true);
        setIsLoading(false);
      }, 300);
    };

    const handlePause = () => {
      playerStateRef.current.isPlaying = false;
      setIsVideoActuallyPlaying(false);
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

        // Fallback: hide spinner after 2 seconds if play event didn't fire
        // (The play event handler will also call setIsLoading(false) when video starts)
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

  const toggleMute = async () => {
    if (!player) return;

    try {
      if (isMuted) {
        // Unmute
        await player.setVolume(1);
        setIsMuted(false);
      } else {
        // Mute
        await player.setVolume(0);
        setIsMuted(true);
      }
    } catch (error) {
      console.error('Error controlling volume:', error);
    }
  };

  // Handle scrubber change - seek video when user interacts with range input
  const handleTimelineChange = async (e) => {
    if (!player) return;

    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    isSeekingRef.current = true;

    try {
      // Check if video was playing before seek
      const wasPlaying = await player.getPaused().then((paused) => !paused);

      await player.setCurrentTime(newTime);

      // Resume playback if video was playing before seek
      // This handles mobile where video may pause after seeking
      if (wasPlaying) {
        await player.play();
      }

      // Fallback: clear seeking flag after 500ms if seeked event doesn't fire
      setTimeout(() => {
        if (isSeekingRef.current) {
          isSeekingRef.current = false;
          setCurrentTime(newTime);
          lastStateUpdateRef.current = Date.now();
        }
      }, 500);
    } catch (error) {
      console.error('Error seeking video:', error);
      isSeekingRef.current = false;
    }
  };

  return (
    <VideoBGWrapper>
      <PosterWrapper
        isPlaying={isPlaying}
        isIframeReady={isIframeReady}
        isVideoActuallyPlaying={isVideoActuallyPlaying}
        videoHasStarted={videoHasStarted}
      >
        <iframe
          ref={iframe}
          title="bg-video"
          src="https://player.vimeo.com/video/1134232578?h=c72e2e0a73&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;muted=1&amp;loop=1&amp;background=1&amp;autoplay=0&amp;quality=1080p"
          width="100%"
          height="100%"
          allow="autoplay; fullscreen; picture-in-picture"
        />
      </PosterWrapper>
      {isLoading && (
        <LoadingSpinner>
          <BlobSpinner />
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
      <MuteButton type="button" onClick={toggleMute}>
        <Mute isMuted={isMuted} />
        <VisuallyHiddenText>
          {isMuted ? 'Unmute background video' : 'Mute background video'}
        </VisuallyHiddenText>
      </MuteButton>
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

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.3)
    );
    z-index: 5;
    pointer-events: none;
  }

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
    display: ${(props) =>
      props.isVideoActuallyPlaying || props.videoHasStarted ? 'block' : 'none'};
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

const MuteButton = styled.button`
  position: absolute;
  left: 10px;
  bottom: 16px;
  cursor: pointer;
  z-index: 10;
  background-color: transparent;
  border: none;
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
    left: 20px;
    bottom: 25px;
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
