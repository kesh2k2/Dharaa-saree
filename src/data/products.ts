export interface Saree {
  id: string;
  name: string;
  category: string; 
  images: string[]; 
  purchasePrice: number;
  rentPricePerDay: number;
  isAvailableForRent: boolean;
  isAvailableForPurchase: boolean;
  stockCount: number;
  bookedDates: string[]; 
  description: string;
}

export const sarees: Saree[] = [
  // --- SAREES SECTION ---
  {
    id: "s1",
    name: "Royal Golden Silk Saree",
    category: "Pure Silk",
    images: ["/saree1.jpg", "/saree1-back.jpg"],
    purchasePrice: 25000,
    rentPricePerDay: 2500,
    isAvailableForRent: true,
    isAvailableForPurchase: true,
    stockCount: 5,
    bookedDates: ["2026-05-15", "2026-05-16"], 
    description: "High quality pure silk saree for weddings with elegant golden borders."
  },
  {
    id: "s2",
    name: "Classic Indigo Handloom",
    category: "Handloom Cotton",
    images: ["/saree2.jpg", "/cotton1-2.jpg"],
    purchasePrice: 12500,
    rentPricePerDay: 1500,
    isAvailableForRent: true,
    isAvailableForPurchase: true,
    stockCount: 8,
    bookedDates: ["2026-05-20"], 
    description: "Traditional hand-woven cotton saree, perfect for office wear or formal events."
  },
  {
    id: "s3",
    name: "Midnight Sparkle Designer",
    category: "Designer Party",
    images: ["/saree3.jpg", "/party1-2.jpg"],
    purchasePrice: 35000,
    rentPricePerDay: 4500,
    isAvailableForRent: true,
    isAvailableForPurchase: false, 
    stockCount: 2,
    bookedDates: ["2026-06-01", "2026-06-02"], 
    description: "Modern designer saree with heavy sequin work for grand evening parties."
  },
  {
    id: "s4",
    name: "Crimson Bridal Kandyan",
    category: "Bridal Wear",
    images: ["/saree4.jpg", "/bridal1-2.jpg"],
    purchasePrice: 65000,
    rentPricePerDay: 8000,
    isAvailableForRent: true,
    isAvailableForPurchase: true,
    stockCount: 3,
    bookedDates: [], 
    description: "A breathtaking crimson bridal Kandyan saree with intricate gold embroidery."
  },

  // --- JEWELLERIES SECTION ---
  {
    id: "j1",
    name: "Golden Temple Choker Set",
    category: "Jewelleries",
    images: ["/jewel1.jpg"],
    purchasePrice: 18500,
    rentPricePerDay: 1500,
    isAvailableForRent: true,
    isAvailableForPurchase: true,
    stockCount: 5,
    bookedDates: [],
    description: "Traditional south indian style temple jewellery set with matte gold finish."
  },
  {
    id: "j2",
    name: "Silver Oxidized Bangles",
    category: "Jewelleries",
    images: ["/jewel2.jpg"],
    purchasePrice: 4500,
    rentPricePerDay: 500,
    isAvailableForRent: true,
    isAvailableForPurchase: true,
    stockCount: 12,
    bookedDates: [],
    description: "Elegant oxidized silver bangles that match perfectly with handloom sarees."
  },
  {
    id: "j3",
    name: "Royal Emerald Bridal Haram",
    category: "Jewelleries",
    images: ["/jewel3.jpg"],
    purchasePrice: 42000,
    rentPricePerDay: 5500,
    isAvailableForRent: true,
    isAvailableForPurchase: true,
    stockCount: 2,
    bookedDates: ["2026-05-25"], 
    description: "A grand multi-layered bridal necklace featuring premium green emerald stones and pearl drops."
  },
  {
    id: "j4",
    name: "Antique Jhumka Earrings",
    category: "Jewelleries",
    images: ["/jewel4.jpg"],
    purchasePrice: 6800,
    rentPricePerDay: 800,
    isAvailableForRent: true,
    isAvailableForPurchase: true,
    stockCount: 15,
    bookedDates: [], 
    description: "Intricately designed antique gold-plated jhumkas with ruby stone embellishments."
  }
];