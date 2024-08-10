import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TextualData from './textual_components/TextualData';
import TabularData from './tabular_components/TabularData';
import RGBImages from './rgb_image_components/RGBImages';
import Header from './Header';
import Home from './Home'

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/tabular" element={<TabularData />} />
                <Route path="/image" element={<RGBImages />} />
                <Route path="/textual" element={<TextualData />} />
            </Routes>
        </Router>
    );
}

export default App;
