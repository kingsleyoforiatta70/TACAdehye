import React, { useState } from 'react';
import { useVideos } from '../../context/VideoContext';

const VideoManager = () => {
    const { videos, addVideo, updateVideo, deleteVideo } = useVideos();
    const [newItem, setNewItem] = useState({ youtubeId: '', title: '', description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const extractVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : url;
    };

    const handleEdit = (video) => {
        setNewItem({
            youtubeId: `https://youtu.be/${video.youtube_id}`,
            title: video.title,
            description: video.description || ''
        });
        setEditId(video.id);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setNewItem({ youtubeId: '', title: '', description: '' });
        setIsEditing(false);
        setEditId(null);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("VideoManager: Submitting video form...", newItem);
        setError('');
        setIsSubmitting(true);

        const videoId = extractVideoId(newItem.youtubeId);
        console.log("VideoManager: Extracted ID:", videoId);

        if (videoId.length !== 11) {
            console.log("VideoManager: Invalid ID length. Length:", videoId.length, "Value:", videoId);
            setError("Invalid YouTube URL or ID. Please check the link.");
            setIsSubmitting(false);
            return;
        }

        // Check for duplicates (unless editing the same video)
        const existing = videos.find(v => v.youtube_id === videoId);
        if (existing && (!isEditing || existing.id !== editId)) {
            console.log("VideoManager: Duplicate detected");
            setError("This video has already been added.");
            setIsSubmitting(false);
            return;
        }

        let result;
        if (isEditing) {
            console.log("VideoManager: Calling updateVideo...");
            result = await updateVideo(editId, {
                youtube_id: videoId,
                title: newItem.title,
                description: newItem.description
            });
        } else {
            console.log("VideoManager: Calling addVideo...");
            result = await addVideo({
                youtube_id: videoId,
                title: newItem.title,
                description: newItem.description
            });
        }

        console.log("VideoManager: result:", result);

        if (result.success) {
            console.log("VideoManager: Video operation successful");
            setNewItem({ youtubeId: '', title: '', description: '' });
            alert(isEditing ? "Video updated successfully!" : "Video added successfully!");
            if (isEditing) {
                setIsEditing(false);
                setEditId(null);
            }
        } else {
            console.error("VideoManager: Operation failed", result.error);
            setError(result.error || 'Operation failed. Check if this video already exists or if you have permission.');
        }
        setIsSubmitting(false);
    };

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Manage Videos</h3>
            </div>

            <div className="p-6">
                {/* Add/Edit Video Form */}
                <form onSubmit={handleSubmit} className={`mb-8 p-4 rounded-lg border ${isEditing ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex justify-between items-center mb-4">
                        <h4 className={`text-sm font-semibold uppercase tracking-wider ${isEditing ? 'text-yellow-800' : 'text-gray-700'}`}>
                            {isEditing ? 'Edit Video' : 'Add New Video'}
                        </h4>
                        {isEditing && (
                            <button type="button" onClick={handleCancelEdit} className="text-xs text-gray-500 hover:text-gray-700 underline">
                                Cancel Edit
                            </button>
                        )}
                    </div>

                    {error && <p className="text-red-500 text-sm mb-3 bg-red-50 p-2 rounded border border-red-200">{error}</p>}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-medium text-gray-500 uppercase">YouTube Link or ID</label>
                            <input
                                type="text"
                                required
                                value={newItem.youtubeId}
                                onChange={(e) => setNewItem({ ...newItem, youtubeId: e.target.value })}
                                placeholder="e.g., https://youtu.be/..."
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <p className="text-xs text-gray-400 mt-1">Paste the full YouTube link or just the video ID.</p>
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-medium text-gray-500 uppercase">Title</label>
                            <textarea
                                rows="2"
                                required
                                value={newItem.title}
                                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                placeholder="Video Title (unlimited length)"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-medium text-gray-500 uppercase">Description</label>
                            <textarea
                                rows="4"
                                value={newItem.description}
                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                placeholder="Video description (unlimited length). Feel free to type as much as you need."
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="mt-4 text-right">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isEditing ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50`}
                        >
                            {isSubmitting ? 'Saving...' : (isEditing ? 'Update Video' : 'Add Video')}
                        </button>
                    </div>
                </form>

                {/* Video List */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {videos.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No videos added yet.
                                    </td>
                                </tr>
                            ) : (
                                videos.map((video) => (
                                    <tr key={video.id} className={isEditing && editId === video.id ? 'bg-yellow-50' : ''}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="h-20 w-32 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                                <img
                                                    className="h-full w-full object-cover"
                                                    src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                                                    alt={video.title}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 whitespace-pre-wrap max-w-xs">{video.title}</div>
                                            <div className="text-sm text-gray-500 mt-1 whitespace-pre-wrap max-w-xs">{video.description}</div>
                                            <a
                                                href={`https://youtu.be/${video.youtube_id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-blue-500 hover:text-blue-700 mt-2 inline-block"
                                            >
                                                View on YouTube
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(video)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Are you sure you want to delete this video?')) {
                                                        deleteVideo(video.id);
                                                    }
                                                }}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VideoManager;
