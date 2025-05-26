
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  className?: string;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  searchQuery, 
  className = "",
  placeholder = "Search for Movies, Events, Plays, Sports and Activities"
}) => {
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
    <div className={`flex items-center bg-white rounded-md px-3 py-2 ${className}`}>
      <Search className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
      <form onSubmit={handleSearchSubmit} className="flex-1 min-w-0">
        <input
          type="text"
          placeholder={placeholder}
          value={localSearchQuery}
          onChange={handleSearchChange}
          className="w-full outline-none text-gray-700 text-sm"
        />
      </form>
    </div>
  );
};

export default SearchBar;
