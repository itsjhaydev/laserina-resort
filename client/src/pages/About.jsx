import React from 'react';
import { motion } from "framer-motion";
import Logo from '../assets/logo.png';


const About = () => {
    return (
        <section className="py-12 px-4 pt-20">
            <div className="max-w-7xl mx-auto">
                {/* About Section */}
                <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
                    {/* Text Content */}
                    <div className="md:w-2/3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-3xl font-bold mb-4 relative inline-block pb-2">
                                ABOUT <span className="text-blue-600 italic">Laserina Resort</span>
                                <span className="absolute bottom-0 left-0 w-26 h-1 bg-blue-700 block mt-1"></span>
                            </h2>
                            <p className="text-gray-600">
                                Welcome to La Sarina Resort. Nestled in the heart of Barangka, La Sarina Resort offers a serene getaway
                                for those seeking relaxation, adventure, and unforgettable experiences. With over 20 acres of lush
                                landscapes, crystal-clear pools, and luxurious amenities, we are proud to be one of Barangka, Baliuag,
                                Bulacan's premier resort destinations. Thank you for considering La Sarina Resort for your next getaway.
                                We look forward to welcoming you and creating memories that will last a lifetime.
                            </p>
                        </motion.div>
                    </div>

                    {/* Logo Image */}
                    <div className="md:w-1/3 flex justify-center pt-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="p-4 bg-white shadow-lg rounded-lg max-w-xs w-full border-[1px] border-gray-200">
                                <img
                                    src={Logo}
                                    alt="Laserina Resort Logo"
                                    className="w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>


                {/* Mission Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-3xl font-bold text-blue-700 mb-4">Mission</h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            At La Serina Resort, we are committed to creating unforgettable experiences that blend the natural beauty
                            of Bulacan with genuine Filipino hospitality. Our mission is to provide guests with a perfect balance of
                            relaxation and adventure through our eco-friendly facilities, personalized service, and authentic local
                            experiences. We take pride in showcasing the rich culture of our region while maintaining sustainable
                            practices that protect our environment and support our community. Every detail, from our accommodations
                            to our activities, is designed to make your stay memorable, comfortable, and truly special.
                        </p>
                    </motion.div>
                </div>

                {/* Vision Section */}
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className='mt-4'
                    >
                        <h2 className="text-3xl font-bold text-blue-700 mb-4">Vision</h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            La Serina Resort envisions becoming the premier sustainable getaway in Central Luzon, recognized for our
                            innovative approach to eco-tourism and cultural preservation. We aspire to set new standards in the
                            hospitality industry by continuously improving our green initiatives, expanding our community partnerships,
                            and offering unique experiences that connect guests with the heart and soul of Bulacan. Our goal is to be
                            more than just a destination – we want to be a transformative experience that leaves a positive impact on
                            our guests, our local community, and the environment for generations to come.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
