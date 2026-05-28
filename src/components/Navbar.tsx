'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, ShoppingBag, Menu, X, User, Heart, 
  ChevronDown, Home, Layers, BookOpen, Mail 
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Real-time Search: User ටයිප් කරද්දීම URL Hash එකට search query එක එකතු කරයි
  const handleSearchChange = (val: string) => {
    setSearchVal(val);
    
    // දැනට තියෙන Category filter එක නැති නොවී රැකගැනීමට
    const currentHash = window.location.hash;
    let currentCat = 'All';
    if (currentHash.includes('?filter=')) {
      currentCat = decodeURIComponent(currentHash.split('?filter=')[1].split('&')[0]);
    }

    // URL එක update කිරීම (Real-time update)
    if (val.trim() !== '') {
      window.location.hash = `collections?filter=${encodeURIComponent(currentCat)}&search=${encodeURIComponent(val)}`;
    } else {
      window.location.hash = `collections?filter=${encodeURIComponent(currentCat)}`;
    }

    // ස්වයංක්‍රීයව Collections section එකට scroll වීම (පළමු අකුර ටයිප් කරද්දීම)
    const element = document.getElementById('collections');
    if (element && val.length === 1) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDropdownClick = (category: string) => {
    setIsMobileMenuOpen(false);
    setSearchVal(''); // Category මාරු කරද්දී කලින් සර්ච් කරපු දේ අයින් කරයි
    window.location.hash = `collections?filter=${encodeURIComponent(category)}`;
    const element = document.getElementById('collections');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* --- MAIN NAVBAR --- */}
      <nav className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-400 border-b border-[#c5a358]/10 backdrop-blur-[15px] ${
        isScrolled 
          ? 'py-3 px-4 md:px-[5%] bg-[#FDFBF7] shadow-[0_5px_20px_rgba(0,0,0,0.05)]' 
          : 'py-5 px-4 md:px-[5%] bg-[#FDFBF7]/90'
      }`}>
        <div className="max-w-[1400px] mx-auto flex justify-between items-center relative">
          
          {/* 1. Left Section: Menu Toggle (Mobile) & Logo */}
          <div className="flex items-center gap-2 sm:gap-5 flex-shrink-0">
            <button 
              className="lg:hidden bg-transparent border-none cursor-pointer p-0 text-zinc-900" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
            <div className="font-serif text-lg sm:text-2xl font-bold tracking-[0.5px] sm:tracking-[2px]">
              <Link href="/" className="!no-underline !text-zinc-900">
                Dhara<span className="text-[#C5A358] font-light">Collection</span>
              </Link>
            </div>
          </div>

          {/* 2. Middle Section: Desktop Nav Links */}
          <ul className="hidden lg:flex list-none gap-[30px] m-0 p-0">
            <li>
              <Link href="/" className="!no-underline !text-zinc-900 font-semibold text-[0.85rem] tracking-[1px] flex items-center gap-2.5 transition-colors duration-300 hover:!text-[#C5A358]">
                <Home size={18} strokeWidth={1.5} /> <span>HOME</span>
              </Link>
            </li>
            <li className="relative group">
              <button 
                onClick={() => handleDropdownClick('All')}
                className="bg-transparent border-none cursor-pointer !text-zinc-900 font-semibold text-[0.85rem] tracking-[1px] flex items-center gap-2.5 transition-colors duration-300 hover:!text-[#C5A358] p-0"
              >
                <Layers size={18} strokeWidth={1.5} /> <span>COLLECTIONS</span>
                <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>
              
              <div className="absolute top-full left-0 bg-white min-w-[200px] py-3.5 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.1)] hidden group-hover:block border border-zinc-100">
                <button onClick={() => handleDropdownClick('Pure Silk')} className="w-full text-left block px-5 py-2.5 bg-transparent border-none cursor-pointer text-zinc-700 text-[0.8rem] hover:bg-zinc-50 hover:text-[#C5A358] font-medium transition-colors">Pure Silk Sarees</button>
                <button onClick={() => handleDropdownClick('Handloom Cotton')} className="w-full text-left block px-5 py-2.5 bg-transparent border-none cursor-pointer text-zinc-700 text-[0.8rem] hover:bg-zinc-50 hover:text-[#C5A358] font-medium transition-colors">Handloom Cotton</button>
                <button onClick={() => handleDropdownClick('Bridal Wear')} className="w-full text-left block px-5 py-2.5 bg-transparent border-none cursor-pointer text-zinc-700 text-[0.8rem] hover:bg-zinc-50 hover:text-[#C5A358] font-medium transition-colors">Bridal Collections</button>
                <button onClick={() => handleDropdownClick('Designer Party')} className="w-full text-left block px-5 py-2.5 bg-transparent border-none cursor-pointer text-zinc-700 text-[0.8rem] hover:bg-zinc-50 hover:text-[#C5A358] font-medium transition-colors">Designer Wear</button>
                
                <div className="border-t border-zinc-100 my-1.5"></div>
                <button onClick={() => handleDropdownClick('Jewelleries')} className="w-full text-left block px-5 py-2.5 bg-transparent border-none cursor-pointer text-[#C5A358] text-[0.8rem] hover:bg-zinc-50 font-bold tracking-wide transition-colors">Jewelleries</button>
              </div>
            </li>
            <li>
              <Link href="#reviews" className="!no-underline !text-zinc-900 font-semibold text-[0.85rem] tracking-[1px] flex items-center gap-2.5 transition-colors duration-300 hover:!text-[#C5A358]">
                <BookOpen size={18} strokeWidth={1.5} /> <span>REVIEWS</span>
              </Link>
            </li>
            <li>
              <Link href="#contact" className="!no-underline !text-zinc-900 font-semibold text-[0.85rem] tracking-[1px] flex items-center gap-2.5 transition-colors duration-300 hover:!text-[#C5A358]">
                <Mail size={18} strokeWidth={1.5} /> <span>CONTACT US</span>
              </Link>
            </li>
          </ul>

          {/* 3. Right Section: FIXED Icons Responsiveness for Mobile View */}
          <div className="flex items-center gap-2 sm:gap-[18px] flex-shrink-0">
            {/* Desktop Only Inline Search */}
            <div className="hidden lg:flex items-center bg-[#f0f0f0] px-3 py-1.5 rounded-full border border-zinc-200/50">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchVal}
                onChange={(e) => handleSearchChange(e.target.value)}
                className={`border-none bg-transparent outline-none p-0 text-sm text-zinc-800 transition-all duration-300 ${
                  showSearch ? 'w-[150px] ml-1' : 'w-0'
                }`}
              />
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="bg-transparent border-none cursor-pointer text-zinc-900 hover:text-[#C5A358] transition-colors p-0 flex items-center"
              >
                <Search size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile Only Search Icon */}
            <button 
              onClick={() => setShowSearch(true)}
              className="lg:hidden bg-transparent border-none cursor-pointer text-zinc-900 hover:text-[#C5A358] p-0 flex items-center"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* FIXED: Now visible on Mobile and Responsive */}
            <button className="bg-transparent border-none cursor-pointer text-zinc-900 hover:text-[#C5A358] transition-colors p-0">
              <Heart size={20} className="sm:w-[22px]" strokeWidth={1.5} />
            </button>
            
            <button className="bg-transparent border-none cursor-pointer text-zinc-900 hover:text-[#C5A358] transition-colors p-0">
              <User size={20} className="sm:w-[22px]" strokeWidth={1.5} />
            </button>
            
            {/* Luxury Cart Button */}
            <div className="relative flex-shrink-0">
              <button className="bg-zinc-950 text-white border-none w-9 h-9 sm:w-[45px] sm:h-[45px] rounded-full cursor-pointer flex items-center justify-center transition-transform hover:scale-105 active:scale-95">
                <ShoppingBag size={16} className="sm:w-[20px]" strokeWidth={1.5} />
                <span className="absolute -top-0.5 -right-0.5 bg-[#C5A358] text-white w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full text-[0.6rem] sm:text-[0.7rem] font-bold flex items-center justify-center border-2 border-[#FDFBF7]">
                  0
                </span>
              </button>
            </div>
          </div>

          {/* --- FIXED: MOBILE SEARCH OVERLAY (Live typing enabled) --- */}
          {showSearch && (
            <div className="lg:hidden absolute inset-0 bg-[#FDFBF7] z-[10000] flex items-center px-2 animate-fadeIn">
              <div className="flex items-center bg-[#f0f0f0] w-full px-3 py-2 rounded-full border border-zinc-200">
                <Search size={20} className="text-zinc-400 mr-2 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchVal}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  autoFocus
                  className="border-none bg-transparent outline-none p-0 text-sm text-zinc-800 w-full"
                />
                <button 
                  onClick={() => { setShowSearch(false); handleSearchChange(''); }}
                  className="bg-transparent border-none cursor-pointer text-zinc-500 hover:text-zinc-900 ml-2 p-0 flex items-center"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}

        </div>
      </nav>

      {/* --- MOBILE SIDEBAR --- */}
      <div className={`fixed top-0 w-[280px] sm:w-[300px] h-screen bg-white z-[10000] transition-all duration-400 p-8 sm:p-10 flex flex-col justify-between ${
        isMobileMenuOpen ? 'left-0 shadow-[10px_0_50px_rgba(0,0,0,0.15)]' : '-left-[300px]'
      }`}>
        <div>
          <div className="flex justify-between items-center mb-[40px] sm:mb-[50px]">
            <div className="font-serif text-lg sm:text-xl font-bold tracking-[2px] text-zinc-900">
              KESH<span className="text-[#C5A358] font-light">SAREE</span>
            </div>
            <button 
              className="bg-transparent border-none cursor-pointer text-zinc-900 p-0" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={26} />
            </button>
          </div>
          
          <ul className="list-none p-0 m-0 flex flex-col gap-5 sm:gap-6">
            <li>
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="!no-underline !text-zinc-900 text-base sm:text-lg font-bold font-serif hover:text-[#C5A358] transition-colors">
                HOME
              </Link>
            </li>
            
            <li>
              <span className="text-xs font-bold text-zinc-400 block mb-2 tracking-wider">CATEGORIES</span>
              <div className="flex flex-col gap-3 pl-2 border-l border-zinc-100">
                <button onClick={() => handleDropdownClick('Pure Silk')} className="text-left bg-transparent border-none text-sm font-medium text-zinc-700 hover:text-[#C5A358]">Pure Silk Sarees</button>
                <button onClick={() => handleDropdownClick('Handloom Cotton')} className="text-left bg-transparent border-none text-sm font-medium text-zinc-700 hover:text-[#C5A358]">Handloom Cotton</button>
                <button onClick={() => handleDropdownClick('Bridal Wear')} className="text-left bg-transparent border-none text-sm font-medium text-zinc-700 hover:text-[#C5A358]">Bridal Wear</button>
                <button onClick={() => handleDropdownClick('Designer Party')} className="text-left bg-transparent border-none text-sm font-medium text-zinc-700 hover:text-[#C5A358]">Designer Party</button>
                <button onClick={() => handleDropdownClick('Jewelleries')} className="text-left bg-transparent border-none text-sm font-bold text-[#C5A358]">Jewelleries</button>
              </div>
            </li>

            <li>
              <Link href="#about" onClick={() => setIsMobileMenuOpen(false)} className="!no-underline !text-zinc-900 text-base sm:text-lg font-bold font-serif hover:text-[#C5A358] transition-colors">
                OUR STORY
              </Link>
            </li>
            <li>
              <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="!no-underline !text-zinc-900 text-base sm:text-lg font-bold font-serif hover:text-[#C5A358] transition-colors">
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* --- SIDEBAR OVERLAY --- */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 w-full h-full bg-black/40 z-[9998]" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}