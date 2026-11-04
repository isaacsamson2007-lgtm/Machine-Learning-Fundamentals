"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Cpu, Sparkles, Zap, Navigation } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  onAnalyzeClick: () => void;
}

export default function Hero({ onAnalyzeClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-8 px-4 lg:px-8 overflow-hidden bg-gradient-to-b from-[#050b14] via-[#091528] to-[#040810]"
    >
      {/* Background Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Top Content */}
      <div className="relative max-w-6xl mx-auto text-center mt-8 z-10">
        {/* Subtle Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-6 shadow-lg shadow-cyan-950/40"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>Autonomous Urban Mobility Platform</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-white drop-shadow-md"
        >
          SMART CITY
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            TRAFFIC INTELLIGENCE
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed"
        >
          AI-powered traffic prediction and congestion management.
          <br />
          <span className="text-sm sm:text-base text-cyan-200/80 font-mono">
            Four AI models. One intelligent traffic management platform.
          </span>
        </motion.p>

        {/* Primary CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onAnalyzeClick}
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-400 text-black font-black tracking-wider uppercase text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center space-x-3 cursor-pointer"
          >
            <Zap className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
            <span>ANALYZE TRAFFIC</span>
            <ArrowDown className="w-4 h-4 text-black group-hover:translate-y-1 transition-transform" />
          </button>

          <a
            href="#models-section"
            className="px-6 py-4 rounded-xl bg-slate-900/80 border border-slate-700/80 text-gray-300 hover:text-white hover:border-cyan-500/40 font-mono text-xs tracking-wider uppercase transition flex items-center space-x-2"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Inspect 4 ML Architectures</span>
          </a>
        </motion.div>
      </div>

      {/* Animated Road Graphics Section */}
      <div className="relative w-full max-w-7xl mx-auto mt-12 z-10">
        <div className="text-center mb-3 flex items-center justify-center space-x-2">
          <Navigation className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400/80">
            Smart Highway Corridor Arterial Arterial 4-Lane Simulation
          </span>
        </div>

        {/* 2-Lane Roadway with Moving Vehicles */}
        <div className="relative w-full h-36 sm:h-44 bg-[#0a0f18] rounded-2xl border-y-2 border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-950/60 flex flex-col justify-between p-2">
          {/* Top Road Edge Glow */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />

          {/* Lane 1 (Fast Lane: Sports Car) */}
          <div className="relative h-1/2 w-full flex items-center overflow-hidden border-b border-dashed border-cyan-500/20">
            {/* Animated dashed line on the road */}
            <div className="absolute inset-0 animated-road-line opacity-40 pointer-events-none" />

            {/* Fast Sports Car Animation moving across */}
            <motion.div
              animate={{
                x: ["-20%", "120%"],
              }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute flex items-center space-x-3 cursor-pointer group"
            >
              <div className="relative w-36 h-20 sm:w-44 sm:h-24 filter drop-shadow-[0_4px_12px_rgba(0,210,255,0.45)] group-hover:scale-105 transition-transform">
                <Image
                  src="/images/sports-car.png"
                  alt="Sports Car"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-[9px] font-mono text-cyan-300 whitespace-nowrap">
                SPORTS CAR • 68 km/h
              </div>
            </motion.div>
          </div>

          {/* Lane 2 (Heavy Freight Lane: Semi-Truck) */}
          <div className="relative h-1/2 w-full flex items-center overflow-hidden">
            {/* Moving White Semi Truck */}
            <motion.div
              animate={{
                x: ["-25%", "115%"],
              }}
              transition={{
                duration: 19,
                repeat: Infinity,
                ease: "linear",
                delay: 2,
              }}
              className="absolute flex items-center space-x-3 cursor-pointer group"
            >
              <div className="relative w-48 h-20 sm:w-56 sm:h-24 filter drop-shadow-[0_4px_12px_rgba(255,255,255,0.3)] group-hover:scale-105 transition-transform">
                <Image
                  src="/images/heavy-truck.png"
                  alt="Heavy Truck"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block px-2 py-0.5 rounded bg-slate-900/80 border border-slate-600 text-[9px] font-mono text-slate-300 whitespace-nowrap">
                HEAVY TRUCK • 32 km/h
              </div>
            </motion.div>
          </div>

          {/* Bottom Road Edge Glow */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70" />
        </div>
      </div>

      {/* Live System Metric Bar at bottom of Hero */}
      <div className="relative max-w-5xl mx-auto w-full mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
        <div className="glass-card py-2.5 px-3 rounded-lg border border-cyan-500/15">
          <p className="text-[10px] font-mono text-gray-400 uppercase">ML Architectures</p>
          <p className="text-lg font-bold font-mono text-cyan-300">4 Synchronous</p>
        </div>
        <div className="glass-card py-2.5 px-3 rounded-lg border border-cyan-500/15">
          <p className="text-[10px] font-mono text-gray-400 uppercase">Model Accuracy</p>
          <p className="text-lg font-bold font-mono text-emerald-400">98.2% Stratified</p>
        </div>
        <div className="glass-card py-2.5 px-3 rounded-lg border border-cyan-500/15">
          <p className="text-[10px] font-mono text-gray-400 uppercase">Inference Engine</p>
          <p className="text-lg font-bold font-mono text-blue-300">Node + Python IPC</p>
        </div>
        <div className="glass-card py-2.5 px-3 rounded-lg border border-cyan-500/15">
          <p className="text-[10px] font-mono text-gray-400 uppercase">Urban Telemetry</p>
          <p className="text-lg font-bold font-mono text-amber-300">23 Active Sensors</p>
        </div>
      </div>
    </section>
  );
}

