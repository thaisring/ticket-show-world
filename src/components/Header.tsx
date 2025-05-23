
import React from 'react';
import { Search, MapPin, Menu } from 'lucide-react';

interface HeaderProps {
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  return (
    <>
      <header className="bg-[#333237] text-white px-5 py-3 flex justify-between items-center h-16">
        <div className="flex items-center gap-5">
          <h1 
            className="text-2xl font-bold cursor-pointer hover:text-gray-200 transition-colors"
            onClick={onHomeClick}
          >
            BookMyTicket
          </h1>
          <div className="hidden md:flex items-center bg-white rounded px-3 py-2 min-w-[300px]">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for Movies, Events, Plays, Sports and Activities"
              className="flex-1 text-black text-sm outline-none"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1 cursor-pointer">
            <MapPin className="w-4 h-4 text-gray-300" />
            <span className="text-gray-300 text-sm">Guwahati</span>
          </div>
          <button className="bg-[#f84464] hover:bg-[#d83454] px-4 py-2 rounded text-sm font-medium transition-colors">
            Sign In
          </button>
          <button className="p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>
      
      <nav className="bg-[#1f2533] text-gray-200 px-5 py-3 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <a href="#" className="text-sm font-medium hover:text-white transition-colors">Movies</a>
          <a href="#" className="text-sm font-medium hover:text-white transition-colors">Stream</a>
          <a href="#" className="text-sm font-medium hover:text-white transition-colors">Events</a>
          <a href="#" className="text-sm font-medium hover:text-white transition-colors">Plays</a>
          <a href="#" className="text-sm font-medium hover:text-white transition-colors">Sports</a>
          <a href="#" className="text-sm font-medium hover:text-white transition-colors">Activities</a>
        </div>
        <div className="hidden md:flex items-center gap-5">
          <a href="#" className="text-sm font-medium hover:text-white transition-colors">ListYourShow</a>
          <a href="#" className="text-sm font-medium hover:text-white transition-colors">Corporates</a>
          <a href="#" className="text-sm font-medium hover:text-white transition-colors">Offers</a>
          <a href="#" className="text-sm font-medium hover:text-white transition-colors">Gift Cards</a>
        </div>
      </nav>
    </>
  );
};

export default Header;
