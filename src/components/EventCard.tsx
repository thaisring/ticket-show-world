
import React from 'react';

interface Event {
  id: string;
  title: string;
  posterUrl: string;
  genre?: string;
  performer?: string;
  venue?: string;
  date?: string;
  type?: string;
  category?: string;
}

interface EventCardProps {
  event: Event;
  onViewDetails: (eventId: string) => void;
  variant?: 'default' | 'popular' | 'comedy';
}

const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails, variant = 'default' }) => {
  const isPopular = variant === 'popular';
  const isComedy = variant === 'comedy';

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow min-w-[180px] sm:min-w-[220px] max-w-[180px] sm:max-w-[220px] flex-shrink-0">
      <div className="relative">
        {isPopular && event.type === 'Online' && (
          <div className="absolute top-2 left-2 bg-[#ff6b6b] text-white px-2 py-1 rounded text-xs font-bold z-10">
            ONLINE
          </div>
        )}
        <img
          src={event.posterUrl}
          alt={event.title}
          className="w-full h-48 sm:h-64 lg:h-72 object-cover"
        />
      </div>
      
      <div className="p-2 sm:p-3">
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 line-clamp-2">
          {event.title}
        </h3>
        
        {isComedy ? (
          <>
            <p className="text-gray-600 text-xs sm:text-sm mb-1 truncate">{event.performer}</p>
            <p className="text-gray-500 text-xs mb-2 sm:mb-3 truncate">{event.venue} • {event.date}</p>
          </>
        ) : isPopular ? (
          <>
            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1 truncate">{event.category}</p>
            <p className="text-gray-500 text-xs mb-2 sm:mb-3 truncate">{event.date} • {event.venue}</p>
          </>
        ) : (
          <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 truncate">{event.genre}</p>
        )}
        
        <button
          onClick={() => onViewDetails(event.id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded text-xs sm:text-sm font-medium transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
