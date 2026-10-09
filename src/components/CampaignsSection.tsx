'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Activity,
  BookOpen,
  Smile,
  CheckCircle2,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { CAMPAIGNS } from '@/constants/campaigns';
import { DonationSelection, Frequency } from '@/types/donation';

interface CampaignsSectionProps {
  onSelectDonation: (selection: DonationSelection) => void;
}

export default function CampaignsSection({ onSelectDonation }: CampaignsSectionProps) {
  // Campaign A: Little Heartbeats state
  const heartbeatsCampaign = CAMPAIGNS.find((c) => c.id === 'heartbeats')!;
  const [heartbeatsAmount, setHeartbeatsAmount] = useState<number>(5000);
  const [heartbeatsCustom, setHeartbeatsCustom] = useState<string>('');
  const [heartbeatsIsCustom, setHeartbeatsIsCustom] = useState<boolean>(false);
  const [heartbeatsFrequency, setHeartbeatsFrequency] = useState<Frequency>('one-time');

  // Campaign B: Shikshalaya state
  const shikshalayaCampaign = CAMPAIGNS.find((c) => c.id === 'shikshalaya')!;
  const [shikshalayaFrequency, setShikshalayaFrequency] = useState<Frequency>('monthly');
  const [shikshalayaChildren, setShikshalayaChildren] = useState<number>(1);

  // Campaign C: Chuppi Todo state
  const chuppiCampaign = CAMPAIGNS.find((c) => c.id === 'chuppi-todo')!;
  const [chuppiSelectedKit, setChuppiSelectedKit] = useState<number>(3); // 3 kits default
  const [chuppiCustomAmount, setChuppiCustomAmount] = useState<string>('');
  const [chuppiIsCustom, setChuppiIsCustom] = useState<boolean>(false);

  // Shikshalaya calculations
  const getShikshalayaRate = (freq: Frequency) => {
    switch (freq) {
      case 'monthly':
        return 1200;
      case 'quarterly':
        return 3600;
      case 'half-yearly':
        return 7200;
      case 'annually':
        return 14400;
      default:
        return 1200;
    }
  };

  const shikshalayaTotal = getShikshalayaRate(shikshalayaFrequency) * shikshalayaChildren;

  // Chuppi Todo calculations
  const getChuppiTotal = () => {
    if (chuppiIsCustom) {
      const parsed = parseInt(chuppiCustomAmount, 10);
      return isNaN(parsed) || parsed < 500 ? 500 : parsed;
    }
    const kit = chuppiCampaign.kitOptions?.find((k) => k.units === chuppiSelectedKit);
    return kit ? kit.amount : 1500;
  };

  // Heartbeats calculations
  const getHeartbeatsTotal = () => {
    if (heartbeatsIsCustom) {
      const parsed = parseInt(heartbeatsCustom, 10);
      return isNaN(parsed) || parsed < 500 ? 500 : parsed;
    }
    return heartbeatsAmount;
  };

  return (
    <section id="causes" className="py-20 lg:py-28 bg-[#F4EFE4]/60 border-y border-[#E7DFD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/20 text-[#1B4332] text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E2583E]" />
            <span>Targeted Giving For Lasting Change</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141B1A] tracking-tight mb-4">
            Our Primary Humanitarian Causes
          </h2>
          <p className="text-[#4E605C] text-base sm:text-lg leading-relaxed">
            Choose where your contribution makes an immediate impact. Every rupee is accounted for
            with audited transparency and direct ground accountability.
          </p>
        </div>

        {/* 3 Campaigns Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* ========================================================= */}
          {/* CAMPAIGN A: Little Heartbeats (Healthcare) */}
          {/* ========================================================= */}
          <div className="flex flex-col rounded-3xl bg-white border border-[#E7DFD0] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
            {/* Image Header with Badge */}
            <div className="relative h-60 overflow-hidden bg-[#E7DFD0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heartbeatsCampaign.image}
                alt={heartbeatsCampaign.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2583E] text-white text-xs font-semibold shadow-md">
                  <Activity className="w-3.5 h-3.5" />
                  Healthcare Relief
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[11px] font-semibold text-[#FF9E8D] uppercase tracking-wider mb-0.5">
                  {heartbeatsCampaign.hindiTitle}
                </p>
                <h3 className="font-serif text-2xl font-bold">{heartbeatsCampaign.title}</h3>
              </div>
            </div>

            {/* Campaign Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-sm text-[#4E605C] leading-relaxed mb-5">
                  {heartbeatsCampaign.description}
                </p>

                {/* Key Metrics Pill Grid */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-[#FBF9F4] border border-[#E7DFD0] mb-6">
                  {heartbeatsCampaign.stats.map((st) => (
                    <div key={st.label} className="text-center">
                      <div className="text-xs font-bold text-[#141B1A]">{st.value}</div>
                      <div className="text-[10px] text-[#798C88]">{st.label}</div>
                    </div>
                  ))}
                </div>

                {/* Frequency Toggle */}
                <div className="mb-5">
                  <div className="text-xs font-semibold text-[#141B1A] mb-2 flex items-center justify-between">
                    <span>Donation Type</span>
                    <span className="text-[11px] text-[#E2583E] font-medium">80G Tax Deductible</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#F4EFE4] rounded-xl border border-[#E7DFD0]">
                    <button
                      type="button"
                      onClick={() => setHeartbeatsFrequency('one-time')}
                      className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        heartbeatsFrequency === 'one-time'
                          ? 'bg-white text-[#1B4332] shadow-xs'
                          : 'text-[#4E605C] hover:text-[#141B1A]'
                      }`}
                    >
                      One-time
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeartbeatsFrequency('monthly')}
                      className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        heartbeatsFrequency === 'monthly'
                          ? 'bg-white text-[#1B4332] shadow-xs'
                          : 'text-[#4E605C] hover:text-[#141B1A]'
                      }`}
                    >
                      Monthly Support
                    </button>
                  </div>
                </div>

                {/* Preset Amounts Grid */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-[#141B1A] mb-2">
                    Select Donation Amount
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {heartbeatsCampaign.suggestedPresets?.map((preset) => (
                      <button
                        key={preset.amount}
                        type="button"
                        onClick={() => {
                          setHeartbeatsAmount(preset.amount);
                          setHeartbeatsIsCustom(false);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all relative cursor-pointer ${
                          !heartbeatsIsCustom && heartbeatsAmount === preset.amount
                            ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-sm'
                            : 'bg-[#FBF9F4] text-[#141B1A] border-[#E7DFD0] hover:border-[#1B4332]/40 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm">₹{preset.amount.toLocaleString('en-IN')}</span>
                          {preset.isPopular && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#E2583E] text-white font-medium">
                              Popular
                            </span>
                          )}
                        </div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            !heartbeatsIsCustom && heartbeatsAmount === preset.amount
                              ? 'text-white/80'
                              : 'text-[#798C88]'
                          }`}
                        >
                          {preset.label}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount Entry */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs font-bold text-[#4E605C]">
                      ₹
                    </div>
                    <input
                      type="number"
                      placeholder="Custom amount (min. ₹500)"
                      value={heartbeatsCustom}
                      onChange={(e) => {
                        setHeartbeatsCustom(e.target.value);
                        setHeartbeatsIsCustom(true);
                      }}
                      className={`w-full pl-7 pr-3 py-2 text-xs rounded-xl border bg-white focus:outline-none transition-all ${
                        heartbeatsIsCustom
                          ? 'border-[#1B4332] ring-2 ring-[#1B4332]/20'
                          : 'border-[#E7DFD0] hover:border-[#1B4332]/30'
                      }`}
                    />
                  </div>
                </div>

                {/* Selected Impact Note */}
                <div className="p-3 rounded-xl bg-[#F4EFE4]/80 border border-[#E7DFD0] text-[11px] text-[#4E605C] mb-6 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332] shrink-0 mt-0.5" />
                  <span>
                    {heartbeatsIsCustom
                      ? `Custom contribution of ₹${getHeartbeatsTotal().toLocaleString(
                          'en-IN'
                        )} will directly finance pediatric surgery logistics and care.`
                      : heartbeatsCampaign.suggestedPresets?.find(
                          (p) => p.amount === heartbeatsAmount
                        )?.impactNote}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() =>
                  onSelectDonation({
                    campaignId: 'heartbeats',
                    campaignTitle: 'Little Heartbeats',
                    frequency: heartbeatsFrequency,
                    amount: getHeartbeatsTotal(),
                    isCustomAmount: heartbeatsIsCustom,
                    notes: 'Healthcare & Pediatric Heart Surgery Relief',
                  })
                }
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#E2583E] hover:bg-[#C8442C] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Donate ₹{getHeartbeatsTotal().toLocaleString('en-IN')}</span>
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CAMPAIGN B: Shikshalaya (Education & Child Sponsorship) */}
          {/* ========================================================= */}
          <div className="flex flex-col rounded-3xl bg-white border-2 border-[#1B4332]/30 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group relative">
            {/* Featured Ribon */}
            <div className="absolute top-4 right-4 z-20">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1B4332] text-white text-[11px] font-bold shadow-md">
                <Sparkles className="w-3 h-3 text-[#FF9E8D]" />
                Most Sustained Impact
              </span>
            </div>

            {/* Image Header with Badge */}
            <div className="relative h-60 overflow-hidden bg-[#E7DFD0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shikshalayaCampaign.image}
                alt={shikshalayaCampaign.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B4332] text-white text-xs font-semibold shadow-md">
                  <BookOpen className="w-3.5 h-3.5" />
                  Education Sponsorship
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[11px] font-semibold text-[#86EFAC] uppercase tracking-wider mb-0.5">
                  {shikshalayaCampaign.hindiTitle}
                </p>
                <h3 className="font-serif text-2xl font-bold">{shikshalayaCampaign.title}</h3>
              </div>
            </div>

            {/* Campaign Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-sm text-[#4E605C] leading-relaxed mb-5">
                  {shikshalayaCampaign.description}
                </p>

                {/* Key Metrics Pill Grid */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-[#FBF9F4] border border-[#E7DFD0] mb-6">
                  {shikshalayaCampaign.stats.map((st) => (
                    <div key={st.label} className="text-center">
                      <div className="text-xs font-bold text-[#141B1A]">{st.value}</div>
                      <div className="text-[10px] text-[#798C88]">{st.label}</div>
                    </div>
                  ))}
                </div>

                {/* Sponsorship Frequency Options (Monthly, Quarterly, Half-Yearly, Annually) */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#141B1A] mb-2">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#1B4332]" />
                      Sponsorship Frequency
                    </span>
                    <span className="text-[11px] text-[#4E605C]">₹1,200/mo base</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {shikshalayaCampaign.sponsorshipTiers?.map((tier) => (
                      <button
                        key={tier.frequency}
                        type="button"
                        onClick={() => setShikshalayaFrequency(tier.frequency)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          shikshalayaFrequency === tier.frequency
                            ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-sm'
                            : 'bg-[#FBF9F4] text-[#141B1A] border-[#E7DFD0] hover:border-[#1B4332]/40 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs">{tier.label}</span>
                          <span
                            className={`text-[10px] ${
                              shikshalayaFrequency === tier.frequency
                                ? 'text-white/80'
                                : 'text-[#798C88]'
                            }`}
                          >
                            ₹{tier.amountPerChild.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div
                          className={`text-[9px] mt-0.5 ${
                            shikshalayaFrequency === tier.frequency
                              ? 'text-[#86EFAC]'
                              : 'text-[#1B4332] font-medium'
                          }`}
                        >
                          {tier.badge}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Child Quantity Selector */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#141B1A] mb-2">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#1B4332]" />
                      Number of Children to Sponsor
                    </span>
                    <span className="text-xs font-bold text-[#1B4332]">
                      {shikshalayaChildren} {shikshalayaChildren === 1 ? 'Child' : 'Children'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 5].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setShikshalayaChildren(count)}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          shikshalayaChildren === count
                            ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                            : 'bg-[#FBF9F4] text-[#141B1A] border-[#E7DFD0] hover:border-[#1B4332]/40 hover:bg-white'
                        }`}
                      >
                        {count} {count === 1 ? 'Child' : 'Kids'}
                      </button>
                    ))}

                    {/* Stepper controls for arbitrary count */}
                    <div className="flex items-center border border-[#E7DFD0] rounded-xl bg-white overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setShikshalayaChildren(Math.max(1, shikshalayaChildren - 1))}
                        className="px-2.5 py-2 text-xs font-bold text-[#141B1A] hover:bg-[#F4EFE4] transition-colors"
                        aria-label="Decrease child count"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-[#141B1A] min-w-6 text-center">
                        {shikshalayaChildren}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShikshalayaChildren(shikshalayaChildren + 1)}
                        className="px-2.5 py-2 text-xs font-bold text-[#141B1A] hover:bg-[#F4EFE4] transition-colors"
                        aria-label="Increase child count"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Calculation Summary Box */}
                <div className="p-3.5 rounded-xl bg-[#E7F2ED] border border-[#2D6A4F]/20 text-xs text-[#14382B] mb-6 flex flex-col gap-1">
                  <div className="flex justify-between items-center font-semibold">
                    <span>
                      {shikshalayaChildren} × {shikshalayaFrequency.replace('-', ' ')} sponsorship:
                    </span>
                    <span className="text-sm font-bold text-[#1B4332]">
                      ₹{shikshalayaTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#245842]">
                    Includes tuition, school kit, uniform, nutritious lunches & quarterly report cards.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() =>
                  onSelectDonation({
                    campaignId: 'shikshalaya',
                    campaignTitle: 'Shikshalaya Child Education',
                    frequency: shikshalayaFrequency,
                    amount: shikshalayaTotal,
                    quantity: shikshalayaChildren,
                    isCustomAmount: false,
                    notes: `Sponsoring ${shikshalayaChildren} child(ren) on a ${shikshalayaFrequency} basis`,
                  })
                }
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#1B4332] hover:bg-[#14382B] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#86EFAC]" />
                <span>Sponsor Education (₹{shikshalayaTotal.toLocaleString('en-IN')})</span>
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CAMPAIGN C: Chuppi Todo (Dignity & Menstrual Hygiene) */}
          {/* ========================================================= */}
          <div className="flex flex-col rounded-3xl bg-white border border-[#E7DFD0] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
            {/* Image Header with Badge */}
            <div className="relative h-60 overflow-hidden bg-[#E7DFD0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={chuppiCampaign.image}
                alt={chuppiCampaign.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D95338] text-white text-xs font-semibold shadow-md">
                  <Smile className="w-3.5 h-3.5" />
                  Dignity & Health
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[11px] font-semibold text-[#FFB4A2] uppercase tracking-wider mb-0.5">
                  {chuppiCampaign.hindiTitle}
                </p>
                <h3 className="font-serif text-2xl font-bold">{chuppiCampaign.title}</h3>
              </div>
            </div>

            {/* Campaign Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-sm text-[#4E605C] leading-relaxed mb-5">
                  {chuppiCampaign.description}
                </p>

                {/* Key Metrics Pill Grid */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-[#FBF9F4] border border-[#E7DFD0] mb-6">
                  {chuppiCampaign.stats.map((st) => (
                    <div key={st.label} className="text-center">
                      <div className="text-xs font-bold text-[#141B1A]">{st.value}</div>
                      <div className="text-[10px] text-[#798C88]">{st.label}</div>
                    </div>
                  ))}
                </div>

                {/* Dignity Kit Tiers */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#141B1A] mb-2">
                    <span>Sponsor Dignity Kits (₹500 / kit)</span>
                    <span className="text-[11px] text-[#4E605C]">Eco-friendly & Reusable</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {chuppiCampaign.kitOptions?.map((kit) => (
                      <button
                        key={kit.units}
                        type="button"
                        onClick={() => {
                          setChuppiSelectedKit(kit.units);
                          setChuppiIsCustom(false);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          !chuppiIsCustom && chuppiSelectedKit === kit.units
                            ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-sm'
                            : 'bg-[#FBF9F4] text-[#141B1A] border-[#E7DFD0] hover:border-[#1B4332]/40 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs">{kit.label}</span>
                          <span className="font-bold text-xs">₹{kit.amount.toLocaleString('en-IN')}</span>
                        </div>
                        <div
                          className={`text-[9px] mt-0.5 line-clamp-1 ${
                            !chuppiIsCustom && chuppiSelectedKit === kit.units
                              ? 'text-white/80'
                              : 'text-[#798C88]'
                          }`}
                        >
                          {kit.impactDescription}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount Entry */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs font-bold text-[#4E605C]">
                      ₹
                    </div>
                    <input
                      type="number"
                      placeholder="Custom amount (min. ₹500)"
                      value={chuppiCustomAmount}
                      onChange={(e) => {
                        setChuppiCustomAmount(e.target.value);
                        setChuppiIsCustom(true);
                      }}
                      className={`w-full pl-7 pr-3 py-2 text-xs rounded-xl border bg-white focus:outline-none transition-all ${
                        chuppiIsCustom
                          ? 'border-[#1B4332] ring-2 ring-[#1B4332]/20'
                          : 'border-[#E7DFD0] hover:border-[#1B4332]/30'
                      }`}
                    />
                  </div>
                </div>

                {/* Selected Impact Note */}
                <div className="p-3 rounded-xl bg-[#F4EFE4]/80 border border-[#E7DFD0] text-[11px] text-[#4E605C] mb-6 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332] shrink-0 mt-0.5" />
                  <span>
                    {chuppiIsCustom
                      ? `Custom contribution of ₹${getChuppiTotal().toLocaleString(
                          'en-IN'
                        )} will provide approximately ${Math.floor(
                          getChuppiTotal() / 500
                        )} young girls with sanitary protection.`
                      : chuppiCampaign.kitOptions?.find((k) => k.units === chuppiSelectedKit)
                          ?.impactDescription}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() =>
                  onSelectDonation({
                    campaignId: 'chuppi-todo',
                    campaignTitle: 'Chuppi Todo Dignity Kits',
                    frequency: 'one-time',
                    amount: getChuppiTotal(),
                    quantity: chuppiIsCustom ? Math.floor(getChuppiTotal() / 500) : chuppiSelectedKit,
                    isCustomAmount: chuppiIsCustom,
                    notes: `Supporting menstrual dignity kits and school awareness sessions`,
                  })
                }
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#E2583E] hover:bg-[#C8442C] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Smile className="w-4 h-4 text-white" />
                <span>Support Dignity (₹{getChuppiTotal().toLocaleString('en-IN')})</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
