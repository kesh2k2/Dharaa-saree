'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../utils/superbase'; 
import '../app/globals.css';

export interface Product {
  id: number;
  name: string;
  category: string;
  rentPricePerDay: number;
  purchasePrice: number;
  images: string[];
  isAvailableForRent: boolean;
  isAvailableForPurchase: boolean;
}

export default function Collections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [orderType, setOrderType] = useState<'rent' | 'purchase' | null>(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  // Background Scroll Lock when modal is active
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  // Fetching data from Supabase
  useEffect(() => {
    async function fetchDatabaseProducts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;

        if (data) {
          const mappedProducts: Product[] = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            category: item.category,
            rentPricePerDay: item.rent_price_per_day || 0,
            purchasePrice: item.purchase_price || 0,
            images: item.images || ['https://images.unsplash.com/photo-1610030469983-98e550d6193c'],
            isAvailableForRent: item.is_available_for_rent !== undefined ? item.is_available_for_rent : true,
            isAvailableForPurchase: item.is_available_for_purchase !== undefined ? item.is_available_for_purchase : true,
          }));
          setProducts(mappedProducts);
        }
      } catch (err) {
        console.error('Error fetching data from Supabase:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDatabaseProducts();
  }, []);

  // Hash change handler for routing/filters
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('?filter=')) {
        const urlParams = hash.split('?filter=')[1];
        const category = decodeURIComponent(urlParams.split('&')[0]);
        setActiveCategory(category);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Price Calculation Logic
  useEffect(() => {
    if (selectedProduct && orderType) {
      if (orderType === 'rent') {
        if (fromDate && toDate) {
          const start = new Date(fromDate);
          const end = new Date(toDate);
          const diffTime = end.getTime() - start.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
          
          if (diffDays > 0) {
            setTotalPrice(diffDays * selectedProduct.rentPricePerDay);
          } else {
            setTotalPrice(0);
          }
        } else {
          setTotalPrice(0);
        }
      } else if (orderType === 'purchase') {
        setTotalPrice(selectedProduct.purchasePrice);
      }
    }
  }, [fromDate, toDate, orderType, selectedProduct]);

  const closeModal = () => {
    setSelectedProduct(null);
    setFromDate('');
    setToDate('');
    setOrderType(null);
    setTotalPrice(0);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setOrderType(product.isAvailableForRent ? 'rent' : 'purchase');
  };

  const isJewellery = (category: string) => category.toLowerCase().includes('jewel');

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] bg-[#fcfbfa]">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-[#b3996d]/20 rounded-full"></div>
          <div className="absolute inset-0 border-2 border-t-[#b3996d] rounded-full animate-spin"></div>
        </div>
        <p className="text-[#b3996d] mt-6 text-xs tracking-[0.3em] uppercase font-light animate-pulse">Curating Masterpieces...</p>
      </div>
    );
  }

  return (
    <section id="collections" className="py-20 md:py-28 px-4 sm:px-6 lg:px-16 bg-[#fcfbfa] scroll-mt-20 relative overflow-hidden">
      
      {/* Background Aesthetic Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#b3996d]/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#b3996d]/3 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative">
        
        {/* Luxury Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="inline-block text-[#b3996d] font-semibold tracking-[0.3em] text-[10px] md:text-xs uppercase">
            The Haute Couture Experience
          </span>
          <h2 className="text-4xl md:text-6xl font-light tracking-wide text-zinc-900 font-serif lowercase first-letter:uppercase">
            Our luxury <span className="text-[#b3996d] font-normal italic font-serif">catalog</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-8 h-[1px] bg-zinc-300"></div>
            <div className="w-1.5 h-1.5 bg-[#b3996d] rotate-45"></div>
            <div className="w-8 h-[1px] bg-zinc-300"></div>
          </div>
        </div>

        {/* SEARCH BAR & FILTERS CONTAINER */}
        <div className="max-w-5xl mx-auto mb-16 space-y-8 backdrop-blur-sm bg-white/40 p-4 md:p-6 rounded-3xl border border-zinc-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.02)]">
          
          {/* Integrated Search Interface */}
          <div className="relative max-w-xl mx-auto border border-zinc-200 bg-white/90 rounded-xl px-4 py-2.5 flex items-center transition-all duration-300 focus-within:border-[#b3996d] focus-within:shadow-[0_0_15px_rgba(179,153,109,0.15)]">
            <div className="text-[#b3996d] mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search by name, fabric, or luxury style..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-400 outline-none font-light"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-[10px] text-zinc-400 hover:text-zinc-800 uppercase tracking-widest font-semibold transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          {/* Premium Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center overflow-x-auto pb-2 max-w-full no-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`px-6 py-2 rounded-lg text-[11px] font-medium tracking-[0.15em] transition-all duration-300 whitespace-nowrap uppercase ${
                  activeCategory === cat 
                    ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-900/10 scale-[1.02]' 
                    : 'bg-white/80 text-zinc-500 border border-zinc-200/60 hover:border-[#b3996d] hover:text-[#b3996d] hover:bg-white'
                }`}
                onClick={() => {
                  window.location.hash = `collections?filter=${encodeURIComponent(cat)}`;
                  setActiveCategory(cat);
                }}
              >
                {cat === 'Designer Party' ? 'Designer Wear' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* LUXURY PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-x-6 lg:gap-y-14">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              onClick={() => handleProductClick(product)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-transparent shadow-[0_4px_25px_rgba(0,0,0,0.02)] cursor-pointer transition-all duration-500 hover:shadow-[0_20px_50px_rgba(179,153,109,0.15)] hover:border-[#b3996d] flex flex-col justify-between"
            >
              <div>
                {/* Image Wrap */}
                <div className="relative overflow-hidden w-full aspect-[3/4] bg-[#f7f5f2]">
                  <img 
                    src={product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105" 
                  />
                  
                  {/* Premium Gold/Cream Micro Labels */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                    {product.isAvailableForRent && (
                      <span className="px-3 py-1 text-[9px] uppercase tracking-[0.15em] rounded-md font-bold text-[#b3996d] bg-[#fdfbf7] shadow-sm border border-[#b3996d]/30 backdrop-blur-sm">
                        Rent
                      </span>
                    )}
                    {product.isAvailableForPurchase && (
                      <span className="px-3 py-1 text-[9px] uppercase tracking-[0.15em] rounded-md font-bold text-[#b3996d] bg-[#fdfbf7] shadow-sm border border-[#b3996d]/30 backdrop-blur-sm">
                        Buy
                      </span>
                    )}
                  </div>

                  {/* Desktop Only: Gold Hover Slide-up Button */}
                  <div className="hidden md:flex absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 items-end justify-center p-4 z-20">
                    <button 
                      className="w-full py-3 rounded-xl bg-[#b3996d] text-white font-semibold text-xs uppercase tracking-[0.2em] shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out hover:bg-[#a1875f]"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents double triggers
                        handleProductClick(product);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
                
                {/* Product Content Details */}
                <div className="p-6 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] text-[#b3996d] font-bold uppercase tracking-[0.2em]">
                      {product.category}
                    </span>
                    <span className="text-[9px] text-zinc-400 font-light tracking-wider uppercase">
                      • {isJewellery(product.category) ? 'Jewellery' : 'Saree'}
                    </span>
                  </div>
                  
                  <h3 className="text-base font-serif text-zinc-800 tracking-wide truncate group-hover:text-zinc-950 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-baseline justify-between mt-4 pt-3 border-t border-zinc-100/80">
                    <span className="text-[11px] text-zinc-400 font-light uppercase tracking-wider">Premium Rate</span>
                    <span className="text-sm font-semibold text-zinc-900 tracking-wide">
                      LKR {product.rentPricePerDay > 0 ? product.rentPricePerDay.toLocaleString() : product.purchasePrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24 max-w-md mx-auto animate-fadeIn">
            <p className="text-xl font-serif text-zinc-700 mb-2 font-light">No collections found</p>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">We couldn&rsquo;t find any items matching &ldquo;{searchQuery}&rdquo;.</p>
          </div>
        )}
      </div>

      {/* --- ELITE COMPACT MODAL FRAME --- */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-[999999] bg-zinc-950/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6" 
          onClick={closeModal}
        >
          {/* Max-w-xl and Max-h-auto makes it beautiful and smaller on desktop */}
          <div 
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md md:max-w-2xl p-5 sm:p-6 max-h-[92vh] md:max-h-[80vh] overflow-y-auto border border-zinc-200/50 animate-scaleUp" 
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Elegant Close Button */}
            <button 
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-[#b3996d] hover:text-white transition-all duration-300 shadow-sm z-50" 
              onClick={closeModal}
            >
              ✕
            </button>
            
            {/* Responsive Split Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              
              {/* Product Image Box */}
              <div className="w-full aspect-square md:h-full max-h-[240px] md:max-h-[40vh] overflow-hidden rounded-xl bg-[#f7f5f2] flex items-center justify-center shadow-inner">
                <img 
                  src={selectedProduct.images && selectedProduct.images[0] ? selectedProduct.images[0] : 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Dynamic Action Dashboard */}
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-[#b3996d] font-bold text-[9px] uppercase block tracking-[0.2em] mb-0.5">{selectedProduct.category}</span>
                    <h2 className="text-xl md:text-2xl font-serif text-zinc-900 font-light pr-6 leading-tight truncate-2-lines">{selectedProduct.name}</h2>
                  </div>
                  
                  {/* Tabs Slider */}
                  <div className="flex bg-zinc-100 rounded-lg p-1 border border-zinc-200/20">
                    {selectedProduct.isAvailableForRent && (
                      <button 
                        className={`flex-1 py-1.5 text-center text-[11px] font-medium tracking-wider rounded-md transition-all duration-300 uppercase ${orderType === 'rent' ? 'bg-white text-[#b3996d] shadow-sm font-semibold' : 'text-zinc-500 hover:text-zinc-900'}`} 
                        onClick={() => { setOrderType('rent'); setTotalPrice(0); }}
                      >
                        {isJewellery(selectedProduct.category) ? 'Rent Jewels' : 'Rent Saree'}
                      </button>
                    )}
                    {selectedProduct.isAvailableForPurchase && (
                      <button 
                        className={`flex-1 py-1.5 text-center text-[11px] font-medium tracking-wider rounded-md transition-all duration-300 uppercase ${orderType === 'purchase' ? 'bg-white text-[#b3996d] shadow-sm font-semibold' : 'text-zinc-500 hover:text-zinc-900'}`} 
                        onClick={() => { setOrderType('purchase'); setTotalPrice(selectedProduct.purchasePrice); }}
                      >
                        {isJewellery(selectedProduct.category) ? 'Buy Jewels' : 'Buy Saree'}
                      </button>
                    )}
                  </div>

                  {/* Form Fields */}
                  {orderType === 'rent' && (
                    <div className="space-y-3 bg-zinc-50/80 p-3 rounded-xl border border-zinc-100 animate-fadeIn">
                      <div className="flex gap-2">
                        <div className="flex-1 space-y-1">
                          <label className="text-[9px] text-zinc-400 font-medium uppercase tracking-wider">From</label>
                          <input 
                            type="date" 
                            value={fromDate} 
                            onChange={(e)=>setFromDate(e.target.value)} 
                            min={new Date().toISOString().split('T')[0]} 
                            className="w-full px-2.5 py-1.5 rounded-md bg-white border border-zinc-200 text-xs font-light outline-none focus:border-[#b3996d]" 
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <label className="text-[9px] text-zinc-400 font-medium uppercase tracking-wider">To</label>
                          <input 
                            type="date" 
                            value={toDate} 
                            onChange={(e)=>setToDate(e.target.value)} 
                            min={fromDate || new Date().toISOString().split('T')[0]} 
                            className="w-full px-2.5 py-1.5 rounded-md bg-white border border-zinc-200 text-xs font-light outline-none focus:border-[#b3996d]" 
                          />
                        </div>
                      </div>
                      <div className="text-[11px] text-zinc-500 flex justify-between pt-0.5">
                        <span>Daily Rental Rate:</span>
                        <span className="text-zinc-900 font-medium">LKR {selectedProduct.rentPricePerDay.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  {orderType === 'purchase' && (
                    <div className="bg-zinc-50/80 p-3 rounded-xl border border-zinc-100 animate-fadeIn">
                      <p className="text-[11px] text-zinc-500 font-light leading-relaxed">
                        Exquisite Quality Guarantee. Includes custom brand-authentic safety box packaging and secured home delivery.
                      </p>
                    </div>
                  )}
                </div>

                {/* Pricing & Checkout */}
                {orderType && (
                  <div className="animate-fadeIn space-y-3 pt-2">
                    <div className="flex items-center justify-between bg-[#fbfaf7] rounded-xl p-3 border border-[#e6dfcc]/40">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Total Price</span>
                      <strong className="text-lg font-medium text-zinc-900 font-sans">
                        LKR {totalPrice.toLocaleString()}
                      </strong>
                    </div>

                    <button 
                      disabled={orderType === 'rent' && totalPrice === 0}
                      className={`w-full py-2.5 rounded-xl text-white text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                        orderType === 'rent' && totalPrice === 0 
                          ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none' 
                          : 'bg-[#b3996d] hover:bg-[#a1875f] active:scale-[0.99] shadow-md'
                      }`}
                    >
                      Confirm Order
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}