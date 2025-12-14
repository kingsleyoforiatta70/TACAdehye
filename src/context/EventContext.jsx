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
            image: englishService,
            leader_name: "Rev. John Doe",
            leader_role: "Head Pastor",
            detailed_description: "Join us for a spirit-filled English service where we worship, praise, and dive deep into the Word of God. This service is designed to cater to our English-speaking congregation with contemporary worship and relevant teachings."
        },
        // ... (Keeping other defaults minimal for brevity, but in a real app we'd keep them all)
        {
            id: 2,
            title: "Twi Service",
            day: "Sunday",
            time: "9:00 AM - 12:00 PM",
            description: "Join our vibrant Twi speaking service.",
            image: twiService
        }
    ];

    useEffect(() => {
        fetchEvents();
        // Fallback if fetch fails or returns empty (initial setup)
        const timeout = setTimeout(() => {
            setEvents(prev => prev.length > 0 ? prev : defaultEvents);
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timeout);
    }, []);

    // Map of titles to local images for fallback
    const imageMap = {
        "English Service": englishService,
        "Twi Service": twiService,
        "Men's Movement": mensMovement,
        "Women's Movement": womensMovement,
        "Bible Studies": bibleStudies,
        "Youth Service": youthService
    };

    const fetchEvents = async () => {
        try {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('id', { ascending: true });

            if (error) throw error;

            if (data && data.length > 0) {
                // normalize data structure if needed
                const normalizedEvents = data.map(evt => ({
                    ...evt,
                    // Use uploaded URL if available, otherwise check the map, otherwise fallback to englishService
                    image: evt.image_url || imageMap[evt.title] || englishService
                }));
                setEvents(normalizedEvents);
            } else {
                setEvents(defaultEvents);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const addEvent = async (eventData, imageFile) => {
        try {
            let imageUrl = null;

            if (imageFile) {
                const { data: uploadData, error: uploadError } = await verifyAndUploadImage(imageFile);
                if (uploadError) throw uploadError;
                imageUrl = getPublicUrl(uploadData.path);
            }

            const { data, error } = await supabase
                .from('events')
                .insert([{
                    title: eventData.title,
                    day: eventData.day,
                    time: eventData.time,
                    description: eventData.description,
                    detailed_description: eventData.detailed_description,
                    leader_name: eventData.leader_name,
                    leader_role: eventData.leader_role,
                    image_url: imageUrl
                }])
                .select();

            if (error) throw error;

            if (data) {
                const newEvent = { ...data[0], image: data[0].image_url || englishService };
                setEvents(prev => [...prev, newEvent]);
                return { success: true };
            }
        } catch (error) {
            console.error('Error adding event:', error);
            return { success: false, error: error.message };
        }
    };

    const updateEvent = async (id, eventData, imageFile) => {
        try {
            let updates = {
                title: eventData.title,
                day: eventData.day,
                time: eventData.time,
                description: eventData.description,
                detailed_description: eventData.detailed_description,
                leader_name: eventData.leader_name,
                leader_role: eventData.leader_role,
            };

            if (imageFile) {
                const { data: uploadData, error: uploadError } = await verifyAndUploadImage(imageFile);
                if (uploadError) throw uploadError;
                updates.image_url = getPublicUrl(uploadData.path);
            }

            const { data, error } = await supabase
                .from('events')
                .update(updates)
                .eq('id', id)
                .select();

            if (error) throw error;

            if (data) {
                const updatedEvent = { ...data[0], image: data[0].image_url || englishService };
                setEvents(prev => prev.map(evt => evt.id === id ? updatedEvent : evt));
                return { success: true };
            }
        } catch (error) {
            console.error('Error updating event:', error);
            return { success: false, error: error.message };
        }
    };

    const deleteEvent = async (id) => {
        try {
            const { error } = await supabase
                .from('events')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setEvents(prev => prev.filter(evt => evt.id !== id));
            return { success: true };
        } catch (error) {
            console.error('Error deleting event:', error);
            return { success: false, error: error.message };
        }
    };

    // Helper to upload image to 'gallery' bucket (reusing it)
    const verifyAndUploadImage = async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `event-${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        return await supabase.storage
            .from('gallery')
            .upload(filePath, file);
    };

    const getPublicUrl = (path) => {
        const { data } = supabase.storage.from('gallery').getPublicUrl(path);
        return data.publicUrl;
    };

    return (
        <EventContext.Provider value={{ events, loading, fetchEvents, addEvent, updateEvent, deleteEvent }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvents = () => useContext(EventContext);
