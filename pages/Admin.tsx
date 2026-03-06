
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Users, BarChart3, Settings, TrendingUp, AlertCircle, FileSpreadsheet, Mail, Loader2 } from 'lucide-react';
import { ADMIN_EMAILS } from '../constants';
import { fetchRegistrations, fetchContacts } from '../services/db';

const Admin: React.FC = () => {
   const { user, loading: authLoading } = useAuth();
   const [registrations, setRegistrations] = useState<any[]>([]);
   const [contacts, setContacts] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [activeTab, setActiveTab] = useState<'registrations' | 'contacts'>('registrations');

   useEffect(() => {
      if (user && ADMIN_EMAILS.includes(user.email)) {
         loadData();
      }
   }, [user]);

   const loadData = async () => {
      try {
         const [regs, msgs] = await Promise.all([
            fetchRegistrations(),
            fetchContacts()
         ]);
         setRegistrations(regs);
         setContacts(msgs);
      } catch (error) {
         console.error("Failed to load admin data", error);
      } finally {
         setLoading(false);
      }
   };

   if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-[#0B0F14]"><Loader2 className="animate-spin text-[#C9A24D]" /></div>;

   if (!user || !ADMIN_EMAILS.includes(user.email)) {
      return <Navigate to="/login" />;
   }

   const totalRevenue = registrations.reduce((acc, curr) => {
      // logic to extract price based on category/workshops if stored, or just a placeholder calculation
      // For now, let's assume we stored 'totalAmount' or calculate it dynamically
      // Simple estimation based on stored category string if amount not saved
      let amt = curr.category === 'PG Student' ? 2000 : 3000;
      return acc + (amt * 1.18); // Including GST
   }, 0);

   const handleExportExcel = () => {
      const dataToExport = registrations.length > 0 ? registrations : contacts;
      if (dataToExport.length === 0) return;

      const headers = activeTab === 'registrations'
         ? ['Full Name', 'Email', 'Category', 'Mobile', 'Status']
         : ['Name', 'Email', 'Message', 'Date'];

      const csvRows = [
         headers.join(','),
         ...dataToExport.map(row => {
            if (activeTab === 'registrations') {
               return [
                  `"${row.fullName || ''}"`,
                  `"${row.email || ''}"`,
                  `"${row.category || ''}"`,
                  `"${row.mobile || ''}"`,
                  `"${row.registrationStatus || 'Completed'}"`
               ].join(',');
            } else {
               return [
                  `"${row.fullName || ''}"`,
                  `"${row.email || ''}"`,
                  `"${row.message?.replace(/"/g, '""') || ''}"`,
                  `"${row.submittedAt?.seconds ? new Date(row.submittedAt.seconds * 1000).toLocaleDateString() : 'Just now'}"`
               ].join(',');
            }
         })
      ];

      const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `JASICON_${activeTab === 'registrations' ? 'Registrations' : 'Enquiries'}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   };

   return (
      <div className="max-w-7xl mx-auto px-4 py-12">
         <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div>
               <h1 className="text-4xl font-bold serif text-[#C9A24D]">Admin Control Center</h1>
               <p className="text-[#9AA4B2] mt-2 italic">Real-time oversight for JASICON 2026</p>
            </div>
            <button
               onClick={handleExportExcel}
               className="bg-[#121826] border border-[#1F2937] text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-[#C9A24D] hover:text-[#0B0F14] transition-all"
            >
               <FileSpreadsheet size={18} />
               <span>Export Data to Excel</span>
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
               { label: 'Total Registration', val: registrations.length.toString(), icon: <Users size={20} />, change: 'Live' },
               { label: 'Est. Revenue', val: `₹${totalRevenue.toLocaleString()}`, icon: <TrendingUp size={20} />, change: 'Est.' },
               { label: 'Enquiries', val: contacts.length.toString(), icon: <Mail size={20} />, change: 'New' },
            ].map((stat, i) => (
               <div key={i} className="glass-card p-6 rounded-2xl border border-[#1F2937]">
                  <div className="flex items-center justify-between mb-4">
                     <div className="p-3 bg-white/5 rounded-xl text-[#C9A24D]">{stat.icon}</div>
                     <span className="text-[10px] font-bold text-[#2EC4B6]">{stat.change}</span>
                  </div>
                  <h4 className="text-[10px] uppercase tracking-widest text-[#9AA4B2] mb-1">{stat.label}</h4>
                  <p className="text-2xl font-bold text-[#E6EAF0]">{stat.val}</p>
               </div>
            ))}
         </div>

         <div className="grid grid-cols-1 gap-8">
            <div className="glass-card rounded-2xl overflow-hidden border border-[#1F2937]">
               <div className="p-6 border-b border-[#1F2937] flex justify-between items-center">
                  <div className="flex gap-4">
                     <button
                        onClick={() => setActiveTab('registrations')}
                        className={`font-bold serif text-lg ${activeTab === 'registrations' ? 'text-[#C9A24D]' : 'text-[#9AA4B2]'}`}
                     >
                        Registrations
                     </button>
                     <button
                        onClick={() => setActiveTab('contacts')}
                        className={`font-bold serif text-lg ${activeTab === 'contacts' ? 'text-[#C9A24D]' : 'text-[#9AA4B2]'}`}
                     >
                        Enquiries
                     </button>
                  </div>
               </div>

               <div className="overflow-x-auto max-h-[500px]">
                  {loading ? (
                     <div className="flex justify-center p-8"><Loader2 className="animate-spin text-[#C9A24D]" /></div>
                  ) : activeTab === 'registrations' ? (
                     <table className="w-full text-left">
                        <thead className="text-[10px] uppercase tracking-widest text-[#9AA4B2] bg-white/5 border-b border-[#1F2937]">
                           <tr>
                              <th className="p-4">Delegate Name</th>
                              <th className="p-4">Category</th>
                              <th className="p-4">Mobile</th>
                              <th className="p-4">Status</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1F2937] text-sm">
                           {registrations.map((row) => (
                              <tr key={row.id} className="hover:bg-white/5 transition-colors">
                                 <td className="p-4 font-medium">
                                    <div>{row.fullName}</div>
                                    <div className="text-xs text-[#9AA4B2]">{row.email}</div>
                                 </td>
                                 <td className="p-4 text-[#9AA4B2]">{row.category}</td>
                                 <td className="p-4 text-[#9AA4B2]">{row.mobile}</td>
                                 <td className="p-4">
                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[#2EC4B6]/20 text-[#2EC4B6]">
                                       {row.registrationStatus || 'Completed'}
                                    </span>
                                 </td>
                              </tr>
                           ))}
                           {registrations.length === 0 && (
                              <tr><td colSpan={4} className="p-8 text-center text-[#9AA4B2]">No registrations found</td></tr>
                           )}
                        </tbody>
                     </table>
                  ) : (
                     <table className="w-full text-left">
                        <thead className="text-[10px] uppercase tracking-widest text-[#9AA4B2] bg-white/5 border-b border-[#1F2937]">
                           <tr>
                              <th className="p-4">Name</th>
                              <th className="p-4">Message</th>
                              <th className="p-4">Date</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1F2937] text-sm">
                           {contacts.map((row) => (
                              <tr key={row.id} className="hover:bg-white/5 transition-colors">
                                 <td className="p-4 font-medium">
                                    <div>{row.fullName}</div>
                                    <div className="text-xs text-[#9AA4B2]">{row.email}</div>
                                 </td>
                                 <td className="p-4 text-[#9AA4B2] max-w-xs truncate">{row.message}</td>
                                 <td className="p-4 text-[#9AA4B2] text-xs">
                                    {row.submittedAt?.seconds ? new Date(row.submittedAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                                 </td>
                              </tr>
                           ))}
                           {contacts.length === 0 && (
                              <tr><td colSpan={3} className="p-8 text-center text-[#9AA4B2]">No enquiries found</td></tr>
                           )}
                        </tbody>
                     </table>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Admin;
