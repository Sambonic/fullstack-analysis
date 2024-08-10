import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ColumnStatistics = ({ selectedColumn }) => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        if (selectedColumn) {
            const fetchStats = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/tabular_data/stats/${selectedColumn}`);
                    setStats(response.data);
                } catch (err) {
                    console.error('Error fetching statistics:', err);
                }
            };

            fetchStats();
        }
    }, [selectedColumn]);

    if (!selectedColumn) {
        return (
            <div className="p-4 sm:p-8 bg-gray-800 text-gray-200 rounded-lg shadow-lg">
                <p className="text-base sm:text-lg font-semibold">Please select a column to view statistics.</p>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8 bg-gray-900 text-white shadow-xl h-screen flex flex-col items-center justify-center">
            <div className="text-center my-16 sm:my-20">
                <p className="text-3xl sm:text-5xl font-extrabold text-white-100 mb-2 sm:mb-4">
                    Statistics for {selectedColumn}
                </p>
                <p className="text-lg sm:text-2xl text-gray-400 font-light">
                    Detailed statistical analysis for the selected column. Explore the key metrics below to understand the data better.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl">
                <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300">
                    <h4 className="text-base sm:text-lg font-semibold mb-2 text-white">Mean</h4>
                    <p className="text-xl sm:text-2xl font-bold text-white">{stats.mean || 'N/A'}</p>
                </div>
                <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300">
                    <h4 className="text-base sm:text-lg font-semibold mb-2 text-white">Median</h4>
                    <p className="text-xl sm:text-2xl font-bold text-white">{stats.median || 'N/A'}</p>
                </div>
                <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300">
                    <h4 className="text-base sm:text-lg font-semibold mb-2 text-white">Mode</h4>
                    <p className="text-xl sm:text-2xl font-bold text-white">{stats.mode || 'N/A'}</p>
                </div>
                <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300">
                    <h4 className="text-base sm:text-lg font-semibold mb-2 text-white">1st Quartile</h4>
                    <p className="text-xl sm:text-2xl font-bold text-white">{stats.q1 || 'N/A'}</p>
                </div>
                <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300">
                    <h4 className="text-base sm:text-lg font-semibold mb-2 text-white">3rd Quartile</h4>
                    <p className="text-xl sm:text-2xl font-bold text-white">{stats.q3 || 'N/A'}</p>
                </div>
                <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300">
                    <h4 className="text-base sm:text-lg font-semibold mb-2 text-white">Outliers</h4>
                    <p className="text-xl sm:text-2xl font-bold text-white">{stats.outliers || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default ColumnStatistics;
