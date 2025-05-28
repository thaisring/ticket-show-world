
import React, { useState } from 'react';
import PremiereCard from '../components/PremiereCard';
import { premieres } from '../data/events';

interface SeeAllPremieresPageProps {
  onGoHome: () => void;
}

const SeeAllPremieresPage: React.FC<SeeAllPremieresPageProps> = ({ onGoHome }) => {
  const [sortBy, setSortBy] = useState<'title' | 'language'>('title');
  const [filterLanguage, setFilterLanguage] = useState<string>('all');

  const languages = ['all', ...new Set(premieres.map(premiere => premiere.language))];
  
  const filteredAndSortedPremieres = premieres
    .filter(premiere => filterLanguage === 'all' || premiere.language === filterLanguage)
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'language':
          return a.language.localeCompare(b.language);
        default:
          return 0;
      }
    });

  const handlePremiereClick = (index: number) => {
    // For now, just show an alert. This can be expanded to show premiere details
    alert(`Clicked on: ${filteredAndSortedPremieres[index].title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">All Premieres</h1>
          <button
            onClick={onGoHome}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Filter by Language:</label>
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languages.map(language => (
                <option key={language} value={language}>
                  {language === 'all' ? 'All Languages' : language}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'title' | 'language')}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="title">Title</option>
              <option value="language">Language</option>
            </select>
          </div>
        </div>

        {/* Premieres Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredAndSortedPremieres.map((premiere, index) => (
            <PremiereCard 
              key={index} 
              premiere={premiere} 
              onClick={() => handlePremiereClick(index)}
            />
          ))}
        </div>

        {filteredAndSortedPremieres.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No premieres found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeAllPremieresPage;
