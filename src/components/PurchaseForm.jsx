// components/admin/StockIntake.jsx

import React, { useState } from 'react';
// Assuming Package is coming from a library like 'lucide-react'
import { Package } from 'lucide-react'; 

const StockIntake = ({ products, onUpdateStock }) => {
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedId || quantity <= 0) return;
    onUpdateStock(parseInt(selectedId), parseInt(quantity));
    setSelectedId("");
    setQuantity(0);
    alert("Stock updated successfully!");
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <h5 className="card-title mb-4 d-flex align-items-center text-dark font-weight-bold">
          <Package className="text-brand me-2" size={20} /> Receive Stock / Update Inventory
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-3 align-items-end">
            <div className="col-md-6">
              <label className="form-label small text-muted text-uppercase font-weight-bold">Product</label>
              <select 
                className="form-select bg-light border-0"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
              >
                <option value="">Select Product...</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name} (Current: {p.stock})</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small text-muted text-uppercase font-weight-bold">Quantity Received</label>
              <input 
                type="number" 
                min="1"
                className="form-control bg-light border-0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <button 
                type="submit"
                className="btn btn-success w-100 font-weight-bold text-uppercase"
                style={{backgroundColor: '#3c763d', borderColor: '#3c763d'}}
              >
                Update Stock
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockIntake;