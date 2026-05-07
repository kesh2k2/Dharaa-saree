import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Fonts සැකසීම - display: 'block' එකෙන් layout shift එක පාලනය කරයි
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'block', 
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-cormorant",
  display: 'block',
});

export const metadata: Metadata = {
  title: "Dhāra Collection | Premium Saree Rentals",
  description: "Exquisite sarees for rent and purchase in Sri Lanka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="loading-fix">
      <head>
        <style>{`
          /* CSS ලෝඩ් වෙනකම් content එක හංගා තැබීමට */
          .loading-fix body { 
            opacity: 0; 
          }
          /* සම්පූර්ණයෙන්ම ලෝඩ් වූ පසු smooth fade-in එකක් ලබා දීමට */
          .loaded body { 
            opacity: 1; 
            transition: opacity 0.5s ease-in-out; 
          }
          /* Background එක මුල සිටම පෙන්වීමට (නැත්නම් සුදු පාට පෙනේවි) */
          html {
            background-color: #FFFEFC;
          }
        `}</style>
      </head>
      <body className={`${inter.variable} ${cormorant.variable}`}>
        <Navbar /> 
        
        <main style={{ minHeight: '80vh', background: '#FFFEFC' }}>
          {children}
        </main>

        <Footer /> 

        {/* JavaScript එක මඟින් 'loaded' class එක එකතු කිරීම */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                document.documentElement.classList.add('loaded');
              });
              // Load එක පරක්කු වෙනවා නම් සෙකන්ඩ් එකකින් auto පෙන්වීමට
              setTimeout(() => {
                document.documentElement.classList.add('loaded');
              }, 1000);
            `,
          }}
        />
      </body>
    </html>
  );
}