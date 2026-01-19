import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import prayerBg from '../assets/prayer_bg.png';
import testimonyBg from '../assets/testimony_bg.png';

const PrayerTestimony = () => {
    const [flippedCard, setFlippedCard] = useState(null);

    const handleCardClick = (cardName) => {
        if (flippedCard === cardName) {
            setFlippedCard(null); // Unflip if already flipped
        } else {
            setFlippedCard(cardName); // Flip the clicked card
        }
    };

    return (
        <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Prayer Request Card */}
                    <div
                        className="group h-64 [perspective:1000px] cursor-pointer"
                        onClick={() => handleCardClick('prayer')}
                    >
                        <div className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${flippedCard === 'prayer' ? '[transform:rotateY(180deg)]' : 'group-hover:[transform:rotateY(180deg)]'}`}>

                            {/* Front Face */}
                            <div className="absolute inset-0 h-full w-full rounded-xl shadow-xl [backface-visibility:hidden]">
                                <div className="h-full w-full relative rounded-xl overflow-hidden">
                                    <img
                                        src={prayerBg}
                                        alt="Prayer Request"
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <h3 className="text-4xl font-bold text-white tracking-wider">Prayer Request</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Back Face */}
                            <div className="absolute inset-0 h-full w-full rounded-xl bg-blue-600 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                <div className="flex min-h-full flex-col items-center justify-center">
                                    <h2 className="text-2xl font-bold text-white mb-4">We Want to Pray for You</h2>
                                    <p className="text-lg text-blue-100 mb-8">
                                        "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."
                                    </p>
                                    <Link to="/prayer-request" onClick={(e) => e.stopPropagation()}>
                                        <button className="rounded-full bg-white px-8 py-3 text-blue-600 font-bold hover:bg-blue-50 transition-colors shadow-lg">
                                            Click Here to Submit
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Testimony Card */}
                    <div
                        className="group h-64 [perspective:1000px] cursor-pointer"
                        onClick={() => handleCardClick('testimony')}
                    >
                        <div className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${flippedCard === 'testimony' ? '[transform:rotateY(180deg)]' : 'group-hover:[transform:rotateY(180deg)]'}`}>

                            {/* Front Face */}
                            <div className="absolute inset-0 h-full w-full rounded-xl shadow-xl [backface-visibility:hidden]">
                                <div className="h-full w-full relative rounded-xl overflow-hidden">
                                    <img
                                        src={testimonyBg}
                                        alt="Testimony"
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <h3 className="text-4xl font-bold text-white tracking-wider">Testimony</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Back Face */}
                            <div className="absolute inset-0 h-full w-full rounded-xl bg-green-600 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                <div className="flex min-h-full flex-col items-center justify-center">
                                    <h2 className="text-2xl font-bold text-white mb-4">Share Your Story</h2>
                                    <p className="text-lg text-green-100 mb-8">
                                        "They triumphed over him by the blood of the Lamb and by the word of their testimony."
                                    </p>
                                    <Link to="/testimony" onClick={(e) => e.stopPropagation()}>
                                        <button className="rounded-full bg-white px-8 py-3 text-green-600 font-bold hover:bg-green-50 transition-colors shadow-lg">
                                            Click Here to Share
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PrayerTestimony;
