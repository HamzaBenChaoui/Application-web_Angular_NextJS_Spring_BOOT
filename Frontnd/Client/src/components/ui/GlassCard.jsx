"use client";

export const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);
