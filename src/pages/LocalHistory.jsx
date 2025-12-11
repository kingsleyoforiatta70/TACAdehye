import React from 'react';
import PageLayout from '../components/PageLayout';
import { useContent } from '../context/ContentContext';

const LocalHistory = () => {
    const { pages } = useContent();
    const dbPage = pages ? pages['local_history'] : null;

    if (dbPage && dbPage.content) {
        return (
            <PageLayout title={dbPage.title || "Local Assembly History"}>
                <div
                    className="prose prose-lg text-gray-700 mx-auto space-y-6"
                    dangerouslySetInnerHTML={{ __html: dbPage.content }}
                />
            </PageLayout>
        );
    }

    return (
        <PageLayout title="Local Assembly History">
            <div className="max-w-4xl mx-auto px-4 py-8 text-center min-h-[40vh] flex flex-col items-center justify-center">
                <div className="bg-blue-50 rounded-full p-6 mb-6">
                    <svg className="h-12 w-12 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
                <p className="text-lg text-gray-600 max-w-2xl">
                    We are currently compiling the rich history of the Adehye Assembly.
                    Please check back later to read about our journey and growth.
                </p>
            </div>
        </PageLayout>
    );
};

export default LocalHistory;
