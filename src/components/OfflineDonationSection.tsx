'use client';

import React, { useState } from 'react';
import { Copy, Check, QrCode, Building2, ShieldAlert, Sparkles, CreditCard } from 'lucide-react';
import { OFFLINE_BANK_DETAILS } from '@/constants/campaigns';
import { useToast } from './Toast';

export default function OfflineDonationSection() {
  const { showToast } = useToast();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`Copied ${label} to clipboard!`, 'success');
    setTimeout(() => {
      setCopiedKey(null);
    }, 3000);
  };

  return (
    <section id="offline-donation" className="py-20 bg-[#FBF9F4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/20 text-[#1B4332] text-xs font-semibold tracking-wider uppercase mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#E2583E]" />
            <span>Direct Bank Transfer & Wire</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141B1A] mb-4">
            Offline & Direct Bank Contributions
          </h2>
          <p className="text-sm sm:text-base text-[#4E605C] leading-relaxed">
            For major donors, CSR partnerships, or donors preferring direct NEFT, RTGS, IMPS, or UPI
            transfers. All offline contributions receive 80G documentation upon emailing payment confirmation.
          </p>

          {/* Prominent Demo Notice */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{OFFLINE_BANK_DETAILS.demoNotice}</span>
          </div>
        </div>

        {/* Bank Card & QR Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Left Column: Bank Account Details Card */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-[#E7DFD0] p-6 sm:p-8 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E7DFD0] mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center shadow-xs">
                    <Building2 className="w-6 h-6 text-[#86EFAC]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#141B1A]">
                      {OFFLINE_BANK_DETAILS.bankName}
                    </h3>
                    <p className="text-xs text-[#798C88]">{OFFLINE_BANK_DETAILS.accountType}</p>
                  </div>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#1B4332]/10 text-[#1B4332] font-bold uppercase tracking-wider">
                  Verified Trust
                </span>
              </div>

              {/* Bank Details Rows */}
              <div className="space-y-4">
                {/* Account Holder */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-[#FBF9F4] border border-[#E7DFD0] gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#798C88] tracking-wider block">
                      Account Holder Name
                    </span>
                    <span className="text-sm font-semibold text-[#141B1A]">
                      {OFFLINE_BANK_DETAILS.accountName}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(OFFLINE_BANK_DETAILS.accountName, 'Account Holder Name', 'holder')
                    }
                    className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E7DFD0] bg-white hover:bg-[#F4EFE4] text-xs font-medium text-[#141B1A] transition-all cursor-pointer"
                  >
                    {copiedKey === 'holder' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#798C88]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Account Number */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-[#FBF9F4] border border-[#E7DFD0] gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#798C88] tracking-wider block">
                      Account Number (DEMO)
                    </span>
                    <span className="text-sm font-bold font-mono text-[#1B4332]">
                      {OFFLINE_BANK_DETAILS.accountNumber}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(OFFLINE_BANK_DETAILS.accountNumber, 'Account Number', 'acc')
                    }
                    className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E7DFD0] bg-white hover:bg-[#F4EFE4] text-xs font-medium text-[#141B1A] transition-all cursor-pointer"
                  >
                    {copiedKey === 'acc' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#798C88]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* IFSC Code */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-[#FBF9F4] border border-[#E7DFD0] gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#798C88] tracking-wider block">
                      IFSC Code
                    </span>
                    <span className="text-sm font-bold font-mono text-[#141B1A]">
                      {OFFLINE_BANK_DETAILS.ifscCode}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(OFFLINE_BANK_DETAILS.ifscCode, 'IFSC Code', 'ifsc')}
                    className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E7DFD0] bg-white hover:bg-[#F4EFE4] text-xs font-medium text-[#141B1A] transition-all cursor-pointer"
                  >
                    {copiedKey === 'ifsc' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#798C88]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Branch */}
                <div className="p-3.5 rounded-xl bg-[#FBF9F4] border border-[#E7DFD0]">
                  <span className="text-[10px] uppercase font-bold text-[#798C88] tracking-wider block">
                    Branch Address
                  </span>
                  <span className="text-xs text-[#4E605C]">{OFFLINE_BANK_DETAILS.branch}</span>
                </div>
              </div>
            </div>

            {/* Note at bottom */}
            <div className="mt-6 pt-4 border-t border-[#E7DFD0] text-[11px] text-[#798C88]">
              *After completing your bank transfer, please email your transaction reference (UTR) and
              PAN copy to <span className="text-[#1B4332] font-semibold">care@umeedfoundation.org</span> to
              receive your 80G tax certificate.
            </div>
          </div>

          {/* Right Column: Demo UPI ID & QR Code */}
          <div className="lg:col-span-5 rounded-3xl bg-[#14382B] text-white p-6 sm:p-8 shadow-xl border border-white/10 flex flex-col justify-between items-center text-center">
            <div className="w-full">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E2583E] text-white text-[10px] font-bold uppercase tracking-wider mb-4">
                <CreditCard className="w-3 h-3" /> Instant UPI (DEMO)
              </span>

              <h4 className="font-serif font-bold text-xl text-white mb-2">Scan & Donate via UPI</h4>
              <p className="text-xs text-white/70 max-w-xs mx-auto mb-6">
                Works with Google Pay, PhonePe, Paytm, BHIM, or any UPI-enabled banking app.
              </p>

              {/* Visual Demo QR Code representation */}
              <div className="w-48 h-48 mx-auto bg-white p-4 rounded-2xl shadow-lg border-2 border-[#E7DFD0] flex flex-col items-center justify-center relative overflow-hidden mb-5">
                {/* Simulated QR Pattern */}
                <div className="w-full h-full border-2 border-dashed border-[#1B4332]/40 rounded-lg flex flex-col items-center justify-center p-2 relative bg-[#FBF9F4]">
                  <QrCode className="w-24 h-24 text-[#1B4332] opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[0.5px]">
                    <span className="px-2.5 py-1 bg-[#14382B] text-white text-[10px] font-bold rounded-md shadow uppercase tracking-wider">
                      Demo QR Only
                    </span>
                  </div>
                </div>
              </div>

              {/* UPI ID Pill with Copy */}
              <div className="w-full p-3 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between text-xs">
                <div className="text-left">
                  <span className="text-[10px] text-white/60 block uppercase">UPI ID (Demo):</span>
                  <span className="font-mono font-bold text-white text-xs">
                    {OFFLINE_BANK_DETAILS.upiId}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(OFFLINE_BANK_DETAILS.upiId, 'UPI ID', 'upi')}
                  className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'upi' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#86EFAC]" />
                      <span className="text-[#86EFAC] font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white/80" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-[10px] text-white/50 mt-6 italic">
              Demonstration mockup. Please do not initiate financial transactions to demo endpoints.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
