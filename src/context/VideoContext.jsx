import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const VideoContext = createContext();

export const useVideos = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVideos = async () => {
        try {
            const { data, error } = await supabase
                .from('videos')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setVideos(data || []);
        } catch (error) {
            console.error('Error fetching videos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const addVideo = async (videoData) => {
        try {
            const { data, error } = await supabase
                .from('videos')
                .insert([videoData])
                .select();

            if (error) throw error;
            setVideos([data[0], ...videos]);
            return { success: true };
        } catch (error) {
            console.error('Error adding video:', error);
            return { success: false, error: error.message };
        }
    };

    const deleteVideo = async (id) => {
        try {
            const { error } = await supabase
                .from('videos')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setVideos(videos.filter(v => v.id !== id));
            return { success: true };
        } catch (error) {
            console.error('Error deleting video:', error);
            return { success: false, error: error.message };
        }
    };

    return (
        <VideoContext.Provider value={{ videos, loading, addVideo, deleteVideo }}>
            {children}
        </VideoContext.Provider>
    );
};
