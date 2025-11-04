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
  const iframe = useRef(null);
  const hasPlayedBeforeRef = useRef(false);
  const initialMountRef = useRef(true);
  const scrubberRef = useRef(null);
  const playerStateRef = useRef({ isPlaying: false });
  const isDraggingRef = useRef(false);

  const initializePlayer = () => {
    if (window.Vimeo && iframe.current) {
      const vimeoPlayer = new window.Vimeo.Player(iframe.current);
      setPlayer(vimeoPlayer);
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
  }, [player]);

  // Set up video event listeners for duration and progress tracking
  useEffect(() => {
    if (!player) return;

    let animationFrameId;

    const handlePlay = () => {
      playerStateRef.current.isPlaying = true;
      // Start polling time when video plays
      const updateTime = async () => {
        if (playerStateRef.current.isPlaying && !isDraggingRef.current) {
          try {
            const time = await player.getCurrentTime();
            setCurrentTime(time);
          } catch (e) {
            // Silently fail if player is no longer available
          }
        }
        animationFrameId = requestAnimationFrame(updateTime);
      };
      updateTime();
    };

    const handlePause = () => {
      playerStateRef.current.isPlaying = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    const handleDurationChange = (event) => {
      setDuration(event.duration);
    };

    player.on('play', handlePlay);
    player.on('pause', handlePause);
    player.on('loadedmetadata', handleDurationChange);

    // Get initial duration
    player.getDuration().then((dur) => {
      setDuration(dur);
    });

    return () => {
      player.off('play', handlePlay);
      player.off('pause', handlePause);
      player.off('loadedmetadata', handleDurationChange);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
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

  // Handle scrubber interaction
  const handleScrubberInteraction = async (clientX) => {
    if (!scrubberRef.current || !player) return;

    const scrubberRect = scrubberRef.current.getBoundingClientRect();
    const clickPosition = clientX - scrubberRect.left;
    const percentage = Math.max(0, Math.min(1, clickPosition / scrubberRect.width));
    const newTime = percentage * duration;

    setCurrentTime(newTime);
    await player.setCurrentTime(newTime);
  };

  const handleScrubberMouseDown = () => {
    isDraggingRef.current = true;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      handleScrubberInteraction(e.clientX);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [duration, player]);

  const handleScrubberClick = async (e) => {
    isDraggingRef.current = true;
    await handleScrubberInteraction(e.clientX);
    // Small delay to let the seek complete before resuming progress updates
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 100);
  };

  return (
    <VideoBGWrapper>
      <PosterWrapper isPlaying={videoHasStarted}>
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
      <ScrubberContainer
        ref={scrubberRef}
        onClick={handleScrubberClick}
        onMouseDown={handleScrubberMouseDown}
        role="slider"
        aria-label="Video progress"
        aria-valuemin="0"
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(currentTime)}
      >
        <ScrubberBar progress={(duration > 0 ? currentTime / duration : 0) * 100} />
      </ScrubberContainer>
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

const ScrubberContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  z-index: 12;
  display: flex;
  align-items: center;
  transition: height 0.2s ease;

  &:hover {
    height: 6px;
  }
`;

const ScrubberBar = styled.div`
  height: 100%;
  background-color: #ccd131;
  width: ${(props) => props.progress}%;
  transition: width 0.1s linear;
  border-radius: 2px;
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
