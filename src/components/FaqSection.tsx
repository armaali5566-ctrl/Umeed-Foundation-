'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircleQuestion } from 'lucide-react';
import { FAQS } from '@/constants/campaigns';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-[#F4EFE4]/60 border-t border-[#E7DFD0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/20 text-[#1B4332] text-xs font-semibold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#E2583E]" />
            <span>Answers for Thoughtful Donors</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141B1A] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#4E605C] leading-relaxed">
            Everything you need to know about donation governance, tax documentation, and program
            operations.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-white border border-[#E7DFD0] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FBF9F4] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#141B1A]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#1B4332] text-white rotate-180'
                        : 'bg-[#F4EFE4] text-[#141B1A]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-[#4E605C] leading-relaxed border-t border-[#E7DFD0]/60 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-[#E7DFD0] text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#E2583E]/10 flex items-center justify-center text-[#E2583E]">
              <MessageCircleQuestion className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#141B1A]">Have a specific query?</div>
              <p className="text-xs text-[#798C88]">Our donor support team is happy to assist you.</p>
            </div>
          </div>
          <a
            href="mailto:care@umeedfoundation.org"
            className="px-5 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#14382B] text-white font-medium text-xs shadow transition-colors"
          >
            Email care@umeedfoundation.org
          </a>
        </div>

      </div>
    </section>
  );
}
