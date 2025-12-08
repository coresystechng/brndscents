// components/admin/AdminDashboard.jsx

import React, { useState } from 'react';
// Assuming these are coming from a library like 'lucide-react'
import {
  LayoutDashboard, DollarSign, Package, Store, Wallet, Truck, LogOut,
  TrendingUp, ShoppingBag, CreditCard, Activity, ArrowUpRight, ArrowDownRight,
  Download, Printer
} from 'lucide-react';
import formatCurrency from '../../utils/formatCurrency'; 
import SidebarItem from '../utils/SidebarItem'; // <-- New Utility
import StockIntake from './StockIntake'; // <-- New Component
import POSSystem from './POSSystem'; // <-- New Component (Placeholder)
// Import components from previous refactor batches
import RetailersManager from './RetailersManager'; 
import ExpenditureManager from './ExpenditureManager';
import VendorsManager from './VendorsManager';
// Mock Data Imports
import { INITIAL_PRODUCTS, DASHBOARD_DATA } from '../../data/admin-mocks';


const AdminDashboard = ({ onSwitch }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  const updateStock = (id, quantityAdded) => {
    const updated = products.map(p => {
      if (p.id === id) {
        const newStock = p.stock + quantityAdded;
        let newStatus = 'In Stock';
        if (newStock === 0) {
            newStatus = 'Out of Stock';
        } else if (newStock <= 5) {
            newStatus = 'Low Stock';
        }
        return { 
          ...p, 
          stock: newStock, 
          status: newStatus 
        };
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
        // Inventory Tab Content
        const lowStockItems = products.filter(p => p.stock <= 5);
        
        return (
          <div className="container-fluid p-0">
            <StockIntake products={products} onUpdateStock={updateStock} />
            
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 font-weight-bold">Product List ({products.length})</h5>
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
        // Dashboard Tab Content
        const lowStockItemsDashboard = products.filter(p => p.stock <= 5);
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
                    <span className="badge bg-danger rounded-pill">{lowStockItemsDashboard.length} Alerts</span>
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
                      {lowStockItemsDashboard.slice(0, 5).map(p => (
                        <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center px-4 py-3">
                          <div>
                            <div className="fw-medium small">{p.name}</div>
                            <div className="text-muted" style={{fontSize: '0.75rem'}}>Stock: {p.stock} left</div>
                          </div>
                          <button 
                            className="btn btn-sm btn-outline-danger py-0 px-2" 
                            style={{fontSize: '0.75rem'}}
                            onClick={() => setActiveTab('inventory')}
                          >
                            Restock
                          </button>
                        </li>
                      ))}
                    </ul>
                    {lowStockItemsDashboard.length > 5 && (
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
                    <button className="btn btn-sm btn-light text-muted" onClick={() => setActiveTab('expenditure')}><Download size={16} /></button>
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

export default AdminDashboard;