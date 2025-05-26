
import React from 'react';
import { SidebarTrigger } from './ui/sidebar';
import SearchBar from './SearchBar';
import LocationSearch from './LocationSearch';
import UserSection from './UserSection';
import Navigation from './Navigation';

interface HeaderProps {
  onHomeClick: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick, onSearch, searchQuery }) => {
  return (
    <div className="sticky top-0 z-50 bg-white border-b">
      {/* Main Header */}
      <header className="bg-[#333237] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <SidebarTrigger className="text-white hover:bg-gray-700 flex-shrink-0" />
              <button 
                onClick={onHomeClick}
                className="text-xl sm:text-2xl font-bold hover:text-gray-300 transition-colors truncate"
              >
                BookMyTicket
              </button>
              
              {/* Search Bar - Hidden on mobile, shown on md+ */}
              <SearchBar
                onSearch={onSearch}
                searchQuery={searchQuery}
                className="hidden md:flex min-w-0 flex-1 max-w-md lg:max-w-lg"
              />
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Location */}
              <LocationSearch />

              {/* User Section */}
              <UserSection />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden border-t border-gray-600">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <SearchBar
              onSearch={onSearch}
              searchQuery={searchQuery}
              placeholder="Search Movies, Events, Plays..."
            />
          </div>
        </div>
      </header>

      {/* Sub Navigation */}
      <Navigation />
    </div>
  );
};

export default Header;
