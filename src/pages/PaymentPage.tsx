
import React, { useState } from 'react';
import { CreditCard, Smartphone, Building2, ArrowLeft } from 'lucide-react';
import { Event } from '../data/events';
import { Button } from '../components/ui/button';

interface PaymentPageProps {
  selectedEvent: Event;
  selectedShowtimeIndex: number;
  selectedSeats: string[];
  onBackToSeats: () => void;
  onPaymentComplete: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({
  selectedEvent,
  selectedShowtimeIndex,
  selectedSeats,
  onBackToSeats,
  onPaymentComplete
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const showtime = selectedEvent.showtimes[selectedShowtimeIndex];
  const ticketPrice = 250; // Fixed price per ticket
  const totalAmount = selectedSeats.length * ticketPrice;

  const handlePaymentMethodSelect = (method: 'upi' | 'card' | 'netbanking') => {
    setSelectedPaymentMethod(method);
  };

  const handleProceedPayment = async () => {
    if (!selectedPaymentMethod) return;
    
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-5">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center mb-6">
            <button
              onClick={onBackToSeats}
              className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Seats
            </button>
            <h2 className="text-2xl font-bold text-gray-900">Payment</h2>
          </div>

          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Movie:</span>
                <span className="font-medium">{selectedEvent.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time & Venue:</span>
                <span className="font-medium">{showtime.time} at {showtime.venue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seats:</span>
                <span className="font-medium">{selectedSeats.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tickets:</span>
                <span className="font-medium">{selectedSeats.length} × ₹{ticketPrice}</span>
              </div>
              <div className="border-t pt-2 mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-green-600">₹{totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-6">Select Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* UPI Payment */}
              <div
                className={`border-2 rounded-lg p-6 cursor-pointer transition-colors ${
                  selectedPaymentMethod === 'upi'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handlePaymentMethodSelect('upi')}
              >
                <div className="flex flex-col items-center text-center">
                  <Smartphone className={`h-12 w-12 mb-3 ${
                    selectedPaymentMethod === 'upi' ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <h4 className="font-semibold text-gray-900 mb-2">UPI</h4>
                  <p className="text-sm text-gray-600">Pay using Google Pay, PhonePe, Paytm & more</p>
                </div>
              </div>

              {/* Card Payment */}
              <div
                className={`border-2 rounded-lg p-6 cursor-pointer transition-colors ${
                  selectedPaymentMethod === 'card'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handlePaymentMethodSelect('card')}
              >
                <div className="flex flex-col items-center text-center">
                  <CreditCard className={`h-12 w-12 mb-3 ${
                    selectedPaymentMethod === 'card' ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <h4 className="font-semibold text-gray-900 mb-2">Cards</h4>
                  <p className="text-sm text-gray-600">Credit/Debit Cards, Visa, MasterCard</p>
                </div>
              </div>

              {/* Net Banking */}
              <div
                className={`border-2 rounded-lg p-6 cursor-pointer transition-colors ${
                  selectedPaymentMethod === 'netbanking'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handlePaymentMethodSelect('netbanking')}
              >
                <div className="flex flex-col items-center text-center">
                  <Building2 className={`h-12 w-12 mb-3 ${
                    selectedPaymentMethod === 'netbanking' ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <h4 className="font-semibold text-gray-900 mb-2">Net Banking</h4>
                  <p className="text-sm text-gray-600">All major banks supported</p>
                </div>
              </div>
            </div>
          </div>

          {/* Proceed Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleProceedPayment}
              disabled={!selectedPaymentMethod || isProcessing}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-lg min-w-[200px]"
            >
              {isProcessing ? 'Processing...' : `Pay ₹${totalAmount}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
