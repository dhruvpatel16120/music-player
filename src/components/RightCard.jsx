import React from "react";
import AddSongCard from "./AddSongCard";

export default function RightCard({ playlist, currentSongIndex, playSongAtIndex, onAddSong }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col space-y-4">
      {/* Scrollable playlist */}
     <h3 className="text-lg font-semibold text-purple-300 mb-2">PlayList</h3>
      <div className="flex-1 overflow-y-auto max-h-[50vh] bg-white/5 rounded-xl p-3 space-y-2">
        <h3 className="text-lg font-semibold text-purple-300 mb-2">Playlist</h3>
        {playlist.map((song, idx) => (
          <div
            key={idx}
            onClick={() => playSongAtIndex(idx)}
            className={`cursor-pointer p-3 rounded-md text-sm transition-all duration-300 ${
              idx === currentSongIndex ? "bg-purple-600 shadow-lg scale-105" : "hover:bg-purple-500/30"
            }`}
          >
            <div className="truncate font-medium text-white">{song.title}</div>
            <div className="text-xs text-purple-400">{song.artist}</div>
          </div>
        ))}
      </div>

      {/* Add song section */}
      <div className="mt-2">
        <h3 className="text-lg font-semibold text-purple-300 mb-2">Add Song</h3>
        <AddSongCard onAddSong={onAddSong} />
      </div>
    </div>
  );
}
