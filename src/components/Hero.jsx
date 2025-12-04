import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';

const Hero = () => {
    const { slides } = useContent();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (slides.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [slides.length]);

    if (slides.length === 0) {
        return (
            <div className="relative bg-gray-900 py-20 lg:py-32 overflow-hidden min-h-[600px] flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="relative bg-gray-900 py-20 lg:py-32 overflow-hidden min-h-[600px] flex items-center">
            {/* Background Slideshow */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={slide.src}
                        alt={slide.alt || `Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div> {/* Dark Overlay */}
                </div>
            ))}

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                    <span className="block">Welcome to TAC Adehye Local Assembly</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    A place of worship, fellowship and growth.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                    <div className="rounded-md shadow">
                        <a
                            href="#events"
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors"
                        >
                            View Programmes
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
