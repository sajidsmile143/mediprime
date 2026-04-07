'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, Calendar, Star, Clock, 
  MessageSquare, ShieldCheck, Zap,
  ArrowRight, Phone, CheckCircle2,
  Stethoscope, Heart, User, X
} from 'lucide-react';
import { doctors } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function ConsultationHub() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingStep, setBookingStep] = useState('profile'); // profile, booking, success
  const [isCalling, setIsCalling] = useState(false);

  const handleBook = (dr) => {
    setSelectedDoctor(dr);
    setBookingStep('profile');
  };

  const startVideoCall = () => {
    setIsCalling(true);
    // Simulate connection delay
    setTimeout(() => {
      // In a real app, logic for video session starts here
    }, 2000);
  };

  if (isCalling) {
    return (
      <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="relative w-full h-full max-w-5xl aspect-video bg-slate-900 rounded-[48px] overflow-hidden shadow-2xl border border-white/5 mx-6">
           {/* Dr View */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
           <img src={selectedDoctor?.image} className="w-full h-full object-cover opacity-60" />
           
           {/* Overlay UI */}
           <div className="absolute top-12 left-12 z-20">
              <div className="flex items-center gap-4">
                 <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary">
                    <img src={selectedDoctor?.image} className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <h2 className="text-2xl font-black tracking-tighter">{selectedDoctor?.name}</h2>
                    <p className="text-primary text-[10px] font-black uppercase tracking-widest">{selectedDoctor?.specialty}</p>
                 </div>
              </div>
           </div>

           <div className="absolute top-12 right-12 z-20 flex items-center gap-4">
              <div className="px-4 py-2 bg-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                 <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                 Live Session
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-widest">
                 00:12:45
              </div>
           </div>

           {/* User View (Small) */}
           <div className="absolute bottom-12 right-12 w-64 aspect-video bg-slate-800 rounded-3xl border-2 border-white/20 z-30 overflow-hidden shadow-2xl group">
              <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                 <User className="w-12 h-12 text-slate-500" />
              </div>
              <div className="absolute top-4 left-4 text-[8px] font-black uppercase tracking-widest bg-black/40 px-2 py-1 rounded">You</div>
           </div>

           {/* Controls */}
           <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex items-center gap-6">
              <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-white/20 transition-all">
                 <Phone className="w-6 h-6 rotate-[135deg]" />
              </button>
              <button 
                onClick={() => setIsCalling(false)}
                className="w-20 h-20 rounded-full bg-rose-500 flex items-center justify-center shadow-xl shadow-rose-500/30 hover:scale-110 transition-all"
              >
                 <X className="w-8 h-8" />
              </button>
              <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-white/20 transition-all">
                 <Video className="w-6 h-6 text-emerald-500" />
              </button>
           </div>
        </div>
        <p className="mt-12 text-slate-500 font-bold text-xs uppercase tracking-[0.25em]">MediPrime Secure Telehealth Protocol</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
               <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-primary/20 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  Telehealth Live
               </span>
               <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-emerald-500/20">
                  Certified Doctors
               </span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.85]">
               Expert <span className="text-primary italic">Advice</span><br/>Just a Click Away.
            </h1>
            <p className="text-xl font-bold text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
               Instant access to senior pharmacists and general physicians. Skip the clinic, get professional consultations from the comfort of your home.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 justify-center lg:justify-start">
               <button className="px-10 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-all shadow-2xl flex items-center gap-3">
                  Find a Specialist
                  <ArrowRight className="w-5 h-5" />
               </button>
               <div className="flex items-center gap-4 text-slate-400">
                  <div className="flex -space-x-3">
                     {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden">
                           <img src={`https://i.pravatar.cc/150?u=doc${i}`} />
                        </div>
                     ))}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest">50+ Doctors Online</p>
               </div>
            </div>
          </div>

          <div className="flex-1 w-full relative">
             <div className="aspect-square bg-gradient-to-br from-primary/20 to-blue-500/10 rounded-[64px] relative overflow-hidden group border border-primary/10">
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/40 to-transparent blur-3xl opacity-50 translate-y-1/2" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-48 h-48 bg-white/10 dark:bg-white/5 backdrop-blur-2xl rounded-[40px] flex items-center justify-center border border-white/20">
                      <Stethoscope className="w-24 h-24 text-primary animate-bounce-slow" />
                   </div>
                </div>
                {/* Floating tags */}
                <div className="absolute top-12 left-12 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-border flex items-center gap-3 animate-float-slow">
                   <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Health Hub</span>
                </div>
             </div>
          </div>
        </div>

        {/* Doctor Roster */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
             <div>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Available <span className="text-primary italic">Specialists</span></h2>
                <p className="text-slate-500 font-bold text-sm tracking-tight">Top-rated healthcare professionals ready to assist you now.</p>
             </div>
             <div className="flex items-center gap-3 bg-white dark:bg-white/5 border border-border p-2 rounded-2xl">
                {['All', 'Pharmacist', 'Physician', 'Nutritionist'].map(f => (
                   <button key={f} className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-primary transition-all">
                      {f}
                   </button>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {doctors.map((dr) => (
               <motion.div 
                 whileHover={{ y: -10 }}
                 key={dr.id}
                 className="bg-white dark:bg-white/5 rounded-[40px] border border-slate-100 dark:border-white/10 p-8 shadow-premium group relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
                  
                  <div className="flex items-start justify-between mb-8 relative z-10">
                     <div className="relative">
                        <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-xl group-hover:rotate-3 transition-transform duration-500">
                           <img src={dr.image} alt={dr.name} className="w-full h-full object-cover" />
                        </div>
                        <div className={cn(
                          "absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900",
                          dr.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-400'
                        )} />
                     </div>
                     <div className="text-right">
                        <div className="flex items-center gap-1 justify-end text-amber-500 mb-1">
                           <Star className="w-4 h-4 fill-amber-500" />
                           <span className="text-xs font-black">{dr.rating}</span>
                        </div>
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{dr.experience} Exp</p>
                     </div>
                  </div>

                  <div className="relative z-10 mb-8">
                     <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">{dr.name}</h3>
                     <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">{dr.specialty}</p>
                     <p className="text-slate-500 dark:text-slate-400 text-sm font-bold line-clamp-2 leading-relaxed">
                        {dr.description}
                     </p>
                  </div>

                  <div className="flex items-center justify-between mb-8 relative z-10 bg-slate-50 dark:bg-black/20 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                     <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Consultation</span>
                        <span className="text-lg font-black text-slate-900 dark:text-white leading-none">Rs. {dr.fees}</span>
                     </div>
                     <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Wait Time</span>
                        <span className="text-xs font-black text-emerald-500">{dr.availability}</span>
                     </div>
                  </div>

                  <div className="flex gap-4 relative z-10">
                     <button 
                       onClick={startVideoCall}
                       disabled={dr.status !== 'Online'}
                       className={cn(
                         "flex-1 h-16 rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all shadow-xl",
                         dr.status === 'Online' 
                          ? "premium-gradient text-white shadow-primary/20 hover:-translate-y-1" 
                          : "bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed"
                       )}
                     >
                        <Video className="w-4 h-4" />
                        Join Now
                     </button>
                     <button className="w-16 h-16 rounded-2xl bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white flex items-center justify-center hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                        <MessageSquare className="w-5 h-5" />
                     </button>
                  </div>
               </motion.div>
             ))}
          </div>
        </div>

        {/* Guidelines / Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: "100% Private", desc: "Your video sessions are end-to-end encrypted and HIPAA compliant." },
              { icon: Zap, title: "Instant Access", desc: "Say goodbye to long waiting queues. Speak with an expert in minutes." },
              { icon: CheckCircle2, title: "Certified Medics", desc: "All our specialists are verified PMC and Pharmacy Council members." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                 <div className="w-14 h-14 bg-primary/10 rounded-[20px] flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-110">
                    <item.icon className="w-7 h-7" />
                 </div>
                 <div>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-2 uppercase">{item.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-bold leading-relaxed">{item.desc}</p>
                 </div>
              </div>
            ))}
        </div>

      </div>
    </div>
  );
}
