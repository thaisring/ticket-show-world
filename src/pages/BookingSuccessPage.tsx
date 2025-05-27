
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { UserShow } from '@/hooks/useUserShows';
import { Event } from '../data/events';

interface BookingSuccessPageProps {
  show?: UserShow;
  event?: Event;
  onGoHome: () => void;
}

const BookingSuccessPage: React.FC<BookingSuccessPageProps> = ({
  show,
  event,
  onGoHome
}) => {
  const isUserShow = !!show;
  const displayData = show || event;

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
    <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-5">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed! 🎉</h2>
          <p className="text-gray-600 mb-8">Your tickets have been successfully booked.</p>

          {displayData && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Event:</span>
                  <span className="font-medium">{displayData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Genre:</span>
                  <span className="font-medium">{isUserShow ? show?.genre : event?.genre}</span>
                </div>
                {isUserShow && show && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{formatDate(show.show_date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{formatTime(show.show_time)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Venue:</span>
                      <span className="font-medium">{show.venue}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-medium">BMT{Date.now().toString().slice(-8)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-blue-800 text-sm">
              📧 A confirmation email has been sent to your registered email address with your e-tickets.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={onGoHome}
              className="w-full bg-[#f84464] hover:bg-[#d83454] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Home
            </button>
            
            <p className="text-gray-500 text-sm">
              Thank you for booking with BookMyTicket! Enjoy your show! 🎭
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
