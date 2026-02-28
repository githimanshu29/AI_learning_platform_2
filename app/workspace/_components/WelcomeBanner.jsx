"use client"

import React from 'react'
import { Sparkles, Zap, BookOpen } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

const WelcomeBanner = () => {
  const { user } = useUser();
  const firstName = user?.firstName || 'there';

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-teal-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Icon */}
          <div className="flex-shrink-0 p-4 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl border border-teal-500/30 backdrop-blur-sm">
            <Sparkles className="w-8 h-8 text-teal-400" />
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              <span className="bg-gradient-to-r from-white via-teal-100 to-cyan-100 bg-clip-text text-transparent">
                Welcome back, {firstName}!
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 max-w-2xl">
              Continue your learning journey or create a new course with AI-powered content generation.
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex gap-4 md:gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 mb-2">
                <Zap className="w-6 h-6 text-teal-400" />
              </div>
              <p className="text-xs text-slate-500">AI Powered</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 mb-2">
                <BookOpen className="w-6 h-6 text-cyan-400" />
              </div>
              <p className="text-xs text-slate-500">Unlimited</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-20px); opacity: 0.6; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default WelcomeBanner
