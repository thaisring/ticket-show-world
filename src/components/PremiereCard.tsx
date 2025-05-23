
import React from 'react';

interface Premiere {
  title: string;
  language: string;
  poster: string;
  tag: string;
}

interface PremiereCardProps {
  premiere: Premiere;
}

const PremiereCard: React.FC<PremiereCardProps> = ({ premiere }) => {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow min-w-[220px] max-w-[220px] flex-shrink-0">
      <div className="relative">
        <img
          src={premiere.poster}
          alt={premiere.title}
          className="w-full h-72 object-cover"
        />
        <div className="absolute top-2 left-2 bg-[#f84464] text-white px-2 py-1 rounded text-xs font-bold">
          {premiere.tag}
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-base mb-1">
          {premiere.title}
        </h3>
        <p className="text-gray-600 text-sm">
          {premiere.language}
        </p>
      </div>
    </div>
  );
};

export default PremiereCard;
