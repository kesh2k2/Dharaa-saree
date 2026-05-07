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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`nav-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          
          {/* 1. Left Section: Menu Toggle (Mobile) & Logo */}
          <div className="left-section">
            <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} strokeWidth={1.5} />
            </button>
            <div className="logo">
              <Link href="/">Dhara<span>Collections</span></Link>
            </div>
          </div>

          {/* 2. Middle Section: Desktop Nav Links */}
          <ul className="nav-links">
            <li>
              <Link href="/">
                <Home size={18} strokeWidth={1.5} /> <span>HOME</span>
              </Link>
            </li>
            <li className="has-dropdown">
              <Link href="/collections" className="dropdown-trigger">
                <Layers size={18} strokeWidth={1.5} /> <span>COLLECTIONS</span>
                <ChevronDown size={14} className="chevron" />
              </Link>
              <div className="dropdown-menu">
                <Link href="/silk">Pure Silk Sarees</Link>
                <Link href="/cotton">Handloom Cotton</Link>
                <Link href="/bridal">Bridal Collections</Link>
                <Link href="/designer">Designer Wear</Link>
              </div>
            </li>
            <li>
              <Link href="/about">
                <BookOpen size={18} strokeWidth={1.5} /> <span>OUR STORY</span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <Mail size={18} strokeWidth={1.5} /> <span>CONTACT</span>
              </Link>
            </li>
          </ul>

          {/* 3. Right Section: Search & Icons */}
          <div className="nav-actions">
            <div className={`search-bar ${showSearch ? 'active' : ''}`}>
              <input type="text" placeholder="Search..." />
              <button onClick={() => setShowSearch(!showSearch)}>
                <Search size={22} strokeWidth={1.5} />
              </button>
            </div>

            <button className="icon-btn desktop-only">
              <Heart size={22} strokeWidth={1.5} />
            </button>
            
            <button className="icon-btn desktop-only">
              <User size={22} strokeWidth={1.5} />
            </button>
            
            <div className="cart-wrapper">
              <button className="cart-luxury-btn">
                <ShoppingBag size={20} strokeWidth={1.5} />
                <span className="cart-badge">0</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR --- */}
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
           <div className="logo">KESH<span>SAREE</span></div>
           <button className="close-btn" onClick={() => setIsMobileMenuOpen(false)}><X size={28} /></button>
        </div>
        <ul className="mobile-links">
          <li><Link href="/" onClick={() => setIsMobileMenuOpen(false)}>HOME</Link></li>
          <li><Link href="/collections" onClick={() => setIsMobileMenuOpen(false)}>COLLECTIONS</Link></li>
          <li><Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>OUR STORY</Link></li>
          <li><Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>CONTACT</Link></li>
        </ul>
      </div>

      {/* Overlay: Sidebar එක ඇරිලා තියෙන වෙලාවට විතරක් පෙන්වයි */}
      {isMobileMenuOpen && <div className="overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}

      <style jsx>{`
        /* 1. Global Reset for Navbar */
        .nav-wrapper {
          position: fixed; top: 0; left: 0; width: 100%; z-index: 9999;
          padding: 25px 5%; transition: all 0.4s ease;
          background: rgba(253, 251, 247, 0.9);
          backdrop-filter: blur(15px);
          border-bottom: 1px solid rgba(197, 163, 88, 0.1);
        }

        .scrolled { padding: 15px 5%; background: #FDFBF7; box-shadow: 0 5px 20px rgba(0,0,0,0.05); }

        .nav-container {
          max-width: 1400px; margin: 0 auto;
          display: flex; justify-content: space-between; align-items: center;
        }

        /* 2. Logo Section */
        .left-section { display: flex; align-items: center; gap: 20px; }
        .logo :global(a) {
          font-family: serif; font-size: 1.6rem; font-weight: 700;
          text-decoration: none !important; color: #1a1a1a !important;
          letter-spacing: 2px;
        }
        .logo span { color: #C5A358; font-weight: 300; }

        /* 3. Navigation Links (Desktop) */
        .nav-links { display: flex; list-style: none; gap: 30px; margin: 0; padding: 0; }
        .nav-links li :global(a) {
          text-decoration: none !important; color: #1a1a1a !important;
          font-size: 0.85rem; font-weight: 600; letter-spacing: 1px;
          display: flex; align-items: center; gap: 10px; transition: 0.3s;
        }
        .nav-links li :global(a):hover { color: #C5A358 !important; }

        /* Dropdown Styles */
        .has-dropdown { position: relative; }
        .dropdown-menu {
          position: absolute; top: 100%; left: 0; background: #fff;
          min-width: 200px; padding: 15px 0; border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          display: none; /* මුලින්ම සඟවා තබයි */
        }
        .has-dropdown:hover .dropdown-menu { display: block; }
        .dropdown-menu :global(a) {
          padding: 10px 20px !important; color: #444 !important; font-size: 0.8rem !important;
        }

        /* 4. Right Actions */
        .nav-actions { display: flex; align-items: center; gap: 18px; }
        .search-bar { display: flex; align-items: center; background: #f0f0f0; padding: 6px 12px; border-radius: 50px; }
        .search-bar input { border: none; background: none; outline: none; width: 0; transition: 0.3s; }
        .search-bar.active input { width: 150px; }
        .search-bar button { background: none; border: none; cursor: pointer; }

        .icon-btn { background: none; border: none; cursor: pointer; color: #1a1a1a; transition: 0.3s; }
        .icon-btn:hover { color: #C5A358; }

        .cart-luxury-btn {
          background: #1a1a1a; color: #fff; border: none; width: 45px; height: 45px;
          border-radius: 50%; position: relative; cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .cart-badge {
          position: absolute; top: -2px; right: -2px; background: #C5A358;
          width: 20px; height: 20px; border-radius: 50%; font-size: 0.7rem;
          display: flex; align-items: center; justify-content: center; border: 2px solid #FDFBF7;
        }

        /* 5. Mobile Sidebar & BUG FIX */
        .mobile-toggle { display: none; background: none; border: none; cursor: pointer; }
        
        .mobile-sidebar {
          position: fixed; top: 0; left: -100%; width: 300px; height: 100vh;
          background: #fff; z-index: 10000; transition: 0.4s ease-in-out;
          padding: 40px 30px;
          display: block; /* මෙය සැමවිටම පවතී, නමුත් left -100% නිසා නොපෙනේ */
        }
        .mobile-sidebar.open { left: 0; box-shadow: 10px 0 50px rgba(0,0,0,0.1); }
        
        .sidebar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 50px; }
        .close-btn { background: none; border: none; cursor: pointer; }
        
        .mobile-links { list-style: none; padding: 0; }
        .mobile-links li { margin-bottom: 25px; }
        .mobile-links li :global(a) {
          text-decoration: none !important; color: #1a1a1a !important;
          font-size: 1.2rem; font-weight: 700; font-family: serif;
        }

        .overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.4); z-index: 9999;
        }

        @media (max-width: 1024px) {
          .nav-links, .desktop-only { display: none; }
          .mobile-toggle { display: block; }
        }
      `}</style>
    </>
  );
}