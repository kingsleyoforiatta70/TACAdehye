import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import churchLogo from '../assets/church_logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleMouseEnter = (name) => {
        setActiveDropdown(name);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="flex items-center">
                                <img className="h-12 w-auto mr-2" src={churchLogo} alt="Church Logo" />
                                <span className="font-bold text-2xl text-blue-900 hidden sm:block">TAC Adehye Assembly</span>
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>

                        {/* About Us Dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => handleMouseEnter('about')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button className="text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center">
                                About Us
                                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {activeDropdown === 'about' && (
                                <div className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
                                    <Link to="/about/tenets" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tenets</Link>
                                    <Link to="/about/our-belief" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Our Belief</Link>
                                    <Link to="/about/rules" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Rules of Conduct</Link>
                                    <Link to="/about/history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Brief History</Link>
                                </div>
                            )}
                        </div>

                        {/* Media Dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => handleMouseEnter('media')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button className="text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center">
                                Media
                                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {activeDropdown === 'media' && (
                                <div className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
                                    <Link to="/media/audio" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Audio Sermon</Link>
                                    <Link to="/media/videos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Videos</Link>
                                    <Link to="/media/pictures" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Pictures</Link>
                                </div>
                            )}
                        </div>

                        <Link to="/live-stream" className="text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Live Stream</Link>
                        <Link to="/calendar" className="text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Calendar</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</Link>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-blue-900" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
                        <Link to="/" className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Home</Link>

                        <div className="px-3 py-2 text-blue-200 font-bold">About Us</div>
                        <Link to="/about/tenets" className="text-gray-100 hover:text-white block px-6 py-1 rounded-md text-sm">Tenets</Link>
                        <Link to="/about/our-belief" className="text-gray-100 hover:text-white block px-6 py-1 rounded-md text-sm">Our Belief</Link>
                        <Link to="/about/rules" className="text-gray-100 hover:text-white block px-6 py-1 rounded-md text-sm">Rules of Conduct</Link>
                        <Link to="/about/history" className="text-gray-100 hover:text-white block px-6 py-1 rounded-md text-sm">Brief History</Link>

                        <div className="px-3 py-2 text-blue-200 font-bold">Media</div>
                        <Link to="/media/audio" className="text-gray-100 hover:text-white block px-6 py-1 rounded-md text-sm">Audio Sermon</Link>
                        <Link to="/media/videos" className="text-gray-100 hover:text-white block px-6 py-1 rounded-md text-sm">Videos</Link>
                        <Link to="/media/pictures" className="text-gray-100 hover:text-white block px-6 py-1 rounded-md text-sm">Pictures</Link>

                        <Link to="/live-stream" className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Live Stream</Link>
                        <Link to="/calendar" className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Calendar</Link>
                        <Link to="/contact" className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
