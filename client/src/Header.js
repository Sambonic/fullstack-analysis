import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-sky-950 bg-opacity-50 backdrop-blur-lg text-white border-b-2 border-transparent h-16 fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex justify-center items-center h-full px-6">
                <nav>
                    <ul className="flex space-x-12">
                        <li>
                            <Link 
                                to="/" 
                                className="relative text-lg font-light hover:text-yellow-300 transition-colors duration-300 group"
                            >
                                Home
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/tabular" 
                                className="relative text-lg font-light hover:text-yellow-300 transition-colors duration-300 group"
                            >
                                Tabular Data
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/image" 
                                className="relative text-lg font-light hover:text-yellow-300 transition-colors duration-300 group"
                            >
                                RGB Images
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/textual" 
                                className="relative text-lg font-light hover:text-yellow-300 transition-colors duration-300 group"
                            >
                                Textual Data
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
