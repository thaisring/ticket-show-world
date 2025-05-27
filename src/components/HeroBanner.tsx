
import React from 'react';

interface HeroBannerProps {
  onExploreNow?: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreNow }) => {
  return (
    <div className="w-full bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 flex items-center justify-center h-64 sm:h-80 px-4 sm:px-5">
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-shadow-lg">
            Experience Entertainment
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 text-shadow">
            Book your favorite movies, events, and shows
          </p>
          <button 
            onClick={onExploreNow}
            className="bg-[#f84464] hover:bg-[#d83454] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg transition-colors shadow-lg"
          >
            Explore Now
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-16 sm:h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </div>
  );
};

export default HeroBanner;
