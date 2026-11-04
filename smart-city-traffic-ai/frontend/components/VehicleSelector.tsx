"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Gauge, Truck, Layers, Info, CheckCircle2 } from "lucide-react";

export type VehicleScenario = "sports" | "truck" | "mixed";

interface VehicleSelectorProps {
  selectedScenario: VehicleScenario;
  onSelectScenario: (scenario: VehicleScenario) => void;
}

export default function VehicleSelector({
  selectedScenario,
  onSelectScenario,
}: VehicleSelectorProps) {
  const cards = [
    {
      id: "sports" as VehicleScenario,
      title: "SPORTS CAR",
      subtitle: "High-Speed Dynamic Flow Scenario",
      image: "/images/sports-car.png",
      tag: "Rapid Arterial Corridors",
      speed: "68 km/h Avg",
      density: "75 Density",
      icon: Gauge,
      color: "from-cyan-500/20 to-blue-600/30",
      activeBorder: "border-cyan-400 shadow-cyan-500/30",
    },
    {
      id: "truck" as VehicleScenario,
      title: "HEAVY TRUCK",
      subtitle: "High-Payload Commercial Freight Corridor",
      image: "/images/heavy-truck.png",
      tag: "Logistics Artery",
      speed: "18 km/h Avg",
      density: "185 Density",
      icon: Truck,
      color: "from-slate-600/20 to-zinc-700/30",
      activeBorder: "border-emerald-400 shadow-emerald-500/30",
    },
    {
      id: "mixed" as VehicleScenario,
      title: "MIXED TRAFFIC",
      subtitle: "Dense Metropolitan Commute Congestion",
      images: ["/images/sports-car.png", "/images/heavy-truck.png"],
      tag: "City Center Gridlock",
      speed: "25 km/h Avg",
      density: "140 Density",
      icon: Layers,
      color: "from-purple-500/20 to-indigo-600/30",
      activeBorder: "border-indigo-400 shadow-indigo-500/30",
    },
  ];

  return (
    <section id="scenario-section" className="py-12 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
          <span>STEP 1: SELECT TRAFFIC SCENARIO</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          VEHICLE SCENARIO SIMULATION
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-400">
          Choose a mobility profile to visualize and auto-tune urban congestion variables.
        </p>

        {/* Disclaimer as required in Section 3 */}
        <div className="mt-3 inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-300 text-xs">
          <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span>
            <strong>Visual Scenario Representation:</strong> Vehicle assets visually represent scenario profiles; actual predictions are computed purely from 23 tabular traffic features.
          </span>
        </div>
      </div>

      {/* 3 Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const isSelected = selectedScenario === card.id;
          const IconComponent = card.icon;

          return (
            <motion.div
              key={card.id}
              onClick={() => onSelectScenario(card.id)}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`relative cursor-pointer rounded-2xl p-5 backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                isSelected
                  ? `bg-slate-900/90 ${card.activeBorder} shadow-2xl ring-2 ring-cyan-400/40`
                  : "bg-slate-900/50 border-slate-700/60 hover:border-cyan-500/40 hover:bg-slate-900/70"
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-4 right-4 z-20 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SELECTED</span>
                </div>
              )}

              {/* Card Header */}
              <div className="flex items-center space-x-3 mb-4 z-10">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                    isSelected
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                      : "bg-slate-800 border-slate-700 text-gray-400"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-wide text-white">
                    {card.title}
                  </h3>
                  <span className="text-xs font-mono text-cyan-400/90">
                    {card.tag}
                  </span>
                </div>
              </div>

              {/* Vehicle Image Container with Framer Motion Zoom */}
              <div className="relative h-44 w-full rounded-xl bg-gradient-to-b from-[#0a1220] to-[#040810] border border-cyan-500/10 flex items-center justify-center overflow-hidden my-2 group">
                {card.image ? (
                  <motion.div
                    animate={isSelected ? { scale: [1, 1.05, 1], rotate: [0, 1, 0] } : { scale: 1 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full p-2"
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] group-hover:scale-108 transition-transform duration-500"
                    />
                  </motion.div>
                ) : (
                  /* Mixed Traffic: Dual Vehicle Presentation */
                  <div className="relative w-full h-full flex items-center justify-center p-2">
                    <motion.div
                      animate={isSelected ? { x: [-2, 2, -2] } : {}}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="relative w-1/2 h-full"
                    >
                      <Image
                        src={card.images![0]}
                        alt="Sports Car"
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                    <motion.div
                      animate={isSelected ? { x: [2, -2, 2] } : {}}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="relative w-1/2 h-full"
                    >
                      <Image
                        src={card.images![1]}
                        alt="Heavy Truck"
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Subtitle & Preset Indicators */}
              <div className="mt-3 z-10">
                <p className="text-xs text-slate-300 font-light mb-3">{card.subtitle}</p>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
                    <span className="text-gray-400 block text-[10px]">SPEED PROFILE</span>
                    <span className="text-cyan-300 font-bold">{card.speed}</span>
                  </div>
                  <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
                    <span className="text-gray-400 block text-[10px]">DENSITY RATIO</span>
                    <span className="text-amber-300 font-bold">{card.density}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

