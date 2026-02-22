"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type CardVariant = "standard" | "portal";

interface FloatingCardProps {
  variant?: CardVariant;
  label?: string;
  icon?: ReactNode;
  colorClass: string;
  className?: string;
  rotation?: number;
  delay?: number;
}

export default function FloatingCard({
  variant = "standard",
  label,
  icon,
  colorClass,
  className,
  rotation = 0,
  delay = 0,
}: FloatingCardProps) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Check screen size on mount and on resize
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Entrance animation + subtle continuous floating
  const animations = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: [0, -10, 0], // The continuous float
    },
    transition: {
      opacity: { duration: 0.6, delay },
      y: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay, // stagger the floating so they don't move uniformly
      },
    },
  };
  
  // Only apply rotation on large screens for better mobile stacking
  const rotationStyle = isLargeScreen ? { rotate: `${rotation}deg` } : {};

  if (variant === "portal") {
    return (
      <motion.div
        {...animations}
        style={rotationStyle}
        className={cn(
          "flex items-start gap-3 rounded-full px-6 py-4 shadow-xl backdrop-blur-sm",
          colorClass,
          className
        )}
      >
        <div className="h-10 w-1 shrink-0 rounded-full bg-orange-400" />
        {/* Placeholder Avatar */}
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white/20 bg-gray-200">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=transparent" 
            alt="Avatar" 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-slate-900">John Doe - Portal</span>
          <span className="text-slate-700 max-w-45 leading-tight mt-0.5">
            Hey! Could you please review a document for me?
          </span>
          <span className="text-slate-500 text-xs mt-1">MAT-2233 - 2 h ago</span>
        </div>
      </motion.div>
    );
  }

  // Standard Pill Variant
  return (
    <motion.div
      {...animations}
      style={rotationStyle}
      className={cn(
        "flex items-center gap-3 rounded-full px-8 py-4 shadow-xl backdrop-blur-sm text-lg font-medium",
        colorClass,
        className
      )}
    >
      {icon}
      <span>{label}</span>
    </motion.div>
  );
}