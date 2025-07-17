import React, { useState } from 'react';

function ProfilePage({ user, addNotification, onPageChange, isAdmin }) {
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+977-9841234567',
    address: 'Kathmandu, Nepal',
    notifications: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    addNotification('Profile updated successfully!');
  };

  return (
    <div className="page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>Profile Settings</h1>
          <p>Manage your account information</p>
        </div>

        <form onSubmit={handleSave} className="profile-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Preferences</h3>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={profileData.notifications}
                  onChange={(e) => setProfileData({...profileData, notifications: e.target.checked})}
                />
                Receive email notifications about donation updates
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Save Changes</button>
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => onPageChange(isAdmin ? 'admin-dashboard' : 'user-dashboard')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;