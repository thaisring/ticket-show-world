import React from 'react';
import EventCard from './EventCard';
import LiveEventCard from './LiveEventCard';
import PremiereCard from './PremiereCard';
import { Event, ComedyEvent, PopularEvent, LiveEventCategory } from '../data/events';

interface EventSectionsProps {
  searchQuery: string;
  selectedCategory: 'all' | 'movies' | 'stream' | 'events' | 'plays' | 'sports' | 'activities';
  filteredEvents: Event[];
  filteredComedyEvents: ComedyEvent[];
  filteredPopularEvents: PopularEvent[];
  liveEventCategories: LiveEventCategory[];
  premieres: any[];
  onViewDetails: (eventId: string) => void;
  onSeeAllMovies?: () => void;
  onSeeAllComedy?: () => void;
  onSeeAllEvents?: () => void;
  onSeeAllPremieres?: () => void;
  onLiveEventCategoryClick?: (categoryTitle: string) => void;
}

const EventSections: React.FC<EventSectionsProps> = ({
  searchQuery,
  selectedCategory,
  filteredEvents,
  filteredComedyEvents,
  filteredPopularEvents,
  liveEventCategories,
  premieres,
  onViewDetails,
  onSeeAllMovies,
  onSeeAllComedy,
  onSeeAllEvents,
  onSeeAllPremieres,
  onLiveEventCategoryClick
}) => {
  const getCategoryContent = () => {
    switch (selectedCategory) {
      case 'movies':
        return (
          <section className="max-w-6xl mx-auto px-5 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Movies</h2>
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredEvents.map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onViewDetails={onViewDetails} 
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No movies found.</p>
            )}
          </section>
        );

      case 'events':
        return (
          <section className="max-w-6xl mx-auto px-5 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Events</h2>
            {filteredPopularEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredPopularEvents.map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onViewDetails={onViewDetails}
                    variant="popular"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No events found.</p>
            )}
          </section>
        );

      case 'plays':
        return (
          <section className="max-w-6xl mx-auto px-5 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Plays</h2>
            {filteredComedyEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredComedyEvents.map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onViewDetails={onViewDetails}
                    variant="comedy"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No plays found.</p>
            )}
          </section>
        );

      case 'stream':
      case 'sports':
      case 'activities':
        return (
          <section className="max-w-6xl mx-auto px-5 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            </h2>
            <p className="text-gray-500 text-center py-8">
              {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} content coming soon!
            </p>
          </section>
        );

      default:
        return (
          <>
            {/* Search Results Summary */}
            {searchQuery && (
              <div className="max-w-6xl mx-auto px-5 py-4">
                <p className="text-gray-600">
                  Showing results for "<span className="font-semibold">{searchQuery}</span>"
                </p>
              </div>
            )}

            {/* Live Events Section */}
            {!searchQuery && (
              <section className="max-w-6xl mx-auto px-5 py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">The Best Of Live Events</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {liveEventCategories.map((category, index) => (
                    <LiveEventCard 
                      key={index} 
                      category={category} 
                      onClick={() => onLiveEventCategoryClick?.(category.title)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Recommended Movies */}
            <section className="max-w-6xl mx-auto px-5 py-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchQuery ? 'Movies' : 'Recommended Movies'}
                </h2>
                {!searchQuery && onSeeAllMovies && (
                  <button 
                    onClick={onSeeAllMovies}
                    className="text-[#f84464] font-medium hover:underline"
                  >
                    See All ›
                  </button>
                )}
              </div>
              {filteredEvents.length > 0 ? (
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {filteredEvents.slice(0, 6).map(event => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      onViewDetails={onViewDetails} 
                    />
                  ))}
                </div>
              ) : searchQuery ? (
                <p className="text-gray-500 text-center py-8">No movies found matching your search.</p>
              ) : null}
            </section>

            {/* Premieres */}
            {!searchQuery && (
              <section className="max-w-6xl mx-auto px-5 py-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Premieres</h2>
                    <p className="text-gray-600 text-sm">Brand new releases every Friday</p>
                  </div>
                  {onSeeAllPremieres && (
                    <button 
                      onClick={onSeeAllPremieres}
                      className="text-[#f84464] font-medium hover:underline"
                    >
                      See All ›
                    </button>
                  )}
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {premieres.slice(0, 5).map((premiere, index) => (
                    <PremiereCard 
                      key={index} 
                      premiere={premiere} 
                      onClick={() => onViewDetails(`premiere-${index}`)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Laughter Therapy */}
            <section className="bg-gray-100 py-8">
              <div className="max-w-6xl mx-auto px-5">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {searchQuery ? 'Comedy Shows' : 'Laughter Therapy'}
                  </h2>
                  {!searchQuery && onSeeAllComedy && (
                    <button 
                      onClick={onSeeAllComedy}
                      className="text-[#f84464] font-medium hover:underline"
                    >
                      See All ›
                    </button>
                  )}
                </div>
                {filteredComedyEvents.length > 0 ? (
                  <div className="flex gap-4 overflow-x-auto pb-4">
                    {filteredComedyEvents.slice(0, 6).map(event => (
                      <EventCard 
                        key={event.id} 
                        event={event} 
                        onViewDetails={onViewDetails}
                        variant="comedy"
                      />
                    ))}
                  </div>
                ) : searchQuery ? (
                  <p className="text-gray-500 text-center py-8">No comedy shows found matching your search.</p>
                ) : null}
              </div>
            </section>

            {/* Popular Events */}
            <section className="max-w-6xl mx-auto px-5 py-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Popular Events</h2>
                {!searchQuery && onSeeAllEvents && (
                  <button 
                    onClick={onSeeAllEvents}
                    className="text-[#f84464] font-medium hover:underline"
                  >
                    See All ›
                  </button>
                )}
              </div>
              {filteredPopularEvents.length > 0 ? (
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {filteredPopularEvents.slice(0, 6).map(event => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      onViewDetails={onViewDetails}
                      variant="popular"
                    />
                  ))}
                </div>
              ) : searchQuery ? (
                <p className="text-gray-500 text-center py-8">No popular events found matching your search.</p>
              ) : null}
            </section>
          </>
        );
    }
  };

  return <>{getCategoryContent()}</>;
};

export default EventSections;
