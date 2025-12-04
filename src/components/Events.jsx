import React, { useRef, useEffect } from 'react';
import { useEvents } from '../context/EventContext';

const Events = () => {
    const { events } = useEvents();
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = React.useState(false);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || isPaused) return;

        const scroll = () => {
            // Check if we've reached the end (or close to it)
            if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 5) {
                scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                scrollContainer.scrollBy({ left: 340, behavior: 'smooth' }); // 320px card + 20px gap
            }
        };

        const interval = setInterval(scroll, 3000);
        return () => clearInterval(interval);
    }, [isPaused]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -340 : 340;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div id="events" className="bg-gray-50 py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Weekly Activities
                </h2>
                <p className="mt-4 text-xl text-gray-500">
                    Join us throughout the week for fellowship and growth.
                </p>
            </div>

            <div
                className="relative w-full max-w-7xl mx-auto group px-4 sm:px-6 lg:px-8"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Navigation Buttons */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors focus:outline-none opacity-0 group-hover:opacity-100 duration-300 ml-2 sm:ml-4"
                    aria-label="Scroll Left"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors focus:outline-none opacity-0 group-hover:opacity-100 duration-300 mr-2 sm:mr-4"
                    aria-label="Scroll Right"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <div
                    ref={scrollRef}
                    className="flex space-x-8 overflow-x-auto pb-8 hide-scrollbar scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {/* Render events twice to create a longer list for scrolling feel */}
                    {[...events, ...events].map((event, index) => (
                        <div key={`${event.id}-${index}`} className="w-80 flex-shrink-0 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
                            <div className="h-48 w-full">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <div className="text-sm font-semibold text-blue-600 mb-1">
                                    {event.day}, {event.time}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    {event.description}
                                </p>
                                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center transition-colors">
                                    Learn more
                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;
