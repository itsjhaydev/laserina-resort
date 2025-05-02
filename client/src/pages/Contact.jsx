import React from 'react';
import { motion } from "framer-motion";
import { PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { MapIcon } from '@heroicons/react/24/outline';
import { FaFacebookF } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="py-12 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-10">
                        <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">Contact Us</h2>
                        <p className="text-center text-gray-600 mb-6">
                            Planning a trip or reservation? Reach out — we're here to help!
                        </p>

                        <hr className="mb-6" />

                        <div className="space-y-6">
                            {/* Phone */}
                            <div className="flex items-start">
                                <motion.div
                                    initial={{ opacity: 0, x: 0 }}
                                    animate={{ opacity: 1, x: 20 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <PhoneIcon className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500">Mobile No.</p>
                                        <p className="text-base font-medium text-gray-800">0933-327-9935 / 0969-312-7973</p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start">
                                <motion.div
                                    initial={{ opacity: 0, x: 0 }}
                                    animate={{ opacity: 1, x: 20 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <MapPinIcon className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500">Address</p>
                                        <a
                                            href="https://www.waze.com/live-map/directions/ph/central-luzon/baliwag/la-serina-resort"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-700 hover:underline"
                                        >
                                            Luis Tongco St., Barangka, Baliuag, Bulacan
                                        </a>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Facebook */}
                            <div className="flex items-start">
                                <motion.div
                                    initial={{ opacity: 0, x: 0 }}
                                    animate={{ opacity: 1, x: 20 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <FaFacebookF className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500">Facebook</p>
                                        <a
                                            href="https://www.facebook.com/laserinaresort"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-700 hover:underline"
                                        >
                                            La Serina Resort
                                        </a>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        <div className="text-center mt-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <a
                                    href="https://www.waze.com/live-map/directions/ph/central-luzon/baliwag/la-serina-resort"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
                                >
                                    <MapIcon className="w-5 h-5 mr-2" />
                                    View on Google Maps
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
