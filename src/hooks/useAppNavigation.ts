import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { events } from '../data/events';

type ViewType = 'home' | 'details' | 'seats' | 'payment' | 'confirmation' | 'see-all-movies' | 'see-all-comedy' | 'see-all-events' | 'see-all-premieres' | 'premiere-detail' | 'explore' | 'show-detail' | 'booking' | 'booking-success' | 'auth' | 'live-event-category';
type CategoryType = 'all' | 'movies' | 'stream' | 'events' | 'plays' | 'sports' | 'activities';

interface AppState {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  setSelectedEvent: (event: any) => void;
  setSelectedShowId: (id: string | null) => void;
  setSelectedPremiereIndex: (index: number) => void;
  setSelectedShowtimeIndex: (index: number) => void;
  setSelectedSeats: (seats: string[]) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: CategoryType) => void;
  setSelectedLiveEventCategory: (category: string) => void;
  selectedSeats: string[];
  selectedEvent: any;
  selectedShowtimeIndex: number;
  userShows: any[];
}

export const useAppNavigation = (state: AppState) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewDetails = (eventId: string) => {
    // Check if it's a premiere
    if (eventId.startsWith('premiere-')) {
      const index = parseInt(eventId.replace('premiere-', ''));
      state.setSelectedPremiereIndex(index);
      state.setCurrentView('premiere-detail');
      return;
    }

    // Check if it's a user show
    const userShow = state.userShows.find(show => show.id === eventId);
    if (userShow) {
      state.setSelectedShowId(eventId);
      state.setCurrentView('show-detail');
      return;
    }

    // Otherwise, it's an event
    const event = events.find(e => e.id === eventId);
    if (event) {
      state.setSelectedEvent(event);
      state.setCurrentView('details');
    }
  };

  const handleExploreNow = () => {
    state.setCurrentView('explore');
  };

  const handleLiveEventCategoryClick = (categoryTitle: string) => {
    state.setSelectedLiveEventCategory(categoryTitle);
    state.setCurrentView('live-event-category');
  };

  const handleBookNow = () => {
    if (!user) {
      state.setCurrentView('auth');
      return;
    }
    state.setCurrentView('booking');
  };

  const handleBookingComplete = () => {
    state.setCurrentView('booking-success');
  };

  const handleSelectSeats = (showtimeIndex: number) => {
    if (!user) {
      state.setCurrentView('auth');
      return;
    }
    state.setSelectedShowtimeIndex(showtimeIndex);
    state.setSelectedSeats([]);
    state.setCurrentView('seats');
  };

  const handleSeatClick = (seatId: string) => {
    state.setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleBookSeats = () => {
    if (state.selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    state.setCurrentView('payment');
  };

  const handlePaymentComplete = () => {
    if (state.selectedEvent && state.selectedShowtimeIndex >= 0) {
      const showtime = state.selectedEvent.showtimes[state.selectedShowtimeIndex];
      showtime.seats.forEach((row: any) => {
        row.forEach((seat: any) => {
          if (state.selectedSeats.includes(seat.id)) {
            seat.status = 'booked';
          }
        });
      });
    }
    
    state.setCurrentView('confirmation');
  };

  const handleGoHome = () => {
    state.setCurrentView('home');
    state.setSelectedEvent(null);
    state.setSelectedShowId(null);
    state.setSelectedPremiereIndex(-1);
    state.setSelectedShowtimeIndex(-1);
    state.setSelectedSeats([]);
    state.setSearchQuery('');
    state.setSelectedCategory('all');
    state.setSelectedLiveEventCategory('');
  };

  const handleGoBack = () => {
    if (['show-detail', 'booking', 'booking-success', 'premiere-detail', 'explore', 'live-event-category', 'auth'].includes(state.currentView)) {
      state.setCurrentView('home');
    } else {
      handleGoHome();
    }
  };

  const handleSearch = (query: string) => {
    state.setSearchQuery(query);
  };

  const handleCategorySelect = (category: CategoryType) => {
    state.setSelectedCategory(category);
  };

  const handleListYourShow = () => {
    if (!user) {
      state.setCurrentView('auth');
      return;
    }
    navigate('/list-your-show');
  };

  const handleSeeAllMovies = () => {
    state.setCurrentView('see-all-movies');
  };

  const handleSeeAllComedy = () => {
    state.setCurrentView('see-all-comedy');
  };

  const handleSeeAllEvents = () => {
    state.setCurrentView('see-all-events');
  };

  const handleSeeAllPremieres = () => {
    state.setCurrentView('see-all-premieres');
  };

  return {
    handleViewDetails,
    handleExploreNow,
    handleLiveEventCategoryClick,
    handleBookNow,
    handleBookingComplete,
    handleSelectSeats,
    handleSeatClick,
    handleBookSeats,
    handlePaymentComplete,
    handleGoHome,
    handleGoBack,
    handleSearch,
    handleCategorySelect,
    handleListYourShow,
    handleSeeAllMovies,
    handleSeeAllComedy,
    handleSeeAllEvents,
    handleSeeAllPremieres
  };
};
