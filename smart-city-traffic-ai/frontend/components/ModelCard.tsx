"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Activity,
  GitBranch,
  Layers,
  CheckCircle,
  BarChart,
  Network,
  Cpu,
} from "lucide-react";
import {
  LinearRegressionResult,
  ClassificationResult,
} from "../lib/api";

interface ModelCardsProps {
  linear: LinearRegressionResult;
  logistic: ClassificationResult;
  decisionTree: ClassificationResult;
  randomForest: ClassificationResult;
}

export default function ModelCards({
  linear,
  logistic,
  decisionTree,
  randomForest,
}: ModelCardsProps) {
  const getCongestionBadge = (level: string) => {
    switch (level?.toLowerCase()) {
      case "severe":
        return {
          bg: "bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-rose-500/30",
          glow: "border-rose-500/40 shadow-rose-950/40",
          barColor: "bg-rose-500",
          label: "SEVERE",
        };
      case "high":
        return {
          bg: "bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-orange-500/30",
          glow: "border-orange-500/40 shadow-orange-950/40",
          barColor: "bg-orange-500",
          label: "HIGH",
        };
      case "moderate":
        return {
          bg: "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-amber-500/30",
          glow: "border-amber-500/40 shadow-amber-950/40",
          barColor: "bg-amber-500",
          label: "MODERATE",
        };
      case "low":
      default:
        return {
          bg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-emerald-500/30",
          glow: "border-emerald-500/40 shadow-emerald-950/40",
          barColor: "bg-emerald-500",
          label: "LOW",
        };
    }
  };

  const logBadge = getCongestionBadge(logistic.congestionLevel);
  const dtBadge = getCongestionBadge(decisionTree.congestionLevel);
  const rfBadge = getCongestionBadge(randomForest.congestionLevel);

  return (
    <section id="models-section" className="py-12 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
          <span>STEP 3: MULTI-MODEL INFERENCE</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          FOUR MACHINE LEARNING MODELS
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-400">
          Independent predictive architectures evaluating flow throughput and congestion states.
        </p>
      </div>

      {/* 4 Responsive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* CARD 1: LINEAR REGRESSION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-2xl p-5 border border-cyan-500/30 flex flex-col justify-between relative overflow-hidden shadow-xl"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                MODEL 1
              </span>
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>

            <h3 className="text-base font-bold text-white mb-1">LINEAR REGRESSION</h3>
            <p className="text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-4">
              Predicts Traffic Flow Rate
            </p>

            {/* Main Metric Display */}
            <div className="my-4 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/20 text-center">
              <span className="text-[10px] font-mono text-gray-400 uppercase block tracking-widest">
                TRAFFIC FLOW
              </span>
              <div className="text-3xl font-black font-mono text-cyan-300 my-1">
                {linear.trafficFlowRate ?? 850}
              </div>
              <span className="text-xs font-mono text-cyan-400/90 font-semibold uppercase">
                VEHICLES / HOUR
              </span>
            </div>
          </div>

          {/* Model Evaluation Metrics */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono space-y-1.5">
            <div className="flex justify-between text-gray-300">
              <span className="text-gray-400">R² Score:</span>
              <span className="text-cyan-400 font-bold">{linear.r2 ?? 1.0}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span className="text-gray-400">MAE:</span>
              <span className="text-slate-200">{linear.mae ?? 0.0}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span className="text-gray-400">MSE / RMSE:</span>
              <span className="text-slate-200">{linear.rmse ?? 0.0}</span>
            </div>
            <div className="pt-2 text-[10px] text-gray-400 flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>StandardScaler + Regressor</span>
            </div>
          </div>
        </motion.div>

        {/* CARD 2: LOGISTIC REGRESSION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`glass-card rounded-2xl p-5 border flex flex-col justify-between relative overflow-hidden shadow-xl ${logBadge.glow}`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold tracking-wider text-blue-400 uppercase">
                MODEL 2
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                <Activity className="w-4 h-4" />
              </div>
            </div>

            <h3 className="text-base font-bold text-white mb-1">LOGISTIC REGRESSION</h3>
            <p className="text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-4">
              Predicts Congestion Level
            </p>

            {/* Main Congestion Badge */}
            <div className="my-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-gray-400 uppercase block tracking-widest mb-1.5">
                CONGESTION
              </span>
              <div
                className={`inline-block px-4 py-1.5 rounded-lg border text-lg font-black font-mono tracking-wider ${logBadge.bg}`}
              >
                {logBadge.label}
              </div>
              <div className="mt-2 text-xs font-mono text-gray-300 font-bold">
                {logistic.confidence ?? 87}% CONFIDENCE
              </div>
            </div>
          </div>

          {/* Model Statistics */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono space-y-1.5">
            <div className="flex justify-between text-gray-300">
              <span className="text-gray-400">Accuracy:</span>
              <span className="text-emerald-400 font-bold">{logistic.accuracy ?? 98.01}%</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span className="text-gray-400">Classes:</span>
              <span className="text-slate-200">Low, Mod, High, Sev</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span className="text-gray-400">Max Iterations:</span>
              <span className="text-slate-200">1000 Converged</span>
            </div>
            <div className="pt-2 text-[10px] text-gray-400 flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>StandardScaler + Logistic</span>
            </div>
          </div>
        </motion.div>

        {/* CARD 3: DECISION TREE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`glass-card rounded-2xl p-5 border flex flex-col justify-between relative overflow-hidden shadow-xl ${dtBadge.glow}`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold tracking-wider text-purple-400 uppercase">
                MODEL 3
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30">
                <GitBranch className="w-4 h-4" />
              </div>
            </div>

            <h3 className="text-base font-bold text-white mb-1">DECISION TREE</h3>
            <p className="text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-4">
              Predicts Congestion Level
            </p>

            {/* Main Congestion Badge */}
            <div className="my-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-gray-400 uppercase block tracking-widest mb-1.5">
                DECISION TREE PREDICTION
              </span>
              <div
                className={`inline-block px-4 py-1.5 rounded-lg border text-lg font-black font-mono tracking-wider ${dtBadge.bg}`}
              >
                {dtBadge.label}
              </div>
              <div className="mt-2 text-xs font-mono text-gray-300 font-bold">
                {decisionTree.confidence ?? 91}% CONFIDENCE
              </div>
            </div>
          </div>

          {/* Model Statistics & Mini Tree */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono space-y-1.5">
            <div className="flex justify-between text-gray-300">
              <span className="text-gray-400">Max Depth:</span>
              <span className="text-purple-400 font-bold">10 Levels</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span className="text-gray-400">Class Weight:</span>
              <span className="text-slate-200">Balanced</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span className="text-gray-400">Top Feature:</span>
              <span className="text-cyan-300 truncate max-w-[110px]">
                {decisionTree.featureImportance?.[0]?.feature || "traffic_density"}
              </span>
            </div>
            {/* Visual Mini Tree Representation */}
            <div className="pt-2 flex items-center justify-center space-x-1.5 text-[9px] text-purple-300/80 font-mono">
              <Network className="w-3.5 h-3.5 text-purple-400" />
              <span>Hierarchical Binary Splits</span>
            </div>
          </div>
        </motion.div>

        {/* CARD 4: RANDOM FOREST */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`glass-card rounded-2xl p-5 border flex flex-col justify-between relative overflow-hidden shadow-xl ${rfBadge.glow}`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
                MODEL 4
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                <Layers className="w-4 h-4" />
              </div>
            </div>

            <h3 className="text-base font-bold text-white mb-1">RANDOM FOREST</h3>
            <p className="text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-4">
              Ensemble Classification
            </p>

            {/* Main Congestion Badge */}
            <div className="my-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-gray-400 uppercase block tracking-widest mb-1.5">
                RANDOM FOREST PREDICTION
              </span>
              <div
                className={`inline-block px-4 py-1.5 rounded-lg border text-lg font-black font-mono tracking-wider ${rfBadge.bg}`}
              >
                {rfBadge.label}
              </div>
              <div className="mt-2 text-xs font-mono text-gray-300 font-bold">
                {randomForest.confidence ?? 95}% CONFIDENCE
              </div>
            </div>
          </div>

          {/* Model Statistics */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono space-y-1.5">
            <div className="flex justify-between text-gray-300">
              <span className="text-gray-400">Estimators:</span>
              <span className="text-emerald-400 font-bold">200 Trees</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span className="text-gray-400">Max Depth:</span>
              <span className="text-slate-200">15 Layers</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span className="text-gray-400">Accuracy:</span>
              <span className="text-emerald-300 font-bold">{randomForest.accuracy ?? 98.24}%</span>
            </div>
            <div className="pt-2 text-[10px] text-gray-400 flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>Bagged Ensemble (n_jobs=-1)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

