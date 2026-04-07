'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Activity, Truck, ShieldCheck, ArrowRight, Pill } from 'lucide-react';
import { MEDICINES, CATEGORIES } from '@/lib/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMeds, setFilteredMeds] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = MEDICINES.filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.salt.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setFilteredMeds(results);
      setIsSearching(true);
    } else {
      setFilteredMeds([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const categoryIcons = {
    chronic: Activity,
    fever: Pill, 
    infection: ShieldCheck,
    supplements: Pill,
    skincare: Plus
  };

  return (
    <div className="w-full grid-mesh">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 md:pt-32 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 translate-x-1/4 -translate-y-1/4 blur-[120px] opacity-20">
          <div className="w-[800px] h-[800px] bg-primary rounded-full animate-pulse" />
        </div>
        <div className="absolute bottom-0 left-0 -z-10 -translate-x-1/4 translate-y-1/4 blur-[120px] opacity-10">
          <div className="w-[600px] h-[600px] bg-accent rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-slate-100 shadow-premium text-primary text-[10px] font-black uppercase tracking-[0.25em] mb-12">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
              Direct from Pharmacy
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter mb-10 text-slate-900">
              Your Health, <br />
              <span className="text-gradient">Our Priority.</span>
            </h1>
            <p className="text-base md:text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium mb-16 px-4 md:px-0">
              Authentic medicines and healthcare essentials delivered with care. 
              Upload your prescription and get expert consultation instantly.
            </p>

            {/* Global Search Component */}
            <div className="relative max-w-2xl mx-auto lg:mx-0 px-2 md:px-0">
              <div className="relative flex items-center p-3 rounded-[32px] bg-white shadow-premium border border-slate-100 group focus-within:ring-8 focus-within:ring-primary/5 transition-all duration-500">
                <div className="pl-8 shrink-0">
                  <Search className="w-6 h-6 text-slate-400 group-focus-within:text-primary group-focus-within:scale-110 transition-all" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search name, formula, or salt..."
                  className="flex-1 h-14 md:h-20 pl-6 pr-6 bg-transparent text-slate-900 font-bold text-lg outline-none placeholder:text-slate-400 placeholder:font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="hidden sm:flex items-center justify-center px-10 h-14 md:h-16 rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shrink-0">
                  Search
                </button>
              </div>
              
              {/* Mobile Only Button */}
              <button className="mt-4 w-full h-14 sm:hidden flex items-center justify-center rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-transform">
                Search
              </button>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {isSearching && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute top-full left-0 right-0 mt-6 p-6 lg:p-8 glass-morphism rounded-[40px] shadow-2xl z-40 border border-white/50"
                  >
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-4">Top Matches</p>
                    {filteredMeds.length > 0 ? (
                      <div className="space-y-3">
                        {filteredMeds.map((med) => (
                          <Link 
                            key={med.id} 
                            href={`/product/${med.id}`}
                            className="flex items-center gap-5 p-5 rounded-3xl hover:bg-white transition-all group border border-transparent hover:border-slate-50 hover:shadow-premium"
                          >
                            <div className="w-20 h-20 bg-white rounded-2xl p-3 border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                              <img src={med.image} alt={med.name} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div className="flex-1 text-left min-w-0">
                              <h4 className="font-black text-slate-900 text-lg flex items-center gap-3">
                                <span className="truncate">{med.name}</span>
                                <span className="text-[9px] font-black px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase shrink-0 tracking-widest">{med.brand}</span>
                              </h4>
                              <p className="text-sm text-slate-500 font-bold truncate mt-1">{med.formula}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="text-primary font-black text-xl">Rs. {med.price}</div>
                              <div className="text-[9px] text-green-500 font-black uppercase tracking-widest mt-1">Available</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 opacity-50 font-black text-slate-500 tracking-wider uppercase text-xs">
                        No results for "{searchQuery}"
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Hero Visual Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center relative px-24 h-[600px]"
          >
            <div className="relative w-full max-w-[480px]">
              <div className="absolute inset-0 bg-primary/10 rounded-[64px] blur-3xl -rotate-6 scale-110" />
              <div className="relative z-20 aspect-[4/5] overflow-hidden rounded-[56px] shadow-2xl border-4 border-white bg-slate-100 group">
                <img 
                  src="/hero-bg.png" 
                  alt="Healthcare" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center -z-10 text-slate-200">
                  <Activity className="w-24 h-24 animate-pulse" />
                </div>
              </div>
              
              {/* Floating Stat Card 1 - Top Right */}
              <motion.div 
                animate={{ y: [0, -25, 0], x: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-24 -right-52 z-30 px-8 py-6 glass-morphism rounded-[32px] shadow-premium border border-white min-w-[260px]"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
                    <Truck className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Live Tracking</p>
                    <p className="font-black text-slate-900 text-lg leading-none mt-1">Arriving in mins</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Stat Card 2 - Bottom Left */}
              <motion.div 
                animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute -bottom-24 -left-52 z-30 px-8 py-6 glass-morphism rounded-[32px] shadow-premium border border-white min-w-[260px]"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Verified Hub</p>
                    <p className="font-black text-slate-900 text-lg leading-none mt-1">100% Genuine</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] border border-slate-200/40 rounded-full -z-10 animate-[spin_50s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-slate-200/20 rounded-full -z-20 animate-[spin_80s_linear_infinite_reverse]" />
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-slate-900 py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-primary to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-accent to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-2 md:grid-cols-4 gap-16 relative z-10">
          {[
            { icon: Truck, title: 'Fast Delivery', desc: 'Under 15 Minutes' },
            { icon: ShieldCheck, title: '100% Genuine', desc: 'Sourced Directly' },
            { icon: Activity, title: 'Expert Advice', desc: '24/7 Pharmacist' },
            { icon: Pill, title: 'Easy Refills', desc: 'Auto Reminders' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-700">
                <item.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-black text-xl mb-2 uppercase tracking-[0.1em]">{item.title}</h3>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-40 px-6 max-w-[90rem] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8 px-10">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">Collections</div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900">
              Shop by <span className="text-gradient">Category</span>
            </h2>
            <p className="text-slate-500 mt-6 text-xl font-medium max-w-2xl leading-relaxed">
              Find exactly what you need. From chronic care to daily supplements, 
              we've organized our pharmacy for your convenience.
            </p>
          </div>
          <Link href="/shop" className="group inline-flex items-center gap-4 px-10 py-5 rounded-[2rem] bg-slate-900 text-white font-black text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-xl hover:-translate-y-1 shrink-0">
            View All Categories <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 px-6">
          {[
            { id: 'chronic', name: 'Chronic Care', icon: Activity, color: 'bg-blue-500' },
            { id: 'fever', name: 'Fever & Pain', icon: Pill, color: 'bg-orange-500' },
            { id: 'infection', name: 'Infections', icon: ShieldCheck, color: 'bg-green-500' },
            { id: 'supplements', name: 'Supplements', icon: Pill, color: 'bg-indigo-600' },
            { id: 'skincare', name: 'Skincare', icon: Activity, color: 'bg-rose-500' },
          ].map((cat) => (
            <Link 
              key={cat.id} 
              href={`/shop?cat=${cat.id}`} 
              className="group relative p-12 rounded-[3.5rem] bg-white border border-slate-50 shadow-premium flex flex-col items-center hover:shadow-2xl hover:-translate-y-6 transition-all duration-700 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 -mr-16 -mt-16 rounded-full group-hover:scale-[3] group-hover:bg-primary/5 transition-all duration-1000" />
              <div className={cn("relative z-10 w-24 h-24 rounded-3xl flex items-center justify-center text-white mb-10 group-hover:scale-110 shadow-2xl transition-all duration-500", cat.color)}>
                <cat.icon className="w-12 h-12" />
              </div>
              <span className="relative z-10 font-black text-slate-900 text-lg group-hover:text-primary transition-all text-center">{cat.name}</span>
              <div className="relative z-10 mt-6 w-2 h-2 rounded-full bg-slate-200 group-hover:w-16 group-hover:bg-primary transition-all duration-700" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}