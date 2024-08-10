import React, { useState } from 'react';
import axios from 'axios';

function FileUpload({ onUpload }) {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const result = await axios.post('http://localhost:5000/tabular_data/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResponse(result.data.message || 'Upload successful');
            onUpload(); // Trigger update in parent table
        } catch (error) {
            console.error('Error uploading file:', error);
            setResponse('Upload failed');
        }
    };

    return (
        <div className="bg-gray-900 text-white p-16 h-screen flex flex-col items-center justify-center">
            <div className="mb-8 text-center">
                <h1 className="text-5xl font-bold mb-4">Tabular Data Analysis</h1>
                <p className="text-xl text-gray-400 font-light">Upload your CSV file to analyze and visualize your data</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6 w-full max-w-lg">
                
                <div className="relative w-full">
                    <input
                        id="file-upload"
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <label
                        htmlFor="file-upload"
                        className="block bg-blue-600 text-white py-3 px-8 rounded-md text-center cursor-pointer text-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                         {file ? file.name : 'Choose File'}
                    </label>
                </div>

                <button
                    type="submit"
                    className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 px-8 rounded-md text-lg hover:from-pink-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 font-light"
                >
                    Upload
                </button>
                {response && <p className="mt-6 text-center text-lg">{response}</p>}
            </form>
        </div>
    );
}

export default FileUpload;
