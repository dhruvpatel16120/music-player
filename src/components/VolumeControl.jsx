import React from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function VolumeControl({ volume, onVolumeChange }) {
  // Define thresholds for mute vs normal
  const isMuted = volume <= 0.01;

  return (
    <div className="flex items-center space-x-2 sm:space-x-3 w-full max-w-xs">
      {/* Volume / Mute icon */}
      <button
        aria-label={isMuted ? "Unmute" : "Mute"}
        onClick={() => onVolumeChange({ target: { value: isMuted ? 1.0 : 0 } })}
        className="text-white hover:text-purple-200 transition text-base sm:text-lg"
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>

      {/* Volume slider */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={onVolumeChange}
        className="flex-1 h-1 accent-purple-500 rounded-full cursor-pointer"
        aria-label="Volume"
      />

      {/* Volume % text */}
      <span className="text-sm sm:text-base text-white">{Math.round(volume * 100)}%</span>
    </div>
  );
}
