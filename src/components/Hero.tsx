'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, ShieldCheck, Sparkles, Activity, BookOpen, Smile } from 'lucide-react';
import { CampaignId } from '@/types/donation';

interface HeroProps {
  onOpenDonateModal: (campaignId?: CampaignId) => void;
}

export default function Hero({ onOpenDonateModal }: HeroProps) {
  const scrollToCauses = () => {
    const el = document.getElementById('causes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-[#FBF9F4]">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E2583E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#1B4332]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/20 text-[#1B4332] text-xs font-semibold tracking-wider uppercase mb-5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E2583E]" />
              <span>TOGETHER, WE CAN CHANGE LIVES</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#141B1A] leading-[1.15] mb-6"
            >
              A Little Kindness Can Change a{' '}
              <span className="relative inline-block text-[#1B4332]">
                Lifetime.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#E2583E]/50"
                  viewBox="0 0 250 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C50 3 150 2 247 8"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#4E605C] leading-relaxed max-w-2xl mb-8 font-normal"
            >
              Your contribution helps children access education, families receive essential
              healthcare, and communities build a better, dignified future.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <button
                onClick={() => onOpenDonateModal()}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#E2583E] hover:bg-[#C8442C] text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>Make a Donation</span>
              </button>

              <button
                onClick={scrollToCauses}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-[#F4EFE4] text-[#141B1A] font-semibold text-base border border-[#E7DFD0] shadow-sm hover:border-[#1B4332]/30 transition-all cursor-pointer"
              >
                <span>Explore Our Causes</span>
                <ArrowRight className="w-4 h-4 text-[#1B4332]" />
              </button>
            </motion.div>

            {/* Quick Cause Launchers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="pt-6 border-t border-[#E7DFD0] flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-[#4E605C]"
            >
              <span className="font-semibold text-[#141B1A] uppercase tracking-wider text-[11px]">
                Quick Select:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onOpenDonateModal('heartbeats')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E7DFD0] hover:border-[#E2583E] text-[#141B1A] hover:text-[#E2583E] transition-all font-medium cursor-pointer shadow-2xs"
                >
                  <Activity className="w-3.5 h-3.5 text-[#E2583E]" />
                  <span>Little Heartbeats</span>
                </button>

                <button
                  onClick={() => onOpenDonateModal('shikshalaya')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E7DFD0] hover:border-[#1B4332] text-[#141B1A] hover:text-[#1B4332] transition-all font-medium cursor-pointer shadow-2xs"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#1B4332]" />
                  <span>Shikshalaya</span>
                </button>

                <button
                  onClick={() => onOpenDonateModal('chuppi-todo')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E7DFD0] hover:border-[#D95338] text-[#141B1A] hover:text-[#D95338] transition-all font-medium cursor-pointer shadow-2xs"
                >
                  <Smile className="w-3.5 h-3.5 text-[#D95338]" />
                  <span>Chuppi Todo</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Asymmetrical Visual Composition */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Primary Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-[#E7DFD0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80"
                  alt="Compassionate mentorship and child empowerment"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                {/* Bottom Overlay on Image */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs uppercase tracking-widest text-[#FF9E8D] font-bold mb-1">
                    Direct Ground Impact
                  </p>
                  <p className="font-serif text-lg font-medium leading-snug">
                    Over 18,500 children brought back into classrooms and care.
                  </p>
                </div>
              </div>

              {/* Floating Trust Badge - Top Right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-4 -right-4 sm:-right-6 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-[#E7DFD0] flex items-center gap-3 backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1B4332]/10 flex items-center justify-center text-[#1B4332]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-sm text-[#141B1A]">100% Verified</span>
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  </div>
                  <p className="text-[11px] text-[#4E605C]">Audited & Tax Deductible</p>
                </div>
              </motion.div>

              {/* Floating Impact Card - Bottom Left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#14382B] text-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-white/10 max-w-[240px]"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E2583E]" />
                  <span className="text-[11px] font-semibold tracking-wide uppercase text-white/70">
                    Transparent Funds
                  </span>
                </div>
                <div className="font-serif text-2xl font-bold tracking-tight text-white">
                  ₹2.4 Cr+
                </div>
                <p className="text-[11px] text-white/70 leading-snug mt-1">
                  Disbursed directly to pediatric care & education.
                </p>
                <div className="mt-2 text-[10px] text-white/50 italic">
                  *Illustrative statistics for demo
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
