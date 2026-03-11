
import React from 'react';
import { ASI_CENTRAL } from '../constants';

const ASICentral: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16 md:mb-24 animate-blur-fade">
        <h1 className="text-4xl md:text-6xl font-bold serif text-[#C9A24D] mb-4">ASI Central</h1>
        <p className="text-[#9AA4B2] italic max-w-2xl mx-auto text-sm md:text-lg">Leading the Association of Surgeons of India at the national level.</p>
      </div>

      <div className="space-y-24 md:space-y-32">
        <section>
          <div className="flex items-center space-x-6 mb-12 animate-fade-in-up">
            <div className="h-px bg-[#1F2937] flex-grow"></div>
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#9AA4B2]">Leadership</h2>
            <div className="h-px bg-[#1F2937] flex-grow"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {ASI_CENTRAL.map((member, idx) => (
              <div key={member.id} className="text-center group animate-fade-in-up" style={{ animationDelay: `${0.1 * idx}s` }}>
                <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 md:mb-8">
                  <div className="absolute inset-0 bg-[#C9A24D] rounded-full transform rotate-12 scale-95 group-hover:rotate-45 transition-transform duration-500 opacity-20"></div>
                  <img src={member.imageUrl} className="relative w-full h-full object-cover rounded-full border-2 border-[#C9A24D]/30 p-1 bg-[#121826]" alt={member.name} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold serif text-[#E6EAF0]">{member.name}</h3>
                <p className="text-[#C9A24D] uppercase text-[9px] md:text-[10px] tracking-widest font-bold mt-2">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ASICentral;
