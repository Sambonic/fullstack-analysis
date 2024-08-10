import React from 'react';

const ColumnDropdown = ({ columns, selectedColumn, onColumnChange }) => {
    const handleChange = (event) => {
        const columnName = event.target.value;
        onColumnChange(columnName);
    };

    return (
        <div className="flex items-center space-x-4 p-4">
            <h2 className="font-semibold">Stats:</h2>
            <select 
                value={selectedColumn || ''} 
                onChange={handleChange} 
                className="p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            >
                {columns.map((column, index) => (
                    <option key={index} value={column}>
                        {column}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ColumnDropdown;
