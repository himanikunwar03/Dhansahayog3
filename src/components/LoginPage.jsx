import React, { useState } from 'react';
import { Heart } from 'lucide-react';

function LoginPage({ onLogin, onPageChange }) {
  const [formData, setFormData] = useState({ email: '', password: '', isAdmin: false });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(formData.email, formData.password, formData.isAdmin);
    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Heart className="auth-icon" />
            <h2>Welcome Back</h2>
            <p>Sign in to your Dhansahayog account</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.isAdmin}
                  onChange={(e) => setFormData({...formData, isAdmin: e.target.checked})}
                />
                Login as Admin
              </label>
            </div>

            <button type="submit" className="btn-primary btn-full">Sign In</button>
          </form>

          <div className="auth-footer">
            <p>
              <a href="#" onClick={() => onPageChange('forgot-password')}>Forgot your password?</a>
            </p>
            <p>
              Don't have an account? 
              <a href="#" onClick={() => onPageChange('signup')}> Sign up here</a>
            </p>
          </div>

          <div className="demo-credentials">
            <h4>Demo Credentials:</h4>
            <p><strong>User:</strong> john@example.com / password</p>
            <p><strong>Admin:</strong> admin@dhansahayog.org / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;