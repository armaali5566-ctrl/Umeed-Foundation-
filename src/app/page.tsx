'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import InteractiveDonationWidget from '@/components/InteractiveDonationWidget';
import CampaignsSection from '@/components/CampaignsSection';
import ImpactTransparency from '@/components/ImpactTransparency';
import StoriesSection from '@/components/StoriesSection';
import OfflineDonationSection from '@/components/OfflineDonationSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import { ToastProvider } from '@/components/Toast';
import { CampaignId, DonationSelection } from '@/types/donation';
import { Heart } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  const handleOpenDonate = (campaignId?: CampaignId) => {
    if (campaignId) {
      router.push(`/donate?campaign=${campaignId}`);
    } else {
      router.push('/donate');
    }
  };

  const handleCampaignSelect = (selection: DonationSelection) => {
    router.push(`/donate?campaign=${selection.campaignId}`);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-[#141B1A]">
        {/* Navigation Bar */}
        <Header onOpenDonateModal={handleOpenDonate} />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero onOpenDonateModal={handleOpenDonate} />

          {/* Interactive Calculator Section */}
          <InteractiveDonationWidget onOpenDonateModal={handleCampaignSelect} />

          {/* 3 Dedicated Campaigns Section */}
          <CampaignsSection onSelectDonation={handleCampaignSelect} />

          {/* Impact & Fund Transparency */}
          <ImpactTransparency />

          {/* Beneficiary Transformation Stories */}
          <StoriesSection />

          {/* Bank Transfer & Offline Giving */}
          <OfflineDonationSection />

          {/* Frequently Asked Questions */}
          <FaqSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Optional Sticky Mobile Bottom Donate Bar (Convenient for mobile screens) */}
        <div className="fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-[#E7DFD0] sm:hidden flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#1B4332] tracking-wider block">
              Every Bit Counts
            </span>
            <span className="font-serif font-bold text-sm text-[#141B1A]">Support Children Today</span>
          </div>
          <button
            onClick={() => handleOpenDonate()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#E2583E] text-white font-semibold text-xs shadow-md cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Donate Now</span>
          </button>
        </div>
      </div>
    </ToastProvider>
  );
}
