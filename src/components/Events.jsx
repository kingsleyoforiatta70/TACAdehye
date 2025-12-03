import React from 'react';
import { useEvents } from '../context/EventContext';

const Events = () => {
    const { events } = useEvents();

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

            <div className="relative w-full">
                <div className="flex animate-scroll hover:[animation-play-state:paused] w-max">
                    {/* First set of cards */}
                    <div className="flex space-x-8 px-4">
                        {events.map((event) => (
                            <div key={event.id} className="w-80 flex-shrink-0 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
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

                    {/* Duplicate set for infinite loop */}
                    <div className="flex space-x-8 px-4">
                        {events.map((event) => (
                            <div key={`dup-${event.id}`} className="w-80 flex-shrink-0 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
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
        </div>
    );
};

export default Events;
