import React from 'react';
import PageLayout from '../components/PageLayout';

const Contact = () => {
    return (
        <PageLayout title="Contact Us">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Upper Section: Google Map */}
                <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg mb-12">
                    <iframe
                        title="Church Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.436323456789!2d-0.7044459!3d5.5435929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf91c11a1ba3%3A0x9579bbf7eb3dea53!2sThe%20Apostolic%20Church%20-%20Ghana%2C%20Adehye%20Assembly!5e0!3m2!1sen!2sgh!4v1648000000000!5m2!1sen!2sgh"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>

                {/* Middle Section: Contact Info & Image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

                    {/* Column 1: Contact Information */}
                    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                        <h3 className="text-2xl font-bold text-blue-900 mb-6">Get in Touch</h3>

                        <div className="space-y-6">


                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Email</h4>
                                <p className="text-gray-600">adehyetac@gmail.com</p>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Address</h4>
                                <p className="text-gray-600">Ahmadiyya St, P.O.BOX 121 Agona Swedru</p>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Digital Address</h4>
                                <p className="text-gray-600">CO-0013-7195</p>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Phone</h4>
                                <p className="text-gray-600">050 942 4178</p>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Church Building Image Placeholder */}
                    <div className="flex flex-col h-full">
                        <div className="flex-grow bg-gray-200 rounded-lg shadow-md flex items-center justify-center min-h-[300px] border-2 border-dashed border-gray-400">
                            <div className="text-center p-6">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="mt-2 block text-sm font-medium text-gray-500">
                                    Church Building Image Placeholder
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lower Section: Contact Form */}
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                    <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">Send us a Message</h3>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                                placeholder="Your message here..."
                            ></textarea>
                        </div>

                        <div className="text-center">
                            <button
                                type="button"
                                className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </PageLayout>
    );
};

export default Contact;
