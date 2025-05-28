
import React from 'react';

interface LiveEventCategory {
  title: string;
  count: string;
  img: string;
  color: string;
}

interface LiveEventCardProps {
  category: LiveEventCategory;
  onClick?: () => void;
}

const LiveEventCard: React.FC<LiveEventCardProps> = ({ category, onClick }) => {
  return (
    <div
      className="aspect-square rounded-xl p-4 text-white cursor-pointer transition-transform hover:scale-105 shadow-md"
      style={{
        background: category.color,
        backgroundImage: `url(${category.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom right',
        backgroundRepeat: 'no-repeat'
      }}
      onClick={onClick}
    >
      <div className="flex flex-col justify-start h-full">
        <h3 className="text-lg font-bold uppercase mb-1 text-shadow">
          {category.title}
        </h3>
        <p className="text-sm text-shadow">
          {category.count}
        </p>
      </div>
    </div>
  );
};

export default LiveEventCard;
