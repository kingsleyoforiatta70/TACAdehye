import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { useCalendar } from '../context/CalendarContext';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay, isToday } from 'date-fns';

const CalendarPage = () => {
    const { currentDate, setCurrentDate, getEventsForDate } = useCalendar();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const onPrevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = monthStart;
    const endDate = monthEnd;

    // Create array of days to display
    // We need to pad the beginning to align with the correct day of week
    const startDayOfWeek = getDay(monthStart); // 0 (Sun) to 6 (Sat)
    const paddingDays = Array(startDayOfWeek).fill(null);

    const daysInMonth = eachDayOfInterval({
        start: monthStart,
        end: monthEnd
    });

    const allDays = [...paddingDays, ...daysInMonth];

    const selectedEvents = getEventsForDate(selectedDate);

    // Days of week header
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <PageLayout title="Church Calendar">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Calendar Section */}
                    <div className="lg:w-2/3 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        {/* Header */}
                        <div className="bg-blue-600 p-6 flex items-center justify-between text-white">
                            <button onClick={onPrevMonth} className="p-2 hover:bg-blue-700 rounded-full transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <h2 className="text-2xl font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
                            <button onClick={onNextMonth} className="p-2 hover:bg-blue-700 rounded-full transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>

                        {/* Grid */}
                        <div className="p-6">
                            {/* Weekday Headers */}
                            <div className="grid grid-cols-7 mb-4">
                                {daysOfWeek.map(day => (
                                    <div key={day} className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Days */}
                            <div className="grid grid-cols-7 gap-2">
                                {allDays.map((day, index) => {
                                    if (!day) return <div key={`empty-${index}`} className="aspect-square"></div>;

                                    const dayEvents = getEventsForDate(day);
                                    const hasEvents = dayEvents.length > 0;
                                    const isSelected = isSameDay(day, selectedDate);
                                    const isCurrentDay = isToday(day);

                                    return (
                                        <button
                                            key={day.toISOString()}
                                            onClick={() => setSelectedDate(day)}
                                            className={`
                                                relative aspect-square rounded-lg flex flex-col items-center justify-center transition-all duration-200
                                                ${isSelected ? 'bg-blue-600 text-white shadow-md scale-105 z-10' : 'hover:bg-blue-50 text-gray-700'}
                                                ${isCurrentDay && !isSelected ? 'border-2 border-blue-600 font-bold' : ''}
                                            `}
                                        >
                                            <span className="text-lg">{format(day, 'd')}</span>
                                            {hasEvents && (
                                                <div className={`mt-1 h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-blue-500'}`}></div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Events Detail Section */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-full">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center">
                                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </span>
                                {format(selectedDate, 'MMM do, yyyy')}
                            </h3>

                            {selectedEvents.length === 0 ? (
                                <div className="text-center py-10">
                                    <div className="inline-block p-4 rounded-full bg-gray-50 mb-4">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <p className="text-gray-500">No events scheduled for this day.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {selectedEvents.map(event => (
                                        <div key={event.id} className="bg-blue-50 rounded-xl p-4 border border-blue-100 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-gray-900 text-lg">{event.title}</h4>
                                                {event.time && (
                                                    <span className="text-xs font-semibold bg-blue-200 text-blue-800 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                                                        {event.time}
                                                    </span>
                                                )}
                                            </div>
                                            {event.location && (
                                                <p className="text-sm text-gray-600 mb-2 flex items-center">
                                                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                    {event.location}
                                                </p>
                                            )}
                                            {event.description && (
                                                <p className="text-gray-700 text-sm leading-relaxed mt-2 border-t border-blue-200 pt-2">
                                                    {event.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default CalendarPage;
