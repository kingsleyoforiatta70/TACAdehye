import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMessages } from '../../context/MessageContext';
import ProfileSetupForm from './ProfileSetupForm';
import SlideManager from './SlideManager';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const { messages, deleteMessage } = useMessages();
    const [activeTab, setActiveTab] = useState('prayer'); // 'prayer' or 'testimony'

    // Protect the route
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Force profile completion
    if (!user.isProfileComplete) {
        return <ProfileSetupForm />;
    }

    const filteredMessages = messages.filter(msg =>
        activeTab === 'prayer' ? msg.type === 'Prayer Request' : msg.type === 'Testimony'
    );

    const handleReply = (email, subject) => {
        const mailtoLink = `mailto:${email}?subject=Re: ${subject}&body=Dear Member,%0D%0A%0D%0AThank you for reaching out to us.%0D%0A%0D%0ABest regards,%0D%0ATAC Adehye Local Church`;
        window.location.href = mailtoLink;
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="font-bold text-xl text-blue-900">Admin Dashboard</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="ml-4 flex items-center md:ml-6">
                                <span className="text-gray-700 mr-4">Welcome, {user.profile?.fullName}</span>
                                <button
                                    onClick={logout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Stats Card 1 */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Total Members</dt>
                                            <dd className="text-lg font-medium text-gray-900">1,234</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Card 2 */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Events</dt>
                                            <dd className="text-lg font-medium text-gray-900">5</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Card 3 */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">New Messages</dt>
                                            <dd className="text-lg font-medium text-gray-900">{messages.length}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <SlideManager />
                    </div>

                    <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Messages</h3>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex">
                                <button
                                    onClick={() => setActiveTab('prayer')}
                                    className={`${activeTab === 'prayer'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                                >
                                    Prayer Requests
                                </button>
                                <button
                                    onClick={() => setActiveTab('testimony')}
                                    className={`${activeTab === 'testimony'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                                >
                                    Testimonies
                                </button>
                            </nav>
                        </div>

                        {/* Message List */}
                        <div className="divide-y divide-gray-200">
                            {filteredMessages.length > 0 ? (
                                filteredMessages.map((msg) => (
                                    <div key={msg.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-900">{msg.name}</h4>
                                                <p className="text-sm text-gray-500 mb-2">{msg.email} • {new Date(msg.date).toLocaleDateString()}</p>
                                                <p className="text-gray-700 mt-2 whitespace-pre-wrap">{msg.message}</p>
                                            </div>
                                            <div className="flex space-x-2 ml-4">
                                                <button
                                                    onClick={() => handleReply(msg.email, msg.type)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    Reply
                                                </button>
                                                <button
                                                    onClick={() => deleteMessage(msg.id)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    No {activeTab === 'prayer' ? 'prayer requests' : 'testimonies'} found.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
