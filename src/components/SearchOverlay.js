'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, Command, ArrowRight, 
  TrendingUp, Clock, Tablet,
  Sparkles, Zap
} from 'lucide-react';
import { MEDICINES } from '@/lib/data';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = MEDICINES.filter(med => 
        med.name.toLowerCase().includes(query.toLowerCase()) ||
        med.formula.toLowerCase().includes(query.toLowerCase()) ||
        med.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const trendingSearches = ['Panadol', 'Antibiotics', 'Fever', 'Vitamin C', 'Diabetes'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-[48px] shadow-2xl border border-slate-100 dark:border-white/10 overflow-hidden relative z-10"
          >
             {/* Search Input Area */}
             <div className="p-10 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-black/20">
                <div className="relative flex items-center gap-6 group">
                   <Search className={cn(
                     "w-8 h-8 transition-colors duration-300",
                     query ? "text-primary" : "text-slate-400"
                   )} />
                   <input 
                      ref={inputRef}
                      type="text" 
                      placeholder="Search symptom, medicine or formula..."
                      className="w-full bg-transparent text-3xl font-black text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 outline-none tracking-tighter"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                   />
                   <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-200 dark:bg-white/10 rounded-xl">
                      <Command className="w-3 h-3 text-slate-500" />
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">ESC</span>
                   </div>
                   <button 
                    onClick={onClose}
                    className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-border flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors shrink-0"
                   >
                     <X className="w-6 h-6" />
                   </button>
                </div>
             </div>

             {/* Results / Content */}
             <div className="p-10 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {query.length > 1 ? (
                   <div className="space-y-10">
                      {results.length > 0 ? (
                         <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6 flex items-center gap-2">
                               <Sparkles className="w-3 h-3 text-primary" />
                               Relevant Matches
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               {results.map((med) => (
                                 <Link 
                                   key={med.id} 
                                   href={`/product/${med.id}`}
                                   onClick={onClose}
                                   className="flex items-center gap-6 p-4 bg-slate-50 dark:bg-white/5 rounded-3xl border border-transparent hover:border-primary/50 hover:bg-white dark:hover:bg-primary/5 transition-all group"
                                 >
                                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                                       <img src={med.image} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                       <h5 className="text-sm font-black text-slate-900 dark:text-white tracking-tight truncate">{med.name}</h5>
                                       <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">{med.category}</p>
                                       <div className="flex flex-wrap gap-1">
                                          {med.tags?.slice(0, 2).map((tag, i) => (
                                             <span key={i} className="text-[8px] font-bold text-slate-400 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded uppercase tracking-widest">{tag}</span>
                                          ))}
                                       </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors pr-2" />
                                 </Link>
                               ))}
                            </div>
                         </div>
                      ) : (
                         <div className="text-center py-12">
                            <Zap className="w-12 h-12 text-slate-200 dark:text-white/5 mx-auto mb-4" />
                            <h4 className="text-lg font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">No exact matches found</h4>
                         </div>
                      )}
                      
                      {/* Suggestion AI Section */}
                      <div className="p-8 bg-primary/5 border border-primary/20 rounded-[40px] flex items-center justify-between group cursor-pointer hover:bg-primary/10 transition-colors">
                         <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-primary shadow-xl">
                               <Tablet className="w-8 h-8" />
                            </div>
                            <div>
                               <h5 className="text-primary font-black text-xs uppercase tracking-widest mb-1">Consult with MediAI</h5>
                               <p className="text-slate-500 dark:text-slate-400 text-xs font-bold">Can't find what you need? Describe your symptoms.</p>
                            </div>
                         </div>
                         <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                            <ArrowRight className="w-5 h-5" />
                         </div>
                      </div>
                   </div>
                ) : (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                      <div className="space-y-8">
                         <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 flex items-center gap-2">
                            <TrendingUp className="w-3 h-3 text-primary" />
                            Trending Now
                         </h4>
                         <div className="flex flex-wrap gap-3">
                            {trendingSearches.map((term) => (
                               <button 
                                 key={term}
                                 onClick={() => setQuery(term)}
                                 className="px-6 py-3 bg-slate-50 dark:bg-white/5 hover:bg-primary/10 hover:text-primary rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-400 transition-all border border-slate-100 dark:border-white/5"
                               >
                                  {term}
                               </button>
                            ))}
                         </div>
                      </div>
                      <div className="space-y-8">
                         <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 flex items-center gap-2">
                            <Clock className="w-3 h-3 text-primary" />
                            Recent Searches
                         </h4>
                         <div className="space-y-4">
                            <div className="flex items-center justify-between text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer group">
                               <span className="text-sm font-bold">Amoxicillin Capsules</span>
                               <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transition-transform group-hover:translate-x-1" />
                            </div>
                            <div className="flex items-center justify-between text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer group">
                               <span className="text-sm font-bold">Children Cough Syrup</span>
                               <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transition-transform group-hover:translate-x-1" />
                            </div>
                         </div>
                      </div>
                   </div>
                )}
             </div>

             {/* Footer Tip */}
             <div className="p-6 bg-slate-50 dark:bg-black/40 border-t border-slate-100 dark:border-white/5 flex items-center justify-center gap-3">
                <Zap className="w-3 h-3 text-primary" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Pro Tip: Search for Symptoms like "Fever" or "Pain"</span>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
