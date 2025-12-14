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
    }, [slides.length, currentIndex]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    if (slides.length === 0) {
        return (
            <div className="relative bg-gray-900 py-20 lg:py-32 overflow-hidden min-h-[600px] flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="relative group bg-gray-900 overflow-hidden">
            {/* 
               Hero Container:
               - Mobile: Height is 'auto' (determined by the active image) to ensure 100% visibility w/o cropping.
               - Desktop: Fixed height (h-[700px]) for the immersive "Cover" look.
            */}
            <div className="relative w-full lg:h-[700px] bg-gray-900 overflow-hidden transition-all duration-300">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`transition-opacity duration-1000 ease-in-out w-full 
                            ${index === currentIndex
                                ? 'relative z-10 opacity-100 lg:absolute lg:inset-0'
                                : 'absolute inset-0 z-0 opacity-0'
                            }`}
                    >
                        {/* 
                            Image:
                            - Mobile: w-full h-auto (Natural height, 100% visible).
                            - Desktop: w-full h-full object-cover (Immersive crop).
                        */}
                        <img
                            src={slide.src}
                            alt={slide.alt || `Slide ${index + 1}`}
                            className="w-full h-auto lg:h-full lg:object-cover"
                        />

                        {/* Dark Overlay - Lighter on mobile, darker on desktop */}
                        <div className="absolute inset-0 bg-black/10 lg:bg-black/50"></div>
                    </div>
                ))}

                {/* Content Overlay - Z-index higher than images */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pointer-events-auto">
                        <h1 className="text-lg sm:text-3xl md:text-5xl tracking-tight font-extrabold text-white drop-shadow-lg">
                            <span className="block">
                                {"Welcome to TAC - Adehye Assembly".split("").map((char, index) => {
                                    const animations = [
                                        "animate-fly-in-left",
                                        "animate-fly-in-top",
                                        "animate-fly-in-right",
                                        "animate-fly-in-bottom"
                                    ];
                                    const animationClass = animations[index % 4];

                                    return (
                                        <span
                                            key={index}
                                            className={`inline-block ${animationClass} opacity-0`}
                                            style={{ animationDelay: `${index * 0.05}s` }}
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </span>
                                    );
                                })}
                            </span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl drop-shadow-md shadow-black">
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
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors focus:outline-none opacity-0 group-hover:opacity-100 duration-300"
                aria-label="Previous Slide"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors focus:outline-none opacity-0 group-hover:opacity-100 duration-300"
                aria-label="Next Slide"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div >
    );
};

export default Hero;
