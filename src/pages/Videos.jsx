import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import { useVideos } from '../context/VideoContext';

const Videos = () => {
    const { videos, loading } = useVideos();
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Set the first video as the default current video when videos are loaded
    useEffect(() => {
        if (videos.length > 0 && !currentVideo) {
            setCurrentVideo(videos[0]);
            setIsPlaying(false); // Do not autoplay initial video
        }
    }, [videos, currentVideo]);

    const handleVideoClick = (video) => {
        setCurrentVideo(video);
        setIsPlaying(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <PageLayout title="Video Archive">
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </PageLayout>
        );
    }

    if (videos.length === 0) {
        return (
            <PageLayout title="Video Archive">
                <div className="flex flex-col justify-center items-center py-20 text-center">
                    <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <h2 className="text-xl font-medium text-gray-900">No videos yet</h2>
                    <p className="mt-2 text-gray-500">Check back soon for new content!</p>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout title="Video Archive">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Main Video Player */}
                {currentVideo && (
                    <div className="mb-12">
                        <div className="relative pb-[56.25%] h-0 bg-black rounded-xl overflow-hidden shadow-2xl">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${currentVideo.youtube_id}?autoplay=${isPlaying ? '1' : '0'}&rel=0`}
                                title={currentVideo.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="mt-4">
                            <h2 className="text-2xl font-bold text-gray-900">{currentVideo.title}</h2>
                            <p className="mt-2 text-gray-600">{currentVideo.description}</p>
                        </div>
                    </div>
                )}

                {/* Video Grid */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">More Videos</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video) => (
                            <div
                                key={video.id}
                                onClick={() => handleVideoClick(video)}
                                className={`cursor-pointer group rounded-lg overflow-hidden border transition-all duration-300 ${currentVideo && currentVideo.id === video.id ? 'ring-2 ring-blue-500 border-transparent bg-blue-50' : 'border-gray-200 bg-white hover:shadow-lg'}`}
                            >
                                <div className="relative pb-[56.25%] overflow-hidden bg-gray-200">
                                    <img
                                        src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                                        alt={video.title}
                                        className="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h4 className={`font-semibold line-clamp-2 ${currentVideo && currentVideo.id === video.id ? 'text-blue-700' : 'text-gray-900 group-hover:text-blue-600'}`}>
                                        {video.title}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default Videos;
