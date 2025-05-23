
import React from 'react';
import HeroBanner from '../components/HeroBanner';
import EventSections from '../components/EventSections';
import { Event, ComedyEvent, PopularEvent, LiveEventCategory } from '../data/events';

interface HomePageProps {
  searchQuery: string;
  selectedCategory: 'all' | 'movies' | 'stream' | 'events' | 'plays' | 'sports' | 'activities';
  filteredEvents: Event[];
  filteredComedyEvents: ComedyEvent[];
  filteredPopularEvents: PopularEvent[];
  liveEventCategories: LiveEventCategory[];
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
