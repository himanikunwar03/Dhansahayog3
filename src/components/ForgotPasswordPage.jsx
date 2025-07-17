import React, { useState } from 'react';
import { Heart } from 'lucide-react';

function ForgotPasswordPage({ onPageChange, addNotification }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    addNotification('Reset code sent to your email!');
    setStep(2);
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (resetCode === '123456') {
      setStep(3);
    } else {
      addNotification('Invalid reset code!', 'error');
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    addNotification('Password reset successful!');
    onPageChange('login');
  };

  return (
    <div className="page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Heart className="auth-icon" />
            <h2>Reset Password</h2>
            <p>
              {step === 1 && "Enter your email to receive a reset code"}
              {step === 2 && "Enter the reset code sent to your email"}
              {step === 3 && "Create your new password"}
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="auth-form">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button type="submit" className="btn-primary btn-full">Send Reset Code</button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleCodeSubmit} className="auth-form">
              <div className="form-group">
                <label>Reset Code</label>
                <input
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  required
                />
              </div>
              <button type="submit" className="btn-primary btn-full">Verify Code</button>
              <p className="demo-note">Demo code: 123456</p>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handlePasswordReset} className="auth-form">
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </div>
              <button type="submit" className="btn-primary btn-full">Reset Password</button>
            </form>
          )}

          <div className="auth-footer">
            <p>
              Remember your password? 
              <a href="#" onClick={() => onPageChange('login')}> Sign in here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;