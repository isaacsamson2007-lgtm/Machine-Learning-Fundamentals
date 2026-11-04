"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Gauge,
  Activity,
  Clock,
  Wind,
  Layers,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Server,
  Cpu,
  Github,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import VehicleSelector, { VehicleScenario } from "../components/VehicleSelector";
import TrafficInput from "../components/TrafficInput";
import LoadingAnalysis from "../components/LoadingAnalysis";
import ModelCards from "../components/ModelCard";
import AIConsensus from "../components/AIConsensus";
import TrafficCharts from "../components/TrafficCharts";
import TrafficSimulation from "../components/TrafficSimulation";
import TrafficLight from "../components/TrafficLight";
import FeatureImportance from "../components/FeatureImportance";

import {
  TrafficInputData,
  PredictionResponse,
  DEMO_TRAFFIC_DATA,
  VEHICLE_PRESETS,
  predictTraffic,
} from "../lib/api";

export default function Dashboard() {
  const [formData, setFormData] = useState<TrafficInputData>(DEMO_TRAFFIC_DATA);
  const [selectedScenario, setSelectedScenario] = useState<VehicleScenario>("mixed");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initial demo predictions (to make dashboard active on load as well)
  const [predictions, setPredictions] = useState<PredictionResponse>({
    success: true,
    linearRegression: {
      trafficFlowRate: 850.0,
      mae: 0.0,
      mse: 0.0,
      rmse: 0.0,
      r2: 1.0,
      status: "Active (StandardScaler + LinearRegression)",
    },
    logisticRegression: {
      congestionLevel: "Severe",
      confidence: 100.0,
      probabilities: { Low: 0.0, Moderate: 0.0, High: 0.0, Severe: 100.0 },
      accuracy: 98.01,
      status: "Active (StandardScaler + LogisticRegression)",
    },
    decisionTree: {
      congestionLevel: "Severe",
      confidence: 100.0,
      probabilities: { Low: 0.0, Moderate: 0.0, High: 0.0, Severe: 100.0 },
      accuracy: 98.36,
      maxDepth: 10,
      featureImportance: [
        { feature: "traffic_density", importance: 0.887, percentage: 88.7 },
        { feature: "average_speed", importance: 0.045, percentage: 4.5 },
        { feature: "rainfall_mm", importance: 0.033, percentage: 3.3 },
        { feature: "vehicle_count", importance: 0.016, percentage: 1.6 },
        { feature: "average_wait_time", importance: 0.009, percentage: 0.9 },
        { feature: "queue_length", importance: 0.005, percentage: 0.5 },
      ],
      status: "Active (DecisionTreeClassifier max_depth=10)",
    },
    randomForest: {
      congestionLevel: "Severe",
      confidence: 98.5,
      probabilities: { Low: 0.0, Moderate: 0.0, High: 1.5, Severe: 98.5 },
      accuracy: 98.24,
      nEstimators: 200,
      maxDepth: 15,
      featureImportance: [
        { feature: "traffic_density", importance: 0.2952, percentage: 29.5 },
        { feature: "vehicle_count", importance: 0.1227, percentage: 12.3 },
        { feature: "green_light_duration", importance: 0.0977, percentage: 9.8 },
        { feature: "average_speed", importance: 0.0971, percentage: 9.7 },
        { feature: "queue_length", importance: 0.0715, percentage: 7.1 },
        { feature: "average_wait_time", importance: 0.0517, percentage: 5.2 },
        { feature: "motorcycle_count", importance: 0.0488, percentage: 4.9 },
        { feature: "hour", importance: 0.0438, percentage: 4.4 },
      ],
      status: "Active (RandomForest 200 Trees, Depth 15)",
    },
    finalVerdict: {
      level: "Severe",
      confidence: 99.5,
      recommendations: [
        "Activate emergency traffic control protocols",
        "Increase signal priority for congested arteries",
        "Deploy traffic personnel to critical intersections",
        "Recommend immediate alternate routes on navigation feeds",
      ],
    },
  });

  const handleSelectScenario = (scenario: VehicleScenario) => {
    setSelectedScenario(scenario);
    const preset = VEHICLE_PRESETS[scenario];
    setFormData((prev) => ({
      ...prev,
      ...preset,
    }));
  };

  const handleLoadDemo = () => {
    setSelectedScenario("mixed");
    setFormData(DEMO_TRAFFIC_DATA);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await predictTraffic(formData);
      if (result.success) {
        setPredictions(result);
        // Smooth scroll to models section
        setTimeout(() => {
          const el = document.getElementById("models-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        setErrorMessage(result.error || "Prediction request did not succeed.");
      }
    } catch (err: any) {
      setErrorMessage(
        err.message ||
          "Unable to connect to AI backend. Please make sure the Node.js server is running on port 5000."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-white">
      {/* Top Fixed Command Center Navbar */}
      <Navbar />

      {/* 1. Hero Section */}
      <Hero
        onAnalyzeClick={() => {
          const el = document.getElementById("scenario-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 2. Vehicle Scenario Selector (Sports Car, Heavy Truck, Mixed Traffic) */}
      <VehicleSelector
        selectedScenario={selectedScenario}
        onSelectScenario={handleSelectScenario}
      />

      {/* 3. Traffic Scenario Input Form */}
      <TrafficInput
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        onLoadDemo={handleLoadDemo}
      />

      {/* Error Banner */}
      {errorMessage && (
        <div className="max-w-4xl mx-auto px-4 my-6">
          <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 flex items-start space-x-3 text-rose-300 text-sm shadow-xl">
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold font-mono">CONNECTION ALERT</p>
              <p className="mt-0.5">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading Scanning State */}
      <AnimatePresence>{isLoading && <LoadingAnalysis />}</AnimatePresence>

      {/* 4. Model Result Cards (Linear, Logistic, Decision Tree, Random Forest) */}
      <ModelCards
        linear={predictions.linearRegression}
        logistic={predictions.logisticRegression}
        decisionTree={predictions.decisionTree}
        randomForest={predictions.randomForest}
      />

      {/* 5. AI Consensus Section (Unified Verdict & Actions) */}
      <AIConsensus
        finalVerdict={predictions.finalVerdict}
        linear={predictions.linearRegression}
        logistic={predictions.logisticRegression}
        decisionTree={predictions.decisionTree}
        randomForest={predictions.randomForest}
      />

      {/* 6. Smart City Statistics & Physical Traffic Light */}
      <section className="py-10 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Smart City Statistics Cards (Section 21) */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="glass-card rounded-2xl p-5 border border-cyan-500/20">
              <div className="flex items-center space-x-2 text-cyan-400 mb-2">
                <Car className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                  TOTAL VEHICLES
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                {formData.vehicle_count}
              </div>
              <span className="text-[10px] font-mono text-cyan-300/80">Active corridor count</span>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-cyan-500/20">
              <div className="flex items-center space-x-2 text-emerald-400 mb-2">
                <Gauge className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                  AVERAGE SPEED
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                {formData.average_speed} <span className="text-sm font-normal text-gray-400">km/h</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-300/80">Mean velocity</span>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-cyan-500/20">
              <div className="flex items-center space-x-2 text-amber-400 mb-2">
                <Activity className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                  TRAFFIC DENSITY
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                {formData.traffic_density}
              </div>
              <span className="text-[10px] font-mono text-amber-300/80">Vehicles per lane km</span>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-cyan-500/20">
              <div className="flex items-center space-x-2 text-blue-400 mb-2">
                <Layers className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                  QUEUE LENGTH
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                {formData.queue_length} <span className="text-sm font-normal text-gray-400">m</span>
              </div>
              <span className="text-[10px] font-mono text-blue-300/80">Congestion tail</span>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-cyan-500/20">
              <div className="flex items-center space-x-2 text-purple-400 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                  WAIT TIME
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                {formData.average_wait_time} <span className="text-sm font-normal text-gray-400">min</span>
              </div>
              <span className="text-[10px] font-mono text-purple-300/80">Intersection delay</span>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-cyan-500/20">
              <div className="flex items-center space-x-2 text-teal-400 mb-2">
                <Wind className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                  AIR QUALITY
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                {formData.air_quality_index} <span className="text-sm font-normal text-gray-400">AQI</span>
              </div>
              <span className="text-[10px] font-mono text-teal-300/80">Pollution index</span>
            </div>
          </div>

          {/* Traffic Light Signal (Section 20) */}
          <div className="lg:col-span-1">
            <TrafficLight congestionLevel={predictions.finalVerdict.level} />
          </div>
        </div>
      </section>

      {/* 7. Traffic Analytics Charts */}
      <TrafficCharts
        inputData={formData}
        logistic={predictions.logisticRegression}
        predictedFlow={predictions.linearRegression.trafficFlowRate}
      />

      {/* 8. Live Traffic Highway Simulation */}
      <TrafficSimulation
        congestionLevel={predictions.finalVerdict.level}
        vehicleCount={formData.vehicle_count}
      />

      {/* 9. Feature Importance Weights */}
      <FeatureImportance
        dtFeatures={predictions.decisionTree.featureImportance}
        rfFeatures={predictions.randomForest.featureImportance}
      />

      {/* 10. About & Architecture Section */}
      <section id="about-section" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold font-mono text-white flex items-center space-x-2 mb-3">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>SMART CITY TRAFFIC AI</span>
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Autonomous urban mobility intelligence command center combining classical regression
              with ensemble classification to optimize arterial traffic throughput in real time.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold font-mono text-cyan-300 uppercase tracking-wider mb-3">
              Architecture & Data Flow
            </h4>
            <div className="text-xs font-mono text-gray-300 space-y-2 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <p>Next.js Frontend (Port 3000)</p>
              <p className="text-cyan-400">↓ REST API / JSON</p>
              <p>Node.js Express Backend (Port 5000)</p>
              <p className="text-cyan-400">↓ child_process.spawn()</p>
              <p>Python 3 + Scikit-Learn Inference Layer</p>
              <p className="text-cyan-400">↓ 4 Parallel ML Estimators</p>
              <p>JSON Consensus Output</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold font-mono text-cyan-300 uppercase tracking-wider mb-3">
              Models & Dataset
            </h4>
            <ul className="text-xs font-mono text-gray-400 space-y-2">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Dataset: 204,000 mobility records</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Linear Regression: Traffic Flow Rate (R² = 1.0)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Logistic Regression: Congestion Level (98.0%)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Decision Tree: Balanced Depth 10 (98.4%)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Random Forest: 200 Trees, Depth 15 (98.2%)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-900 text-center text-xs font-mono text-gray-500">
          Smart City Urban Traffic Management System • Full-Stack AI Command Center
        </div>
      </section>
    </div>
  );
}

