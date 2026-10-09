'use client';

import React from 'react';
import { Quote, MapPin, CheckCircle2, HeartHandshake, Sparkles } from 'lucide-react';
import { BENEFICIARY_STORIES } from '@/constants/campaigns';

export default function StoriesSection() {
  return (
    <section id="stories" className="py-20 lg:py-28 bg-[#FBF9F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/20 text-[#1B4332] text-xs font-semibold tracking-wider uppercase mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-[#E2583E]" />
            <span>Real Lives, Real Transformations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141B1A] mb-4">
            Stories of Hope & Courage
          </h2>
          <p className="text-base text-[#4E605C] leading-relaxed">
            Behind every number is a child who smiled again, a student who returned to school, or a young
            woman who discovered her dignity. Here is what your generosity enables.
          </p>
        </div>

        {/* 3 Editorial Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BENEFICIARY_STORIES.map((story) => (
            <div
              key={story.name}
              className="flex flex-col rounded-3xl bg-white border border-[#E7DFD0] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image Frame */}
              <div className="relative h-64 overflow-hidden bg-[#E7DFD0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#1B4332] text-xs font-bold shadow-xs">
                    {story.campaign}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#FF9E8D] font-medium mb-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{story.location}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold">{story.name}</h3>
                </div>
              </div>

              {/* Story Content & Outcome */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-[#E2583E]/20 absolute -top-3 -left-2 -z-0" />
                  <p className="text-sm text-[#4E605C] italic leading-relaxed relative z-10">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E7DFD0] flex items-start gap-2.5 bg-[#FBF9F4] p-3.5 rounded-2xl">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#1B4332] tracking-wider block">
                      Tangible Impact
                    </span>
                    <span className="text-xs font-medium text-[#141B1A] leading-snug">
                      {story.outcome}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Story Illustrative Disclaimer */}
        <p className="text-center text-xs text-[#798C88] mt-10">
          *Stories documented with prior informed consent. Specific identifying details protected in
          accordance with our Child Safeguarding Policy.
        </p>

      </div>
    </section>
  );
}
