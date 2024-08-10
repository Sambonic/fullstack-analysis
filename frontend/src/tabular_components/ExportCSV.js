import React from 'react';
import axios from 'axios';

const ExportCSV = () => {
    const handleExport = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tabular_data/export', {
                responseType: 'blob',
            });
            console.log(response)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data.csv');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Failed to export CSV:', error);
        }
    };

    return (
        <button
            onClick={handleExport}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
            Export
        </button>
    );
};

export default ExportCSV;
