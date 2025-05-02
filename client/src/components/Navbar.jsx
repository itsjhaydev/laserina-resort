import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const logout = useAuthStore((state) => state.logout); // Ensure logout exists in the store
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/login');
    };

    return (
        <nav className="w-full fixed top-0 left-0 p-4 z-50 text-[#1d67ac] bg-gradient-to-r from-[#1d67ac] via-white to-white backdrop-blur-xs">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-2xl text-white font-bold">
                    <Link to="/">Laserina Resort</Link>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-2xl"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>

                <ul
                    className={`flex flex-col justify-center items-center font-bold md:flex-row gap-4 md:gap-3 text-md absolute md:static top-16 left-0 w-full md:w-auto bg-black/70 md:bg-transparent px-6 py-4 md:p-0 transition-all duration-300 ${isOpen ? 'block' : 'hidden md:flex'
                        }`}
                >
                    {[
                        { to: "/", label: "Home" },
                        { to: "/cottages", label: "Cottages" },
                        { to: "/reservation", label: "Reservation" },
                        { to: "/about", label: "About" },
                        { to: "/faq", label: "FAQ" },
                        { to: "/contact", label: "Contact" },
                    ].map(({ to, label }) => (
                        <li
                            key={label}
                            className={`w-full md:w-auto text-center px-3 py-2 rounded transition 
                            ${location.pathname === to ? 'underline decoration-2 underline-offset-8 text-[#1d67ac]' : ''}`}
                        >
                            <Link to={to} onClick={() => setIsOpen(false)}>
                                {label}
                            </Link>
                        </li>

                    ))}

                    {isAuthenticated && user ? (
                        <>
                            <li
                                className={`w-full md:w-auto text-center px-3 py-2 rounded transition
                                ${location.pathname === '/profile' ? 'underline decoration-2 underline-offset-8 text-[#1d67ac]' : ''}`}
                            >
                                <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
                            </li>
                            <li className="w-full md:w-auto text-center bg-green-600 text-white hover:bg-green-900  px-3 py-1 rounded transition cursor-pointer" onClick={handleLogout}>
                                Logout
                            </li>
                        </>
                    ) : (
                        <li
                            className={`w-full md:w-auto text-center px-3 py-2 rounded transition 
                            hover:bg-gray-100 hover:text-[#1d67ac] 
                            ${location.pathname === '/login' ? 'underline decoration-2 underline-offset-8 text-[#1d67ac]' : ''}`}
                        >
                            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
