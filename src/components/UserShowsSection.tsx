
import React from 'react';
import { useUserShows } from '@/hooks/useUserShows';
import UserShowCard from './UserShowCard';

interface UserShowsSectionProps {
  onViewDetails: (showId: string) => void;
}

const UserShowsSection: React.FC<UserShowsSectionProps> = ({ onViewDetails }) => {
  const { userShows, loading, error } = useUserShows();

  if (loading) {
    return (
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Shows</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  if (error || userShows.length === 0) {
    return null;
  }

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Community Shows</h2>
        <p className="text-sm text-gray-600">
          Shows listed by our community members
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {userShows.map((show) => (
          <UserShowCard
            key={show.id}
            show={show}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </section>
  );
};

export default UserShowsSection;
