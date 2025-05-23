
import React from 'react';

const HeroBanner: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 flex items-center justify-center h-80 px-5">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4 text-shadow-lg">
            Experience Entertainment
          </h1>
          <p className="text-xl mb-6 text-shadow">
            Book your favorite movies, events, and shows
          </p>
          <button className="bg-[#f84464] hover:bg-[#d83454] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors shadow-lg">
            Explore Now
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </div>
  );
};

export default HeroBanner;
