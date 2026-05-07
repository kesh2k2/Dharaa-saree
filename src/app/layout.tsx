import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google"; // Fonts import කිරීම
import "./globals.css";
import Navbar from "../components/Navbar"; // Navbar path එක නිවැරදිද බලන්න
import Footer from "../components/Footer";// Footer එක import කිරීම

// Google Fonts සැකසීම
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-cormorant" 
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
        <Navbar /> 
        
        {/* 'min-h-screen' සහ 'flex-col' දාන්නේ footer එක හැමවෙලේම පල්ලෙහා තියෙන්න */}
      <main style={{ minHeight: '80vh', background: '#FFFEFC' }}>
        {children}
      </main>

        <Footer /> 
      </body>
    </html>
  );
}