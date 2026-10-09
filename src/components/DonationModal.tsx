'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import confetti from 'canvas-confetti';
import {
  X,
  Heart,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Lock,
  Printer,
  Download,
  Share2,
  RefreshCw,
  Sparkles,
  Activity,
  BookOpen,
  Smile,
  Calendar,
  Users,
} from 'lucide-react';
import { CAMPAIGNS, INDIAN_STATES } from '@/constants/campaigns';
import { donorFormSchema, DonorFormValues } from '@/schemas/donorSchema';
import { CampaignId, DonationReceipt, DonationSelection, Frequency } from '@/types/donation';
import { useToast } from './Toast';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelection?: DonationSelection | null;
}

export default function DonationModal({
  isOpen,
  onClose,
  initialSelection,
}: DonationModalProps) {
  const { showToast } = useToast();

  // Step state: 1 = Selection, 2 = Donor Form, 3 = Payment Processing/Result
  const [step, setStep] = useState<1 | 2 | 3>(1);

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

  // Sync initial selection when opened
  useEffect(() => {
    if (initialSelection) {
      setSelectedCampaignId(initialSelection.campaignId);
      setSelectedFrequency(initialSelection.frequency);
      setSelectedAmount(initialSelection.amount);
      setIsCustomAmount(initialSelection.isCustomAmount);
      if (initialSelection.isCustomAmount) {
        setCustomAmountText(initialSelection.amount.toString());
      } else {
        setCustomAmountText('');
      }
      if (initialSelection.quantity) {
        setQuantity(initialSelection.quantity);
      }
      setStep(2); // Jump directly to donor form if configured selection passed
    } else {
      setStep(1);
    }
  }, [initialSelection, isOpen]);

  // Active campaign config
  const currentCampaign = CAMPAIGNS.find((c) => c.id === selectedCampaignId) || CAMPAIGNS[0];

  // React Hook Form for Step 2
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
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

  // Validate Step 1 selection before advancing to Step 2
  const handleProceedToDetails = () => {
    const total = getComputedTotal();
    if (total < 100) {
      setSelectionError('Please select or enter an amount of at least ₹100.');
      return;
    }
    setSelectionError(null);
    setStep(2);
  };

  // Trigger celebration confetti
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

  // Handle Form Submit (Transition to Step 3 / Gateway Simulation)
  const onFormSubmit = async (data: DonorFormValues) => {
    setStep(3);
    setPaymentStatus('processing');

    // Simulate payment gateway handshake delay (2 seconds)
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
        amount: getComputedTotal(),
        quantity: selectedCampaignId === 'shikshalaya' ? quantity : undefined,
        paymentMethod: 'UPI / Demo Card (Simulated)',
        status: 'SUCCESS',
        taxExemptionNote: data.taxReceiptRequired
          ? 'Eligible for deduction under Section 80G of the Indian Income Tax Act (Reg. No: AACTU1984RE20214).'
          : 'General humanitarian contribution without 80G deduction claim.',
      };

      setGeneratedReceipt(receipt);
      setPaymentStatus('success');
      fireSuccessConfetti();
      showToast('Thank you! Your demo donation was successfully processed.', 'success');
    }, 1800);
  };

  const handleSimulateFailure = () => {
    setPaymentStatus('failed');
    showToast('Simulated test failure triggered. You can retry with saved details.', 'error');
  };

  const handleRetryPayment = () => {
    setStep(2);
    setPaymentStatus('idle');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-2xl bg-[#FBF9F4] rounded-3xl shadow-2xl border border-[#E7DFD0] overflow-hidden my-6 z-10 max-h-[92vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="bg-[#14382B] text-white p-5 sm:px-6 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FF9E8D]">
              <Heart className="w-5 h-5 fill-[#FF9E8D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-white">
                  {step === 1 && 'Select Your Contribution'}
                  {step === 2 && 'Donor & Tax Documentation'}
                  {step === 3 && paymentStatus === 'success' && 'Donation Confirmed!'}
                  {step === 3 && paymentStatus === 'failed' && 'Transaction Error'}
                  {step === 3 && paymentStatus === 'processing' && 'Connecting to Gateway...'}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E2583E] text-white font-semibold">
                  Demo
                </span>
              </div>
              <p className="text-xs text-white/70">
                {step === 1 && 'Step 1 of 3: Choose cause, frequency & amount'}
                {step === 2 && 'Step 2 of 3: 80G tax receipt & donor information'}
                {step === 3 && 'Step 3 of 3: Gateway authorization & official receipt'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {/* ========================================================= */}
          {/* STEP 1: INTERACTIVE SELECTION */}
          {/* ========================================================= */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              {/* Campaign Picker Tabs */}
              <div>
                <label className="block text-xs font-bold text-[#141B1A] uppercase tracking-wider mb-2.5">
                  Select Cause
                </label>
                <div className="grid grid-cols-3 gap-2">
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
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        selectedCampaignId === c.id
                          ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-sm'
                          : 'bg-white text-[#141B1A] border-[#E7DFD0] hover:border-[#1B4332]/40'
                      }`}
                    >
                      {c.id === 'heartbeats' && (
                        <Activity
                          className={`w-4 h-4 ${
                            selectedCampaignId === c.id ? 'text-[#FF9E8D]' : 'text-[#E2583E]'
                          }`}
                        />
                      )}
                      {c.id === 'shikshalaya' && (
                        <BookOpen
                          className={`w-4 h-4 ${
                            selectedCampaignId === c.id ? 'text-[#86EFAC]' : 'text-[#1B4332]'
                          }`}
                        />
                      )}
                      {c.id === 'chuppi-todo' && (
                        <Smile
                          className={`w-4 h-4 ${
                            selectedCampaignId === c.id ? 'text-[#FFB4A2]' : 'text-[#D95338]'
                          }`}
                        />
                      )}
                      <span className="font-bold text-xs leading-tight">{c.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Campaign Mini Summary */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#E7DFD0] text-xs text-[#4E605C] flex items-center gap-3">
                <span className="font-semibold text-[#141B1A]">{currentCampaign.category}:</span>
                <span>{currentCampaign.tagline}</span>
              </div>

              {/* SPECIFIC CAMPAIGN CONTROLS */}
              {selectedCampaignId === 'shikshalaya' ? (
                /* Shikshalaya Controls */
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#141B1A] mb-2 flex items-center justify-between">
                      <span>Sponsorship Frequency</span>
                      <span className="text-[11px] text-[#1B4332] font-semibold">₹1,200/child/mo</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            selectedFrequency === item.id
                              ? 'bg-[#1B4332] text-white border-[#1B4332]'
                              : 'bg-white text-[#141B1A] border-[#E7DFD0] hover:border-[#1B4332]/30'
                          }`}
                        >
                          <div className="font-bold text-xs">{item.label}</div>
                          <div
                            className={`text-[10px] mt-0.5 ${
                              selectedFrequency === item.id ? 'text-[#86EFAC]' : 'text-[#798C88]'
                            }`}
                          >
                            {item.cost}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Number of Children */}
                  <div>
                    <label className="block text-xs font-bold text-[#141B1A] mb-2">
                      Number of Children to Sponsor:
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
                              : 'bg-white text-[#141B1A] border-[#E7DFD0]'
                          }`}
                        >
                          {cnt} {cnt === 1 ? 'Child' : 'Children'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : selectedCampaignId === 'chuppi-todo' ? (
                /* Chuppi Todo Controls */
                <div className="flex flex-col gap-4">
                  <label className="block text-xs font-bold text-[#141B1A] mb-1">
                    Select Dignity Kit Tier (₹500 / Kit)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
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
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          !isCustomAmount && selectedAmount === tier.amount
                            ? 'bg-[#1B4332] text-white border-[#1B4332]'
                            : 'bg-white text-[#141B1A] border-[#E7DFD0] hover:border-[#1B4332]/40'
                        }`}
                      >
                        <div className="flex justify-between items-center font-bold text-xs">
                          <span>{tier.label}</span>
                          <span>₹{tier.amount.toLocaleString('en-IN')}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="block text-xs font-medium text-[#4E605C] mb-1">
                      Or enter custom kit contribution:
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-[#4E605C]">
                        ₹
                      </span>
                      <input
                        type="number"
                        placeholder="e.g. 7500"
                        value={customAmountText}
                        onChange={(e) => {
                          setCustomAmountText(e.target.value);
                          setIsCustomAmount(true);
                        }}
                        className="w-full pl-7 pr-3 py-2 text-xs rounded-xl border border-[#E7DFD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Little Heartbeats Controls */
                <div className="flex flex-col gap-4">
                  {/* Frequency Toggle */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#F4EFE4] rounded-xl border border-[#E7DFD0]">
                    <button
                      type="button"
                      onClick={() => setSelectedFrequency('one-time')}
                      className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        selectedFrequency === 'one-time'
                          ? 'bg-white text-[#1B4332] shadow-xs'
                          : 'text-[#4E605C]'
                      }`}
                    >
                      One-time Gift
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedFrequency('monthly')}
                      className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        selectedFrequency === 'monthly'
                          ? 'bg-white text-[#1B4332] shadow-xs'
                          : 'text-[#4E605C]'
                      }`}
                    >
                      Monthly Lifeline
                    </button>
                  </div>

                  {/* Preset Buttons */}
                  <div>
                    <label className="block text-xs font-bold text-[#141B1A] mb-2">
                      Suggested Contribution
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[3000, 5000, 10000, 20000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amt);
                            setIsCustomAmount(false);
                            setCustomAmountText('');
                          }}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            !isCustomAmount && selectedAmount === amt
                              ? 'bg-[#1B4332] text-white border-[#1B4332]'
                              : 'bg-white text-[#141B1A] border-[#E7DFD0] hover:border-[#1B4332]/40'
                          }`}
                        >
                          <div className="font-bold text-sm">₹{amt.toLocaleString('en-IN')}</div>
                          <div
                            className={`text-[10px] mt-0.5 ${
                              !isCustomAmount && selectedAmount === amt
                                ? 'text-white/80'
                                : 'text-[#798C88]'
                            }`}
                          >
                            {amt === 3000 && 'Diagnostic & Meds'}
                            {amt === 5000 && 'Cardiac 2D Echo'}
                            {amt === 10000 && 'ICU Monitoring'}
                            {amt === 20000 && 'Surgery Subsidy'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="block text-xs font-medium text-[#4E605C] mb-1">
                      Or enter custom healthcare amount:
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-[#4E605C]">
                        ₹
                      </span>
                      <input
                        type="number"
                        placeholder="e.g. 15000"
                        value={customAmountText}
                        onChange={(e) => {
                          setCustomAmountText(e.target.value);
                          setIsCustomAmount(true);
                        }}
                        className="w-full pl-7 pr-3 py-2 text-xs rounded-xl border border-[#E7DFD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Error Notification if any */}
              {selectionError && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{selectionError}</span>
                </div>
              )}

              {/* Live Summary Card */}
              <div className="p-4 rounded-2xl bg-[#E7F2ED] border border-[#2D6A4F]/20 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#245842] uppercase font-bold tracking-wider">
                    Total Contribution
                  </div>
                  <div className="text-xl font-bold text-[#14382B]">
                    ₹{getComputedTotal().toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-[#2D6A4F] ml-1.5">
                      ({selectedFrequency.replace('-', ' ')})
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#1B4332] font-semibold bg-white/80 px-2.5 py-1 rounded-full border border-[#2D6A4F]/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1B4332]" />
                    80G Tax Deductible
                  </span>
                </div>
              </div>

              {/* Proceed CTA */}
              <button
                type="button"
                onClick={handleProceedToDetails}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#E2583E] hover:bg-[#C8442C] text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <span>Continue to Donor Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 2: DONOR INFORMATION FORM (React Hook Form + Zod) */}
          {/* ========================================================= */}
          {step === 2 && (
            <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-5">
              {/* Selected Amount Capsule (with Edit Link) */}
              <div className="p-3.5 rounded-2xl bg-[#F4EFE4] border border-[#E7DFD0] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#4E605C] uppercase tracking-wider block">
                    Selected Cause & Amount
                  </span>
                  <span className="font-serif font-bold text-base text-[#141B1A]">
                    {currentCampaign.title} • ₹{getComputedTotal().toLocaleString('en-IN')}{' '}
                    <span className="font-sans text-xs font-normal text-[#798C88]">
                      ({selectedFrequency})
                    </span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-[#1B4332] hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>

              {/* Personal Details: First Name, Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#141B1A] mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('firstName')}
                    placeholder="e.g. Ramesh"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7DFD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                  />
                  {errors.firstName && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141B1A] mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('lastName')}
                    placeholder="e.g. Sharma"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7DFD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                  />
                  {errors.lastName && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Details: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#141B1A] mb-1">
                    Email Address (for Receipt) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7DFD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141B1A] mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-medium text-[#798C88]">
                      +91
                    </span>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="9876543210"
                      maxLength={10}
                      className="w-full pl-11 pr-3 py-2.5 text-xs rounded-xl border border-[#E7DFD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Section 80G Tax Receipt Toggle & PAN Card */}
              <div className="p-4 rounded-2xl bg-white border border-[#E7DFD0]">
                <div className="flex items-start gap-3 mb-3">
                  <input
                    type="checkbox"
                    id="taxReceiptRequired"
                    {...register('taxReceiptRequired')}
                    className="mt-1 w-4 h-4 rounded text-[#1B4332] focus:ring-[#1B4332]"
                  />
                  <div>
                    <label
                      htmlFor="taxReceiptRequired"
                      className="text-xs font-bold text-[#141B1A] cursor-pointer"
                    >
                      I require an 80G Tax Exemption Certificate (50% Tax Deduction)
                    </label>
                    <p className="text-[11px] text-[#4E605C] leading-snug mt-0.5">
                      As mandated by the Indian Income Tax Department, a valid PAN is compulsory for
                      filing Form 10BD and issuing tax exemption certificates.
                    </p>
                  </div>
                </div>

                {taxReceiptRequired && (
                  <div className="pt-2 border-t border-[#E7DFD0]">
                    <label className="block text-xs font-semibold text-[#141B1A] mb-1">
                      Permanent Account Number (PAN) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('panNumber')}
                      placeholder="e.g. ABCDE1234F"
                      maxLength={10}
                      className="w-full uppercase px-3.5 py-2.5 text-xs tracking-wider font-mono rounded-xl border border-[#E7DFD0] bg-[#FBF9F4] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                    />
                    {errors.panNumber && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.panNumber.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Address Details */}
              <div>
                <label className="block text-xs font-semibold text-[#141B1A] mb-1">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('address')}
                  placeholder="Apartment, building, and street name"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7DFD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                />
                {errors.address && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#141B1A] mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('city')}
                    placeholder="City"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DFD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                  />
                  {errors.city && (
                    <p className="text-[10px] text-red-600 mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141B1A] mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('state')}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DFD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-[10px] text-red-600 mt-1">{errors.state.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141B1A] mb-1">
                    PIN Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('pinCode')}
                    placeholder="6 digits"
                    maxLength={6}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DFD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                  />
                  {errors.pinCode && (
                    <p className="text-[10px] text-red-600 mt-1">{errors.pinCode.message}</p>
                  )}
                </div>
              </div>

              {/* Consent and Terms Checkboxes */}
              <div className="flex flex-col gap-2.5 pt-2">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="anonymousDonation"
                    {...register('anonymousDonation')}
                    className="mt-0.5 w-4 h-4 rounded text-[#1B4332] focus:ring-[#1B4332]"
                  />
                  <label htmlFor="anonymousDonation" className="text-xs text-[#4E605C] cursor-pointer">
                    Keep my identity confidential in public annual reports
                  </label>
                </div>

                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    {...register('agreeTerms')}
                    className="mt-0.5 w-4 h-4 rounded text-[#1B4332] focus:ring-[#1B4332]"
                  />
                  <label htmlFor="agreeTerms" className="text-xs text-[#4E605C] cursor-pointer">
                    I declare that this donation is made from my own legitimate funds and agree to the{' '}
                    <span className="text-[#1B4332] font-semibold underline">Terms of Service</span>{' '}
                    and <span className="text-[#1B4332] font-semibold underline">Privacy Policy</span>.
                  </label>
                </div>
                {errors.agreeTerms && (
                  <p className="text-[11px] text-red-600">{errors.agreeTerms.message}</p>
                )}
              </div>

              {/* Step 2 Actions */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl border border-[#E7DFD0] text-[#141B1A] font-semibold text-xs hover:bg-[#F4EFE4] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#E2583E] hover:bg-[#C8442C] text-white font-semibold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    Proceed to Payment (₹{getComputedTotal().toLocaleString('en-IN')})
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* ========================================================= */}
          {/* STEP 3: DEMO GATEWAY SIMULATION & RECEIPT */}
          {/* ========================================================= */}
          {step === 3 && (
            <div>
              {/* STATE 1: PROCESSING */}
              {paymentStatus === 'processing' && (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full border-4 border-[#1B4332]/20 border-t-[#1B4332] animate-spin mb-4" />
                  <h4 className="font-serif font-bold text-xl text-[#141B1A] mb-2">
                    Securing Gateway Connection...
                  </h4>
                  <p className="text-xs text-[#4E605C] max-w-sm mb-4">
                    Authorizing sandbox verification for ₹{getComputedTotal().toLocaleString('en-IN')}.
                    Please do not refresh this window.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/10 text-[#1B4332] text-xs font-semibold">
                    <Lock className="w-3 h-3" /> 256-bit SSL Demo Encrypted
                  </div>
                </div>
              )}

              {/* STATE 2: FAILED STATE (To test failure/retry workflows) */}
              {paymentStatus === 'failed' && (
                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif font-bold text-xl text-red-700 mb-2">
                    Simulation Error Triggered
                  </h4>
                  <p className="text-xs text-[#4E605C] max-w-sm mb-6">
                    This simulated gateway decline was deliberately tested. Your entered donor details
                    remain completely intact.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleRetryPayment}
                      className="px-5 py-2.5 rounded-xl bg-[#1B4332] text-white text-xs font-semibold shadow flex items-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Retry Payment
                    </button>
                    <button
                      onClick={onClose}
                      className="px-4 py-2.5 rounded-xl border border-[#E7DFD0] text-xs font-semibold hover:bg-white cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* STATE 3: SUCCESS STATE & PRINTABLE RECEIPT */}
              {paymentStatus === 'success' && generatedReceipt && (
                <div className="flex flex-col gap-6">
                  {/* Top Success Banner */}
                  <div className="p-4 rounded-2xl bg-[#E7F2ED] border border-[#2D6A4F]/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1B4332] text-white flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-[#86EFAC]" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-base text-[#14382B]">
                          Donation Successful!
                        </h4>
                        <p className="text-[11px] text-[#245842]">
                          A confirmation receipt copy has been sent to {generatedReceipt.donorEmail}.
                        </p>
                      </div>
                    </div>
                    {/* Simulated Failure tester button */}
                    <button
                      type="button"
                      onClick={handleSimulateFailure}
                      className="text-[10px] text-[#798C88] hover:text-red-600 underline cursor-pointer"
                      title="Test how failure handling behaves"
                    >
                      Test Failure State
                    </button>
                  </div>

                  {/* OFFICIAL DEMO PRINTABLE DONATION RECEIPT */}
                  <div
                    id="printable-receipt"
                    className="p-6 rounded-3xl bg-white border-2 border-[#E7DFD0] shadow-sm text-[#141B1A]"
                  >
                    {/* Receipt NGO Header */}
                    <div className="flex items-start justify-between border-b border-[#E7DFD0] pb-4 mb-4">
                      <div>
                        <h5 className="font-serif text-xl font-bold text-[#141B1A]">
                          Umeed Foundation Trust
                        </h5>
                        <p className="text-[11px] text-[#4E605C]">
                          Regd. Charity Trust: DL/2021/008924 | Section 80G Certified
                        </p>
                        <p className="text-[10px] text-[#798C88]">
                          124, Barakhamba Road, Connaught Place, New Delhi 110001
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-[#1B4332] text-white text-[10px] font-bold tracking-wider uppercase">
                          Official Receipt (Demo)
                        </span>
                        <div className="text-xs font-mono font-bold mt-1 text-[#1B4332]">
                          {generatedReceipt.receiptNumber}
                        </div>
                        <div className="text-[10px] text-[#798C88]">{generatedReceipt.date}</div>
                      </div>
                    </div>

                    {/* Receipt Details Grid */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs mb-5">
                      <div>
                        <span className="text-[10px] text-[#798C88] uppercase block">Donor Name:</span>
                        <span className="font-semibold text-[#141B1A]">
                          {generatedReceipt.donorName}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#798C88] uppercase block">PAN Number:</span>
                        <span className="font-semibold font-mono text-[#141B1A]">
                          {generatedReceipt.panNumber}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#798C88] uppercase block">Mobile & Email:</span>
                        <span className="font-semibold text-[#141B1A]">
                          {generatedReceipt.donorPhone} | {generatedReceipt.donorEmail}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#798C88] uppercase block">
                          Transaction ID:
                        </span>
                        <span className="font-mono text-[11px] text-[#4E605C]">
                          {generatedReceipt.transactionId}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#798C88] uppercase block">Cause Supported:</span>
                        <span className="font-semibold text-[#1B4332]">
                          {generatedReceipt.campaignTitle}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#798C88] uppercase block">Frequency:</span>
                        <span className="font-semibold capitalize text-[#141B1A]">
                          {generatedReceipt.frequency}
                        </span>
                      </div>
                    </div>

                    {/* Amount Block */}
                    <div className="p-3.5 rounded-xl bg-[#FBF9F4] border border-[#E7DFD0] flex items-center justify-between mb-4">
                      <span className="font-semibold text-xs text-[#141B1A]">
                        Total Amount Received:
                      </span>
                      <span className="font-serif font-bold text-2xl text-[#1B4332]">
                        ₹{generatedReceipt.amount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Tax Note & Seal */}
                    <div className="pt-3 border-t border-[#E7DFD0] flex items-center justify-between text-[10px] text-[#4E605C]">
                      <div className="max-w-xs">{generatedReceipt.taxExemptionNote}</div>
                      <div className="text-right">
                        <div className="font-serif font-bold text-[#141B1A]">Authorized Signatory</div>
                        <div className="text-[9px] text-[#798C88]">Umeed Foundation Accounts</div>
                      </div>
                    </div>
                  </div>

                  {/* Receipt Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handlePrintReceipt}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1B4332] hover:bg-[#14382B] text-white text-xs font-semibold shadow cursor-pointer transition-colors"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print / Download Receipt</span>
                    </button>

                    <button
                      onClick={() => {
                        showToast('Receipt download initiated (PDF preview simulated)', 'info');
                      }}
                      className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-[#E7DFD0] bg-white hover:bg-[#F4EFE4] text-[#141B1A] text-xs font-semibold cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#1B4332]" />
                      <span>Save PDF</span>
                    </button>

                    <button
                      onClick={onClose}
                      className="py-3 px-5 rounded-xl border border-[#E7DFD0] bg-white hover:bg-[#F4EFE4] text-xs font-semibold cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
