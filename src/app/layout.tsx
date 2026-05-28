'use client'; // Client Component එකක් විදිහට සකස් කිරීම

import { useState, useEffect } from "react";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter", 
  display: 'swap' 
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-cormorant",
  display: 'swap' 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Loader එක පෙන්වන්න සහ වහන්න State එකක්
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // බ්‍රවුසර් එකට ආපු ගමන් සයිට් එක ලෝඩ් වුනාම Loader එක අයින් කරන්න
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === 'complete') {
      setLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Safe-guard එකක්: තත්පර 1.5කට වඩා Loader එක එකදිගට තියෙන්න දෙන්නෙ නැහැ
    const timer = setTimeout(() => setLoading(false), 1500);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timer);
    };
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} bg-[#FDFBF7] antialiased`}>
        
        {/* --- PERFECT HYDRATION-SAFE PRELOADER --- */}
        {loading && (
          <div 
            id="preloader" 
            className="fixed inset-0 bg-[#FDFBF7] flex flex-col justify-center items-center z-[10000] transition-opacity duration-500 ease-in-out"
          >
            {/* Loader Circle */}
            <div className="gold-loader w-[60px] aspect-square rounded-full"></div>
            
            {/* Animated Text */}
            <div className="mt-5 font-[family-name:var(--font-cormorant)] text-[#C5A358] tracking-[5px] text-base font-medium uppercase animate-pulse">
              DHĀRA
            </div>
          </div>
        )}

        <Navbar /> 
        
        {/* Main Content Area */}
        <main className="min-h-[80vh] bg-[#FDFBF7]">
          {children}
        </main>

        <Footer /> 
      </body>
    </html>
  );
}