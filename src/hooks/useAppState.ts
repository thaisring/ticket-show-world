
import { useState, useMemo } from 'react';
import { 
  events, 
  liveEventCategories, 
  popularEvents, 
  comedyEvents, 
  premieres,
  Event
} from '../data/events';
import { useUserShows } from './useUserShows';

type ViewType = 'home' | 'details' | 'seats' | 'payment' | 'confirmation' | 'see-all-movies' | 'see-all-comedy' | 'see-all-events' | 'see-all-premieres' | 'premiere-detail' | 'explore' | 'show-detail' | 'booking' | 'booking-success' | 'auth' | 'live-event-category';
type CategoryType = 'all' | 'movies' | 'stream' | 'events' | 'plays' | 'sports' | 'activities';

export const useAppState = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedShowId, setSelectedShowId] = useState<string | null>(null);
  const [selectedPremiereIndex, setSelectedPremiereIndex] = useState<number>(-1);
  const [selectedShowtimeIndex, setSelectedShowtimeIndex] = useState<number>(-1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedLiveEventCategory, setSelectedLiveEventCategory] = useState<string>('');

  const { userShows } = useUserShows();

  // Get the selected user show
  const selectedUserShow = selectedShowId ? userShows.find(show => show.id === selectedShowId) : null;

  // Get the selected premiere
  const selectedPremiere = selectedPremiereIndex >= 0 ? premieres[selectedPremiereIndex] : null;

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return events;
    return events.filter(event => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredComedyEvents = useMemo(() => {
    if (!searchQuery.trim()) return comedyEvents;
    return comedyEvents.filter(event => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.performer?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredPopularEvents = useMemo(() => {
    if (!searchQuery.trim()) return popularEvents;
    return popularEvents.filter(event => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return {
    // State
    currentView,
    setCurrentView,
    selectedEvent,
    setSelectedEvent,
    selectedShowId,
    setSelectedShowId,
    selectedPremiereIndex,
    setSelectedPremiereIndex,
    selectedShowtimeIndex,
    setSelectedShowtimeIndex,
    selectedSeats,
    setSelectedSeats,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedLiveEventCategory,
    setSelectedLiveEventCategory,
    
    // Computed values
    selectedUserShow,
    selectedPremiere,
    filteredEvents,
    filteredComedyEvents,
    filteredPopularEvents,
    
    // Static data
    liveEventCategories,
    premieres,
    userShows
  };
};
