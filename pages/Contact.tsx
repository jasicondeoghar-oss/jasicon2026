
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { saveContactMessage } from '../services/db';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Get form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      await saveContactMessage(data);
      setStatus('success');
      form.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Failed to send message", error);
      setStatus('idle'); // Or error state
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-20 animate-blur-fade">
        <h1 className="text-5xl font-bold serif text-[#C9A24D] mb-4">Contact Secretariat</h1>
        <p className="text-[#9AA4B2] italic max-w-2xl mx-auto leading-relaxed">
          Our dedicated team is here to assist you with registration or any other enquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-[#1F2937] hover:border-[#C9A24D]/30 transition-all group animate-slide-left">
            <div className="w-12 h-12 bg-[#C9A24D]/10 rounded-2xl flex items-center justify-center text-[#C9A24D] mb-6 group-hover:scale-110 transition-transform">
              <MapPin size={24} />
            </div>
            <h4 className="text-lg font-bold serif mb-2">Office</h4>
            <p className="text-sm text-[#9AA4B2] leading-relaxed">SHIVOLIK SURGICAL HOSPITAL, Netaji Subhash Road, Castairs Town, Deoghar - 814112</p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-[#1F2937] hover:border-[#C9A24D]/30 transition-all group animate-slide-left delay-1">
            <div className="w-12 h-12 bg-[#C9A24D]/10 rounded-2xl flex items-center justify-center text-[#C9A24D] mb-6 group-hover:scale-110 transition-transform">
              <Mail size={24} />
            </div>
            <h4 className="text-lg font-bold serif mb-2">Email</h4>
            <p className="text-sm text-[#E6EAF0]">jasicon2026@gmail.com</p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-[#1F2937] hover:border-[#C9A24D]/30 transition-all group animate-slide-left delay-2">
            <div className="w-12 h-12 bg-[#2EC4B6]/10 rounded-2xl flex items-center justify-center text-[#2EC4B6] mb-6 group-hover:scale-110 transition-transform">
              <Phone size={24} />
            </div>
            <h4 className="text-lg font-bold serif mb-1">Accommodation Help</h4>
            <div className="text-[10px] text-[#9AA4B2] font-black uppercase mb-4 italic">Accommodation self</div>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5 group-hover:border-[#C9A24D]/20 transition-all">
                <span className="text-[10px] text-[#9AA4B2] font-black uppercase">Sarvesh Jain</span>
                <a href="tel:9334223606" className="text-sm font-bold text-[#C9A24D] hover:text-white transition-colors">9334223606</a>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5 group-hover:border-[#C9A24D]/20 transition-all">
                <span className="text-[10px] text-[#9AA4B2] font-black uppercase">Shams Tabrez Alam</span>
                <a href="tel:9334386644" className="text-sm font-bold text-[#C9A24D] hover:text-white transition-colors">9334386644</a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="glass-card p-10 md:p-14 rounded-[40px] border border-[#1F2937] h-full relative overflow-hidden animate-scale-in">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-blur-fade">
                <div className="w-24 h-24 bg-[#2EC4B6]/10 text-[#2EC4B6] rounded-full flex items-center justify-center mb-8">
                  <CheckCircle size={48} className="animate-pulse" />
                </div>
                <h3 className="text-4xl font-bold serif text-white mb-4">Enquiry Received</h3>
                <p className="text-[#9AA4B2] max-w-sm">A member of our scientific secretariat will respond to your medical query within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="mt-10 text-[#C9A24D] font-bold uppercase tracking-widest text-xs hover:underline">Send another message</button>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-bold serif mb-10">Direct Enquiry</h3>
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-[#9AA4B2] font-black">Full Name</label>
                      <input type="text" name="fullName" required className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-2xl px-8 py-5 focus:outline-none focus:border-[#C9A24D]" placeholder="Dr. Jane Smith" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-[#9AA4B2] font-black">Email</label>
                      <input type="email" name="email" required className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-2xl px-8 py-5 focus:outline-none focus:border-[#C9A24D]" placeholder="jane@hospital.com" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-[#9AA4B2] font-black">Message</label>
                    <textarea name="message" rows={5} required className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-2xl px-8 py-5 focus:outline-none focus:border-[#C9A24D] resize-none" placeholder="How can we assist?"></textarea>
                  </div>

                  <button
                    disabled={status === 'submitting'}
                    className="w-full md:w-auto bg-[#C9A24D] text-[#0B0F14] px-14 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {status === 'submitting' ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /><span>Send Message</span></>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
