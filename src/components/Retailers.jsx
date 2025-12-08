// components/admin/RetailersManager.jsx

import React, { useState } from 'react';
// Assuming these are coming from a library like 'lucide-react'
import { Store, MapPin } from 'lucide-react'; 
import formatCurrency from '../../utils/formatCurrency'; 

// NOTE: RETAILERS_DATA must be imported or defined in the final usage file.
// Placeholder for dummy data
const RETAILERS_DATA = [
  { id: 1, firstName: 'Aisha', surname: 'Bello', otherNames: 'Limited', code: 'RTLA001', state: 'Lagos', location: 'Ikeja', phone: '080...', email: 'aisha@example.com', performance: 'Excellent', totalOrders: 58, totalSales: 8500000, totalProfit: 1250000, photo: 'https://via.placeholder.com/100/A63493/FFFFFF?text=AB' },
  { id: 2, firstName: 'Chidi', surname: 'Eze', otherNames: 'Ventures', code: 'RTLC002', state: 'Abuja', location: 'Wuse 2', phone: '070...', email: 'chidi@example.com', performance: 'Good', totalOrders: 32, totalSales: 4100000, totalProfit: 600000, photo: 'https://via.placeholder.com/100/5C7CFA/FFFFFF?text=CE' },
  { id: 3, firstName: 'Bolu', surname: 'Taiwo', otherNames: 'Stores', code: 'RTLB003', state: 'Oyo', location: 'Challenge', phone: '090...', email: 'bolu@example.com', performance: 'Poor', totalOrders: 15, totalSales: 1500000, totalProfit: 200000, photo: 'https://via.placeholder.com/100/3c763d/FFFFFF?text=BT' },
];


const RetailersManager = () => {
  const [selectedRetailer, setSelectedRetailer] = useState(RETAILERS_DATA[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRetailers = RETAILERS_DATA.filter(r => 
    r.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="row g-4 h-100">
      {/* List Column */}
      <div className="col-lg-4 d-flex flex-column">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-header bg-white py-3">
            <h6 className="mb-3 font-weight-bold d-flex align-items-center">
              <Store className="text-brand me-2" size={20} /> Retailers Directory
            </h6>
            <input 
              type="text" 
              className="form-control bg-light border-0" 
              placeholder="Search name or code..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="list-group list-group-flush overflow-auto flex-grow-1">
            {filteredRetailers.map(retailer => (
              <button 
                key={retailer.id}
                onClick={() => setSelectedRetailer(retailer)}
                className={`list-group-item list-group-item-action py-3 px-4 border-bottom ${selectedRetailer?.id === retailer.id ? 'bg-brand-light border-start border-4 border-brand' : ''}`}
                style={selectedRetailer?.id === retailer.id ? {backgroundColor: '#f3e5f5', borderColor: '#a63493'} : {}}
              >
                <div className="d-flex align-items-center">
                  <img src={retailer.photo} alt={retailer.firstName} className="rounded-circle me-3" width="40" height="40" />
                  <div>
                    <div className="fw-bold text-dark">{retailer.firstName} {retailer.surname}</div>
                    <div className="small text-muted">{retailer.code} • {retailer.state}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Column */}
      <div className="col-lg-8">
        {selectedRetailer ? (
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-5">
              {/* Header Profile */}
              <div className="d-flex align-items-start justify-content-between mb-5">
                <div className="d-flex align-items-center">
                  <img 
                    src={selectedRetailer.photo} 
                    alt={selectedRetailer.firstName} 
                    className="rounded-circle shadow-sm me-4" 
                    width="100" 
                    height="100" 
                  />
                  <div>
                    <h2 className="fw-bold text-brand mb-1">{selectedRetailer.firstName} {selectedRetailer.surname}</h2>
                    <p className="text-muted mb-2">{selectedRetailer.otherNames}</p>
                    <div className="d-flex gap-2">
                      <span className="badge bg-dark text-white px-3 py-2 rounded-pill">{selectedRetailer.code}</span>
                      <span className={`badge px-3 py-2 rounded-pill ${
                        selectedRetailer.performance === 'Excellent' ? 'bg-success' : 
                        selectedRetailer.performance === 'Good' ? 'bg-primary' : 'bg-warning text-dark'
                      }`}>
                        {selectedRetailer.performance} Performance
                      </span>
                    </div>
                  </div>
                </div>
                <button className="btn btn-outline-secondary btn-sm">Edit Profile</button>
              </div>

              {/* Stats Grid */}
              <div className="row g-4 mb-5">
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded text-center border">
                    <div className="text-muted small text-uppercase fw-bold mb-1">Total Orders</div>
                    <div className="h3 fw-bold text-dark mb-0">{selectedRetailer.totalOrders}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded text-center border">
                    <div className="text-muted small text-uppercase fw-bold mb-1">Total Sales</div>
                    <div className="h3 fw-bold text-brand mb-0">{formatCurrency(selectedRetailer.totalSales)}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded text-center border">
                    <div className="text-muted small text-uppercase fw-bold mb-1">Total Profit</div>
                    <div className="h3 fw-bold text-success mb-0">{formatCurrency(selectedRetailer.totalProfit)}</div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <h5 className="fw-bold border-bottom pb-2 mb-4">Contact Information</h5>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="small text-muted text-uppercase fw-bold">Location</label>
                  <div className="d-flex align-items-center mt-1">
                    <MapPin size={18} className="text-brand me-2" />
                    <span className="fw-medium">{selectedRetailer.location}</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="small text-muted text-uppercase fw-bold">State</label>
                  <div className="fw-medium mt-1">{selectedRetailer.state}</div>
                </div>
                <div className="col-md-6">
                  <label className="small text-muted text-uppercase fw-bold">Telephone</label>
                  <div className="fw-medium mt-1">{selectedRetailer.phone}</div>
                </div>
                <div className="col-md-6">
                  <label className="small text-muted text-uppercase fw-bold">Email Address</label>
                  <div className="fw-medium mt-1 text-brand">{selectedRetailer.email}</div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted bg-white rounded border shadow-sm">
            <Store size={64} className="mb-3 opacity-25" />
            <p>Select a retailer to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetailersManager;