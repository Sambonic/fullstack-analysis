import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Images() {
    const [imageUrls, setImageUrls] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await axios.get('http://localhost:5000/rgb_images/images');
                setImageUrls(result.data.image_urls);
            } catch (error) {
                console.error('Error fetching images:', error);
                setError('Failed to load images');
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="bg-gray-900 text-white p-16 h-screen flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold mb-4">Image Gallery</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-3 gap-4">
                {imageUrls.length > 0 ? (
                    imageUrls.map((url, index) => (
                        <div key={index} className="w-64 h-64 bg-gray-800 rounded-md overflow-hidden">
                            <img
                                src={url}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No images available</p>
                )}
            </div>
        </div>
    );
}

export default Images;
