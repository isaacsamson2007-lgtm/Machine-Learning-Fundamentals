"use client";

import React, { useEffect, useState } from "react";
import { Activity, Cpu, ShieldCheck, BarChart3, Menu, X, Radio } from "lucide-react";
import { checkBackendHealth } from "../lib/api";

export default function Navbar() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const ping = async () => {
      const res = await checkBackendHealth();
      setIsOnline(res.online);
    };
    ping();
    const interval = setInterval(ping, 10000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-cyan-500/20 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => scrollTo("hero")}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition">
            <div className="w-full h-full bg-[#050b14] rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-blue-400">
                SMARTCITY
              </span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                AI
              </span>
            </div>
            <p className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
              TRAFFIC COMMAND CENTER
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
          <button
            onClick={() => scrollTo("hero")}
            className="hover:text-cyan-400 transition flex items-center space-x-1.5 py-1"
          >
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => scrollTo("scenario-section")}
            className="hover:text-cyan-400 transition flex items-center space-x-1.5 py-1"
          >
            <span>Traffic AI</span>
          </button>
          <button
            onClick={() => scrollTo("models-section")}
            className="hover:text-cyan-400 transition flex items-center space-x-1.5 py-1"
          >
            <span>Models</span>
          </button>
          <button
            onClick={() => scrollTo("analytics-section")}
            className="hover:text-cyan-400 transition flex items-center space-x-1.5 py-1"
          >
            <span>Analytics</span>
          </button>
          <button
            onClick={() => scrollTo("simulation-section")}
            className="hover:text-cyan-400 transition flex items-center space-x-1.5 py-1"
          >
            <span>Simulation</span>
          </button>
          <button
            onClick={() => scrollTo("about-section")}
            className="hover:text-cyan-400 transition flex items-center space-x-1.5 py-1"
          >
            <span>About</span>
          </button>
        </div>

        {/* Live System Indicator */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 shadow-inner">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isOnline ? "bg-emerald-400" : "bg-rose-500"
                }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isOnline ? "bg-emerald-500" : "bg-rose-500"
                }`}
              ></span>
            </span>
            <span
              className={`text-xs font-mono font-semibold tracking-wide ${
                isOnline ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {isOnline ? "SYSTEM ONLINE" : "OFFLINE / CONNECTING"}
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-slate-800 flex flex-col space-y-2 text-sm text-gray-300">
          <button
            onClick={() => scrollTo("hero")}
            className="text-left px-3 py-2 rounded hover:bg-cyan-500/10 hover:text-cyan-400"
          >
            Dashboard
          </button>
          <button
            onClick={() => scrollTo("scenario-section")}
            className="text-left px-3 py-2 rounded hover:bg-cyan-500/10 hover:text-cyan-400"
          >
            Traffic AI
          </button>
          <button
            onClick={() => scrollTo("models-section")}
            className="text-left px-3 py-2 rounded hover:bg-cyan-500/10 hover:text-cyan-400"
          >
            Models
          </button>
          <button
            onClick={() => scrollTo("analytics-section")}
            className="text-left px-3 py-2 rounded hover:bg-cyan-500/10 hover:text-cyan-400"
          >
            Analytics
          </button>
          <button
            onClick={() => scrollTo("simulation-section")}
            className="text-left px-3 py-2 rounded hover:bg-cyan-500/10 hover:text-cyan-400"
          >
            Simulation
          </button>
          <button
            onClick={() => scrollTo("about-section")}
            className="text-left px-3 py-2 rounded hover:bg-cyan-500/10 hover:text-cyan-400"
          >
            About
          </button>
        </div>
      )}
    </nav>
  );
}

