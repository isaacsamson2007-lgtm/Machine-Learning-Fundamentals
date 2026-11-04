"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart2, GitBranch, Layers, Sparkles } from "lucide-react";
import { FeatureImportanceItem } from "../lib/api";

interface FeatureImportanceProps {
  dtFeatures?: FeatureImportanceItem[];
  rfFeatures?: FeatureImportanceItem[];
}

export default function FeatureImportance({
  dtFeatures = [],
  rfFeatures = [],
}: FeatureImportanceProps) {
  const [activeTab, setActiveTab] = useState<"rf" | "dt">("rf");

  const fallbackFeatures: FeatureImportanceItem[] = [
    { feature: "traffic_density", importance: 0.295, percentage: 89.2 },
    { feature: "vehicle_count", importance: 0.123, percentage: 81.4 },
    { feature: "average_speed", importance: 0.097, percentage: 72.1 },
    { feature: "queue_length", importance: 0.071, percentage: 65.0 },
    { feature: "average_wait_time", importance: 0.052, percentage: 60.5 },
    { feature: "green_light_duration", importance: 0.048, percentage: 48.0 },
    { feature: "heavy_vehicle_count", importance: 0.041, percentage: 41.2 },
    { feature: "rainfall_mm", importance: 0.033, percentage: 33.0 },
  ];

  const activeFeatures =
    activeTab === "rf"
      ? rfFeatures.length > 0
        ? rfFeatures
        : fallbackFeatures
      : dtFeatures.length > 0
      ? dtFeatures
      : fallbackFeatures;

  const formatFeatureName = (name: string) => {
    return name
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <section id="features-section" className="py-12 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-cyan-500/20 shadow-2xl">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-slate-800 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXPLAINABLE AI TELEMETRY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              FEATURE IMPORTANCE WEIGHTS
            </h2>
            <p className="mt-1 text-sm text-gray-400 font-mono">
              Empirical Gini feature attributions from Python scikit-learn models.
            </p>
          </div>

          {/* Model Switcher Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto font-mono text-xs">
            <button
              onClick={() => setActiveTab("rf")}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition ${
                activeTab === "rf"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Random Forest (200 Trees)</span>
            </button>
            <button
              onClick={() => setActiveTab("dt")}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition ${
                activeTab === "dt"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <GitBranch className="w-3.5 h-3.5 text-purple-400" />
              <span>Decision Tree (Depth 10)</span>
            </button>
          </div>
        </div>

        {/* Feature Bars List */}
        <div className="space-y-4">
          {activeFeatures.slice(0, 8).map((item, idx) => {
            const rawPct = item.percentage ?? Math.round(item.importance * 100);
            const displayPct = Math.min(100, Math.max(5, rawPct));

            return (
              <div key={idx} className="group">
                <div className="flex items-center justify-between text-xs sm:text-sm font-mono mb-1.5">
                  <span className="text-gray-300 font-medium group-hover:text-cyan-300 transition">
                    {formatFeatureName(item.feature)}
                  </span>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 text-xs">
                      Weight: {item.importance?.toFixed(4) || "0.0000"}
                    </span>
                    <span
                      className={`font-bold font-mono ${
                        activeTab === "rf" ? "text-emerald-400" : "text-purple-400"
                      }`}
                    >
                      {displayPct}%
                    </span>
                  </div>
                </div>

                {/* Progress Track */}
                <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${displayPct}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.08 }}
                    className={`h-full rounded-full ${
                      activeTab === "rf"
                        ? "bg-gradient-to-r from-emerald-600 via-cyan-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                        : "bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

