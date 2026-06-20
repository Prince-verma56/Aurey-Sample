"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Apple, Phone,   } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Custom Google Icon ---
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen w-full flex bg-[#0A0A0B] text-[#EBEBEB] overflow-hidden selection:bg-[#D9B98E]/30 selection:text-white">
      {/* Left Panel - Interactive Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative">
        {/* Back to Home Navigation */}
        <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Aurey
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center px-8 sm:px-16 md:px-24">
          <div className="w-full max-w-[400px]">
            {/* Logo Mark */}
            <div className="mb-10 text-2xl font-heading tracking-[0.2em] text-[#D9B98E]">
              AUREY
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col w-full"
              >
                <h1 className="text-[32px] md:text-[40px] leading-tight font-medium mb-3 tracking-tight">
                  {isLogin ? "Welcome back!" : "Create an account"}
                </h1>
                <p className="text-zinc-400 text-[15px] leading-relaxed mb-10 max-w-[90%]">
                  {isLogin
                    ? "Sign in to manage your rituals, track your routine progress, and explore exclusive skincare formulas."
                    : "Join Aurey to discover curated Korean rituals tailored perfectly for your skin environment."}
                </p>

                <form className="flex flex-col gap-5 w-full" onSubmit={(e) => e.preventDefault()}>
                  {/* Name field (Only in Sign Up) */}
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col gap-2"
                    >
                      <label className="text-sm font-medium text-zinc-300">Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className={cn(
                          "w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#D9B98E]/40 focus:border-[#D9B98E]/40 transition-all"
                        )}
                      />
                    </motion.div>
                  )}

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-300">Email</label>
                    <input
                      type="email"
                      placeholder="youremail@yourdomain.com"
                      className={cn(
                        "w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#D9B98E]/40 focus:border-[#D9B98E]/40 transition-all"
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-300">Password</label>
                    <input
                      type="password"
                      placeholder="Create a password"
                      className={cn(
                        "w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#D9B98E]/40 focus:border-[#D9B98E]/40 transition-all"
                      )}
                    />
                  </div>

                  {!isLogin && (
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-zinc-300">Confirm Password</label>
                      <input
                        type="password"
                        placeholder="Confirm your password"
                        className={cn(
                          "w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#D9B98E]/40 focus:border-[#D9B98E]/40 transition-all"
                        )}
                      />
                    </div>
                  )}

                  <button className="mt-2 w-full h-12 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-xl text-white font-medium transition-all active:scale-[0.98]">
                    {isLogin ? "Sign in" : "Sign up"}
                  </button>
                </form>

                {/* OR Separator */}
                <div className="flex items-center gap-4 my-8 w-full">
                  <div className="h-[1px] flex-1 bg-white/10" />
                  <span className="text-xs text-zinc-500 lowercase font-medium">or</span>
                  <div className="h-[1px] flex-1 bg-white/10" />
                </div>

                {/* Social Logins */}
                <div className="flex items-center gap-3 w-full">
                  <button className="flex-1 flex items-center justify-center h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
                    <GoogleIcon />
                  </button>
                  <button className="flex-1 flex items-center justify-center h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
                    <Phone className="w-5 h-5 text-[#1877F2]" fill="#1877F2" stroke="none" />
                  </button>
                  <button className="flex-1 flex items-center justify-center h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
                    <Apple className="w-5 h-5 text-white" fill="white" />
                  </button>
                </div>

                {/* Toggle Mode */}
                <p className="mt-10 text-center text-sm text-zinc-500">
                  {isLogin ? "Already have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-[#D9B98E] hover:text-white font-medium transition-colors"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right Panel - Image & Testimonial */}
      <div className="hidden lg:flex w-1/2 relative bg-[#1A1512] p-6">
        <div className="w-full h-full relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
          {/* Aesthetic Image */}
          <img
            src="https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=1200&h=1600"
            alt="Cosmetic Texture"
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />

          {/* Cinematic Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1512]/90 via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

          {/* Aceternity Style Testimonial Card */}
          <div className="absolute bottom-12 left-12 right-12 z-10">
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider text-white/90 border border-white/10">
                Premium Formulation
              </span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider text-white/90 border border-white/10">
                Korean Rituals
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              <p className="relative text-lg font-medium leading-relaxed text-[#EBEBEB] mb-6">
                "The Aurey formulations have completely transformed my skin barrier. What used to take a rigorous 10-step routine is now seamlessly integrated into a simple, elegant daily ritual."
              </p>

              <div className="relative">
                <p className="text-white font-bold text-[13px] tracking-wide">Elena Rostova</p>
                <p className="text-white/60 text-[11px] font-medium tracking-wider uppercase mt-1">Beauty Director, Vogue Edit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
