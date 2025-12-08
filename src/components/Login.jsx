// components/auth/Login.jsx

import React, { useState } from 'react';
// Assuming these are coming from a library like 'lucide-react'
import { Lock, Trash2, SquareUser, RectangleEllipsis, SquareArrowRight, Undo2 } from 'lucide-react';

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
            <h3 className="font-serif font-weight-bold text-dark">Login to your account</h3>
            <p className="text-muted small fw-light">Please sign in to continue</p>
          </div>

          {error && (
            <div className="alert alert-danger small py-2 d-flex align-items-center" role="alert">
              <div className="me-2"><Trash2 size={14} /></div>
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <SquareUser size={16} strokeWidth={2} className='me-2 text-muted' />
              <label className="small form-label text-muted text-uppercase font-weight-bold">Retailer ID</label>
              <input 
                type="email" 
                className="form-control form-control-lg bg-light border-1" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <RectangleEllipsis size={16} strokeWidth={2} className='me-2 text-muted' />
              <label className="form-label small text-muted text-uppercase font-weight-bold">
                Password
              </label>
              <input 
                type="password" 
                className="form-control form-control-lg small bg-light border-1" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
                <a href="#" className="d-block mt-2 text-decoration-none text-end text-brand small">Forgot password?</a>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-brand w-100 py-3 font-weight-bold text-uppercase shadow-sm mb-3"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Proceed to Dashboard'}
              <SquareArrowRight size={16} className='ms-2 mb-1' />
            </button>
            
            <button 
              type="button"
              onClick={onCancel}
              className="btn btn-light w-100 py-3 font-weight-bold text-uppercase text-muted"
            >
              <Undo2 size={16} className='me-2 mb-1' />
              Return to Store
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;