'use client';

import React, { useState } from 'react';
import { Heart, Mail, Phone, MapPin, ArrowUp, ShieldCheck, Send } from 'lucide-react';
import { useToast } from './Toast';

export default function Footer() {
  const { showToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('Thank you for subscribing to our impact newsletter!', 'success');
    setNewsletterEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F2B20] text-white/90 pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E2583E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          
          {/* Col 1: NGO Identity (Col span 4) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#1B4332] flex items-center justify-center text-white border border-white/10">
                <Heart className="w-5 h-5 text-[#FF9E8D] fill-[#FF9E8D]/30" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Umeed <span className="text-[#FF9E8D] font-sans font-medium text-lg">Foundation</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-white/60 font-semibold">
                  Hope for Every Child
                </span>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed mb-6">
              A recognized public charitable initiative dedicated to ending preventable pediatric
              suffering, supporting children through dignified schooling, and empowering young women
              with menstrual health kits.
            </p>

            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#86EFAC] shrink-0 mt-0.5" />
                <span>124, Barakhamba Road, Connaught Place, New Delhi 110001, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <a href="tel:+911141254474" className="hover:text-white transition-colors">
                  +91-11-41254474
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <a href="mailto:care@umeedfoundation.org" className="hover:text-white transition-colors">
                  care@umeedfoundation.org
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (Col span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Home & Overview
                </a>
              </li>
              <li>
                <a href="#causes" className="hover:text-white transition-colors">
                  Our 3 Causes
                </a>
              </li>
              <li>
                <a href="#impact" className="hover:text-white transition-colors">
                  Fund Transparency
                </a>
              </li>
              <li>
                <a href="#stories" className="hover:text-white transition-colors">
                  Beneficiary Stories
                </a>
              </li>
              <li>
                <a href="#offline-donation" className="hover:text-white transition-colors">
                  Bank Transfer / Wire
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white transition-colors">
                  Donor FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Causes & Programs (Col span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white mb-4">
              Our Programs
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <span className="font-semibold text-white">Little Heartbeats:</span>
                <span className="block text-[11px] text-white/60">
                  Pediatric congenital cardiac surgeries & post-op ICU care.
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">Shikshalaya:</span>
                <span className="block text-[11px] text-white/60">
                  Community learning centers, uniforms, midday meals & STEM.
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">Chuppi Todo:</span>
                <span className="block text-[11px] text-white/60">
                  Menstrual dignity kits, washroom sanitation & peer workshops.
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Trust (Col span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white mb-4">
              Impact Updates
            </h4>
            <p className="text-xs text-white/70 mb-4 leading-relaxed">
              Subscribe to receive quarterly field reports, audited expenditure statements, and student
              progress letters.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#86EFAC]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-[#E2583E] hover:bg-[#C8442C] text-white text-xs font-semibold shrink-0 transition-colors flex items-center justify-center cursor-pointer"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-[#86EFAC]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Section 80G Certified • 50% Tax Exemption</span>
            </div>
          </div>

        </div>

        {/* Legal, Statutory Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p>© 2026 Umeed Foundation Trust. All rights reserved.</p>
            <p className="text-[10px] text-white/50">
              Registered Public Charitable Trust DL/2021/008924. Built with production-grade agency
              standards for portfolio demonstration.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => showToast('Terms of Service: General non-profit charitable guidelines', 'info')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={() => showToast('Privacy Policy: Strict donor data confidentiality guaranteed', 'info')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
