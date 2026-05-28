'use client';

import { useState, useEffect } from 'react';
import { Star, Send } from 'lucide-react';

interface Review {
  id: string | number;
  name: string;
  role: string;
  comment: string;
  rating: number;
  date: string;
}

// Default reviews in English
const defaultReviews: Review[] = [
  {
    id: 1,
    name: "Sanduni Perera",
    role: "Bridal Customer",
    comment: "The Pure Silk saree I rented for my wedding was absolutely stunning! Everyone asked where I got it from. Highly recommended for premium quality and service!",
    rating: 5,
    date: "2026-04-12"
  },
  {
    id: 2,
    name: "Kavindi De Silva",
    role: "Regular Customer",
    comment: "I rented a designer saree for a corporate function. The quality was pristine, and the cleaning/maintenance was top-notch. Saved me a lot of money!",
    rating: 5,
    date: "2026-05-02"
  }
];

export default function Reviews() {
  // State variables
  const [allReviews, setAllReviews] = useState<Review[]>(defaultReviews);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Customer');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0); // Starts with 0 (No stars filled)
  const [hoverRating, setHoverRating] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  // Load reviews from local storage on mount
  useEffect(() => {
    const savedReviews = localStorage.getItem('dhara_reviews');
    if (savedReviews) {
      setAllReviews(JSON.parse(savedReviews));
    }
  }, []);

  // Handle review submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation to check if the user selected at least 1 star
    if (rating === 0) {
      setErrorMsg('Please select a star rating.');
      return;
    }

    if (!name.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: Date.now(),
      name,
      role: role.trim() ? role : 'Customer',
      comment,
      rating,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedReviews = [newReview, ...allReviews];
    setAllReviews(updatedReviews);
    
    // Save to Local Storage
    localStorage.setItem('dhara_reviews', JSON.stringify(updatedReviews));

    // Reset Form
    setName('');
    setRole('Customer');
    setComment('');
    setRating(0); // Reset stars back to 0
    setErrorMsg('');
  };

  return (
    <section id="reviews" className="py-16 px-4 md:px-12 bg-[#FDFBF7]/60 border-t border-[#EADDCA]">
      <div className="container mx-auto max-w-[1300px]">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#C5A358] font-bold tracking-widest text-xs uppercase mb-2">TESTIMONIALS</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 font-serif">What Our <span className="text-[#C5A358]">Clients Say</span></h2>
          <p className="text-xs md:text-sm text-zinc-500 mt-2">Share your genuine experience with us.</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Add Review Form */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm sticky top-24">
            <h3 className="font-serif text-lg font-semibold text-zinc-900 mb-4">Share Your Experience</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Anura Perera" 
                  className="w-full bg-[#FAF7F2]/40 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-[#C5A358] transition-colors"
                />
              </div>

              {/* Role Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Tag / Role (Optional)</label>
                <input 
                  type="text" 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g., Bridal / Regular Customer" 
                  className="w-full bg-[#FAF7F2]/40 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-[#C5A358] transition-colors"
                />
              </div>

              {/* Interactive Star Rating */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">Your Rating</label>
                <div className="flex gap-1.5 pt-1">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <button
                        type="button"
                        key={index}
                        onClick={() => {
                          setRating(starValue);
                          setErrorMsg(''); // Clear error once a star is selected
                        }}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform active:scale-95"
                      >
                        <Star 
                          size={22} 
                          className={`${
                            starValue <= (hoverRating || rating) 
                              ? "fill-[#C5A358] text-[#C5A358]" 
                              : "text-zinc-200"
                          } transition-colors duration-150`}
                        />
                      </button>
                    );
                  })}
                </div>
                {/* Notification message to pick a star */}
                {errorMsg ? (
                  <p className="text-xs text-red-500 mt-1 font-medium">{errorMsg}</p>
                ) : (
                  rating === 0 && <p className="text-[11px] text-[#C5A358] mt-1 font-medium italic">Please add a star rating</p>
                )}
              </div>

              {/* Comment Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Your Review</label>
                <textarea 
                  rows={3} 
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your thoughts here..." 
                  className="w-full bg-[#FAF7F2]/40 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-[#C5A358] transition-colors resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full bg-[#1a1a1a] hover:bg-[#C5A358] text-white hover:text-zinc-950 font-bold py-3 rounded-xl text-xs transition-all duration-300 flex items-center justify-center gap-2 tracking-widest uppercase"
              >
                <span>Submit Review</span>
                <Send size={12} />
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: Reviews Display Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[620px] overflow-y-auto pr-2 scrollbar-thin">
            {allReviews.map((review) => (
              <div 
                key={review.id} 
                className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md h-fit"
              >
                <div>
                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, index) => (
                      <Star 
                        key={index} 
                        size={14} 
                        className={index < review.rating ? "fill-[#C5A358] text-[#C5A358]" : "text-zinc-200"} 
                      />
                    ))}
                  </div>
                  
                  {/* Comment */}
                  <p className="text-xs md:text-sm text-zinc-600 italic leading-relaxed break-words">
                    "{review.comment}"
                  </p>
                </div>

                {/* User Profile Info */}
                <div className="mt-5 pt-3 border-t border-zinc-50 flex justify-between items-center">
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-zinc-900">{review.name}</h4>
                    <p className="text-[10px] text-[#C5A358] font-semibold tracking-wider uppercase">{review.role}</p>
                  </div>
                  <span className="text-[10px] text-zinc-400">{review.date}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}