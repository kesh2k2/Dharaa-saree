'use client';
import { useState, useEffect } from 'react';
import { sarees, Saree } from '../data/products';
import '../app/globals.css';

export default function Collections() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSaree, setSelectedSaree] = useState<Saree | null>(null);
  
  const [orderType, setOrderType] = useState<'rent' | 'purchase' | null>(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  // --- LISTEN TO NAVBAR DROPDOWN CLICKS & REAL-TIME SEARCH ---
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('?filter=')) {
        const urlParams = hash.split('?filter=')[1];
        
        const category = decodeURIComponent(urlParams.split('&')[0]);
        setActiveCategory(category);
        
        if (urlParams.includes('&search=')) {
          const query = decodeURIComponent(urlParams.split('&search=')[1]);
          setSearchQuery(query);
        } else {
          setSearchQuery('');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const categories = ['All', ...Array.from(new Set(sarees.map(s => s.category)))];

  // --- FILTER LOGIC: CATEGORY + LIVE SEARCH ---
  const filteredSarees = sarees.filter(saree => {
    const matchesCategory = activeCategory === 'All' || saree.category === activeCategory;
    const matchesSearch = saree.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          saree.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Logic: Rent Days & Price Calculation
  useEffect(() => {
    if (selectedSaree && orderType) {
      if (orderType === 'rent') {
        if (fromDate && toDate) {
          const start = new Date(fromDate);
          const end = new Date(toDate);
          const diffTime = end.getTime() - start.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
          
          if (diffDays > 0) {
            setTotalPrice(diffDays * selectedSaree.rentPricePerDay);
          } else {
            setTotalPrice(0);
          }
        } else {
          setTotalPrice(0);
        }
      } else if (orderType === 'purchase') {
        setTotalPrice(selectedSaree.purchasePrice);
      }
    }
  }, [fromDate, toDate, orderType, selectedSaree]);

  const closeModal = () => {
    setSelectedSaree(null);
    setFromDate('');
    setToDate('');
    setOrderType(null);
    setTotalPrice(0);
  };

  return (
    <section id="collections" className="py-12 md:py-16 px-4 md:px-12 bg-white scroll-mt-20">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block text-[#b3996d] font-bold tracking-widest text-xs uppercase mb-2">PREMIUM SELECTION</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900">Our <span className="text-[#b3996d]">Collections</span></h2>
          
          {searchQuery && (
            <p className="text-xs text-zinc-500 mt-2">
              Showing results for &ldquo;<span className="font-semibold text-zinc-800">{searchQuery}</span>&rdquo;
            </p>
          )}
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-8 md:mb-12 overflow-x-auto pb-2 max-w-full">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-zinc-200 text-xs md:text-sm font-medium transition-colors whitespace-nowrap hover:border-[#b3996d] hover:text-[#b3996d] ${activeCategory === cat ? 'bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-800' : 'bg-white text-zinc-700'}`}
              onClick={() => {
                window.location.hash = `collections?filter=${encodeURIComponent(cat)}`;
                setActiveCategory(cat);
                setSearchQuery('');
              }}
            >
              {cat === 'Designer Party' ? 'Designer Wear' : cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 md:gap-y-10">
          {filteredSarees.map(saree => (
            <div key={saree.id} className="saree-card bg-white rounded-xl overflow-hidden border border-zinc-100 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="relative group overflow-hidden w-full aspect-[3/4] bg-zinc-50">
                  <img 
                    src={saree.images[0]} 
                    alt={saree.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {saree.isAvailableForRent && <span className="px-2.5 py-1 text-xs rounded-full font-semibold text-white bg-[#b3996d] shadow-sm">Rent</span>}
                    {saree.isAvailableForPurchase && <span className="px-2.5 py-1 text-xs rounded-full font-semibold text-white bg-zinc-900 shadow-sm">Buy</span>}
                  </div>
                </div>
                
                <div className="p-5 md:p-6">
                  <span className="text-xs text-[#b3996d] font-medium uppercase tracking-wider block mb-1">{saree.category}</span>
                  <h3 className="text-base md:text-lg font-medium text-zinc-900 truncate">{saree.name}</h3>
                  <p className="text-xs md:text-sm text-zinc-600 mt-1">Starting LKR {saree.rentPricePerDay.toLocaleString()}</p>
                </div>
              </div>
              <div className="px-5 pb-5 md:px-6 md:pb-6">
                <button className="w-full py-2.5 rounded-lg border-2 border-zinc-900 bg-transparent text-zinc-900 font-semibold text-sm transition-colors hover:bg-zinc-900 hover:text-white" onClick={() => setSelectedSaree(saree)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSarees.length === 0 && (
          <div className="text-center py-20 text-zinc-400 font-light max-w-md mx-auto">
            <p className="text-lg font-medium text-zinc-600 mb-1">No items found</p>
            <p className="text-sm">We couldn&rsquo;t find anything matching your request.</p>
          </div>
        )}
      </div>

      {/* --- FIXED RESPONSIVE MODAL CONTAINER --- */}
      {selectedSaree && (
        <div 
          className="fixed inset-0 z-[99999] overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10" 
          onClick={closeModal}
        >
          {/* Main White Window Box - Added `max-h-[85vh]` and `md:my-auto` to stop sticking to the navbar */}
          <div 
            className="relative bg-white rounded-2xl md:rounded-[24px] shadow-2xl w-full max-w-4xl p-5 sm:p-8 md:p-10 max-h-[85vh] overflow-y-auto my-auto border border-zinc-100 animate-fadeIn" 
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Close Button */}
            <button className="absolute top-4 right-4 md:top-6 md:right-6 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors z-10" onClick={closeModal}>✕</button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-4 md:mt-0">
              {/* Product Image Panel */}
              <div className="modal-gallery w-full max-h-[300px] sm:max-h-[400px] md:max-h-none overflow-hidden rounded-xl md:rounded-2xl">
                <img src={selectedSaree.images[0]} alt={selectedSaree.name} className="w-full h-full md:h-auto object-cover md:object-contain rounded-xl md:rounded-2xl" />
              </div>

              {/* Product Control Panel */}
              <div className="modal-details flex flex-col justify-between">
                <div>
                  <span className="text-[#b3996d] font-semibold text-xs md:text-sm uppercase mb-1 block tracking-wider">{selectedSaree.category}</span>
                  <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 pr-8">{selectedSaree.name}</h2>
                  
                  {/* Rent / Purchase Tabs */}
                  <div className="flex bg-zinc-100 rounded-full p-1 my-5 md:my-6">
                    <button 
                      className={`flex-1 py-2 md:py-3 text-center text-xs md:text-sm font-semibold rounded-full transition-colors ${orderType === 'rent' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-700 hover:text-zinc-950'}`} 
                      onClick={() => { setOrderType('rent'); setTotalPrice(0); }}
                    >
                      Rent Saree
                    </button>
                    <button 
                      className={`flex-1 py-2 md:py-3 text-center text-xs md:text-sm font-semibold rounded-full transition-colors ${orderType === 'purchase' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-700 hover:text-zinc-950'}`} 
                      onClick={() => setOrderType('purchase')}
                    >
                      Purchase Saree
                    </button>
                  </div>

                  {/* Dynamic Inputs Based on Tab Choice */}
                  {orderType === 'rent' && (
                    <div className="space-y-4 md:space-y-6 animate-fadeIn">
                      <div className="flex gap-3 sm:gap-4">
                        <div className="flex-1 space-y-1">
                          <label className="text-xs md:text-sm text-zinc-600 font-medium">From</label>
                          <input type="date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 md:px-4 md:py-2.5 rounded-xl border border-zinc-200 text-xs md:text-sm outline-none focus:border-[#b3996d]" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <label className="text-xs md:text-sm text-zinc-600 font-medium">To</label>
                          <input type="date" value={toDate} onChange={(e)=>setToDate(e.target.value)} min={fromDate || new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 md:px-4 md:py-2.5 rounded-xl border border-zinc-200 text-xs md:text-sm outline-none focus:border-[#b3996d]" />
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-zinc-700 font-medium">Rent Price: <span className="text-zinc-900 font-semibold">LKR {selectedSaree.rentPricePerDay.toLocaleString()}</span> per day</p>
                    </div>
                  )}

                  {orderType === 'purchase' && (
                    <div className="animate-fadeIn">
                      <p className="text-xs md:text-sm text-zinc-600 bg-zinc-50 p-3.5 rounded-xl border border-zinc-100">Full Ownership: Premium product delivery within 3-5 working days with safe packaging.</p>
                    </div>
                  )}

                  {!orderType && (
                    <div className="text-center py-8 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200 my-4">
                      <p className="text-xs md:text-sm text-zinc-500 font-medium px-4">Please select whether you want to <span className="text-[#b3996d] font-bold">Rent</span> or <span className="text-zinc-900 font-bold">Purchase</span> this item to see the pricing details.</p>
                    </div>
                  )}
                </div>

                {/* Pricing Display Box & Confirm Button */}
                {orderType && (
                  <div className="animate-fadeIn mt-6 md:mt-4">
                    <div className="flex items-center justify-between border-dashed border-2 border-[#e6dfcc] bg-[#f9f7f1] rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
                      <span className="text-xs md:text-sm text-zinc-700 font-medium">
                        {orderType === 'rent' && !totalPrice ? 'Select Dates to Calculate:' : 'Total Amount:'}
                      </span>
                      <strong className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900">
                        LKR {totalPrice.toLocaleString()}
                      </strong>
                    </div>

                    <button 
                      disabled={orderType === 'rent' && totalPrice === 0}
                      className={`w-full py-3 md:py-4 rounded-full text-white text-sm md:text-base font-bold tracking-wide transition-all duration-300 shadow-md ${
                        orderType === 'rent' && totalPrice === 0 
                          ? 'bg-zinc-300 cursor-not-allowed shadow-none text-zinc-500' 
                          : 'bg-[#b3996d] hover:bg-[#a68d60] active:scale-[0.99] shadow-[#b3996d]/20'
                      }`}
                    >
                      Confirm {orderType === 'rent' ? 'Booking' : 'Purchase'}
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