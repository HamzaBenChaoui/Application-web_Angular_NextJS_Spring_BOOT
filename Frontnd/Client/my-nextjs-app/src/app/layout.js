
"use client";

import { AnimatePresence, motion } from "framer-motion";
import "./globals.css";
import Navbar from "./components/navbar/page";
import MotionWrapper from "./components/MotionWrapper";
import NewWaySection from "./landingpageComponent/page";



export default function RootLayout({ children }) {
  return (
     <html lang="en">
      <body className="bg-gray-100">
        <Navbar />
        <MotionWrapper>{children}</MotionWrapper>
        
      </body>
    </html>
  );
}
