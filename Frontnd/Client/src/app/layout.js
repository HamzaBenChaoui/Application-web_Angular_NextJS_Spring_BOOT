"use client";

import { AnimatePresence, motion } from "framer-motion";
import "./globals.css";
import Navbar from "./components/navbar/page";
import { usePathname } from "next/navigation";
import BlogNavBar from "./components/BlogNavBar";
import BlogFooter from "./components/BlogFooter";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isBlogPage = pathname?.includes('/blogs') || pathname === '/blogs';

  return (
     <html lang="en">
      <body className="bg-gray-100">
        {isBlogPage ? <BlogNavBar /> : <Navbar />}
       {children}
        {isBlogPage ? <BlogFooter /> : <Footer />}
      </body>
    </html>
  );
}