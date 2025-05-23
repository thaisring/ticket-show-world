
import React from 'react';
import SeatGrid from '../components/SeatGrid';
import { Event } from '../data/events';

interface SeatSelectionPageProps {
  selectedEvent: Event;
  selectedShowtimeIndex: number;
  selectedSeats: string[];
  onSeatClick: (seatId: string) => void;
  onBookSeats: () => void;
  onBackToDetails: () => void;
}

const SeatSelectionPage: React.FC<SeatSelectionPageProps> = ({
  selectedEvent,
  selectedShowtimeIndex,
  selectedSeats,
  onSeatClick,
  onBookSeats,
  onBackToDetails
}) => {
  const showtime = selectedEvent.showtimes[selectedShowtimeIndex];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-5">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Select Your Seats</h2>
          
          <SeatGrid
            seats={showtime.seats}
            selectedSeats={selectedSeats}
            onSeatClick={onSeatClick}
          />

          <div className="flex gap-4 justify-center">
            <button
              onClick={onBookSeats}
              disabled={selectedSeats.length === 0}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded font-medium transition-colors"
            >
              Book Selected Seats ({selectedSeats.length})
            </button>
            <button
              onClick={onBackToDetails}
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

export default SeatSelectionPage;
