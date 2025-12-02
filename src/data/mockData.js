// --- MOCK DATA FOR BRNDSCENTS APPLICATION ---

export const INITIAL_PRODUCTS = [
  { id: 6, name: "Mosuf 30ml", price: 4000, cost: 3700, stock: 12, category: "Perfume", status: "Low Stock", img_url: './src/assets/mosuf-30ml.jpg' },
  { id: 2, name: "Atomisers 5ml", price: 1500, cost: 1300, stock: 12, category: "Accessory", status: "Low Stock", img_url: './src/assets/atomisers-5ml.jpg' },
  { id: 15, name: "Body Mist 250ml", price: 7000, cost: 6500, stock: 5, category: "Perfume", status: "Low Stock", img_url: './src/assets/bodymist-250ml.jpg'},
  { id: 3, name: "FA Oil Perfume 10ml", price: 2000, cost: 1750, stock: 30, category: "Oil", status: "In Stock", img_url: './src/assets/fa-10ml.jpg'},
  { id: 14, name: "Bre Tres 100ml", price: 4000, cost: 3500, stock: 2, category: "Perfume", status: "Low Stock", img_url: './src/assets/BE-TRES-100ml.jpg'},
  { id: 5, name: "FA Oil Perfume 24ml", price: 4500, cost: 4200, stock: 5, category: "Oil", status: "Low Stock", img_url: './src/assets/fa-24ml.jpg' },
  { id: 4, name: "Naseem 24ml", price: 4500, cost: 4200, stock: 11, category: "Perfume", status: "Low Stock" },
  { id: 1, name: "Touch 5ml", price: 1500, cost: 1300, stock: 78, category: "Mini", status: "In Stock" },
  { id: 7, name: "Pendora Scents 30ml", price: 4500, cost: 4000, stock: 1, category: "Perfume", status: "Low Stock" },
  { id: 8, name: "Novaa Suger 30ml", price: 5500, cost: 5000, stock: 15, category: "Perfume", status: "In Stock" },
  { id: 9, name: "Official Crystal 35ml", price: 5000, cost: 4500, stock: 17, category: "Perfume", status: "In Stock" },
  { id: 10, name: "Air Magic Air Freshener 42g", price: 3500, cost: 3000, stock: 5, category: "Home", status: "Low Stock" },
  { id: 11, name: "Choco Musk 50ml", price: 6000, cost: 5500, stock: 2, category: "Gourmand", status: "Low Stock" },
  { id: 12, name: "Interesting She 50ml", price: 6000, cost: 5500, stock: 3, category: "Perfume", status: "Low Stock" },
  { id: 13, name: "Monogotas 100ml", price: 4000, cost: 3500, stock: 2, category: "Perfume", status: "Low Stock" },
];

export const DASHBOARD_DATA = {
  totalSales: 2500000,
  totalPurchases: 1200000,
  expenses: 450000,
  netProfit: 850000,
  retailerSales: [
    { name: "Beauty Plus", sales: 450000, growth: 12 },
    { name: "Scent World", sales: 320000, growth: -5 },
    { name: "Luxe Fragrances", sales: 280000, growth: 8 },
    { name: "Essence Store", sales: 150000, growth: 24 },
  ],
  recentExpenses: [
    { id: 1, desc: "Packaging Materials", amount: 150000, date: "2023-11-20", category: "Operations" },
    { id: 2, desc: "Logistics / Delivery", amount: 45000, date: "2023-11-22", category: "Shipping" },
    { id: 3, desc: "Marketing Ads", amount: 120000, date: "2023-11-23", category: "Marketing" },
    { id: 4, desc: "Store Utilities", amount: 35000, date: "2023-11-24", category: "Utilities" },
  ],
  topVendors: [
    { id: 1, name: "Fragrance Suppliers Ltd", totalSpent: 850000, orders: 12, lastActive: "2 days ago" },
    { id: 2, name: "PackPro Nigeria", totalSpent: 245000, orders: 8, lastActive: "1 week ago" },
    { id: 3, name: "Swift Logistics", totalSpent: 120000, orders: 15, lastActive: "3 days ago" },
    { id: 4, name: "Digital Ads Agency", totalSpent: 120000, orders: 4, lastActive: "Yesterday" },
  ]
};

export const RETAILERS_DATA = [
  { 
    id: 1, 
    firstName: "Chioma", 
    surname: "Okeke", 
    otherNames: "Grace",
    code: "RET-001", 
    location: "Lekki Phase 1", 
    state: "Lagos", 
    phone: "+234 801 234 5678", 
    email: "chioma.okeke@beautyplus.com", 
    totalOrders: 45, 
    totalSales: 450000, 
    totalProfit: 120000, 
    performance: "Excellent",
    photo: "https://ui-avatars.com/api/?name=Chioma+Okeke&background=a63493&color=fff"
  },
  { 
    id: 2, 
    firstName: "Emmanuel", 
    surname: "Adeyemi", 
    otherNames: "",
    code: "RET-002", 
    location: "Wuse Zone 2", 
    state: "Abuja", 
    phone: "+234 802 987 6543", 
    email: "emmanuel.a@scentworld.com", 
    totalOrders: 28, 
    totalSales: 320000, 
    totalProfit: 85000, 
    performance: "Average",
    photo: "https://ui-avatars.com/api/?name=Emmanuel+Adeyemi&background=3c763d&color=fff"
  },
  { 
    id: 3, 
    firstName: "Aisha", 
    surname: "Bello", 
    otherNames: "Zainab",
    code: "RET-003", 
    location: "Kano City", 
    state: "Kano", 
    phone: "+234 803 555 1212", 
    email: "aisha.b@luxestore.com", 
    totalOrders: 12, 
    totalSales: 150000, 
    totalProfit: 40000, 
    performance: "Good",
    photo: "https://ui-avatars.com/api/?name=Aisha+Bello&background=f0ad4e&color=fff"
  },
];

export const EXPENDITURE_DATA = [
  { id: 1, description: "Perfume Stock Purchase", amount: 850000, date: "2023-11-20", tag: "purchases", vendor: "Fragrance Suppliers Ltd" },
  { id: 2, description: "Staff Salary - November", amount: 320000, date: "2023-11-22", tag: "payout", vendor: "Payroll" },
  { id: 3, description: "Delivery to Retailers", amount: 45000, date: "2023-11-23", tag: "delivery", vendor: "Swift Logistics" },
  { id: 4, description: "Packaging Materials", amount: 150000, date: "2023-11-20", tag: "packaging", vendor: "PackPro Nigeria" },
  { id: 5, description: "Office Rent - November", amount: 200000, date: "2023-11-01", tag: "misc", vendor: "Property Manager" },
  { id: 6, description: "Marketing Campaign", amount: 120000, date: "2023-11-15", tag: "misc", vendor: "Digital Ads Agency" },
  { id: 7, description: "Atomizer Stock", amount: 180000, date: "2023-11-18", tag: "purchases", vendor: "Accessory Wholesale" },
  { id: 8, description: "Freelance Designer", amount: 50000, date: "2023-11-19", tag: "payout", vendor: "Creative Studio" },
  { id: 9, description: "Interstate Delivery", amount: 75000, date: "2023-11-21", tag: "delivery", vendor: "Express Couriers" },
  { id: 10, description: "Gift Boxes & Wrapping", amount: 95000, date: "2023-11-17", tag: "packaging", vendor: "Luxury Packaging Co" },
  { id: 11, description: "Utilities Bill", amount: 35000, date: "2023-11-10", tag: "misc", vendor: "PHCN" },
  { id: 12, description: "Oil Perfume Restock", amount: 420000, date: "2023-11-12", tag: "purchases", vendor: "Premium Oils Import" },
];
