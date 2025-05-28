
import React from 'react';

interface Premiere {
  title: string;
  language: string;
  poster: string;
  tag: string;
}

interface PremiereDetailPageProps {
  premiere: Premiere;
  onGoBack: () => void;
}

const PremiereDetailPage: React.FC<PremiereDetailPageProps> = ({ premiere, onGoBack }) => {
  const handleBookNow = () => {
    alert(`Booking tickets for ${premiere.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-5">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-80 md:h-96">
            <img
              src={premiere.poster}
              alt={premiere.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-[#f84464] text-white px-3 py-1 rounded-lg text-lg font-bold">
              {premiere.tag}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h1 className="text-4xl font-bold text-white mb-2">{premiere.title}</h1>
              <p className="text-white/90 text-lg">{premiere.language}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Language</h3>
                <p className="text-gray-600">{premiere.language}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Category</h3>
                <p className="text-gray-600">{premiere.tag}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Release</h3>
                <p className="text-gray-600">New Release</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About this premiere</h3>
              <p className="text-gray-700 leading-relaxed">
                Experience the latest release of "{premiere.title}" - a captivating {premiere.language} production 
                that brings fresh storytelling and exceptional performances to the screen. This {premiere.tag.toLowerCase()} 
                promises to deliver an unforgettable entertainment experience with its unique narrative and stellar cast.
              </p>
            </div>

            {/* Showtimes */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Showtimes</h3>
              <div className="space-y-3">
                {['10:00 AM - PVR Cinemas', '1:30 PM - INOX Theatre', '6:00 PM - Cinepolis', '9:30 PM - PVR Cinemas'].map((showtime, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border"
                  >
                    <span className="font-medium">{showtime}</span>
                    <span className="text-sm text-gray-600">₹250</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleBookNow}
                className="flex-1 bg-[#f84464] hover:bg-[#d83454] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Book Now
              </button>
              <button
                onClick={onGoBack}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
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

export default PremiereDetailPage;
