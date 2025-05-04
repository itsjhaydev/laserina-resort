import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";
import ResortView from "../assets/resortview.png";
import ReCAPTCHA from "react-google-recaptcha"; // ✅ Import added
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [recaptchaToken, setRecaptchaToken] = useState(null); // ✅ Token state
    const navigate = useNavigate();

    const { signup, error, isLoading } = useAuthStore();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!recaptchaToken) {
            alert("Please complete the reCAPTCHA.");
            return;
        }

        try {
            const response = await signup(email, password, name, recaptchaToken); // ✅ Send token to backend (if needed)
            if (!response.error) {
                toast.success('Account created please verify your email');
                navigate("/verify-email");
            } else {
                toast.error(response.error.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const handleRecaptchaChange = (token) => {
        console.log("my recaptcha token: ", token);
        setRecaptchaToken(token); 
    };

    return (
        <div className="flex h-screen">
            <div className="w-full md:w-1/3 flex flex-col justify-center items-center px-6">
                <h2 className="text-3xl font-bold mb-2 pt-18">Create Account</h2>
                <p className="mb-4 text-gray-500">Join us today and enjoy exclusive offers.</p>

                <form onSubmit={handleSignUp} className="w-[80%]">
                    <Input
                        icon={User}
                        type='text'
                        placeholder='Full Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        icon={Mail}
                        type='email'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        icon={Lock}
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <PasswordStrengthMeter password={password} />

                    {/* ✅ reCAPTCHA Component */}
                    <div className="my-4 w-full flex justify-center items-center">
                        <ReCAPTCHA
                            sitekey="6LcQmC0rAAAAAGXR-qc5_T2VbJwCe8xBYt2gUiea" // 🔁 Replace with your actual site key
                            onChange={handleRecaptchaChange}
                        />
                    </div>

                    <motion.button
                        className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white 
                        font-bold rounded-lg shadow-lg hover:from-blue-600
                        hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                        focus:ring-offset-gray-900 transition duration-200'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
                    </motion.button>
                </form>

                <div className="flex justify-center mt-4 w-full">
                    <p className="mt-4 text-sm text-gray-600">
                        Already have an account? <a href="/login" className="text-blue-500 underline">Sign in</a>
                    </p>
                </div>
            </div>

            <div className="hidden md:block md:w-2/3 relative">
                <img
                    src={ResortView}
                    alt="Resort"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">Welcome to Laserina Resort</h1>
                        <p className="text-lg">
                            Nestled in the heart of Barangka, enjoy the perfect blend of comfort and luxury. Sign up to book your stay and access exclusive amenities.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
