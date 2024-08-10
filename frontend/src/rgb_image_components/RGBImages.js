import React, { useEffect, useState } from 'react';
import ImageUpload from './ImageUpload';
import DisplayImages from './DisplayImages';

function RGBImages() {
    const [files, setFiles] = useState([]);

    const handleUpload = (uploadedFiles) => {
        setFiles(uploadedFiles);
    };

    useEffect(() => {
        console.log("FILES STORE UPDATED:");
        console.log(files);
    }, [files]);

    return (
        <div>
            <ImageUpload onUpload={handleUpload} />
            <DisplayImages files={files} />
        </div>
    );
}

export default RGBImages;
