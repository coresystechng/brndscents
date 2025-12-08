// components/public/PublicNavbar.jsx

import React, { useState } from 'react';
// Assuming these are coming from a library like 'lucide-react' or similar
import { Store, Gift, LogIn, Menu } from 'lucide-react'; 

const PublicNavbar = ({ onSwitch }) => {
  const [imgError, setImgError] = useState(false);
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top border-bottom shadow-sm py-3">
      <div className="container">
        <div className="d-flex align-items-center">
          <div className="navbar-brand d-flex align-items-center">
            {!imgError ? (
              <img src="./src/assets/logo-purple.png" alt="BRNDSCENTS" style={{height: '30px'}} onError={() => setImgError(true)} />
            ) : (
              <div className="h3 mb-0 font-weight-bold text-brand">BRNDSCENTS</div>
            )}
          </div>
        </div>

        <div className="d-none d-md-flex align-items-center gap-4">
          <a  href="#" 
              className="text-decoration-none text-secondary text-uppercase small d-flex align-items-center gap-2">
              <Store size={18} strokeWidth={1.5}/>
              <span>Shop</span>
          </a>
          <a  href="#"
              className="text-decoration-none text-secondary text-uppercase small d-flex align-items-center gap-2">
              <Gift size={18} strokeWidth={1.5} />
              <span>New Arrivals</span>
          </a>
          <button onClick={onSwitch} className="btn btn-brand btn-sm text-uppercase font-weight-bold px-3 py-2 rounded-2 d-flex align-items-center gap-1">
            <span className='me-2'> Login</span>
            <LogIn size={18} />
          </button>
        </div>

        {/* Mobile toggler on the right */}
        <div className="d-md-none ms-auto">
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileSidebar" aria-controls="mobileSidebar" aria-label="Open menu">
            <Menu />
          </button>
        </div>

        {/* Offcanvas mobile sidebar (simplified) */}
        <div className="offcanvas offcanvas-start d-md-none" tabIndex="-1" id="mobileSidebar" aria-labelledby="mobileSidebarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="mobileSidebarLabel">Menu</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <div className="mb-3">
              <input type="search" className="form-control" placeholder="Search products..." />
            </div>
            <ul className="list-unstyled">
              <li className="py-2"><a href="#" className="text-decoration-none text-dark d-flex align-items-center gap-2"><Store size={18}/><span>Shop</span></a></li>
              <li className="py-2"><a href="#" className="text-decoration-none text-dark d-flex align-items-center gap-2"><Gift size={18}/><span>New Arrivals</span></a></li>
            </ul>
            <div className="mt-4">
              <button onClick={onSwitch} className="btn btn-outline-secondary w-100 bg-brand py-2">
                <span className='me-2'> Login</span>
                <LogIn size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;