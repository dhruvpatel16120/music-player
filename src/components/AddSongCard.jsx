import React, { useState } from "react";
import { FaPlus, FaLink } from "react-icons/fa";

export default function AddSongCard({ onAddSong }) {
  const [url, setUrl] = useState("");

  const handleFile = (file) => {
    if (file) {
      const newSong = {
        title: file.name,
        artist: "Local File",
        src: URL.createObjectURL(file),
      };
      onAddSong(newSong);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl space-y-4">
      <h3 className="text-lg font-semibold text-purple-300 mb-2">Add Song</h3>
      <div className="equalizer mb-4">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div> 
      
      </div>


      {/* Add local file */}
      <label className="flex flex-col items-center cursor-pointer">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-md hover:shadow-lg active:scale-95 transition mb-2">
          <FaPlus className="text-white text-lg" />
        </div>
        <span className="text-sm text-purple-300">Add Local Song</span>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => handleFile(e.target.files[0])}
          className="hidden"
        />
      </label>

    </div>
  );
}
