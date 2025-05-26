
import React, { useState, useRef, useEffect } from 'react';
import { MapPin, X } from 'lucide-react';

// Popular cities in India for suggestions
const popularCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
  'Pune', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur', 
  'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
  'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',
  'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Vasai-Virar',
  'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar',
  'Navi Mumbai', 'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore',
  'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai',
  'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur'
];

const LocationSearch: React.FC = () => {
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const locationSearchRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the location search to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationSearchRef.current && !locationSearchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocationClick = () => {
    setShowLocationSearch(true);
    setLocationSearchQuery('');
    setFilteredCities([]);
    setShowSuggestions(false);
  };

  const handleLocationSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locationSearchQuery.trim()) {
      setSelectedCity(locationSearchQuery.trim());
      setShowLocationSearch(false);
      setLocationSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleLocationSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocationSearchQuery(query);
    
    if (query.trim()) {
      const filtered = popularCities.filter(city =>
        city.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8); // Show max 8 suggestions
      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredCities([]);
      setShowSuggestions(false);
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowLocationSearch(false);
    setLocationSearchQuery('');
    setShowSuggestions(false);
  };

  const handleCloseLocationSearch = () => {
    setShowLocationSearch(false);
    setLocationSearchQuery('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative" ref={locationSearchRef}>
      {showLocationSearch ? (
        <div className="relative">
          <div className="flex items-center bg-white rounded-md px-3 py-2 min-w-48">
            <MapPin className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
            <form onSubmit={handleLocationSearchSubmit} className="flex-1">
              <input
                type="text"
                placeholder="Enter your city"
                value={locationSearchQuery}
                onChange={handleLocationSearchChange}
                className="w-full outline-none text-gray-700 text-sm"
                autoFocus
              />
            </form>
            <button
              type="button"
              onClick={handleCloseLocationSearch}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          {/* City Suggestions Dropdown */}
          {showSuggestions && filteredCities.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
              {filteredCities.map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleCitySelect(city)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <MapPin className="h-3 w-3 text-gray-400 mr-2" />
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div 
          className="hidden sm:flex items-center space-x-1 text-sm cursor-pointer hover:text-gray-300"
          onClick={handleLocationClick}
        >
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="hidden lg:inline">
            {selectedCity || "Your Location"}
          </span>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
