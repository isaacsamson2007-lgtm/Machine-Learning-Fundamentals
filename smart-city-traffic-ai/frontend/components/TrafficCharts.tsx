"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import {
  BarChart3,
  PieChart as PieIcon,
  LineChart as LineIcon,
  Activity,
} from "lucide-react";
import { TrafficInputData, ClassificationResult } from "../lib/api";

interface TrafficChartsProps {
  inputData: TrafficInputData;
  logistic: ClassificationResult;
  predictedFlow: number;
}

export default function TrafficCharts({
  inputData,
  logistic,
  predictedFlow,
}: TrafficChartsProps) {
  // Chart 1: Hourly Flow Curve
  const currentHour = inputData.hour || 8;
  const flowCurveData = Array.from({ length: 9 }).map((_, i) => {
    const hr = (currentHour - 4 + i + 24) % 24;
    const factor =
      hr === 8 || hr === 9 || hr === 17 || hr === 18 ? 1.35 : hr >= 23 || hr <= 5 ? 0.35 : 0.85;
    const flow = Math.round(predictedFlow * factor);
    const speed = Math.max(10, Math.round(100 - (flow / 18)));
    return {
      hour: `${hr}:00`,
      trafficFlow: flow,
      avgSpeed: speed,
    };
  });

  // Chart 2: Congestion Distribution (Donut)
  const defaultProbabilities = {
    Low: 5,
    Moderate: 10,
    High: 25,
    Severe: 60,
  };
  const probSource = logistic.probabilities || defaultProbabilities;
  const donutData = [
    { name: "Low", value: probSource.Low ?? 5, color: "#10b981" },
    { name: "Moderate", value: probSource.Moderate ?? 10, color: "#f59e0b" },
    { name: "High", value: probSource.High ?? 25, color: "#f97316" },
    { name: "Severe", value: probSource.Severe ?? 60, color: "#ef4444" },
  ];

  // Chart 3: Vehicle Composition (Bar)
  const totalVehicles = inputData.vehicle_count || 850;
  const heavyCount = inputData.heavy_vehicle_count || 40;
  const motoCount = inputData.motorcycle_count || 80;
  const busCount = inputData.public_transport_count || 30;
  const carsCount = Math.max(0, totalVehicles - (heavyCount + motoCount + busCount));

  const vehicleCompositionData = [
    { type: "Cars", count: carsCount, color: "#00d2ff" },
    { type: "Heavy Trucks", count: heavyCount, color: "#10b981" },
    { type: "Motorcycles", count: motoCount, color: "#f59e0b" },
    { type: "Public Transport", count: busCount, color: "#a855f7" },
  ];

  // Chart 4: Traffic Density vs Queue Length (Area)
  const densityTrendData = [
    { segment: "Km 0-2", density: Math.round(inputData.traffic_density * 0.7), queue: Math.round(inputData.queue_length * 0.5) },
    { segment: "Km 2-4", density: Math.round(inputData.traffic_density * 0.9), queue: Math.round(inputData.queue_length * 0.8) },
    { segment: "Intersection", density: inputData.traffic_density, queue: inputData.queue_length },
    { segment: "Km 6-8", density: Math.round(inputData.traffic_density * 0.85), queue: Math.round(inputData.queue_length * 0.7) },
    { segment: "Km 8-10", density: Math.round(inputData.traffic_density * 0.6), queue: Math.round(inputData.queue_length * 0.3) },
  ];

  return (
    <section id="analytics-section" className="py-12 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
          <span>STEP 4: TELEMETRY ANALYTICS</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          TRAFFIC ANALYTICS & DISTRIBUTION
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-400">
          Multivariate visualizations of throughput curves, fleet demographics, and congestion probabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: TRAFFIC FLOW (LINE) */}
        <div className="glass-card rounded-2xl p-6 border border-cyan-500/20 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <LineIcon className="w-5 h-5 text-cyan-400" />
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                Traffic Flow Curve (veh/hr)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
              Temporal Dynamics
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={flowCurveData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#050b14",
                    border: "1px solid #00d2ff",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="trafficFlow"
                  stroke="#00d2ff"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#00d2ff" }}
                  activeDot={{ r: 7 }}
                  name="Vehicles/Hour"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: CONGESTION DISTRIBUTION (DONUT) */}
        <div className="glass-card rounded-2xl p-6 border border-cyan-500/20 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <PieIcon className="w-5 h-5 text-amber-400" />
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                Congestion Level Distribution
              </h3>
            </div>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
              Probabilistic Softmax
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#050b14",
                    border: "1px solid #f59e0b",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: VEHICLE COMPOSITION (BAR) */}
        <div className="glass-card rounded-2xl p-6 border border-cyan-500/20 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                Fleet Demographic Breakdown
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
              Fleet Classification
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vehicleCompositionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="type" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#050b14",
                    border: "1px solid #10b981",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Count">
                  {vehicleCompositionData.map((entry, idx) => (
                    <Cell key={`bar-${idx}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 4: TRAFFIC DENSITY (AREA) */}
        <div className="glass-card rounded-2xl p-6 border border-cyan-500/20 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-purple-400" />
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                Traffic Density vs Queue Propagation
              </h3>
            </div>
            <span className="text-[10px] font-mono text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/30">
              Corridor Density
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={densityTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="segment" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#050b14",
                    border: "1px solid #a855f7",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="density"
                  stroke="#a855f7"
                  fill="rgba(168, 85, 247, 0.25)"
                  strokeWidth={2}
                  name="Density"
                />
                <Area
                  type="monotone"
                  dataKey="queue"
                  stroke="#00d2ff"
                  fill="rgba(0, 210, 255, 0.2)"
                  strokeWidth={2}
                  name="Queue (m)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

