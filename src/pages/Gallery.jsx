import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import { useGallery } from '../context/GalleryContext';

const Gallery = () => {
    const { albums, fetchPhotos, loading } = useGallery();
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [loadingPhotos, setLoadingPhotos] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const openAlbum = async (album) => {
        setSelectedAlbum(album);
        setLoadingPhotos(true);
        const data = await fetchPhotos(album.id);
        setPhotos(data);
        setLoadingPhotos(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const closeAlbum = () => {
        setSelectedAlbum(null);
        setPhotos([]);
        setLightboxIndex(null);
    };

    // Lightbox navigation
    const showNext = (e) => {
        e.stopPropagation();
        setLightboxIndex((prev) => (prev + 1) % photos.length);
    };

    const showPrev = (e) => {
        e.stopPropagation();
        setLightboxIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    if (loading) {
        return (
            <PageLayout title="Photo Gallery">
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </PageLayout>
        );
    }

    /* Lightbox Modal */
    const Lightbox = () => {
        useEffect(() => {
            if (lightboxIndex !== null) {
                // Scroll to top and disable scrolling when lightbox opens
                window.scrollTo({ top: 0, behavior: 'instant' });
                document.body.style.overflow = 'hidden';
            } else {
                // Re-enable scrolling when lightbox closes
                document.body.style.overflow = 'auto';
            }
            return () => {
                document.body.style.overflow = 'auto';
            };
        }, [lightboxIndex]);

        if (lightboxIndex === null) return null;

        const photo = photos[lightboxIndex];

        return (
            <div className="fixed inset-0 z-[9999] pointer-events-none" style={{ background: 'transparent' }}>
                <div
                    className="absolute left-1/2 transform -translate-x-1/2 pointer-events-auto flex justify-center"
                    style={{
                        top: '-140px', /* Controlled by number here as requested */
                        width: 'auto',
                        height: 'auto'
                    }}
                >
                    <img
                        src={photo.url}
                        alt={photo.caption || 'Gallery Image'}
                        /* Ensure width is not fixed, but constrained to viewport so it is fully visible */
                        className="w-auto h-auto max-w-[95vw] max-h-[90vh] object-contain shadow-2xl"
                        style={{ display: 'block' }}
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        className="absolute top-2 right-2 text-white hover:text-gray-200 z-50 p-2 bg-black/40 rounded-full hover:bg-black/60 transition-colors pointer-events-auto"
                        onClick={() => setLightboxIndex(null)}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <button
                        className="absolute left-2 md:-left-16 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-50 p-3 bg-black/50 rounded-full transition-colors pointer-events-auto"
                        onClick={showPrev}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <button
                        className="absolute right-2 md:-right-16 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-50 p-3 bg-black/50 rounded-full transition-colors pointer-events-auto"
                        onClick={showNext}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>

                </div>
            </div>
        );
    };

    /* Single Album View */
    if (selectedAlbum) {
        return (
            <PageLayout title={selectedAlbum.title}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <button
                        onClick={closeAlbum}
                        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Back to All Albums
                    </button>

                    <div className="mb-8">
                        <p className="text-gray-600 text-lg">{selectedAlbum.description}</p>
                    </div>

                    {loadingPhotos ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    ) : photos.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-lg">
                            <p className="text-gray-500 text-lg">No photos in this album yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {photos.map((photo, index) => (
                                <div
                                    key={photo.id}
                                    className="aspect-square bg-transparent rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                                    onClick={() => setLightboxIndex(index)}
                                >
                                    <img
                                        src={photo.url}
                                        alt={photo.caption || ''}
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <Lightbox />
                </div>
            </PageLayout>
        );
    }

    /* Albums Grid View */
    console.log("Gallery Albums Render:", albums);
    return (
        <PageLayout title="Photo Gallery">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {albums.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <h3 className="text-lg font-medium text-gray-900">No albums yet</h3>
                        <p className="mt-1 text-gray-400">Our gallery is empty. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {albums.map((album) => (
                            <div
                                key={album.id}
                                onClick={() => openAlbum(album)}
                                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden flex flex-col h-full"
                            >
                                <div className="aspect-square bg-transparent rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                                    {album.photos && album.photos.length > 0 && album.photos[0].url ? (
                                        <img src={album.photos[0].url} alt={album.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition-colors">
                                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{album.title}</h3>
                                        <p className="text-gray-600 line-clamp-3 text-sm">{album.description}</p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-blue-600 text-sm font-medium">
                                        <span>View Album</span>
                                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PageLayout>
    );
};

export default Gallery;
