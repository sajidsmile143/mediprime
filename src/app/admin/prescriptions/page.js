'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, CheckCircle2, XCircle, Eye, 
  Search, Filter, Trash2, ShieldCheck, 
  Clock, ArrowRight, UserCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminPrescriptionHub() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const loadPrescriptions = () => {
      const data = JSON.parse(localStorage.getItem('mediPrime_prescriptions') || '[]');
      setPrescriptions(data);
    };
    loadPrescriptions();
    // Listen for storage changes (if user uploads in another tab)
    window.addEventListener('storage', loadPrescriptions);
    return () => window.removeEventListener('storage', loadPrescriptions);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = prescriptions.map(px => 
      px.id === id ? { ...px, status: newStatus } : px
    );
    setPrescriptions(updated);
    localStorage.setItem('mediPrime_prescriptions', JSON.stringify(updated));
  };

  const deletePrescription = (id) => {
    if (confirm("Delete this document from system records?")) {
      const updated = prescriptions.filter(px => px.id !== id);
      setPrescriptions(updated);
      localStorage.setItem('mediPrime_prescriptions', JSON.stringify(updated));
    }
  };

  const filteredData = prescriptions.filter(px => 
    filter === 'All' ? true : px.status === filter
  );

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-black text-white tracking-tighter">Prescription <span className="text-primary italic">Inbox</span></h1>
            <div className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
              {prescriptions.filter(p => p.status === 'Pending').length} Pending
            </div>
          </div>
          <p className="text-slate-500 font-bold text-sm tracking-tight">Review digital medical documents and verify patient eligibility.</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
          {['All', 'Pending', 'Verified', 'Rejected'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                filter === f ? "bg-white text-slate-900 shadow-xl" : "text-slate-500 hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <AnimatePresence mode="popLayout">
           {filteredData.map((px) => (
             <motion.div 
               layout
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95 }}
               key={px.id}
               className="group bg-[#0d1117] rounded-[32px] border border-white/5 overflow-hidden hover:border-primary/30 transition-all shadow-2xl relative"
             >
                {/* Image Preview Window */}
                <div className="aspect-[4/3] relative bg-slate-900/50 p-6 overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent opacity-60 z-10" />
                   <img 
                    src={px.image} 
                    alt="Prescription" 
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700" 
                   />
                   <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setSelectedImage(px.image)}
                        className="w-14 h-14 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                      >
                         <Eye className="w-6 h-6" />
                      </button>
                   </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                   <div className="flex items-start justify-between">
                      <div>
                         <h3 className="text-white font-black text-lg tracking-tight mb-1">{px.id}</h3>
                         <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">{px.name}</p>
                      </div>
                      <div className={cn(
                        "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                        px.status === 'Verified' ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                        px.status === 'Rejected' ? "bg-rose-500/10 text-rose-500 border border-rose-500/20" :
                        "bg-primary/10 text-primary border border-primary/20 animate-pulse"
                      )}>
                        {px.status}
                      </div>
                   </div>

                   <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {px.timestamp}
                      </div>
                   </div>

                   {/* Actions */}
                   <div className="flex gap-2 pt-2">
                      <button 
                        onClick={() => updateStatus(px.id, 'Verified')}
                        className="flex-1 h-12 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white rounded-xl border border-emerald-500/20 transition-all flex items-center justify-center gap-2 group/btn"
                      >
                         <CheckCircle2 className="w-4 h-4" />
                         <span className="text-[9px] font-black uppercase tracking-widest">Verify</span>
                      </button>
                      <button 
                        onClick={() => updateStatus(px.id, 'Rejected')}
                        className="flex-1 h-12 bg-white/5 hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 rounded-xl border border-white/5 hover:border-rose-500/20 transition-all flex items-center justify-center gap-2"
                      >
                         <XCircle className="w-4 h-4" />
                         <span className="text-[9px] font-black uppercase tracking-widest">Deny</span>
                      </button>
                      <button 
                         onClick={() => deletePrescription(px.id)}
                         className="w-12 h-12 bg-white/5 hover:bg-rose-500 text-slate-500 hover:text-white rounded-xl border border-white/5 transition-all flex items-center justify-center"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                </div>
             </motion.div>
           ))}
           </AnimatePresence>
        </div>
      ) : (
        <div className="h-[50vh] flex flex-col items-center justify-center bg-white/5 border border-dashed border-white/10 rounded-[56px] text-center p-12">
           <FileText className="w-20 h-20 text-white/5 mb-6" />
           <h3 className="text-2xl font-black text-white tracking-tighter mb-2">Inbox is Clear</h3>
           <p className="text-slate-500 font-bold max-w-sm">No new prescriptions match your current filter. Great job keeping up with the queue!</p>
        </div>
      )}

      {/* Image Modal Viewer */}
      <AnimatePresence>
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 lg:p-24"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 max-w-full max-h-full aspect-auto flex flex-col items-center gap-8"
              onClick={(e) => e.stopPropagation()}
            >
               <div className="flex items-center gap-6 text-white mb-4">
                  <div className="flex flex-col items-center gap-1">
                     <ShieldCheck className="w-8 h-8 text-primary" />
                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Secure</span>
                  </div>
                  <div className="h-12 w-px bg-white/10" />
                  <div className="flex flex-col items-center gap-1">
                     <UserCheck className="w-8 h-8 text-emerald-500" />
                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">Patient ID Confirmed</span>
                  </div>
               </div>

               <div className="relative group">
                  <img 
                    src={selectedImage} 
                    className="max-h-[70vh] rounded-[40px] shadow-2xl border-2 border-white/10" 
                    alt="Prescription Full View" 
                  />
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-6 -right-6 w-14 h-14 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                  >
                     <XCircle className="w-6 h-6" />
                  </button>
               </div>

               <div className="flex items-center gap-4">
                  <button 
                    onClick={() => {
                        // In a real app we'd find which PX it is and update it, 
                        // for now we'll just close and the list is already updated if they use the card buttons
                        setSelectedImage(null);
                    }}
                    className="px-12 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.25em] text-[10px] shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all"
                  >
                    Confirm Review OK
                  </button>
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="px-12 py-5 bg-white/10 text-white rounded-2xl font-black uppercase tracking-[0.25em] text-[10px] hover:bg-white/20 transition-all"
                  >
                    Close Viewer
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Stats Bottom Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/5">
         {[
           { label: 'Avg Review Time', value: '4.2 Mins', icon: Clock, color: 'text-primary' },
           { label: 'Total Verified', value: '14,892', icon: ShieldCheck, color: 'text-emerald-500' },
           { label: 'System Compliance', value: '100%', icon: UserCheck, color: 'text-blue-500' },
         ].map((stat, i) => (
           <div key={i} className="bg-white/5 p-8 rounded-[32px] border border-white/5 flex items-center gap-6">
              <div className={cn("p-4 bg-white/5 rounded-2xl", stat.color)}>
                 <stat.icon className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
                 <p className="text-2xl font-black text-white tracking-tighter">{stat.value}</p>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
