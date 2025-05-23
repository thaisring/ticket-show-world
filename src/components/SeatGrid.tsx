
import React from 'react';

interface Seat {
  id: string;
  status: 'available' | 'selected' | 'booked';
}

interface SeatGridProps {
  seats: Seat[][];
  selectedSeats: string[];
  onSeatClick: (seatId: string) => void;
}

const SeatGrid: React.FC<SeatGridProps> = ({ seats, selectedSeats, onSeatClick }) => {
  const numCols = seats[0]?.length || 0;

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="bg-gray-800 text-white py-2 px-8 mb-8 rounded-t text-center font-bold w-80 max-w-full">
        SCREEN
      </div>
      
      <div 
        className="grid gap-1 justify-center mb-6"
        style={{ gridTemplateColumns: `repeat(${numCols}, auto)` }}
      >
        {seats.map((row, rowIndex) =>
          row.map((seat) => (
            <button
              key={seat.id}
              className={`w-7 h-7 border rounded text-xs font-medium transition-colors ${
                seat.status === 'booked'
                  ? 'bg-red-500 text-white cursor-not-allowed'
                  : selectedSeats.includes(seat.id)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
              onClick={() => seat.status !== 'booked' && onSeatClick(seat.id)}
              disabled={seat.status === 'booked'}
            >
              {seat.id}
            </button>
          ))
        )}
      </div>
      
      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-green-500 rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-red-500 rounded"></div>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatGrid;
