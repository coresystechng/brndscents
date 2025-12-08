// components/admin/VendorsManager.jsx

import React, { useState } from 'react';
// Assuming these are coming from a library like 'lucide-react'
import { Truck, Users, Download, Printer } from 'lucide-react';
import formatCurrency from '../../utils/formatCurrency';

const VendorsManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Placeholder for VENDORS_DATA
  const VENDORS_DATA = [];

  const filteredVendors = VENDORS_DATA.filter(vendor => 
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid p-0">
      {/* Header Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h5 className="card-title mb-3 d-flex align-items-center text-dark font-weight-bold">
                <Truck className="text-brand me-2" size={24} /> Vendor Management
              </h5>
              <p className="text-muted mb-0">Manage your suppliers and vendors</p>
            </div>
            <div className="col-md-4 text-end">
              <button className="btn btn-brand font-weight-bold">
                <Users size={18} className="me-2" />
                Add New Vendor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-md-12">
              <label className="form-label small text-muted text-uppercase font-weight-bold">Search Vendors</label>
              <input 
                type="text" 
                className="form-control bg-light border-0" 
                placeholder="Search by name or category..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Vendors List / Empty State */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h6 className="mb-0 font-weight-bold">Vendors Directory ({filteredVendors.length})</h6>
          <div className="btn-group">
            <button className="btn btn-link text-secondary"><Download size={20} /></button>
            <button className="btn btn-link text-secondary"><Printer size={20} /></button>
          </div>
        </div>
        <div className="card-body">
          {filteredVendors.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-4">
                <Truck size={64} className="text-muted opacity-25" />
              </div>
              <h5 className="text-dark mb-2">No Vendors Yet</h5>
              <p className="text-muted mb-4">Start by adding your first vendor to track suppliers and manage relationships.</p>
              <button className="btn btn-brand font-weight-bold px-4">
                <Users size={18} className="me-2" />
                Add Your First Vendor
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead className="bg-light text-muted text-uppercase small">
                  <tr>
                    <th className="px-4 py-3">Vendor Name</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3 text-end">Total Orders</th>
                    <th className="px-4 py-3 text-end">Total Spent</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Since VENDORS_DATA is empty, this tbody will not render. */}
                  {/* If populated, it would look like this: */}
                  {/* {filteredVendors.map(vendor => (
                    <tr key={vendor.id}>
                      <td className="px-4 fw-medium">{vendor.name}</td>
                      <td className="px-4 text-muted">{vendor.category}</td>
                      <td className="px-4 text-muted small">{vendor.contact}</td>
                      <td className="px-4 text-end">{vendor.totalOrders}</td>
                      <td className="px-4 text-end fw-bold">{formatCurrency(vendor.totalSpent)}</td>
                      <td className="px-4">
                        <button className="btn btn-sm btn-outline-secondary">View</button>
                      </td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorsManager;