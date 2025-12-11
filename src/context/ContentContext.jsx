import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import englishService from '../assets/english_service.png';
import twiService from '../assets/twi_service.png';
import prayerBg from '../assets/prayer_bg.png';
import testimonyBg from '../assets/testimony_bg.png';

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
    const [slides, setSlides] = useState([]);
    const [pages, setPages] = useState({}); // { slug: { title, content } }
    const [loading, setLoading] = useState(true);

    // Default slides for fallback
    const defaultSlides = [
        { id: 1, src: englishService, alt: 'English Service' },
        { id: 2, src: twiService, alt: 'Twi Service' },
        { id: 3, src: prayerBg, alt: 'Prayer' },
        { id: 4, src: testimonyBg, alt: 'Testimony' }
    ];

    useEffect(() => {
        const initData = async () => {
            await Promise.all([fetchSlides(), fetchPages()]);
            // Force loading to false after 3 seconds to prevent hanging
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        };
        initData();
    }, []);

    const fetchSlides = async () => {
        try {
            const { data, error } = await supabase
                .from('slides')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) throw error;

            if (data && data.length > 0) {
                setSlides(data);
            } else {
                setSlides(defaultSlides);
            }
        } catch (error) {
            console.error('Error fetching slides:', error);
            setSlides(defaultSlides);
        }
    };

    const fetchPages = async () => {
        try {
            const { data, error } = await supabase
                .from('pages')
                .select('*');

            if (error) {
                // If table doesn't exist, we might get an error. We'll handle it nicely.
                console.warn('Error fetching pages (table might not exist yet):', error);
                return;
            }

            if (data) {
                const pagesMap = {};
                data.forEach(page => {
                    pagesMap[page.slug] = page;
                });
                setPages(pagesMap);
            }
        } catch (error) {
            console.error('Error fetching pages:', error);
        }
    };

    const updatePage = async (slug, title, content) => {
        try {
            // Upsert: update if exists, insert if not
            const { data, error } = await supabase
                .from('pages')
                .upsert({ slug, title, content }, { onConflict: 'slug' })
                .select()
                .single();

            if (error) throw error;

            setPages(prev => ({
                ...prev,
                [slug]: data
            }));
            return data;
        } catch (error) {
            console.error('Error updating page:', error);
            throw error;
        }
    };

    const addSlide = async (file) => {
        try {
            // 1. Upload image to Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('slides')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('slides')
                .getPublicUrl(filePath);

            // 3. Insert into Database
            const { data, error: dbError } = await supabase
                .from('slides')
                .insert([
                    { src: publicUrl, alt: file.name }
                ])
                .select()
                .single();

            if (dbError) throw dbError;

            setSlides(prev => [...prev, data]);
            return data;
        } catch (error) {
            console.error('Error adding slide:', error);
            throw error;
        }
    };

    const removeSlide = async (id) => {
        try {
            // Get the slide to find the filename for storage deletion
            const slideToRemove = slides.find(s => s.id === id);
            if (!slideToRemove) return;

            // If it's a default slide (id < 100), just remove from state locally if we were using defaults
            // But if we are using DB, we should only delete DB items.
            // Assuming default slides are not in DB or have different IDs.

            // Delete from DB
            const { error: dbError } = await supabase
                .from('slides')
                .delete()
                .eq('id', id);

            if (dbError) throw dbError;

            // Delete from Storage (extract filename from URL)
            // URL format: .../slides/filename.ext
            const urlParts = slideToRemove.src.split('/');
            const fileName = urlParts[urlParts.length - 1];

            // Only attempt storage delete if it looks like a supabase storage url
            if (slideToRemove.src.includes('supabase')) {
                const { error: storageError } = await supabase.storage
                    .from('slides')
                    .remove([fileName]);

                if (storageError) console.error('Error removing file from storage:', storageError);
            }

            setSlides(prev => prev.filter(slide => slide.id !== id));
        } catch (error) {
            console.error('Error removing slide:', error);
            throw error;
        }
    };

    const resetToDefaults = async () => {
        // This might be complex with DB. Maybe just re-fetch?
        // Or clear DB? For now, let's just re-fetch or set state.
        // If the user wants to "reset", they might mean "delete all custom and show defaults".
        // For safety, let's just set state to defaults but warn it's local only?
        // Actually, let's just re-fetch.
        fetchSlides();
    };

    return (
        <ContentContext.Provider value={{ slides, addSlide, removeSlide, resetToDefaults, loading, pages, updatePage }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
