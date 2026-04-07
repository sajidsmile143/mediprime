'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Trash2, Plus, Minus, ArrowRight, 
  ArrowLeft, CreditCard, ShieldCheck, Truck, Package 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-32 h-32 bg-slate-50 rounded-[40px] flex items-center justify-center mb-8"
        >
          <ShoppingBag className="w-16 h-16 text-slate-200" />
        </motion.div>
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Your cart is empty</h1>
        <p className="text-slate-500 mb-10 max-w-sm font-medium">
          Looks like you haven't added any medications yet. Start shopping to find what you need.
        </p>
        <Link href="/shop">
          <button className="px-10 py-5 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all hover:-translate-y-1">
            Browse Pharmacy
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfdfe] pb-32">
      {/* Header */}
      <div className="pt-32 pb-12 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary border border-primary/10 mb-4">
              Review Order
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Shopping <span className="text-gradient">Cart</span></h1>
          </div>
          <Link href="/shop" className="group flex items-center gap-2 text-slate-400 font-bold hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-premium flex flex-col md:flex-row items-center gap-8 group"
                >
                  {/* Image */}
                  <div className="w-24 h-24 bg-slate-50 rounded-2xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1 justify-center md:justify-start">
                      <h3 className="text-xl font-black text-slate-900">{item.name}</h3>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-slate-100 text-slate-400 uppercase tracking-widest">{item.brand}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 italic mb-1">{item.formula}</p>
                    <p className="text-xs font-black text-primary uppercase tracking-widest">{item.strength}</p>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center gap-4 py-2 px-2 bg-slate-50 rounded-2xl border border-slate-100">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-black text-slate-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
                    <p className="text-2xl font-black text-slate-900 tracking-tighter">Rs. {item.price * item.quantity}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 hover:text-rose-600 transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Delivery Info Mini-Banner */}
            <div className="p-6 bg-slate-900 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center gap-4 relative z-10 text-center md:text-left">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-primary">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-lg">Express Delivery (15 Mins)</h4>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Available in your area</p>
                </div>
              </div>
              <div className="px-6 py-2.5 bg-primary rounded-xl text-[10px] font-black uppercase tracking-[0.2em] relative z-10 transition-transform group-hover:scale-105">
                Enabled
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <aside className="sticky top-32 space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-3xl">
              <h3 className="font-black text-2xl text-slate-900 mb-8 tracking-tighter">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-slate-500 font-bold text-sm">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="text-slate-900 font-black">Rs. {cartTotal}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 font-bold text-sm">
                  <span>Delivery Fee</span>
                  <span className="text-emerald-500 font-black uppercase tracking-widest">Free</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 font-bold text-sm">
                  <span>Service Charges</span>
                  <span className="text-slate-900 font-black">Rs. 0</span>
                </div>
                <div className="h-px bg-slate-100 my-4" />
                <div className="flex justify-between items-end">
                  <span className="font-black text-slate-900 text-lg uppercase tracking-tighter leading-none">Total</span>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Price inclusive of taxes</p>
                    <p className="text-4xl font-black text-primary leading-none tracking-tighter">Rs. {cartTotal}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/checkout">
                  <button className="w-full py-5 rounded-2xl premium-gradient text-white font-black text-[10px] uppercase tracking-[0.25em] shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all active:translate-y-0 flex items-center justify-center gap-3">
                    <CreditCard className="w-4 h-4" />
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <div className="flex items-center justify-center gap-4 pt-4">
                  <div className="flex items-center gap-1.5 opacity-50">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Secure SSL</span>
                  </div>
                  <div className="flex items-center gap-1.5 opacity-50">
                    <Package className="w-4 h-4 text-primary" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Discrete Box</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Box */}
            <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-4 px-2">Need Assistance?</h4>
              <p className="text-slate-500 text-xs font-bold px-2 leading-relaxed mb-6">
                Our support team is available 24/7. Call us at +92 300 000 0000 or chat with us.
              </p>
              <button className="w-full py-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-colors">
                Contact Pharmacist
              </button>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
