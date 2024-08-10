import React, { useState } from 'react';
import axios from 'axios';

const CreateRow = ({ columns, onCreate }) => {
    const [newRow, setNewRow] = useState({});

    const handleInputChange = (e, key) => {
        setNewRow(prev => ({ ...prev, [key]: e.target.value }));
    };

    const handleCreate = async () => {
        // Optional: Validate input if necessary
        const isValid = Object.values(newRow).every(value => value !== '' && value != null);
        if (!isValid) {
            alert('Please fill out all fields.');
            return;
        }

        try {
            await axios.post('http://localhost:5000/tabular_data/insert', newRow);
            setNewRow({});
            onCreate();
        } catch (err) {
            alert('Error creating row: ' + err.message);
        }
    };

    return (
        <tr className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
            {columns.map((col) => (
                <td key={col} className="py-2 px-4">
                    <input
                        type="text"
                        value={newRow[col] || ''}
                        onChange={(e) => handleInputChange(e, col)}
                        className="w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all duration-200"
                    />
                </td>
            ))}
            <td className="py-2 px-4 text-center">
                <button
                    onClick={handleCreate}
                    className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200"
                >
                    +
                </button>
            </td>
        </tr>
    );
};

export default CreateRow;
