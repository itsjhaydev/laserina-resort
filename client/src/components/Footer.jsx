import React from 'react';
import { Link } from 'react-router-dom';
import { LocationOn, Phone, Email } from '@mui/icons-material';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-6">
            {/* About Us */}
            <div className="mb-5 text-center">
                <h6 className="text-xl font-semibold mb-2">About Us</h6>
                <p className="text-sm">
                    La Sarina Resort is nestled in the heart of Barangka.
                    Thank you for considering La Sarina Resort for your next getaway.
                </p>
            </div>

            <div className="max-w-screen-xl mx-auto px-8">
                <div className="flex flex-col md:flex-row md:justify-between gap-8 text-center md:text-left">
                    {/* Quick Links */}
                    <div>
                        <h6 className="text-xl font-semibold mb-2">Quick Links</h6>
                        <ul className="space-y-2">
                            {['Home', 'Cottages', 'Reservation', 'About', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link to={`/${item.toLowerCase()}`} className="text-white hover:text-gray-400">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cottages */}
                    <div>
                        <h6 className="text-xl font-semibold mb-2">Cottages</h6>
                        <ul className="space-y-2">
                            {['Large Kubo', 'Pond Side Kubo', 'Kubo', 'Rocky', 'Umbrella'].map((item) => (
                                <li key={item}>
                                    <Link to="/cottages" className="text-white hover:text-gray-400">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="w-full md:w-1/3 text-center md:text-left">
                        <h6 className="text-xl font-semibold mb-2">Contact Info</h6>
                        <ul className="space-y-2">
                            <li className="flex items-center justify-center md:justify-start space-x-2">
                                <LocationOn className="text-white" />
                                <span>Luis Tongco, Baliuag Bulacan</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start space-x-2">
                                <Phone className="text-white" />
                                <span>+63 9535123456</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start space-x-2">
                                <Email className="text-white" />
                                <span>noreply@laserinaresort.com</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-5 text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Laserina Resort. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
