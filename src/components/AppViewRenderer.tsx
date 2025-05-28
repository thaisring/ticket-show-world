
import React from 'react';
import HomePage from '../pages/HomePage';
import EventDetailsPage from '../pages/EventDetailsPage';
import SeatSelectionPage from '../pages/SeatSelectionPage';
import PaymentPage from '../pages/PaymentPage';
import BookingConfirmationPage from '../pages/BookingConfirmationPage';
import SeeAllMoviesPage from '../pages/SeeAllMoviesPage';
import SeeAllComedyPage from '../pages/SeeAllComedyPage';
import SeeAllEventsPage from '../pages/SeeAllEventsPage';
import SeeAllPremieresPage from '../pages/SeeAllPremieresPage';
import PremiereDetailPage from '../pages/PremiereDetailPage';
import ExplorePage from '../pages/ExplorePage';
import ShowDetailPage from '../pages/ShowDetailPage';
import BookingPage from '../pages/BookingPage';
import BookingSuccessPage from '../pages/BookingSuccessPage';
import AuthPage from '../pages/AuthPage';
import LiveEventCategoryPage from '../pages/LiveEventCategoryPage';

interface AppViewRendererProps {
  currentView: string;
  state: {
    searchQuery: string;
    selectedCategory: string;
    filteredEvents: any[];
    filteredComedyEvents: any[];
    filteredPopularEvents: any[];
    liveEventCategories: any[];
    premieres: any[];
    selectedPremiere: any;
    selectedUserShow: any;
    selectedEvent: any;
    selectedShowtimeIndex: number;
    selectedSeats: string[];
    selectedLiveEventCategory: string;
  };
  handlers: {
    handleViewDetails: (eventId: string) => void;
    handleExploreNow: () => void;
    handleLiveEventCategoryClick: (categoryTitle: string) => void;
    handleBookNow: () => void;
    handleBookingComplete: () => void;
    handleSelectSeats: (showtimeIndex: number) => void;
    handleSeatClick: (seatId: string) => void;
    handleBookSeats: () => void;
    handlePaymentComplete: () => void;
    handleGoHome: () => void;
    handleGoBack: () => void;
    handleSeeAllMovies: () => void;
    handleSeeAllComedy: () => void;
    handleSeeAllEvents: () => void;
    handleSeeAllPremieres: () => void;
  };
}

const AppViewRenderer: React.FC<AppViewRendererProps> = ({ currentView, state, handlers }) => {
  switch (currentView) {
    case 'home':
      return (
        <HomePage
          searchQuery={state.searchQuery}
          selectedCategory={state.selectedCategory as any}
          filteredEvents={state.filteredEvents}
          filteredComedyEvents={state.filteredComedyEvents}
          filteredPopularEvents={state.filteredPopularEvents}
          liveEventCategories={state.liveEventCategories}
          premieres={state.premieres}
          onViewDetails={handlers.handleViewDetails}
          onSeeAllMovies={handlers.handleSeeAllMovies}
          onSeeAllComedy={handlers.handleSeeAllComedy}
          onSeeAllEvents={handlers.handleSeeAllEvents}
          onSeeAllPremieres={handlers.handleSeeAllPremieres}
          onExploreNow={handlers.handleExploreNow}
          onLiveEventCategoryClick={handlers.handleLiveEventCategoryClick}
        />
      );
    case 'live-event-category':
      return (
        <LiveEventCategoryPage
          categoryTitle={state.selectedLiveEventCategory}
          onViewDetails={handlers.handleViewDetails}
          onGoHome={handlers.handleGoHome}
        />
      );
    case 'explore':
      return (
        <ExplorePage
          onViewDetails={handlers.handleViewDetails}
          onGoHome={handlers.handleGoHome}
        />
      );
    case 'premiere-detail':
      return state.selectedPremiere ? (
        <PremiereDetailPage
          premiere={state.selectedPremiere}
          onGoBack={handlers.handleGoBack}
        />
      ) : null;
    case 'show-detail':
      return (
        <ShowDetailPage
          show={state.selectedUserShow}
          event={state.selectedEvent}
          onBookNow={handlers.handleBookNow}
          onGoBack={handlers.handleGoBack}
        />
      );
    case 'booking':
      return (
        <BookingPage
          show={state.selectedUserShow}
          event={state.selectedEvent}
          onGoBack={handlers.handleGoBack}
          onPaymentComplete={handlers.handleBookingComplete}
        />
      );
    case 'booking-success':
      return (
        <BookingSuccessPage
          show={state.selectedUserShow}
          event={state.selectedEvent}
          onGoHome={handlers.handleGoHome}
        />
      );
    case 'auth':
      return <AuthPage />;
    case 'see-all-movies':
      return (
        <SeeAllMoviesPage
          onViewDetails={handlers.handleViewDetails}
          onGoHome={handlers.handleGoHome}
        />
      );
    case 'see-all-comedy':
      return (
        <SeeAllComedyPage
          onViewDetails={handlers.handleViewDetails}
          onGoHome={handlers.handleGoHome}
        />
      );
    case 'see-all-events':
      return (
        <SeeAllEventsPage
          onViewDetails={handlers.handleViewDetails}
          onGoHome={handlers.handleGoHome}
        />
      );
    case 'see-all-premieres':
      return (
        <SeeAllPremieresPage
          onGoHome={handlers.handleGoHome}
          onViewDetails={handlers.handleViewDetails}
        />
      );
    case 'details':
      return state.selectedEvent ? (
        <EventDetailsPage
          selectedEvent={state.selectedEvent}
          onSelectSeats={handlers.handleSelectSeats}
          onGoHome={handlers.handleGoHome}
        />
      ) : null;
    case 'seats':
      return state.selectedEvent && state.selectedShowtimeIndex >= 0 ? (
        <SeatSelectionPage
          selectedEvent={state.selectedEvent}
          selectedShowtimeIndex={state.selectedShowtimeIndex}
          selectedSeats={state.selectedSeats}
          onSeatClick={handlers.handleSeatClick}
          onBookSeats={handlers.handleBookSeats}
          onBackToDetails={() => handlers.handleGoHome()}
        />
      ) : null;
    case 'payment':
      return state.selectedEvent && state.selectedShowtimeIndex >= 0 ? (
        <PaymentPage
          selectedEvent={state.selectedEvent}
          selectedShowtimeIndex={state.selectedShowtimeIndex}
          selectedSeats={state.selectedSeats}
          onBackToSeats={() => handlers.handleGoHome()}
          onPaymentComplete={handlers.handlePaymentComplete}
        />
      ) : null;
    case 'confirmation':
      return state.selectedEvent && state.selectedShowtimeIndex >= 0 ? (
        <BookingConfirmationPage
          selectedEvent={state.selectedEvent}
          selectedShowtimeIndex={state.selectedShowtimeIndex}
          selectedSeats={state.selectedSeats}
          onGoHome={handlers.handleGoHome}
        />
      ) : null;
    default:
      return null;
  }
};

export default AppViewRenderer;
