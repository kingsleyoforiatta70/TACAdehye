import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const MessageContext = createContext(null);

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();

        // Force loading to false after 3 seconds to prevent hanging
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 3000);

        // Real-time subscription
        const subscription = supabase
            .channel('public:messages')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    setMessages(prev => [payload.new, ...prev]);
                } else if (payload.eventType === 'DELETE') {
                    setMessages(prev => prev.filter(msg => msg.id !== payload.old.id));
                } else if (payload.eventType === 'UPDATE') {
                    setMessages(prev => prev.map(msg => msg.id === payload.new.id ? payload.new : msg));
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
            clearTimeout(timeout);
        };
    }, []);

    const fetchMessages = async () => {
        try {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setMessages(data || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const addMessage = async (message) => {
        try {
            const { data, error } = await supabase
                .from('messages')
                .insert([message])
                .select()
                .single();

            if (error) throw error;
            // State update handled by subscription
            return data;
        } catch (error) {
            console.error('Error adding message:', error);
            throw error;
        }
    };

    const markAsRead = async (id) => {
        try {
            const { error } = await supabase
                .from('messages')
                .update({ read: true })
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    };

    const deleteMessage = async (id) => {
        try {
            const { error } = await supabase
                .from('messages')
                .delete()
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    return (
        <MessageContext.Provider value={{ messages, addMessage, markAsRead, deleteMessage, loading }}>
            {!loading && children}
        </MessageContext.Provider>
    );
};

export const useMessages = () => useContext(MessageContext);
