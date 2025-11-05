import { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { ReducedMotionContext } from '../context/context.js';
import Play from './icons/Play';
import Pause from './icons/Pause';
import { breakpoints } from '../styles/breakpoints';
import VisuallyHiddenText from './VisuallyHiddenText';

export default function VideoBG() {
  const { animation } = useContext(ReducedMotionContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoHasStarted, setVideoHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVideoActuallyPlaying, setIsVideoActuallyPlaying] = useState(false);
  const videoRef = useRef(null);
  const hasPlayedBeforeRef = useRef(false);
  const isSeekingRef = useRef(false);
  const lastStateUpdateRef = useRef(0);

  // Set up video event listeners for duration and progress tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      // Delay revealing video by 300ms to ensure it's rendered smoothly
      // This prevents blur artifacts on initial load
      setTimeout(() => {
        setIsVideoActuallyPlaying(true);
        setIsLoading(false);
      }, 300);
    };

    const handlePause = () => {
      setIsVideoActuallyPlaying(false);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    // Handle time updates with throttling
    const handleTimeUpdate = () => {
      // Skip state updates while seeking - we'll update in handleSeeked instead
      if (isSeekingRef.current) {
        return;
      }

      // Throttle state updates to 100ms to avoid performance issues
      const now = Date.now();
      if (now - lastStateUpdateRef.current > 100) {
        setCurrentTime(video.currentTime);
        lastStateUpdateRef.current = now;
      }
    };

    // Handle seek completion
    const handleSeeked = () => {
      isSeekingRef.current = false;
      setCurrentTime(video.currentTime);
      lastStateUpdateRef.current = Date.now();
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.paused) {
        // Show spinner on first play
        if (!hasPlayedBeforeRef.current) {
          setIsLoading(true);
          hasPlayedBeforeRef.current = true;
        }
        video.play();
        setIsPlaying(true);
        setVideoHasStarted(true);

        // Fallback: hide spinner after 2 seconds if play event didn't fire
        // (The play event handler will also call setIsLoading(false) when video starts)
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error controlling video:', error);
      setIsLoading(false);
    }
  };

  // Handle scrubber change - seek video when user interacts with range input
  const handleTimelineChange = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    isSeekingRef.current = true;

    try {
      const wasPlaying = !video.paused;
      video.currentTime = newTime;

      // Resume playback if video was playing before seek
      // This handles mobile where video may pause after seeking
      if (wasPlaying) {
        video.play();
      }

      // Fallback: clear seeking flag after 500ms if seeked event doesn't fire
      setTimeout(() => {
        if (isSeekingRef.current) {
          isSeekingRef.current = false;
          setCurrentTime(video.currentTime);
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
        isVideoActuallyPlaying={isVideoActuallyPlaying}
        videoHasStarted={videoHasStarted}
      >
        <video
          ref={videoRef}
          title="bg-video"
          width="100%"
          height="100%"
          loop
          muted
          playsInline
        >
          <source src="/assets/eye_site___les_mains___i'm_too_sad_to_tell_you_homage_v1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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

  video {
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
    object-fit: cover;
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

  video {
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
