import React, { useState, useRef } from 'react';
import { useEvents } from '../../context/EventContext';

const EventManager = () => {
    const { events, addEvent, updateEvent, deleteEvent } = useEvents();
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        day: '',
        time: '',
        description: '',
        leader_name: '',
        leader_role: '',
        detailed_description: '',
    });
    const fileInputRef = useRef(null);

    const resetForm = () => {
        setFormData({
            title: '',
            day: '',
            time: '',
            description: '',
            leader_name: '',
            leader_role: '',
            detailed_description: '',
        });
        if (fileInputRef.current) fileInputRef.current.value = '';
        setIsEditing(false);
        setEditingId(null);
        setError('');
    };

    const handleEdit = (event) => {
        setFormData({
            title: event.title,
            day: event.day,
            time: event.time,
            description: event.description || '',
            leader_name: event.leader_name || '',
            leader_role: event.leader_role || '',
            detailed_description: event.detailed_description || '',
        });
        setEditingId(event.id);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        setLoading(true);
        const result = await deleteEvent(id);
        if (!result.success) {
            setError(result.error);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const imageFile = fileInputRef.current?.files[0];

        let result;
        if (isEditing) {
            result = await updateEvent(editingId, formData, imageFile);
        } else {
            result = await addEvent(formData, imageFile);
        }

        if (result.success) {
            resetForm();
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Event Management</h3>
                {isEditing && (
                    <button
                        onClick={resetForm}
                        className="text-sm text-gray-500 hover:text-gray-700 underline"
                    >
                        Cancel Edit
                    </button>
                )}
            </div>

            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

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
                        <label className="block text-sm font-medium text-gray-700">Day</label>
                        <select
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            value={formData.day}
                            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                        >
                            <option value="">Select Day</option>
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Time</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. 6:00 PM - 8:00 PM"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Short Description</label>
                        <input
                            type="text"
                            maxLength={100}
                            placeholder="Brief summary for card display"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Leader Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Rev. John Doe"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            value={formData.leader_name}
                            onChange={(e) => setFormData({ ...formData, leader_name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Leader Role</label>
                        <input
                            type="text"
                            placeholder="e.g. Head Pastor"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            value={formData.leader_role}
                            onChange={(e) => setFormData({ ...formData, leader_role: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Detailed Description</label>
                    <textarea
                        rows={4}
                        placeholder="Full details about the event..."
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                        value={formData.detailed_description}
                        onChange={(e) => setFormData({ ...formData, detailed_description: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Event Image</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave empty to keep existing image (if editing).</p>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                        {loading ? 'Saving...' : (isEditing ? 'Update Event' : 'Add Event')}
                    </button>
                </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
                        <div className="h-40 w-full bg-gray-200 relative">
                            <img src={event.image || event.image_url} alt={event.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <h4 className="font-bold text-lg text-gray-900">{event.title}</h4>
                            <p className="text-sm text-blue-600 mb-2">{event.day}, {event.time}</p>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{event.description}</p>

                            <div className="flex justify-end space-x-2 mt-auto">
                                <button
                                    onClick={() => handleEdit(event)}
                                    className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors"
                                    title="Edit"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                </button>
                                <button
                                    onClick={() => handleDelete(event.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                    title="Delete"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventManager;
