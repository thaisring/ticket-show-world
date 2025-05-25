
import React, { useState } from 'react';
import { Search, MapPin, User, LogOut } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface HeaderProps {
  onHomeClick: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick, onSearch, searchQuery }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map((name: string) => name[0])
        .join('')
        .toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

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
              <div className="hidden md:flex items-center bg-white rounded-md px-3 py-2 min-w-0 flex-1 max-w-md lg:max-w-lg">
                <Search className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                <form onSubmit={handleSearchSubmit} className="flex-1 min-w-0">
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
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Location */}
              <div className="hidden sm:flex items-center space-x-1 text-sm cursor-pointer hover:text-gray-300">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="hidden lg:inline">Guwahati</span>
              </div>

              {/* User Section */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-[#f84464] text-white text-xs">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                  <Button
                    onClick={handleAuthClick}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-gray-700"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline ml-1">Sign Out</span>
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleAuthClick}
                  className="bg-[#f84464] hover:bg-[#d83454] text-white px-3 py-2 sm:px-4 rounded-md text-sm font-medium transition-colors flex-shrink-0"
                >
                  <span className="hidden sm:inline">Sign In</span>
                  <User className="h-4 w-4 sm:hidden" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden border-t border-gray-600">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center bg-white rounded-md px-3 py-2">
              <Search className="h-4 w-4 text-gray-400 mr-2" />
              <form onSubmit={handleSearchSubmit} className="flex-1">
                <input
                  type="text"
                  placeholder="Search Movies, Events, Plays..."
                  value={localSearchQuery}
                  onChange={handleSearchChange}
                  className="w-full outline-none text-gray-700 text-sm"
                />
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Sub Navigation */}
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
    </div>
  );
};

export default Header;
