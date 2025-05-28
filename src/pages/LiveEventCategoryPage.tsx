
import React, { useState, useMemo } from 'react';
import { useUserShows } from '@/hooks/useUserShows';
import UserShowCard from '../components/UserShowCard';
import EventCard from '../components/EventCard';
import { events, comedyEvents, popularEvents } from '../data/events';

interface LiveEventCategoryPageProps {
  categoryTitle: string;
  onViewDetails: (eventId: string) => void;
  onGoHome: () => void;
}

const LiveEventCategoryPage: React.FC<LiveEventCategoryPageProps> = ({ 
  categoryTitle, 
  onViewDetails, 
  onGoHome 
}) => {
  const [sortBy, setSortBy] = useState<'title' | 'date' | 'genre'>('title');
  const [filterPrice, setFilterPrice] = useState<string>('all');

  // Map category titles to relevant content
  const getCategoryContent = () => {
    switch (categoryTitle.toLowerCase()) {
      case 'comedy shows':
        return {
          title: 'Comedy Shows',
          events: comedyEvents,
          genre: 'Comedy'
        };
      case 'kids':
        return {
          title: 'Kids Shows',
          events: events.filter(e => e.genre?.toLowerCase().includes('family') || e.genre?.toLowerCase().includes('kids')),
          genre: 'Family'
        };
      case 'music shows':
        return {
          title: 'Music Shows',
          events: popularEvents.filter(e => e.category?.toLowerCase().includes('music')),
          genre: 'Music'
        };
      case 'art & crafts':
        return {
          title: 'Art & Crafts',
          events: events.filter(e => e.genre?.toLowerCase().includes('art')),
          genre: 'Workshop'
        };
      case 'workshop & more':
        return {
          title: 'Workshops & More',
          events: [...events, ...popularEvents].filter(e => {
            const eventGenre = 'genre' in e ? e.genre : '';
            const eventCategory = 'category' in e ? e.category : '';
            return eventGenre?.toLowerCase().includes('workshop') || 
                   eventCategory?.toLowerCase().includes('workshop');
          }),
          genre: 'Workshop'
        };
      default:
        return {
          title: categoryTitle,
          events: [],
          genre: 'all'
        };
    }
  };

  const { title, events: categoryEvents, genre } = getCategoryContent();
  const { userShows } = useUserShows(genre === 'all' ? undefined : genre);

  // Combine user shows and events
  const allContent = useMemo(() => {
    const combinedContent = [
      ...userShows.map(show => ({ ...show, type: 'user-show' as const })),
      ...categoryEvents.map(event => ({ ...event, type: 'event' as const }))
    ];

    // Apply filters
    let filtered = combinedContent;
    
    if (filterPrice !== 'all') {
      const priceRange = filterPrice.split('-').map(Number);
      filtered = filtered.filter(item => {
        const price = 'ticket_price' in item ? Number(item.ticket_price) : 0;
        if (priceRange.length === 2) {
          return price >= priceRange[0] && price <= priceRange[1];
        }
        return price >= priceRange[0];
      });
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
          const dateA = 'show_date' in a ? new Date(a.show_date) : new Date();
          const dateB = 'show_date' in b ? new Date(b.show_date) : new Date();
          return dateA.getTime() - dateB.getTime();
        case 'genre':
          const genreA = 'genre' in a ? a.genre : '';
          const genreB = 'genre' in b ? b.genre : '';
          return genreA.localeCompare(genreB);
        default:
          return 0;
      }
    });
  }, [userShows, categoryEvents, sortBy, filterPrice]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <button
            onClick={onGoHome}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Filter by Price:</label>
            <select
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Prices</option>
              <option value="0-500">₹0 - ₹500</option>
              <option value="500-1000">₹500 - ₹1000</option>
              <option value="1000-2000">₹1000 - ₹2000</option>
              <option value="2000">₹2000+</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'title' | 'date' | 'genre')}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="title">Title</option>
              <option value="date">Date</option>
              <option value="genre">Genre</option>
            </select>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {allContent.map((item) => (
            item.type === 'user-show' ? (
              <UserShowCard
                key={item.id}
                show={item}
                onViewDetails={onViewDetails}
              />
            ) : (
              <EventCard
                key={item.id}
                event={item}
                onViewDetails={onViewDetails}
                variant={categoryTitle.toLowerCase().includes('comedy') ? 'comedy' : 'default'}
              />
            )
          ))}
        </div>

        {allContent.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No {title.toLowerCase()} found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveEventCategoryPage;
