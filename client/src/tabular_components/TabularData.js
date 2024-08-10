import React, { useState } from 'react';
import FileUpload from './FileUpload';
import DisplayTable from './DisplayTable';

function TabularData() {
    
    const [key, setKey] = useState(0);

    // Roundabout way to trigger a refreshment of the components (time is short, had to cut corners ¯\_(ツ)_/¯)
    const handleDisplayTable = () => {
        setKey(key + 1); 
    };


  return (
    <div>
        <FileUpload onUpload={handleDisplayTable} />
        <DisplayTable key={key}/>
    </div>
);
}

export default TabularData;
