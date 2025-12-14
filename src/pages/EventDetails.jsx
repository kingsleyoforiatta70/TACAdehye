import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

const EventDetails = () => {
    const { id } = useParams();
    const { events, loading } = useEvents();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        if (events.length > 0) {
            const foundEvent = events.find(e => e.id.toString() === id);
            setEvent(foundEvent);
        }
    }, [id, events]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex space-x-2 animate-pulse">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h2>
                <Link to="/" className="text-blue-600 hover:text-blue-800">Return to Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero Banner for Event */}
            <div className="relative h-64 md:h-96 w-full bg-blue-900 overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src={event.image || event.image_url}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-semibold mb-4 w-fit">
                        {event.day}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 shadow-sm">{event.title}</h1>
                    <div className="flex items-center text-white/90 text-lg">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.time}
                    </div>
                </div>
            </div>

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About this Event</h2>
                            <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                                {event.detailed_description || event.description || "No specific details provided for this event yet. Join us to experience it first-hand!"}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        {/* Leader Card */}
                        {(event.leader_name || event.leader_role) && (
                            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Event Leadership
                                </h3>
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1">
                                        <p className="text-xl font-semibold text-gray-900">{event.leader_name || "TBA"}</p>
                                        <p className="text-blue-600 font-medium">{event.leader_role || "Event Head"}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick Details Card */}
                        <div className="bg-blue-50 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-blue-900 mb-4">Event Details</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <span className="font-semibold text-blue-800 w-20">When:</span>
                                    <span className="text-blue-900">{event.day}s</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-semibold text-blue-800 w-20">Time:</span>
                                    <span className="text-blue-900">{event.time}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default EventDetails;
