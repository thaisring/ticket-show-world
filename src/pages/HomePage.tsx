
import React from 'react';
import HeroBanner from '../components/HeroBanner';
import EventSections from '../components/EventSections';
import UserShowsSection from '../components/UserShowsSection';
import GenreShowsSection from '../components/GenreShowsSection';
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
  onSeeAllMovies?: () => void;
  onSeeAllComedy?: () => void;
  onSeeAllEvents?: () => void;
  onSeeAllPremieres?: () => void;
}

const HomePage: React.FC<HomePageProps> = (props) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroBanner />
      
      {/* Show all community shows when no specific category is selected */}
      {props.selectedCategory === 'all' && (
        <UserShowsSection onViewDetails={props.onViewDetails} />
      )}
      
      {/* Show genre-specific community shows when a category is selected */}
      {props.selectedCategory !== 'all' && props.selectedCategory !== 'stream' && (
        <GenreShowsSection 
          selectedCategory={props.selectedCategory}
          onViewDetails={props.onViewDetails}
        />
      )}
      
      <EventSections 
        {...props}
        onSeeAllMovies={props.onSeeAllMovies}
        onSeeAllComedy={props.onSeeAllComedy}
        onSeeAllEvents={props.onSeeAllEvents}
        onSeeAllPremieres={props.onSeeAllPremieres}
      />
    </div>
  );
};

export default HomePage;
