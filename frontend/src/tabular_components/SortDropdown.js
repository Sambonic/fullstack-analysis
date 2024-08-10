import React, { useState, useEffect } from 'react';

const SortDropdown = ({ data, setData }) => {
    const [selectedColumn, setSelectedColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('ascending');

    const columnNames = Object.keys(data.rows[0] || {}).filter(key => key !== 'uuid');

    const handleSort = (columnName) => {
        const sortedRows = [...data.rows].sort((a, b) => {
            if (a[columnName] === undefined || b[columnName] === undefined) return 0;
            if (typeof a[columnName] === 'string') {
                return sortOrder === 'ascending'
                    ? a[columnName].localeCompare(b[columnName])
                    : b[columnName].localeCompare(a[columnName]);
            } else {
                return sortOrder === 'ascending'
                    ? a[columnName] - b[columnName]
                    : b[columnName] - a[columnName];
            }
        });

        setData({
            ...data,
            rows: sortedRows
        });
    };

    useEffect(() => {
        if (selectedColumn) {
            handleSort(selectedColumn);
        }
    }, [selectedColumn, sortOrder]);

    return (
        <div className="flex items-center space-x-4 p-4">
            <label className="flex items-center space-x-2">
                <span className="font-semibold">Sort by:</span>
                <select
                    value={selectedColumn}
                    onChange={(e) => setSelectedColumn(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                >
                    <option value="">Select column</option>
                    {columnNames.map((col, index) => (
                        <option key={index} value={col}>{col}</option>
                    ))}
                </select>
            </label>
            <label className="flex items-center space-x-2">
                <span className="font-semibold">Order:</span>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                >
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </label>
        </div>
    );
};

export default SortDropdown;
