'use client';

import { useState, useEffect } from 'react';
import Collections from '../components/collections';

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
    <>
      <div className="hero-wrapper">
        <div className="bg-circle-top"></div>
        
        <div className="container">
          {/* වම් පැත්ත: පෙළ */}
          <div className="content">
            <div className="badge">NEW COLLECTION 2026</div>
            <h1 className="title">
              Exquisite <br /> <span className="italic">Craftsmanship</span>
            </h1>
            <p className="subtitle">
              Experience the fusion of tradition and modern luxury with our exclusive 
              hand-picked sarees, designed for the woman of grace.
            </p>
            <div className="btn-group">
              <button className="cta-btn primary">
                Shop Now <span className="arrow">→</span>
              </button>
              <button className="cta-btn secondary">View Gallery</button>
            </div>
          </div>

          {/* දකුණු පැත්ත: Optimized Arch Slider */}
          <div className="visual-section">
            <div className="image-arch">
              {images.map((img, index) => (
                <div 
                  key={index} 
                  className={`image-slide ${index === currentImage ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${img})` }}
                ></div>
              ))}
            </div>

            {/* Floating Luxury Elements - Arch එකට ගැලපෙන සේ Position වෙනස් කළා */}
            <div className="floating-card clients">
              <div className="count">230K+</div>
              <div className="label">Happy Clients</div>
            </div>

            <div className="floating-card quality">
              <div className="icon">✦</div>
              <div className="label">Premium Quality</div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .hero-wrapper {
            background-color: #FDFBF7;
            min-height: 100vh;
            width: 100%;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
          }

          .bg-circle-top {
            position: absolute;
            top: -200px;
            right: -100px;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(197, 163, 88, 0.05) 0%, transparent 70%);
            z-index: 1;
          }

          .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 80px 8% 60px 8%;
            gap: 60px;
            max-width: 1400px;
            margin: 0 auto;
            z-index: 2;
          }

          .content { flex: 1.2; }

          .badge {
            color: #C5A358;
            font-weight: 700;
            font-size: 0.8rem;
            letter-spacing: 3px;
            margin-bottom: 20px;
          }

          .title {
            font-size: 5rem; /* පොඩ්ඩක් අඩු කළා size එක */
            font-family: 'Cormorant Garamond', serif;
            line-height: 1;
            margin-bottom: 25px;
            color: #1a1a1a;
          }

          .italic { font-style: italic; color: #C5A358; font-weight: 300; }

          .subtitle {
            font-size: 1.1rem;
            color: #555;
            max-width: 480px;
            line-height: 1.7;
            margin-bottom: 40px;
          }

          .btn-group { display: flex; gap: 20px; }

          .cta-btn {
            padding: 16px 35px;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.4s ease;
            font-size: 0.85rem;
          }

          .primary {
            background: #1a1a1a;
            color: white;
            border: none;
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .primary:hover { background: #C5A358; transform: translateY(-3px); }

          .secondary {
            background: transparent;
            color: #1a1a1a;
            border: 1px solid #1a1a1a;
          }

          .secondary:hover { background: #f0f0f0; }

          /* --- BALANCED ARCH SLIDER --- */
          .visual-section {
            flex: 1;
            position: relative;
            display: flex;
            justify-content: flex-end;
          }

          .image-arch {
            width: 420px; /* කලින් 480px තිබුණේ, දැන් 420px වලට අඩු කළා */
            height: 580px; /* කලින් 650px තිබුණේ, දැන් 580px වලට අඩු කළා */
            border-radius: 210px 210px 20px 20px; /* Ratio එකට අනුව radius එකත් හැදුවා */
            overflow: hidden;
            background: #eee;
            position: relative;
            border: 10px solid #fff;
            box-shadow: 0 30px 60px rgba(0,0,0,0.08);
          }

          .image-slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            opacity: 0;
            transform: scale(1.08);
            transition: opacity 1.5s ease-in-out, transform 2.2s ease-out;
          }

          .image-slide.active {
            opacity: 1;
            transform: scale(1);
          }

          /* Floating Cards */
          .floating-card {
            position: absolute;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(12px);
            padding: 20px;
            border-radius: 20px;
            box-shadow: 0 12px 25px rgba(0,0,0,0.06);
            z-index: 5;
          }

          .clients {
            bottom: 50px;
            left: -30px;
            text-align: center;
          }

          .quality {
            top: 80px;
            right: -15px;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .count { font-size: 1.6rem; font-weight: 700; color: #1a1a1a; }
          .label { font-size: 0.7rem; color: #C5A358; font-weight: 700; text-transform: uppercase; }
          .icon { font-size: 1.2rem; color: #C5A358; }

          @media (max-width: 1200px) {
            .title { font-size: 3.8rem; }
            .image-arch { width: 350px; height: 480px; }
          }

          @media (max-width: 768px) {
            .container { flex-direction: column; text-align: center; padding-top: 100px; }
            .btn-group { justify-content: center; }
            .visual-section { justify-content: center; margin-top: 50px; width: 100%; }
            .image-arch { width: 300px; height: 420px; }
            .clients { left: 50%; transform: translateX(-50%); bottom: -25px; }
            .quality { display: none; }
          }
        `}</style>
      </div>
      <Collections />
    </>
  );
}