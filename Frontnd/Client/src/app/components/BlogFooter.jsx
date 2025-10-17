import React from 'react';
import Link from 'next/link';
import FloatingDock2 from './FloatingDock2';

const BlogFooter = () => {
    return (
        <div className="bg-[#380445] px-5 py-10 text-white text-center min-h-[270px] flex flex-col justify-center items-center mt-12">
            <FloatingDock2 />
            <div className="py-5">
                <Link
                    href="/" 
                    className="text-white underline text-lg font-medium px-5 py-2.5"
                >
                    Retour sur le site de RideHub
                </Link>
            </div>
        </div>
    );
}

export default BlogFooter;