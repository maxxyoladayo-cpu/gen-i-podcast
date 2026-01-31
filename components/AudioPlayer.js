'use client';

import { useState, useRef, useEffect } from 'react';
import { trackPlay } from '@/app/actions';

export default function AudioPlayer({ src, title, episodeId }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const hasTrackedPlay = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const setAudioDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);

      // Only track play once per session for this episode
      if (!hasTrackedPlay.current && episodeId) {
        trackPlay(episodeId);
        hasTrackedPlay.current = true;
      }
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const width = e.target.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const newTime = (clickX / width) * duration;
    audioRef.current.currentTime = newTime;
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="audio-player">
      <div className="info">
        <span className="now-playing">Now Playing</span>
        <h4 className="title">{title}</h4>
      </div>

      <div className="controls">
        <button className="play-btn" onClick={togglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </button>

        <div className="progress-container" onClick={handleSeek}>
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <div className="time">
          <span>{formatTime(audioRef.current?.currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <audio ref={audioRef} src={src} />

      <style jsx>{`
        .audio-player {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 2rem;
        }
        .info {
          margin-bottom: 1rem;
        }
        .now-playing {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--primary-yellow);
          display: block;
          margin-bottom: 0.25rem;
        }
        .title {
          font-size: 1.1rem;
          font-weight: 600;
        }
        .controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .play-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--primary-yellow);
          color: #000;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
        .play-btn:hover {
          transform: scale(1.05);
        }
        .progress-container {
          flex: 1;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          background: var(--primary-yellow);
          border-radius: 3px;
          pointer-events: none;
        }
        .time {
          font-size: 0.8rem;
          font-variant-numeric: tabular-nums;
          color: var(--text-secondary);
          display: flex;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
}
