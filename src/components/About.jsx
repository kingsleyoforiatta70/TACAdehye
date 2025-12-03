import React from 'react';
import { Link } from 'react-router-dom';
import aboutImage from '../assets/about_us_image.jpg';

const About = () => {
    return (
        <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center mb-12">
                    <h2 className="text-base text-blue-900 font-semibold tracking-wide uppercase">About Us</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Who We Are
                    </p>
                </div>

                <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
                    <div className="relative">
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={aboutImage}
                                alt="Church History"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="mt-10 lg:mt-0">
                        <div className="prose prose-blue text-gray-500 mx-auto lg:max-w-none">
                            <p className="text-lg">
                                In 1904-5, Wales experienced an outbreak of a revival which had tremendous effects on many parts of the British Isles. This was followed by a MIGHTY VISITATION OF THE HOLY SPIRIT, which fell simultaneously on many parts of the world, during which many received the baptism of the Holy Spirit with signs following.
                            </p>
                            <div className="mt-6">
                                <Link
                                    to="/about/history"
                                    className="text-base font-medium text-blue-600 hover:text-blue-500"
                                >
                                    Read more &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
