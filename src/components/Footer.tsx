'use client';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section brand-info">
          <h2 className="footer-logo">DHĀRA <span>COLLECTION</span></h2>
          <p className="footer-desc">
            Elevating elegance through timeless sarees. We specialize in premium rentals and 
            exquisite purchases for every special occasion in your life.
          </p>
          <div className="social-links">
            <Link href="#" aria-label="Facebook"><FaFacebookF /></Link>
            <Link href="#" aria-label="Instagram"><FaInstagram /></Link>
            <Link href="#" aria-label="Whatsapp"><FaWhatsapp /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="#collections">Collections</Link></li>
            <li><Link href="#">New Arrivals</Link></li>
            <li><Link href="#">Rent Policy</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li><Link href="#">Pure Silk</Link></li>
            <li><Link href="#">Bridal Wear</Link></li>
            <li><Link href="#">Handloom Cotton</Link></li>
            <li><Link href="#">Designer Party</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact-info">
          <h3>Contact Us</h3>
          
          <div className="contact-item">
            <div className="contact-icon-box"><FaMapMarkerAlt /></div>
            <p>137/B Pamunuwa, Pilimathalawa</p>
          </div>
          <div className="contact-item">
            <div className="contact-icon-box"><FaPhoneAlt /></div>
            <p>0719780880</p>
          </div>
          <div className="contact-item">
            <div className="contact-icon-box"><FaEnvelope /></div>
            <p>hello@dharacollection.com</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Dhāra Collection. All Rights Reserved.</p>
        <p>Crafted for Elegance</p>
      </div>

      <style jsx>{`
        .footer {
          background: #FAF7F2; /* Soft Cream/Ivory Background */
          color: #4A4031; /* Deep Earthy Brown instead of Black */
          padding: 80px 8% 30px;
          border-top: 1px solid #EADDCA; /* Subtle Golden Border */
        }

        .footer-container {
          max-width: 1300px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: 40px;
        }

        .footer-logo {
          font-family: var(--font-cormorant), serif;
          font-size: 1.8rem;
          letter-spacing: 3px;
          margin-bottom: 20px;
          color: #2D2419;
        }

        .footer-logo span {
          color: #C5A358; /* Golden Accent */
          font-weight: 300;
        }

        .footer-desc {
          color: #7A6F5D;
          line-height: 1.7;
          font-size: 0.95rem;
          margin-bottom: 25px;
        }

        .footer-section h3 {
          font-size: 1rem;
          margin-bottom: 25px;
          color: #C5A358; /* Gold Title */
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 700;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section ul li {
          margin-bottom: 12px;
        }

        /* Link colors fixed - no more blue links */
        .footer-section :global(a) {
          color: #5C5242;
          text-decoration: none;
          font-size: 0.9rem;
          transition: 0.3s ease;
          display: inline-block;
        }

        .footer-section :global(a:hover) {
          color: #C5A358;
          transform: translateX(5px);
        }

        /* Social Icons - Cream & Gold Style */
        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-links :global(a) {
          color: #C5A358;
          background: #fff;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 1rem;
          border: 1px solid #EADDCA;
          transition: 0.3s;
        }

        .social-links :global(a:hover) {
          background: #C5A358;
          color: #fff;
          border-color: #C5A358;
        }

        /* Contact Details Styles */
        .contact-item {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 18px;
        }

        .contact-icon-box {
          color: #C5A358;
          font-size: 1rem;
        }

        .contact-item p {
          color: #5C5242;
          font-size: 0.9rem;
          margin: 0;
        }

        .footer-bottom {
          margin-top: 60px;
          padding-top: 30px;
          border-top: 1px solid #EADDCA;
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: #9A8F80;
          font-family: var(--font-inter), sans-serif;
        }

        @media (max-width: 900px) {
          .footer-container { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 600px) {
          .footer-container { grid-template-columns: 1fr; text-align: center; }
          .social-links { justify-content: center; }
          .contact-item { justify-content: center; }
          .footer-bottom { flex-direction: column; gap: 10px; }
        }
      `}</style>
    </footer>
  );
}