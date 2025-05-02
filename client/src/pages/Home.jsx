import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ResortLogo from "../assets/s-logo.png";
import AdultPool from "../assets/resort-gallery/adultpool.png";
import KiddiePool from "../assets/resort-gallery/kiddiepool.png";
import SouvenirShop from "../assets/resort-gallery/souvenirshop.png";
import ResortEntrance from "../assets/resortentrance.png";
import Parking from "../assets/resort-gallery/parking.png";
import Cottages from "../assets/cottage-hero.png";
import WeddingEvent from "../assets/event-img/71.png";
import TeamBuilding from "../assets/event-img/73.png";
import Birthday from "../assets/event-img/70.png";
import Debut from "../assets/event-img/72.png";
import ResortBanner from "../assets/resortbanner.jpg";

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';



const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [particles, setParticles] = useState([]);

    // Slides data
    const slides = [
        {
            id: 1,
            title: "Adult Pool",
            description: "Relax and unwind in the exclusive Adult Pool, designed for a serene and peaceful atmosphere. Enjoy the perfect getaway with clear, calm waters, ideal for those seeking a quiet escape.",
            image: AdultPool
        },
        {
            id: 2,
            title: "Kiddie Pool",
            description: "Let the little ones splash around and have fun in the safe and shallow Kiddie Pool, designed for hours of laughter and water play.",
            image: KiddiePool
        },
        {
            id: 3,
            title: "Souvenir Shop",
            description: "Pick up a memento of your unforgettable stay at our Souvenir Shop! From unique handcrafted items to resort-branded keepsakes.",
            image: SouvenirShop
        },
        {
            id: 4,
            title: "Resort Entrance",
            description: "Step into paradise as you enter through our Resort Entrance. It's the perfect start to your relaxing getaway.",
            image: ResortEntrance
        },
        {
            id: 5,
            title: "Parking Lot",
            description: "Convenient and spacious, our Parking Lot offers ample space for guests to park their vehicles with ease.",
            image: Parking
        },
        {
            id: 6,
            title: "Cottages",
            description: "Experience comfort and privacy in our charming Cottages, each thoughtfully designed to provide a cozy and peaceful retreat.",
            image: Cottages
        }
    ];

    // Events data
    const events = [
        {
            id: 1,
            title: "Wedding Event",
            description: "Russel & Rodlyn's special day at Laserina Resort. Celebrating love and new beginnings under our elegant outdoor pavilion.",
            image: WeddingEvent,
            reverse: false
        },
        {
            id: 2,
            title: "Team Building",
            description: "Team Brian. Corporate retreat fostering connection and collaboration in our tropical paradise.",
            image: TeamBuilding,
            reverse: true
        },
        {
            id: 3,
            title: "Birthday Celebration",
            description: "Colorful celebration pavilion at Laserina Resort. Perfect for birthdays and special occasions.",
            image: Birthday,
            reverse: false
        },
        {
            id: 4,
            title: "Birthday Debut Celebration",
            description: "Elegant 18th birthday debut celebration for Mariel & Melody at Laserina Resort.",
            image: Debut,
            reverse: true
        }
    ];

    // Create particles for animation
    useEffect(() => {
        const createParticles = () => {
            const newParticles = [];
            for (let i = 0; i < 20; i++) {
                newParticles.push({
                    id: i,
                    size: Math.random() * 8 + 2,
                    left: Math.random() * 100,
                    top: Math.random() * 100,
                    animationDuration: Math.random() * 20 + 10,
                    delay: Math.random() * 5
                });
            }
            setParticles(newParticles);
        };

        createParticles();
    }, []);

    // Auto slide carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 10000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    // EventCard component with animations
    const EventCard = ({ event }) => {
        const controls = useAnimation();
        const { ref, inView } = useInView({
            triggerOnce: true,
            threshold: 0.5,
        });

        useEffect(() => {
            if (inView) {
                controls.start("visible");
            }
        }, [controls, inView]);

        const variants = {
            hidden: {
                x: event.reverse ? 100 : -100,
                opacity: 0,
            },
            visible: {
                x: 0,
                opacity: 1,
                transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    duration: 0.8,
                },
            },
        };

        const textVariants = {
            hidden: { y: 50, opacity: 0 },
            visible: {
                y: 0,
                opacity: 1,
                transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    delay: 0.3,
                    duration: 0.8,
                },
            },
        };
        return (
            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                className={`flex flex-col ${event.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12 mb-16`}
            >
                {/* Image with animation */}
                <motion.div
                    variants={variants}
                    className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-xl relative group"
                >
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-64 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </motion.div>

                {/* Text content */}
                <motion.div
                    variants={textVariants}
                    className="w-full md:w-1/2 text-center p-4"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 flex items-center justify-center">
                        <svg className="w-6 h-6 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                        </svg>
                        {event.title}
                    </h3>
                    <p className="text-gray-700 mb-4 italic">{event.description.split('.')[0]}.</p>
                    <p className="text-gray-600">{event.description.split('.').slice(1).join('.')}</p>
                </motion.div>
            </motion.div>
        );
    };


    return (
        <div className="overflow-x-hidden">
            {/* Hero Banner */}
            <div
                className="relative w-full h-screen bg-fixed bg-cover bg-center flex items-center overflow-hidden"
                style={{ backgroundImage: `url(${KiddiePool})` }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 z-10"></div>

                {/* Particles */}
                <div className="absolute inset-0 overflow-hidden z-10">
                    {particles.map((particle) => (
                        <div
                            key={particle.id}
                            className="absolute rounded-full bg-white/20"
                            style={{
                                width: `${particle.size}px`,
                                height: `${particle.size}px`,
                                left: `${particle.left}%`,
                                top: `${particle.top}%`,
                                animation: `float ${particle.animationDuration}s infinite linear`,
                                animationDelay: `${particle.delay}s`
                            }}
                        ></div>
                    ))}
                </div>

                {/* Left overlay */}
                <div className="absolute top-0 left-0 w-full md:w-1/2 h-full bg-gradient-to-br from-gray-900/95 via-gray-800/80 to-transparent clip-path-polygon flex items-center pl-8 md:pl-16 pb-12 z-20 shadow-xl">
                    <div className="relative max-w-[90%] md:max-w-[80%] animate-fadeInUp">
                        {/* Tech accent circle */}
                        <div className="relative flex justify-center items-center mb-4">
                            {/* Circle Background */}
                            <div className="absolute w-40 h-40 border-2 border-blue-700 rounded-full animate-spin-slow z-0">
                                <div className="absolute w-3 h-3 bg-blue-700 rounded-full top-8 left-8"></div>
                                <div className="absolute w-3 h-3 bg-blue-700 rounded-full bottom-8 right-8"></div>
                            </div>

                            {/* Logo Image */}
                            <img
                                src={ResortLogo}
                                alt="Laserina Resort Logo"
                                className="w-24 md:w-32 mt-4 mb-6 md:mb-8 transition-transform duration-300 hover:scale-105 hover:rotate-2 animate-slideInLeft"
                            />
                        </div>


                        <h1 className="text-4xl lg:ml-12 md:text-6xl font-bold text-white leading-tight mb-4 md:mb-6">
                            Laserina <span className="block text-blue-600">Resort</span>
                        </h1>

                        <p className="text-lg lg:ml-12 md:text-xl text-gray-200 font-light tracking-wide mb-6 md:mb-8 relative pb-6 max-w-[340px] animate-fadeInUp delay-100 opacity-0">
                            A Place of Comfort and Convenience
                            <span className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"></span>
                        </p>

                        <Link
                            to="/cottages"
                            className="lg:ml-12 inline-block px-8 py-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-semibold rounded-full shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-700/40 relative overflow-hidden animate-fadeInUp delay-200 opacity-0"
                        >
                            <span className="relative z-10">Book now</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full"></span>
                        </Link>
                    </div>
                </div>

                {/* Shape divider */}
                <div className="absolute bottom-0 left-0 w-full h-32 z-30">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                    >
                        <path
                            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                            fill="rgba(255, 255, 255, 0.08)"
                        ></path>
                    </svg>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="relative my-16 text-center">
                <div className="absolute inset-x-0 top-1/2 h-px bg-gray-200 z-0"></div>
                <span className="relative inline-block px-6 py-2 bg-white text-blue-600 text-lg font-semibold z-10">
                    OUR GALLERY
                </span>
            </div>

            {/* Carousel */}
            <div className="max-w-6xl mx-auto rounded-xl shadow-xl overflow-hidden relative">
                <div
                    className="flex transition-transform duration-700 ease-[cubic-bezier(0.645,0.045,0.355,1)]"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className="w-full flex-shrink-0 relative flex items-center justify-center h-80 md:h-[560px] bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                            <div
                                className={`text-center text-white p-6 max-w-2xl w-full relative z-10 transition-all duration-700 ${currentSlide === slide.id - 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            >
                                <h2 className="text-2xl md:text-3xl font-bold mb-4">{slide.title}</h2>
                                <p className="text-sm md:text-base mb-6 opacity-90">{slide.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation buttons */}
                <div className="absolute top-1/2 w-full px-4 flex justify-between transform -translate-y-1/2 z-20">
                    <button
                        onClick={goToPrevSlide}
                        className="bg-white/20 text-white p-3 rounded-lg backdrop-blur-md hover:bg-white/30 transition-all hover:scale-110"
                    >
                        &lt;
                    </button>
                    <button
                        onClick={goToNextSlide}
                        className="bg-white/20 text-white p-3 rounded-lg backdrop-blur-md hover:bg-white/30 transition-all hover:scale-110"
                    >
                        &gt;
                    </button>
                </div>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'w-4 bg-white' : 'bg-white/50'}`}
                        ></button>
                    ))}
                </div>
            </div>

            {/* Client Portfolio */}
            <div className="relative my-16 text-center">
                <div className="absolute inset-x-0 top-1/2 h-px bg-gray-200 z-0"></div>
                <span className="relative inline-block px-6 py-2 bg-white text-blue-600 text-lg font-semibold z-10">
                    CLIENT PORTFOLIO
                </span>
            </div>

            <div className="max-w-6xl mx-auto px-4 mb-16">
                <img
                    src={ResortBanner}
                    alt="Laserina Resort Client Portfolio"
                    className="w-full h-auto rounded-lg shadow-md"
                />
            </div>

            {/* Events Section */}
            <div className="container mx-auto px-4 mb-20">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;