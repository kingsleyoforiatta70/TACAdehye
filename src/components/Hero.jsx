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
            <div className="relative w-full h-[50vh] lg:h-[700px] bg-black overflow-hidden transition-all duration-300">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`transition-opacity duration-1000 ease-in-out w-full h-full flex items-center justify-center
                            ${index === currentIndex
                                ? 'relative z-10 opacity-100 '
                                : 'absolute inset-0 z-0 opacity-0'
                            }`}
                    >
                        {/* 
                            Image:
                            - Mobile: w-full h-[50vh] object-contain (Fixed box, 100% detail).
                            - Desktop: User requested settings (Stretched/Default).
                        */}
                        <img
                            src={slide.src}
                            alt={slide.alt || `Slide ${index + 1}`}
                            className="w-full h-full object-fill lg:object-fill lg:h-full lg:max-w-[100%] "
                        />

                        {/* Dark Overlay - Lighter on mobile, darker on desktop */}
                        <div className="absolute inset-0 bg-black/10 lg:bg-black/50"></div>
                    </div>
                ))}


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
