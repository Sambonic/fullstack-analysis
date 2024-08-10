import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100 flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-center tracking-tight leading-tight">
                Data Analysis Web App
            </h1>
            <p className="text-lg md:text-2xl mb-12 text-center font-light max-w-2xl">
                Explore our powerful tools and services designed to simplify your work. Each service provides intuitive features to enhance your productivity.
            </p>
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
                
                <Link to="/tabular" className="flex-1 bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-105 rounded-lg shadow-lg overflow-hidden relative group flex flex-col">
                    <div className="p-6 flex flex-col flex-grow">
                        <h2 className="text-2xl font-bold mb-4 text-center">Tabular Data Analysis</h2>
                        <p className="mb-6 text-center flex-grow">Analyze and visualize your tabular data effortlessly</p>
                        <div className="flex justify-center">
                            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-100 transition-transform transform hover:scale-105">
                                Explore
                            </button>
                        </div>
                    </div>
                </Link>

                <Link to="/image" className="flex-1 bg-green-600 hover:bg-green-700 transition-transform transform hover:scale-105 rounded-lg shadow-lg overflow-hidden relative group flex flex-col">
                    <div className="p-6 flex flex-col flex-grow">
                        <h2 className="text-2xl font-bold mb-4 text-center">RGB Image Editor & Analyzer</h2>
                        <p className="mb-6 text-center flex-grow">Edit and analyze RGB images with advanced tools and filters</p>
                        <div className="flex justify-center">
                            <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-green-100 transition-transform transform hover:scale-105">
                                Start Editing
                            </button>
                        </div>
                    </div>
                </Link>

                <Link to="/textual" className="flex-1 bg-purple-600 hover:bg-purple-700 transition-transform transform hover:scale-105 rounded-lg shadow-lg overflow-hidden relative group flex flex-col">
                    <div className="p-6 flex flex-col flex-grow">
                        <h2 className="text-2xl font-bold mb-4 text-center">Text Summarization Tool</h2>
                        <p className="mb-6 text-center flex-grow">Summarize large texts with powerful summarization tool</p>
                        <div className="flex justify-center">
                            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-purple-100 transition-transform transform hover:scale-105">
                                Summarize Now
                            </button>
                        </div>
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default Home;
