import React, { useState } from 'react';
import { 
  ShoppingBag, 
  LayoutDashboard, 
  Package, 
  Users, 
  Truck, 
  LogIn,
  DollarSign, 
  LogOut, 
  Printer, 
  Trash2, 
  FileText,
  Download,
  Lock,
  Banknote,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CreditCard,
  Gift,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Store,
  CircleEllipsis,
  MapPin,
  Menu,
  Wallet,
  ShoppingBagIcon,
  ExternalLink
} from 'lucide-react';

import { INITIAL_PRODUCTS, DASHBOARD_DATA, RETAILERS_DATA, EXPENDITURE_DATA } from './data/mockData';
import heroBg from './assets/hero-bg.jpg';



// --- UTILS ---
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
};

// --- COMPONENTS ---

// 1. PUBLIC STOREFRONT COMPONENTS
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
            {/* <span className="navbar-toggler-icon"></span> */}
            <Menu />
          </button>
        </div>

        {/* Offcanvas mobile sidebar (simplified) */}
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileSidebar" aria-labelledby="mobileSidebarLabel">
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

// --- PUBLIC FOOTER ---
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
            <li className='py-1'><a href="#" className="text-decoration-none text-muted"><i class="bi bi-boxes me-2"></i>All Products</a></li>
            <li className='py-1'><a href="#" className="text-decoration-none text-muted"><i class="bi bi-box-seam me-2"></i>New Arrivals</a></li>
            <li className='py-1'><a href="#" className="text-decoration-none text-muted"><i class="bi bi-star me-2"></i>Best Sellers</a></li>
          </ul>
        </div>
        <div className="col-md-2 mb-4">
          <h6 className="fw-bold small text-uppercase text-muted">Customer</h6>
          <ul className="list-unstyled small">
            <li className='py-1'><a href="#" className="text-decoration-none text-muted"><i class="bi bi-truck me-2"></i>Delivery & Shipping</a></li>
            <li className='py-1'><a href="#" className="text-decoration-none text-muted"><i class="bi bi-list-check me-2"></i>FAQs</a></li>
            <li className='py-1'><a href="#" className="text-decoration-none text-muted"><i class="bi bi-arrow-clockwise me-2"></i>Return Policy</a></li>
          </ul>
        </div>
        <div className="col-md-2 mb-4">
          <h6 className="fw-bold small text-uppercase text-muted">Social</h6>
          <ul className="list-unstyled small">
            <li className='py-1'><a href="https://instagram.com/brndscents" target='_blank' className="text-decoration-none text-muted"><i class="bi bi-instagram me-2"></i>Instagram</a></li>
            <li className='py-1'><a href="https://wa.me/+2348034671375" className="text-decoration-none text-muted"><i class="bi bi-whatsapp me-2"></i>WhatsApp</a></li>
            <li className='py-1'><a href="https://x.com/brndscents" className="text-decoration-none text-muted"><i class="bi bi-twitter-x me-2"></i>Twitter</a></li>
          </ul>
        </div>
        <div className="col-md-2 mb-4">
          <h6 className="fw-bold small text-uppercase text-muted">Contact</h6>
          <ul className="list-unstyled mb-4">
            <li className="py-1"><a href='#' className="text-decoration-none small text-muted"><i class="bi bi-geo-alt me-2"></i>Abuja, FCT</a></li>
            <li className="py-1"><a href='#' className="text-decoration-none small text-muted"><i class="bi bi-envelope me-2"></i>brndscents@gmail.com</a></li>
            <li className="py-1"><a href='#' className="text-decoration-none small text-muted"><i class="bi bi-telephone me-2"></i>+234 803 467 1375</a></li>
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

// 2. ADMIN COMPONENTS

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    onClick={onClick} 
    className={`d-flex align-items-center p-3 rounded cursor-pointer mb-1 ${active ? 'bg-brand-light text-brand' : 'text-secondary hover-bg-light'}`}
    style={{cursor: 'pointer', backgroundColor: active ? '#f3e5f5' : 'transparent', color: active ? '#a63493' : '#6c757d'}}
  >
    <Icon size={20} className="me-3" />
    <span className="font-weight-medium">{label}</span>
  </div>
);

