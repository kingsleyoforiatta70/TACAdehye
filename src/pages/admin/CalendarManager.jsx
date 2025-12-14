import React, { useState } from 'react';
import { useCalendar } from '../../context/CalendarContext';
import { format } from 'date-fns';

const CalendarManager = () => {
    const { events, addEvent, deleteEvent, currentDate, setCurrentDate } = useCalendar();
    const [formData, setFormData] = useState({
        title: '',
        event_date: '',
        time: '',
        description: '',
        location: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const result = await addEvent(formData);
        if (result.success) {
            setMessage({ type: 'success', text: 'Event added successfully' });
            setFormData({ title: '', event_date: '', time: '', description: '', location: '' });
        } else {
            setMessage({ type: 'error', text: result.error });
        }
        setLoading(false);
    };

    const sortedEvents = [...events].sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="mb-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Calendar Management</h3>
                <p className="mt-1 text-sm text-gray-500">Add upcoming church programs and events.</p>
            </div>

            {/* Add Event Form */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4 border p-4 rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Event Title</label>
                        <input
                            type="text"
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type="date"
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            value={formData.event_date}
                            onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Time</label>
                        <input
                            type="time"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location (Optional)</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        rows="3"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                </div>
                <div className="flex items-center justify-between">
                    {message.text && (
                        <p className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {message.text}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-auto`}
                    >
                        {loading ? 'Adding...' : 'Add Calendar Event'}
                    </button>
                </div>
            </form>

            {/* List of Events */}
            <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Upcoming Events</h4>
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Time</th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Delete</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {sortedEvents.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-500 italic">No events found.</td>
                                </tr>
                            ) : (
                                sortedEvents.map((event) => (
                                    <tr key={event.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {format(new Date(event.event_date), 'MMM d, yyyy')}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.title}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.time}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <button
                                                onClick={() => deleteEvent(event.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CalendarManager;
