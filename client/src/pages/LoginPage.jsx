import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import ResortView from "../assets/resortview.png";
import toast from "react-hot-toast";

const LoginPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, isLoading, error } = useAuthStore();

    const handleLogin = async (e) => {
        e.preventDefault();

        await login(email, password);
        if (!error) {
            toast.success("Login successfully")
            navigate('/profile');
        }
    };


    return (
        <div className="flex h-screen">
            <div className="w-full md:w-1/3 flex flex-col justify-center items-center px-6">
                <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                <p className="mb-4 text-gray-500">Login to manage your reservations and more.</p>

                {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

                <form onSubmit={handleLogin} className="w-[90%]">
                    
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

                    <div className='flex items-center mb-6'>
                        <Link to='/forgot-password' className='text-sm text-blue-400 hover:underline'>
                            Forgot password?
                        </Link>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Login"}
                    </motion.button>
                </form>

                <div className="flex justify-center mt-4 w-full">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to='/signup' className='text-blue-500 underline'>Sign up</Link>
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
                            Login to access your profile, manage bookings, and enjoy a seamless stay experience.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
