'use client';

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#FAF7F2] border-t border-[#EADDCA]">
      <div className="w-full max-w-[1300px] mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16 space-y-3">
          <span className="inline-block text-[#C5A358] font-bold tracking-[0.25em] text-xs uppercase">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl md:text-5xl font-normal text-[#2D2419] font-serif tracking-wide">
            Connect With <span className="italic text-[#C5A358]">Dhāra</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A358] mx-auto mt-4"></div>
          <p className="text-sm text-[#7A6F5D] max-w-md mx-auto font-light leading-relaxed pt-2">
            Have questions about our premium rentals or custom bridal purchases? Reach out to us today.
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* LEFT COLUMN: Map & Premium Socials Panel (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Embedded Google Map Component */}
            <div className="w-full h-[320px] lg:h-full min-h-[280px] rounded-3xl overflow-hidden border border-[#EADDCA] shadow-[0_15px_40px_rgba(197,163,88,0.06)] relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1132.2492374370765!2d80.56456373877374!3d7.248534735173318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae36fd6e5899f89%3A0xade19e6ec0026623!2sDhara%20Collection!5e0!3m2!1sen!2slk!4v1779939158440!5m2!1sen!2slk" 
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-[1.1] sepia-[10%] hover:grayscale-0 transition-all duration-700 ease-in-out"
              ></iframe>
              
              {/* Floating Quick Address Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#EADDCA] flex items-center gap-3 shadow-md transform group-hover:translate-y-[-2px] transition-transform duration-300">
                <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#EADDCA] flex items-center justify-center text-[#C5A358]">
                  <FaMapMarkerAlt size={14} />
                </div>
                <p className="text-xs font-medium text-[#2D2419]">Pilimatalawa, Kandy, Sri Lanka</p>
              </div>
            </div>

            {/* Luxury Socials & Contact Meta Panel */}
            <div className="bg-white p-6 rounded-3xl border border-[#EADDCA] shadow-[0_10px_30px_rgba(0,0,0,0.02)] space-y-5">
              <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center pb-4 border-b border-[#FAF7F2]">
                <div>
                  <h4 className="text-xs font-bold text-[#2D2419] uppercase tracking-wider">Direct Hotline</h4>
                  <p className="text-sm font-semibold text-[#C5A358] mt-0.5">0719780880</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2D2419] uppercase tracking-wider">Email Us</h4>
                  <p className="text-sm font-semibold text-[#C5A358] mt-0.5">hello@dharacollection.com</p>
                </div>
              </div>

              {/* High-End Social Icons */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#7A6F5D] uppercase tracking-widest">Follow Our Journey</span>
                <div className="flex gap-3">
                  <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#EADDCA] text-[#2D2419] hover:bg-[#C5A358] hover:text-white hover:border-[#C5A358] flex items-center justify-center transition-all duration-300 shadow-sm hover:-translate-y-1">
                    <FaFacebookF size={14} />
                  </a>
                  <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#EADDCA] text-[#2D2419] hover:bg-[#C5A358] hover:text-white hover:border-[#C5A358] flex items-center justify-center transition-all duration-300 shadow-sm hover:-translate-y-1">
                    <FaInstagram size={14} />
                  </a>
                  <a href="#" aria-label="Whatsapp" className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#EADDCA] text-[#2D2419] hover:bg-[#C5A358] hover:text-white hover:border-[#C5A358] flex items-center justify-center transition-all duration-300 shadow-sm hover:-translate-y-1">
                    <FaWhatsapp size={14} />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Luxury Minimalist Message Form (7 Columns) */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[32px] border border-[#EADDCA] shadow-[0_20px_50px_rgba(197,163,88,0.04)] flex flex-col justify-center">
            <h3 className="font-serif text-2xl font-normal text-[#2D2419] mb-8 tracking-wide">
              Send a <span className="italic text-[#C5A358]">Private Message</span>
            </h3>
            
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#5C5242] uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full bg-[#FAF7F2]/50 border-b border-[#EADDCA] focus:border-[#C5A358] px-1 py-3 text-sm text-[#2D2419] placeholder-[#9A8F80]/70 outline-none transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#5C5242] uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full bg-[#FAF7F2]/50 border-b border-[#EADDCA] focus:border-[#C5A358] px-1 py-3 text-sm text-[#2D2419] placeholder-[#9A8F80]/70 outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#5C5242] uppercase tracking-widest">Subject</label>
                <input 
                  type="text" 
                  placeholder="Inquiry Topic" 
                  className="w-full bg-[#FAF7F2]/50 border-b border-[#EADDCA] focus:border-[#C5A358] px-1 py-3 text-sm text-[#2D2419] placeholder-[#9A8F80]/70 outline-none transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#5C5242] uppercase tracking-widest">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="Describe your requirement here..." 
                  className="w-full bg-[#FAF7F2]/50 border-b border-[#EADDCA] focus:border-[#C5A358] px-1 py-3 text-sm text-[#2D2419] placeholder-[#9A8F80]/70 outline-none transition-all duration-300 resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full bg-[#2D2419] hover:bg-[#C5A358] text-white hover:text-[#2D2419] font-bold py-4 rounded-xl text-xs transition-all duration-400 flex items-center justify-center gap-3 tracking-[0.2em] uppercase shadow-lg hover:shadow-[0_10px_25px_rgba(197,163,88,0.2)] active:scale-[0.98] group"
                >
                  <span>Send Message</span>
                  <FaPaperPlane size={12} className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}