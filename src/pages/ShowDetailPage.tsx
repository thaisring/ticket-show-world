
import React from 'react';
import { UserShow } from '@/hooks/useUserShows';
import { Event } from '../data/events';

interface ShowDetailPageProps {
  show?: UserShow;
  event?: Event;
  onBookNow: () => void;
  onGoBack: () => void;
}

const ShowDetailPage: React.FC<ShowDetailPageProps> = ({
  show,
  event,
  onBookNow,
  onGoBack
}) => {
  // Determine if we're showing a user show or an event
  const isUserShow = !!show;
  const displayData = show || event;

  if (!displayData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Show not found</h2>
          <button
            onClick={onGoBack}
            className="bg-[#f84464] hover:bg-[#d83454] text-white px-6 py-2 rounded font-medium transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-5">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-64 md:h-80">
            <img
              src={isUserShow ? 
                (show?.image_url || 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80') : 
                event?.posterUrl
              }
              alt={displayData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-[#f84464] text-white px-3 py-1 rounded-lg text-lg font-bold">
              ₹{isUserShow ? show?.ticket_price : '250'}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{displayData.title}</h1>
              <p className="text-white/90 text-lg">{isUserShow ? show?.genre : event?.genre}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Date & Time</h3>
                {isUserShow ? (
                  <>
                    <p className="text-gray-600">{formatDate(show!.show_date)}</p>
                    <p className="text-gray-600">{formatTime(show!.show_time)}</p>
                  </>
                ) : (
                  <p className="text-gray-600">Check showtimes</p>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                <p className="text-gray-600">{isUserShow ? show?.venue : 'Multiple venues'}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Duration</h3>
                <p className="text-gray-600">
                  {isUserShow ? 
                    (show?.duration_minutes ? `${show.duration_minutes} minutes` : 'Not specified') : 
                    (event?.duration || 'Not specified')
                  }
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About this {isUserShow ? 'show' : 'event'}</h3>
              <p className="text-gray-700 leading-relaxed">
                {isUserShow ? 
                  (show?.description || 'No description available.') : 
                  (event?.description || 'Experience this amazing event!')
                }
              </p>
            </div>

            {/* Additional Info for User Shows */}
            {isUserShow && show && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Event Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {show.contact_email && (
                    <div>
                      <h4 className="font-semibold text-gray-900">Contact Email</h4>
                      <p className="text-gray-600">{show.contact_email}</p>
                    </div>
                  )}
                  {show.contact_phone && (
                    <div>
                      <h4 className="font-semibold text-gray-900">Contact Phone</h4>
                      <p className="text-gray-600">{show.contact_phone}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900">Total Seats</h4>
                    <p className="text-gray-600">{show.total_seats} seats available</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Status</h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {show.status}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Showtimes for Events */}
            {!isUserShow && event?.showtimes && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Showtimes</h3>
                <div className="space-y-3">
                  {event.showtimes.slice(0, 3).map((showtime, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border"
                    >
                      <span className="font-medium">{showtime.time} - {showtime.venue}</span>
                      <span className="text-sm text-gray-600">₹250</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBookNow}
                className="flex-1 bg-[#f84464] hover:bg-[#d83454] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Book Now
              </button>
              <button
                onClick={onGoBack}
                className="flex-1 sm:flex-none bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetailPage;
