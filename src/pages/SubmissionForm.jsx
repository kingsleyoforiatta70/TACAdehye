import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { useMessages } from '../context/MessageContext';

const SubmissionForm = ({ title }) => {
    const { addMessage } = useMessages();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ type: 'error', text: 'Please fill in all fields.' });
            return;
        }

        try {
            addMessage({
                type: title, // "Prayer Request" or "Testimony"
                ...formData
            });
            setStatus({ type: 'success', text: 'Message sent successfully! We will get back to you soon.' });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus({ type: 'error', text: 'Failed to send message. Please try again.' });
        }
    };

    return (
        <PageLayout title={title}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg border border-gray-100">
                    {status.text && (
                        <div className={`mb-6 p-4 rounded ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {status.text}
                        </div>
                    )}
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Your Name */}
                            <div>
                                <label htmlFor="name" className="block text-lg font-bold text-gray-800 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all bg-gray-50"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Email Address */}
                            <div>
                                <label htmlFor="email" className="block text-lg font-bold text-gray-800 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all bg-gray-50"
                                    placeholder="Email address"
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-lg font-bold text-gray-800 mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows="6"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all bg-gray-50 resize-none"
                                placeholder="Write your message"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-4">
                            <button
                                type="submit"
                                className="px-12 py-4 bg-orange-400 hover:bg-orange-500 text-white font-bold text-lg rounded shadow-md transition-colors duration-300 uppercase tracking-wide"
                            >
                                Submit Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </PageLayout>
    );
};

export default SubmissionForm;
