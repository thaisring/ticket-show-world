
import React from 'react';
import { Event } from '../data/events';

interface EventDetailsPageProps {
  selectedEvent: Event;
  onSelectSeats: (showtimeIndex: number) => void;
  onGoHome: () => void;
}

const EventDetailsPage: React.FC<EventDetailsPageProps> = ({
  selectedEvent,
  onSelectSeats,
  onGoHome
}) => {
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
                    onClick={() => onSelectSeats(index)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition-colors"
                  >
                    Select Seats
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onGoHome}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded font-medium transition-colors"
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
