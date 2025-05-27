
import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import { events } from '../data/events';

interface SeeAllMoviesPageProps {
  onViewDetails: (eventId: string) => void;
  onGoHome: () => void;
}

const SeeAllMoviesPage: React.FC<SeeAllMoviesPageProps> = ({ onViewDetails, onGoHome }) => {
  const [sortBy, setSortBy] = useState<'title' | 'genre' | 'duration'>('title');
  const [filterGenre, setFilterGenre] = useState<string>('all');

  const genres = ['all', ...new Set(events.map(event => event.genre))];
  
  const filteredAndSortedEvents = events
    .filter(event => filterGenre === 'all' || event.genre === filterGenre)
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'genre':
          return a.genre.localeCompare(b.genre);
        case 'duration':
          return a.duration.localeCompare(b.duration);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">All Movies</h1>
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
            <label className="text-sm font-medium text-gray-700">Filter by Genre:</label>
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'title' | 'genre' | 'duration')}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="title">Title</option>
              <option value="genre">Genre</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredAndSortedEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onViewDetails={onViewDetails} 
            />
          ))}
        </div>

        {filteredAndSortedEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No movies found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeAllMoviesPage;
