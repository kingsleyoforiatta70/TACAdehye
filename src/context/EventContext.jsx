import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import englishService from '../assets/english_service.png';
import twiService from '../assets/twi_service.png';
import mensMovement from '../assets/mens_movement.png';
import womensMovement from '../assets/womens_movement.png';
import bibleStudies from '../assets/bible_studies.png';
// Using a placeholder for youth service due to generation limit
import youthService from '../assets/english_service.png';

const EventContext = createContext(null);

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Default events for fallback
    const defaultEvents = [
        {
            id: 1,
            title: "English Service",
            day: "Sunday",
            time: "6:30 AM - 9:00 AM",
            description: "Start your week with our English worship service.",
            image: englishService
        },
        {
            id: 2,
            title: "Twi Service",
            day: "Sunday",
            time: "9:00 AM - 12:00 PM",
            description: "Join our vibrant Twi speaking service.",
            image: twiService
        },
        {
            id: 3,
            title: "Men's Movement",
            day: "Monday",
            time: "6:00 PM - 8:00 PM",
            description: "Fellowship and growth for men.",
            image: mensMovement
        },
        {
            id: 4,
            title: "Women's Movement",
            day: "Tuesday",
            time: "6:00 PM - 8:00 PM",
            description: "Empowering women in faith and life.",
            image: womensMovement
        },
        {
            id: 5,
            title: "Bible Studies",
            day: "Wednesday",
            time: "6:00 PM - 8:00 PM",
            description: "Deep dive into the Word of God.",
            image: bibleStudies
        },
        {
            id: 6,
            title: "Youth Service",
            day: "Thursday",
            time: "6:00 PM - 8:00 PM",
            description: "Dynamic service for the next generation.",
            image: youthService
        },
    ];

    useEffect(() => {
        fetchEvents();

        // Force loading to false after 3 seconds to prevent hanging
        const timeout = setTimeout(() => {
            setEvents(prev => prev.length > 0 ? prev : defaultEvents);
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    const fetchEvents = async () => {
        try {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('id', { ascending: true });

            if (error) throw error;

            if (data && data.length > 0) {
                setEvents(data);
            } else {
                setEvents(defaultEvents);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            setEvents(defaultEvents);
        } finally {
            setLoading(false);
        }
    };

    return (
        <EventContext.Provider value={{ events, loading, fetchEvents }}>
            {!loading && children}
        </EventContext.Provider>
    );
};

export const useEvents = () => useContext(EventContext);
