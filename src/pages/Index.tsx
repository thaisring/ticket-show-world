import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import LiveEventCard from '../components/LiveEventCard';
import PremiereCard from '../components/PremiereCard';
import SeatGrid from '../components/SeatGrid';
import LoginSignupModal from '../components/LoginSignupModal';
import { 
  events, 
  liveEventCategories, 
  popularEvents, 
  comedyEvents, 
  premieres,
  Event,
  Seat
} from '../data/events';

type ViewType = 'home' | 'details' | 'seats' | 'confirmation';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedShowtimeIndex, setSelectedShowtimeIndex] = useState<number>(-1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
      event.genre.toLowerCase().includes(searchQuery.toLowerCase())
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
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSignInClick = () => {
    setIsLoginModalOpen(true);
  };

  const renderHomePage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="w-full bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex items-center justify-center h-80 px-5">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4 text-shadow-lg">
              Experience Entertainment
            </h1>
            <p className="text-xl mb-6 text-shadow">
              Book your favorite movies, events, and shows
            </p>
            <button className="bg-[#f84464] hover:bg-[#d83454] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Explore Now
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Search Results Summary */}
      {searchQuery && (
        <div className="max-w-6xl mx-auto px-5 py-4">
          <p className="text-gray-600">
            Showing results for "<span className="font-semibold">{searchQuery}</span>"
          </p>
        </div>
      )}

      {/* Live Events Section */}
      {!searchQuery && (
        <section className="max-w-6xl mx-auto px-5 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The Best Of Live Events</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {liveEventCategories.map((category, index) => (
              <LiveEventCard key={index} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* Recommended Movies */}
      <section className="max-w-6xl mx-auto px-5 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery ? 'Movies' : 'Recommended Movies'}
          </h2>
          {!searchQuery && <a href="#" className="text-[#f84464] font-medium hover:underline">See All ›</a>}
        </div>
        {filteredEvents.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {filteredEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
                onViewDetails={handleViewDetails} 
              />
            ))}
          </div>
        ) : searchQuery ? (
          <p className="text-gray-500 text-center py-8">No movies found matching your search.</p>
        ) : null}
      </section>

      {/* Premieres */}
      {!searchQuery && (
        <section className="max-w-6xl mx-auto px-5 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Premieres</h2>
              <p className="text-gray-600 text-sm">Brand new releases every Friday</p>
            </div>
            <a href="#" className="text-[#f84464] font-medium hover:underline">See All ›</a>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {premieres.map((premiere, index) => (
              <PremiereCard key={index} premiere={premiere} />
            ))}
          </div>
        </section>
      )}

      {/* Laughter Therapy */}
      <section className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {searchQuery ? 'Comedy Shows' : 'Laughter Therapy'}
            </h2>
            {!searchQuery && <a href="#" className="text-[#f84464] font-medium hover:underline">See All ›</a>}
          </div>
          {filteredComedyEvents.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-4">
              {filteredComedyEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onViewDetails={handleViewDetails}
                  variant="comedy"
                />
              ))}
            </div>
          ) : searchQuery ? (
            <p className="text-gray-500 text-center py-8">No comedy shows found matching your search.</p>
          ) : null}
        </div>
      </section>

      {/* Popular Events */}
      <section className="max-w-6xl mx-auto px-5 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Popular Events</h2>
          {!searchQuery && <a href="#" className="text-[#f84464] font-medium hover:underline">See All ›</a>}
        </div>
        {filteredPopularEvents.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {filteredPopularEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
                onViewDetails={handleViewDetails}
                variant="popular"
              />
            ))}
          </div>
        ) : searchQuery ? (
          <p className="text-gray-500 text-center py-8">No popular events found matching your search.</p>
        ) : null}
      </section>
    </div>
  );

  const renderEventDetails = () => {
    if (!selectedEvent) return null;

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-5">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <img
                src={selectedEvent.posterUrl}
                alt={selectedEvent.title}
                className="w-full md:w-64 h-96 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedEvent.title}</h2>
                <p className="text-gray-600 mb-2"><strong>Genre:</strong> {selectedEvent.genre}</p>
                <p className="text-gray-600 mb-4"><strong>Duration:</strong> {selectedEvent.duration}</p>
                <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Showtimes</h3>
              <div className="space-y-3">
                {selectedEvent.showtimes.map((showtime, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border"
                  >
                    <span className="font-medium">{showtime.time} - {showtime.venue}</span>
                    <button
                      onClick={() => handleSelectSeats(index)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition-colors"
                    >
                      Select Seats
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleGoHome}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded font-medium transition-colors"
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSeatSelection = () => {
    if (!selectedEvent || selectedShowtimeIndex < 0) return null;

    const showtime = selectedEvent.showtimes[selectedShowtimeIndex];

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-5">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Select Your Seats</h2>
            
            <SeatGrid
              seats={showtime.seats}
              selectedSeats={selectedSeats}
              onSeatClick={handleSeatClick}
            />

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleBookSeats}
                disabled={selectedSeats.length === 0}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded font-medium transition-colors"
              >
                Book Selected Seats ({selectedSeats.length})
              </button>
              <button
                onClick={() => setCurrentView('details')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded font-medium transition-colors"
              >
                Back to Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderConfirmation = () => {
    if (!selectedEvent || selectedShowtimeIndex < 0) return null;

    const showtime = selectedEvent.showtimes[selectedShowtimeIndex];

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-5">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-8">Booking Confirmed! 🎉</h2>
            
            <div className="text-left space-y-4 mb-8">
              <p className="text-lg"><strong>Event:</strong> {selectedEvent.title}</p>
              <p className="text-lg"><strong>Showtime:</strong> {showtime.time} at {showtime.venue}</p>
              <p className="text-lg"><strong>Seats:</strong> {selectedSeats.join(', ')}</p>
              <p className="text-lg"><strong>Total Tickets:</strong> {selectedSeats.length}</p>
            </div>
            
            <p className="text-gray-600 mb-8">Thank you for your booking! Your tickets have been confirmed.</p>
            
            <button
              onClick={handleGoHome}
              className="bg-[#f84464] hover:bg-[#d83454] text-white px-8 py-3 rounded font-medium transition-colors"
            >
              Book Another Event
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onHomeClick={handleGoHome} 
        onSearch={handleSearch}
        onSignInClick={handleSignInClick}
        searchQuery={searchQuery}
      />
      
      {currentView === 'home' && renderHomePage()}
      {currentView === 'details' && renderEventDetails()}
      {currentView === 'seats' && renderSeatSelection()}
      {currentView === 'confirmation' && renderConfirmation()}
      
      <LoginSignupModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      
      <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
        <p>&copy; 2025 BookMyTicket</p>
      </footer>
    </div>
  );
};

export default Index;
