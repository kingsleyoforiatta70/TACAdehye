import React, { useEffect, useState } from 'react';
import churchLogo from '../assets/church_logo.png';

const LoadingScreen = ({ onComplete, dataReady }) => {
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);
    const [fadingOut, setFadingOut] = useState(false);

    useEffect(() => {
        // Minimum animation time (Text animation + Read time)
        const timer = setTimeout(() => {
            setMinTimeElapsed(true);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (minTimeElapsed && dataReady && !fadingOut) {
            setFadingOut(true);

            // Wait for fade out transition (1s) then notify parent
            const fadeTimer = setTimeout(() => {
                if (onComplete) onComplete();
            }, 1000);
            return () => clearTimeout(fadeTimer);
        }
    }, [minTimeElapsed, dataReady, fadingOut, onComplete]);

    return (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-1000 ${fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="relative flex flex-col items-center">
                {/* Logo Pulse */}
                <img
                    src={churchLogo}
                    alt="TAC Adehye Logo"
                    className="w-32 h-32 md:w-48 md:h-48 object-contain mb-8 animate-bounce-slow opacity-90"
                />

                {/* Animated Text */}
                <h1 className="whitespace-nowrap font-extrabold text-blue-900 text-center tracking-tight px-2 text-[4vw] md:text-5xl w-full overflow-hidden">
                    {"Welcome to TAC - Adehye Assembly".split("").map((char, index) => {
                        return (
                            <span
                                key={index}
                                className="inline-block animate-fade-in-up opacity-0"
                                style={{
                                    animationDelay: `${index * 0.08}s`,
                                    animationFillMode: 'forwards'
                                }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                        );
                    })}
                </h1>

                <p className="mt-4 text-gray-500 text-sm md:text-lg animate-fade-in opacity-0" style={{ animationDelay: '3s', animationFillMode: 'forwards' }}>
                    A place of worship, fellowship and growth.
                </p>

                {/* Loading Spinner - Visible only if taking longer than animation */}
                <div className={`absolute -bottom-24 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${minTimeElapsed && !dataReady ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
