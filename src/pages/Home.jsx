import React from 'react';
import Hero from '../components/Hero';
import VisionMission from '../components/VisionMission';
import Leaders from '../components/Leaders';
import PrayerTestimony from '../components/PrayerTestimony';
import About from '../components/About';
import Events from '../components/Events';

const Home = () => {
    return (
        <>
            <Hero />
            <VisionMission />
            <Leaders />
            <PrayerTestimony />
            <About />
            <Events />
        </>
    );
};

export default Home;
