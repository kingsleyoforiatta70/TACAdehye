import React, { useState } from 'react';
import { useVideos } from '../../context/VideoContext';

const VideoManager = () => {
    const { videos, addVideo, deleteVideo } = useVideos();
    const [newItem, setNewItem] = useState({ youtubeId: '', title: '', description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const extractVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : url; // Return ID if match, else return original (assuming it might be an ID)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        const videoId = extractVideoId(newItem.youtubeId);
        if (videoId.length !== 11) {
            setError("Invalid YouTube URL or ID.");
            setIsSubmitting(false);
            return;
        }

        const result = await addVideo({
            youtube_id: videoId,
            title: newItem.title,
            description: newItem.description
        });

        if (result.success) {
            setNewItem({ youtubeId: '', title: '', description: '' });
        } else {
            setError(result.error || 'Failed to add video');
        }
        setIsSubmitting(false);
    };

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Manage Videos</h3>
            </div>

            <div className="p-6">
                {/* Add New Video Form */}
                <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">Add New Video</h4>
                    {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

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

                        <div className="col-span-1">
                            <label className="block text-xs font-medium text-gray-500 uppercase">Title</label>
                            <input
                                type="text"
                                required
                                value={newItem.title}
                                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                placeholder="Video Title"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-xs font-medium text-gray-500 uppercase">Description</label>
                            <input
                                type="text"
                                value={newItem.description}
                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                placeholder="Brief description"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="mt-4 text-right">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                        >
                            {isSubmitting ? 'Adding...' : 'Add Video'}
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
                                    <tr key={video.id}>
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
                                            <div className="text-sm font-medium text-gray-900">{video.title}</div>
                                            <div className="text-sm text-gray-500">{video.description}</div>
                                            <a
                                                href={`https://youtu.be/${video.youtube_id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-blue-500 hover:text-blue-700 mt-1 inline-block"
                                            >
                                                View on YouTube
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => deleteVideo(video.id)}
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
