// components/admin/SidebarItem.jsx

import React from 'react';

// Note: Icon is passed as a component/function (e.g., from lucide-react)
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

export default SidebarItem;