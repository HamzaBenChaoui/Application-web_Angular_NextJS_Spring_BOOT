"use client";

import { AnimatePresence, motion } from "framer-motion";
import "./globals.css";
import Navbar from "./components/navbar/page";
import { usePathname } from "next/navigation";
import BlogNavBar from "./components/blogComponents/BlogNavBar";

import Footer from "./components/footer/Footer";
import BlogFooter from "./components/blogComponents/BlogFooter";
import PromotionsNav from "./components/promotionsCompoents/promotionsNav";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isBlogPage = pathname?.includes('/blogs') || pathname === '/blogs';
  const isPromotionsPage = pathname?.includes('/promotions') || pathname === '/promotions';

  // Determine which navbar and footer to use
  const getNavbar = () => {
    if (isBlogPage) return <BlogNavBar />;
    if (isPromotionsPage) return null; // or create a PromotionsNavBar if different
    return <Navbar />;
  };

  const getFooter = () => {
    if (isBlogPage) return <BlogFooter />;
    if (isPromotionsPage) return <Footer />; // or create a PromotionsFooter if different
    return <Footer />;
  };

  return (
    <html lang="en">
      <body className="bg-gray-100">
        {getNavbar()}
        {children}
        {getFooter()}
      </body>
    </html>
  );
}