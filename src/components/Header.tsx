
import React, { useState } from 'react';
import { Search, MapPin, User, Menu } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';

interface HeaderProps {
  onHomeClick: () => void;
  onSearch: (query: string) => void;
  onSignInClick: () => void;
  searchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick, onSearch, onSignInClick, searchQuery }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="sticky top-0 z-50 bg-white border-b">
      {/* Main Header */}
      <header className="bg-[#333237] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="text-white hover:bg-gray-700" />
              <button 
                onClick={onHomeClick}
                className="text-2xl font-bold hover:text-gray-300 transition-colors"
              >
                BookMyTicket
              </button>
              
              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-white rounded-md px-3 py-2 min-w-96">
                <Search className="h-4 w-4 text-gray-400 mr-2" />
                <form onSubmit={handleSearchSubmit} className="flex-1">
                  <input
                    type="text"
                    placeholder="Search for Movies, Events, Plays, Sports and Activities"
                    value={localSearchQuery}
                    onChange={handleSearchChange}
                    className="w-full outline-none text-gray-700 text-sm"
                  />
                </form>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Location */}
              <div className="flex items-center space-x-1 text-sm cursor-pointer hover:text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Guwahati</span>
              </div>

              {/* Sign In Button */}
              <button
                onClick={onSignInClick}
                className="bg-[#f84464] hover:bg-[#d83454] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign In
              </button>

              {/* Menu Button */}
              <button className="text-white hover:text-gray-300">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sub Navigation */}
      <nav className="bg-[#1f2533] text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex space-x-8">
              <a href="#" className="text-sm hover:text-white transition-colors">Movies</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Stream</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Events</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Plays</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Sports</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Activities</a>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-sm hover:text-white transition-colors">ListYourShow</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Corporates</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Offers</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Gift Cards</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
