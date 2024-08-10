import React, { useState } from 'react';
import DocumentUpload from './DocumentUpload';
import DisplaySummary from './DisplaySummary';

function TextData() {
    const [summary, setSummary] = useState('');

    const handleDisplaySummary = (newSummary) => {
        setSummary(newSummary);
    };

    return (
        <div>
            <DocumentUpload onUpload={handleDisplaySummary} />
            <DisplaySummary summary={summary} />
        </div>
    );
}

export default TextData;
