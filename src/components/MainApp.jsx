// MainApp.jsx (Example Parent Component)

import React, { useState, useEffect } from 'react';

// --- UTILS IMPORTS ---
import formatCurrency from './utils/formatCurrency';

// --- PUBLIC COMPONENT IMPORTS ---
import PublicNavbar from './components/public/PublicNavbar';
import HeroSection from './components/public/HeroSection';
import Footer from './components/public/Footer';

// --- ADMIN COMPONENT IMPORTS ---
// import SidebarItem from './components/admin/SidebarItem'; // Only needed if MainApp uses it
import StockIntake from './components/admin/StockIntake';
import POSSystem from './components/admin/POSSystem';

// Dummy data for example
const initialProducts = [
  { id: 1, name: 'Santal 33 Clone', price: 45000, stock: 50 },
  { id: 2, name: 'Baccarat 540 Extrait', price: 120000, stock: 20 },
  { id: 3, name: 'Vanilla Home Diffuser', price: 15000, stock: 100 },
];

const MainApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState(initialProducts);

  const handleSwitch = () => setIsLoggedIn(prev => !prev);

  const handleUpdateStock = (productId, quantity) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, stock: p.stock + quantity } : p
    ));
  };
  
  // Example of using the components
  return (
    <div>
      {/* Public View */}
      {!isLoggedIn && (
        <>
          <PublicNavbar onSwitch={handleSwitch} />
          <HeroSection />
          {/* ... other public content ... */}
          <Footer />
        </>
      )}

      {/* Admin View */}
      {isLoggedIn && (
        <div className="container py-5">
          <h1>Admin Dashboard</h1>
          
          <div className="mb-5">
            <StockIntake products={products} onUpdateStock={handleUpdateStock} />
          </div>

          <div className="mb-5">
            <POSSystem products={products} />
          </div>

          <button onClick={handleSwitch} className="btn btn-danger">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default MainApp;