import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const CottageCard = ({ cottage, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    // Animation variants
    const cardVariants = {
        hidden: {
            y: -100,
            opacity: 0,
            rotate: -5
        },
        visible: {
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 100,
                delay: index * 0.15 // Staggered delay based on index
            }
        },
        hover: {
            y: -10,
            scale: 1.03,
            transition: { duration: 0.2 }
        }
    };

    return (
        <motion.div
            ref={cardRef}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={cardVariants}
            className="w-full"
        >
            <Link
                to="/reservation"
                state={{ cottage }}
                className="block text-inherit no-underline"
            >
                <div className="group bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                    <motion.div
                        className="h-48 bg-cover bg-center"
                        style={{ backgroundImage: `url(${cottage.image})` }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />

                    <div className="p-4 text-center">
                        <h3 className="text-lg font-semibold mb-1">{cottage.title}</h3>
                        {/* Book Now appears only on hover */}
                        <span className="text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Book Now
                        </span>
                        <p className="text-gray-600 text-sm mb-3">{cottage.description}</p>
                        <div className="text-sm text-green-600 font-semibold mb-2">
                            <i className="fa-solid fa-tag mr-1"></i> ₱{cottage.cottage_price}/head
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default CottageCard;