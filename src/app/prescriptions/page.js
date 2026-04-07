'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, FileText, CheckCircle2, ShieldCheck, 
  Clock, AlertCircle, X, Image as ImageIcon,
  ArrowRight, PhoneCall, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PrescriptionUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, success

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setStatus('idle');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('uploading');
    
    // Save to LocalStorage for Demo "Closing the Loop"
    const prescriptionData = {
      id: `PX-${Math.floor(Math.random() * 10000)}`,
      image: preview,
      name: file.name,
      status: 'Pending',
      timestamp: new Date().toLocaleString()
    };
    
    const existing = JSON.parse(localStorage.getItem('mediPrime_prescriptions') || '[]');
    localStorage.setItem('mediPrime_prescriptions', JSON.stringify([prescriptionData, ...existing]));

    // Simulate upload delay
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-6 pt-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full text-center space-y-8 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 p-12 rounded-[48px] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-12 h-12" />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">Prescription Received!</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
              Our registered pharmacist is currently reviewing your prescription. 
              We'll notify you via SMS once verified to proceed with the order.
            </p>
          </div>
          <div className="flex items-center justify-center gap-6 pt-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-2">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Verification<br/>in 5-10 mins</span>
            </div>
            <div className="w-px h-12 bg-slate-200 dark:bg-white/10" />
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-2">
                <PhoneCall className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Direct Help<br/>Available</span>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = '/shop'}
            className="w-full h-16 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] transition-all"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left: Info & Guidelines */}
        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">Pharmacist Verified</span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">100% Secure</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-tight">
              Smart <span className="text-primary italic">Prescription</span><br/>Upload
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-lg leading-relaxed max-w-lg">
              Upload your doctor's note and let our expert pharmacists handle the rest. We'll find the exact medicines and dosage for you.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Guidelines</h3>
            {[
              { icon: CheckCircle2, text: "Ensure the patient's name is visible.", color: "text-emerald-500" },
              { icon: CheckCircle2, text: "The doctor's signature must be present.", color: "text-emerald-500" },
              { icon: AlertCircle, text: "Avoid blurry or low-light images.", color: "text-amber-500" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
                <item.icon className={cn("w-5 h-5 shrink-0", item.color)} />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="p-8 bg-blue-500/5 border border-blue-500/20 rounded-[32px] flex items-start gap-6 relative overflow-hidden group">
            <ShieldCheck className="w-10 h-10 text-blue-500 shrink-0" />
            <div>
              <h4 className="text-blue-500 font-black text-xs uppercase tracking-widest mb-2">HIPAA Compliant Privacy</h4>
              <p className="text-blue-500/70 text-xs font-bold leading-relaxed">
                Your medical data is encrypted using end-to-end industry standards. Only registered pharmacists can access your documents.
              </p>
            </div>
            <Zap className="absolute -bottom-6 -right-6 w-24 h-24 text-blue-500/10 group-hover:scale-125 transition-transform duration-700" />
          </div>
        </div>

        {/* Right: Upload Zone */}
        <div className="sticky top-32">
          {!preview ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={cn(
                "w-full aspect-[4/5] md:aspect-square bg-white dark:bg-white/5 border-2 border-dashed rounded-[56px] flex flex-col items-center justify-center p-12 transition-all group cursor-pointer overflow-hidden relative",
                dragActive ? "border-primary bg-primary/5 scale-[0.98]" : "border-slate-200 dark:border-white/10 hover:border-primary/50"
              )}
            >
              <input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
              />
              <label 
                htmlFor="file-upload"
                className="flex flex-col items-center text-center cursor-pointer"
              >
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Upload className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">Click to upload or drag & drop</h3>
                <p className="text-slate-400 font-bold text-sm tracking-tight mb-8">PNG, JPG or PDF up to 10MB</p>
                <div className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl">Select Document</div>
              </label>

              {/* Decorative background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[40px] border-slate-50 dark:border-white/[0.02] rounded-full pointer-events-none" />
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[56px] overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-slate-100 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-black text-sm tracking-tight truncate max-w-[200px]">{file.name}</h4>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Selected Image</p>
                  </div>
                </div>
                <button 
                  onClick={() => {setFile(null); setPreview(null);}}
                  className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-rose-500 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-[4/3] relative bg-slate-100 dark:bg-black p-8 flex items-center justify-center">
                <img 
                  src={preview} 
                  alt="Prescription Preview" 
                  className="max-h-full max-w-full rounded-2xl shadow-xl border border-white/20"
                />
              </div>
              <div className="p-8">
                <button 
                  onClick={handleSubmit}
                  disabled={status === 'uploading'}
                  className={cn(
                    "w-full h-16 rounded-3xl font-black uppercase tracking-[0.25em] text-xs shadow-xl transition-all flex items-center justify-center gap-3",
                    status === 'uploading' ? "bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed" : "premium-gradient text-white shadow-primary/20 hover:-translate-y-1"
                  )}
                >
                  {status === 'uploading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 fill-white" />
                      Send to Pharmacist
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* Verification Stats */}
          <div className="mt-8 flex items-center justify-between px-8">
            <div className="text-center">
              <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">50k+</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Verified Today</p>
            </div>
            <div className="w-px h-6 bg-slate-200 dark:bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">4.9/5</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Trust Score</p>
            </div>
            <div className="w-px h-6 bg-slate-200 dark:bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">24/7</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Expert Support</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