// --- NEW FEATURE: STOCK INTAKE FORM ---
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

// --- NEW FEATURE: INVOICE / RECEIPT GENERATOR ---
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

// --- NEW FEATURE: RETAILERS MANAGEMENT ---
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

// --- NEW FEATURE: EXPENDITURE MANAGEMENT ---
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

// --- NEW FEATURE: VENDORS MANAGEMENT ---
const VendorsManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Empty vendors list for now
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
                  {filteredVendors.map(vendor => (
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
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
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



// --- MAIN ADMIN DASHBOARD ---
const AdminDashboard = ({ onSwitch }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  const updateStock = (id, quantityAdded) => {
    const updated = products.map(p => {
      if (p.id === id) {
        return { ...p, stock: p.stock + quantityAdded, status: p.stock + quantityAdded > 5 ? 'In Stock' : 'Low Stock' };
      }
      return p;
    });
    setProducts(updated);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'retailers':
        return <RetailersManager />;
      case 'expenditure':
        return <ExpenditureManager />;
      case 'suppliers':
        return <VendorsManager />;
      case 'pos':
        return <POSSystem products={products} />;
      case 'inventory':
        return (
          <div className="container-fluid p-0">
            <StockIntake products={products} onUpdateStock={updateStock} />
            
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 font-weight-bold">Product List</h5>
                <div className="btn-group">
                  <button className="btn btn-link text-secondary"><Download size={20} /></button>
                  <button className="btn btn-link text-secondary"><Printer size={20} /></button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="bg-light text-muted text-uppercase small">
                    <tr>
                      <th className="px-4 py-3">Product Name</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Cost</th>
                      <th className="px-4 py-3">Margin</th>
                      <th className="px-4 py-3">Stock</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id}>
                        <td className="px-4 fw-medium">{product.name}</td>
                        <td className="px-4 text-muted">{formatCurrency(product.price)}</td>
                        <td className="px-4 text-muted small">{formatCurrency(product.cost)}</td>
                        <td className="px-4 text-success fw-medium">+{formatCurrency(product.price - product.cost)}</td>
                        <td className="px-4 fw-bold">{product.stock}</td>
                        <td className="px-4">
                          <span className={`badge rounded-pill ${
                            product.stock > 10 ? 'bg-light text-success border border-success' :
                            product.stock > 0 ? 'bg-light text-warning border border-warning' : 'bg-light text-danger border border-danger'
                          }`}>
                            {product.stock > 10 ? 'In Stock' : product.stock === 0 ? 'Out of Stock' : 'Low Stock'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'dashboard':
      default:
        const lowStockItems = products.filter(p => p.stock <= 5);
        const totalInventoryValue = products.reduce((acc, p) => acc + (p.cost * p.stock), 0);
        const totalRetailValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

        return (
          <div className="container-fluid p-0">
            {/* Top Stats Cards */}
            <div className="row g-4 mb-4">
              <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="text-muted small text-uppercase font-weight-bold">Total Sales</div>
                      <div className="bg-light rounded p-1 text-brand"><TrendingUp size={18} /></div>
                    </div>
                    <h3 className="font-weight-bold mb-1">{formatCurrency(DASHBOARD_DATA.totalSales)}</h3>
                    <div className="small text-success d-flex align-items-center">
                      <ArrowUpRight size={14} className="me-1" /> 12.5% <span className="text-muted ms-1">vs last month</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="text-muted small text-uppercase font-weight-bold">Purchases</div>
                      <div className="bg-light rounded p-1 text-primary"><ShoppingBag size={18} /></div>
                    </div>
                    <h3 className="font-weight-bold mb-1">{formatCurrency(DASHBOARD_DATA.totalPurchases)}</h3>
                    <div className="small text-danger d-flex align-items-center">
                      <ArrowUpRight size={14} className="me-1" /> 8.2% <span className="text-muted ms-1">vs last month</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="text-muted small text-uppercase font-weight-bold">Expenses</div>
                      <div className="bg-light rounded p-1 text-danger"><CreditCard size={18} /></div>
                    </div>
                    <h3 className="font-weight-bold mb-1">{formatCurrency(DASHBOARD_DATA.expenses)}</h3>
                    <div className="small text-success d-flex align-items-center">
                      <ArrowDownRight size={14} className="me-1" /> 2.4% <span className="text-muted ms-1">vs last month</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="text-muted small text-uppercase font-weight-bold">Net Profit</div>
                      <div className="bg-light rounded p-1 text-success"><Activity size={18} /></div>
                    </div>
                    <h3 className="font-weight-bold mb-1 text-success">{formatCurrency(DASHBOARD_DATA.netProfit)}</h3>
                    <div className="small text-success d-flex align-items-center">
                      <ArrowUpRight size={14} className="me-1" /> 18.2% <span className="text-muted ms-1">vs last month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Row: Retailers & Inventory */}
            <div className="row g-4 mb-4">
              <div className="col-lg-8">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white py-3">
                    <h6 className="mb-0 font-weight-bold">Retailer Performance</h6>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover mb-0 align-middle">
                      <thead className="bg-light text-muted text-uppercase small">
                        <tr>
                          <th className="px-4 py-3">Retailer Name</th>
                          <th className="px-4 py-3 text-end">Total Sales</th>
                          <th className="px-4 py-3 text-end">Growth</th>
                          <th className="px-4 py-3 text-end">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DASHBOARD_DATA.retailerSales.map((r, idx) => (
                          <tr key={idx}>
                            <td className="px-4 fw-medium">{r.name}</td>
                            <td className="px-4 text-end">{formatCurrency(r.sales)}</td>
                            <td className={`px-4 text-end ${r.growth >= 0 ? 'text-success' : 'text-danger'}`}>
                              {r.growth > 0 ? '+' : ''}{r.growth}%
                            </td>
                            <td className="px-4 text-end">
                              <span className="badge bg-light text-success border border-success rounded-pill">Active</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 font-weight-bold">Inventory Health</h6>
                    <span className="badge bg-danger rounded-pill">{lowStockItems.length} Alerts</span>
                  </div>
                  <div className="card-body p-0">
                    <div className="p-3 border-bottom bg-light">
                      <div className="d-flex justify-content-between small mb-1">
                        <span className="text-muted">Total Inventory Value (Cost)</span>
                        <span className="fw-bold">{formatCurrency(totalInventoryValue)}</span>
                      </div>
                      <div className="d-flex justify-content-between small">
                        <span className="text-muted">Potential Revenue</span>
                        <span className="fw-bold text-success">{formatCurrency(totalRetailValue)}</span>
                      </div>
                    </div>
                    <ul className="list-group list-group-flush">
                      {lowStockItems.slice(0, 5).map(p => (
                        <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center px-4 py-3">
                          <div>
                            <div className="fw-medium small">{p.name}</div>
                            <div className="text-muted" style={{fontSize: '0.75rem'}}>Stock: {p.stock} left</div>
                          </div>
                          <button className="btn btn-sm btn-outline-danger py-0 px-2" style={{fontSize: '0.75rem'}}>Restock</button>
                        </li>
                      ))}
                    </ul>
                    {lowStockItems.length > 5 && (
                      <div className="p-2 text-center border-top">
                        <a href="#" className="small text-decoration-none text-brand fw-bold" onClick={() => setActiveTab('inventory')}>View All Alerts</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Expenses & Vendors */}
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 font-weight-bold">Recent Expenses</h6>
                    <button className="btn btn-sm btn-light text-muted"><Download size={16} /></button>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-sm mb-0 align-middle">
                      <thead className="text-muted text-uppercase small">
                        <tr>
                          <th className="px-4 py-2">Description</th>
                          <th className="px-4 py-2">Category</th>
                          <th className="px-4 py-2 text-end">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DASHBOARD_DATA.recentExpenses.map((e) => (
                          <tr key={e.id}>
                            <td className="px-4 py-3">
                              <div className="fw-medium">{e.desc}</div>
                              <div className="text-muted small">{e.date}</div>
                            </td>
                            <td className="px-4 py-3"><span className="badge bg-light text-secondary border">{e.category}</span></td>
                            <td className="px-4 py-3 text-end fw-bold text-dark">{formatCurrency(e.amount)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white py-3">
                    <h6 className="mb-0 font-weight-bold">Top Vendors</h6>
                  </div>
                  <div className="list-group list-group-flush">
                    {DASHBOARD_DATA.topVendors.map((v) => (
                      <div key={v.id} className="list-group-item px-4 py-3 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3 text-brand fw-bold" style={{width: '40px', height: '40px'}}>
                            {v.name.charAt(0)}
                          </div>
                          <div>
                            <div className="fw-bold text-dark">{v.name}</div>
                            <div className="small text-muted">{v.orders} Orders • Last active {v.lastActive}</div>
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold text-success">{formatCurrency(v.totalSpent)}</div>
                          <div className="small text-muted">Total Spent</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="d-flex vh-100 bg-light overflow-hidden">
      {/* Sidebar */}
      <div className="d-flex flex-column flex-shrink-0 p-3 bg-white border-end shadow-sm" style={{width: '280px', zIndex: 1000}}>
        <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none p-2">
          <div className="bg-brand text-white rounded p-1 me-2 fw-bold font-serif">B</div>
          <span className="fs-4 fw-bold text-brand tracking-tight">BRND<span className="text-secondary">ADMIN</span></span>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <SidebarItem icon={LayoutDashboard} label="Overview" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          </li>
          <li>
            <SidebarItem icon={DollarSign} label="Sales & POS" active={activeTab === 'pos'} onClick={() => setActiveTab('pos')} />
          </li>
          <li>
            <SidebarItem icon={Package} label="Inventory / Stock" active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
          </li>
          <li>
            <SidebarItem icon={Store} label="Retailers" active={activeTab === 'retailers'} onClick={() => setActiveTab('retailers')} />
          </li>
          <li>
            <SidebarItem icon={Wallet} label="Expenditure" active={activeTab === 'expenditure'} onClick={() => setActiveTab('expenditure')} />
          </li>
          <li>
            <SidebarItem icon={Truck} label="Suppliers" active={activeTab === 'suppliers'} onClick={() => setActiveTab('suppliers')} />
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <div onClick={onSwitch} className="d-flex align-items-center text-secondary text-decoration-none cursor-pointer p-2 rounded hover-bg-light">
            <LogOut size={20} className="me-2" />
            <strong>Return to Store</strong>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        <header className="bg-white border-bottom shadow-sm py-3 px-4 d-flex justify-content-between align-items-center">
          <div className="text-muted small">
            Welcome back, <span className="text-dark fw-bold">Admin</span>
          </div>
          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-light text-brand fw-bold d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px'}}>A</div>
          </div>
        </header>

        <main className="flex-grow-1 p-4 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// 3. LOGIN COMPONENT
const Login = ({ onLogin, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      // Mock authentication - Hardcoded for demo
      if (email === 'admin@brndscents.com' && password === 'admin123') {
        onLogin();
      } else {
        setError('Invalid email or password. Try admin@brndscents.com / admin123');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light position-relative overflow-hidden">
      {/* Background decoration */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{zIndex: 0}}>
        <div className="position-absolute top-0 end-0 bg-brand opacity-10 rounded-circle" style={{width: '400px', height: '400px', transform: 'translate(30%, -30%)'}}></div>
        <div className="position-absolute bottom-0 start-0 bg-brand-secondary opacity-10 rounded-circle" style={{width: '300px', height: '300px', transform: 'translate(-30%, 30%)'}}></div>
      </div>

      <div className="card border-0 shadow-lg" style={{maxWidth: '400px', width: '100%', zIndex: 1}}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <div className="bg-brand text-white d-inline-flex align-items-center justify-content-center rounded-circle mb-3 shadow-sm" style={{width: '64px', height: '64px'}}>
              <Lock size={32} />
            </div>
            <h3 className="font-serif font-weight-bold text-dark">Admin Access</h3>
            <p className="text-muted small">Please sign in to continue</p>
          </div>

          {error && (
            <div className="alert alert-danger small py-2 d-flex align-items-center" role="alert">
              <div className="me-2"><Trash2 size={14} /></div> {/* Using Trash2 as generic alert icon placeholder if AlertCircle not avail, but AlertCircle is imported in lucide-react usually. Wait, I didn't import AlertCircle in the last step explicitly but it might be there. I'll use Lock or just text if unsure. Actually AlertCircle was in the original file imports? Let me check. No, I see ShoppingBag... Download. I didn't see AlertCircle in the list I just edited. I'll use generic text or just no icon to be safe, or use Lock. */}
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small text-muted text-uppercase font-weight-bold">Email Address</label>
              <input 
                type="email" 
                className="form-control form-control-lg bg-light border-0" 
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label small text-muted text-uppercase font-weight-bold d-flex justify-content-between">
                Password
                <a href="#" className="text-decoration-none text-brand small">Forgot?</a>
              </label>
              <input 
                type="password" 
                className="form-control form-control-lg bg-light border-0" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-brand w-100 py-3 font-weight-bold text-uppercase shadow-sm mb-3"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In Dashboard'}
            </button>
            
            <button 
              type="button"
              onClick={onCancel}
              className="btn btn-light w-100 py-3 font-weight-bold text-uppercase text-muted"
            >
              Return to Store
            </button>
          </form>
        </div>
        <div className="card-footer bg-light py-3 text-center border-0">
          <small className="text-muted">Protected System • BRNDSCENTS</small>
        </div>
      </div>
    </div>
  );
};

// 4. MAIN APP CONTROLLER
const App = () => {
  const [view, setView] = useState('public'); // 'public', 'login', 'admin'
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAdminAccess = () => {
    if (isAuthenticated) {
      setView('admin');
    } else {
      setView('login');
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setView('admin');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('public');
  };

  if (view === 'admin' && isAuthenticated) {
    return <AdminDashboard onSwitch={handleLogout} />;
  }

  if (view === 'login') {
    return <Login onLogin={handleLoginSuccess} onCancel={() => setView('public')} />;
  }

  return (
    <div className="font-sans text-dark bg-white min-vh-100 d-flex flex-column">
      <PublicNavbar onSwitch={handleAdminAccess} />
      <HeroSection />
      {/* Product Grid Mockup */}
      <section className="py-5">
        <div className="container py-5">
          <h2 className="h2 font-serif text-brand mb-4">Featured Collection</h2>
          <div className="row g-4">
                {INITIAL_PRODUCTS.slice(0, 8).map((p, idx) => (
                  <div key={p.id} className="col-md-3" data-aos="fade-up" data-aos-delay={idx * 80}>
                      <div className="card border-0 h-100 featured-card rounded-3 shadow-sm">
                          <div className="bg-light mb-3 d-flex align-items-center justify-content-center text-muted" style={{aspectRatio: '3/4'}}>
                            <img
                              src={p.img_url || './src/assets/product-placeholder.jpg'}
                              alt={p.name}
                              className="img-fluid"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                          <div className="card-body p-3 pt-0">
                              <h5 className="card-title text-uppercase small text-muted mb-2 d-flex align-items-center">
                                <ShoppingBag size={18} className='me-2' />
                                <span>{p.name}</span>
                              </h5>
                              <p className="card-text text-success text-small fw-bold d-flex align-items-center">
                                <Banknote size={18}  className='me-2'/>
                                <span> {formatCurrency(p.price)}</span>
                              </p>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default App;