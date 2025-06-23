import React, { useState } from 'react';
import { Shield, Award } from 'lucide-react';

function DonatePage({ onDonation }) {
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '', email: '', phone: '', address: '', message: ''
  });

  const presetAmounts = [500, 1000, 2500, 5000, 10000, 25000];

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = donationAmount === 'custom' ? customAmount : donationAmount;
    onDonation({ ...donorInfo, amount });
  };

  return (
    <div className="page">
      <div className="donate-containr">
        <div className="donate-header">
          <h1>Make a Donation</h1>
          <p>Your contribution helps us create positive change in communities across Nepal</p>
        </div>

        <form onSubmit={handleSubmit} className="donate-form">
          <div className="amount-section">
            <h3>Select Donation Amount</h3>
            <div className="amount-grid">
              {presetAmounts.map(amount => (
                <button
                  key={amount}
                  type="button"
                  className={`amount-btn ${donationAmount === amount.toString() ? 'active' : ''}`}
                  onClick={() => setDonationAmount(amount.toString())}
                >
                  NPR {amount.toLocaleString()}
                </button>
              ))}
              <button
                type="button"
                className={`amount-btn ${donationAmount === 'custom' ? 'active' : ''}`}
                onClick={() => setDonationAmount('custom')}
              >
                Custom Amount
              </button>
            </div>

            {donationAmount === 'custom' && (
              <div className="custom-amount">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter custom amount"
                  min="100"
                  required
                />
              </div>
            )}
          </div>

          <div className="donor-info">
            <h3>Donor Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={donorInfo.name}
                  onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={donorInfo.email}
                  onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={donorInfo.phone}
                  onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                  placeholder="+977-98XXXXXXXX"
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={donorInfo.address}
                  onChange={(e) => setDonorInfo({...donorInfo, address: e.target.value})}
                  placeholder="Your address in Nepal"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Message (Optional)</label>
              <textarea
                value={donorInfo.message}
                onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                placeholder="Share why you're donating..."
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="security-info">
            <div className="security-badges">
              <div className="badge">
                <Shield size={20} />
                <span>SSL Secured</span>
              </div>
              <div className="badge">
                <Award size={20} />
                <span>Verified NGO</span>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary btn-large btn-full">
            Donate NPR {donationAmount === 'custom' ? customAmount || '0' : donationAmount || '0'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DonatePage;