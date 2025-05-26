
import React, { useState } from 'react';
import { CreditCard, Smartphone, Building2, ArrowLeft, CheckCircle } from 'lucide-react';
import { Event } from '../data/events';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';

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
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { toast } = useToast();

  const showtime = selectedEvent.showtimes[selectedShowtimeIndex];
  const ticketPrice = 250; // Fixed price per ticket
  const convenienceFee = 50; // Fixed convenience fee
  const totalAmount = (selectedSeats.length * ticketPrice) + convenienceFee;

  const handlePaymentMethodSelect = (method: 'upi' | 'card' | 'netbanking') => {
    setSelectedPaymentMethod(method);
  };

  const handleProceedPayment = async () => {
    if (!selectedPaymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to proceed.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate payment processing with different timing for different methods
      const processingTime = selectedPaymentMethod === 'upi' ? 1500 : 
                            selectedPaymentMethod === 'card' ? 3000 : 2000;
      
      await new Promise(resolve => setTimeout(resolve, processingTime));
      
      // Simulate payment success (90% success rate)
      const isSuccessful = Math.random() > 0.1;
      
      if (isSuccessful) {
        setPaymentSuccess(true);
        toast({
          title: "Payment Successful!",
          description: `Your payment of ₹${totalAmount} has been processed successfully.`,
        });
        
        // Complete the payment after showing success
        setTimeout(() => {
          onPaymentComplete();
        }, 1500);
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">Your booking has been confirmed.</p>
          <div className="text-sm text-gray-500">
            Redirecting to confirmation page...
          </div>
        </div>
      </div>
    );
  }

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
            <div className="space-y-3">
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
              <div className="border-t pt-3 mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tickets ({selectedSeats.length} × ₹{ticketPrice}):</span>
                  <span className="font-medium">₹{selectedSeats.length * ticketPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Convenience Fee:</span>
                  <span className="font-medium">₹{convenienceFee}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
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
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                  selectedPaymentMethod === 'upi'
                    ? 'border-blue-500 bg-blue-50 scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => handlePaymentMethodSelect('upi')}
              >
                <div className="flex flex-col items-center text-center">
                  <Smartphone className={`h-12 w-12 mb-3 ${
                    selectedPaymentMethod === 'upi' ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <h4 className="font-semibold text-gray-900 mb-2">UPI</h4>
                  <p className="text-sm text-gray-600">Pay using Google Pay, PhonePe, Paytm & more</p>
                  <div className="mt-2 text-xs text-green-600 font-medium">Instant • No charges</div>
                </div>
              </div>

              {/* Card Payment */}
              <div
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                  selectedPaymentMethod === 'card'
                    ? 'border-blue-500 bg-blue-50 scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => handlePaymentMethodSelect('card')}
              >
                <div className="flex flex-col items-center text-center">
                  <CreditCard className={`h-12 w-12 mb-3 ${
                    selectedPaymentMethod === 'card' ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <h4 className="font-semibold text-gray-900 mb-2">Cards</h4>
                  <p className="text-sm text-gray-600">Credit/Debit Cards, Visa, MasterCard</p>
                  <div className="mt-2 text-xs text-blue-600 font-medium">Secure • Widely accepted</div>
                </div>
              </div>

              {/* Net Banking */}
              <div
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                  selectedPaymentMethod === 'netbanking'
                    ? 'border-blue-500 bg-blue-50 scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => handlePaymentMethodSelect('netbanking')}
              >
                <div className="flex flex-col items-center text-center">
                  <Building2 className={`h-12 w-12 mb-3 ${
                    selectedPaymentMethod === 'netbanking' ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <h4 className="font-semibold text-gray-900 mb-2">Net Banking</h4>
                  <p className="text-sm text-gray-600">All major banks supported</p>
                  <div className="mt-2 text-xs text-purple-600 font-medium">Traditional • Reliable</div>
                </div>
              </div>
            </div>
          </div>

          {/* Proceed Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleProceedPayment}
              disabled={!selectedPaymentMethod || isProcessing}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-lg min-w-[200px] text-lg"
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                `Pay ₹${totalAmount}`
              )}
            </Button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>🔒 Your payment information is secure and encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
