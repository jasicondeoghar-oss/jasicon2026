
import React from 'react';
import { Coffee, Car, Shield, Clock } from 'lucide-react';

const Accommodation: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-20 animate-blur-fade">
        <h1 className="text-5xl font-bold serif text-[#C9A24D] mb-4">Accommodation</h1>
        <p className="text-[#9AA4B2] italic max-w-2xl mx-auto leading-relaxed">
          We are finalizing partnerships with Deoghar's premier hotels to ensure a comfortable stay for all delegates.
        </p>
      </div>

      <div className="glass-card rounded-[40px] p-12 md:p-24 border border-[#1F2937] animate-scale-in shadow-2xl flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-[#C9A24D]/10 flex items-center justify-center mb-8 border border-[#C9A24D]/20">
          <Clock size={40} className="text-[#C9A24D] animate-pulse" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold serif text-[#E6EAF0] mb-6">Coming Soon</h2>
        <p className="text-[#9AA4B2] max-w-xl text-lg leading-relaxed mb-8">
          The list of recommended hotels and special conference rates for Deoghar will be announced shortly.
        </p>
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#C9A24D] to-transparent opacity-50"></div>
      </div>

      <div className="mt-20 glass-card p-12 rounded-[40px] border border-[#C9A24D]/20 bg-gradient-to-br from-[#121826] to-[#0B0F14] animate-blur-fade">
        <p className="text-center text-[#C9A24D] font-bold uppercase tracking-[0.2em] text-[10px] mb-12">Planned Delegate Services</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="w-12 h-12 bg-[#C9A24D]/10 rounded-2xl flex items-center justify-center text-[#C9A24D] mx-auto mb-4 transition-transform hover:scale-110">
              <Car size={24} />
            </div>
            <h4 className="font-bold serif mb-2 text-[#E6EAF0]">Shuttle Service</h4>
            <p className="text-sm text-[#9AA4B2]">Complementary shuttle service from major hotels to the venue for all registered delegates.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#C9A24D]/10 rounded-2xl flex items-center justify-center text-[#C9A24D] mx-auto mb-4 transition-transform hover:scale-110">
              <Coffee size={24} />
            </div>
            <h4 className="font-bold serif mb-2 text-[#E6EAF0]">Hospitality Desk</h4>
            <p className="text-sm text-[#9AA4B2]">Dedicated hospitality and help desks will be available at partner hotels and Jasidih junction.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#C9A24D]/10 rounded-2xl flex items-center justify-center text-[#C9A24D] mx-auto mb-4 transition-transform hover:scale-110">
              <Shield size={24} />
            </div>
            <h4 className="font-bold serif mb-2 text-[#E6EAF0]">Concierge Desk</h4>
            <p className="text-sm text-[#9AA4B2]">Dedicated JASICON 2026 concierge desk at all partner hotels for travel assistance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accommodation;
