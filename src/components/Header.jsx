// components/public/HeroSection.jsx

import React from 'react';
// Assuming ExternalLink is coming from a library like 'lucide-react'
import { ExternalLink } from 'lucide-react';

// NOTE: You must define or import 'heroBg' in the file where you use the HeroSection component.
const heroBg = '...'; // Placeholder for your actual import/variable

const HeroSection = () => (
  <div
    className="hero-section position-relative py-5 overflow-hidden"
    style={{
      backgroundImage: `url(${heroBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
    data-aos="fade-up"
  >
    <div className="position-absolute w-100 h-100" style={{background: '#850e9734', top: 0, left: 0}} />
    <div className="container py-5" style={{position: 'relative', zIndex: 1}}>
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="display-4 mb-4 fw-bold text-white">Scent of <br/> <span className="text-light">Distinction.</span></h1>
          <p className="lead text-light mb-5">Curated fragrances. Authentic. Timeless.</p>
          <button className="btn btn-brand btn-lg px-5 py-3 text-uppercase font-weight-bold shadow-lg d-flex align-items-center">
            <span>Shop Now</span>
            <ExternalLink size={18} className='ms-2'/>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;