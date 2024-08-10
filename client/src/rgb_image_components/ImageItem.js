import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageItem({ file, index, transformation, onFlipHorizontal, onFlipVertical }) {
    const [width, setWidth] = useState(100); // Initial width percentage
    const [height, setHeight] = useState(100); // Initial height percentage
    const [cropX, setCropX] = useState(25); // Initial crop X position percentage
    const [cropY, setCropY] = useState(25); // Initial crop Y position percentage
    const [cropWidth, setCropWidth] = useState(50); // Initial crop width percentage
    const [cropHeight, setCropHeight] = useState(50); // Initial crop height percentage
    const [isCropping, setIsCropping] = useState(false); // Toggle cropping
    const [croppedImageUrl, setCroppedImageUrl] = useState(null); // URL for the cropped image
    const imageUrl = URL.createObjectURL(file);
    const imageTransform = `
        scaleX(${transformation.flipX ? -1 : 1})
        scaleY(${transformation.flipY ? -1 : 1})
    `;

    useEffect(() => {
        setWidth(100);
        setHeight(100);
        setCropX(25);
        setCropY(25);
        setCropWidth(50);
        setCropHeight(50);
    }, [file]);

    const handleCrop = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('cropX', cropX);
        formData.append('cropY', cropY);
        formData.append('cropWidth', cropWidth);
        formData.append('cropHeight', cropHeight);

        try {
            const response = await axios.post('/api/crop', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'blob' // Expecting a binary response for image file
            });

            // Create a URL for the cropped image
            const url = URL.createObjectURL(response.data);
            setCroppedImageUrl(url);
        } catch (error) {
            console.error('Error cropping image:', error);
        }
    };

    return (
        <div className="flex bg-[#383a3e] rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 w-[85%] mx-auto mt-8 mb-8 h-[90vh]">
            {/* Image container */}
            <div className="flex-1 p-4 flex items-center justify-center overflow-hidden relative">
                <img
                    src={imageUrl}
                    alt={`Uploaded ${index}`}
                    className="object-contain rounded-lg transition-transform duration-300"
                    style={{
                        transform: imageTransform,
                        width: `${width}%`,
                        height: `${height}%`,
                    }}
                />
                {isCropping && (
                    <div
                        className="absolute border-2 border-yellow-500"
                        style={{
                            top: `${cropY}%`,
                            left: `${cropX}%`,
                            width: `${cropWidth}%`,
                            height: `${cropHeight}%`,
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </div>
            {/* Tools container */}
            <div className="flex flex-col p-6 bg-[#2c2c2c] border-l border-gray-700 w-1/3 space-y-6 overflow-y-auto h-full max-h-[calc(90vh-2rem)]"> {/* Adjust max height and overflow */}
                <h3 className="text-lg font-semibold text-center text-gray-200">Image Actions</h3>
                <div className="space-y-4">
                    {/* Width Slider */}
                    <div>
                        <label className="block text-gray-300 mb-2">Width</label>
                        <input
                            type="range"
                            min="10"
                            max="100"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            style={{ background: `linear-gradient(to right, #4a4a4a ${width}%, #383a3e ${width}%)` }}
                        />
                        <span className="text-gray-300">{width}%</span>
                    </div>
                    {/* Height Slider */}
                    <div>
                        <label className="block text-gray-300 mb-2">Height</label>
                        <input
                            type="range"
                            min="10"
                            max="100"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            style={{ background: `linear-gradient(to right, #4a4a4a ${height}%, #383a3e ${height}%)` }}
                        />
                        <span className="text-gray-300">{height}%</span>
                    </div>
                    {/* Crop Parameters */}
                    {isCropping && (
                        <>
                            <div>
                                <label className="block text-gray-300 mb-2">Crop X</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={cropX}
                                    onChange={(e) => setCropX(e.target.value)}
                                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                    style={{ background: `linear-gradient(to right, #4a4a4a ${cropX}%, #383a3e ${cropX}%)` }}
                                />
                                <span className="text-gray-300">{cropX}%</span>
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Crop Y</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={cropY}
                                    onChange={(e) => setCropY(e.target.value)}
                                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                    style={{ background: `linear-gradient(to right, #4a4a4a ${cropY}%, #383a3e ${cropY}%)` }}
                                />
                                <span className="text-gray-300">{cropY}%</span>
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Crop Width</label>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    value={cropWidth}
                                    onChange={(e) => setCropWidth(e.target.value)}
                                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                    style={{ background: `linear-gradient(to right, #4a4a4a ${cropWidth}%, #383a3e ${cropWidth}%)` }}
                                />
                                <span className="text-gray-300">{cropWidth}%</span>
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Crop Height</label>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    value={cropHeight}
                                    onChange={(e) => setCropHeight(e.target.value)}
                                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                    style={{ background: `linear-gradient(to right, #4a4a4a ${cropHeight}%, #383a3e ${cropHeight}%)` }}
                                />
                                <span className="text-gray-300">{cropHeight}%</span>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={onFlipHorizontal}
                        className="py-2 px-4 bg-[#4a4a4a] text-gray-200 rounded-lg hover:bg-[#616161] transition-colors duration-300"
                    >
                        Flip Horizontal
                    </button>
                    <button
                        onClick={onFlipVertical}
                        className="py-2 px-4 bg-[#4a4a4a] text-gray-200 rounded-lg hover:bg-[#616161] transition-colors duration-300"
                    >
                        Flip Vertical
                    </button>
                    <button
                        onClick={() => setIsCropping(!isCropping)}
                        className="py-2 px-4 bg-[#4a4a4a] text-gray-200 rounded-lg hover:bg-[#616161] transition-colors duration-300"
                    >
                        {isCropping ? 'Done Cropping' : 'Start Cropping'}
                    </button>
                    {isCropping && (
                        <button
                            onClick={handleCrop}
                            className="py-2 px-4 bg-blue-500 text-gray-200 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                        >
                            Crop
                        </button>
                    )}
                    {croppedImageUrl && (
                        <div className="mt-4">
                            <h4 className="text-gray-300">Cropped Image:</h4>
                            <img src={croppedImageUrl} alt="Cropped" className="object-contain max-w-full max-h-64 rounded-lg" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ImageItem;
