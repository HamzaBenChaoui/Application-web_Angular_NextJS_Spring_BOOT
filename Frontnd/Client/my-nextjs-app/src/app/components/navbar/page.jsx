import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white ${
                isScrolled ? 'shadow-lg border-b border-gray-100' : 'border-b border-gray-100'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link 
                                href="/" 
                                className="flex items-center space-x-3 group"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-[#bb00cc] to-purple-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                    </svg>
                                </div>
                                <span className="text-3xl font-black bg-gradient-to-r from-[#302652] to-[#bb00cc] bg-clip-text text-transparent">
                                    RideHub
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center space-x-1">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/products", label: "Products" },
                                { href: "/products?category=motorcycle", label: "Motorcycles" },
                                { href: "/products?category=bicycle", label: "Bicycles" },
                                { href: "/contact", label: "Contact" }
                            ].map((item, index) => (
                                <Link 
                                    key={item.href}
                                    href={item.href} 
                                    className="relative px-6 py-3 text-gray-700 hover:text-[#302652] font-semibold transition-all duration-300 group"
                                >
                                    <span className="relative z-10">{item.label}</span>
                                    
                                    {/* Hover background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#bb00cc]/5 to-transparent rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                                    
                                    {/* Animated underline */}
                                    <div className="absolute bottom-2 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#bb00cc] to-purple-600 group-hover:w-4/5 group-hover:left-1/10 transition-all duration-300 transform -translate-x-1/2 group-hover:translate-x-0"></div>
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Auth Buttons */}
                        <div className="hidden md:flex items-center space-x-3">
                            <Link 
                                href="/login" 
                                className="relative px-6 py-3 text-gray-700 hover:text-[#302652] font-semibold transition-all duration-300 group"
                            >
                                <span className="relative z-10">Login</span>
                                <div className="absolute inset-0 border border-gray-200 rounded-xl hover:border-[#bb00cc]/30 transition-all duration-300"></div>
                                <div className="absolute inset-0 bg-gray-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                            <Link 
                                href="/signup" 
                                className="relative px-8 py-3 font-semibold text-white transition-all duration-300 group overflow-hidden"
                            >
                                <span className="relative z-10">Sign Up</span>
                                
                                {/* Gradient background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#bb00cc] to-purple-600 rounded-xl transition-all duration-500"></div>
                                
                                {/* Shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="relative w-12 h-12 bg-white border border-gray-200 rounded-xl hover:border-[#bb00cc]/30 transition-all duration-300 flex items-center justify-center group"
                            >
                                <div className="relative w-6 h-6">
                                    <span className={`absolute left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                                        isMobileMenuOpen ? 'top-3 rotate-45' : 'top-2'
                                    }`}></span>
                                    <span className={`absolute left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                                        isMobileMenuOpen ? 'top-3 -rotate-45' : 'top-3'
                                    }`}></span>
                                    <span className={`absolute left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                                        isMobileMenuOpen ? 'top-3 opacity-0' : 'top-4'
                                    }`}></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg transition-all duration-500 overflow-hidden ${
                    isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className="px-4 py-6 space-y-2">
                        {[
                            { href: "/", label: "Home", icon: "🏠" },
                            { href: "/products", label: "Products", icon: "🛍️" },
                            { href: "/products?category=motorcycle", label: "Motorcycles", icon: "🏍️" },
                            { href: "/products?category=bicycle", label: "Bicycles", icon: "🚲" },
                            { href: "/contact", label: "Contact", icon: "📞" }
                        ].map((item, index) => (
                            <Link 
                                key={item.href}
                                href={item.href} 
                                className="flex items-center space-x-4 px-4 py-4 text-gray-700 hover:text-[#302652] font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span>{item.label}</span>
                                <svg className="w-4 h-4 text-[#bb00cc] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                </svg>
                            </Link>
                        ))}
                        
                        {/* Mobile Auth Buttons */}
                        <div className="pt-4 border-t border-gray-200 space-y-3">
                            <Link 
                                href="/login" 
                                className="flex items-center justify-center px-4 py-4 text-gray-700 hover:text-[#302652] font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span>Login</span>
                                <svg className="w-4 h-4 text-[#bb00cc] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                            </Link>
                            <Link 
                                href="/signup" 
                                className="flex items-center justify-center px-4 py-4 bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 group"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span>Sign Up Free</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Spacer for fixed navbar */}
            <div className="h-20"></div>
        </>
    );
}

export default Navbar;