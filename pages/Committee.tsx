
import React from 'react';
import { COMMITTEE, EXTENDED_COMMITTEE } from '../constants';

const Committee: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16 md:mb-24 animate-blur-fade">
        <h1 className="text-4xl md:text-6xl font-bold serif text-[#C9A24D] mb-4">Organizing Committee</h1>
        <p className="text-[#9AA4B2] italic max-w-2xl mx-auto text-sm md:text-lg">The visionaries dedicated to making Jasicon 2026 an unforgettable academic milestone.</p>
      </div>

      <div className="space-y-24 md:space-y-32">
        {/* Leadership Board */}
        <section>
          <div className="flex items-center space-x-6 mb-12 animate-fade-in-up">
            <div className="h-px bg-[#1F2937] flex-grow"></div>
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#9AA4B2]">Leadership Board</h2>
            <div className="h-px bg-[#1F2937] flex-grow"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {COMMITTEE.map((member, idx) => (
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

        {/* Extended Committee Sections */}
        <section className="bg-[#121826] p-8 md:p-16 rounded-[40px] border border-[#1F2937] relative overflow-hidden animate-fade-in-up">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A24D]/5 blur-[100px] rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {EXTENDED_COMMITTEE.map((section, idx) => (
              <div key={idx} className="text-center">
                <h2 className="text-lg md:text-xl font-bold serif text-[#C9A24D] uppercase tracking-wide mb-6">{section.title}</h2>
                <div className="space-y-2">
                  {section.members.map((name, i) => (
                    <p key={i} className="text-sm md:text-base font-medium text-[#E6EAF0] hover:text-[#C9A24D] transition-colors cursor-default">{name}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Messages */}
        <section className="space-y-16">
          {/* Chairman Message */}
          <div className="bg-[#121826] border border-[#1C2533] rounded-[40px] overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 bg-[#0B0F14]/50 p-12 flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r border-[#1F2937]">
                <div className="relative w-48 h-48 mb-6">
                  <div className="absolute inset-0 bg-[#C9A24D] rounded-full opacity-10 blur-xl"></div>
                  <img
                    src={COMMITTEE.find(m => m.role.includes('Chairman'))?.imageUrl}
                    className="relative w-full h-full object-cover rounded-full border-2 border-[#C9A24D]/30 p-1"
                    alt="Dr. Jugal Kishore Choudhary"
                  />
                </div>
                <h3 className="text-2xl font-bold serif text-[#E6EAF0]">Dr. Jugal Kishore Choudhary</h3>
                <p className="text-[#C9A24D] uppercase text-[10px] tracking-widest font-black mt-2">Organising Chairman</p>
              </div>
              <div className="lg:w-2/3 p-8 md:p-16 relative">
                <div className="absolute top-8 right-8 text-[#C9A24D]/10">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H13.017V21H14.017ZM6.017 21L6.017 18C6.017 16.8954 6.91243 16 8.017 16H11.017C11.5693 16 12.017 15.5523 12.017 15V9C12.017 8.44772 11.5693 8 11.017 8H8.017C7.46472 8 7.017 8.44772 7.017 9V12C7.017 12.5523 6.56929 13 6.017 13H5.017V21H6.017Z" /></svg>
                </div>
                <h2 className="text-lg md:text-xl font-bold serif text-[#C9A24D] uppercase tracking-widest mb-8 border-b border-[#1F2937] pb-4">From the Organising Chairman's Desk</h2>
                <div className="space-y-6 text-[#9AA4B2] text-sm md:text-base leading-relaxed italic">
                  <p>In 2025 at Jamshedpur when I was hinted to hold a conference at Deoghar, the idea seemed to be an impossible task. But after repeated suggestion and encouragement by colleagues and assurance of consistent supervision by the senior master managers, I heeded to suggestions. At the outset it appeared to be mammoth challenge, a herculean task, but with time, things started to settle.</p>
                  <p>Now, it is a pride and ultimate privilege for me to welcome you all and your family on the occasion of 25th JASICON-2026 at holy city Deoghar. This conference assumes great significance in the context of knowledge expansion in post-globalization scenario. To keep in touch with the latest development in the field of surgery, we have arranged workshop, symposium and CME's.</p>
                  <p>We have arranged your accommodation in the best possible places to suit your choice and I hope all of you will enjoy the comfortable stay.</p>
                  <div className="pt-8 text-[#E6EAF0] not-italic">
                    <p className="font-bold">Thanking you.</p>
                    <p>With warm greetings,</p>
                    <p className="text-[#C9A24D] font-black mt-2">Dr. Jugal Kishore Choudhary</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secretary Message */}
          <div className="bg-[#121826] border border-[#1C2533] rounded-[40px] overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="flex flex-col lg:flex-row-reverse">
              <div className="lg:w-1/3 bg-[#0B0F14]/50 p-12 flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-l border-[#1F2937]">
                <div className="relative w-48 h-48 mb-6">
                  <div className="absolute inset-0 bg-[#C9A24D] rounded-full opacity-10 blur-xl"></div>
                  <img
                    src={COMMITTEE.find(m => m.role.includes('Secretary'))?.imageUrl}
                    className="relative w-full h-full object-cover rounded-full border-2 border-[#C9A24D]/30 p-1"
                    alt="Dr. Kumar Gourav"
                  />
                </div>
                <h3 className="text-2xl font-bold serif text-[#E6EAF0]">Dr. Kumar Gourav</h3>
                <p className="text-[#C9A24D] uppercase text-[10px] tracking-widest font-black mt-2">Organising Secretary</p>
              </div>
              <div className="lg:w-2/3 p-8 md:p-16 relative">
                <h2 className="text-lg md:text-xl font-bold serif text-[#C9A24D] uppercase tracking-widest mb-8 border-b border-[#1F2937] pb-4">Welcome to Deoghar</h2>
                <div className="space-y-6 text-[#9AA4B2] text-sm md:text-base leading-relaxed">
                  <p>It is with great enthusiasm that we invite you to 25th JASICON 2026, to be held at the seat of Baba Dham (Maihar Garden), Deoghar, from 20th to 22nd November 2026.</p>
                  <p>JASICON has remained the live wire of the surgical fraternity across the country for decades. Carrying forward this legacy, Deoghar steps in once again hosting JASICON for the second time, the last one being back in 2008—in a city celebrated for its rich history, academic spirit, warm people, incredible food, and a unique blend of tradition and modernity.</p>
                  <p>Across these days, you can look forward to insightful plenaries, interactive panel discussions with renowned faculty, hands-on skill courses for residents and consultants, spaces to present your best work, and plenty of opportunities to collaborate, learn, and grow.</p>
                  <p>And while you’re here, the energy of Deoghar will surround you—its temples and tourist spots, such as Baidyanath Mandir and its 22 other temples, Naulakha Temple of Radha Krishna, Dev Sangha, Tapovan, and Trikut Pahar, where several sages are reputed to have attained salvation.</p>
                  <p>During your stay, you all have the chance not just to learn, but to explore, unwind, and enjoy Dev Bhumi which promises great conversations, amazing food, and memories you will take home after the conference ends.</p>
                  <p className="font-bold text-[#C9A24D] italic text-center text-lg mt-8">"Come for the science, stay for the culture and enjoy The Dev Bhumi's legendary warmth and hospitality."</p>
                  <div className="pt-8 text-[#E6EAF0]">
                    <p>We look forward to welcoming you to 25th JASICON 2026 in Deoghar.</p>
                    <p className="text-[#C9A24D] font-black mt-2">Dr. Kumar Gourav</p>
                    <p className="text-[10px] uppercase font-bold text-[#9AA4B2]">Organizing Secretary</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Committee;
