import React from "react";
import { FaBackward, FaForward, FaPlay, FaPause, FaRandom, FaRedo } from "react-icons/fa";

export default function PlayerControls({
  isPlaying,
  togglePlay,
  next,
  prev,
  shuffle,
  repeat,
  setShuffle,
  setRepeat,
  progress,
  onSeek,
  currentTime,
  duration,
}) {
  // Format time helper
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center space-y-2 w-full">
      {/* Controls row */}
      <div className="flex items-center justify-center space-x-4">
        {/* Shuffle */}
        <button
          onClick={() => setShuffle(!shuffle)}
          aria-label="Shuffle"
          className={`text-lg transition ${
            shuffle ? "text-purple-400 drop-shadow-[0_0_3px_#a855f7]" : "text-white hover:text-white"
          }`}
        >
          <FaRandom />
        </button>

        {/* Previous */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="text-lg text-purple-300 hover:text-purple-100 transition"
        >
          <FaBackward />
        </button>

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 shadow-md hover:shadow-lg active:scale-95 transition"
        >
          {isPlaying ? <FaPause className="text-white" /> : <FaPlay className="text-white ml-0.5" />}
        </button>

        {/* Next */}
        <button
          onClick={next}
          aria-label="Next"
          className="text-lg text-purple-300 hover:text-purple-100 transition"
        >
          <FaForward />
        </button>

        {/* Repeat */}
        <button
          onClick={() => setRepeat(!repeat)}
          aria-label="Repeat"
          className={`text-lg transition ${
            repeat ? "text-purple-400 drop-shadow-[0_0_3px_#a855f7]" : "text-white hover:text-white"
          }`}
        >
          <FaRedo />
        </button>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col items-center w-full">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={onSeek}
          className="w-full h-1 accent-purple-500 rounded-full cursor-pointer"
          aria-label="Seek"
        />
        <div className="flex justify-between w-full text-xs text-purple-300 mt-0.5">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
