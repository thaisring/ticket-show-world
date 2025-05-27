
import React from 'react';
import { UserShow } from '@/hooks/useUserShows';

interface UserShowCardProps {
  show: UserShow;
  onViewDetails: (showId: string) => void;
}

const UserShowCard: React.FC<UserShowCardProps> = ({ show, onViewDetails }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={show.image_url || 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80'}
          alt={show.title}
          className="w-full h-36 sm:h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-[#f84464] text-white px-2 py-1 rounded text-xs sm:text-sm font-medium">
          ₹{show.ticket_price}
        </div>
      </div>
      
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {show.title}
        </h3>
        
        <div className="text-xs sm:text-sm text-gray-600 mb-2">
          <p className="font-medium truncate">{show.genre}</p>
          <p className="truncate">{show.venue}</p>
        </div>
        
        <div className="text-xs sm:text-sm text-gray-500 mb-3">
          <p>{formatDate(show.show_date)} • {formatTime(show.show_time)}</p>
          {show.duration_minutes && (
            <p>{show.duration_minutes} minutes</p>
          )}
        </div>
        
        {show.description && (
          <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
            {show.description}
          </p>
        )}
        
        <button
          onClick={() => onViewDetails(show.id)}
          className="w-full bg-[#f84464] hover:bg-[#d83454] text-white py-2 px-3 sm:px-4 rounded font-medium transition-colors text-xs sm:text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default UserShowCard;
