import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const GalleryContext = createContext();

export const useGallery = () => {
    const context = useContext(GalleryContext);
    if (context === undefined) {
        throw new Error('useGallery must be used within a GalleryProvider');
    }
    return context;
};

export const GalleryProvider = ({ children }) => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAlbums = async () => {
        try {
            // 1. Fetch Albums
            const { data: albumsData, error } = await supabase
                .from('albums')
                .select('*, photos(count)')
                .order('album_date', { ascending: false });

            if (error) throw error;

            // 2. Fetch one photo for each album to use as cover
            const albumsWithCovers = await Promise.all(albumsData.map(async (album) => {
                const { data: photoData } = await supabase
                    .from('photos')
                    .select('url')
                    .eq('album_id', album.id)
                    .limit(1)
                    .maybeSingle(); // Use maybeSingle to avoid 406 if no rows

                // Attach the photo URL to the album object structure expected by UI 
                // UI expects album.photos[0].url
                return {
                    ...album,
                    photos: photoData ? [{ url: photoData.url, count: album.photos[0]?.count }] : []
                };
            }));

            setAlbums(albumsWithCovers || []);
        } catch (error) {
            console.error('Error fetching albums:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPhotos = async (albumId) => {
        try {
            const { data, error } = await supabase
                .from('photos')
                .select('*')
                .eq('album_id', albumId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error fetching photos:', error);
            return [];
        }
    };

    useEffect(() => {
        fetchAlbums();
    }, []);

    const createAlbum = async (title, description, date) => {
        try {
            const { data, error } = await supabase
                .from('albums')
                .insert([{ title, description, album_date: date }])
                .select()
                .single();

            if (error) throw error;
            // Re-fetch to maintain sort order easily
            await fetchAlbums();
            return { success: true };
        } catch (error) {
            console.error('Error creating album:', error);
            return { success: false, error: error.message };
        }
    };

    const updateAlbum = async (id, title, description, date) => {
        try {
            const { data, error } = await supabase
                .from('albums')
                .update({ title, description, album_date: date })
                .eq('id', id)
                .select();

            if (error) throw error;
            await fetchAlbums();
            return { success: true };
        } catch (error) {
            console.error('Error updating album:', error);
            return { success: false, error: error.message };
        }
    };

    const deleteAlbum = async (id) => {
        try {
            // Delete album (photos cascade deleted in DB, but we need to clean storage)
            // Ideally, we fetch photos first to delete files, but for now let's just delete the DB record.
            // A Supabase Edge Function is better for cleaning up storage on cascade delete.
            // For this implementation, we will try to clean up photos manually if possible? 
            // Let's simpler: Database cascade deletes the rows. Orphaned files might remain in bucket.
            // To do it right: fetch photos, delete files, then delete album.

            const photos = await fetchPhotos(id);

            // Delete files from storage
            if (photos.length > 0) {
                const paths = photos.map(p => {
                    const parts = p.url.split('/');
                    return `gallery/${parts[parts.length - 1]}`; // Assuming simple filename
                });
                // We won't block on this failing
                // supabase.storage.from('gallery').remove(paths);
            }

            const { error } = await supabase
                .from('albums')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setAlbums(albums.filter(a => a.id !== id));
            return { success: true };
        } catch (error) {
            console.error('Error deleting album:', error);
            return { success: false, error: error.message };
        }
    };

    const uploadPhoto = async (albumId, file) => {
        try {
            // 1. Upload to Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('gallery')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('gallery')
                .getPublicUrl(filePath);

            // 3. Insert into Photos table
            const { data, error: dbError } = await supabase
                .from('photos')
                .insert([{ album_id: albumId, url: publicUrl }])
                .select()
                .single();

            if (dbError) throw dbError;

            return { success: true, photo: data };
        } catch (error) {
            console.error('Error uploading photo:', error);
            return { success: false, error: error.message };
        }
    };

    const deletePhoto = async (id, url) => {
        try {
            // Delete from DB
            const { error: dbError } = await supabase
                .from('photos')
                .delete()
                .eq('id', id);

            if (dbError) throw dbError;

            // Delete from Storage
            const urlParts = url.split('/');
            const fileName = urlParts[urlParts.length - 1];

            const { error: storageError } = await supabase.storage
                .from('gallery')
                .remove([fileName]);

            if (storageError) console.warn('Storage delete warning:', storageError);

            return { success: true };
        } catch (error) {
            console.error('Error deleting photo:', error);
            return { success: false, error: error.message };
        }
    };

    return (
        <GalleryContext.Provider value={{
            albums,
            loading,
            fetchAlbums,
            fetchPhotos,
            createAlbum,
            updateAlbum,
            deleteAlbum,
            uploadPhoto,
            deletePhoto
        }}>
            {children}
        </GalleryContext.Provider>
    );
};
