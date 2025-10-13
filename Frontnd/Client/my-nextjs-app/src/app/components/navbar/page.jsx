import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className="bg-white shadow-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-[#bb00cc] rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                    </svg>
                                </div>
                                <span className="text-2xl font-bold text-[#302652]">
                                    RideHub
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link 
                                href="/" 
                                className="text-gray-700 hover:text-[#bb00cc] font-medium transition-colors duration-200 relative group"
                            >
                                Home
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#bb00cc] transition-all duration-200 group-hover:w-full"></span>
                            </Link>
                            <Link 
                                href="/products" 
                                className="text-gray-700 hover:text-[#bb00cc] font-medium transition-colors duration-200 relative group"
                            >
                                Products
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#bb00cc] transition-all duration-200 group-hover:w-full"></span>
                            </Link>
                            <Link 
                                href="/products?category=motorcycle" 
                                className="text-gray-700 hover:text-[#bb00cc] font-medium transition-colors duration-200 relative group"
                            >
                                Motorcycles
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#bb00cc] transition-all duration-200 group-hover:w-full"></span>
                            </Link>
                            <Link 
                                href="/products?category=bicycle" 
                                className="text-gray-700 hover:text-[#bb00cc] font-medium transition-colors duration-200 relative group"
                            >
                                Bicycles
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#bb00cc] transition-all duration-200 group-hover:w-full"></span>
                            </Link>
                            <Link 
                                href="/contact" 
                                className="text-gray-700 hover:text-[#bb00cc] font-medium transition-colors duration-200 relative group"
                            >
                                Contact
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#bb00cc] transition-all duration-200 group-hover:w-full"></span>
                            </Link>
                        </div>

                        {/* Desktop Auth Buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Link 
                                href="/login" 
                                className="text-gray-700 hover:text-[#bb00cc] font-medium transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-50"
                            >
                                Login
                            </Link>
                            <Link 
                                href="/signup" 
                                className="bg-[#bb00cc] text-white font-medium px-6 py-2 rounded-lg hover:bg-[#a500b8] transition-all duration-200"
                            >
                                Sign Up
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-gray-700 hover:text-[#bb00cc] transition-colors duration-200 p-2"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
                        <div className="px-4 py-6 space-y-4">
                            <Link 
                                href="/" 
                                className="block text-gray-700 hover:text-[#bb00cc] font-medium transition-colors duration-200 py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link 
                                href="/products" 
                                className="block text-gray-700 hover:text-[#bb00cc] font-medium transition-colors duration-200 py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Products
                            </Link>
                            <Link 
                                href="/products?category=motorcycle" 
                                className="block text-gray-700 hover:text-[#bb00cc] font-medium transition-colors duration-200 py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Motorcycles
                            </Link>
                            <Link 
                                href="/products?category=bicycle" 
                                className="block text-gray-700 hover:text-[#bb00cc] font-medium transition-colors duration-200 py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Bicycles
                            </Link>
                            <Link 
                                href="/contact" 
                                className="block text-gray-700 hover:text-[#bb00cc] font-medium transition-colors duration-200 py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>
                            <div className="pt-4 border-t border-gray-200 space-y-3">
                                <Link 
                                    href="/login" 
                                    className="block text-center text-gray-700 hover:text-[#bb00cc] font-medium transition-colors duration-200 py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link 
                                    href="/signup" 
                                    className="block text-center bg-[#bb00cc] text-white font-medium py-3 rounded-lg hover:bg-[#a500b8] transition-all duration-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}

export default Navbar;