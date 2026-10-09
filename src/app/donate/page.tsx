'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import confetti from 'canvas-confetti';
import {
  Heart,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Activity,
  BookOpen,
  Smile,
  Copy,
  Check,
  QrCode,
  Building2,
  Lock,
  Printer,
} from 'lucide-react';
import { CAMPAIGNS, INDIAN_STATES, OFFLINE_BANK_DETAILS } from '@/constants/campaigns';
import { donorFormSchema, DonorFormValues } from '@/schemas/donorSchema';
import { CampaignId, Frequency, DonationReceipt } from '@/types/donation';
import { useToast, ToastProvider } from '@/components/Toast';

function DonateFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  // Selection state
  const [selectedCampaignId, setSelectedCampaignId] = useState<CampaignId>('heartbeats');
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number>(5000);
  const [customAmountText, setCustomAmountText] = useState<string>('');
  const [isCustomAmount, setIsCustomAmount] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectionError, setSelectionError] = useState<string | null>(null);

  // Payment simulation state
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [generatedReceipt, setGeneratedReceipt] = useState<DonationReceipt | null>(null);
  
  // Accordion state for offline donation
  const [showOfflineOptions, setShowOfflineOptions] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Initialize from searchParams
  useEffect(() => {
    const camp = searchParams?.get('campaign') as CampaignId;
    if (camp && CAMPAIGNS.find((c) => c.id === camp)) {
      setSelectedCampaignId(camp);
      if (camp === 'shikshalaya') {
        setSelectedFrequency('monthly');
      } else {
        setSelectedFrequency('one-time');
      }
    }
  }, [searchParams]);

  // Active campaign config
  const currentCampaign = CAMPAIGNS.find((c) => c.id === selectedCampaignId) || CAMPAIGNS[0];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DonorFormValues>({
    resolver: zodResolver(donorFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      panNumber: '',
      address: '',
      city: '',
      state: 'Delhi (NCT)',
      pinCode: '',
      taxReceiptRequired: true,
      anonymousDonation: false,
      agreeTerms: true,
    },
    mode: 'onBlur',
  });

  const taxReceiptRequired = watch('taxReceiptRequired');

  // Amount calculation helper
  const getComputedTotal = () => {
    if (selectedCampaignId === 'shikshalaya') {
      const rate =
        selectedFrequency === 'monthly'
          ? 1200
          : selectedFrequency === 'quarterly'
          ? 3600
          : selectedFrequency === 'half-yearly'
          ? 7200
          : 14400;
      return rate * (quantity || 1);
    }

    if (isCustomAmount) {
      const parsed = parseInt(customAmountText, 10);
      return isNaN(parsed) ? 0 : parsed;
    }
    return selectedAmount;
  };

  const copyToClipboard = (text: string, label: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`Copied ${label} to clipboard!`, 'success');
    setTimeout(() => {
      setCopiedKey(null);
    }, 3000);
  };

  const fireSuccessConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1B4332', '#E2583E', '#86EFAC', '#FFB4A2'],
      });
    } catch {
      // Fallback safe
    }
  };

  const onFormSubmit = async (data: DonorFormValues) => {
    const total = getComputedTotal();
    if (total < 100) {
      setSelectionError('Please select or enter an amount of at least ₹100.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSelectionError(null);
    setPaymentStatus('processing');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Simulate payment gateway delay
    setTimeout(() => {
      const receiptNum = `UMD-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const txnId = `TXN_DEMO_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

      const receipt: DonationReceipt = {
        receiptNumber: receiptNum,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        transactionId: txnId,
        donorName: `${data.firstName} ${data.lastName}`,
        donorEmail: data.email,
        donorPhone: `+91 ${data.phone}`,
        panNumber: data.panNumber || 'N/A (Opted out of 80G)',
        campaignTitle: currentCampaign.title,
        frequency: selectedFrequency,
        amount: total,
        quantity: selectedCampaignId === 'shikshalaya' ? quantity : undefined,
        paymentMethod: 'UPI / Demo Card (Simulated)',
        status: 'SUCCESS',
        taxExemptionNote: data.taxReceiptRequired
          ? 'Eligible for deduction under Section 80G of the Indian Income Tax Act.'
          : 'General humanitarian contribution without 80G deduction claim.',
      };

      setGeneratedReceipt(receipt);
      setPaymentStatus('success');
      fireSuccessConfetti();
      showToast('Thank you! Your demo donation was successfully processed.', 'success');
    }, 2000);
  };

  const resetForm = () => {
    setPaymentStatus('idle');
    setGeneratedReceipt(null);
  };

  if (paymentStatus === 'success' && generatedReceipt) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 border border-[#E7DFD0] shadow-xl text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#141B1A] mb-2">Donation Successful!</h2>
          <p className="text-[#4E605C] mb-8">
            Thank you for supporting {generatedReceipt.campaignTitle}. Your contribution will make a lasting impact.
          </p>

          <div className="bg-[#FBF9F4] p-6 rounded-2xl border border-[#E7DFD0] text-left mb-8">
            <div className="flex items-center justify-between border-b border-[#E7DFD0] pb-4 mb-4">
              <div>
                <span className="text-[10px] text-[#798C88] uppercase tracking-wider block">Receipt No.</span>
                <span className="font-mono font-bold text-[#141B1A]">{generatedReceipt.receiptNumber}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#798C88] uppercase tracking-wider block">Date</span>
                <span className="font-medium text-[#141B1A]">{generatedReceipt.date}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-xs text-[#798C88] block">Donor Name</span>
                <span className="font-semibold text-[#141B1A]">{generatedReceipt.donorName}</span>
              </div>
              <div>
                <span className="text-xs text-[#798C88] block">Amount Donated</span>
                <span className="font-bold text-[#1B4332]">₹{generatedReceipt.amount.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-xs text-[#798C88] block">Email ID</span>
                <span className="font-medium text-[#141B1A]">{generatedReceipt.donorEmail}</span>
              </div>
              <div>
                <span className="text-xs text-[#798C88] block">Transaction ID</span>
                <span className="font-mono text-[11px] text-[#141B1A]">{generatedReceipt.transactionId}</span>
              </div>
            </div>

            <div className="text-xs text-[#4E605C] bg-[#E7F2ED] p-3 rounded-xl border border-[#2D6A4F]/20">
              {generatedReceipt.taxExemptionNote}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1B4332] text-white font-semibold text-sm shadow-md hover:bg-[#14382B] transition-colors"
            >
              <Printer className="w-4 h-4" /> Print Receipt
            </button>
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#E7DFD0] text-[#141B1A] font-semibold text-sm shadow-sm hover:bg-[#F4EFE4] transition-colors"
            >
              Return to Home
            </button>
            <button
              onClick={resetForm}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#E7DFD0] text-[#E2583E] font-semibold text-sm shadow-sm hover:bg-[#F4EFE4] transition-colors"
            >
              <Heart className="w-4 h-4" /> Donate Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'processing') {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-[#E2583E] border-t-transparent rounded-full mx-auto mb-6"></div>
        <h3 className="text-2xl font-serif font-bold text-[#141B1A] mb-2">Processing Donation</h3>
        <p className="text-[#4E605C]">Please do not close this window or click back. We are securely connecting to the demo payment gateway...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Main Form Steps */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          {/* Section 1: Campaign Selection */}
          <section>
            <h2 className="text-xl font-serif font-bold text-[#141B1A] mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1B4332] text-white text-xs">1</span>
              Select Your Cause
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CAMPAIGNS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setSelectedCampaignId(c.id);
                    setIsCustomAmount(false);
                    if (c.id === 'shikshalaya') {
                      setSelectedFrequency('monthly');
                    } else {
                      setSelectedFrequency('one-time');
                    }
                  }}
                  className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-3 ${
                    selectedCampaignId === c.id
                      ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-md'
                      : 'bg-white text-[#141B1A] border-[#E7DFD0] hover:border-[#1B4332]/40 shadow-sm'
                  }`}
                >
                  <div className={`p-3 rounded-full ${selectedCampaignId === c.id ? 'bg-white/10' : 'bg-[#FBF9F4]'}`}>
                    {c.id === 'heartbeats' && (
                      <Activity className={`w-5 h-5 ${selectedCampaignId === c.id ? 'text-[#FF9E8D]' : 'text-[#E2583E]'}`} />
                    )}
                    {c.id === 'shikshalaya' && (
                      <BookOpen className={`w-5 h-5 ${selectedCampaignId === c.id ? 'text-[#86EFAC]' : 'text-[#1B4332]'}`} />
                    )}
                    {c.id === 'chuppi-todo' && (
                      <Smile className={`w-5 h-5 ${selectedCampaignId === c.id ? 'text-[#FFB4A2]' : 'text-[#D95338]'}`} />
                    )}
                  </div>
                  <div>
                    <span className="font-bold text-sm block leading-tight">{c.title}</span>
                    <span className={`text-[10px] mt-1 block ${selectedCampaignId === c.id ? 'text-white/70' : 'text-[#798C88]'}`}>
                      {c.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Amount / Frequency specific to the selected campaign */}
            <div className="mt-6 p-6 bg-white rounded-3xl border border-[#E7DFD0] shadow-sm">
              {/* Shikshalaya Controls */}
              {selectedCampaignId === 'shikshalaya' && (
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="block text-sm font-bold text-[#141B1A] mb-3">Sponsorship Frequency</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: 'monthly', label: 'Monthly', cost: '₹1,200' },
                        { id: 'quarterly', label: 'Quarterly', cost: '₹3,600' },
                        { id: 'half-yearly', label: 'Half-Yearly', cost: '₹7,200' },
                        { id: 'annually', label: 'Annually', cost: '₹14,400' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedFrequency(item.id as Frequency)}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            selectedFrequency === item.id
                              ? 'bg-[#1B4332] text-white border-[#1B4332]'
                              : 'bg-[#FBF9F4] text-[#141B1A] border-[#E7DFD0] hover:border-[#1B4332]/30'
                          }`}
                        >
                          <div className="font-bold text-sm">{item.label}</div>
                          <div className={`text-xs mt-1 ${selectedFrequency === item.id ? 'text-[#86EFAC]' : 'text-[#798C88]'}`}>
                            {item.cost}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#141B1A] mb-3">Number of Children to Sponsor</label>
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 5].map((cnt) => (
                        <button
                          key={cnt}
                          type="button"
                          onClick={() => setQuantity(cnt)}
                          className={`flex-1 py-3 text-sm font-bold rounded-xl border transition-all cursor-pointer ${
                            quantity === cnt
                              ? 'bg-[#1B4332] text-white border-[#1B4332]'
                              : 'bg-[#FBF9F4] text-[#141B1A] border-[#E7DFD0]'
                          }`}
                        >
                          {cnt} {cnt === 1 ? 'Child' : 'Children'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Chuppi Todo Controls */}
              {selectedCampaignId === 'chuppi-todo' && (
                <div className="flex flex-col gap-5">
                  <label className="block text-sm font-bold text-[#141B1A]">Select Dignity Kit Tier (₹500 / Kit)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { kits: 1, amount: 500, label: '1 Kit (Individual)' },
                      { kits: 3, amount: 1500, label: '3 Kits (Study Group)' },
                      { kits: 5, amount: 2500, label: '5 Kits (Classroom)' },
                      { kits: 10, amount: 5000, label: '10 Kits + Dispenser' },
                    ].map((tier) => (
                      <button
                        key={tier.kits}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(tier.amount);
                          setQuantity(tier.kits);
                          setIsCustomAmount(false);
                          setCustomAmountText('');
                        }}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          !isCustomAmount && selectedAmount === tier.amount
                            ? 'bg-[#1B4332] text-white border-[#1B4332]'
                            : 'bg-[#FBF9F4] text-[#141B1A] border-[#E7DFD0] hover:border-[#1B4332]/40'
                        }`}
                      >
                        <div className="flex justify-between items-center font-bold text-sm">
                          <span>{tier.label}</span>
                          <span>₹{tier.amount.toLocaleString('en-IN')}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4E605C] mb-2">Or enter custom kit contribution:</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-sm font-bold text-[#4E605C]">₹</span>
                      <input
                        type="number"
                        placeholder="e.g. 7500"
                        value={customAmountText}
                        onChange={(e) => {
                          setCustomAmountText(e.target.value);
                          setIsCustomAmount(true);
                        }}
                        className="w-full pl-8 pr-4 py-3 text-sm rounded-xl border border-[#E7DFD0] bg-[#FBF9F4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Heartbeats Controls */}
              {selectedCampaignId === 'heartbeats' && (
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#F4EFE4] rounded-xl border border-[#E7DFD0]">
                    <button
                      type="button"
                      onClick={() => setSelectedFrequency('one-time')}
                      className={`py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                        selectedFrequency === 'one-time' ? 'bg-white text-[#1B4332] shadow-sm' : 'text-[#4E605C]'
                      }`}
                    >
                      One-time Gift
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedFrequency('monthly')}
                      className={`py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                        selectedFrequency === 'monthly' ? 'bg-white text-[#1B4332] shadow-sm' : 'text-[#4E605C]'
                      }`}
                    >
                      Monthly Lifeline
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#141B1A] mb-3">Suggested Contribution</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[3000, 5000, 10000, 20000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amt);
                            setIsCustomAmount(false);
                            setCustomAmountText('');
                          }}
                          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                            !isCustomAmount && selectedAmount === amt
                              ? 'bg-[#1B4332] text-white border-[#1B4332]'
                              : 'bg-[#FBF9F4] text-[#141B1A] border-[#E7DFD0] hover:border-[#1B4332]/40'
                          }`}
                        >
                          <div className="font-bold text-base">₹{amt.toLocaleString('en-IN')}</div>
                          <div className={`text-xs mt-1 ${!isCustomAmount && selectedAmount === amt ? 'text-white/80' : 'text-[#798C88]'}`}>
                            {amt === 3000 && 'Diagnostic & Meds'}
                            {amt === 5000 && 'Cardiac 2D Echo'}
                            {amt === 10000 && 'ICU Monitoring'}
                            {amt === 20000 && 'Surgery Subsidy'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4E605C] mb-2">Or enter custom healthcare amount:</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-sm font-bold text-[#4E605C]">₹</span>
                      <input
                        type="number"
                        placeholder="e.g. 15000"
                        value={customAmountText}
                        onChange={(e) => {
                          setCustomAmountText(e.target.value);
                          setIsCustomAmount(true);
                        }}
                        className="w-full pl-8 pr-4 py-3 text-sm rounded-xl border border-[#E7DFD0] bg-[#FBF9F4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                      />
                    </div>
                  </div>
                </div>
              )}
              {selectionError && (
                <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{selectionError}</span>
                </div>
              )}
            </div>
          </section>

          {/* Section 2: Donor Details */}
          <section>
            <h2 className="text-xl font-serif font-bold text-[#141B1A] mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1B4332] text-white text-xs">2</span>
              Donor Details
            </h2>
            
            <div className="p-6 bg-white rounded-3xl border border-[#E7DFD0] shadow-sm flex flex-col gap-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#141B1A] mb-1.5">First Name <span className="text-red-500">*</span></label>
                  <input type="text" {...register('firstName')} placeholder="e.g. Ramesh" className="w-full px-4 py-3 text-sm rounded-xl border border-[#E7DFD0] bg-[#FBF9F4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20" />
                  {errors.firstName && <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#141B1A] mb-1.5">Last Name <span className="text-red-500">*</span></label>
                  <input type="text" {...register('lastName')} placeholder="e.g. Sharma" className="w-full px-4 py-3 text-sm rounded-xl border border-[#E7DFD0] bg-[#FBF9F4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20" />
                  {errors.lastName && <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.lastName.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#141B1A] mb-1.5">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" {...register('email')} placeholder="name@example.com" className="w-full px-4 py-3 text-sm rounded-xl border border-[#E7DFD0] bg-[#FBF9F4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20" />
                  {errors.email && <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#141B1A] mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-sm font-medium text-[#798C88]">+91</span>
                    <input type="tel" {...register('phone')} placeholder="9876543210" maxLength={10} className="w-full pl-12 pr-4 py-3 text-sm rounded-xl border border-[#E7DFD0] bg-[#FBF9F4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20" />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone.message}</p>}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F4EFE4] border border-[#E7DFD0]">
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="taxReceiptRequired" {...register('taxReceiptRequired')} className="mt-1 w-4 h-4 rounded text-[#1B4332] focus:ring-[#1B4332]" />
                  <div>
                    <label htmlFor="taxReceiptRequired" className="text-sm font-bold text-[#141B1A] cursor-pointer">I require an 80G Tax Exemption Certificate</label>
                    <p className="text-xs text-[#4E605C] leading-snug mt-1">A valid PAN is compulsory for filing Form 10BD and issuing tax exemption certificates.</p>
                  </div>
                </div>
                {taxReceiptRequired && (
                  <div className="mt-4 pt-4 border-t border-[#E7DFD0]">
                    <label className="block text-xs font-semibold text-[#141B1A] mb-1.5">Permanent Account Number (PAN) <span className="text-red-500">*</span></label>
                    <input type="text" {...register('panNumber')} placeholder="e.g. ABCDE1234F" maxLength={10} className="w-full uppercase px-4 py-3 text-sm tracking-wider font-mono rounded-xl border border-[#E7DFD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20" />
                    {errors.panNumber && <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.panNumber.message}</p>}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#141B1A] mb-1.5">Street Address <span className="text-red-500">*</span></label>
                <input type="text" {...register('address')} placeholder="Apartment, building, and street name" className="w-full px-4 py-3 text-sm rounded-xl border border-[#E7DFD0] bg-[#FBF9F4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20" />
                {errors.address && <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.address.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#141B1A] mb-1.5">City <span className="text-red-500">*</span></label>
                  <input type="text" {...register('city')} placeholder="City" className="w-full px-4 py-3 text-sm rounded-xl border border-[#E7DFD0] bg-[#FBF9F4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20" />
                  {errors.city && <p className="text-[11px] text-red-600 mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#141B1A] mb-1.5">State <span className="text-red-500">*</span></label>
                  <select {...register('state')} className="w-full px-4 py-3 text-sm rounded-xl border border-[#E7DFD0] bg-[#FBF9F4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20">
                    {INDIAN_STATES.map((st) => <option key={st} value={st}>{st}</option>)}
                  </select>
                  {errors.state && <p className="text-[11px] text-red-600 mt-1">{errors.state.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#141B1A] mb-1.5">PIN Code <span className="text-red-500">*</span></label>
                  <input type="text" {...register('pinCode')} placeholder="6 digits" maxLength={6} className="w-full px-4 py-3 text-sm rounded-xl border border-[#E7DFD0] bg-[#FBF9F4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20" />
                  {errors.pinCode && <p className="text-[11px] text-red-600 mt-1">{errors.pinCode.message}</p>}
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Offline Donations */}
          <section>
            <div className="bg-white rounded-3xl border border-[#E7DFD0] shadow-sm overflow-hidden">
              <button 
                type="button"
                onClick={() => setShowOfflineOptions(!showOfflineOptions)}
                className="w-full flex items-center justify-between p-6 hover:bg-[#FBF9F4] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F4EFE4] flex items-center justify-center text-[#1B4332]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-serif font-bold text-lg text-[#141B1A]">Other Ways to Donate</h3>
                    <p className="text-xs text-[#4E605C]">Direct Bank Transfer, UPI & Cheques</p>
                  </div>
                </div>
                <div className={`transform transition-transform ${showOfflineOptions ? 'rotate-180' : ''}`}>
                  <ArrowLeft className="w-5 h-5 text-[#798C88] -rotate-90" />
                </div>
              </button>

              {showOfflineOptions && (
                <div className="px-6 pb-6 pt-2 border-t border-[#E7DFD0] bg-[#FBF9F4]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* Bank Transfer */}
                    <div className="p-4 rounded-2xl bg-white border border-[#E7DFD0]">
                      <h4 className="text-sm font-bold text-[#141B1A] mb-3 border-b border-[#E7DFD0] pb-2">Direct NEFT/RTGS</h4>
                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-[#798C88]">Account Name:</span>
                          <span className="font-semibold text-[#141B1A] text-right">{OFFLINE_BANK_DETAILS.accountName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#798C88]">Account No (DEMO):</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#1B4332]">{OFFLINE_BANK_DETAILS.accountNumber}</span>
                            <button type="button" onClick={() => copyToClipboard(OFFLINE_BANK_DETAILS.accountNumber, 'Account', 'acc')} className="text-[#798C88] hover:text-[#141B1A]"><Copy className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#798C88]">IFSC:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#141B1A]">{OFFLINE_BANK_DETAILS.ifscCode}</span>
                            <button type="button" onClick={() => copyToClipboard(OFFLINE_BANK_DETAILS.ifscCode, 'IFSC', 'ifsc')} className="text-[#798C88] hover:text-[#141B1A]"><Copy className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* UPI Demo */}
                    <div className="p-4 rounded-2xl bg-[#14382B] text-white border border-[#2D6A4F]">
                      <h4 className="text-sm font-bold mb-3 border-b border-white/20 pb-2 flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-[#86EFAC]" /> Scan UPI (DEMO)
                      </h4>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-white rounded-xl p-2 flex items-center justify-center relative">
                          <QrCode className="w-full h-full text-[#14382B] opacity-50" />
                          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                            <span className="text-[8px] font-bold text-[#14382B] uppercase">Demo QR</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <span className="text-[10px] text-white/60 uppercase tracking-wider block mb-1">Demo UPI ID</span>
                          <span className="font-mono text-sm font-bold block mb-2">{OFFLINE_BANK_DETAILS.upiId}</span>
                          <p className="text-[10px] text-[#FF9E8D] italic">Do not send real funds.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
          
        </div>

        {/* RIGHT COLUMN: Summary Box (Sticky) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="bg-white rounded-3xl border border-[#E7DFD0] shadow-xl overflow-hidden">
            <div className="bg-[#14382B] p-5 text-center text-white relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#E2583E]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#86EFAC]/10 rounded-full blur-2xl pointer-events-none" />
              
              <Heart className="w-8 h-8 fill-[#FF9E8D] mx-auto mb-2 relative z-10" />
              <h3 className="font-serif text-xl font-bold relative z-10">Donation Summary</h3>
            </div>
            
            <div className="p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2 pb-5 border-b border-[#E7DFD0]">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-[#4E605C]">Campaign</span>
                  <span className="text-sm font-bold text-[#141B1A] text-right">{currentCampaign.title}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-[#4E605C]">Frequency</span>
                  <span className="text-sm font-bold text-[#141B1A] capitalize">{selectedFrequency.replace('-', ' ')}</span>
                </div>
                {selectedCampaignId === 'shikshalaya' && (
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-[#4E605C]">Sponsoring</span>
                    <span className="text-sm font-bold text-[#141B1A]">{quantity} Child(ren)</span>
                  </div>
                )}
                {selectedCampaignId === 'chuppi-todo' && quantity > 1 && !isCustomAmount && (
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-[#4E605C]">Dignity Kits</span>
                    <span className="text-sm font-bold text-[#141B1A]">{quantity}</span>
                  </div>
                )}
                <div className="flex justify-between items-start mt-2 pt-2 border-t border-dashed border-[#E7DFD0]">
                  <span className="text-base font-bold text-[#141B1A]">Total Amount</span>
                  <span className="text-2xl font-serif font-bold text-[#1B4332]">₹{getComputedTotal().toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Secure Payment Note */}
              <div className="flex items-center gap-2 p-3 bg-[#E7F2ED] text-[#14382B] rounded-xl border border-[#2D6A4F]/20 text-xs font-medium">
                <Lock className="w-4 h-4 shrink-0" />
                <span>Your transaction is encrypted and secured by Demo Payment Gateway.</span>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" id="agreeTerms" {...register('agreeTerms')} className="mt-0.5 w-4 h-4 rounded text-[#1B4332] focus:ring-[#1B4332]" />
                <label htmlFor="agreeTerms" className="text-[11px] text-[#4E605C] cursor-pointer">
                  I agree that I am making a voluntary donation. I have read the terms, conditions, and privacy policy. (This is a demo interaction).
                </label>
              </div>
              {errors.agreeTerms && <p className="text-[11px] text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.agreeTerms.message}</p>}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#E2583E] hover:bg-[#C8442C] text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>Donate ₹{getComputedTotal().toLocaleString('en-IN')} Now</span>
              </button>
            </div>
            
            <div className="bg-[#FBF9F4] p-4 border-t border-[#E7DFD0] text-center flex flex-col gap-2">
              <span className="inline-flex mx-auto items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7DFD0] text-[#1B4332] text-[10px] font-bold tracking-wider uppercase shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" /> 80G Tax Deductible
              </span>
              <span className="text-[10px] text-[#798C88]">Umeed Foundation is a registered NGO.</span>
            </div>
          </div>
        </div>

      </div>
    </form>
  );
}

export default function DonatePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#141B1A]">
      {/* Header */}
      <header className="bg-white border-b border-[#E7DFD0] sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1B4332] flex items-center justify-center text-white shadow-sm group-hover:bg-[#14382B] transition-colors relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0F2B20] to-[#2D6A4F] opacity-90" />
              <Heart className="w-5 h-5 text-[#FF9E8D] relative z-10 fill-[#FF9E8D]/30" />
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="font-serif text-lg font-bold tracking-tight text-[#141B1A] group-hover:text-[#1B4332] transition-colors leading-tight">
                Umeed <span className="text-[#E2583E] font-sans font-medium text-base">Foundation</span>
              </span>
              <span className="text-[9px] tracking-wider uppercase text-[#4E605C] font-semibold leading-tight">
                Secure Donation
              </span>
            </div>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#1B4332] bg-[#E7F2ED] px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4" /> 100% Secure
            </div>
            <button 
              onClick={() => router.push('/')}
              className="text-sm font-semibold text-[#4E605C] hover:text-[#1B4332] transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ToastProvider>
          <Suspense fallback={<div className="py-20 text-center animate-pulse text-[#4E605C] font-medium">Loading secure donation portal...</div>}>
            <DonateFormContent />
          </Suspense>
        </ToastProvider>
      </main>
      
      <footer className="border-t border-[#E7DFD0] py-8 text-center bg-white mt-10">
        <p className="text-xs text-[#798C88]">© 2026 Umeed Foundation (Demo). All rights reserved.</p>
        <p className="text-[10px] text-[#798C88] mt-1">This is a demonstration interface. No real transactions are processed.</p>
      </footer>
    </div>
  );
}
