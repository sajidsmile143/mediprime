'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Filter, Search, MoreHorizontal, 
  Package, Truck, CheckCircle2, Clock, 
  User, ArrowRight, ExternalLink, Activity
} from 'lucide-react';
import { ORDERS, STAFF } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function AdminOrders() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Order <span className="text-primary">Flux</span></h1>
          <p className="text-slate-500 font-bold text-sm">Real-time fulfillment queue and logistics monitoring.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">Bulk Actions</button>
          <button className="px-6 py-3 premium-gradient rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20">Fulfillment Center</button>
        </div>
      </div>

      {/* Order Filters */}
      <div className="flex items-center justify-between p-2 bg-white/5 border border-white/5 rounded-3xl">
        <div className="flex gap-1">
          {['All Flux', 'Pending', 'Packing', 'Shipped', 'Delivered'].map((status) => (
            <button 
              key={status}
              className={cn(
                "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                status === 'All Flux' ? "bg-white/10 text-white" : "text-slate-500 hover:text-slate-300"
              )}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="px-4 flex items-center gap-2 text-slate-500">
          <Filter className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Advanced Filter</span>
        </div>
      </div>

      {/* Main Order Queue */}
      <div className="grid grid-cols-1 gap-4 text-sm font-sans">
        <AnimatePresence>
          {ORDERS.map((order, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={order.id}
              className="bg-[#0d1117] hover:bg-white/5 border border-white/5 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-8 group transition-all"
            >
              <div className="flex items-center gap-8 flex-1">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary font-black text-xs border border-white/5 shadow-xl relative group-hover:scale-105 transition-transform">
                  {order.id.split('-')[1]}
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary/20 rounded-full blur-lg" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h5 className="text-xl font-black text-white">{order.customer}</h5>
                    <div className="px-2 py-0.5 bg-slate-900 border border-white/10 rounded text-[8px] font-black text-slate-500 uppercase tracking-widest">{order.id}</div>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em]">{order.items} Product Units • Received {order.time}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                {/* Logistics */}
                <div className="flex items-center gap-12">
                   <div className="flex flex-col gap-1">
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Pricing</p>
                      <p className="text-lg font-black text-white">Rs. {order.total}</p>
                   </div>
                   <div className="flex flex-col gap-1 min-w-[140px]">
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Assigned Force</p>
                      <div className="flex items-center gap-2">
                        {order.assignedTo ? (
                          <>
                            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                              <User className="w-3 h-3 text-emerald-500" />
                            </div>
                            <span className="text-xs font-black text-slate-300">{STAFF.find(s => s.id === order.assignedTo)?.name}</span>
                          </>
                        ) : (
                          <span className="text-xs font-black text-rose-500 flex items-center gap-1.5 animate-pulse">
                            Unassigned
                          </span>
                        )}
                      </div>
                   </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] border",
                    order.status === 'Pending' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                    order.status === 'Delivered' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                    "bg-primary/10 text-primary border-primary/20"
                  )}>
                    {order.status}
                  </div>
                  <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Performance Snapshot */}
      <div className="p-8 bg-primary/10 rounded-[40px] border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-xl font-black text-white tracking-tight">Fulfillment System Efficiency</h4>
            <div className="px-2 py-0.5 bg-emerald-500/20 text-emerald-500 rounded text-[9px] font-black">Stable</div>
          </div>
          <p className="text-white/60 text-xs font-bold w-2/3">Your operations are running 15% faster compared to last week. Peak fulfillment achieved at 02:45 PM.</p>
        </div>
        <div className="flex gap-4 relative z-10 shrink-0">
          <div className="p-4 bg-white/5 rounded-3xl border border-white/5">
            <p className="text-[8px] font-black text-white/50 uppercase mb-1">Avg Packaging</p>
            <p className="text-xl font-black text-white">4.2m</p>
          </div>
          <div className="p-4 bg-white/5 rounded-3xl border border-white/5">
            <p className="text-[8px] font-black text-white/50 uppercase mb-1">Rider Dispatch</p>
            <p className="text-xl font-black text-white">2.8m</p>
          </div>
        </div>
        <Activity className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 group-hover:scale-125 transition-transform duration-1000" />
      </div>
    </div>
  );
}
