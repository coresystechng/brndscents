// components/admin/ExpenditureManager.jsx

import React, { useState } from 'react';
// Assuming these are coming from a library like 'lucide-react'
import { Wallet, Download, Printer } from 'lucide-react';
import formatCurrency from '../../utils/formatCurrency';

// NOTE: EXPENDITURE_DATA must be imported or defined in the final usage file.
// Placeholder for dummy data
const EXPENDITURE_DATA = [
    { id: 101, date: '2025-11-28', description: 'Purchase of new oud oil stock', vendor: 'Global Scents Ltd', tag: 'purchases', amount: 500000 },
    { id: 102, date: '2025-11-29', description: 'Monthly salary payout for staff', vendor: 'Staff Account', tag: 'payout', amount: 180000 },
    { id: 103, date: '2025-11-29', description: 'Lagos delivery service fee', vendor: 'ABC Logistics', tag: 'delivery', amount: 15000 },
    { id: 104, date: '2025-11-30', description: 'Branded box and packaging materials', vendor: 'BoxCo Ltd', tag: 'packaging', amount: 40000 },
    { id: 105, date: '2025-11-30', description: 'Office supplies (paper, ink)', vendor: 'Office Depot', tag: 'misc', amount: 5000 },
];


const ExpenditureManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const tags = [
    { value: "all", label: "All Expenditures", color: "secondary" },
    { value: "purchases", label: "Purchases", color: "primary" },
    { value: "payout", label: "Payout", color: "success" },
    { value: "delivery", label: "Delivery", color: "info" },
    { value: "packaging", label: "Packaging", color: "warning" },
    { value: "misc", label: "Miscellaneous", color: "dark" },
  ];

  const filteredExpenditures = EXPENDITURE_DATA.filter(exp => {
    const matchesSearch = exp.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          exp.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "all" || exp.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  const totalExpenditure = filteredExpenditures.reduce((acc, exp) => acc + exp.amount, 0);

  const getTagColor = (tag) => {
    const tagObj = tags.find(t => t.value === tag);
    return tagObj ? tagObj.color : "secondary";
  };

  return (
    <div className="container-fluid p-0">
      {/* Header Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h5 className="card-title mb-3 d-flex align-items-center text-dark font-weight-bold">
                <Wallet className="text-brand me-2" size={24} /> Expenditure Management
              </h5>
              <p className="text-muted mb-0">Track and manage all business expenditures</p>
            </div>
            <div className="col-md-4 text-end">
              <div className="p-3 bg-light rounded border">
                <div className="text-muted small text-uppercase fw-bold mb-1">Total Filtered</div>
                <div className="h4 fw-bold text-danger mb-0">{formatCurrency(totalExpenditure)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small text-muted text-uppercase font-weight-bold">Search</label>
              <input 
                type="text" 
                className="form-control bg-light border-0" 
                placeholder="Search description or vendor..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small text-muted text-uppercase font-weight-bold">Filter by Tag</label>
              <div className="d-flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag.value}
                    onClick={() => setSelectedTag(tag.value)}
                    className={`btn btn-sm ${selectedTag === tag.value ? `btn-${tag.color}` : 'btn-outline-secondary'}`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expenditure List */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h6 className="mb-0 font-weight-bold">Expenditure Records ({filteredExpenditures.length})</h6>
          <div className="btn-group">
            <button className="btn btn-link text-secondary"><Download size={20} /></button>
            <button className="btn btn-link text-secondary"><Printer size={20} /></button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="bg-light text-muted text-uppercase small">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Vendor</th>
                <th className="px-4 py-3">Tag</th>
                <th className="px-4 py-3 text-end">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenditures.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    <Wallet size={48} className="mb-2 opacity-25" />
                    <p>No expenditures found</p>
                  </td>
                </tr>
              ) : (
                filteredExpenditures.map(exp => (
                  <tr key={exp.id}>
                    <td className="px-4 text-muted small">{exp.date}</td>
                    <td className="px-4 fw-medium">{exp.description}</td>
                    <td className="px-4 text-muted">{exp.vendor}</td>
                    <td className="px-4">
                      <span className={`badge bg-${getTagColor(exp.tag)} text-white px-3 py-1 rounded-pill text-uppercase small`}>
                        {exp.tag}
                      </span>
                    </td>
                    <td className="px-4 text-end fw-bold text-danger">{formatCurrency(exp.amount)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenditureManager;