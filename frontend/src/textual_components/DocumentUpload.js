import React, { useState } from 'react';
import axios from 'axios';

function DocumentUpload({ onUpload }) {
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        // Clear text when file is selected
        setText('');
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
        // Clear file when text is entered
        setFile(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file && !text) {
            alert('Please select a file or enter text.');
            return;
        }

        if (file && text) {
            alert('Please choose either a file or text, not both.');
            return;
        }

        let summary = '';

        if (file) {
            const formData = new FormData();
            formData.append('document', file); // Append file to formData

            try {
                const result = await axios.post('http://localhost:5000/textual_data/upload_document', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                summary = result.data.summary || 'Upload successful';
                setFile(null); // Clear file input
            } catch (error) {
                console.error('Error uploading file:', error.response || error);
                summary = 'Upload failed';
            }
        }

        if (text) {
            try {
                const result = await axios.post('http://localhost:5000/textual_data/upload_text', { text }, {
                    headers: { 'Content-Type': 'application/json' },
                });
                summary = result.data.summary || 'Summarization successful';
                setText(''); // Clear text area
            } catch (error) {
                console.error('Error summarizing text:', error.response || error);
                summary = 'Summarization failed';
            }
        }

        // Optionally, you can use the summary for other purposes
        onUpload(summary);
    };

    return (
        <div className="bg-gray-900 text-white p-16 h-screen flex flex-col items-center justify-center">
            <div className="mb-8 text-center">
                <h1 className="text-5xl font-bold mb-4">Text Summarization</h1>
                <p className="text-xl text-gray-400 font-light">Upload a document or enter text to be summarized</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6 w-full max-w-lg">
                <div className="relative w-full">
                    <input
                        id="file-upload"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <label
                        htmlFor="file-upload"
                        className="block bg-blue-600 text-white py-3 px-8 rounded-md text-center cursor-pointer text-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        {file ? `${file.name}` : 'Choose Document'}
                    </label>
                </div>

                <textarea
                    rows="6"
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Or paste your text here..."
                    className="w-full p-3 mt-4 bg-gray-800 text-white rounded-md"
                ></textarea>

                <button
                    type="submit"
                    className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 px-8 rounded-md text-lg hover:from-pink-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 font-light"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default DocumentUpload;
