// components/admin/POSSystem.jsx

import React, { useState } from 'react';
// Assuming these are coming from a library like 'lucide-react'
import { ShoppingBag, Trash2, Printer, FileText } from 'lucide-react';
import formatCurrency from '../../utils/formatCurrency'; 

const POSSystem = ({ products }) => {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [docType, setDocType] = useState("Receipt");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [qty, setQty] = useState(1);
  const [generatedDoc, setGeneratedDoc] = useState(null);

  const addToCart = () => {
    if(!selectedProduct) return;
    const prod = products.find(p => p.id === parseInt(selectedProduct));
    const existing = cart.find(item => item.id === prod.id);
    
    if (existing) {
      setCart(cart.map(item => item.id === prod.id ? {...item, qty: item.qty + parseInt(qty)} : item));
    } else {
      setCart([...cart, { ...prod, qty: parseInt(qty) }]);
    }
    setQty(1);
    setSelectedProduct("");
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const calculateTotal = () => cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const generateDocument = () => {
    if (cart.length === 0) return alert("Cart is empty");
    setGeneratedDoc({
      id: "DOC-" + Math.floor(Math.random() * 10000),
      date: new Date().toLocaleDateString(),
      customer: customerName || "Walk-in Customer",
      items: cart,
      total: calculateTotal(),
      type: docType
    });
  };

  const printDocument = () => {
    window.print();
  };

  // --- Document View Sub-Component (Kept inline for simplicity, but could be separated as DocumentPreview.jsx)
  if (generatedDoc) {
    return (
      <div className="d-flex flex-column h-100 bg-light p-4 align-items-center overflow-auto">
        <div className="bg-white p-5 shadow mb-4 print-w-100" style={{maxWidth: '800px', width: '100%'}}>
          {/* Document Header */}
          <div className="d-flex justify-content-between align-items-start border-bottom pb-4 mb-4">
            <div>
              <h1 className="h2 font-weight-bold text-brand mb-1">BRNDSCENTS</h1>
              <p className="text-muted mb-0">Official {generatedDoc.type}</p>
              <small className="text-muted">Doc ID: {generatedDoc.id}</small>
            </div>
            <div className="text-end">
              <p className="font-weight-bold mb-0">Date: {generatedDoc.date}</p>
              <p className="text-muted">Bill To: {generatedDoc.customer}</p>
            </div>
          </div>

          {/* Table */}
          <table className="table table-borderless mb-5">
            <thead className="bg-light text-muted text-uppercase small">
              <tr>
                <th>Item</th>
                <th className="text-end">Qty</th>
                <th className="text-end">Price</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>
            <tbody>
              {generatedDoc.items.map((item, idx) => (
                <tr key={idx} className="border-bottom">
                  <td>{item.name}</td>
                  <td className="text-end text-muted">{item.qty}</td>
                  <td className="text-end text-muted">{formatCurrency(item.price)}</td>
                  <td className="text-end font-weight-bold">{formatCurrency(item.price * item.qty)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total */}
          <div className="d-flex justify-content-end pt-3">
            <div style={{width: '250px'}}>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span className="font-weight-bold">{formatCurrency(generatedDoc.total)}</span>
              </div>
              <div className="d-flex justify-content-between h4 text-brand font-weight-bold border-top pt-2">
                <span>Total</span>
                <span>{formatCurrency(generatedDoc.total)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 text-center text-muted small">
            <p className="mb-1">Thank you for shopping with BRNDSCENTS.</p>
            <p>For inquiries, contact us at support@brndscents.com</p>
          </div>
        </div>

        <div className="d-flex gap-3 no-print">
          <button onClick={() => setGeneratedDoc(null)} className="btn btn-light font-weight-bold">Create New</button>
          <button onClick={printDocument} className="btn btn-brand font-weight-bold d-flex align-items-center">
            <Printer size={18} className="me-2" /> Print {generatedDoc.type}
          </button>
        </div>
      </div>
    );
  }
  // --- End Document View Sub-Component

  return (
    <div className="row h-100 g-4">
      {/* Left: Product Selection */}
      <div className="col-lg-8 d-flex flex-column">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-header bg-white border-bottom-0 pt-4 px-4">
            <h5 className="font-weight-bold d-flex align-items-center text-dark">
              <ShoppingBag className="text-brand me-2" size={20} /> New Sale
            </h5>
          </div>
          <div className="card-body px-4 d-flex flex-column">
            <div className="row g-3 mb-4">
              <div className="col-12">
                <label className="small text-muted text-uppercase font-weight-bold">Customer / Retailer Name</label>
                <input 
                  type="text" 
                  className="form-control bg-light border-0" 
                  placeholder="E.g. John Doe or Retail Store A"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className="col-md-8">
                <label className="small text-muted text-uppercase font-weight-bold">Select Product</label>
                <select 
                  className="form-select bg-light border-0"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">Choose item...</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} - {formatCurrency(p.price)}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 d-flex align-items-end gap-2">
                <div className="flex-grow-1">
                  <label className="small text-muted text-uppercase font-weight-bold">Qty</label>
                  <input 
                    type="number" 
                    min="1" 
                    className="form-control bg-light border-0"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />
                </div>
                <button 
                  onClick={addToCart}
                  className="btn btn-dark font-weight-bold"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex-grow-1 bg-light rounded p-3 overflow-auto">
              {cart.length === 0 ? (
                <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted">
                  <ShoppingBag size={48} className="mb-2 opacity-25" />
                  <p>Cart is empty</p>
                </div>
              ) : (
                <table className="table table-sm table-borderless">
                  <thead className="text-muted text-uppercase small">
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th className="text-end">Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id} className="border-bottom">
                        <td className="fw-medium">{item.name}</td>
                        <td>{item.qty}</td>
                        <td className="text-end">{formatCurrency(item.price * item.qty)}</td>
                        <td className="text-end">
                          <Trash2 
                            size={16}
                            className="text-danger cursor-pointer" 
                            onClick={() => removeFromCart(item.id)}
                            style={{cursor: 'pointer'}}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Summary & Actions */}
      <div className="col-lg-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body p-4 d-flex flex-column justify-content-between">
            <div>
              <h5 className="font-weight-bold mb-4">Summary</h5>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Items Count</span>
                  <span className="font-weight-bold">{cart.reduce((a,c) => a + c.qty, 0)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-weight-bold">{formatCurrency(calculateTotal())}</span>
                </div>
                <div className="d-flex justify-content-between h4 text-brand font-weight-bold border-top pt-3 mt-3">
                  <span>Total</span>
                  <span>{formatCurrency(calculateTotal())}</span>
                </div>
              </div>

              <div className="mb-3">
                <label className="small text-muted text-uppercase font-weight-bold d-block mb-2">Document Type</label>
                <div className="btn-group w-100" role="group">
                  <button 
                    type="button"
                    onClick={() => setDocType("Receipt")}
                    className={`btn ${docType === 'Receipt' ? 'btn-outline-brand active' : 'btn-outline-secondary'}`}
                    style={docType === 'Receipt' ? {borderColor: '#a63493', backgroundColor: '#f3e5f5', color: '#a63493'} : {}}
                  >
                    Receipt
                  </button>
                  <button 
                    type="button"
                    onClick={() => setDocType("Invoice")}
                    className={`btn ${docType === 'Invoice' ? 'btn-outline-brand active' : 'btn-outline-secondary'}`}
                    style={docType === 'Invoice' ? {borderColor: '#a63493', backgroundColor: '#f3e5f5', color: '#a63493'} : {}}
                  >
                    Invoice
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={generateDocument}
              className="btn btn-success w-100 py-3 font-weight-bold text-uppercase d-flex align-items-center justify-content-center gap-2"
              style={{backgroundColor: '#3c763d', borderColor: '#3c763d'}}
            >
              <FileText size={20} /> Generate {docType}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSSystem;