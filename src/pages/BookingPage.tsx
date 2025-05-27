
import React, { useState } from 'react';
import { UserShow } from '@/hooks/useUserShows';
import { Event } from '../data/events';
import { Button } from '../components/ui/button';

interface BookingPageProps {
  show?: UserShow;
  event?: Event;
  onGoBack: () => void;
  onPaymentComplete: () => void;
}

const BookingPage: React.FC<BookingPageProps> = ({
  show,
  event,
  onGoBack,
  onPaymentComplete
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedShowtime, setSelectedShowtime] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const isUserShow = !!show;
  const displayData = show || event;
  const ticketPrice = isUserShow ? Number(show?.ticket_price || 0) : 250;
  const convenienceFee = 50;
  const totalAmount = (selectedQuantity * ticketPrice) + convenienceFee;

  if (!displayData) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Show not found</h2>
          <button
            onClick={onGoBack}
            className="bg-[#f84464] hover:bg-[#d83454] text-white px-4 sm:px-6 py-2 rounded font-medium transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      onPaymentComplete();
    }, 1500);
  };

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
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-5">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Book Your Tickets</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left: Show Details & Booking Options */}
            <div>
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex gap-3 sm:gap-4">
                  <img
                    src={isUserShow ? 
                      (show?.image_url || 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80') : 
                      event?.posterUrl
                    }
                    alt={displayData.title}
                    className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{displayData.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{isUserShow ? show?.genre : event?.genre}</p>
                    {isUserShow && show && (
                      <>
                        <p className="text-gray-600 text-sm sm:text-base">{formatDate(show.show_date)}</p>
                        <p className="text-gray-600 text-sm sm:text-base">{formatTime(show.show_time)} • {show.venue}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Showtime Selection for Events */}
              {!isUserShow && event?.showtimes && (
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Select Showtime</h4>
                  <div className="space-y-2">
                    {event.showtimes.map((showtime, index) => (
                      <label
                        key={index}
                        className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedShowtime === index
                            ? 'border-[#f84464] bg-[#f84464]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center min-w-0 flex-1">
                          <input
                            type="radio"
                            name="showtime"
                            value={index}
                            checked={selectedShowtime === index}
                            onChange={() => setSelectedShowtime(index)}
                            className="mr-3 flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm sm:text-base">{showtime.time}</p>
                            <p className="text-xs sm:text-sm text-gray-600 truncate">{showtime.venue}</p>
                          </div>
                        </div>
                        <span className="font-medium text-sm sm:text-base ml-2">₹{ticketPrice}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Ticket Quantity */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Number of Tickets</h4>
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                    className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 text-sm sm:text-base"
                  >
                    -
                  </button>
                  <span className="text-base sm:text-lg font-medium w-6 sm:w-8 text-center">{selectedQuantity}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedQuantity(Math.min(10, selectedQuantity + 1))}
                    className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 text-sm sm:text-base"
                  >
                    +
                  </button>
                  <span className="text-gray-600 text-sm sm:text-base">₹{ticketPrice} each</span>
                </div>
              </div>

              {/* Customer Information */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#f84464]"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#f84464]"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#f84464]"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Right: Booking Summary */}
            <div>
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6 sticky top-4 sm:top-8">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Booking Summary</h4>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Tickets ({selectedQuantity}x):</span>
                    <span className="font-medium">₹{selectedQuantity * ticketPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Convenience Fee:</span>
                    <span className="font-medium">₹{convenienceFee}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-base sm:text-lg font-bold">
                      <span>Total Amount:</span>
                      <span className="text-[#f84464]">₹{totalAmount}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleSubmit}
                    disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone}
                    className="w-full bg-[#f84464] hover:bg-[#d83454] text-white py-3 text-base sm:text-lg font-semibold"
                  >
                    Proceed to Payment
                  </Button>
                  
                  <button
                    onClick={onGoBack}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                  >
                    Go Back
                  </button>
                </div>

                <div className="mt-4 text-xs text-gray-500 text-center">
                  🔒 Your information is secure and encrypted
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
