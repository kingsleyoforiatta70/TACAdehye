import React, { useState } from 'react';
import { useLeaders } from '../../context/LeaderContext';

const LeaderManager = () => {
    const { leaders, addLeader, updateLeader, deleteLeader, loading } = useLeaders();
    const [isEditing, setIsEditing] = useState(false);
    const [currentLeader, setCurrentLeader] = useState(null);
    const [formData, setFormData] = useState({ name: '', title: '', description: '' });
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [inputKey, setInputKey] = useState(Date.now()); // Key to force re-render of file input

    const handleEdit = (leader) => {
        setIsEditing(true);
        setCurrentLeader(leader);
        setFormData({ name: leader.name, title: leader.title, description: leader.description || '' });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this leader?")) {
            try {
                await deleteLeader(id);
            } catch (error) {
                console.error("Failed to delete leader:", error);
                alert("Failed to delete leader. Please checks ensure you are logged in and have permission.");
            }
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentLeader(null);
        setFormData({ name: '', title: '', description: '' });
        setImageFile(null);
        setInputKey(Date.now()); // Reset file input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            if (isEditing) {
                await updateLeader(currentLeader.id, formData, imageFile);
            } else {
                await addLeader(formData, imageFile);
            }
            resetForm();
        } catch (error) {
            console.error("Save Leader Error:", error);
            alert(`Error saving leader: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div>Loading leaders...</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Leaders</h2>

            <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Leader' : 'Add New Leader'}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Title (e.g. President)</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Photo</label>
                    <input
                        key={inputKey}
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="w-full"
                    />
                    {isEditing && !imageFile && currentLeader.image_url && (
                        <p className="text-sm text-gray-500 mt-1">Current image will be kept if no new file is selected.</p>
                    )}
                </div>

                <div className="flex items-center justify-end mt-6 space-x-4">
                    {isEditing && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="text-gray-600 hover:text-gray-800 font-medium"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={uploading}
                        className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {uploading ? 'Saving...' : (isEditing ? 'Update Leader' : 'Add Leader')}
                    </button>
                </div>
            </form>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {leaders.map(leader => (
                    <div key={leader.id} className="border rounded-lg overflow-hidden shadow-sm bg-white relative group">
                        <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                            {leader.image_url ? (
                                <img src={leader.image_url} alt={leader.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                                <button
                                    onClick={() => handleEdit(leader)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(leader.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="font-bold text-lg text-gray-900">{leader.name}</h3>
                            <p className="text-blue-600 font-medium text-sm mt-1">{leader.title}</p>
                        </div>
                    </div>
                ))}
            </div>
            {leaders.length === 0 && (
                <div className="text-center text-gray-500 py-10">
                    No leaders added yet. Add some above.
                </div>
            )}
        </div>
    );
};

export default LeaderManager;
