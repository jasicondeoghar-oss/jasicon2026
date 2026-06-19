
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Check, CreditCard, User, Briefcase, Settings, AlertCircle, Info, Loader2, Hospital, Microscope, Download, FileText, ChevronDown, Clock, QrCode } from 'lucide-react';
import { WORKSHOPS, getAssetPath } from '../constants';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import qrImage from '../src/assets/qr_payment.jpeg';

const Registration: React.FC = () => {
  const { user, completeRegistration } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const formRef = useRef<HTMLDivElement>(null);
  const passRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: (user?.displayName === 'User' ? '' : user?.displayName) || '',
    email: user?.email || '',
    age: '',
    mobile: '+91',
    institution: '',
    designation: '',
    medicalRegNo: '',
    category: 'Faculty',
    selectedWorkshops: [] as string[],
    transactionId: ''
  });

  const navigateToDashboard = () => {
    navigate('/dashboard', { state: { registered: true } });
  };

  const delegateId = `JAS26-10${user?.uid.slice(-3) || '000'}`;

  const pricingData = [
    { cat: 'Faculty', reg: '₹3000 + GST' },
    { cat: 'Delegate', reg: '₹3000 + GST' },
    { cat: 'PG Student', reg: '₹2000 + GST' },
  ];

  useEffect(() => {
    if (user && !user.regDetails) {
      setFormData(prev => ({
        ...prev,
        fullName: (user.displayName === 'User' ? '' : user.displayName) || prev.fullName,
        email: user.email || prev.email,
        // Ensure email is set even if user updates profile later or it was missed
        ...((user.email && !prev.email) ? { email: user.email } : {})
      }));
    }
  }, [user]);

  useEffect(() => {
    if (searchParams.get('start') === 'true' && user) {
      setShowForm(true);
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [user, searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    // Strict Mobile Number Logic: 10 digits (stored with +91 internally)
    if (name === 'mobile') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      newValue = '+91' + digitsOnly;
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Name is required";

      const ageNum = parseInt(formData.age);
      if (!formData.age) newErrors.age = "Age is required";
      else if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) newErrors.age = "Age must be between 18 and 100";

      if (!formData.mobile || formData.mobile === '+91') newErrors.mobile = "Mobile number is required";
      else if (formData.mobile.length !== 13) newErrors.mobile = "Mobile number must be exactly 10 digits";
    }

    if (step === 2) {
      if (!formData.category) newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleWorkshop = (id: string) => {
    setFormData(prev => {
      const isSelected = prev.selectedWorkshops.includes(id);
      return {
        ...prev,
        selectedWorkshops: isSelected
          ? prev.selectedWorkshops.filter(wId => wId !== id)
          : [...prev.selectedWorkshops, id]
      };
    });
  };

  const handleNext = () => {
    if (!validateStep()) {
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setStep(prev => Math.min(prev + 1, 4));
      setIsProcessing(false);
      window.scrollTo({ top: (formRef.current?.offsetTop || 0) - 100, behavior: 'smooth' });
    }, 400);
  };

  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const calculateTotal = () => {
    const categoryPricing: Record<string, number> = {
      'Faculty': 3000,
      'PG Student': 2000,
      'Delegate': 3000
    };
    const basePrice = categoryPricing[formData.category] || 3000;
    const workshopPrice = 0; // Workshops removed
    const subtotal = basePrice + workshopPrice;
    const gst = subtotal * 0.18;
    return {
      subtotal,
      gst,
      total: subtotal + gst
    };
  };

  const handleDownloadPDF = async () => {
    if (passRef.current) {
      setIsDownloading(true);
      try {
        const dataUrl = await toPng(passRef.current, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: '#0B0F14'
        });

        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`JASICON2026_Registration_Pass_${delegateId}.pdf`);
      } catch (err) {
        console.error('Error generating PDF:', err);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  // ── PENDING SCREEN ──
  if ((user?.registrationStatus as any) === 'pending' && !showForm) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="w-20 h-20 bg-[#C9A24D]/10 text-[#C9A24D] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
          <Clock size={40} />
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold serif text-white mb-4">Awaiting Approval</h1>
        <p className="text-[#9AA4B2] mb-6 text-sm leading-relaxed">
          Your payment has been submitted. Our team is verifying your transaction and will confirm your registration within <strong className="text-[#C9A24D]">48 hours</strong>.
        </p>
        <div className="bg-[#121826] border border-[#1F2937] rounded-2xl p-6 text-left space-y-3 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-[#9AA4B2]">Name</span>
            <span className="text-white font-medium">{user?.regDetails?.fullName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#9AA4B2]">Category</span>
            <span className="text-[#C9A24D] font-bold">{user?.regDetails?.category}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#9AA4B2]">Transaction ID</span>
            <span className="text-white font-mono">{user?.regDetails?.transactionId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#9AA4B2]">Status</span>
            <span className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase">Pending Approval</span>
          </div>
        </div>
        <Link to="/dashboard" className="bg-[#C9A24D] text-[#0B0F14] px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white transition-all inline-block">Go to Dashboard</Link>
      </div>
    );
  }


  const renderDetails = user?.regDetails || formData;

  if (user?.registrationStatus === 'completed' && !showForm) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="w-20 h-20 bg-[#2EC4B6]/10 text-[#2EC4B6] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
          <Check size={40} />
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold serif text-white mb-4">Registration Confirmed</h1>
        <p className="text-[#9AA4B2] mb-12">Your official Delegate Pass is ready for download. Please present this at the venue.</p>

        <div className="max-w-2xl mx-auto mb-12 animate-blur-fade">
          <div
            ref={passRef}
            className="bg-[#0B0F14] border-4 border-[#C9A24D]/30 rounded-[40px] p-10 md:p-14 text-left relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A24D]/5 blur-[100px]"></div>

            <div className="flex justify-between items-center mb-12 border-b border-[#1F2937] pb-8">
              <div>
                <h2 className="text-[#C9A24D] text-3xl font-black serif uppercase tracking-tighter">JASICON 2026</h2>
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#9AA4B2] mt-1 font-bold">National Conference of OBGYN</p>
              </div>
              <div className="text-right">
                <span className="bg-[#2EC4B6]/10 text-[#2EC4B6] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#2EC4B6]/20">Status: Confirmed</span>
                <p className="text-xs text-[#9AA4B2] mt-3 font-medium">ID: <span className="text-white font-bold">{delegateId}</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest text-[#9AA4B2] font-black">Delegate Name</p>
                <p className="text-xl font-bold text-white serif">{renderDetails.fullName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest text-[#9AA4B2] font-black">Medical Reg No / License</p>
                <p className="text-lg font-bold text-white uppercase">{renderDetails.medicalRegNo}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest text-[#9AA4B2] font-black">Institution</p>
                <p className="text-sm font-medium text-[#E6EAF0] leading-relaxed">{renderDetails.institution}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest text-[#9AA4B2] font-black">Designation</p>
                <p className="text-sm font-medium text-[#E6EAF0]">{renderDetails.designation}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest text-[#9AA4B2] font-black">Contact Particulars</p>
                <p className="text-xs text-[#E6EAF0]">{renderDetails.mobile}</p>
                <p className="text-xs text-[#9AA4B2] italic">{user?.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest text-[#9AA4B2] font-black">Registration Class</p>
                <p className="text-sm font-bold text-[#C9A24D] uppercase tracking-widest">{renderDetails.category}</p>
                <p className="text-[9px] text-[#9AA4B2] mt-1">Status: Registered</p>
              </div>
            </div>

            <div className="bg-[#121826] p-6 rounded-2xl mb-12 border border-[#1F2937]">
              <p className="text-[9px] uppercase tracking-widest text-[#C9A24D] font-black mb-3">Academic Curriculum</p>
              {renderDetails.selectedWorkshops.length > 0 ? (
                <ul className="space-y-2">
                  {renderDetails.selectedWorkshops.map(wId => {
                    const workshop = WORKSHOPS.find(w => w.id === wId);
                    return (
                      <li key={wId} className="flex items-center gap-3 text-xs text-[#E6EAF0]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]"></div>
                        {workshop?.title}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-xs text-[#9AA4B2] italic">Conference Attendance Only</p>
              )}
            </div>

            <div className="text-center pt-8 border-t border-[#1F2937]/50">
              <p className="text-[10px] text-[#E6EAF0] font-medium leading-relaxed mb-4 italic">
                "Access to all scientific halls, networking hub, and gala dinner is activated."
              </p>
              <span className="text-[8px] font-black uppercase tracking-[0.5em] text-[#9AA4B2]">Nov 20-22, 2026 &bull; Baidyanath Dham, Deoghar</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="w-full sm:w-auto bg-[#C9A24D] text-[#0B0F14] px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-70"
          >
            {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
            {isDownloading ? 'Generating PDF...' : 'Download Pass (PDF)'}
          </button>
          <Link to="/dashboard" className="w-full sm:w-auto bg-white/5 text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest border border-white/10 hover:bg-white/10">Go to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl sm:text-6xl font-bold serif text-[#C9A24D] mb-4">Registration</h1>
        <p className="text-[#9AA4B2] italic max-w-2xl mx-auto text-sm sm:text-base">Join the national elite in medical excellence.</p>
      </div>

      {!showForm ? (
        <div className="space-y-10 md:space-y-16">
          <div className="max-w-4xl mx-auto animate-blur-fade">
            <div className="bg-[#C9A24D]/10 border border-[#C9A24D]/20 p-4 sm:p-6 rounded-2xl flex items-center gap-4 sm:gap-6 shadow-lg shadow-[#C9A24D]/5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#C9A24D]/20 rounded-xl flex items-center justify-center text-[#C9A24D] shrink-0">
                <AlertCircle size={24} />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#C9A24D] mb-1">Important Notice</p>
                <p className="text-sm sm:text-lg font-bold text-white serif leading-tight">
                  On-spot registration: No guarantee of kit bag.
                </p>
                <p className="text-sm sm:text-lg font-bold text-white serif leading-tight mt-2">
                  Self Accommodation: Participants are requested to arrange their own accommodation.
                </p>
                <p className="text-sm sm:text-lg font-bold text-[#C9A24D] serif leading-tight mt-3">
                  Your registration will be confirmed within 48 hours.
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:block glass-card rounded-3xl overflow-hidden border border-[#1F2937] shadow-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#1F2937]/50 border-b border-[#1F2937] text-[#C9A24D] text-[10px] uppercase tracking-widest">
                  <th className="p-6">Category</th>
                  <th className="p-6 text-center">Fees</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2937] text-sm">
                {pricingData.map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors text-center">
                    <td className="p-6 font-bold text-left">{row.cat}</td>
                    <td className="p-6 font-bold text-[#C9A24D]">{row.reg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {pricingData.map((row, i) => (
              <div key={i} className="glass-card p-5 rounded-2xl border border-[#1F2937] shadow-lg">
                <h3 className="text-[#C9A24D] font-bold serif text-base mb-4 border-b border-[#1F2937] pb-2">{row.cat}</h3>
                <div className="bg-[#C9A24D]/10 p-4 rounded-xl border border-[#C9A24D]/20 flex justify-between items-center">
                  <p className="text-[10px] uppercase tracking-widest text-[#C9A24D] font-black">Fees</p>
                  <p className="text-sm font-black text-[#C9A24D]">{row.reg}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center py-6 md:py-10">
            <button
              onClick={() => { if (!user) navigate('/login'); else setShowForm(true); }}
              className="w-full sm:w-auto bg-[#C9A24D] text-[#0B0F14] px-12 py-5 rounded-full font-bold text-lg hover:bg-white shadow-xl transition-all transform hover:scale-105"
            >
              Begin Registration
            </button>
          </div>
        </div>
      ) : (
        <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-3 pb-4 lg:pb-0 scrollbar-hide">
            {[
              { n: 1, label: 'Profile', icon: <User size={16} /> },
              { n: 2, label: 'Scientific', icon: <Briefcase size={16} /> },
              { n: 3, label: 'Curriculum', icon: <Settings size={16} /> },
              { n: 4, label: 'Payment', icon: <QrCode size={16} /> },
            ].map((s) => (
              <div key={s.n} className="flex items-center space-x-3 shrink-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all ${step === s.n
                  ? 'border-[#C9A24D] bg-[#C9A24D] text-[#0B0F14]'
                  : step > s.n
                    ? 'border-[#2EC4B6] bg-[#2EC4B6] text-white shadow-[0_0_15px_rgba(46,196,182,0.3)]'
                    : 'border-[#1F2937] text-[#9AA4B2]'
                  }`}>
                  {step > s.n ? <Check size={16} /> : s.icon}
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-widest hidden sm:block ${step === s.n ? 'text-[#C9A24D]' : step > s.n ? 'text-[#2EC4B6]' : 'text-[#9AA4B2]'
                  }`}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="glass-card p-6 sm:p-12 rounded-[32px] border border-[#1F2937] min-h-[450px] flex flex-col justify-between relative overflow-hidden">
              {isProcessing && (
                <div className="absolute inset-0 bg-[#0B0F14]/80 backdrop-blur-md z-50 flex flex-col items-center justify-center">
                  <Loader2 size={40} className="text-[#C9A24D] animate-spin mb-4" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A24D]">Processing...</p>
                </div>
              )}

              <div className="flex-grow">
                {step === 1 && (
                  <div className="space-y-6 md:space-y-8 animate-blur-fade">
                    <div className="flex items-center gap-4 mb-6">
                      <User className="text-[#C9A24D]" size={32} />
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold serif">Delegate Profile</h3>
                        <p className="text-[10px] uppercase tracking-widest text-[#9AA4B2]">Compulsory Fields</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-[#9AA4B2]">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full bg-[#0B0F14]/50 border ${errors.fullName ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-5 py-4 focus:border-[#C9A24D] outline-none text-sm transition-all`}
                        />
                        {errors.fullName && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.fullName}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-[#9AA4B2]">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          readOnly
                          className="w-full bg-[#0B0F14]/50 border border-[#1F2937] rounded-xl px-5 py-4 text-[#9AA4B2] cursor-not-allowed text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-[#9AA4B2]">Age *</label>
                        <input
                          type="number"
                          name="age"
                          min="18"
                          max="100"
                          value={formData.age}
                          onChange={handleInputChange}
                          className={`w-full bg-[#0B0F14]/50 border ${errors.age ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-5 py-4 focus:border-[#C9A24D] outline-none text-sm`}
                        />
                        {errors.age && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.age}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-[#9AA4B2]">Mobile Number *</label>
                        <div className="flex gap-2">
                          <div className="flex-none bg-[#0B0F14]/50 border border-[#1F2937] rounded-xl px-4 py-4 text-sm text-[#9AA4B2] font-bold">
                            +91
                          </div>
                          <input
                            type="text"
                            name="mobile"
                            value={formData.mobile.slice(3)}
                            onChange={handleInputChange}
                            className={`flex-grow bg-[#0B0F14] border ${errors.mobile ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-5 py-4 focus:border-[#C9A24D] outline-none text-sm transition-all`}
                          />
                        </div>
                        {errors.mobile && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.mobile}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6 md:space-y-8 animate-blur-fade">
                    <div className="flex items-center gap-4 mb-6">
                      <Hospital className="text-[#C9A24D]" size={32} />
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold serif">Scientific Details</h3>
                        <p className="text-[10px] uppercase tracking-widest text-[#9AA4B2]">Professional Credentials</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-[#9AA4B2]">Delegate Category *</label>
                        <div className="relative">
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className={`w-full bg-[#0B0F14]/50 border ${errors.category ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-5 py-4 focus:border-[#C9A24D] outline-none text-sm appearance-none cursor-pointer pr-12`}
                          >
                            <option value="Faculty">Faculty</option>
                            <option value="Delegate">Delegate</option>
                            <option value="PG Student">PG Student</option>
                          </select>
                          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#9AA4B2] pointer-events-none" size={18} />
                        </div>
                        {errors.category && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.category}</p>}
                      </div>
                      <div className="md:col-span-2 bg-[#C9A24D]/5 border border-[#C9A24D]/20 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 animate-blur-fade">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#C9A24D] mb-1">Registration Fee</p>
                          <p className="text-2xl font-bold text-white serif">₹{calculateTotal().subtotal.toLocaleString()} <span className="text-xs font-normal text-[#9AA4B2]">+ 18% GST</span></p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase text-[#9AA4B2] mb-1">Total Payable</p>
                          <p className="text-xl font-bold text-[#2EC4B6]">₹{calculateTotal().total.toLocaleString()}</p>
                        </div>
                      </div>
                      {(formData.category === 'Faculty' || formData.category === 'Delegate') && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-[#9AA4B2]">Medical Reg No / License</label>
                          <input
                            type="text"
                            name="medicalRegNo"
                            value={formData.medicalRegNo}
                            onChange={handleInputChange}
                            className={`w-full bg-[#0B0F14] border ${errors.medicalRegNo ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-5 py-4 focus:border-[#C9A24D] outline-none text-sm`}
                          />
                          {errors.medicalRegNo && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.medicalRegNo}</p>}
                        </div>
                      )}
                      {formData.category === 'PG Student' && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-[#9AA4B2]">Institution</label>
                          <input
                            type="text"
                            name="institution"
                            value={formData.institution}
                            onChange={handleInputChange}
                            className={`w-full bg-[#0B0F14] border ${errors.institution ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-5 py-4 focus:border-[#C9A24D] outline-none text-sm`}
                          />
                          {errors.institution && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.institution}</p>}
                        </div>
                      )}
                      {formData.category === 'Delegate' && (
                        <>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-[#9AA4B2]">Institution</label>
                            <input
                              type="text"
                              name="institution"
                              value={formData.institution}
                              onChange={handleInputChange}
                              className={`w-full bg-[#0B0F14] border ${errors.institution ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-5 py-4 focus:border-[#C9A24D] outline-none text-sm`}
                            />
                            {errors.institution && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.institution}</p>}
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-[#9AA4B2]">Designation</label>
                            <input
                              type="text"
                              name="designation"
                              value={formData.designation}
                              onChange={handleInputChange}
                              className={`w-full bg-[#0B0F14] border ${errors.designation ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-5 py-4 focus:border-[#C9A24D] outline-none text-sm`}
                            />
                            {errors.designation && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.designation}</p>}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6 md:space-y-8 animate-blur-fade">
                    <div className="flex items-center gap-4 mb-6">
                      <Microscope className="text-[#C9A24D]" size={32} />
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold serif">Curriculum Selection</h3>
                        <p className="text-[10px] uppercase tracking-widest text-[#9AA4B2]">Academic Workshops</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 animate-blur-fade py-10">
                      <div className="w-16 h-16 bg-[#C9A24D]/10 text-[#C9A24D] rounded-full flex items-center justify-center">
                        <Check size={32} />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold serif mb-2">payment pending</h3>
                        <p className="text-[10px] uppercase tracking-widest text-[#9AA4B2]">proceed for payment</p>
                      </div>
                      <div className="max-w-md bg-[#0B0F14] border border-[#1F2937] p-8 rounded-[32px] w-full">
                        <p className="text-sm text-[#E6EAF0] mb-4">You have selected the <strong>{formData.category}</strong> category. This includes full access to all scientific sessions, halls, and networking areas.</p>
                        <div className="flex justify-between items-center pt-6 border-t border-[#1F2937]">
                          <span className="text-xs font-bold text-[#9AA4B2] uppercase">Access Level</span>
                          <span className="text-xs font-black text-[#C9A24D] uppercase tracking-widest">Full Scientific Pass</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6 animate-blur-fade">
                    <div className="flex items-center gap-4 mb-2">
                      <QrCode className="text-[#C9A24D]" size={32} />
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold serif">Payment</h3>
                        <p className="text-[10px] uppercase tracking-widest text-[#9AA4B2]">Scan QR &amp; Enter Transaction ID</p>
                      </div>
                    </div>

                    {/* Amount Summary */}
                    <div className="bg-[#C9A24D]/5 border border-[#C9A24D]/20 rounded-2xl p-5 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#C9A24D] mb-1">Amount Payable</p>
                        <p className="text-2xl font-bold text-white serif">₹{calculateTotal().total.toLocaleString()}</p>
                        <p className="text-[10px] text-[#9AA4B2] mt-1">{formData.category} &bull; Incl. 18% GST</p>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#2EC4B6] bg-[#2EC4B6]/10 px-3 py-1 rounded-full border border-[#2EC4B6]/20">{formData.category}</span>
                    </div>

                    {/* QR Code */}
                    <div className="flex flex-col items-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#9AA4B2] mb-4">Scan with any UPI app to pay</p>
                      <div className="bg-white p-4 rounded-2xl shadow-2xl inline-block">
                        <img
                          src={qrImage}
                          alt="PayZapp QR Code"
                          className="w-full max-w-[320px] h-auto object-contain mx-auto"
                          onError={(e) => {
                            // Fallback QR placeholder if image not found
                            (e.target as HTMLImageElement).src = 'https://api.qrserver.com/v1/create-qr-code/?data=payzapp%40hdfcbank&size=200x200&color=000000&bgcolor=ffffff';
                          }}
                        />
                        <a
                          href={qrImage}
                          download="JASICON2026_QR_Payment.jpeg"
                          className="mt-4 bg-[#0B0F14] text-[#C9A24D] px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] border border-[#C9A24D]/30 hover:bg-[#C9A24D] hover:text-[#0B0F14] transition-all flex items-center justify-center gap-2 w-full"
                        >
                          <Download size={14} /> Download QR Code
                        </a>
                      </div>

                      {/* WhatsApp Notice - Moved Up */}
                      <div className="mt-6 mb-2 p-4 bg-[#C9A24D]/10 border-2 border-[#C9A24D]/40 rounded-xl w-full max-w-[320px] text-center shadow-lg">
                        <p className="text-[#C9A24D] font-black text-[10px] uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24D] animate-pulse"></span>
                          IMPORTANT NOTICE
                        </p>
                        <p className="text-white font-bold text-sm leading-tight">
                          After payment, send the Screenshot to WhatsApp:
                          <br />
                          <span className="text-xl text-[#C9A24D] mt-2 inline-block font-black tracking-tight">+91 93343 86644</span>
                          <br />
                          <span className="text-[10px] text-[#C9A24D] mt-2 inline-block opacity-80 uppercase tracking-widest">your registration will be confirmed within 48 hours.</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mt-4 text-[10px] text-[#9AA4B2] uppercase tracking-widest font-bold">
                        <span>UPI</span>
                        <span className="text-[#1F2937]">|</span>
                        <span>BHIM</span>
                        <span className="text-[#1F2937]">|</span>
                        <span>PayZapp</span>
                        <span className="text-[#1F2937]">|</span>
                        <span>HDFC Bank</span>
                      </div>
                    </div>

                    {/* Transaction ID */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#9AA4B2]">UPI Transaction ID / Reference Number (Optional)</label>
                      <input
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleInputChange}
                        className={`w-full bg-[#0B0F14] border ${errors.transactionId ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-5 py-4 focus:border-[#C9A24D] outline-none text-sm font-mono tracking-wider transition-all`}
                      />
                      {errors.transactionId && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.transactionId}</p>}
                      <p className="text-[10px] text-[#9AA4B2] leading-relaxed">
                        After payment, enter the 12-digit UTR / transaction reference from your UPI app if available. Your registration will be confirmed within <strong className="text-[#C9A24D]">48 hours</strong>.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 md:mt-12 flex justify-between items-center pt-8 border-t border-[#1F2937]">
                {step > 1 ? (
                  <button onClick={handleBack} className="text-[#9AA4B2] hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                    &larr; Back
                  </button>
                ) : <div />}
                <button
                  onClick={async () => {
                    if (step === 4) {
                      setIsProcessing(true);
                      try {
                        await completeRegistration(formData);
                        setTimeout(() => navigate('/dashboard'), 500);
                      } catch (error: any) {
                        console.error("Registration failed", error);
                        setIsProcessing(false);
                        alert(error.message || "Submission failed. Please try again.");
                      }
                    } else {
                      if (step === 1 && !formData.email) {
                        alert("Email is missing from your profile. Please refresh the page or contact support.");
                        return;
                      }
                      handleNext();
                    }
                  }}
                  className="bg-[#C9A24D] text-[#0B0F14] px-8 md:px-12 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-white shadow-xl transition-all transform active:scale-95 disabled:opacity-50"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                       <Loader2 className="animate-spin" size={16} />
                       <span>{step === 4 ? 'Processing...' : 'Wait...'}</span>
                    </div>
                  ) : (step === 4 ? 'Confirm & Proceed →' : 'Next Step')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default Registration;
