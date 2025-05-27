
import React, { useState, useMemo } from 'react';
import { useUserShows } from '@/hooks/useUserShows';
import { events, comedyEvents, popularEvents } from '../data/events';
import EventCard from '../components/EventCard';
import UserShowCard from '../components/UserShowCard';

interface ExplorePageProps {
  onViewDetails: (showId: string) => void;
  onGoHome: () => void;
}

const ExplorePage: React.FC<ExplorePageProps> = ({ onViewDetails, onGoHome }) => {
  const [filterGenre, setFilterGenre] = useState<string>('all');
  const [filterPrice, setFilterPrice] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'price' | 'date'>('title');
  const [showType, setShowType] = useState<'all' | 'community' | 'movies' | 'events'>('all');

  const { userShows, loading } = useUserShows();

  // Get all unique genres from all sources
  const allGenres = useMemo(() => {
    const eventGenres = events.map(e => e.genre);
    const comedyGenres = comedyEvents.map(e => e.type || 'Comedy');
    const userGenres = userShows.map(s => s.genre);
    return ['all', ...new Set([...eventGenres, ...comedyGenres, ...userGenres])];
  }, [userShows]);

  // Filter and sort all shows/events
  const filteredAndSortedItems = useMemo(() => {
    let allItems: any[] = [];

    // Add user shows
    if (showType === 'all' || showType === 'community') {
      allItems = [...allItems, ...userShows.map(show => ({ ...show, type: 'userShow' }))];
    }

    // Add events (movies)
    if (showType === 'all' || showType === 'movies') {
      allItems = [...allItems, ...events.map(event => ({ ...event, type: 'event' }))];
    }

    // Add comedy events and popular events
    if (showType === 'all' || showType === 'events') {
      allItems = [...allItems, 
        ...comedyEvents.map(event => ({ ...event, type: 'comedyEvent' })),
        ...popularEvents.map(event => ({ ...event, type: 'popularEvent' }))
      ];
    }

    // Filter by genre
    if (filterGenre !== 'all') {
      allItems = allItems.filter(item => {
        if (item.type === 'userShow') return item.genre === filterGenre;
        if (item.type === 'event') return item.genre === filterGenre;
        if (item.type === 'comedyEvent') return (item.type || 'Comedy') === filterGenre;
        if (item.type === 'popularEvent') return item.category === filterGenre;
        return false;
      });
    }

    // Filter by price
    if (filterPrice !== 'all') {
      allItems = allItems.filter(item => {
        const price = item.ticket_price || 250; // Default price for events
        if (filterPrice === 'free') return price === 0;
        if (filterPrice === 'under500') return price < 500;
        if (filterPrice === 'under1000') return price < 1000;
        if (filterPrice === 'above1000') return price >= 1000;
        return true;
      });
    }

    // Sort items
    return allItems.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'price':
          const priceA = a.ticket_price || 250;
          const priceB = b.ticket_price || 250;
          return priceA - priceB;
        case 'date':
          if (a.show_date && b.show_date) {
            return new Date(a.show_date).getTime() - new Date(b.show_date).getTime();
          }
          return 0;
        default:
          return 0;
      }
    });
  }, [userShows, filterGenre, filterPrice, sortBy, showType]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-5">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Explore All Shows & Events</h1>
          <button
            onClick={onGoHome}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Filter and Sort Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Show Type:</label>
              <select
                value={showType}
                onChange={(e) => setShowType(e.target.value as any)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Shows & Events</option>
                <option value="community">Community Shows</option>
                <option value="movies">Movies</option>
                <option value="events">Events</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Genre:</label>
              <select
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {allGenres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre === 'all' ? 'All Genres' : genre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range:</label>
              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Prices</option>
                <option value="free">Free</option>
                <option value="under500">Under ₹500</option>
                <option value="under1000">Under ₹1000</option>
                <option value="above1000">₹1000+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="title">Title</option>
                <option value="price">Price</option>
                <option value="date">Date</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedItems.length} results
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedItems.map((item, index) => (
            <div key={`${item.type}-${item.id || index}`}>
              {item.type === 'userShow' ? (
                <UserShowCard show={item} onViewDetails={onViewDetails} />
              ) : (
                <EventCard 
                  event={item} 
                  onViewDetails={onViewDetails}
                  variant={item.type === 'comedyEvent' ? 'comedy' : item.type === 'popularEvent' ? 'popular' : 'default'}
                />
              )}
            </div>
          ))}
        </div>

        {filteredAndSortedItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No shows or events found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
