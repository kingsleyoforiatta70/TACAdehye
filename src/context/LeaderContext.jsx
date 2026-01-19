import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const LeaderContext = createContext(null);

export const LeaderProvider = ({ children }) => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLeaders = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('leaders')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) throw error;
            setLeaders(data || []);
        } catch (error) {
            console.error('Error fetching leaders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaders();
    }, []);

    const addLeader = async (leaderData, imageFile) => {
        try {
            let imageUrl = null;

            // Upload Image
            if (imageFile) {
                // Validation: Check size (Max 5MB)
                const fileSizeMB = imageFile.size / 1024 / 1024;
                if (fileSizeMB > 5) {
                    throw new Error("File size exceeds 5MB. Please choose a smaller image.");
                }

                console.log(`Starting image upload... Size: ${fileSizeMB.toFixed(2)}MB`);
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `${fileName}`;

                console.log("Uploading file to:", filePath);

                // Create a timeout promise
                const timeoutDetails = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Upload timed out after 60 seconds")), 60000)
                );

                // Race the upload against the timeout
                const uploadPromise = supabase.storage
                    .from('leaders')
                    .upload(filePath, imageFile, {
                        cacheControl: '3600',
                        upsert: false
                    });

                const { data: uploadData, error: uploadError } = await Promise.race([uploadPromise, timeoutDetails]);

                if (uploadError) {
                    console.error("Supabase Upload Error:", uploadError);
                    throw uploadError;
                }
                console.log("Upload successful", uploadData);

                const { data: { publicUrl } } = supabase.storage
                    .from('leaders')
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            // Insert Record
            console.log("Inserting leader record...");
            const { data, error } = await supabase
                .from('leaders')
                .insert([{
                    name: leaderData.name,
                    title: leaderData.title,
                    image_url: imageUrl,
                    description: leaderData.description
                }])
                .select()
                .single();

            if (error) throw error;

            setLeaders(prev => [...prev, data]);
            return data;
        } catch (error) {
            console.error("Error adding leader:", error);
            throw error;
        }
    };

    const updateLeader = async (id, updates, newImageFile) => {
        try {
            let imageUrl = updates.image_url;

            // Upload new image if provided
            if (newImageFile) {
                // Validation: Check size (Max 5MB)
                const fileSizeMB = newImageFile.size / 1024 / 1024;
                if (fileSizeMB > 5) {
                    throw new Error("File size exceeds 5MB. Please choose a smaller image.");
                }

                console.log(`Starting image upload (Update)... Size: ${fileSizeMB.toFixed(2)}MB`);
                const fileExt = newImageFile.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `${fileName}`;

                // Create a timeout promise
                const timeoutDetails = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Upload timed out after 60 seconds")), 60000)
                );

                const uploadPromise = supabase.storage
                    .from('leaders')
                    .upload(filePath, newImageFile, {
                        cacheControl: '3600',
                        upsert: false
                    });

                const { error: uploadError } = await Promise.race([uploadPromise, timeoutDetails]);

                if (uploadError) {
                    console.error("Supabase Upload Error:", uploadError);
                    throw uploadError;
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('leaders')
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            const { data, error } = await supabase
                .from('leaders')
                .update({ ...updates, image_url: imageUrl })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            setLeaders(prev => prev.map(l => l.id === id ? data : l));
            return data;
        } catch (error) {
            console.error("Error updating leader:", error);
            throw error;
        }
    };

    const deleteLeader = async (id) => {
        try {
            // Optional: delete image from storage if you want to be clean
            // For now just deleting the record
            const { error } = await supabase
                .from('leaders')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setLeaders(prev => prev.filter(l => l.id !== id));
        } catch (error) {
            console.error("Error deleting leader:", error);
            throw error;
        }
    };

    return (
        <LeaderContext.Provider value={{ leaders, loading, addLeader, updateLeader, deleteLeader, refreshLeaders: fetchLeaders }}>
            {children}
        </LeaderContext.Provider>
    );
};

export const useLeaders = () => {
    const context = useContext(LeaderContext);
    if (context === undefined) {
        throw new Error('useLeaders must be used within a LeaderProvider');
    }
    return context;
};
