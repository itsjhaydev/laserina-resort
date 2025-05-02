import React, { useState } from 'react';
import { motion } from "framer-motion"
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqData = [
    { question: 'Do you have grill stand available?', answer: 'Yes, we provide grill stands for our guests. Please inform the staff if you need one.' },
    { question: 'What is the proper swimming attire?', answer: 'Proper swimming attire includes swimsuits, trunks, or rash guards. Cotton clothing is not allowed in the pools.' },
    { question: 'Do you allow pets inside your resort?', answer: 'We\'re sorry but pets are not allowed in the resort premises for hygiene and safety reasons.' },
    { question: 'How often do you change the water?', answer: 'Our pools undergo daily maintenance and water is changed regularly following health and safety standards.' },
    { question: 'How many available pools do you have?', answer: 'We have 3 swimming pools: an adult pool, kiddie pool, and infinity pool with a view.' },
    { question: 'Can we use all the pools available inside the resort?', answer: 'Yes, all pools are accessible to guests unless under maintenance.' },
    { question: 'Do you have online reservation?', answer: 'Yes, we accept online reservations through our website and partner booking platforms.' },
    { question: 'Can we cook our food in the resort?', answer: 'Yes, we have designated grilling areas where guests can cook their own food.' },
    { question: 'Are we allowed to bring food, soft drinks, and alcoholic beverages?', answer: 'Outside food and non-alcoholic drinks are allowed. For alcoholic beverages, we have a corkage fee.' },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='pt-9'>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 my-12 border-[1px] border-gray-200">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl font-bold text-center mb-6 text-blue-500">Frequently Asked Questions</h2>

                    <div className="space-y-4">
                        {faqData.map((item, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex justify-between items-center text-left px-4 py-3 bg-gray-100/50 hover:bg-gray-200 transition-colors"
                                >
                                    <span className="font-semibold text-gray-800">{item.question}</span>
                                    <ChevronDownIcon
                                        className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {openIndex === index && (
                                    <div className="px-4 py-3 text-gray-700/ bg-white">
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FAQ;
