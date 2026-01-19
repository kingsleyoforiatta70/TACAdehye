import React, { useState } from 'react';

const VisionMission = () => {
    // State to track which card is flipped on mobile
    const [flippedCard, setFlippedCard] = useState(null);

    const handleCardClick = (cardName) => {
        if (flippedCard === cardName) {
            setFlippedCard(null); // Unflip if already flipped
        } else {
            setFlippedCard(cardName); // Flip the clicked card
        }
    };

    const cards = [
        {
            id: 'vision',
            title: "Vision",
            content: "To be at the cutting edge of Holy Spirit inspired change in the Church and society",
            bgColor: "bg-[#1a237e]", // Dark Blue
            textColor: "text-white",
            titleColor: "text-white"
        },
        {
            id: 'mission',
            title: "Mission",
            content: "The Apostolic Church exists to belt the globe with the Gospel and make Disciples of Christ who manifest the fruit and gifts of the Holy Spirit",
            bgColor: "bg-white",
            textColor: "text-blue-900", // Dark Blue text
            titleColor: "text-blue-900"
        },
        {
            id: 'theme',
            title: "Our Theme",
            content: "The Power Of Authentic Apostolic Doctrine",
            bgColor: "bg-[#d32f2f]", // Red
            textColor: "text-white",
            titleColor: "text-white"
        }
    ];

    return (
        <div className="relative z-20">
            {/* 
               DESKTOP VIEW: Overlapping Row
               - Uses negative margin to shift up over the Hero component.
               - Grid layout with 3 columns.
               - Hidden on small screens.
            */}
            <div className="hidden lg:block relative -mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-3 shadow-2xl">
                    {cards.map((card) => (
                        <div key={card.id} className={`${card.bgColor} p-10 h-64 flex flex-col justify-center`}>
                            <h3 className={`text-3xl font-bold mb-4 ${card.titleColor}`}>{card.title}</h3>
                            <p className={`text-lg leading-relaxed ${card.textColor}`}>
                                "{card.content}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 
               MOBILE VIEW: Flipping Cards
               - Visible only on small screens.
               - Placed "after" the hero (standard block flow).
            */}
            <div className="lg:hidden py-10 px-4 bg-gray-50">
                <div className="space-y-6">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className="group h-48 [perspective:1000px] cursor-pointer"
                            onClick={() => handleCardClick(card.id)}
                        >
                            <div className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${flippedCard === card.id ? '[transform:rotateY(180deg)]' : ''}`}>

                                {/* Front Face */}
                                <div className={`absolute inset-0 h-full w-full rounded-xl shadow-lg flex items-center justify-center p-6 ${card.bgColor} [backface-visibility:hidden]`}>
                                    <h3 className={`text-3xl font-bold ${card.titleColor}`}>{card.title}</h3>
                                    <p className={`absolute bottom-4 text-xs opacity-70 ${card.titleColor}`}>(Tap to view)</p>
                                </div>

                                {/* Back Face */}
                                <div className={`absolute inset-0 h-full w-full rounded-xl shadow-lg flex items-center justify-center p-6 bg-gray-900 [transform:rotateY(180deg)] [backface-visibility:hidden]`}>
                                    <p className="text-white text-base text-center font-medium">
                                        "{card.content}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VisionMission;
