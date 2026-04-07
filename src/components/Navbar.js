'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import SearchOverlay from './SearchOverlay';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-[110] transition-all duration-500 px-4 md:px-8",
        scrolled ? "py-3 shadow-premium bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
            <Plus className="w-6 h-6 rotate-45" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tighter text-gradient uppercase">MediPrime</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10 font-bold text-[11px] uppercase tracking-[0.2em] text-slate-500">
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <Link href="/prescriptions" className="hover:text-primary transition-colors">Prescriptions</Link>
          <Link href="/consultation" className="hover:text-primary transition-colors">Consultations</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="hidden sm:block p-3 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-colors"
          >
            <Search className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          
          <Link href="/cart" className="p-3 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-colors relative group">
            <ShoppingCart className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-2 right-2 w-5 h-5 bg-primary text-white text-[9px] flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 font-black shadow-lg shadow-primary/20"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <Link href="/admin" className="hidden sm:flex items-center gap-3 px-6 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-premium group">
            <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Admin</span>
          </Link>

          <button 
            className="md:hidden p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass-morphism border-b p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>Shop Medicines</Link>
            <Link href="/prescriptions" onClick={() => setMobileMenuOpen(false)}>Upload Prescription</Link>
            <Link href="/consultation" onClick={() => setMobileMenuOpen(false)}>Consultations</Link>
            <hr className="border-border" />
            <Link href="/admin" className="flex items-center gap-2">Admin Panel</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
