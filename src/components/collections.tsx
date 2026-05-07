'use client';
import { useState, useEffect } from 'react';
import { sarees, Saree } from '../data/products';

export default function Collections() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSaree, setSelectedSaree] = useState<Saree | null>(null);
  
  // New States
  const [orderType, setOrderType] = useState<'rent' | 'purchase'>('rent');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const categories = ['All', ...Array.from(new Set(sarees.map(s => s.category)))];

  const filteredSarees = activeCategory === 'All' 
    ? sarees 
    : sarees.filter(s => s.category === activeCategory);

  // Logic: Rent Days & Price Calculation
  useEffect(() => {
    if (selectedSaree) {
      if (orderType === 'rent' && fromDate && toDate) {
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
        setTotalPrice(selectedSaree.purchasePrice);
      }
    }
  }, [fromDate, toDate, orderType, selectedSaree]);

  const closeModal = () => {
    setSelectedSaree(null);
    setFromDate('');
    setToDate('');
    setOrderType('rent');
  };

  return (
    <section id="collections" className="collections-section">
      <div className="container">
        <div className="section-header">
          <span className="badge">PREMIUM SELECTION</span>
          <h2 className="title">Our <span>Collections</span></h2>
        </div>

        <div className="category-tabs">
          {categories.map(cat => (
            <button 
              key={cat}
              className={activeCategory === cat ? 'active' : ''}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredSarees.map(saree => (
            <div key={saree.id} className="saree-card">
              <div className="saree-img-box">
                <img src={saree.images[0]} alt={saree.name} />
                <div className="saree-tags">
                  {saree.isAvailableForRent && <span className="rent-tag">Rent</span>}
                  {saree.isAvailableForPurchase && <span className="buy-tag">Buy</span>}
                </div>
              </div>
              <div className="saree-info">
                <h3>{saree.name}</h3>
                <p className="price">Starting LKR {saree.rentPricePerDay.toLocaleString()}</p>
                <button className="details-btn" onClick={() => setSelectedSaree(saree)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- BUG FIXED MODAL --- */}
      {selectedSaree && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn-fixed" onClick={closeModal}>✕</button>
            
            <div className="modal-body">
              <div className="modal-gallery">
                <img src={selectedSaree.images[0]} alt={selectedSaree.name} className="main-modal-img" />
              </div>

              <div className="modal-details">
                <span className="modal-cat">{selectedSaree.category}</span>
                <h2>{selectedSaree.name}</h2>
                
                <div className="order-type-selector">
                  <button 
                    className={orderType === 'rent' ? 'active' : ''} 
                    onClick={() => setOrderType('rent')}
                  >
                    Rent Saree
                  </button>
                  <button 
                    className={orderType === 'purchase' ? 'active' : ''} 
                    onClick={() => setOrderType('purchase')}
                  >
                    Purchase Saree
                  </button>
                </div>

                {orderType === 'rent' ? (
                  <div className="rent-options animate-fade">
                    <div className="date-inputs">
                      <div>
                        <label>From</label>
                        <input type="date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} min={new Date().toISOString().split('T')[0]}/>
                      </div>
                      <div>
                        <label>To</label>
                        <input type="date" value={toDate} onChange={(e)=>setToDate(e.target.value)} min={fromDate || new Date().toISOString().split('T')[0]}/>
                      </div>
                    </div>
                    <p className="info-text">Rent: LKR {selectedSaree.rentPricePerDay.toLocaleString()} per day</p>
                  </div>
                ) : (
                  <div className="purchase-info animate-fade">
                    <p className="info-text">Full Ownership: Standard delivery within 3-5 days.</p>
                  </div>
                )}

                <div className="total-display">
                  <span>Total Amount:</span>
                  <strong>LKR {totalPrice.toLocaleString()}</strong>
                </div>

                <button className="confirm-btn">
                  Confirm {orderType === 'rent' ? 'Booking' : 'Purchase'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .collections-section { padding: 60px 8%; background: #FDFBF7; min-height: 100vh; }
        .container { max-width: 1300px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 40px; }
        .badge { color: #C5A358; font-weight: 700; letter-spacing: 2px; font-size: 0.8rem; }
        .title { font-size: 2.5rem; font-family: serif; margin-top: 10px; }
        .title span { font-style: italic; color: #C5A358; }

        /* Tabs & Grid */
        .category-tabs { display: flex; justify-content: center; gap: 10px; margin-bottom: 40px; flex-wrap: wrap; }
        .category-tabs button { padding: 8px 20px; border-radius: 20px; border: 1px solid #ddd; background: #fff; cursor: pointer; transition: 0.3s; }
        .category-tabs button.active { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
        
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 25px; }

        /* --- UPDATED CARD HOVER EFFECT --- */
        .saree-card { 
          background: #fff; 
          border-radius: 12px; 
          overflow: hidden; 
          box-shadow: 0 4px 10px rgba(0,0,0,0.05); 
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Smooth Pop-up */
          border: 1px solid transparent;
          cursor: pointer;
        }

        .saree-card:hover, .saree-card:active { 
          transform: translateY(-10px); /* Popup effect */
          box-shadow: 0 15px 30px rgba(197, 163, 88, 0.25); /* Yellow/Gold Glow */
          border-color: rgba(197, 163, 88, 0.3);
        }

        .saree-img-box { height: 350px; position: relative; }
        .saree-img-box img { width: 100%; height: 100%; object-fit: cover; }
        .saree-tags { position: absolute; top: 10px; left: 10px; display: flex; gap: 5px; }
        .rent-tag, .buy-tag { padding: 4px 10px; font-size: 0.6rem; border-radius: 4px; color: #fff; font-weight: 700; }
        .rent-tag { background: #C5A358; }
        .buy-tag { background: #1a1a1a; }
        .saree-info { padding: 20px; }
        .details-btn { width: 100%; margin-top: 15px; padding: 10px; border: 1px solid #1a1a1a; background: transparent; cursor: pointer; font-weight: 600; }
        .details-btn:hover { background: #1a1a1a; color: #fff; }

        /* FIXED MODAL STYLES */
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.85); z-index: 9999; 
          display: flex; align-items: center; justify-content: center; padding: 20px;
        }

        .modal-content {
          background: #fff; width: 100%; max-width: 900px; border-radius: 20px;
          position: relative; max-height: 95vh; overflow-y: auto; padding: 40px;
        }

        .close-btn-fixed {
          position: absolute; top: 15px; right: 15px; width: 40px; height: 40px;
          background: #f5f5f5; border: none; border-radius: 50%;
          font-size: 1.2rem; cursor: pointer; z-index: 10;
          display: flex; align-items: center; justify-content: center; transition: 0.3s;
        }
        .close-btn-fixed:hover { background: #e0e0e0; transform: rotate(90deg); }

        .modal-body { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .main-modal-img { width: 100%; height: 450px; object-fit: cover; border-radius: 12px; }

        .order-type-selector {
          display: flex; background: #f0f0f0; padding: 5px; border-radius: 10px; margin: 20px 0;
        }
        .order-type-selector button {
          flex: 1; padding: 10px; border: none; border-radius: 8px; cursor: pointer; transition: 0.3s; font-weight: 600;
        }
        .order-type-selector button.active { background: #1a1a1a; color: #fff; }

        .date-inputs { display: flex; gap: 10px; margin-bottom: 15px; }
        .date-inputs div { flex: 1; display: flex; flex-direction: column; gap: 5px; }
        .date-inputs input { padding: 10px; border: 1px solid #ddd; border-radius: 8px; }

        .total-display {
          margin: 25px 0; padding: 15px; background: #FDFBF7; border: 1px dashed #C5A358;
          display: flex; justify-content: space-between; align-items: center; border-radius: 10px;
        }
        .total-display strong { font-size: 1.4rem; color: #1a1a1a; }

        .confirm-btn {
          width: 100%; padding: 15px; background: #C5A358; color: #fff;
          border: none; border-radius: 30px; font-size: 1rem; font-weight: 700; cursor: pointer;
        }

        .animate-fade { animation: fadeIn 0.4s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 768px) {
          .modal-body { grid-template-columns: 1fr; }
          .modal-content { padding: 25px 20px; }
          .main-modal-img { height: 300px; }
          .close-btn-fixed { top: 10px; right: 10px; background: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          /* Mobile specific hover replacement */
          .saree-card:active { transform: scale(1.02); } 
        }
      `}</style>
    </section>
  );
}