import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    return (
        <>
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
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
                                { href: "/contact", label: "Contact" },
                                { href: "/blogs", label: "Blogs" }
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

                        {/* Desktop Right Side - Auth & Profile */}
                        <div className="hidden md:flex items-center space-x-3">
                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="relative flex items-center space-x-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-[#bb00cc]/30 transition-all duration-300 group"
                                >
                                    {/* Avatar */}
                                    <div className="w-8 h-8 bg-gradient-to-br from-[#bb00cc] to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                        </svg>
                                    </div>
                                    
                                    {/* User Name */}
                                    <span className="text-gray-700 font-semibold group-hover:text-[#302652] transition-colors duration-300">
                                        John Doe
                                    </span>
                                    
                                    {/* Chevron Icon */}
                                    <svg 
                                        className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                                            isProfileDropdownOpen ? 'rotate-180' : ''
                                        }`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl py-2 z-50 animate-fade-in">
                                        {/* User Info Section */}
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-[#bb00cc] to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">John Doe</p>
                                                    <p className="text-sm text-gray-500">john.doe@example.com</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="py-2">
                                            {[
                                                { 
                                                    href: "/profile", 
                                                    label: "My Profile", 
                                                    icon: (
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                                        </svg>
                                                    ) 
                                                },
                                                { 
                                                    href: "/favorites", 
                                                    label: "My Favorites", 
                                                    icon: (
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                                        </svg>
                                                    ) 
                                                },
                                                { 
                                                    href: "/bookings", 
                                                    label: "My Bookings", 
                                                    icon: (
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                        </svg>
                                                    ) 
                                                },
                                                { 
                                                    href: "/settings", 
                                                    label: "Settings", 
                                                    icon: (
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                        </svg>
                                                    ) 
                                                },
                                                { 
                                                    href: "/help", 
                                                    label: "Help & Support", 
                                                    icon: (
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                        </svg>
                                                    ) 
                                                }
                                            ].map((item, index) => (
                                                <Link 
                                                    key={item.href}
                                                    href={item.href} 
                                                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-[#302652] hover:bg-gradient-to-r hover:from-[#bb00cc]/5 hover:to-purple-600/5 transition-all duration-300 group"
                                                    onClick={() => setIsProfileDropdownOpen(false)}
                                                >
                                                    <div className="text-[#bb00cc] group-hover:scale-110 transition-transform duration-300">
                                                        {item.icon}
                                                    </div>
                                                    <span className="font-medium">{item.label}</span>
                                                    <svg className="w-4 h-4 text-[#bb00cc] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                                    </svg>
                                                </Link>
                                            ))}
                                        </div>

                                        {/* Logout Section */}
                                        <div className="px-4 py-3 border-t border-gray-100">
                                            <button 
                                                className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group"
                                                onClick={() => {
                                                    console.log('Logging out...');
                                                    setIsProfileDropdownOpen(false);
                                                }}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                                </svg>
                                                <span className="font-medium">Log Out</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center space-x-3">
                            {/* Mobile Profile Button */}
                            <button
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="relative w-12 h-12 bg-white border border-gray-200 rounded-xl hover:border-[#bb00cc]/30 transition-all duration-300 flex items-center justify-center group"
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-[#bb00cc] to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                </div>
                            </button>

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
                <div className={`md:hidden bg-white border-t border-gray-100 shadow-lg transition-all duration-500 overflow-hidden ${
                    isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className="px-4 py-6 space-y-2">
                        {[
                            { href: "/", label: "Home", icon: "🏠" },
                            { href: "/products", label: "Products", icon: "🛍️" },
                            { href: "/products?category=motorcycle", label: "Motorcycles", icon: "🏍️" },
                            { href: "/products?category=bicycle", label: "Bicycles", icon: "🚲" },
                            { href: "/favorites", label: "Favorites", icon: "❤️" },
                            { href: "/contact", label: "Contact", icon: "📞" },
                            { href: "/blogs", label: "Blogs", icon: "📝" }
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
                        
                        {/* Mobile Profile Links */}
                        <div className="pt-4 border-t border-gray-200 space-y-2">
                            <Link 
                                href="/profile" 
                                className="flex items-center space-x-4 px-4 py-4 text-gray-700 hover:text-[#302652] font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="text-xl">👤</span>
                                <span>My Profile</span>
                            </Link>
                            <Link 
                                href="/bookings" 
                                className="flex items-center space-x-4 px-4 py-4 text-gray-700 hover:text-[#302652] font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="text-xl">📅</span>
                                <span>My Bookings</span>
                            </Link>
                            <Link 
                                href="/settings" 
                                className="flex items-center space-x-4 px-4 py-4 text-gray-700 hover:text-[#302652] font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="text-xl">⚙️</span>
                                <span>Settings</span>
                            </Link>
                        </div>

                        {/* Mobile Logout */}
                        <div className="pt-4 border-t border-gray-200">
                            <button 
                                className="flex items-center space-x-4 w-full px-4 py-4 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group"
                                onClick={() => {
                                    console.log('Logging out...');
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                <span className="text-xl">🚪</span>
                                <span className="font-semibold">Log Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Close dropdown when clicking outside */}
            {isProfileDropdownOpen && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileDropdownOpen(false)}
                ></div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                }
            `}</style>
        </>
    );
}

export default Navbar;