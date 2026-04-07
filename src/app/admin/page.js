'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, ShoppingBag, AlertTriangle, 
  ArrowUpRight, ArrowDownRight, Clock, MapPin, 
  CreditCard, Activity, FlaskConical as Flask
} from 'lucide-react';
import { STAFF, ORDERS, MEDICINES } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const [mounted, setMounted] = React.useState(false);
  const [time, setTime] = React.useState('');

  React.useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock Stats Calculation
  const totalSales = ORDERS.reduce((sum, o) => sum + o.total, 0);
  const activeStaff = STAFF.filter(s => s.status === 'Active').length;
  const pendingOrders = ORDERS.filter(o => o.status === 'Pending').length;
  const lowStock = MEDICINES.filter(m => m.stock < 100).length;

  const stats = [
    { label: 'Total Revenue', value: `Rs. ${totalSales}`, change: '+12.5%', icon: CreditCard, color: 'text-primary' },
    { label: 'Active Personnel', value: activeStaff, change: '4 on duty', icon: Users, color: 'text-emerald-500' },
    { label: 'Pending Orders', value: pendingOrders, change: 'Requires Action', icon: ShoppingBag, color: 'text-amber-500' },
    { label: 'Low Stock Alerts', value: lowStock, change: 'Restock soon', icon: AlertTriangle, color: 'text-rose-500' },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Systems <span className="text-primary">Pulse</span></h1>
          <p className="text-slate-500 font-bold text-sm">Real-time operational metrics for MediPrime Central.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-xs font-black text-white uppercase tracking-widest">Live: {mounted ? time : '--:--:--'}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="bg-[#0d1117] p-8 rounded-[32px] border border-white/5 hover:border-primary/20 transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={cn("p-3 rounded-2xl bg-white/5", stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="px-2 py-1 bg-white/5 rounded-lg flex items-center gap-1 group-hover:scale-110 transition-transform">
                {stat.change.includes('+') ? (
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                ) : (
                  <Activity className="w-3 h-3 text-primary" />
                )}
                <span className="text-[10px] font-black text-white">{stat.change}</span>
              </div>
            </div>
            <h3 className="text-slate-500 font-black text-[10px] uppercase tracking-widest mb-1">{stat.label}</h3>
            <p className="text-3xl font-black text-white tracking-tighter">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Orders Queue */}
        <div className="lg:col-span-2 bg-[#0d1117] rounded-[40px] border border-white/5 p-8 flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h4 className="text-xl font-black text-white tracking-tight">Order Flux Queue</h4>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Live fulfillment monitoring</p>
            </div>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black text-primary uppercase tracking-widest transition-all">View All Queue</button>
          </div>

          <div className="space-y-4">
            {ORDERS.map((order) => (
              <div 
                key={order.id}
                className="group flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 rounded-[24px] border border-transparent hover:border-white/5 transition-all text-sm"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-primary font-black text-xs border border-white/5 shadow-xl">
                    {order.id.split('-')[1]}
                  </div>
                  <div>
                    <h5 className="text-white font-black">{order.customer}</h5>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{order.items} Items • {order.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-12">
                  <div className="hidden md:block text-right">
                    <p className="text-white font-bold tracking-tight">Rs. {order.total}</p>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Total Price</p>
                  </div>
                  <div className={cn(
                    "px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg",
                    order.status === 'Pending' ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                    order.status === 'Delivered' ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                    "bg-primary/10 text-primary border border-primary/20"
                  )}>
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Fleet Overview */}
        <div className="bg-[#0d1117] rounded-[40px] border border-white/5 p-8 flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <h4 className="text-xl font-black text-white tracking-tight">Active Fleet</h4>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-6">
            {STAFF.slice(0, 4).map((member) => (
              <div key={member.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={member.avatar} className="w-10 h-10 rounded-xl grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" />
                    {member.status === 'Active' && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0d1117]" />
                    )}
                  </div>
                  <div>
                    <h5 className="text-white font-black text-xs">{member.name}</h5>
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.25em]">{member.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-white tracking-tight">{member.performance}%</p>
                  <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest">Score</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-white/5">
            <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Operations Map</h5>
            <div className="h-40 bg-slate-900 rounded-3xl border border-white/5 relative overflow-hidden group">
              <MapPin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary opacity-20 group-hover:scale-125 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">3 Riders Busy</span>
                </div>
                <button className="text-[8px] font-black uppercase text-primary tracking-widest">Expand Map</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
