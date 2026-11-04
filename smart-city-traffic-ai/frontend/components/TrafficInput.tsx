"use client";

import React from "react";
import {
  Car,
  Clock,
  CloudSun,
  ShieldAlert,
  TrafficCone,
  RotateCcw,
  Sparkles,
  Zap,
  Sliders,
  Check,
} from "lucide-react";
import { TrafficInputData, DEMO_TRAFFIC_DATA } from "../lib/api";

interface TrafficInputProps {
  formData: TrafficInputData;
  setFormData: React.Dispatch<React.SetStateAction<TrafficInputData>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onLoadDemo: () => void;
}

export default function TrafficInput({
  formData,
  setFormData,
  onSubmit,
  isLoading,
  onLoadDemo,
}: TrafficInputProps) {
  const handleChange = (field: keyof TrafficInputData, value: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section id="input-section" className="py-10 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Header with Title and Demo Button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">
            <span>STEP 2: TELEMETRY & CONDITIONS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center space-x-3">
            <span>TRAFFIC SCENARIO INPUT</span>
            <Sliders className="w-6 h-6 text-cyan-400" />
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Configure urban highway parameters across 23 sensory variables.
          </p>
        </div>

        {/* Load Demo Data Button (Section 31) */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onLoadDemo}
            className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-cyan-500/30 text-cyan-300 hover:text-white font-mono text-xs font-semibold tracking-wider uppercase transition flex items-center space-x-2 shadow-md hover:shadow-cyan-500/20 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" />
            <span>LOAD DEMO DATA</span>
          </button>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* GROUP 1: TRAFFIC */}
          <div className="glass-card rounded-2xl p-5 border border-cyan-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2.5 mb-4 pb-2 border-b border-cyan-500/20 text-cyan-400">
                <Car className="w-5 h-5" />
                <h3 className="font-mono text-sm font-bold tracking-wider uppercase">
                  1. Traffic Flow
                </h3>
              </div>

              <div className="space-y-4">
                {/* Vehicle Count */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">Vehicle Count</span>
                    <span className="text-cyan-400 font-bold">{formData.vehicle_count}</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={2500}
                    step={10}
                    value={formData.vehicle_count}
                    onChange={(e) => handleChange("vehicle_count", Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                  <input
                    type="number"
                    value={formData.vehicle_count}
                    onChange={(e) => handleChange("vehicle_count", Number(e.target.value))}
                    className="mt-1 w-full bg-slate-900/90 border border-slate-700 rounded px-2.5 py-1 text-xs font-mono text-white"
                  />
                </div>

                {/* Average Speed */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">Avg Speed (km/h)</span>
                    <span className="text-cyan-400 font-bold">{formData.average_speed}</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={120}
                    step={1}
                    value={formData.average_speed}
                    onChange={(e) => handleChange("average_speed", Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                  <input
                    type="number"
                    value={formData.average_speed}
                    onChange={(e) => handleChange("average_speed", Number(e.target.value))}
                    className="mt-1 w-full bg-slate-900/90 border border-slate-700 rounded px-2.5 py-1 text-xs font-mono text-white"
                  />
                </div>

                {/* Heavy Vehicle Count */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">Heavy Trucks</span>
                    <span className="text-cyan-400 font-bold">{formData.heavy_vehicle_count}</span>
                  </div>
                  <input
                    type="number"
                    min={0}
                    max={500}
                    value={formData.heavy_vehicle_count}
                    onChange={(e) => handleChange("heavy_vehicle_count", Number(e.target.value))}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded px-2.5 py-1 text-xs font-mono text-white"
                  />
                </div>

                {/* Motorcycle Count */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">Motorcycles</span>
                    <span className="text-cyan-400 font-bold">{formData.motorcycle_count}</span>
                  </div>
                  <input
                    type="number"
                    min={0}
                    max={800}
                    value={formData.motorcycle_count}
                    onChange={(e) => handleChange("motorcycle_count", Number(e.target.value))}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded px-2.5 py-1 text-xs font-mono text-white"
                  />
                </div>

                {/* Public Transport */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">Public Buses</span>
                    <span className="text-cyan-400 font-bold">{formData.public_transport_count}</span>
                  </div>
                  <input
                    type="number"
                    min={0}
                    max={300}
                    value={formData.public_transport_count}
                    onChange={(e) => handleChange("public_transport_count", Number(e.target.value))}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded px-2.5 py-1 text-xs font-mono text-white"
                  />
                </div>

                {/* Traffic Density */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">Traffic Density</span>
                    <span className="text-amber-400 font-bold">{formData.traffic_density}</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={300}
                    value={formData.traffic_density}
                    onChange={(e) => handleChange("traffic_density", Number(e.target.value))}
                    className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* GROUP 2: ROAD CONDITIONS */}
          <div className="glass-card rounded-2xl p-5 border border-cyan-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2.5 mb-4 pb-2 border-b border-cyan-500/20 text-blue-400">
                <Clock className="w-5 h-5" />
                <h3 className="font-mono text-sm font-bold tracking-wider uppercase">
                  2. Road Dynamics
                </h3>
              </div>

              <div className="space-y-4">
                {/* Queue Length */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">Queue Length (m)</span>
                    <span className="text-blue-400 font-bold">{formData.queue_length} m</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={500}
                    step={5}
                    value={formData.queue_length}
                    onChange={(e) => handleChange("queue_length", Number(e.target.value))}
                    className="w-full accent-blue-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                  <input
                    type="number"
                    value={formData.queue_length}
                    onChange={(e) => handleChange("queue_length", Number(e.target.value))}
                    className="mt-1 w-full bg-slate-900/90 border border-slate-700 rounded px-2.5 py-1 text-xs font-mono text-white"
                  />
                </div>

                {/* Average Wait Time */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">Wait Time (min)</span>
                    <span className="text-blue-400 font-bold">{formData.average_wait_time} min</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={60}
                    step={1}
                    value={formData.average_wait_time}
                    onChange={(e) => handleChange("average_wait_time", Number(e.target.value))}
                    className="w-full accent-blue-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                  <input
                    type="number"
                    value={formData.average_wait_time}
                    onChange={(e) => handleChange("average_wait_time", Number(e.target.value))}
                    className="mt-1 w-full bg-slate-900/90 border border-slate-700 rounded px-2.5 py-1 text-xs font-mono text-white"
                  />
                </div>

                {/* Parking Occupancy */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">Parking Occ. (%)</span>
                    <span className="text-blue-400 font-bold">{formData.parking_occupancy}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={formData.parking_occupancy}
                    onChange={(e) => handleChange("parking_occupancy", Number(e.target.value))}
                    className="w-full accent-blue-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Traffic Camera Count */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">Cameras Active</span>
                    <span className="text-blue-400 font-bold">{formData.traffic_camera_count}</span>
                  </div>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={formData.traffic_camera_count}
                    onChange={(e) => handleChange("traffic_camera_count", Number(e.target.value))}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded px-2.5 py-1 text-xs font-mono text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* GROUP 3: ENVIRONMENT */}
          <div className="glass-card rounded-2xl p-5 border border-cyan-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2.5 mb-4 pb-2 border-b border-cyan-500/20 text-emerald-400">
                <CloudSun className="w-5 h-5" />
                <h3 className="font-mono text-sm font-bold tracking-wider uppercase">
                  3. Environment
                </h3>
              </div>

              <div className="space-y-4">
                {/* Temperature */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">Temp (°C)</span>
                    <span className="text-emerald-400 font-bold">{formData.temperature}°C</span>
                  </div>
                  <input
                    type="range"
                    min={-10}
                    max={50}
                    value={formData.temperature}
                    onChange={(e) => handleChange("temperature", Number(e.target.value))}
                    className="w-full accent-emerald-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Rainfall */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">Rainfall (mm)</span>
                    <span className="text-emerald-400 font-bold">{formData.rainfall_mm} mm</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={80}
                    value={formData.rainfall_mm}
                    onChange={(e) => handleChange("rainfall_mm", Number(e.target.value))}
                    className="w-full accent-emerald-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Visibility */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">Visibility (km)</span>
                    <span className="text-emerald-400 font-bold">{formData.visibility_km} km</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={15}
                    step={0.5}
                    value={formData.visibility_km}
                    onChange={(e) => handleChange("visibility_km", Number(e.target.value))}
                    className="w-full accent-emerald-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Air Quality Index */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">Air Quality (AQI)</span>
                    <span className="text-emerald-400 font-bold">{formData.air_quality_index}</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={400}
                    value={formData.air_quality_index}
                    onChange={(e) => handleChange("air_quality_index", Number(e.target.value))}
                    className="w-full accent-emerald-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* GROUP 4: INFRASTRUCTURE */}
          <div className="glass-card rounded-2xl p-5 border border-cyan-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2.5 mb-4 pb-2 border-b border-cyan-500/20 text-purple-400">
                <TrafficCone className="w-5 h-5" />
                <h3 className="font-mono text-sm font-bold tracking-wider uppercase">
                  4. Signals & Infra
                </h3>
              </div>

              <div className="space-y-4">
                {/* Signal Cycle */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">Signal Cycle</span>
                    <span className="text-purple-400 font-bold">{formData.signal_cycle_seconds}s</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={240}
                    step={5}
                    value={formData.signal_cycle_seconds}
                    onChange={(e) => handleChange("signal_cycle_seconds", Number(e.target.value))}
                    className="w-full accent-purple-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                  <input
                    type="number"
                    value={formData.signal_cycle_seconds}
                    onChange={(e) => handleChange("signal_cycle_seconds", Number(e.target.value))}
                    className="mt-1 w-full bg-slate-900/90 border border-slate-700 rounded px-2.5 py-1 text-xs font-mono text-white"
                  />
                </div>

                {/* Green Light Duration */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">Green Light</span>
                    <span className="text-purple-400 font-bold">{formData.green_light_duration}s</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={180}
                    step={5}
                    value={formData.green_light_duration}
                    onChange={(e) => handleChange("green_light_duration", Number(e.target.value))}
                    className="w-full accent-purple-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                  <input
                    type="number"
                    value={formData.green_light_duration}
                    onChange={(e) => handleChange("green_light_duration", Number(e.target.value))}
                    className="mt-1 w-full bg-slate-900/90 border border-slate-700 rounded px-2.5 py-1 text-xs font-mono text-white"
                  />
                </div>

                {/* Construction Activity Toggle */}
                <div className="pt-2">
                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 cursor-pointer hover:border-purple-500/40">
                    <span className="text-xs font-mono text-gray-300">Construction Work</span>
                    <input
                      type="checkbox"
                      checked={formData.construction_activity === 1}
                      onChange={(e) => handleChange("construction_activity", e.target.checked ? 1 : 0)}
                      className="w-4 h-4 accent-purple-400 rounded cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* GROUP 5: SAFETY & TEMPORAL */}
          <div className="glass-card rounded-2xl p-5 border border-cyan-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2.5 mb-4 pb-2 border-b border-cyan-500/20 text-rose-400">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="font-mono text-sm font-bold tracking-wider uppercase">
                  5. Safety & Time
                </h3>
              </div>

              <div className="space-y-3">
                {/* Hour of Day */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">Hour of Day (0-23)</span>
                    <span className="text-rose-400 font-bold">{formData.hour}:00</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={23}
                    value={formData.hour}
                    onChange={(e) => handleChange("hour", Number(e.target.value))}
                    className="w-full accent-rose-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Toggles */}
                <div className="space-y-2 pt-1 text-xs font-mono">
                  <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800 cursor-pointer">
                    <span className="text-gray-300">Rush Hour</span>
                    <input
                      type="checkbox"
                      checked={formData.rush_hour === 1}
                      onChange={(e) => handleChange("rush_hour", e.target.checked ? 1 : 0)}
                      className="w-4 h-4 accent-rose-400 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800 cursor-pointer">
                    <span className="text-gray-300">Weekend</span>
                    <input
                      type="checkbox"
                      checked={formData.is_weekend === 1}
                      onChange={(e) => handleChange("is_weekend", e.target.checked ? 1 : 0)}
                      className="w-4 h-4 accent-rose-400 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800 cursor-pointer">
                    <span className="text-gray-300">Holiday</span>
                    <input
                      type="checkbox"
                      checked={formData.is_holiday === 1}
                      onChange={(e) => handleChange("is_holiday", e.target.checked ? 1 : 0)}
                      className="w-4 h-4 accent-rose-400 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800 cursor-pointer">
                    <span className="text-rose-300 font-bold">Accident Alert</span>
                    <input
                      type="checkbox"
                      checked={formData.accident_reported === 1}
                      onChange={(e) => handleChange("accident_reported", e.target.checked ? 1 : 0)}
                      className="w-4 h-4 accent-rose-500 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800 cursor-pointer">
                    <span className="text-cyan-300 font-bold">Emergency Vehicle</span>
                    <input
                      type="checkbox"
                      checked={formData.emergency_vehicle_detected === 1}
                      onChange={(e) => handleChange("emergency_vehicle_detected", e.target.checked ? 1 : 0)}
                      className="w-4 h-4 accent-cyan-400 rounded"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Large Action Button (Section 15 & 32) */}
        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full max-w-xl group relative py-4 px-8 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-400 text-black font-black tracking-widest uppercase text-base shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-[1.02] active:scale-98 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>ANALYZING TRAFFIC... RUNNING 4 AI MODELS...</span>
              </span>
            ) : (
              <>
                <Zap className="w-6 h-6 text-black group-hover:scale-125 transition-transform" />
                <span className="text-lg">RUN AI TRAFFIC ANALYSIS</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

