'use client';

import { Suspense } from 'react';
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Plus } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { usePathname } from 'next/navigation';

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

function MainLayoutContent({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return (
      <body className="min-h-screen bg-[#0a0c10] font-sans overflow-x-hidden" suppressHydrationWarning>
        <main className="min-h-screen">{children}</main>
      </body>
    );
  }

  return (
    <body className="min-h-screen flex flex-col pt-20 font-sans" suppressHydrationWarning>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <footer className="py-24 border-t border-slate-100 bg-white dark:bg-slate-900/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-8 group">
              <div className="w-8 h-8 premium-gradient rounded-lg flex items-center justify-center text-white shadow-lg group-hover:rotate-45 transition-transform duration-500">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-gradient uppercase tracking-tighter">MediPrime</span>
            </Link>
            <p className="text-slate-500 max-w-sm font-medium leading-relaxed mb-8">
              Your trusted digital pharmacy. We provide genuine medicines, 
              fast delivery, and professional consultations at your fingertips.
            </p>
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all cursor-pointer" />
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-slate-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/shop" className="text-slate-500 hover:text-primary transition-all font-bold text-sm">Shop Medicines</Link></li>
              <li><Link href="/prescriptions" className="text-slate-500 hover:text-primary transition-all font-bold text-sm">Upload Prescription</Link></li>
              <li><Link href="/consultation" className="text-slate-500 hover:text-primary transition-all font-bold text-sm">Consultations</Link></li>
              <li><Link href="/about" className="text-slate-500 hover:text-primary transition-all font-bold text-sm">Our Story</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-slate-900 dark:text-white">Support</h4>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-slate-500 hover:text-primary transition-all font-bold text-sm">Contact Us</Link></li>
              <li><Link href="/faq" className="text-slate-500 hover:text-primary transition-all font-bold text-sm">FAQs</Link></li>
              <li><Link href="/privacy" className="text-slate-500 hover:text-primary transition-all font-bold text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-500 hover:text-primary transition-all font-bold text-sm">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-slate-900 dark:text-white">Contact</h4>
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-500">
                <span className="block text-slate-900 dark:text-white text-xs uppercase tracking-widest mb-1 opacity-50">Email</span>
                support@mediprime.com
              </p>
              <p className="text-sm font-bold text-slate-500">
                <span className="block text-slate-900 dark:text-white text-xs uppercase tracking-widest mb-1 opacity-50">Phone</span>
                +92 300 000 0000
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-24 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} MediPrime Healthcare. Crafted with excellence.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
          </div>
        </div>
      </footer>
    </body>
  );
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <CartProvider>
        <Suspense fallback={null}>
          <MainLayoutContent>{children}</MainLayoutContent>
        </Suspense>
      </CartProvider>
    </html>
  );
}

// Inline Link for Footer
function Link({ href, children, className }) {
  return (
    <a href={href} className={className}>{children}</a>
  );
}
