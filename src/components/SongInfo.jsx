import React from "react";

export default function SongInfo({ title, artist }) {
  return (
    <div className="flex flex-col items-center mt-4 space-y-1">
      {/* Title */}
      <div className="text-3xl font-semibold text-purple-300 drop-shadow-[0_0_5px_#a855f7] tracking-wide text-center">
        {title}
      </div>

      {/* Decorative underline – now animated */}
      <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full my-1 animate-pulse"></div>

      {/* Artist */}
      <div className="text-base md:text-lg text-purple-400 italic opacity-80">
        {artist}
      </div>
    </div>
  );
}
