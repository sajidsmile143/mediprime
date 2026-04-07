'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ShoppingCart, ShieldCheck, Truck, 
  RotateCcw, Info, Star, Plus, Minus, Activity,
  AlertCircle, CheckCircle2, FlaskRound as Flask
} from 'lucide-react';
import { MEDICINES } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

import { useCart } from '@/context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const product = MEDICINES.find(m => m.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <Activity className="w-12 h-12 text-slate-200" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-4">Product Not Found</h1>
        <p className="text-slate-500 mb-8 max-w-sm">The medication you are looking for might have been moved or is currently out of stock.</p>
        <button 
          onClick={() => router.push('/shop')}
          className="px-8 py-4 rounded-2xl bg-slate-900 text-white font-black text-sm uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  // Find similar salts (Simplified logic for mock)
  const similarSalts = MEDICINES.filter(m => m.formula === product.formula && m.id !== product.id);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header Space */}
      <div className="pt-32 pb-12 max-w-7xl mx-auto px-6">
        <button 
          onClick={() => router.back()}
          className="group inline-flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to catalog
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Product Visuals */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-[48px] bg-white overflow-hidden shadow-premium border border-white"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm border border-white/50">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-sm font-black text-slate-900">{product.rating}</span>
                <span className="text-xs font-bold text-slate-400">({product.reviews} reviews)</span>
              </div>
            </motion.div>

            {/* Quick Benefits */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: ShieldCheck, label: '100% Genuine', color: 'text-emerald-500' },
                { icon: Truck, label: 'Fast Delivery', color: 'text-primary' },
                { icon: RotateCcw, label: 'Easy Returns', color: 'text-amber-500' }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-col items-center text-center gap-3 transition-transform hover:-translate-y-1">
                  <item.icon className={cn("w-6 h-6", item.color)} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Content */}
          <div className="space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary border border-primary/10">
                {product.brand} • {product.category}
              </div>
              <h1 className="text-5xl font-black text-slate-900">{product.name}</h1>
              <div className="flex items-center gap-3">
                <p className="text-xl font-bold text-slate-400 italic">Formula: {product.formula}</p>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-black uppercase tracking-widest">{product.strength}</span>
              </div>
            </motion.div>

            {/* Salt Info Card */}
            <div className="bg-emerald-50/50 p-6 rounded-[32px] border border-emerald-100 relative overflow-hidden group">
              <Flask className="absolute -bottom-4 -right-4 w-24 h-24 text-emerald-500/10 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-black text-emerald-900">Medical Composition (Salt)</h4>
              </div>
              <p className="text-emerald-800 font-bold text-lg">{product.salt}</p>
              <div className="mt-4 flex items-center gap-2 text-emerald-600/60 font-black text-[10px] uppercase tracking-wider">
                <AlertCircle className="w-3 h-3" />
                Always consult a doctor before use
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h4 className="font-black text-xs uppercase tracking-widest text-slate-400">Description</h4>
              <p className="text-slate-600 font-medium leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Usage & Side Effects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-primary" />
                  <span className="font-black text-[10px] uppercase tracking-widest text-slate-400">Dosage & Usage</span>
                </div>
                <p className="text-sm font-bold text-slate-700 leading-relaxed">{product.usage}</p>
              </div>
              <div className="p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span className="font-black text-[10px] uppercase tracking-widest text-slate-400">Side Effects</span>
                </div>
                <ul className="space-y-1">
                  {product.sideEffects.map((effect, i) => (
                    <li key={i} className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      {effect}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Price & Cart Actions */}
            <div className="pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="w-full sm:w-auto">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block">Total Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">Rs. {product.price * quantity}</span>
                  <span className="text-sm font-bold text-slate-400">Incl. Taxes</span>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full sm:w-auto">
                {/* Quantity */}
                <div className="h-14 bg-white rounded-2xl border border-slate-200 flex items-center px-2 shadow-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-black text-lg text-slate-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button 
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 sm:flex-initial h-14 px-10 rounded-2xl premium-gradient text-white flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all active:translate-y-0"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Similar Salts Matching - REAL MAGIC */}
            {similarSalts.length > 0 && (
              <div className="pt-12">
                <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-6">Real-Magic: Similar Salt Matching</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {similarSalts.map((alt) => (
                    <Link key={alt.id} href={`/product/${alt.id}`}>
                      <div className="p-4 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-premium transition-all cursor-pointer flex items-center gap-4 group">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 shrink-0">
                          <img src={alt.image} alt={alt.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-0.5">{alt.brand}</p>
                          <h5 className="font-black text-slate-900 group-hover:text-primary transition-colors">{alt.name}</h5>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Rs. {alt.price}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
