
import React from 'react';
import { ASI_JHARKHAND_SECTIONS } from '../constants';

const ASIJharkhand: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16 md:mb-24 animate-blur-fade">
        <h1 className="text-4xl md:text-6xl font-bold serif text-[#C9A24D] mb-4">ASI Jharkhand</h1>
        <p className="text-[#9AA4B2] italic max-w-2xl mx-auto text-sm md:text-lg">The leadership and dedicated members of the Association of Surgeons of India, Jharkhand Chapter.</p>
      </div>

      <div className="space-y-16 md:space-y-24">
        {ASI_JHARKHAND_SECTIONS.map((section, sIdx) => (
          <section key={sIdx} className="animate-fade-in-up" style={{ animationDelay: `${sIdx * 0.1}s` }}>
            <div className="flex items-center space-x-6 mb-12">
              <div className="h-px bg-[#1F2937] flex-grow"></div>
              <h2 className="text-lg md:text-xl font-bold serif text-[#C9A24D] uppercase tracking-wide">{section.title}</h2>
              <div className="h-px bg-[#1F2937] flex-grow"></div>
            </div>
            
            {section.membersWithPhotos && section.membersWithPhotos.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12">
                {section.membersWithPhotos.map((member, idx) => (
                  <div key={idx} className="text-center group">
                    <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 md:mb-6">
                      <div className="absolute inset-0 bg-[#C9A24D] rounded-full transform rotate-12 scale-95 group-hover:rotate-45 transition-transform duration-500 opacity-20"></div>
                      <img 
                        src={member.imageUrl} 
                        className="relative w-full h-full object-cover rounded-full border-2 border-[#C9A24D]/30 p-1 bg-[#121826]" 
                        alt={member.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=121826&color=C9A24D`;
                        }}
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold serif text-[#E6EAF0]">{member.name}</h3>
                    {member.role && (
                      <p className="text-[#C9A24D] uppercase text-[8px] md:text-[9px] tracking-widest font-bold mt-1">{member.role}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.members && section.members.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {section.members.map((name, i) => (
                  <div key={i} className="bg-[#121826]/60 border border-[#1F2937] px-6 py-4 rounded-2xl text-center hover:border-[#C9A24D]/30 transition-all group backdrop-blur-sm">
                    <p className="text-sm md:text-base font-medium text-[#E6EAF0] group-hover:text-[#C9A24D] transition-colors">{name}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default ASIJharkhand;
