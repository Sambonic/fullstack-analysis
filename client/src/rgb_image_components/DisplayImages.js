import React, { useState, useEffect } from 'react';
import ImageItem from './ImageItem';

function DisplayImages({ files }) {
    const [transformations, setTransformations] = useState([]);

    useEffect(() => {
        // Initialize transformations with default values for each file
        setTransformations(Array(files.length).fill({ flipX: false, flipY: false }));
    }, [files.length]);

    const handleFlipHorizontal = (index) => {
        setTransformations(prev => {
            const newTransformations = [...prev];
            newTransformations[index] = {
                ...newTransformations[index],
                flipX: !newTransformations[index].flipX
            };
            return newTransformations;
        });
    };

    const handleFlipVertical = (index) => {
        setTransformations(prev => {
            const newTransformations = [...prev];
            newTransformations[index] = {
                ...newTransformations[index],
                flipY: !newTransformations[index].flipY
            };
            return newTransformations;
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100 flex flex-col items-center justify-center p-8">
            <h2 className="text-5xl font-extrabold mb-4 text-center leading-tight">
                Uploaded Images
            </h2>
            <p className="text-xl text-gray-300 mb-8 text-center font-light">
                View and manipulate your uploaded images below.
            </p>
            <div className="flex flex-col gap-8 w-full">
                {files.length > 0 ? (
                    Array.from(files).map((fileData, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <ImageItem
                                file={fileData}
                                index={index}
                                transformation={transformations[index] || { flipX: false, flipY: false }}
                                onFlipHorizontal={() => handleFlipHorizontal(index)}
                                onFlipVertical={() => handleFlipVertical(index)}
                            />
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-2">Histogram</h3>
                                {fileData.histogram ? (
                                    <img
                                        src={`data:image/png;base64,${fileData.histogram}`}
                                        alt={`Histogram ${index}`}
                                        className="w-64 h-auto"
                                    />
                                ) : (
                                    <p className="text-gray-400">No histogram available</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-lg font-medium text-gray-400 text-center">
                        No images uploaded
                    </p>
                )}
            </div>
        </div>
    );
}

export default DisplayImages;
