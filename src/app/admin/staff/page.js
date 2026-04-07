'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Clock, UserCheck, Calendar, 
  MoreVertical, Phone, Mail, Award,
  ArrowUpRight, ArrowDownRight, Target, Activity, 
  ShieldCheck, Trash2, Plus, X, Search, UserPlus
} from 'lucide-react';
import { STAFF } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function StaffManagement() {
  const [staffList, setStaffList] = useState(STAFF);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form State
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: 'Rider',
    shift: '09:00 AM - 05:00 PM',
    status: 'Active',
    contact: ''
  });

  const filteredStaff = useMemo(() => {
    return staffList.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [staffList, searchTerm]);

  const handleAddStaff = (e) => {
    e.preventDefault();
    const id = `s${staffList.length + 1}`;
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const entry = {
      ...newStaff,
      id,
      ordersCompleted: 0,
      checkIn: currentTime,
      checkOut: '-',
      performance: 100,
      avatar: `https://i.pravatar.cc/150?u=${id}`
    };
    setStaffList([entry, ...staffList]);
    setShowAddModal(false);
    setNewStaff({ name: '', role: 'Pharmacist', shift: '09:00 AM - 05:00 PM', status: 'Active', contact: '' });
  };

  const handleFireStaff = (id) => {
    if (confirm("Are you sure you want to terminate this personnel?")) {
      setStaffList(staffList.filter(s => s.id !== id));
    }
  };

  const toggleShift = (id) => {
    setStaffList(staffList.map(s => {
      if (s.id === id) {
        return {
          ...s,
          shift: s.shift.includes('09:00') ? '06:00 PM - 02:00 AM' : '09:00 AM - 05:00 PM'
        };
      }
      return s;
    }));
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Personnel <span className="text-primary">Command</span></h1>
          <p className="text-slate-500 font-bold text-sm">Monitor shifts, attendance, and deployment status across all operational units.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all">Personnel Logs</button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 premium-gradient rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20 flex items-center gap-2 group"
          >
            <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Add Staff
          </button>
        </div>
      </div>

      {/* Roster Grid Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Shift', value: staffList.filter(s => s.status === 'Active').length, icon: UserCheck, color: 'text-emerald-500' },
          { label: 'On Deployment/Busy', value: staffList.filter(s => s.status === 'Busy').length, icon: Activity, color: 'text-amber-500' },
          { label: 'Off-Roster', value: staffList.filter(s => s.status === 'Away').length, icon: Clock, color: 'text-slate-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0d1117] p-6 rounded-[32px] border border-white/5 flex items-center gap-6 group hover:border-white/10 transition-all">
            <div className={cn("w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform", stat.color)}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Staff Roster Table */}
      <div className="bg-[#0d1117] rounded-[40px] border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-black text-white tracking-tight leading-none">Operational Roster</h3>
            <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 shadow-lg">Live ({staffList.length})</div>
          </div>
          <div className="flex-1 max-w-md relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name or role..."
              className="w-full h-12 bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 outline-none focus:border-primary/50 text-xs font-bold text-white transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 uppercase text-[10px] font-black text-slate-500 tracking-[0.25em]">
                <th className="px-8 py-5">Personnel Unit</th>
                <th className="px-8 py-5">Assigned Shift</th>
                <th className="px-8 py-5">Deployment Status</th>
                <th className="px-8 py-5">Attendance Flow</th>
                <th className="px-8 py-5 text-right">Performance</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredStaff.map((member, i) => (
                  <motion.tr
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={member.id}
                    className="group hover:bg-white/5 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="relative group/avatar">
                          <img src={member.avatar} className="w-10 h-10 rounded-xl grayscale group-hover/avatar:grayscale-0 transition-grayscale hover:opacity-100" />
                          <div className={cn(
                            "absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#0d1117] shadow-lg",
                            member.status === 'Active' ? "bg-emerald-500" :
                            member.status === 'Busy' ? "bg-amber-500" :
                            "bg-slate-700"
                          )} />
                        </div>
                        <div>
                          <h5 className="font-black text-white group-hover:text-primary transition-colors">{member.name}</h5>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{member.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <button 
                        onClick={() => toggleShift(member.id)}
                        className="group/shift flex items-center gap-2 hover:bg-white/5 px-3 py-1.5 rounded-xl transition-all"
                      >
                        <Calendar className="w-3 h-3 text-slate-600 group-hover/shift:text-primary transition-colors" />
                        <span className="text-xs font-bold text-slate-400 group-hover/shift:text-white transition-colors">{member.shift}</span>
                      </button>
                    </td>
                    <td className="px-8 py-6">
                      <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border",
                        member.status === 'Active' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                        member.status === 'Busy' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                        "bg-white/5 text-slate-600 border-white/5"
                      )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full", 
                          member.status === 'Active' ? "bg-emerald-500" :
                          member.status === 'Busy' ? "bg-amber-500" :
                          "bg-slate-700"
                        )} />
                        {member.status}
                      </div>
                    </td>
                    <td className="px-8 py-6 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest w-12 text-right">In:</span>
                        <span className="text-xs font-black text-slate-200">{member.checkIn}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest w-12 text-right">Out:</span>
                        <span className={cn("text-xs font-black", member.checkOut === '-' ? "text-slate-700" : "text-rose-400")}>{member.checkOut}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-white">{member.performance}%</span>
                          <ShieldCheck className="w-3 h-3 text-primary" />
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-700">{member.ordersCompleted} Tasks Done</p>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => handleFireStaff(member.id)}
                        className="p-3 bg-white/5 hover:bg-rose-500/10 text-slate-600 hover:text-rose-500 rounded-xl transition-all border border-transparent hover:border-rose-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredStaff.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center">
              <Users className="w-12 h-12 text-slate-800 mb-4" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No personnel found in current command</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Personnel Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-[#0a0c10]/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-[#0d1117] border border-white/5 rounded-[40px] p-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex items-center justify-between mb-10 relative z-10">
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tighter capitalize">Add Personnel</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">Operational Onboarding</p>
                </div>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddStaff} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Enter personnel name..."
                    className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 outline-none focus:border-primary/50 text-white font-bold transition-all"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Assigned Role</label>
                    <select 
                      className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 outline-none focus:border-primary/50 text-white font-bold transition-all appearance-none"
                      value={newStaff.role}
                      onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                    >
                      <option className="bg-[#0d1117] text-white">Pharmacist</option>
                      <option className="bg-[#0d1117] text-white">Store Manager</option>
                      <option className="bg-[#0d1117] text-white">Inventory Manager</option>
                      <option className="bg-[#0d1117] text-white">Packer</option>
                      <option className="bg-[#0d1117] text-white">Rider</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Shift Schedule</label>
                    <select 
                      className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 outline-none focus:border-primary/50 text-white font-bold transition-all appearance-none"
                      value={newStaff.shift}
                      onChange={(e) => setNewStaff({...newStaff, shift: e.target.value})}
                    >
                      <option className="bg-[#0d1117] text-white">09:00 AM - 05:00 PM</option>
                      <option className="bg-[#0d1117] text-white">06:00 PM - 02:00 AM</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Contact Number</label>
                  <input 
                    required
                    type="text" 
                    placeholder="+92 3XX XXXXXXX"
                    className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 outline-none focus:border-primary/50 text-white font-bold transition-all"
                    value={newStaff.contact}
                    onChange={(e) => setNewStaff({...newStaff, contact: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full h-16 premium-gradient rounded-3xl text-white font-black uppercase tracking-[0.25em] text-xs shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mt-4"
                >
                  <UserPlus className="w-5 h-5" />
                  Finalize Onboarding
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Leadership/Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-[#0d1117] p-8 rounded-[40px] border border-white/5 relative overflow-hidden flex flex-col gap-8 group">
          <Target className="absolute -top-12 -right-12 w-48 h-48 text-white/5 group-hover:scale-110 group-hover:text-primary/5 transition-all duration-1000" />
          <div className="relative z-10">
            <h4 className="text-xl font-black text-white tracking-tight mb-2">Fleet Performance Intelligence</h4>
            <p className="text-slate-500 text-xs font-bold w-3/4">Staff metrics is calculated daily based on order fulfillment speed, customer rating, and attendance consistency.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 relative z-10">
             <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-1">Avg Fulfillment</p>
                <div className="flex items-center gap-3">
                  <h5 className="text-2xl font-black text-white tracking-tighter">14.2m</h5>
                  <ArrowDownRight className="w-4 h-4 text-emerald-500" />
                </div>
             </div>
             <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-1">Fleet Compliance</p>
                <div className="flex items-center gap-3">
                  <h5 className="text-2xl font-black text-white tracking-tighter">99.2%</h5>
                  <ArrowUpRight className="w-4 h-4 text-primary" />
                </div>
             </div>
          </div>
        </div>

        <div className="bg-[#0d1117] p-8 rounded-[40px] border border-white/5 flex flex-col gap-6">
          <h4 className="text-xl font-black text-white tracking-tight">Active Shift Management</h4>
          <div className="space-y-3">
            {staffList.filter(s => s.status === 'Active').slice(0, 3).map((active) => (
              <div key={active.id} className="p-4 bg-white/5 rounded-[24px] flex items-center justify-between border border-white/10 group hover:border-primary/20 transition-all">
                <div className="flex items-center gap-4">
                  <img src={active.avatar} className="w-10 h-10 rounded-xl" />
                  <div>
                    <h5 className="text-xs font-black text-white">{active.name}</h5>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{active.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest border border-emerald-500/20">Active Shift</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-2 py-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all">Optimize Roster</button>
        </div>
      </div>
    </div>
  );
}
