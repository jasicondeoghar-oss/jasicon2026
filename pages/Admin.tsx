import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchRegistrations, fetchContacts, updateRegistrationStatus } from '../services/db';
import { LayoutDashboard, Users, MessageSquare, CheckCircle, XCircle, Clock, Loader2, Image as ImageIcon, ExternalLink, Activity } from 'lucide-react';
import { ADMIN_EMAILS } from '../constants';

const Admin: React.FC = () => {
   const { user } = useAuth();
   const [registrations, setRegistrations] = useState<any[]>([]);
   const [contacts, setContacts] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [activeTab, setActiveTab] = useState<'registrations' | 'contacts'>('registrations');
   const [actionLoading, setActionLoading] = useState<string | null>(null);

   useEffect(() => {
      if (user && ADMIN_EMAILS.includes(user.email || '')) {
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

   const handleApproveReject = async (regId: string, status: 'approved' | 'rejected') => {
      setActionLoading(regId + status);
      try {
         await updateRegistrationStatus(regId, status);
         // Refresh data after update
         await loadData();
      } catch (error) {
         console.error(`Failed to ${status} registration`, error);
         alert(`Failed to update status. Please check your permissions.`);
      } finally {
         setActionLoading(null);
      }
   };

   const statusBadge = (status: string) => {
      switch (status) {
         case 'approved': return 'bg-green-500/10 text-green-500 border-green-500/20';
         case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
         default: return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      }
   };

   if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
      return (
         <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <XCircle size={48} className="text-red-500 mb-4" />
            <h2 className="text-2xl font-bold serif text-[#E6EAF0]">Access Denied</h2>
            <p className="text-[#9AA4B2] mt-2">You do not have administrator privileges to view this page.</p>
         </div>
      );
   }

   const stats = [
      { label: 'Total Registrations', val: registrations.length, icon: <Users size={20} className="text-[#C9A24D]" /> },
      { label: 'Pending Approval', val: registrations.filter(r => r.registrationStatus === 'pending' || !r.registrationStatus).length, icon: <Clock size={20} className="text-yellow-500" /> },
      { label: 'Confirmed Delegates', val: registrations.filter(r => r.registrationStatus === 'approved').length, icon: <CheckCircle size={20} className="text-[#2EC4B6]" /> },
      { label: 'Enquiries', val: contacts.length, icon: <MessageSquare size={20} className="text-blue-500" /> }
   ];

   return (
      <div className="max-w-7xl mx-auto px-4 py-12">
         <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-[#C9A24D]/10 rounded-2xl flex items-center justify-center text-[#C9A24D]">
               <Activity size={24} />
            </div>
            <div>
               <h1 className="text-4xl font-bold serif text-[#E6EAF0]">Admin Command</h1>
               <p className="text-[#9AA4B2] italic text-xs tracking-widest mt-1 uppercase">Management & Oversight Console</p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
               <div key={i} className="glass-card p-6 rounded-2xl border border-[#1F2937] hover:border-[#C9A24D]/30 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                     {stat.icon}
                     <div className="w-2 h-2 rounded-full bg-[#1F2937] group-hover:bg-[#C9A24D] transition-colors"></div>
                  </div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#9AA4B2] mb-1 block">{stat.label}</span>
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
                     {registrations.filter(r => r.registrationStatus === 'pending').length > 0 && (
                        <span className="ml-2 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                           <Clock size={10} /> {registrations.filter(r => r.registrationStatus === 'pending').length} Pending
                        </span>
                     )}
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
                               <th className="p-4">Txn ID</th>
                               <th className="p-4">Fee</th>
                               <th className="p-4">Payment</th>
                               <th className="p-4">Status</th>
                               <th className="p-4 text-center">Actions</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-[#1F2937] text-sm">
                            {registrations.map((row) => {
                               const pricing: Record<string, number> = {
                                  'Faculty': 3000,
                                  'PG Student': 2000,
                                  'Delegate': 3000
                               };
                               const baseFee = pricing[row.category] || 3000;
                               const totalWithGST = baseFee * 1.18;
                               
                               return (
                                  <tr key={row.id} className="hover:bg-white/5 transition-colors">
                                     <td className="p-4 font-medium">
                                        <div>{row.fullName}</div>
                                        <div className="text-xs text-[#9AA4B2]">{row.email}</div>
                                     </td>
                                     <td className="p-4 text-[#9AA4B2]">{row.category}</td>
                                     <td className="p-4 text-[#9AA4B2]">{row.mobile}</td>
                                     <td className="p-4 text-[#9AA4B2] font-mono text-xs">{row.transactionId || '—'}</td>
                                     <td className="p-4">
                                        <div className="text-xs font-bold text-[#E6EAF0]">₹{totalWithGST.toLocaleString()}</div>
                                        <div className="text-[9px] text-[#9AA4B2]">Incl. 18% GST</div>
                                     </td>
                                     <td className="p-4">
                                        {row.paymentScreenshot ? (
                                           <a
                                              href={row.paymentScreenshot}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="flex items-center gap-1.5 text-[#C9A24D] hover:text-white transition-colors group"
                                           >
                                              <ImageIcon size={14} />
                                              <span className="text-[10px] font-bold uppercase tracking-widest border-b border-transparent group-hover:border-[#C9A24D]">View Receipt</span>
                                              <ExternalLink size={10} />
                                           </a>
                                        ) : (
                                           <span className="text-[10px] text-[#9AA4B2] uppercase tracking-widest font-bold">—</span>
                                        )}
                                     </td>
                                     <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${statusBadge(row.registrationStatus)}`}>
                                           {row.registrationStatus || 'pending'}
                                        </span>
                                     </td>
                                     <td className="p-4">
                                        {(row.registrationStatus === 'pending' || !row.registrationStatus) ? (
                                           <div className="flex items-center justify-center gap-2">
                                              <button
                                                 onClick={() => handleApproveReject(row.id, 'approved')}
                                                 disabled={actionLoading === row.id + 'approved'}
                                                 className="flex items-center gap-1 bg-[#2EC4B6]/10 text-[#2EC4B6] border border-[#2EC4B6]/20 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#2EC4B6] hover:text-[#0B0F14] transition-all disabled:opacity-50"
                                              >
                                                 {actionLoading === row.id + 'approved' ? <Loader2 size={10} className="animate-spin" /> : <CheckCircle size={12} />} Approve
                                              </button>
                                              <button
                                                 onClick={() => handleApproveReject(row.id, 'rejected')}
                                                 disabled={actionLoading === row.id + 'rejected'}
                                                 className="flex items-center gap-1 bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                                              >
                                                 {actionLoading === row.id + 'rejected' ? <Loader2 size={10} className="animate-spin" /> : <XCircle size={12} />} Reject
                                              </button>
                                           </div>
                                        ) : (
                                           <span className="text-[10px] text-[#9AA4B2] uppercase tracking-widest font-bold text-center block">—</span>
                                        )}
                                     </td>
                                  </tr>
                               );
                            })}
                            {registrations.length === 0 && (
                               <tr><td colSpan={8} className="p-8 text-center text-[#9AA4B2]">No registrations found</td></tr>
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
                           {contacts.map((msg) => (
                              <tr key={msg.id} className="hover:bg-white/5 transition-colors">
                                 <td className="p-4">
                                    <div className="font-medium">{msg.fullName}</div>
                                    <div className="text-xs text-[#9AA4B2]">{msg.email}</div>
                                 </td>
                                 <td className="p-4 text-[#9AA4B2] max-w-xs truncate">{msg.message}</td>
                                 <td className="p-4 text-[#9AA4B2] text-xs">
                                    {msg.submittedAt?.toDate?.() ? msg.submittedAt.toDate().toLocaleDateString() : 'Recent'}
                                 </td>
                              </tr>
                           ))}
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
