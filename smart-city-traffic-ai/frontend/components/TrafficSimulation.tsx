"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Video, Radio, Building2, Flame, Eye } from "lucide-react";

interface TrafficSimulationProps {
  congestionLevel: string;
  vehicleCount: number;
}

export default function TrafficSimulation({
  congestionLevel,
  vehicleCount,
}: TrafficSimulationProps) {
  const isHighOrSevere =
    congestionLevel?.toLowerCase() === "high" ||
    congestionLevel?.toLowerCase() === "severe";

  // Durations modulate according to congestion: severe is slow crawled traffic; low is fast flow
  const carDuration = isHighOrSevere ? 18 : 8;
  const truckDuration = isHighOrSevere ? 26 : 14;

  return (
    <section id="simulation-section" className="py-12 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
          <Eye className="w-3.5 h-3.5" />
          <span>CYBERNETIC TWIN SIMULATOR</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          LIVE TRAFFIC SIMULATION
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-400">
          Real-time physical arterial simulation adapting dynamically to computed congestion density.
        </p>
      </div>

      {/* Cyber City Backdrop with Roadway */}
      <div className="glass-panel rounded-3xl p-6 border border-cyan-500/30 overflow-hidden shadow-2xl relative bg-[#070d18]">
        {/* City Skyline Silhouette Backdrop */}
        <div className="relative h-20 w-full flex items-end justify-between px-4 border-b border-cyan-500/20 opacity-40 pointer-events-none mb-3">
          <div className="w-12 h-14 bg-slate-800 rounded-t-sm" />
          <div className="w-8 h-18 bg-slate-700 rounded-t-sm" />
          <div className="w-16 h-12 bg-slate-800 rounded-t-sm" />
          <div className="w-20 h-20 bg-slate-700 rounded-t-sm" />
          <div className="w-10 h-10 bg-slate-800 rounded-t-sm" />
          <div className="w-14 h-16 bg-slate-700 rounded-t-sm" />
          <div className="w-24 h-15 bg-slate-800 rounded-t-sm" />
          <div className="w-12 h-19 bg-slate-700 rounded-t-sm" />
        </div>

        {/* Smart Infrastructure Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-xs font-mono text-gray-300">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-cyan-400 font-bold">4 SMART CAMERAS ACTIVE</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">STREET LIGHT GRID: 100% ILLUMINATED</span>
            <span className="text-amber-400 font-bold">
              SPEED REGULATION: {isHighOrSevere ? "25 km/h LIMIT" : "60 km/h OPTIMAL"}
            </span>
          </div>
        </div>

        {/* 4-Lane Highway Roadway */}
        <div className="relative w-full h-80 bg-[#060a12] rounded-2xl border-y-4 border-cyan-500/40 overflow-hidden flex flex-col justify-between shadow-inner">
          {/* Street Lights Overheads */}
          <div className="absolute top-2 left-0 right-0 flex justify-around pointer-events-none z-20">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#00d2ff]" />
                <div className="w-[1px] h-3 bg-cyan-400/40" />
              </div>
            ))}
          </div>

          {/* Lane 1: Fast Lane (Sports Cars) */}
          <div className="relative h-1/4 w-full flex items-center border-b border-dashed border-cyan-500/20">
            <div className="absolute inset-0 animated-road-line opacity-30 pointer-events-none" />
            <motion.div
              animate={{ x: ["-25%", "115%"] }}
              transition={{ duration: carDuration, repeat: Infinity, ease: "linear" }}
              className="absolute flex items-center space-x-2"
            >
              <div className="relative w-32 h-16 sm:w-40 sm:h-20 filter drop-shadow-[0_4px_10px_rgba(0,210,255,0.5)]">
                <Image src="/images/sports-car.png" alt="Sports Car" fill className="object-contain" />
              </div>
            </motion.div>

            {/* Second Car if High Congestion */}
            {isHighOrSevere && (
              <motion.div
                animate={{ x: ["-25%", "115%"] }}
                transition={{ duration: carDuration, delay: carDuration / 2, repeat: Infinity, ease: "linear" }}
                className="absolute flex items-center space-x-2"
              >
                <div className="relative w-32 h-16 sm:w-40 sm:h-20 filter drop-shadow-[0_4px_10px_rgba(0,210,255,0.5)]">
                  <Image src="/images/sports-car.png" alt="Sports Car" fill className="object-contain" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Lane 2: Commercial Freight Lane (Heavy Trucks) */}
          <div className="relative h-1/4 w-full flex items-center border-b border-dashed border-cyan-500/20">
            <div className="absolute inset-0 animated-road-line opacity-30 pointer-events-none" />
            <motion.div
              animate={{ x: ["-30%", "115%"] }}
              transition={{ duration: truckDuration, repeat: Infinity, ease: "linear", delay: 1 }}
              className="absolute flex items-center space-x-2"
            >
              <div className="relative w-44 h-16 sm:w-52 sm:h-20 filter drop-shadow-[0_4px_10px_rgba(255,255,255,0.3)]">
                <Image src="/images/heavy-truck.png" alt="Heavy Truck" fill className="object-contain" />
              </div>
            </motion.div>
          </div>

          {/* Lane 3: Heavy Truck Conveyor */}
          <div className="relative h-1/4 w-full flex items-center border-b border-dashed border-cyan-500/20">
            <div className="absolute inset-0 animated-road-line opacity-30 pointer-events-none" />
            <motion.div
              animate={{ x: ["-30%", "115%"] }}
              transition={{ duration: truckDuration + 3, repeat: Infinity, ease: "linear", delay: 4 }}
              className="absolute flex items-center space-x-2"
            >
              <div className="relative w-44 h-16 sm:w-52 sm:h-20 filter drop-shadow-[0_4px_10px_rgba(255,255,255,0.3)]">
                <Image src="/images/heavy-truck.png" alt="Heavy Truck" fill className="object-contain" />
              </div>
            </motion.div>

            {/* Extra Truck if Severe Congestion */}
            {congestionLevel?.toLowerCase() === "severe" && (
              <motion.div
                animate={{ x: ["-30%", "115%"] }}
                transition={{ duration: truckDuration + 3, delay: (truckDuration + 3) / 2, repeat: Infinity, ease: "linear" }}
                className="absolute flex items-center space-x-2"
              >
                <div className="relative w-44 h-16 sm:w-52 sm:h-20 filter drop-shadow-[0_4px_10px_rgba(255,255,255,0.3)]">
                  <Image src="/images/heavy-truck.png" alt="Heavy Truck" fill className="object-contain" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Lane 4: Outbound Rapid Corridor */}
          <div className="relative h-1/4 w-full flex items-center">
            <motion.div
              animate={{ x: ["-25%", "115%"] }}
              transition={{ duration: carDuration - 2, repeat: Infinity, ease: "linear", delay: 2 }}
              className="absolute flex items-center space-x-2"
            >
              <div className="relative w-32 h-16 sm:w-40 sm:h-20 filter drop-shadow-[0_4px_10px_rgba(0,210,255,0.5)]">
                <Image src="/images/sports-car.png" alt="Sports Car" fill className="object-contain" />
              </div>
            </motion.div>
          </div>

          {/* Smart Traffic Camera Sensors Mounted Along Highway */}
          <div className="absolute right-12 top-6 z-30 p-2 rounded-xl bg-slate-900/90 border border-cyan-500/50 shadow-xl flex items-center space-x-2 text-[10px] font-mono text-cyan-300">
            <Video className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>AI CCTV #401: OPTICAL FLOW ACTIVE</span>
          </div>
        </div>
      </div>
    </section>
  );
}

