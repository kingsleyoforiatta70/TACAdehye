import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';

const AboutManager = () => {
    const { pages, updatePage } = useContent();
    const [selectedSlug, setSelectedSlug] = useState('brief_history');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const topics = [
        { slug: 'brief_history', label: 'Brief History' },
        { slug: 'local_history', label: 'Local History' },
        { slug: 'tenets', label: 'Tenets of the Church' },
        { slug: 'our_belief', label: 'Our Belief' },
        { slug: 'rules_of_conduct', label: 'Rules of Conduct' },
    ];

    useEffect(() => {
        if (pages && pages[selectedSlug]) {
            setTitle(pages[selectedSlug].title || '');
            setContent(pages[selectedSlug].content || '');
        } else {
            // New or loading, set defaults or keep previous if switching? 
            // Better to clear if not found to avoid confusion, or handle "loading"
            setTitle(''); // Could assume "Brief History" default title if we wanted
            setContent('');
        }
    }, [selectedSlug, pages]);

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            await updatePage(selectedSlug, title, content);
            setMessage('Saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error(error);
            setMessage('Error saving content. Ensure the "pages" table exists in your database.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Edit About Pages</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700">Select Topic</label>
                <select
                    value={selectedSlug}
                    onChange={(e) => setSelectedSlug(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                    {topics.map(t => (
                        <option key={t.slug} value={t.slug}>{t.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Page Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Brief History"
                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Content (HTML Supported)</label>
                <p className="text-xs text-gray-500 mb-2">Use &lt;p&gt; for paragraphs, &lt;br&gt; for line breaks, &lt;ul&gt;/&lt;li&gt; for lists.</p>
                <textarea
                    rows={20}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md font-mono p-2 border"
                />
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
                {message && <span className={`text-sm font-medium ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</span>}
            </div>
        </div>
    );
};

export default AboutManager;
