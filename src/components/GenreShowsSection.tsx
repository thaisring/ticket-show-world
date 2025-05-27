
import React from 'react';
import UserShowsSection from './UserShowsSection';

interface GenreShowsSectionProps {
  selectedCategory: string;
  onViewDetails: (showId: string) => void;
}

const GenreShowsSection: React.FC<GenreShowsSectionProps> = ({ 
  selectedCategory, 
  onViewDetails 
}) => {
  // Map categories to genres
  const genreMap: { [key: string]: { genre: string; title: string } } = {
    'all': { genre: 'all', title: 'All Community Shows' },
    'movies': { genre: 'Drama', title: 'Drama Shows' },
    'events': { genre: 'Music', title: 'Music Shows' },
    'plays': { genre: 'Theatre', title: 'Theatre Shows' },
    'sports': { genre: 'Sports', title: 'Sports Events' },
    'activities': { genre: 'Workshop', title: 'Workshops & Activities' }
  };

  const currentMapping = genreMap[selectedCategory] || genreMap['all'];

  return (
    <UserShowsSection
      genre={currentMapping.genre}
      title={currentMapping.title}
      onViewDetails={onViewDetails}
    />
  );
};

export default GenreShowsSection;
