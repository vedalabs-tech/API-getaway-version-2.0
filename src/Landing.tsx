import React from 'react';
import { ArrowRight, Shield, Zap, Activity } from 'lucide-react';
import logoImage from '../logo.png';

interface LandingProps {
  onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0c] text-gray-900 dark:text-gray-100 flex flex-col font-['Inter',sans-serif]">
      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logoImage} alt="Veda Labs Logo" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold tracking-tight">Veda Labs</span>
        </div>
        <div>
          <button 
            onClick={onStart}
            className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-sm hover:shadow-blue-500/25"
          >
            Developer Portal
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-20 pb-24 max-w-5xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-8">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          API Gateway v1.0 Live
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 leading-tight">
          Veda Labs
        </h1>
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-gray-800 dark:text-gray-200">
          Enterprise API Gateway <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            for Foundation Models
          </span>
        </h2>
        
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mb-12 leading-relaxed">
          Veda Labs provides a secure, low-latency API infrastructure for integrating AI models into your applications. Experience seamless scalability, comprehensive usage analytics, and robust rate limiting with a strict zero-data-training policy.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <button 
            onClick={onStart}
            className="px-8 py-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl"
          >
            Access Gateway <ArrowRight size={20} />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left mt-12 border-t border-gray-200 dark:border-gray-800 pt-16">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold">Privacy First</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your data remains yours. We adhere to a strict zero-training policy and are fully compliant with the DPDP Act, 2023.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold">Ultra-Low Latency</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Designed for high-throughput production environments with geographically distributed edge routing.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-bold">Detailed Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor your token usage, response times, and error rates in real-time with comprehensive exportable logs.
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <p>Proudly developed in India, made for Bharat 🇮🇳</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} Veda Labs. All rights reserved.</p>
        </div>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
