import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaExpand, FaCompress, FaBackward, FaForward } from "react-icons/fa";
import "./customVideoPlayer/style.css";

const App = () => {
  const [playing, setPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playerRef = useRef(null);
  const fullScreenHandle = useFullScreenHandle();

  useEffect(() => {
    if (fullScreenHandle.active) {
      const timeout = setTimeout(() => setShowControls(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showControls, fullScreenHandle.active]);

  const handlePlay = () => setPlaying(!playing);
  const handleMute = () => setMute(!mute);
  const handleSetVolume = (e) => setVolume(parseFloat(e.target.value));

  const handleProgress = (progress) => {
    if (!seeking) {
      setPlayed(progress.played);
      setCurrentTime(progress.playedSeconds);
    }
  };

  const handleDuration = (duration) => setDuration(duration);

  const handleSeekMouseDown = () => setSeeking(true);
  const handleSeekChange = (e) => setPlayed(parseFloat(e.target.value));
  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    const seekTime = parseFloat(e.target.value) * duration;
    playerRef.current.seekTo(seekTime);
    setCurrentTime(seekTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Skip Backward 10 seconds
  const handleSkipBackward = () => {
    const newTime = Math.max(currentTime - 10, 0);
    playerRef.current.seekTo(newTime);
    setCurrentTime(newTime);
  };

  // Skip Forward 10 seconds
  const handleSkipForward = () => {
    const newTime = Math.min(currentTime + 10, duration);
    playerRef.current.seekTo(newTime);
    setCurrentTime(newTime);
  };

  return (
    <div className={`video-container ${fullScreenHandle.active ? "fullscreen-active" : ""}`} onMouseMove={() => setShowControls(true)}>
      <FullScreen handle={fullScreenHandle} className="fullscreen-wrapper">
        <div className="video-wrapper">
          <ReactPlayer
            ref={playerRef}
            playing={playing}
            muted={mute}
            volume={volume}
            url="https://www.youtube.com/watch?v=ATElufr0OiE"
            className="video-player"
            width="100%"
            height="100%"
            onProgress={handleProgress}
            onDuration={handleDuration}
          />
        </div>

        <div className={`controls ${fullScreenHandle.active ? "fullscreen-controls" : ""} ${showControls ? "visible" : "hidden"}`}>
          <input
            type="range"
            value={played}
            max={1}
            step={0.01}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
            className="progress-bar"
          />

          <div className="bottom-controls">
            <div className="left-controls">
              
              <button onClick={handleMute} className="control-btn">
                {mute ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <input
                type="range"
                value={volume}
                min={0}
                max={1}
                step={0.1}
                onChange={handleSetVolume}
                className="volume-slider"
              />
              <span className="video-timing">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>

            <div className="center-controls">
              <button onClick={handleSkipBackward} className="skip-btn">
                <FaBackward />
              </button>

              <button onClick={handlePlay} className="play-btn">
                {playing ? <FaPause /> : <FaPlay />}
              </button>

              <button onClick={handleSkipForward} className="skip-btn">
                <FaForward />
              </button>
            </div>

            <button onClick={fullScreenHandle.active ? fullScreenHandle.exit : fullScreenHandle.enter} className="fullscreen-btn">
              {fullScreenHandle.active ? <FaCompress /> : <FaExpand />}
            </button>
          </div>

        </div>
      </FullScreen>
    </div>
  );
};

export default App;
