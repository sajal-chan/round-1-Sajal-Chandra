"use client";

import { Gavel, FileText, CheckSquare, Receipt } from "lucide-react";
import FloatingCard from "./FloatingCards";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#f8f9fc] dark:bg-zinc-900 transition-colors duration-300 flex items-center">
      {/* Blurred Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-400/20 dark:bg-indigo-600/10 blur-[100px] pointer-events-none" />

      {/* Dark Mode Toggle (For showcase purposes) */}
      {mounted && (
        <button
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          className="absolute z-50 top-6 right-6 px-4 py-2 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-sm border border-gray-200 dark:border-gray-800 text-sm font-medium"
        >
          Toggle {resolvedTheme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
      )}

      <div className="container mx-auto max-w-7xl px-6 py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text Content */}
          <div className="z-10 flex flex-col gap-6 max-w-xl">
            <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight text-slate-400 dark:text-slate-300">
              A single platform to <br />
              <span className="text-slate-800 dark:text-white font-bold">manage </span> 
              every part of <br />
              your <span className="text-slate-800 dark:text-white font-bold">legal work</span>
            </h1>
            <p className="text-lg lg:text-xl text-blue-600 dark:text-blue-400 leading-relaxed pr-8">
              Track matters, coordinate schedules, manage clients, centralize documents, and handle communication - all in one system.
            </p>
          </div>

          {/* Right Column: Floating Elements */}
          {/* Mobile: Stacks vertically. Desktop/LG: Absolute positioning playground */}
          <div className="relative z-10 w-full h-125 lg:h-175 flex flex-col gap-4 lg:block">
            
            <FloatingCard
              label="Billing"
              icon={<Receipt className="w-6 h-6" />}
              colorClass="bg-blue-600 text-white"
              className="lg:absolute lg:top-[15%] lg:left-[10%] lg:rotate-[-8deg] hover:scale-105 transition-transform"
              delay={0.1}
            />

            <FloatingCard
              label="Matters"
              icon={<Gavel className="w-6 h-6" />}
              colorClass="bg-[#d97736] text-white"
              className="lg:absolute lg:top-[50%] lg:left-[-5%] lg:rotate-[8deg] hover:scale-105 transition-transform"
              delay={0.2}
            />

            <FloatingCard
              variant="portal"
              colorClass="bg-[#a3a3e6]"
              className="lg:absolute lg:top-[60%] lg:left-[35%] lg:-rotate-2 hover:scale-105 transition-transform"
              delay={0.3}
            />

            <FloatingCard
              label="Tasks"
              icon={<CheckSquare className="w-6 h-6" />}
              colorClass="bg-[#2a2438] text-orange-400"
              className="lg:absolute lg:bottom-[5%] lg:left-[20%] lg:rotate-[-4deg] hover:scale-105 transition-transform"
              delay={0.4}
            />

            <FloatingCard
              label="Documents"
              icon={<FileText className="w-6 h-6" />}
              colorClass="bg-[#332732] text-amber-500"
              className="lg:absolute lg:bottom-[10%] lg:right-[5%] lg:-rotate-12 hover:scale-105 transition-transform"
              delay={0.5}
            />

            {/* Decorative white/transparent background pills visible in the design */}
            <div className="hidden lg:block absolute top-[5%] right-0 w-64 h-16 rounded-full bg-white/40 dark:bg-white/5 blur-sm rotate-3" />
            <div className="hidden lg:block absolute top-[25%] right-[-10%] w-72 h-16 rounded-full bg-white/40 dark:bg-white/5 blur-sm -rotate-2" />
            <div className="hidden lg:block absolute top-[45%] right-[10%] w-48 h-16 rounded-full bg-white/40 dark:bg-white/5 blur-sm rotate-6" />

          </div>
        </div>
      </div>
    </section>
  );
}