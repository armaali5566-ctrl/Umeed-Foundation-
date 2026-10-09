'use client';

import React from 'react';
import {
  ShieldCheck,
  TrendingUp,
  FileText,
  Users,
  HeartPulse,
  GraduationCap,
  Sparkles,
  Award,
  CheckCircle,
} from 'lucide-react';
import { FUND_ALLOCATION, IMPACT_METRICS } from '@/constants/campaigns';

export default function ImpactTransparency() {
  return (
    <section id="impact" className="py-20 lg:py-28 bg-[#F4EFE4]/60 border-t border-[#E7DFD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/20 text-[#1B4332] text-xs font-semibold tracking-wider uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E2583E]" />
            <span>Audited Accountability & Proven Results</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141B1A] mb-4">
            Transparent by Design, Impactful by Heart
          </h2>
          <p className="text-base text-[#4E605C] leading-relaxed">
            We believe donors deserve complete clarity on where their contributions go. Our open-book
            governance guarantees maximum funds directly reach children and families.
          </p>
        </div>

        {/* 4 Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {IMPACT_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="p-6 rounded-3xl bg-white border border-[#E7DFD0] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center">
                  {metric.icon === 'GraduationCap' && <GraduationCap className="w-6 h-6" />}
                  {metric.icon === 'HeartPulse' && <HeartPulse className="w-6 h-6 text-[#E2583E]" />}
                  {metric.icon === 'ShieldCheck' && <ShieldCheck className="w-6 h-6" />}
                  {metric.icon === 'Sparkles' && <Sparkles className="w-6 h-6 text-[#E2583E]" />}
                </div>
                <span className="text-[10px] uppercase font-bold text-[#798C88] tracking-wider">
                  Verified Data
                </span>
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#141B1A] tracking-tight mb-1">
                {metric.value}
              </div>
              <div className="text-sm font-bold text-[#1B4332] mb-1">{metric.label}</div>
              <p className="text-xs text-[#798C88]">{metric.sublabel}</p>
            </div>
          ))}
        </div>

        {/* Use-of-Funds Breakdown & Governance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-[#E7DFD0] p-6 sm:p-10 shadow-lg">
          
          {/* Left Column: Fund Allocation Bars */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2583E]/10 text-[#E2583E] text-xs font-semibold uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Where Every Rupee Goes</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#141B1A] mb-3">
              86% Goes Directly to Programs
            </h3>
            <p className="text-sm text-[#4E605C] mb-8 leading-relaxed">
              We maintain one of the leanest administrative footprints in the non-profit sector.
              Every operational expenditure is audited to guarantee donor efficiency.
            </p>

            <div className="space-y-6">
              {FUND_ALLOCATION.map((item) => (
                <div key={item.category}>
                  <div className="flex items-center justify-between text-xs font-bold text-[#141B1A] mb-1.5">
                    <span className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.category}
                    </span>
                    <span className="font-serif text-base">{item.percentage}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-[#F4EFE4] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-[#798C88] mt-1 pl-5">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Governance Badges Card */}
          <div className="lg:col-span-5 bg-[#FBF9F4] p-6 sm:p-8 rounded-2xl border border-[#E7DFD0] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center mb-4 shadow-sm">
                <Award className="w-6 h-6 text-[#86EFAC]" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#141B1A] mb-2">
                Standards of Trust & Compliance
              </h4>
              <p className="text-xs text-[#4E605C] leading-relaxed mb-6">
                Our organization adheres to statutory Indian trust laws, statutory filings, and strict
                child protection safeguarding policies.
              </p>

              <div className="space-y-3">
                {[
                  'Registered under Indian Trusts Act, 1882',
                  'Section 12A & 80G Certified for Donor Tax Exemption',
                  'Quarterly External Financial & Programmatic Audits',
                  'Strict Zero-Tolerance Child Safeguarding Code',
                  'Public Annual Impact & Expenditure Disclosures',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5 text-xs text-[#2D3B38]">
                    <CheckCircle className="w-4 h-4 text-[#1B4332] shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E7DFD0] flex items-center justify-between text-[11px] text-[#798C88]">
              <span className="flex items-center gap-1 font-semibold text-[#1B4332]">
                <FileText className="w-3.5 h-3.5" /> Annual Report 2025-26
              </span>
              <span className="italic">Available for Audit</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
