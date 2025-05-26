
import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-[#1f2533] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex space-x-4 sm:space-x-8 overflow-x-auto">
            <a href="#" className="text-sm hover:text-white transition-colors whitespace-nowrap">Movies</a>
            <a href="#" className="text-sm hover:text-white transition-colors whitespace-nowrap">Stream</a>
            <a href="#" className="text-sm hover:text-white transition-colors whitespace-nowrap">Events</a>
            <a href="#" className="text-sm hover:text-white transition-colors whitespace-nowrap">Plays</a>
            <a href="#" className="text-sm hover:text-white transition-colors whitespace-nowrap">Sports</a>
            <a href="#" className="text-sm hover:text-white transition-colors whitespace-nowrap">Activities</a>
          </div>
          <div className="hidden lg:flex space-x-6">
            <a href="#" className="text-sm hover:text-white transition-colors">ListYourShow</a>
            <a href="#" className="text-sm hover:text-white transition-colors">Corporates</a>
            <a href="#" className="text-sm hover:text-white transition-colors">Offers</a>
            <a href="#" className="text-sm hover:text-white transition-colors">Gift Cards</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
