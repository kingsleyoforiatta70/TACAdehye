import React from 'react';
import churchLogo from '../assets/church_logo.png';

const PageLayout = ({ children, title }) => {
    return (
        <div className="relative min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Watermark Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-5">
                <img
                    src={churchLogo}
                    alt="Watermark"
                    className="w-3/4 md:w-1/2 object-contain"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto">
                {title && (
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center border-b-2 border-blue-200 pb-4">
                        {title}
                    </h1>
                )}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-10">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PageLayout;
