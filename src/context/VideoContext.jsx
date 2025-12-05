import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const VideoContext = createContext();

export const useVideos = () => {
    const context = useContext(VideoContext);
    if (context === undefined) {
        throw new Error('useVideos must be used within a VideoProvider');
    }
    return context;
};

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
        console.log("VideoContext: addVideo called with:", videoData);
        try {
            const { data, error } = await supabase
                .from('videos')
                .insert([videoData])
                .select();

            if (error) {
                console.error("VideoContext: Supabase insert error:", error);
                throw error;
            }
            console.log("VideoContext: Supabase insert success:", data);

            if (data && data.length > 0) {
                setVideos([data[0], ...videos]);
            } else {
                console.log("VideoContext: No data returned from insert, refetching...");
                await fetchVideos();
            }

            return { success: true };
        } catch (error) {
            console.error('VideoContext: Error adding video:', error);
            return { success: false, error: error.message };
        }
    };

    const updateVideo = async (id, updateData) => {
        try {
            const { data, error } = await supabase
                .from('videos')
                .update(updateData)
                .eq('id', id)
                .select();

            if (error) throw error;

            if (data && data.length > 0) {
                setVideos(videos.map(v => v.id === id ? data[0] : v));
            } else {
                await fetchVideos();
            }

            return { success: true };
        } catch (error) {
            console.error('Error updating video:', error);
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
        <VideoContext.Provider value={{ videos, loading, addVideo, updateVideo, deleteVideo }}>
            {children}
        </VideoContext.Provider>
    );
};
