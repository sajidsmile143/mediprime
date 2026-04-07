'use client';

import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Package, Truck, 
  MapPin, CreditCard, ChevronRight, 
  ArrowLeft, ShoppingBag, ShieldCheck,
  Zap, Clock, Phone
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function CheckoutContent() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState('checkout'); // checkout, processing, success

  const handlePlaceOrder = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      clearCart();
    }, 2500);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Success Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-50 dark:bg-white/5 rounded-[48px] border border-slate-100 dark:border-white/10 p-12 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
            <div className="flex justify-center mb-8">
               <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                  <CheckCircle2 className="w-12 h-12" />
               </div>
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">Order Confirmed!</h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold max-w-md mx-auto">
              Order <span className="text-slate-900 dark:text-white">#MP-78923</span> is now being processed. 
              We've sent a detailed receipt to your email.
            </p>

            {/* Tracking Timeline */}
            <div className="mt-16 text-left max-w-sm mx-auto space-y-8">
               {[
                 { label: 'Order Placed', time: 'Just now', status: 'completed', icon: ShoppingBag },
                 { label: 'Prescription Verified', time: 'Waiting', status: 'current', icon: ShieldCheck },
                 { label: 'Order Packing', time: '-', status: 'pending', icon: Package },
                 { label: 'Out for Delivery', time: '-', status: 'pending', icon: Truck },
               ].map((item, i) => (
                 <div key={item.label} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                       <div className={cn(
                         "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                         item.status === 'completed' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" :
                         item.status === 'current' ? "bg-primary text-white shadow-lg shadow-primary/20 animate-pulse" :
                         "bg-slate-200 dark:bg-white/10 text-slate-400"
                       )}>
                          <item.icon className="w-5 h-5" />
                       </div>
                       {i !== 3 && (
                         <div className={cn(
                           "w-0.5 h-10 mt-2",
                           item.status === 'completed' ? "bg-emerald-500" : "bg-slate-200 dark:bg-white/10"
                         )} />
                       )}
                    </div>
                    <div className="pt-1">
                       <h4 className={cn(
                         "text-sm font-black uppercase tracking-widest",
                         item.status === 'completed' ? "text-slate-900 dark:text-white" :
                         item.status === 'current' ? "text-primary" : "text-slate-400"
                       )}>{item.label}</h4>
                       <p className="text-[10px] font-bold text-slate-500">{item.time}</p>
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Link href="/shop" className="h-16 rounded-3xl border border-slate-200 dark:border-white/10 flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                Continue Shopping
             </Link>
             <button className="h-16 rounded-3xl premium-gradient text-white flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
                Track Live Location
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
        
        {/* Left: Summary & Payment */}
        <div className="flex-1 space-y-10">
          <div className="flex items-center gap-4 text-slate-500">
             <Link href="/cart" className="flex items-center gap-2 hover:text-primary transition-colors group">
               <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
               <span className="text-[10px] font-black uppercase tracking-widest">Back to Cart</span>
             </Link>
          </div>

          <div>
             <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">Complete <span className="text-primary italic">Order</span></h1>
             <p className="text-slate-500 dark:text-slate-400 font-bold tracking-tight">Enter your secure verification and delivery details.</p>
          </div>

          {/* Delivery Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-white/5 p-8 md:p-12 rounded-[40px] border border-slate-100 dark:border-white/10 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
             
             <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Full Delivery Address</label>
                <div className="relative group">
                   <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                   <input 
                      type="text" 
                      placeholder="Street 12, DHA Phase 5, Lahore..."
                      className="w-full h-16 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-3xl pl-16 pr-6 outline-none focus:border-primary/50 text-slate-900 dark:text-white font-bold transition-all"
                   />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Contact Number</label>
                <div className="relative group">
                   <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                   <input 
                      type="text" 
                      placeholder="+92 3XX XXXXXXX"
                      className="w-full h-16 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-3xl pl-16 pr-6 outline-none focus:border-primary/50 text-slate-900 dark:text-white font-bold transition-all"
                   />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Payment Method</label>
                <div className="h-16 bg-white dark:bg-white/5 border border-primary/20 rounded-3xl flex items-center justify-between px-6">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                         <CreditCard className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-black text-slate-900 dark:text-white tracking-widest">Cash on Delivery</span>
                   </div>
                   <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
             </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-3xl flex gap-4 items-start">
             <Clock className="w-6 h-6 text-amber-500 shrink-0" />
             <p className="text-amber-500/80 text-xs font-bold leading-relaxed">
               <span className="block font-black uppercase tracking-widest mb-1 text-amber-600">Rush Delivery: 25-45 mins</span>
               Estimated arrival based on current rider availability in your sector.
             </p>
          </div>
        </div>

        {/* Right: Order Details */}
        <div className="w-full lg:w-[420px] sticky top-32 space-y-6">
           <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-8 rounded-[48px] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                 <h3 className="text-2xl font-black tracking-tighter mb-8">Order Summary</h3>
                 <div className="space-y-6 max-h-[300px] overflow-y-auto custom-scrollbar pr-4 mb-8">
                    {cartItems.map((item) => (
                       <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-white/10 dark:bg-slate-950/10 rounded-xl flex items-center justify-center relative shadow-lg">
                                <img src={item.image} className="w-full h-full object-cover opacity-80" />
                                <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-[10px] flex items-center justify-center rounded-full font-black border-2 border-slate-900 dark:border-white">{item.quantity}</div>
                             </div>
                             <div>
                                <h4 className="text-xs font-black truncate max-w-[120px]">{item.name}</h4>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.category}</p>
                             </div>
                          </div>
                          <span className="text-xs font-black whitespace-nowrap">Rs. {item.price * item.quantity}</span>
                       </div>
                    ))}
                 </div>

                 <div className="space-y-4 pt-6 border-t border-white/10 dark:border-slate-900/10">
                    <div className="flex items-center justify-between text-slate-400">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Subtotal</span>
                       <span className="text-xs font-bold text-white dark:text-slate-900">Rs. {cartTotal}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Surgcharge</span>
                       <span className="text-xs font-bold text-white dark:text-slate-900">Rs. 80</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/10 dark:border-slate-900/10">
                       <span className="text-xl font-black text-white dark:text-slate-900">Total</span>
                       <span className="text-2xl font-black text-primary">Rs. {cartTotal + 80}</span>
                    </div>
                 </div>

                 <button 
                  onClick={handlePlaceOrder}
                  disabled={step === 'processing'}
                  className={cn(
                    "w-full h-16 rounded-3xl mt-8 font-black uppercase tracking-[0.25em] text-[10px] shadow-2xl transition-all flex items-center justify-center gap-3",
                    step === 'processing' ? "bg-slate-800 dark:bg-slate-200 cursor-not-allowed opacity-50" : "premium-gradient text-white shadow-primary/40 hover:-translate-y-1"
                  )}
                 >
                    {step === 'processing' ? (
                       <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Scheduling...
                       </>
                    ) : (
                       <>
                          <Zap className="w-4 h-4 fill-white" />
                          Finalize Process
                          <ChevronRight className="w-4 h-4 ml-1" />
                       </>
                    )}
                 </button>
              </div>
              <ShoppingBag className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 dark:text-slate-900/5 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
           </div>

           <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 p-6 rounded-3xl flex items-center gap-4">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure AES-256 Encrypted Gateway</p>
           </div>
        </div>

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
