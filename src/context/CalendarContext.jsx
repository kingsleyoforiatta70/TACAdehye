import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { startOfMonth, endOfMonth, subMonths, addMonths, isSameMonth, isSameDay } from 'date-fns';

const CalendarContext = createContext(null);

export const CalendarProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        fetchEvents();
    }, [currentDate]);

    const fetchEvents = async () => {
        setLoading(true);
        // Fetch events for previous, current, and next month
        const start = startOfMonth(subMonths(currentDate, 1));
        const end = endOfMonth(addMonths(currentDate, 1));

        try {
            const { data, error } = await supabase
                .from('calendar_events')
                .select('*')
                .gte('event_date', start.toISOString())
                .lte('event_date', end.toISOString())
                .order('event_date', { ascending: true });

            if (error) throw error;
            setEvents(data || []);
        } catch (error) {
            console.error('Error fetching calendar events:', error);
            // setEvents([]); // uncomment if you want to clear events on error, otherwise keep old ones
        } finally {
            setLoading(false);
        }
    };

    const addEvent = async (eventData) => {
        try {
            const { data, error } = await supabase
                .from('calendar_events')
                .insert([eventData])
                .select();

            if (error) throw error;
            setEvents(prev => [...prev, ...data]);
            return { success: true };
        } catch (error) {
            console.error('Error adding calendar event:', error);
            return { success: false, error: error.message };
        }
    };

    const deleteEvent = async (id) => {
        try {
            const { error } = await supabase
                .from('calendar_events')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setEvents(prev => prev.filter(e => e.id !== id));
            return { success: true };
        } catch (error) {
            console.error('Error deleting calendar event:', error);
            return { success: false, error: error.message };
        }
    };

    // Helper to get events for a specific day
    const getEventsForDate = (date) => {
        return events.filter(event => isSameDay(new Date(event.event_date), date));
    };

    return (
        <CalendarContext.Provider value={{
            events,
            loading,
            currentDate,
            setCurrentDate,
            addEvent,
            deleteEvent,
            getEventsForDate
        }}>
            {children}
        </CalendarContext.Provider>
    );
};

export const useCalendar = () => useContext(CalendarContext);
