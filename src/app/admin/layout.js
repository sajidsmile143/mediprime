'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, ShoppingCart, Users, Package, 
  Settings, Bell, Search, Command, LogOut, Activity,
  Globe, Shield, FileText
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Globe, label: 'View Storefront', href: '/' },
  { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
  { icon: ShoppingCart, label: 'Live Orders', href: '/admin/orders' },
  { icon: FileText, label: 'Prescription Inbox', href: '/admin/prescriptions' },
  { icon: Users, label: 'Staff Management', href: '/admin/staff' },
  { icon: Package, label: 'Inventory', href: '/admin/inventory' },
  { icon: Activity, label: 'Analytics', href: '/admin/analytics' },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-400 font-sans selection:bg-primary/30 selection:text-white">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-72 bg-[#0d1117] border-r border-white/5 z-50 flex flex-col pt-8">
        <div className="px-8 mb-12 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tighter leading-none">MediPrime</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mt-1">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group relative cursor-pointer",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-slate-500 hover:text-white hover:bg-white/5"
                )}>
                  {isActive && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                    />
                  )}
                  <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "group-hover:scale-110 transition-transform")} />
                  <span className="font-bold text-sm tracking-tight">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 border border-white/5 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-2">System Status</h4>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">All Core Engines Live</span>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest text-white transition-colors border border-white/10">
                Performance Logs
              </button>
            </div>
            <Globe className="absolute -bottom-4 -right-4 w-20 h-20 text-white/5 group-hover:text-primary/10 transition-colors duration-700" />
          </div>
          
          <button className="w-full mt-6 py-4 rounded-2xl flex items-center justify-center gap-3 text-slate-500 hover:text-rose-500 hover:bg-rose-500/5 transition-all font-black text-[10px] uppercase tracking-widest">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-72 min-h-screen">
        {/* Top Header */}
        <header className="h-24 px-12 flex items-center justify-between border-b border-white/5 bg-[#0a0c10]/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-4 bg-white/5 border border-white/5 px-6 py-3 rounded-2xl w-96 group focus-within:border-primary/50 transition-all">
            <Search className="w-4 h-4 text-slate-500 group-focus-within:text-primary" />
            <input 
              type="text" 
              placeholder="System command or search..."
              className="bg-transparent border-none outline-none text-xs font-bold text-white w-full placeholder:text-slate-600"
            />
            <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-md border border-white/10 uppercase text-[8px] font-black text-slate-500">
              <Command className="w-2 h-2" />
              K
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
              <Bell className="w-5 h-5 text-slate-400" />
              <div className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0a0c10]" />
            </button>
            <div className="h-10 w-px bg-white/5 mx-2" />
            <div className="flex items-center gap-4 cursor-pointer group">
              <div className="text-right">
                <p className="text-white font-black text-sm tracking-tight leading-none mb-1">Zeeshan Khan</p>
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Chief Admin</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/20 flex items-center justify-center overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=zeeshan" alt="Admin" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-12 pb-32">
          {children}
        </div>
      </main>
    </div>
  );
}
