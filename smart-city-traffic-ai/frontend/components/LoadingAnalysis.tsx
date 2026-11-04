"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Radar, Activity, Sparkles } from "lucide-react";

export default function LoadingAnalysis() {
  const models = [
    "Linear Regression (Flow Rate)",
    "Logistic Regression (Congestion Class)",
    "Decision Tree Classifier (max_depth=10)",
    "Random Forest Ensemble (200 Trees)",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="my-10 max-w-2xl mx-auto glass-panel rounded-3xl p-8 border border-cyan-500/30 text-center relative overflow-hidden shadow-2xl shadow-cyan-950/60"
    >
      {/* Background Scanning Radar Radial */}
      <div className="absolute inset-0 bg-radar-radial pointer-events-none" />

      {/* Cyber Sweep Line */}
      <motion.div
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-75 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Radar Pulse Icon */}
        <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping" />
          <div className="absolute inset-2 rounded-full border border-cyan-400/50 animate-pulse" />
          <div className="w-14 h-14 rounded-full bg-cyan-950/90 border border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Cpu className="w-7 h-7 text-cyan-400 animate-spin" />
          </div>
        </div>

        {/* Loading Titles */}
        <h3 className="text-xl sm:text-2xl font-black tracking-widest text-white uppercase font-mono mb-2 flex items-center space-x-2">
          <span>ANALYZING TRAFFIC</span>
          <span className="flex space-x-1">
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}>.</motion.span>
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }}>.</motion.span>
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.6 }}>.</motion.span>
          </span>
        </h3>

        <p className="text-xs sm:text-sm font-mono text-cyan-300 tracking-wider uppercase mb-6 flex items-center space-x-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-bounce" />
          <span>RUNNING 4 AI MODELS IN PARALLEL</span>
        </p>

        {/* Progress Pipeline Pills */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left text-xs font-mono">
          {models.map((mod, i) => (
            <div
              key={i}
              className="p-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/20 flex items-center space-x-2.5"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-gray-300 truncate">{mod}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

