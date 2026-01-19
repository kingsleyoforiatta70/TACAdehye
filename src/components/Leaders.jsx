import React, { useState, useEffect } from 'react';
import { useLeaders } from '../context/LeaderContext';

const Leaders = () => {
    const { leaders, loading } = useLeaders();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide functionality (Slower: 8 seconds)
    useEffect(() => {
        if (!leaders || leaders.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % leaders.length);
        }, 8000); // 8 seconds for slower reading time

        return () => clearInterval(interval);
    }, [leaders]);

    const itemsPerPage = {
        mobile: 1,
        tablet: 2,
        desktop: 3
    };

    // Calculate visible items based on screen size window width isn't reactive in this simple implementation
    // so we'll just handle the rendering logic "safely" or purely with CSS if possible, 
    // but a carousel usually needs JS for pagination.
    // Let's settle for a simpler visible logic:
    // On mobile, show 1. On desktop, show 3. 
    // We will render a window of items starting from currentIndex.

    // Actually, looping a "window" is tricky if we want simpler logic. 
    // Let's try a responsive carousel logic.

    // Simpler approach: Shift the array or use transform. 
    // Let's use a "sliding track" approach.

    if (loading) return null;
    if (!leaders || leaders.length === 0) return null;

    // Helper to get visible slides
    // We want to show 1 on mobile, 3 on desktop.
    // The "page" index moves by 1 item at a time for smooth flow?
    // User asked for "slide auto like events".

    // Let's implement a view that shows [Index, Index+1, Index+2] (wrapping around)
    const getVisibleLeaders = () => {
        const visible = [];
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % leaders.length;
            visible.push(leaders[index]);
        }
        return visible;
    };

    const visibleLeaders = getVisibleLeaders();

    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a237e] uppercase tracking-wider mb-2">Leadership</h2>
                    <div className="w-20 h-1 bg-red-600 mx-auto"></div>
                </div>

                <div className="relative">
                    {/* 
                      Desktop/Tablet Grid (Show 3 items) 
                      Actually, for a carousel effect with wrapping, we can just render the "visibleLeaders"
                      We need to handle the mobile case (only show the first one of the 3?).
                    */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {visibleLeaders.map((leader, i) => (
                            <div
                                key={`${leader.id}-${i}`}
                                className={`flex flex-col items-center text-center transition-all duration-1000 ease-in-out
                                    ${i > 0 ? 'hidden md:flex' : 'flex'} 
                                `}
                            >
                                {/* Image Container - Aspect Ratio 3:4 or Square matches design */}
                                <div className="w-full aspect-[3/4] overflow-hidden mb-4 bg-gray-200">
                                    {leader.image_url ? (
                                        <img
                                            src={leader.image_url}
                                            alt={leader.name}
                                            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                    )}
                                </div>

                                {/* Text Content */}
                                <div className="space-y-1">
                                    <p className="text-sm uppercase tracking-widest text-[#d32f2f] font-medium">{leader.title}</p>
                                    <h3 className="text-xl font-bold text-[#1a237e]">{leader.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Progress Dots */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {leaders.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-colors duration-300 ${idx === currentIndex ? 'bg-[#d32f2f]' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Leaders;
