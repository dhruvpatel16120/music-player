import React, { useState, useRef, useEffect } from "react";
import { FaMusic } from "react-icons/fa";
import PlayerControls from "./PlayerControls";
import SongInfo from "./SongInfo";
import VolumeControl from "./VolumeControl";
import RightCard from "./RightCard";

export default function MusicPlayer() {
  const [playlist, setPlaylist] = useState([
    { title: "Default Music", artist: "Audio", src: "audio/song1.mp3" },
  ]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const audioRef = useRef(null);
  const currentSong = playlist[currentSongIndex];
  const isMuted = volume <= 0.01;

  // Update progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const percent = (audio.currentTime / audio.duration) * 100 || 0;
      setProgress(percent);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [currentSongIndex]);

  // Handle song end (repeat/shuffle/next)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play();
      } else if (shuffle) {
        playSongAtIndex(Math.floor(Math.random() * playlist.length));
      } else {
        next();
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [currentSongIndex, shuffle, repeat, playlist]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.warn("Play blocked:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const next = () => {
    if (!playlist.length) return;
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    playSongAtIndex(nextIndex);
  };

  const prev = () => {
    if (!playlist.length) return;
    const prevIndex = currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1;
    playSongAtIndex(prevIndex);
  };

  const playSongAtIndex = (idx) => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setCurrentSongIndex(idx);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current.load();
      audioRef.current.play().catch((e) => console.warn("Autoplay blocked:", e));
    }, 0);
  };

  const handleVolumeChange = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const handleAddSong = (newSong) => {
    if (!newSong || !newSong.src) return;
    setPlaylist((prev) => [...prev, newSong]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] to-[#2e1065] flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[85vh] max-w-6xl w-full">
        
        {/* Center player card */}
        <div className="relative bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col justify-between items-center space-y-4">
          
          {/* Top title */}
          <div className="flex items-center space-x-3">
            <FaMusic className="text-purple-400 text-2xl" />
            <h2 className="text-xl font-semibold">My Music Player</h2>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-center space-x-4 text-xs text-purple-300 bg-white/5 rounded-md px-3 py-1">
            <span>Shuffle: <span className={shuffle ? "text-green-400" : "text-red-400"}>{shuffle ? "On" : "Off"}</span></span>
            <span>Repeat: <span className={repeat ? "text-green-400" : "text-red-400"}>{repeat ? "On" : "Off"}</span></span>
            <span>Mute: <span className={isMuted ? "text-red-400" : "text-green-400"}>{isMuted ? "On" : "Off"}</span></span>
          </div>

          {/* Volume control */}
          <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />

          {/* Cover + song info */}
          <div className="flex flex-col items-center space-y-2">
            <img
              src="audio/default_cover.jpg"
              alt={currentSong.title}
              className={`w-64 h-64 md:w-72 md:h-72 rounded-full object-cover shadow-xl ${isPlaying ? "animate-spin-slow" : ""}`}
            />
            <SongInfo title={currentSong.title} artist={currentSong.artist} />
          </div>

          {/* Controls, progress, timing */}
          <PlayerControls
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            next={next}
            prev={prev}
            shuffle={shuffle}
            repeat={repeat}
            setShuffle={setShuffle}
            setRepeat={setRepeat}
            progress={progress}
            onSeek={(e) => {
              const audio = audioRef.current;
              if (audio && audio.duration) {
                const percent = parseFloat(e.target.value);
                const newTime = (percent / 100) * audio.duration;
                audio.currentTime = newTime;
                setProgress(percent);
              }
            }}
            currentTime={audioRef.current?.currentTime}
            duration={audioRef.current?.duration}
          />

          <audio ref={audioRef} src={currentSong?.src} />
        </div>

        {/* Right playlist & add song */}
        <RightCard
          playlist={playlist}
          currentSongIndex={currentSongIndex}
          playSongAtIndex={playSongAtIndex}
          onAddSong={handleAddSong}
          onUpdatePlaylist={setPlaylist}
          isPlaying={isPlaying}
        />
      </div>
    </div>
  );
}
