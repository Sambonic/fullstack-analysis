import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

function NavigationButtons() {
    const navigate = useNavigate();
    
    return (
        <div>
            <button onClick={() => navigate('/')}>Home Button</button>
            <button onClick={() => navigate('/tabular')}>Tabular Button</button>
            <button onClick={() => navigate('/image')}>Image Button</button>
            <button onClick={() => navigate('/textual')}>Textual Button</button>
        </div>
    );
}

export default NavigationButtons;
