import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RangeSelector({ total, onDataFetched }) {
    const [pageSize, setPageSize] = useState(10);
    const [start, setStart] = useState(0);

    const end = start + pageSize;

    const handleFetch = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tabular_data/display', {
                params: { start, end }
            });
            onDataFetched(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    const handleNext = () => {
        if (end < total) {
            setStart(prevStart => prevStart + pageSize);
        }
    };

    const handlePrev = () => {
        if (start > 0) {
            setStart(prevStart => prevStart - pageSize);
        }
    };

    useEffect(() => {
        handleFetch();
    }, [start, end, pageSize]);

    return (
        <div className="flex items-center space-x-4 p-4">
            <label className="flex items-center space-x-2">
                <span className="font-semibold">Items per page:</span>
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setStart(0); // Reset start to 0 when pageSize changes
                    }}
                    className="p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </label>

            <span className="text-gray-700">
                {Math.max(start, 0)} - {Math.min(end, total)} of {total}
            </span>

            <div className="flex space-x-2">
                <button 
                    onClick={handlePrev} 
                    disabled={start === 0}
                    className={`p-2 border border-gray-300 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    &lt;
                </button>
                <button 
                    onClick={handleNext} 
                    disabled={end >= total}
                    className={`p-2 border border-gray-300 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default RangeSelector;
