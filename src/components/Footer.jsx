// components/public/Footer.jsx

import React from 'react';

const Footer = () => (
  <footer className="bg-body-tertiary border-top mt-5" data-aos="fade-up">
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4 mb-4">
          <h5 className="fw-bold text-brand">BRNDSCENTS</h5>
          <p className="text-muted small">Curated fragrances and home scents crafted for distinction. Shop authentic perfumes, oils and accessories.</p>
        </div>
        <div className="col-md-2 mb-4">
          <h6 className="fw-bold small text-uppercase text-muted">Shop</h6>
          <ul className="list-unstyled small">
            <li className='py-1'><a href="#" className="text-decoration-none text-muted"><i className="bi bi-boxes me-2"></i>All Products</a></li>
            <li className='py-1'><a href="#" className="text-decoration-none text-muted"><i className="bi bi-box-seam me-2"></i>New Arrivals</a></li>
            <li className='py-1'><a href="#" className="text-decoration-none text-muted"><i className="bi bi-star me-2"></i>Best Sellers</a></li>
          </ul>
        </div>
        <div className="col-md-2 mb-4">
          <h6 className="fw-bold small text-uppercase text-muted">Customer</h6>
          <ul className="list-unstyled small">
            <li className='py-1'><a href="#" className="text-decoration-none text-muted"><i className="bi bi-truck me-2"></i>Delivery & Shipping</a></li>
            <li className='py-1'><a href="#" className="text-decoration-none text-muted"><i className="bi bi-list-check me-2"></i>FAQs</a></li>
            <li className='py-1'><a href="#" className="text-decoration-none text-muted"><i className="bi bi-arrow-clockwise me-2"></i>Return Policy</a></li>
          </ul>
        </div>
        <div className="col-md-2 mb-4">
          <h6 className="fw-bold small text-uppercase text-muted">Social</h6>
          <ul className="list-unstyled small">
            <li className='py-1'><a href="https://instagram.com/brndscents" target='_blank' className="text-decoration-none text-muted"><i className="bi bi-instagram me-2"></i>Instagram</a></li>
            <li className='py-1'><a href="https://wa.me/+2348034671375" className="text-decoration-none text-muted"><i className="bi bi-whatsapp me-2"></i>WhatsApp</a></li>
            <li className='py-1'><a href="https://x.com/brndscents" className="text-decoration-none text-muted"><i className="bi bi-twitter-x me-2"></i>Twitter</a></li>
          </ul>
        </div>
        <div className="col-md-2 mb-4">
          <h6 className="fw-bold small text-uppercase text-muted">Contact</h6>
          <ul className="list-unstyled mb-4">
            <li className="py-1"><a href='#' className="text-decoration-none small text-muted"><i className="bi bi-geo-alt me-2"></i>Abuja, FCT</a></li>
            <li className="py-1"><a href='#' className="text-decoration-none small text-muted"><i className="bi bi-envelope me-2"></i>brndscents@gmail.com</a></li>
            <li className="py-1"><a href='#' className="text-decoration-none small text-muted"><i className="bi bi-telephone me-2"></i>+234 803 467 1375</a></li>
          </ul>
        </div>
      </div>

      <div className="pt-4 border-top mt-4 d-flex justify-content-between align-items-center">
        <div className="small text-muted">© {new Date().getFullYear()} BRNDSCENTS. All rights reserved.</div>
        <div className="small text-muted d-none d-md-block">Built by <a href="https://coresystech.ng" target='_blank' className='text-muted'>CORE-TECH <i className='bi bi-link-45deg'></i></a></div>
      </div>
    </div>
  </footer>
);

export default Footer;