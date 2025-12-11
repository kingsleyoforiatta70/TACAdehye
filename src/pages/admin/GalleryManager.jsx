import React, { useState, useRef } from 'react';
import { useGallery } from '../../context/GalleryContext';

const GalleryManager = () => {
    const { albums, createAlbum, updateAlbum, deleteAlbum, uploadPhoto, fetchPhotos, deletePhoto } = useGallery();
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [albumPhotos, setAlbumPhotos] = useState([]);
    const [loadingPhotos, setLoadingPhotos] = useState(false);

    // Album Form State
    const [isCreating, setIsCreating] = useState(false);
    const [isEditingAlbum, setIsEditingAlbum] = useState(false); // New state for editing
    const [editingAlbumId, setEditingAlbumId] = useState(null); // ID of album being edited

    const [albumForm, setAlbumForm] = useState({ title: '', description: '', date: new Date().toISOString().split('T')[0] });
    const [createError, setCreateError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Photo Upload State
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleCreateAlbum = async (e) => {
        e.preventDefault();
        setCreateError('');
        setIsSubmitting(true);

        const result = await createAlbum(albumForm.title, albumForm.description, albumForm.date);

        if (result.success) {
            setIsCreating(false);
            setAlbumForm({ title: '', description: '', date: new Date().toISOString().split('T')[0] });
        } else {
            setCreateError(result.error);
        }
        setIsSubmitting(false);
    };

    const handleUpdateAlbum = async (e) => {
        e.preventDefault();
        setCreateError('');
        setIsSubmitting(true);

        const result = await updateAlbum(editingAlbumId, albumForm.title, albumForm.description, albumForm.date);

        if (result.success) {
            setIsEditingAlbum(false);
            setEditingAlbumId(null);
            setAlbumForm({ title: '', description: '', date: new Date().toISOString().split('T')[0] });
            // If the updated album was open, update the view locally just in case
            if (selectedAlbum && selectedAlbum.id === editingAlbumId) {
                setSelectedAlbum(prev => ({ ...prev, title: albumForm.title, description: albumForm.description, album_date: albumForm.date }));
            }
        } else {
            setCreateError(result.error);
        }
        setIsSubmitting(false);
    };

    const openAlbum = async (album) => {
        setSelectedAlbum(album);
        setLoadingPhotos(true);
        const photos = await fetchPhotos(album.id);
        setAlbumPhotos(photos);
        setLoadingPhotos(false);
    };

    const startEditAlbum = (e, album) => {
        e.stopPropagation();
        setAlbumForm({
            title: album.title,
            description: album.description || '',
            date: album.album_date || new Date().toISOString().split('T')[0]
        });
        setEditingAlbumId(album.id);
        setIsEditingAlbum(true);
        setIsCreating(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelForm = () => {
        setIsCreating(false);
        setIsEditingAlbum(false);
        setEditingAlbumId(null);
        setAlbumForm({ title: '', description: '', date: new Date().toISOString().split('T')[0] });
        setCreateError('');
    };

    const handleUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        await Promise.all(files.map(async (file) => {
            const result = await uploadPhoto(selectedAlbum.id, file);
            if (result.success) {
                setAlbumPhotos(prev => [result.photo, ...prev]);
            } else {
                console.error(`Failed to upload ${file.name}:`, result.error);
                alert(`Failed to upload ${file.name}`);
            }
        }));

        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDeletePhoto = async (photo) => {
        if (!window.confirm('Delete this photo?')) return;

        const result = await deletePhoto(photo.id, photo.url);
        if (result.success) {
            setAlbumPhotos(prev => prev.filter(p => p.id !== photo.id));
        } else {
            alert('Failed to delete photo');
        }
    };

    const handleDeleteAlbum = async (e, id) => {
        e.stopPropagation();
        if (!window.confirm('Are you sure? This will delete the album and all its photos.')) return;

        await deleteAlbum(id);
        if (selectedAlbum && selectedAlbum.id === id) {
            setSelectedAlbum(null);
        }
    };

    if (selectedAlbum) {
        return (
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b">
                    <button
                        onClick={() => setSelectedAlbum(null)}
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Back to Albums
                    </button>
                    <h2 className="text-xl font-bold text-gray-800">{selectedAlbum.title}</h2>
                </div>

                <div className="mb-8">
                    <p className="text-gray-600 mb-2">{selectedAlbum.description}</p>
                    <p className="text-sm text-gray-400 mb-4">Date: {selectedAlbum.album_date ? new Date(selectedAlbum.album_date).toLocaleDateString() : 'N/A'}</p>

                    <div className="flex items-center space-x-4">
                        <label className={`cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${uploading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}>
                            {uploading ? 'Uploading...' : 'Upload Photos'}
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleUpload}
                                disabled={uploading}
                            />
                        </label>
                        <span className="text-sm text-gray-500">
                            {uploading ? 'Please wait...' : 'Select multiple files to upload'}
                        </span>
                    </div>
                </div>

                {loadingPhotos ? (
                    <div className="flex justify-center p-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {albumPhotos.length === 0 ? (
                            <p className="col-span-full text-center text-gray-500 py-8">No photos in this album yet.</p>
                        ) : (
                            albumPhotos.map(photo => (
                                <div key={photo.id} className="relative group aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
                                    <img src={photo.url} alt="Gallery" className="object-cover w-full h-full" />
                                    <button
                                        onClick={() => handleDeletePhoto(photo)}
                                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Delete Photo"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Photo Albums</h3>
                {!isEditingAlbum && (
                    <button
                        onClick={() => { setIsCreating(!isCreating); setAlbumForm({ title: '', description: '', date: new Date().toISOString().split('T')[0] }); }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
                    >
                        {isCreating ? 'Cancel' : 'New Album'}
                    </button>
                )}
            </div>

            {(isCreating || isEditingAlbum) && (
                <form onSubmit={isEditingAlbum ? handleUpdateAlbum : handleCreateAlbum} className={`mb-8 p-4 rounded-lg border ${isEditingAlbum ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50'}`}>
                    {isEditingAlbum && <h4 className="text-yellow-800 font-semibold mb-4 uppercase text-sm">Editing Album</h4>}
                    {createError && <p className="text-red-500 text-sm mb-3">{createError}</p>}
                    <div className="grid gap-4 mb-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 uppercase mb-1">Album Title</label>
                            <input
                                type="text"
                                required
                                value={albumForm.title}
                                onChange={e => setAlbumForm({ ...albumForm, title: e.target.value })}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 uppercase mb-1">Description</label>
                            <input
                                type="text"
                                value={albumForm.description}
                                onChange={e => setAlbumForm({ ...albumForm, description: e.target.value })}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 uppercase mb-1">Date</label>
                            <input
                                type="date"
                                required
                                value={albumForm.date}
                                onChange={e => setAlbumForm({ ...albumForm, date: e.target.value })}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                        {isEditingAlbum && (
                            <button
                                type="button"
                                onClick={cancelForm}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 text-sm font-medium"
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`${isEditingAlbum ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'} text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50`}
                        >
                            {isSubmitting ? 'Saving...' : (isEditingAlbum ? 'Update Album' : 'Create Album')}
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {albums.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500 py-12">No albums found. Create one to get started.</p>
                ) : (
                    albums.map(album => (
                        <div
                            key={album.id}
                            onClick={() => openAlbum(album)}
                            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white group"
                        >
                            <div className="h-40 bg-gray-200 flex items-center justify-center relative">
                                {album.photos && album.photos.length > 0 && album.photos[0].url ? (
                                    <img src={album.photos[0].url} alt={album.title} className="w-full h-full object-cover" />
                                ) : (
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                )}

                                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => startEditAlbum(e, album)}
                                        className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 z-10"
                                        title="Edit Album"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    </button>
                                    <button
                                        onClick={(e) => handleDeleteAlbum(e, album.id)}
                                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 z-10"
                                        title="Delete Album"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-gray-900 truncate">{album.title}</h4>
                                <p className="text-sm text-gray-500 truncate">{album.description}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-gray-400">
                                        {album.album_date ? new Date(album.album_date).toLocaleDateString() : 'N/A'}
                                    </span>
                                    <span className="text-xs text-blue-500">View &rarr;</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default GalleryManager;
