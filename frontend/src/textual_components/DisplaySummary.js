import React from 'react';

function DisplaySummary({ summary }) {
    return (
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white p-8 md:p-16 h-screen flex flex-col items-center justify-center">
            <h2 className="text-4xl h-16 md:text-5xl font-extrabold mb-6 text-center leading-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
                Summary
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 text-center font-light">
                View and manipulate your summarized text below.
            </p>
            <div className="bg-gray-800 p-6 md:p-12 rounded-lg shadow-lg w-[80%] max-w-7xl">
                {summary ? (
                    <p className="text-xl md:text-2xl leading-relaxed">{summary}</p>
                ) : (
                    <p className="text-base md:text-lg italic text-gray-400">No text available yet. Please upload or enter text to summarize.</p>
                )}
            </div>
        </div>
    );
}

export default DisplaySummary;
