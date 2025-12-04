import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Church Info */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-bold mb-4">TAC - Adehye Local Assembly</h3>
                        <p className="text-gray-400">
                            A place of worship, fellowship and growth. Join us to experience the love of God.
                        </p>
                    </div>

                    {/* Quick Links - General */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/live-stream" className="text-gray-400 hover:text-white transition-colors">Live Stream</Link></li>
                            <li><Link to="/calendar" className="text-gray-400 hover:text-white transition-colors">Calendar</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                            <li><Link to="/prayer-request" className="text-gray-400 hover:text-white transition-colors">Prayer Request</Link></li>
                            <li><Link to="/testimony" className="text-gray-400 hover:text-white transition-colors">Testimony</Link></li>
                        </ul>
                    </div>

                    {/* Quick Links - About & Media */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Discover</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about/tenets" className="text-gray-400 hover:text-white transition-colors">Tenets</Link></li>
                            <li><Link to="/about/our-belief" className="text-gray-400 hover:text-white transition-colors">Our Belief</Link></li>
                            <li><Link to="/about/rules" className="text-gray-400 hover:text-white transition-colors">Rules of Conduct</Link></li>
                            <li><Link to="/about/history" className="text-gray-400 hover:text-white transition-colors">Brief History</Link></li>
                            <li><Link to="/media/audio" className="text-gray-400 hover:text-white transition-colors">Audio Sermon</Link></li>
                            <li><Link to="/media/videos" className="text-gray-400 hover:text-white transition-colors">Videos</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p className="text-gray-400 mb-2">Ahmadiyya St, P.O.BOX 121 Agona Swedru</p>
                        <p className="text-gray-400 mb-2">Phone: 050 942 4178</p>
                        <p className="text-gray-400 mb-4">Email: adehyetac@gmail.com</p>
                        <div className="flex space-x-4">
                            {/* Facebook Placeholder */}
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            {/* Instagram Placeholder */}
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <span className="sr-only">Instagram</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.488 2h.17zM16.5 8.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-4.25 7.5a3.25 3.25 0 110-6.5 3.25 3.25 0 010 6.5z" clipRule="evenodd" />
                                </svg>
                            </a>
                            {/* YouTube Placeholder */}
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <span className="sr-only">YouTube</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 01-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 01-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 011.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418zM15.194 12 10 15V9l5.194 3z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 text-center">
                    <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} TAC - Adehye Local Assembly. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
