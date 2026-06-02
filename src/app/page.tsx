'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';         
import Collections from '../components/Collections';
import Reviews from '../components/Reviews';       
import Contact from '../components/Contact';       
import Footer from '../components/Footer';         

const images = [
  "/saree1.jpg", 
  "/saree2.jpg",
  "/saree3.jpg",
  "/saree4.jpg"
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] text-zinc-900 overflow-x-hidden">
      
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Section (Scoped using native Tailwind to avoid layout breaks) */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden">
        <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(197,163,88,0.05)_0%,transparent_70%)] pointer-events-none z-0" />
        
        {/* Responsive Content Grid */}
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
          
          {/* Left Side: Text Details */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 max-w-2xl mx-auto lg:mx-0">
            <div className="text-[#C5A358] font-bold text-xs sm:text-sm tracking-[3px] uppercase">
              NEW COLLECTION 2026
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#1a1a1a] leading-[1.1]">
              Exquisite <br /> <span className="italic font-light text-[#C5A358]">Craftsmanship</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-zinc-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience the fusion of tradition and modern luxury with our exclusive 
              hand-picked sarees, designed for the woman of grace.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button className="bg-[#1a1a1a] text-white hover:bg-[#C5A358] hover:text-zinc-950 font-semibold px-8 py-4 rounded-full text-xs sm:text-sm transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-3 shadow-md">
                Shop Now <span>→</span>
              </button>
              <button className="bg-transparent text-[#1a1a1a] border border-[#1a1a1a] hover:bg-zinc-100 font-semibold px-8 py-4 rounded-full text-xs sm:text-sm transition-all duration-300">
                View Gallery
              </button>
            </div>
          </div>

          {/* Right Side: Arch Slider Container */}
          <div className="lg:col-span-5 flex justify-center items-center relative w-full pt-6 lg:pt-0">
            
            {/* Arch-shaped Frame */}
            <div className="relative w-[280px] h-[400px] sm:w-[350px] sm:h-[480px] md:w-[380px] md:h-[530px] lg:w-[400px] lg:h-[560px] rounded-t-[200px] rounded-b-[20px] overflow-hidden bg-zinc-100 border-[8px] sm:border-[10px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              {images.map((img, index) => (
                <div 
                  key={index} 
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-[1500px] ease-in-out ${index === currentImage ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
            </div>

            {/* Floating Card 1: Happy Clients */}
            <div className="absolute bottom-6 left-2 sm:left-[-20px] bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-[0_12px_25px_rgba(0,0,0,0.06)] border border-zinc-100 text-center z-20 min-w-[110px]">
              <div className="text-xl sm:text-2xl font-bold text-[#1a1a1a]">30+</div>
              <div className="text-[9px] sm:text-[10px] text-[#C5A358] font-bold uppercase tracking-wider">Happy Clients</div>
            </div>

            {/* Floating Card 2: Premium Quality */}
            <div className="absolute top-12 right-2 sm:right-[-10px] bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-[0_12px_25px_rgba(0,0,0,0.06)] border border-zinc-100 flex items-center gap-2 z-20">
              <span className="text-base sm:text-lg text-[#C5A358]">✦</span>
              <span className="text-[10px] sm:text-xs text-[#C5A358] font-bold uppercase tracking-wider">Premium Quality</span>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Collections Section */}
      <div className="w-full relative z-10">
        <Collections />
      </div>

      {/* 4. Reviews Section */}
      <div className="w-full relative z-10">
        <Reviews />
      </div>

      {/* 5. Contact Section */}
      <div className="w-full relative z-10">
        <Contact />
      </div>
      


    </div>
  );
}