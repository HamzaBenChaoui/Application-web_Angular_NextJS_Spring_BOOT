import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <>
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link href="/">MyApp</Link>
          </div>
          <div className="space-x-6">
            <Link href="/" className="hover:text-blue-500">Home</Link>
            <Link href="/products" className="hover:text-blue-500">Motocycles</Link>
            <Link href="/login" className="hover:text-blue-500">Login</Link>
            <Link href="/signup" className="hover:text-blue-500">Sign Up</Link>
            <Link href="/contact" className="hover:text-blue-500">Contact Us</Link>
            
          </div>
        </nav>
        </>
    );
}

export default Navbar;


