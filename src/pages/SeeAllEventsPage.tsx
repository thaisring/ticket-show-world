
import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import { popularEvents } from '../data/events';

interface SeeAllEventsPageProps {
  onViewDetails: (eventId: string) => void;
  onGoHome: () => void;
}

const SeeAllEventsPage: React.FC<SeeAllEventsPageProps> = ({ onViewDetails, onGoHome }) => {
  const [sortBy, setSortBy] = useState<'title' | 'category' | 'date'>('date');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const categories = ['all', ...new Set(popularEvents.map(event => event.category))];
  const types = ['all', 'Online', 'Offline'];
  
  const filteredAndSortedEvents = popularEvents
    .filter(event => filterCategory === 'all' || event.category === filterCategory)
    .filter(event => filterType === 'all' || event.type === filterType)
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
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
          <h1 className="text-3xl font-bold text-gray-900">All Events</h1>
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
            <label className="text-sm font-medium text-gray-700">Filter by Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Filter by Type:</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'title' | 'category' | 'date')}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 failure:ring-blue-500"
            >
              <option value="date">Date</option>
              <option value="title">Title</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredAndSortedEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onViewDetails={onViewDetails}
              variant="popular"
            />
          ))}
        </div>

        {filteredAndSortedEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeAllEventsPage;
