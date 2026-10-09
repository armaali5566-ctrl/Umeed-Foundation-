'use client';

import React, { useState } from 'react';
import {
  Heart,
  Activity,
  BookOpen,
  Smile,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Users,
  Calendar,
} from 'lucide-react';
import { CAMPAIGNS } from '@/constants/campaigns';
import { CampaignId, DonationSelection, Frequency } from '@/types/donation';

interface InteractiveDonationWidgetProps {
  onOpenDonateModal: (selection: DonationSelection) => void;
}

export default function InteractiveDonationWidget({
  onOpenDonateModal,
}: InteractiveDonationWidgetProps) {
  const [activeCampaignId, setActiveCampaignId] = useState<CampaignId>('heartbeats');
  const [frequency, setFrequency] = useState<Frequency>('one-time');
  const [amount, setAmount] = useState<number>(5000);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const activeCampaign = CAMPAIGNS.find((c) => c.id === activeCampaignId) || CAMPAIGNS[0];

  // Shikshalaya calculation
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

  const getComputedAmount = () => {
    if (activeCampaignId === 'shikshalaya') {
      return getShikshalayaRate(frequency) * quantity;
    }
    if (isCustom) {
      const parsed = parseInt(customText, 10);
      return isNaN(parsed) || parsed < 100 ? 500 : parsed;
    }
    return amount;
  };

  const handleProceed = () => {
    onOpenDonateModal({
      campaignId: activeCampaignId,
      campaignTitle: activeCampaign.title,
      frequency,
      amount: getComputedAmount(),
      quantity: activeCampaignId === 'shikshalaya' ? quantity : undefined,
      isCustomAmount: isCustom,
      notes: `Custom donation widget selection`,
    });
  };

  return (
    <section className="py-16 bg-[#14382B] text-white relative overflow-hidden">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E2583E]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#86EFAC]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Callout and Purpose */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2583E]/20 text-[#FF9E8D] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#E2583E]/30">
              <Sparkles className="w-3.5 h-3.5" /> Instant Impact Calculator
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
              Every Penny Directs Hope to Where It Matters.
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-6">
              Customize your donation and see the immediate real-world difference your contribution
              creates. 100% of your gift is audited and certified.
            </p>

            <div className="space-y-3 text-xs text-white/90">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#86EFAC]" />
                <span>Instant 80G tax deduction receipt upon confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#86EFAC]" />
                <span>Quarterly program tracking reports sent to your email</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#86EFAC]" />
                <span>Zero administrative deduction from child sponsorship funds</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Box */}
          <div className="lg:col-span-7 bg-white text-[#141B1A] p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20">
            {/* Campaign Selection Tabs */}
            <div className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#798C88] mb-2">
                Select Cause
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'heartbeats', label: 'Little Heartbeats', icon: Activity, color: '#E2583E' },
                  { id: 'shikshalaya', label: 'Shikshalaya', icon: BookOpen, color: '#1B4332' },
                  { id: 'chuppi-todo', label: 'Chuppi Todo', icon: Smile, color: '#D95338' },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeCampaignId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveCampaignId(item.id as CampaignId);
                        setIsCustom(false);
                        if (item.id === 'shikshalaya') {
                          setFrequency('monthly');
                        } else {
                          setFrequency('one-time');
                        }
                      }}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-sm'
                          : 'bg-[#FBF9F4] text-[#141B1A] border-[#E7DFD0] hover:border-[#1B4332]/40'
                      }`}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: isSelected ? '#86EFAC' : item.color }}
                      />
                      <span className="text-xs font-bold leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Campaign Specific Dynamic Controls */}
            {activeCampaignId === 'shikshalaya' ? (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-[#141B1A] mb-1.5">
                    Sponsorship Cycle
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'monthly', label: 'Monthly' },
                      { id: 'quarterly', label: 'Quarterly' },
                      { id: 'half-yearly', label: 'Half-Yearly' },
                      { id: 'annually', label: 'Annually' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFrequency(f.id as Frequency)}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          frequency === f.id
                            ? 'bg-[#1B4332] text-white border-[#1B4332]'
                            : 'bg-[#FBF9F4] border-[#E7DFD0]'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141B1A] mb-1.5">
                    Number of Children:
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 5].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setQuantity(cnt)}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          quantity === cnt
                            ? 'bg-[#1B4332] text-white border-[#1B4332]'
                            : 'bg-[#FBF9F4] border-[#E7DFD0]'
                        }`}
                      >
                        {cnt} {cnt === 1 ? 'Child' : 'Children'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                {/* One time vs Monthly */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#F4EFE4] rounded-xl border border-[#E7DFD0]">
                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      frequency === 'one-time' ? 'bg-white text-[#1B4332] shadow-xs' : 'text-[#4E605C]'
                    }`}
                  >
                    One-time Contribution
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      frequency === 'monthly' ? 'bg-white text-[#1B4332] shadow-xs' : 'text-[#4E605C]'
                    }`}
                  >
                    Monthly Sustained Aid
                  </button>
                </div>

                {/* Amount presets */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(activeCampaignId === 'chuppi-todo'
                    ? [500, 1500, 2500, 5000]
                    : [3000, 5000, 10000, 20000]
                  ).map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setAmount(amt);
                        setIsCustom(false);
                      }}
                      className={`py-2.5 px-3 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                        !isCustom && amount === amt
                          ? 'bg-[#1B4332] text-white border-[#1B4332]'
                          : 'bg-[#FBF9F4] text-[#141B1A] border-[#E7DFD0] hover:border-[#1B4332]/30'
                      }`}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>

                {/* Custom Input */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-[#4E605C]">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="Enter custom amount (min ₹500)"
                    value={customText}
                    onChange={(e) => {
                      setCustomText(e.target.value);
                      setIsCustom(true);
                    }}
                    className={`w-full pl-7 pr-3 py-2 text-xs rounded-xl border bg-white focus:outline-none transition-all ${
                      isCustom ? 'border-[#1B4332] ring-2 ring-[#1B4332]/20' : 'border-[#E7DFD0]'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Total and Action */}
            <div className="p-4 rounded-2xl bg-[#E7F2ED] border border-[#2D6A4F]/20 flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#245842] tracking-wider block">
                  Donation Total:
                </span>
                <span className="font-serif font-bold text-2xl text-[#14382B]">
                  ₹{getComputedAmount().toLocaleString('en-IN')}
                  <span className="font-sans text-xs font-normal text-[#2D6A4F] ml-1">
                    ({frequency.replace('-', ' ')})
                  </span>
                </span>
              </div>

              <button
                type="button"
                onClick={handleProceed}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E2583E] hover:bg-[#C8442C] text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Proceed to Donate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center">
              <span className="text-[11px] text-[#798C88] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1B4332]" />
                Tax exemption certificate (80G) generated immediately in demo preview
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
