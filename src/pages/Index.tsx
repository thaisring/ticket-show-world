import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import AppSidebar from '../components/AppSidebar';
import HomePage from './HomePage';
import EventDetailsPage from './EventDetailsPage';
import SeatSelectionPage from './SeatSelectionPage';
import PaymentPage from './PaymentPage';
import BookingConfirmationPage from './BookingConfirmationPage';
import { 
  events, 
  liveEventCategories, 
  popularEvents, 
  comedyEvents, 
  premieres,
  Event
} from '../data/events';
import { SidebarProvider, SidebarInset } from '../components/ui/sidebar';

type ViewType = 'home' | 'details' | 'seats' | 'payment' | 'confirmation';
type CategoryType = 'all' | 'movies' | 'stream' | 'events' | 'plays' | 'sports' | 'activities';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedShowtimeIndex, setSelectedShowtimeIndex] = useState<number>(-1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  // Filter events based on search query
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

  const handleViewDetails = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
      setCurrentView('details');
    }
  };

  const handleSelectSeats = (showtimeIndex: number) => {
    setSelectedShowtimeIndex(showtimeIndex);
    setSelectedSeats([]);
    setCurrentView('seats');
  };

  const handleSeatClick = (seatId: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleBookSeats = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    setCurrentView('payment');
  };

  const handlePaymentComplete = () => {
    // Update seat status to booked
    if (selectedEvent && selectedShowtimeIndex >= 0) {
      const showtime = selectedEvent.showtimes[selectedShowtimeIndex];
      showtime.seats.forEach(row => {
        row.forEach(seat => {
          if (selectedSeats.includes(seat.id)) {
            seat.status = 'booked';
          }
        });
      });
    }
    
    setCurrentView('confirmation');
  };

  const handleGoHome = () => {
    setCurrentView('home');
    setSelectedEvent(null);
    setSelectedShowtimeIndex(-1);
    setSelectedSeats([]);
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: CategoryType) => {
    setSelectedCategory(category);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomePage
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            filteredEvents={filteredEvents}
            filteredComedyEvents={filteredComedyEvents}
            filteredPopularEvents={filteredPopularEvents}
            liveEventCategories={liveEventCategories}
            premieres={premieres}
            onViewDetails={handleViewDetails}
          />
        );
      case 'details':
        return selectedEvent ? (
          <EventDetailsPage
            selectedEvent={selectedEvent}
            onSelectSeats={handleSelectSeats}
            onGoHome={handleGoHome}
          />
        ) : null;
      case 'seats':
        return selectedEvent && selectedShowtimeIndex >= 0 ? (
          <SeatSelectionPage
            selectedEvent={selectedEvent}
            selectedShowtimeIndex={selectedShowtimeIndex}
            selectedSeats={selectedSeats}
            onSeatClick={handleSeatClick}
            onBookSeats={handleBookSeats}
            onBackToDetails={() => setCurrentView('details')}
          />
        ) : null;
      case 'payment':
        return selectedEvent && selectedShowtimeIndex >= 0 ? (
          <PaymentPage
            selectedEvent={selectedEvent}
            selectedShowtimeIndex={selectedShowtimeIndex}
            selectedSeats={selectedSeats}
            onBackToSeats={() => setCurrentView('seats')}
            onPaymentComplete={handlePaymentComplete}
          />
        ) : null;
      case 'confirmation':
        return selectedEvent && selectedShowtimeIndex >= 0 ? (
          <BookingConfirmationPage
            selectedEvent={selectedEvent}
            selectedShowtimeIndex={selectedShowtimeIndex}
            selectedSeats={selectedSeats}
            onGoHome={handleGoHome}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AppSidebar onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
        <SidebarInset>
          <Header 
            onHomeClick={handleGoHome} 
            onSearch={handleSearch}
            searchQuery={searchQuery}
          />
          
          {renderCurrentView()}
          
          <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
            <p>&copy; 2025 BookMyTicket</p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
