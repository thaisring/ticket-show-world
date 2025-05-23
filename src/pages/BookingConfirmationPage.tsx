
import React from 'react';
import { Event } from '../data/events';

interface BookingConfirmationPageProps {
  selectedEvent: Event;
  selectedShowtimeIndex: number;
  selectedSeats: string[];
  onGoHome: () => void;
}

const BookingConfirmationPage: React.FC<BookingConfirmationPageProps> = ({
  selectedEvent,
  selectedShowtimeIndex,
  selectedSeats,
  onGoHome
}) => {
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
            onClick={onGoHome}
            className="bg-[#f84464] hover:bg-[#d83454] text-white px-8 py-3 rounded font-medium transition-colors"
          >
            Book Another Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
