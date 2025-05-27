
import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import { comedyEvents } from '../data/events';

interface SeeAllComedyPageProps {
  onViewDetails: (eventId: string) => void;
  onGoHome: () => void;
}

const SeeAllComedyPage: React.FC<SeeAllComedyPageProps> = ({ onViewDetails, onGoHome }) => {
  const [sortBy, setSortBy] = useState<'title' | 'performer' | 'date'>('date');
  const [filterVenue, setFilterVenue] = useState<string>('all');

  const venues = ['all', ...new Set(comedyEvents.map(event => event.venue.split(',')[0]))];
  
  const filteredAndSortedEvents = comedyEvents
    .filter(event => filterVenue === 'all' || event.venue.includes(filterVenue))
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'performer':
          return a.performer.localeCompare(b.performer);
        case 'date':
          return a.date.localeCompare(b.date);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">All Comedy Shows</h1>
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
            <label className="text-sm font-medium text-gray-700">Filter by City:</label>
            <select
              value={filterVenue}
              onChange={(e) => setFilterVenue(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {venues.map(venue => (
                <option key={venue} value={venue}>
                  {venue === 'all' ? 'All Cities' : venue}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'title' | 'performer' | 'date')}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Date</option>
              <option value="title">Title</option>
              <option value="performer">Performer</option>
            </select>
          </div>
        </div>

        {/* Comedy Shows Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredAndSortedEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onViewDetails={onViewDetails}
              variant="comedy"
            />
          ))}
        </div>

        {filteredAndSortedEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No comedy shows found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeAllComedyPage;
