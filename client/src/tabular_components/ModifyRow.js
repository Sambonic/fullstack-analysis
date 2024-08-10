import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ModifyRow = ({ row, columns, onModify }) => {
    const [localRow, setLocalRow] = useState(row);
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        setLocalRow(row);
    }, [row]);

    useEffect(() => {
        // Function to handle click outside menu
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e, key) => {
        const updatedRow = { ...localRow, [key]: e.target.value };
        setLocalRow(updatedRow);
    };

    const handleUpdate = async () => {
        try {
            await axios.put('http://localhost:5000/tabular_data/update', localRow); // Update endpoint URL
            onModify(); // Refresh data after updating
            setShowMenu(false); // Close the menu after updating
        } catch (err) {
            alert('Error updating row: ' + err.message);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/tabular_data/delete/${localRow['uuid']}`); // Delete endpoint URL
            onModify(); // Refresh data after deleting
            setShowMenu(false); // Close the menu after deleting
        } catch (err) {
            alert('Error deleting row: ' + err.message);
        }
    };

    return (
        <tr id={localRow['uuid']} key={localRow['uuid']} className="hover:bg-gray-100">
            {columns.map((key, index) => (
                <td key={index} className="py-2 px-4 text-center">
                    <input
                        type="text"
                        value={localRow[key]}
                        onChange={(e) => handleInputChange(e, key)}
                        className="w-full p-1 text-center" // Center text inside input
                    />
                </td>
            ))}
            <td className="py-2 px-4 flex justify-center items-center relative">
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    ⋮
                </button>
                {showMenu && (
                    <div 
                        ref={menuRef} // Attach ref to the menu div
                        className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-10"
                    >
                        <button
                            onClick={handleUpdate}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Update
                        </button>
                        <button
                            onClick={handleDelete}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default ModifyRow;
