'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingCart, Plus, ArrowRight, Tag, Star, Package, Info } from 'lucide-react';
import { MEDICINES, CATEGORIES } from '@/lib/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import { useCart } from '@/context/CartContext';

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const { addToCart } = useCart();

  const filteredMeds = useMemo(() => {
    return MEDICINES.filter(m => {
      const matchesSearch = 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.salt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCat = selectedCat === 'all' || m.category === selectedCat;
      
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCat]);

  return (
    <div className="min-h-screen bg-[#fcfdfe] pb-24">
      {/* Search & Header Section */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest mb-6 border border-primary/10"
            >
              <Tag className="w-3.5 h-3.5" />
              Direct from Pharmacy
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black tracking-tight mb-6"
            >
              Our <span className="text-gradient">Pharmacy</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 max-w-2xl text-lg font-medium"
            >
              Authentic medications, healthcare essentials, and professional advice delivered to your doorstep.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto"
          >
            <div className="relative flex-1 group w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by Name, Formula, or Salt (e.g. Paracetamol)..."
                className="w-full h-16 pl-14 pr-6 rounded-[24px] border-2 border-slate-100 bg-white shadow-premium outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-lg font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="h-16 px-8 rounded-[24px] bg-slate-900 text-white flex items-center gap-3 font-black text-sm uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all hover:-translate-y-1 active:translate-y-0 w-full md:w-auto">
              <Filter className="w-5 h-5" />
              Advanced Filters
            </button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Categories Sidebar */}
          <aside className="w-full lg:w-72 space-y-3">
            <div className="sticky top-32">
              <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-6 px-4">Browse Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className={cn(
                      "w-full text-left px-5 py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-between group",
                      selectedCat === cat.id 
                        ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10 translate-x-1" 
                        : "hover:bg-white hover:shadow-premium text-slate-500 hover:text-slate-900"
                    )}
                  >
                    {cat.name}
                    {selectedCat === cat.id ? (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    ) : (
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    )}
                  </button>
                ))}
              </div>

              {/* Promo Card */}
              <div className="mt-12 p-6 rounded-[32px] premium-gradient text-white overflow-hidden relative group">
                <div className="relative z-10">
                  <h4 className="font-black text-lg mb-2">Need help?</h4>
                  <p className="text-white/80 text-xs font-bold leading-relaxed mb-4">Chat with our 24/7 pharmacist for advice.</p>
                  <button className="px-5 py-2.5 rounded-xl bg-white text-primary font-black text-[10px] uppercase tracking-wider hover:bg-slate-50 transition-colors">
                    Start Chat
                  </button>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="font-black text-xs uppercase tracking-widest text-slate-400">
                Showing <span className="text-slate-900">{filteredMeds.length}</span> results
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Live Stock Status</p>
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredMeds.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredMeds.map((med, idx) => (
                    <motion.div
                      layout
                      key={med.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="group bg-white rounded-[40px] border border-slate-100 shadow-premium hover:shadow-3xl hover:-translate-y-2 transition-all p-5 flex flex-col h-full relative"
                    >
                      {/* Badge Tags */}
                      <div className="absolute top-8 left-8 z-10 flex gap-2">
                        {med.stock < 100 && (
                          <div className="px-3 py-1 bg-amber-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                            Low Stock
                          </div>
                        )}
                      </div>

                      {/* Image Frame */}
                      <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden bg-slate-50 mb-6">
                        <img 
                          src={med.image} 
                          alt={med.name} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 border border-white/50 shadow-sm">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span className="text-[10px] font-black text-slate-900">{med.rating}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-2 pb-2 flex-col flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">{med.brand}</p>
                            <Link href={`/product/${med.id}`}>
                              <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-primary transition-colors cursor-pointer">
                                {med.name}
                              </h3>
                            </Link>
                          </div>
                          <div className="px-2.5 py-1 bg-slate-100 rounded-xl text-[10px] font-black text-slate-400 shrink-0">
                            {med.strength}
                          </div>
                        </div>
                        
                        <p className="text-xs text-slate-400 font-bold italic mb-6 line-clamp-1">{med.formula}</p>

                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Package className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-black uppercase tracking-wider">{med.stock} pcs</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Info className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-black uppercase tracking-wider">{med.usage?.split('.')[0].slice(0, 15)}...</span>
                          </div>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-100">
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pricing</span>
                            <span className="text-2xl font-black text-slate-900 leading-none mt-1">
                              Rs. {med.price}
                            </span>
                          </div>
                          <button 
                            onClick={() => addToCart(med)}
                            className="w-14 h-14 rounded-[22px] bg-slate-900 text-white flex items-center justify-center shadow-xl hover:bg-primary transition-all hover:scale-110 active:scale-95 group/btn"
                          >
                            <Plus className="w-7 h-7 group-hover/btn:rotate-90 transition-transform duration-300" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-32 bg-white rounded-[48px] border-2 border-dashed border-slate-100 shadow-premium px-12 text-center"
                >
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-10 h-10 text-slate-200" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">No results found</h3>
                  <p className="text-slate-500 font-medium max-w-sm mx-auto mb-8">
                    We couldn't find any medicines matching your search. Try searching for a salt like "Paracetamol".
                  </p>
                  <button 
                    onClick={() => {setSearchQuery(''); setSelectedCat('all')}}
                    className="px-8 py-4 rounded-2xl bg-slate-900 text-white font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all"
                  >
                    Clear Filter
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
