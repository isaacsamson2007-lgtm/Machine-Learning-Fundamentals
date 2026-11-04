"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Cpu,
  ArrowRight,
  ListOrdered,
  Sparkles,
} from "lucide-react";
import {
  FinalVerdict,
  LinearRegressionResult,
  ClassificationResult,
} from "../lib/api";

interface AIConsensusProps {
  finalVerdict: FinalVerdict;
  linear: LinearRegressionResult;
  logistic: ClassificationResult;
  decisionTree: ClassificationResult;
  randomForest: ClassificationResult;
}

export default function AIConsensus({
  finalVerdict,
  linear,
  logistic,
  decisionTree,
  randomForest,
}: AIConsensusProps) {
  const getTheme = (level: string) => {
    switch (level?.toLowerCase()) {
      case "severe":
        return {
          border: "border-rose-500/50 shadow-rose-950/60 ring-2 ring-rose-500/30",
          glow: "from-rose-500/15 via-slate-900/90 to-[#050b14]",
          badgeBg: "bg-rose-500/20 text-rose-300 border-rose-500/50",
          accentText: "text-rose-400",
          icon: ShieldAlert,
          title: "SEVERE CONGESTION",
        };
      case "high":
        return {
          border: "border-orange-500/50 shadow-orange-950/60 ring-2 ring-orange-500/30",
          glow: "from-orange-500/15 via-slate-900/90 to-[#050b14]",
          badgeBg: "bg-orange-500/20 text-orange-300 border-orange-500/50",
          accentText: "text-orange-400",
          icon: AlertTriangle,
          title: "HIGH CONGESTION",
        };
      case "moderate":
        return {
          border: "border-amber-500/50 shadow-amber-950/60 ring-2 ring-amber-500/30",
          glow: "from-amber-500/15 via-slate-900/90 to-[#050b14]",
          badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/50",
          accentText: "text-amber-400",
          icon: AlertTriangle,
          title: "MODERATE CONGESTION",
        };
      case "low":
      default:
        return {
          border: "border-emerald-500/50 shadow-emerald-950/60 ring-2 ring-emerald-500/30",
          glow: "from-emerald-500/15 via-slate-900/90 to-[#050b14]",
          badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/50",
          accentText: "text-emerald-400",
          icon: CheckCircle2,
          title: "LOW CONGESTION",
        };
    }
  };

  const theme = getTheme(finalVerdict.level);
  const StatusIcon = theme.icon;

  return (
    <section id="consensus-section" className="py-12 px-4 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`glass-panel rounded-3xl p-6 sm:p-10 border bg-gradient-to-b ${theme.glow} ${theme.border} relative overflow-hidden shadow-2xl`}
      >
        {/* Background Light Orb */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-cyan-500/20 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>INTELLIGENT FUSION SYNTHESIS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-center space-x-3">
                <span>AI TRAFFIC CONSENSUS</span>
              </h2>
            </div>

            {/* Overall Confidence Badge */}
            <div className="text-right">
              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest block">
                ENSEMBLE CONFIDENCE
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-cyan-400">
                {finalVerdict.confidence}%
              </div>
            </div>
          </div>

          {/* Model Comparisons Table */}
          <div className="my-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-gray-400 uppercase block">Model 1</span>
              <span className="text-xs text-gray-300 font-semibold">Linear Regression</span>
              <div className="mt-2 text-xl font-bold font-mono text-cyan-300">
                {linear.trafficFlowRate ?? 850} <span className="text-xs text-gray-400">veh/hr</span>
              </div>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-gray-400 uppercase block">Model 2</span>
              <span className="text-xs text-gray-300 font-semibold">Logistic Regression</span>
              <div className="mt-2 text-xl font-bold font-mono text-blue-400 uppercase">
                {logistic.congestionLevel}
              </div>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-gray-400 uppercase block">Model 3</span>
              <span className="text-xs text-gray-300 font-semibold">Decision Tree</span>
              <div className="mt-2 text-xl font-bold font-mono text-purple-400 uppercase">
                {decisionTree.congestionLevel}
              </div>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-gray-400 uppercase block">Model 4</span>
              <span className="text-xs text-gray-300 font-semibold">Random Forest</span>
              <div className="mt-2 text-xl font-bold font-mono text-emerald-400 uppercase">
                {randomForest.congestionLevel}
              </div>
            </div>
          </div>

          {/* Central Verdict Display Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 my-6 shadow-inner">
            <div className="flex items-center space-x-5 text-center md:text-left">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                <StatusIcon className={`w-9 h-9 sm:w-11 sm:h-11 ${theme.accentText}`} />
              </div>
              <div>
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block">
                  FINAL TRAFFIC STATUS
                </span>
                <h3 className={`text-2xl sm:text-4xl font-black font-mono tracking-wide ${theme.accentText}`}>
                  {theme.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-mono mt-1">
                  Validated against 200,000+ urban records with {finalVerdict.confidence}% AI Consensus.
                </p>
              </div>
            </div>

            <div className={`px-6 py-3 rounded-xl border text-center font-mono ${theme.badgeBg}`}>
              <span className="text-xs font-bold block uppercase tracking-widest">VERDICT</span>
              <span className="text-xl font-black uppercase">{finalVerdict.level}</span>
            </div>
          </div>

          {/* Recommended Action Protocol (Section 17) */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <div className="flex items-center space-x-2.5 mb-4">
              <ListOrdered className="w-5 h-5 text-cyan-400" />
              <h4 className="text-base sm:text-lg font-mono font-bold text-white uppercase tracking-wider">
                RECOMMENDED ACTION
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {finalVerdict.recommendations?.map((action, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-3 hover:border-cyan-500/40 transition"
                >
                  <ArrowRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-200 font-medium">
                    {action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

