"use client";

import { AnimatePresence, motion } from "framer-motion";
import "./globals.css";
import BarreNavigation from "./components/navbar/page";
import { usePathname } from "next/navigation";
import BlogNavBar from "./components/blogComponents/BlogNavBar";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/footer/Footer";
import BlogFooter from "./components/blogComponents/BlogFooter";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isBlogPage = pathname?.includes('/blogs') || pathname === '/blogs';

  // Determine which navbar and footer to use
  const getNavbar = () => {
    if (isBlogPage) return <BlogNavBar />;
    return <BarreNavigation />;
  };

  const getFooter = () => {
    if (isBlogPage) return <BlogFooter />;
     // or create a PromotionsFooter if different
    return <Footer />;
  };

  return (
    <html lang="en">
      <AuthProvider>
        <body className="bg-gray-100">
          {getNavbar()}
          {children}
          {getFooter()}
        </body>
      </AuthProvider>
    </html>
  );
}