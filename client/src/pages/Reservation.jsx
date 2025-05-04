import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { CloudArrowUpIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { UserIcon, EnvelopeIcon, PhoneIcon, UsersIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import TermsModal from '../components/TermsModal';
import LoadingSpinner from '../components/LoadingSpinner';
import Input from '../components/Input';
import { useAuthStore } from '../store/authStore';

// Image imports
import Gcash from '../assets/mop/gcash.png';
import Maya from '../assets/mop/maya.png';

const Reservation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const cottage = location.state?.cottage;
    const { user } = useAuthStore();

    const [values, setValues] = useState({
        userId: user._id,
        cottageId: cottage?.cottage_id || '',
        cottageName: cottage?.title || 'No cottage selected',
        cottagePrice: cottage?.cottage_price || '',
        guestName: '',
        email: '',
        contactNumber: '',
        numberOfGuest: 1,
        address: '',
        checkIn: '',
        checkOut: '',
        payment: '',
        proofOfPayment: null,
        termsAgreed: false
    });

    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValues(prev => ({ ...prev, proofOfPayment: file }));
            setPreview(file.type.startsWith('image') ? URL.createObjectURL(file) : null);
        }
    };

    const removeImage = () => {
        setValues(prev => ({ ...prev, proofOfPayment: null }));
        setPreview(null);
    };

    const handleCheckInChange = (e) => {
        const checkInDate = e.target.value;
        if (checkInDate) {
            const nextDay = new Date(checkInDate);
            nextDay.setDate(nextDay.getDate() + 1);
            setValues(prev => ({
                ...prev,
                checkIn: checkInDate,
                checkOut: nextDay.toISOString().split('T')[0]
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        const requiredFields = {
            cottageId: 'Please select a cottage',
            guestName: 'Full name is required',
            email: 'Email is required',
            contactNumber: 'Phone number is required',
            address: 'Address is required',
            checkIn: 'Check-in date is required',
            checkOut: 'Check-out date is required',
            payment: 'Payment method is required',
            proofOfPayment: 'Proof of payment is required',
            termsAgreed: 'You must agree to the terms'
        };

        for (const [field, message] of Object.entries(requiredFields)) {
            if (!values[field]) {
                toast.error(message);
                return;
            }
        }

        // Additional validations
        if (!/^\d{11}$/.test(values.contactNumber)) {
            toast.error('Phone number must be 11 digits');
            return;
        }

        if (values.numberOfGuest < 1) {
            toast.error('Number of guests must be at least 1');
            return;
        }

        if (new Date(values.checkOut) <= new Date(values.checkIn)) {
            toast.error('Check-out date must be after check-in date');
            return;
        }

        setIsLoading(true);

        try {
            await useAuthStore.getState().createReservation(values);
            toast.success('Reservation created successfully!');
            navigate("/profile");
        } catch (error) {
            const msg = error.message;

            if ( msg.includes("already booked this cottage") || msg.includes("up to 2 active reservations")) {
                toast(msg, { icon: '⚠️' }); // ✅ Show as warning
            } else {
                toast.error(msg || 'Failed to create reservation');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="max-w-2xl mx-auto my-8 p-4 pt-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
            >
                <div className="bg-white rounded-lg shadow-md p-6 border-[1px] border-gray-200">
                    <h1 className="text-3xl text-blue-500 font-bold text-center mb-6">Book Reservation</h1>
                    <p className="text-center text-gray-600 mb-6">
                        To secure your reservation at Laserina Resort, we require a 50% deposit of the total booking amount.
                    </p>

                    <form onSubmit={handleSubmit}>
                        {/* Selected Cottage */}
                        {values.cottageId ? (
                            <div className="bg-blue-100 p-4 mb-6 rounded-lg border-l-4 border-blue-500">
                                <h2 className="text-lg font-semibold text-blue-800">Selected Cottage</h2>
                                <p className="font-bold">{values.cottageName}</p>
                                <p className="text-gray-600">P{values.cottagePrice}/head</p>
                            </div>
                        ) : (
                            <div className="bg-blue-500 text-white p-4 mb-6 rounded-lg text-center">
                                <p>
                                    No cottage selected.{' '}
                                    <Link to="/cottages" className="underline">
                                        Choose a cottage first
                                    </Link>.
                                </p>
                            </div>
                        )}

                        {/* Guest Information */}
                        <div className="mb-4">
                            <label htmlFor="guestName" className="block text-gray-700 mb-2">Full Name</label>
                            <Input
                                type="text"
                                name="guestName"
                                id="guestName"
                                placeholder='Enter your full name'
                                value={values.guestName}
                                onChange={handleInputChange}
                                required
                                icon={UserIcon}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder='Enter your email address'
                                value={values.email}
                                onChange={handleInputChange}
                                required
                                icon={EnvelopeIcon}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="contactNumber" className="block text-gray-700 mb-2">Phone Number</label>
                            <Input
                                type="tel"
                                name="contactNumber"
                                id="contactNumber"
                                placeholder='Enter your contact number'
                                value={values.contactNumber}
                                onChange={handleInputChange}
                                required
                                maxLength="11"
                                icon={PhoneIcon}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="numberOfGuest" className="block text-gray-700 mb-2">Number of Guests</label>
                            <Input
                                type="number"
                                name="numberOfGuest"
                                id="numberOfGuest"
                                placeholder='Enter number of guests'
                                value={values.numberOfGuest}
                                onChange={handleInputChange}
                                min="1"
                                required
                                icon={UsersIcon}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="address" className="block text-gray-700 mb-2">Address</label>
                            <Input
                                type="text"
                                name="address"
                                id="address"
                                placeholder='Enter your address'
                                value={values.address}
                                onChange={handleInputChange}
                                required
                                icon={MapPinIcon}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="checkIn" className="block text-gray-700 mb-2">Check-in Date</label>
                            <Input
                                type="date"
                                name="checkIn"
                                id="checkIn"
                                value={values.checkIn}
                                onChange={handleCheckInChange}
                                min={new Date().toISOString().split('T')[0]}
                                required
                                icon={CalendarIcon}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="checkOut" className="block text-gray-700 mb-2">Check-out Date</label>
                            <Input
                                type="date"
                                name="checkOut"
                                id="checkOut"
                                value={values.checkOut}
                                onChange={handleInputChange}
                                min={values.checkIn || new Date().toISOString().split('T')[0]}
                                required
                                icon={CalendarIcon}
                            />
                        </div>

                        <div className="border-t border-gray-200 my-6"></div>

                        {/* Payment Options */}
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-4">Payment Option</label>
                            <div className="flex flex-wrap justify-center gap-4">
                                {[{ value: 'GCash', image: Gcash, color: 'border-blue-500 bg-blue-50' },
                                { value: 'Maya', image: Maya, color: 'border-green-500 bg-green-50' }].map((option) => (
                                    <label key={option.value} className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={option.value}
                                            checked={values.payment === option.value}
                                            onChange={handleInputChange}
                                            className="hidden"
                                        />
                                        <div className={`w-48 p-4 border-2 rounded-lg ${values.payment === option.value ? option.color : 'border-gray-300'} transition-colors`}>
                                            <p className="font-medium text-center mb-2">{option.value}</p>
                                            <img src={option.image} alt={option.value} className="w-full h-[220px]" />
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Proof of Payment */}
                        <div className="flex flex-col items-center mb-6">
                            <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center mb-2 cursor-pointer transition-colors">
                                <CloudArrowUpIcon className="w-5 h-5 mr-2" />
                                Upload Proof of Payment
                                <input
                                    type="file"
                                    className="hidden"
                                    name='proofOfPayment'
                                    accept="image/*,application/pdf"
                                    onChange={handleFileChange}
                                />
                            </label>

                            {values.proofOfPayment && (
                                <div className="flex flex-col items-center mt-4">
                                    {preview && values.proofOfPayment.type.startsWith('image') && (
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-36 h-48 object-cover mb-2"
                                        />
                                    )}
                                    <p className="text-sm mb-2">{values.proofOfPayment.name}</p>
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="termsAgreed"
                                    checked={values.termsAgreed}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                    required
                                />
                                <span className="text-sm">
                                    I agree to the{' '}
                                    <button
                                        type="button"
                                        onClick={() => setOpenModal(true)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Terms and Conditions
                                    </button>
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : 'Submit'}
                            {!isLoading && <PaperAirplaneIcon className="w-5 h-5 ml-2" />}
                        </button>
                    </form>
                </div>
            </motion.div>

            <TermsModal open={openModal} onClose={() => setOpenModal(false)} />
        </div>
    );
};

export default Reservation;