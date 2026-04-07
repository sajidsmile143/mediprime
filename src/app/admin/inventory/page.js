'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, Search, Plus, AlertTriangle, 
  ArrowUpDown, Filter, Edit, Trash2,
  ChevronRight, FlaskConical as Flask
} from 'lucide-react';
import { MEDICINES } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function AdminInventory() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Inventory <span className="text-primary">Ops</span></h1>
          <p className="text-slate-500 font-bold text-sm">Monitor stock levels, expiry dates, and procurements.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">Audit Logs</button>
          <button className="px-6 py-3 premium-gradient rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20">Add SKU</button>
        </div>
      </div>

      {/* Stock Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Units', value: MEDICINES.reduce((sum, m) => sum + m.stock, 0), icon: Package, color: 'text-primary' },
          { label: 'Low Stock SKU', value: MEDICINES.filter(m => m.stock < 100).length, icon: AlertTriangle, color: 'text-rose-500' },
          { label: 'Formulas Active', value: MEDICINES.length, icon: Flask, color: 'text-emerald-500' },
          { label: 'Out of Stock', value: 0, icon: Trash2, color: 'text-slate-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0d1117] p-6 rounded-[32px] border border-white/5 group hover:border-white/10 transition-all">
             <div className="flex items-center justify-between mb-4">
                <div className={cn("p-2 rounded-xl bg-white/5", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
             </div>
             <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-1">{stat.label}</p>
             <h5 className="text-2xl font-black text-white">{stat.value}</h5>
          </div>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="bg-[#0d1117] rounded-[40px] border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1 group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-primary transition-colors" />
             <input 
                type="text" 
                placeholder="Find SKU or Formula..."
                className="w-full h-12 bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 outline-none focus:border-primary/50 text-xs font-bold text-white transition-all"
             />
          </div>
          <div className="flex items-center gap-3">
             <button className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:text-white transition-all flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" />
                Filter SKU
             </button>
             <button className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:text-white transition-all flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sort Units
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-white/5 uppercase text-[10px] font-black text-slate-500 tracking-[0.25em]">
                    <th className="px-8 py-5">Product Unit</th>
                    <th className="px-8 py-5">Category</th>
                    <th className="px-8 py-5">Price (Base)</th>
                    <th className="px-8 py-5">Inventory Status</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                 {MEDICINES.slice(0, 8).map((med, i) => (
                    <motion.tr 
                      key={med.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="group hover:bg-white/5 transition-colors"
                    >
                       <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-white/5">
                                <img src={med.image} className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
                             </div>
                             <div>
                                <h6 className="text-xs font-black text-white">{med.name}</h6>
                                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{med.formula}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-5">
                          <span className="text-[10px] font-black uppercase text-slate-500">{med.category}</span>
                       </td>
                       <td className="px-8 py-5">
                          <span className="text-xs font-bold text-white">Rs. {med.price}</span>
                       </td>
                       <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                             <div className="flex-1 max-w-[120px] h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div 
                                  className={cn(
                                    "h-full rounded-full transition-all",
                                    med.stock < 100 ? "bg-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-primary"
                                  )}
                                  style={{ width: `${Math.min(100, (med.stock / 2000) * 100)}%` }} 
                                />
                             </div>
                             <span className={cn(
                               "text-[10px] font-black",
                               med.stock < 100 ? "text-rose-500" : "text-white"
                             )}>{med.stock} Units</span>
                          </div>
                       </td>
                       <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-2 text-slate-600">
                             <button className="p-2 hover:text-primary transition-colors"><Edit className="w-4 h-4" /></button>
                             <button className="p-2 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </div>
                       </td>
                    </motion.tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
