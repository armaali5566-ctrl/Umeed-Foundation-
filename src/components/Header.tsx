'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, Phone, Mail, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';
import { CampaignId } from '@/types/donation';

interface HeaderProps {
  onOpenDonateModal: (campaignId?: CampaignId) => void;
}

export default function Header({ onOpenDonateModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Our Causes', href: '#causes' },
    { label: 'Our Impact', href: '#impact' },
    { label: 'Stories', href: '#stories' },
    { label: 'Offline Giving', href: '#offline-donation' },
    { label: 'FAQs', href: '#faqs' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#14382B] text-white/90 text-xs py-2 px-4 border-b border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#E2583E]/20 text-[#FF9E8D] font-medium text-[11px] border border-[#E2583E]/30">
              <Sparkles className="w-3 h-3 text-[#FF9E8D]" /> Verified NGO Initiative
            </span>
            <span className="text-white/60">•</span>
            <span className="text-white/80">Every donation creates measurable change on the ground</span>
            <span className="text-white/60">•</span>
            <span className="text-[#86EFAC] font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 80G Tax Deductible
            </span>
          </div>

          <div className="flex items-center gap-4 text-white/80">
            <a
              href="tel:+911141254474"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3" /> +91-11-41254474
            </a>
            <span className="text-white/40">|</span>
            <a
              href="mailto:care@umeedfoundation.org"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Mail className="w-3 h-3" /> care@umeedfoundation.org
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FBF9F4]/95 backdrop-blur-md shadow-md py-3 border-b border-[#E7DFD0]'
            : 'bg-[#FBF9F4] py-4 border-b border-[#E7DFD0]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & NGO Identity */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332] rounded-lg"
          >
            <div className="w-11 h-11 rounded-xl bg-[#1B4332] flex items-center justify-center text-white shadow-sm group-hover:bg-[#14382B] transition-colors relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0F2B20] to-[#2D6A4F] opacity-90" />
              <Heart className="w-5 h-5 text-[#FF9E8D] relative z-10 fill-[#FF9E8D]/30" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#141B1A] group-hover:text-[#1B4332] transition-colors">
                Umeed <span className="text-[#E2583E] font-sans font-medium text-lg">Foundation</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[#4E605C] font-semibold">
                Hope for Every Child
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[14px] font-medium text-[#2D3B38] hover:text-[#1B4332] transition-colors relative py-1 hover:font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1B4332] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenDonateModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E2583E] hover:bg-[#C8442C] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Donate Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenDonateModal()}
              className="inline-flex sm:hidden items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E2583E] text-white font-medium text-xs shadow"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Donate</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#2D3B38] hover:bg-[#E7DFD0]/40 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-[#FBF9F4] border-b border-[#E7DFD0] px-4 pt-2 pb-6 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-2 pt-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="flex items-center justify-between w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-[#2D3B38] hover:bg-[#F4EFE4] hover:text-[#1B4332] transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#798C88]" />
                </button>
              ))}

              <div className="pt-4 border-t border-[#E7DFD0] mt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDonateModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#E2583E] text-white font-semibold text-base shadow-md"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Donate Now</span>
                </button>
              </div>

              <div className="pt-3 text-xs text-[#4E605C] flex flex-col gap-1.5 px-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-[#1B4332]" />
                  <span>+91-11-41254474</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-[#1B4332]" />
                  <span>care@umeedfoundation.org</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
