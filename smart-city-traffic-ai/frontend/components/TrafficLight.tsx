"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Radio, AlertOctagon, Timer, Zap } from "lucide-react";

interface TrafficLightProps {
  congestionLevel: string;
}

export default function TrafficLight({ congestionLevel }: TrafficLightProps) {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const level = congestionLevel?.toLowerCase();

  // Active light logic based on Section 20
  const isRed = level === "severe" || level === "high";
  const isYellow = level === "moderate" || level === "high";
  const isGreen = level === "low";

  const getStatusText = () => {
    if (level === "severe") return "HOLD / EMERGENCY HOLD";
    if (level === "high") return "RESTRICTED / PRIORITY TRANSITION";
    if (level === "moderate") return "ADAPTIVE TIMING ACTIVE";
    return "CLEAR CORRIDOR / GREEN FLOW";
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-cyan-500/20 flex flex-col items-center justify-between shadow-xl">
      <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs font-mono">
        <span className="text-gray-400 uppercase tracking-widest flex items-center space-x-1.5">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>SIGNAL STATUS</span>
        </span>
        <span className="text-cyan-400 font-bold flex items-center space-x-1">
          <Timer className="w-3.5 h-3.5 text-cyan-400" />
          <span>{secondsRemaining}s</span>
        </span>
      </div>

      {/* Physical Traffic Signal Housing */}
      <div className="w-24 bg-[#0a0f18] p-3.5 rounded-2xl border-2 border-slate-700 shadow-2xl flex flex-col items-center space-y-3.5 my-2">
        {/* RED LIGHT */}
        <div className="relative">
          <motion.div
            animate={isRed ? { scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] } : { opacity: 0.2 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-14 h-14 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
              isRed
                ? "bg-rose-600 border-rose-400 shadow-[0_0_24px_rgba(239,68,68,0.8)]"
                : "bg-rose-950/40 border-rose-900/50"
            }`}
          >
            {isRed && <div className="w-5 h-5 rounded-full bg-white/40 blur-[2px]" />}
          </motion.div>
        </div>

        {/* YELLOW / AMBER LIGHT */}
        <div className="relative">
          <motion.div
            animate={isYellow ? { scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] } : { opacity: 0.2 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-14 h-14 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
              isYellow
                ? "bg-amber-500 border-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.8)]"
                : "bg-amber-950/40 border-amber-900/50"
            }`}
          >
            {isYellow && <div className="w-5 h-5 rounded-full bg-white/40 blur-[2px]" />}
          </motion.div>
        </div>

        {/* GREEN LIGHT */}
        <div className="relative">
          <motion.div
            animate={isGreen ? { scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] } : { opacity: 0.2 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-14 h-14 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
              isGreen
                ? "bg-emerald-500 border-emerald-300 shadow-[0_0_24px_rgba(16,185,129,0.8)]"
                : "bg-emerald-950/40 border-emerald-900/50"
            }`}
          >
            {isGreen && <div className="w-5 h-5 rounded-full bg-white/40 blur-[2px]" />}
          </motion.div>
        </div>
      </div>

      {/* Signal Status Description */}
      <div className="mt-4 text-center">
        <span
          className={`text-xs font-mono font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${
            isRed
              ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
              : isYellow
              ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
              : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
          }`}
        >
          {getStatusText()}
        </span>
      </div>
    </div>
  );
}

