'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/superbase'; // ඔයාගේ supabase client path එකට ගලපන්න
import { 
  ShoppingBag, Menu, X, User, Heart,
  ChevronDown, Home, Layers, BookOpen, Mail, LogOut
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // --- Supabase Auth Session Handling ---
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  const handleDropdownClick = (category: string) => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
    
    // URL Hash එක update කරලා collections section එකට smooth scroll කරනවා
    window.location.hash = `collections?filter=${encodeURIComponent(category)}`;
    const element = document.getElementById('collections');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* --- MAIN NAVBAR (PURE LIGHT LUXURY) --- */}
      <nav className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-400 border-b backdrop-blur-[15px] ${
        isScrolled 
          ? 'py-3 px-4 md:px-[5%] bg-[#FDFBF7]/95 border-[#c5a358]/10 shadow-[0_5px_20px_rgba(0,0,0,0.03)]' 
          : 'py-5 px-4 md:px-[5%] bg-[#FDFBF7]/90 border-[#c5a358]/5'
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
              <Link href="/" className="!no-underline text-zinc-900">
                Dhara<span className="text-[#C5A358] font-light">Collection</span>
              </Link>
            </div>
          </div>

          {/* 2. Middle Section: Desktop Nav Links */}
          <ul className="hidden lg:flex list-none gap-[30px] m-0 p-0">
            <li>
              <Link href="/" className="!no-underline text-zinc-900 font-semibold text-[0.85rem] tracking-[1px] flex items-center gap-2.5 transition-colors duration-300 hover:text-[#C5A358]">
                <Home size={18} strokeWidth={1.5} /> <span>HOME</span>
              </Link>
            </li>
            <li className="relative group">
              <button 
                onClick={() => handleDropdownClick('All')}
                className="bg-transparent border-none cursor-pointer text-zinc-900 font-semibold text-[0.85rem] tracking-[1px] flex items-center gap-2.5 transition-colors duration-300 hover:text-[#C5A358] p-0"
              >
                <Layers size={18} strokeWidth={1.5} /> <span>COLLECTIONS</span>
                
              </button>
              
              {/* Dropdown Sublinks Menu
              <div className="absolute top-full left-0 bg-white min-w-[200px] py-3.5 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.05)] hidden group-hover:block border border-zinc-100 animate-fadeIn">
                <button onClick={() => handleDropdownClick('Pure Silk')} className="w-full text-left block px-5 py-2.5 bg-transparent border-none cursor-pointer text-zinc-700 text-[0.8rem] hover:bg-zinc-50 hover:text-[#C5A358] font-medium transition-colors">Pure Silk Sarees</button>
                <button onClick={() => handleDropdownClick('Handloom Cotton')} className="w-full text-left block px-5 py-2.5 bg-transparent border-none cursor-pointer text-zinc-700 text-[0.8rem] hover:bg-zinc-50 hover:text-[#C5A358] font-medium transition-colors">Handloom Cotton</button>
                <button onClick={() => handleDropdownClick('Bridal Wear')} className="w-full text-left block px-5 py-2.5 bg-transparent border-none cursor-pointer text-zinc-700 text-[0.8rem] hover:bg-zinc-50 hover:text-[#C5A358] font-medium transition-colors">Bridal Collections</button>
                <button onClick={() => handleDropdownClick('Designer Party')} className="w-full text-left block px-5 py-2.5 bg-transparent border-none cursor-pointer text-zinc-700 text-[0.8rem] hover:bg-zinc-50 hover:text-[#C5A358] font-medium transition-colors">Designer Wear</button>
                
                <div className="border-t border-zinc-100 my-1.5"></div>
                <button onClick={() => handleDropdownClick('Jewelleries')} className="w-full text-left block px-5 py-2.5 bg-transparent border-none cursor-pointer text-[#C5A358] text-[0.8rem] hover:bg-zinc-50 font-bold tracking-wide transition-colors">Jewelleries</button>
              </div> */}
            </li>
            <li>
              <Link href="#reviews" className="!no-underline text-zinc-900 font-semibold text-[0.85rem] tracking-[1px] flex items-center gap-2.5 transition-colors duration-300 hover:text-[#C5A358]">
                <BookOpen size={18} strokeWidth={1.5} /> <span>REVIEWS</span>
              </Link>
            </li>
            <li>
              <Link href="#contact" className="!no-underline text-zinc-900 font-semibold text-[0.85rem] tracking-[1px] flex items-center gap-2.5 transition-colors duration-300 hover:text-[#C5A358]">
                <Mail size={18} strokeWidth={1.5} /> <span>CONTACT US</span>
              </Link>
            </li>
          </ul>

          {/* 3. Right Section: Wishlist, Auth Buttons & Cart */}
          <div className="flex items-center gap-3 sm:gap-[22px] flex-shrink-0">
            
            {/* Favorites (Wishlist) Icon */}
            <button className="bg-transparent border-none cursor-pointer text-zinc-900 hover:text-[#C5A358] transition-colors p-0 outline-none">
              <Heart size={20} className="sm:w-[22px]" strokeWidth={1.5} />
            </button>
            
            {/* Supabase Dynamic User Profile Action */}
            <div className="relative">
              {user ? (
                // යූසර් ලොග් වී ඇත්නම්: Avatar Trigger Menu
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#C5A358] text-white flex items-center justify-center text-xs font-semibold uppercase tracking-wider border border-white shadow-sm outline-none"
                >
                  {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0)}
                </button>
              ) : (
                // යූසර් ලොග් වී නැත්නම්: Default Login Link Icon
                <Link href="/login" className="bg-transparent border-none cursor-pointer text-zinc-900 hover:text-[#C5A358] transition-colors p-0 block outline-none">
                  <User size={20} className="sm:w-[22px]" strokeWidth={1.5} />
                </Link>
              )}

              {/* Desktop Profile Menu Dropdown Overlay */}
              {user && isProfileOpen && (
                <div className="absolute right-0 top-full mt-3 bg-white min-w-[220px] py-3 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-zinc-100 z-[10000]">
                  <div className="px-4 py-2 border-b border-zinc-100 mb-1.5">
                    <p className="text-[10px] text-zinc-400 font-light uppercase tracking-wider">Signed in as</p>
                    <p className="text-xs font-medium text-zinc-800 truncate">{user.user_metadata?.full_name || user.email}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-xs text-rose-500 hover:bg-rose-50/50 flex items-center gap-2.5 transition-colors border-none bg-transparent cursor-pointer font-medium"
                  >
                    <LogOut size={14} /> Sign Out Account
                  </button>
                </div>
              )}
            </div>
            
            {/* Luxury Cart Button */}
            <div className="relative flex-shrink-0">
              <button className="bg-zinc-950 text-white border-none w-9 h-9 sm:w-[45px] sm:h-[45px] rounded-full cursor-pointer flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-sm outline-none">
                <ShoppingBag size={16} className="sm:w-[20px]" strokeWidth={1.5} />
                <span className="absolute -top-0.5 -right-0.5 bg-[#C5A358] text-white w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full text-[0.6rem] sm:text-[0.7rem] font-bold flex items-center justify-center border-2 border-[#FDFBF7]">
                  0
                </span>
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* --- MOBILE SIDEBAR --- */}
      <div className={`fixed top-0 w-[280px] sm:w-[300px] h-screen bg-white z-[10000] transition-all duration-400 p-8 sm:p-10 flex flex-col justify-between ${
        isMobileMenuOpen ? 'left-0 shadow-[10px_0_50px_rgba(0,0,0,0.08)]' : '-left-[300px]'
      }`}>
        <div>
          <div className="flex justify-between items-center mb-[40px] sm:mb-[50px]">
            <div className="font-serif text-lg sm:text-xl font-bold tracking-[2px] text-zinc-900">
              DHARA<span className="text-[#C5A358] font-light">COLLECTION</span>
            </div>
            <button 
              className="bg-transparent border-none cursor-pointer text-zinc-900 p-0 outline-none" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={26} />
            </button>
          </div>
          
          <ul className="list-none p-0 m-0 flex flex-col gap-5 sm:gap-6">
            <li>
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="!no-underline text-zinc-900 text-base sm:text-lg font-bold font-serif hover:text-[#C5A358] transition-colors">
                HOME
              </Link>
            </li>
            
            <li>
              <Link href="#collections" onClick={() => setIsMobileMenuOpen(false)} className="!no-underline text-zinc-900 text-base sm:text-lg font-bold font-serif hover:text-[#C5A358] transition-colors">
                COLLECTIONS
              </Link>
              
            </li>

            <li>
              <Link href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="!no-underline text-zinc-900 text-base sm:text-lg font-bold font-serif hover:text-[#C5A358] transition-colors">
                REVIEWS
              </Link>
            </li>
            <li>
              <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="!no-underline text-zinc-900 text-base sm:text-lg font-bold font-serif hover:text-[#C5A358] transition-colors">
                CONTACT
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Sidebar Bottom Profile Action Area */}
        <div className="pt-6 border-t border-zinc-100">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="truncate pr-2">
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-medium">Member Profile</p>
                <p className="text-xs font-semibold text-zinc-800 truncate">{user.user_metadata?.full_name || user.email}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors border-none cursor-pointer"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-2.5 text-center block rounded-xl border border-[#C5A358] text-[#C5A358] text-xs uppercase font-semibold tracking-wider hover:bg-[#C5A358] hover:text-white transition-all duration-300 !no-underline"
            >
              Sign In Account
            </Link>
          )}
        </div>
      </div>

      {/* --- SIDEBAR OVERLAY --- */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 w-full h-full bg-black/30 z-[9998]" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}