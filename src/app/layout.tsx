import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter", 
  display: 'swap' 
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-cormorant",
  display: 'swap' 
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
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable}`}>
        {/* --- PREMIUM PRELOADER --- */}
        <div id="preloader">
          <div className="loader"></div>
          <div className="loader-text">DHĀRA</div>
        </div>

        <Navbar /> 
        
        <main style={{ minHeight: '80vh', background: '#FDFBF7' }}>
          {children}
        </main>

        <Footer /> 

        {/* --- HYDRATION & LOADER SCRIPT --- */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // වෙබ්සයිට් එක සම්පූර්ණයෙන්ම ලෝඩ් වූ පසු
                window.addEventListener('load', function() {
                  document.documentElement.classList.add('loaded');
                });
                
                // යම් හෙයකින් ලෝඩ් වීමට ප්‍රමාද වුවහොත් තත්පර 2කින් පෙන්වන්න
                setTimeout(() => {
                  document.documentElement.classList.add('loaded');
                }, 2000);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}