import React from 'react';
import { Clock } from 'lucide-react';

const Program: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24 min-h-[60vh] flex flex-col justify-center">
      <div className="text-center animate-blur-fade">
        <h1 className="text-4xl sm:text-7xl font-bold serif text-[#C9A24D] mb-6">Scientific Program</h1>
        <p className="text-[#9AA4B2] max-w-2xl italic text-sm md:text-xl leading-relaxed mx-auto mb-12">
          The preliminary academic schedule and scientific sessions for the conference.
        </p>
      </div>

      <div className="glass-card rounded-[40px] p-12 md:p-24 border border-[#1F2937] animate-scale-in delay-2 shadow-2xl flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-[#C9A24D]/10 flex items-center justify-center mb-8 border border-[#C9A24D]/20">
          <Clock size={40} className="text-[#C9A24D] animate-pulse" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold serif text-[#E6EAF0] mb-12">Programs</h2>
        <div className="space-y-12 max-w-3xl">
          <div className="flex flex-col items-center">
            <span className="text-[#C8A14D] font-bold text-xl md:text-2xl mb-2">20th November 2026</span>
            <span className="text-[#E6EAF0] text-lg md:text-2xl font-medium">Workshop</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-[#C8A14D] font-bold text-xl md:text-2xl mb-2">21st November 2026</span>
            <span className="text-[#E6EAF0] text-lg md:text-2xl font-medium leading-tight">
              Scientific Sessions, Inauguration Ceremony,<br className="hidden md:block" /> followed by Gala Dinner (Evening)
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[#C8A14D] font-bold text-xl md:text-2xl mb-2">22nd November 2026</span>
            <span className="text-[#E6EAF0] text-lg md:text-2xl font-medium">Scientific Sessions</span>
          </div>
        </div>
        <div className="mt-10 h-1 w-32 bg-gradient-to-r from-transparent via-[#C9A24D] to-transparent opacity-50"></div>
      </div>
    </div>
  );
};

export default Program;
