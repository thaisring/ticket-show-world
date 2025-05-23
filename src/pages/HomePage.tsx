
import React from 'react';
import HeroBanner from '../components/HeroBanner';
import EventSections from '../components/EventSections';
import { Event } from '../data/events';

interface HomePageProps {
  searchQuery: string;
  selectedCategory: 'all' | 'movies' | 'stream' | 'events' | 'plays' | 'sports' | 'activities';
  filteredEvents: Event[];
  filteredComedyEvents: Event[];
  filteredPopularEvents: Event[];
  liveEventCategories: any[];
  premieres: any[];
  onViewDetails: (eventId: string) => void;
}

const HomePage: React.FC<HomePageProps> = (props) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroBanner />
      <EventSections {...props} />
    </div>
  );
};

export default HomePage;
