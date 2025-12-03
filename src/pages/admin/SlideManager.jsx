import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';

const SlideManager = () => {
    const { slides, addSlide, removeSlide, resetToDefaults } = useContent();
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file.');
            return;
        }

        // Validate file size (e.g., max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB.');
            return;
        }

        setError('');
        setUploading(true);
        try {
            await addSlide(file);
        } catch (err) {
            setError('Failed to upload image.');
            console.error(err);
        } finally {
            setUploading(false);
            // Reset input
            e.target.value = null;
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Welcome Slides Management
                </h3>
                <button
                    onClick={resetToDefaults}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                    Reset to Defaults
                </button>
            </div>

            {/* Upload Section */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add New Slide
                </label>
                <div className="flex items-center space-x-4">
                    <label className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2 px-4 border border-blue-300 rounded shadow-sm transition-colors">
                        <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />
                    </label>
                    <span className="text-sm text-gray-500">
                        Recommended size: 1920x1080px (16:9 aspect ratio)
                    </span>
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            {/* Slides List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {slides.map((slide) => (
                    <div key={slide.id} className="relative group rounded-lg overflow-hidden shadow-md border border-gray-200">
                        <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                            <img
                                src={slide.src}
                                alt={slide.alt}
                                className="object-cover w-full h-48"
                            />
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <button
                                onClick={() => removeSlide(slide.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium shadow-sm transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {slides.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                    No slides available. Upload an image to get started.
                </p>
            )}
        </div>
    );
};

export default SlideManager;
