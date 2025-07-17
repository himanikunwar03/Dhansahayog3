import React, { useState } from 'react';
import { Heart, Menu, X, User, Shield, Award, Phone, Mail, MapPin, Users, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import DonatePage from './components/DonatePage';
import ProfilePage from './components/ProfilePage';
import ContactPage from './components/ContactPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Mock data
  const mockDonations = [
    { id: 1, name: 'Ram Sharma', email: 'ram@example.com', amount: 5000, date: '2024-01-15', phone: '+977-9841234567', address: 'Thamel, Kathmandu', message: 'Happy to help' },
    { id: 2, name: 'Sita Gurung', email: 'sita@example.com', amount: 2500, date: '2024-01-14', phone: '+977-9851234567', address: 'Patan, Lalitpur', message: 'For education' },
    { id: 3, name: 'Hari Thapa', email: 'hari@example.com', amount: 10000, date: '2024-01-13', phone: '+977-9861234567', address: 'Bhaktapur', message: 'Keep up the good work' },
    { id: 4, name: 'Maya Rai', email: 'maya@example.com', amount: 1500, date: '2024-01-12', phone: '+977-9871234567', address: 'Baneshwor, Kathmandu', message: 'Small contribution' },
    { id: 5, name: 'Krishna Magar', email: 'krishna@example.com', amount: 7500, date: '2024-01-11', phone: '+977-9881234567', address: 'Pokhara', message: 'For healthcare' }
  ];

  const addNotification = (message, type = 'success') => {
    const notification = { id: Date.now(), message, type };
    setNotifications(prev => [...prev, notification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 3000);
  };

  const handleLogin = (email, password, isAdminLogin = false) => {
    if (isAdminLogin && email === 'admin@dhansahayog.org' && password === 'admin123') {
      setUser({ name: 'Admin', email: 'admin@dhansahayog.org' });
      setIsAdmin(true);
      setCurrentPage('admin-dashboard');
      addNotification('Admin login successful!');
      return true;
    } else if (!isAdminLogin && email === 'john@example.com' && password === 'password') {
      setUser({ name: 'John Doe', email: 'john@example.com' });
      setIsAdmin(false);
      setCurrentPage('user-dashboard');
      addNotification('Login successful!');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    setCurrentPage('home');
    addNotification('Logged out successfully!');
  };

  const handleSignup = (formData) => {
    setUser({ name: formData.name, email: formData.email });
    setCurrentPage('user-dashboard');
    addNotification('Account created successfully!');
  };

  const handleDonation = (donationData) => {
    addNotification(`Thank you for your donation of NPR ${donationData.amount}!`);
    setCurrentPage('user-dashboard');
  };

  const renderNotifications = () => (
    <div className="notifications">
      {notifications.map(notification => (
        <div key={notification.id} className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      ))}
    </div>
  );

  const renderHeader = () => (
    <header className="header">
      <div className="container">
        <div className="nav-brand">
          <div className="logo">
            <Heart className="logo-icon" />
          </div>
          <div className="brand-text">
            <h1>Dhansahayog</h1>
            <p>Service through Cooperation</p>
          </div>
        </div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <a href="#" onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}>Home</a>
          <a href="#" onClick={() => { setCurrentPage('about'); setIsMenuOpen(false); }}>About</a>
          <a href="#" onClick={() => { setCurrentPage('contact'); setIsMenuOpen(false); }}>Contact</a>
          {user ? (
            <>
              <a href="#" onClick={() => { setCurrentPage(isAdmin ? 'admin-dashboard' : 'user-dashboard'); setIsMenuOpen(false); }}>
                Dashboard
              </a>
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <a href="#" onClick={() => { setCurrentPage('login'); setIsMenuOpen(false); }}>Login</a>
              <a href="#" onClick={() => { setCurrentPage('signup'); setIsMenuOpen(false); }} className="btn-primary">Sign Up</a>
            </>
          )}
        </nav>

        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );

  const renderHome = () => (
    <div className="page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Make a Difference Today</h1>
            <p>Join thousands of donors in Nepal who are creating positive change in communities across Kathmandu and beyond.</p>
            <div className="hero-stats">
              <div className="stat">
                <h3>NPR 2,50,000+</h3>
                <p>Total Donations</p>
              </div>
              <div className="stat">
                <h3>500+</h3>
                <p>Happy Donors</p>
              </div>
              <div className="stat">
                <h3>50+</h3>
                <p>Projects Funded</p>
              </div>
            </div>
            <button className="btn-primary btn-large" onClick={() => setCurrentPage('donate')}>
              Donate Now
            </button>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Dhansahayog?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <Shield className="feature-icon" />
              <h3>100% Secure</h3>
              <p>Your donations are processed through secure, encrypted channels with full transparency.</p>
            </div>
            <div className="feature-card">
              <Heart className="feature-icon" />
              <h3>Direct Impact</h3>
              <p>Every rupee goes directly to those in need, with minimal administrative costs.</p>
            </div>
            <div className="feature-card">
              <Award className="feature-icon" />
              <h3>Trusted Platform</h3>
              <p>Registered NGO with full transparency and regular impact reports.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="impact">
        <div className="container">
          <h2>Your Impact in Numbers</h2>
          <div className="impact-grid">
            <div className="impact-card">
              <h3>Education</h3>
              <p>25 children received scholarships</p>
              <div className="progress-bar">
                <div className="progress" style={{width: '75%'}}></div>
              </div>
            </div>
            <div className="impact-card">
              <h3>Healthcare</h3>
              <p>150 families received medical aid</p>
              <div className="progress-bar">
                <div className="progress" style={{width: '60%'}}></div>
              </div>
            </div>
            <div className="impact-card">
              <h3>Food Security</h3>
              <p>300 meals provided to families</p>
              <div className="progress-bar">
                <div className="progress" style={{width: '90%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderLogin = () => {
    return <LoginPage onLogin={handleLogin} onPageChange={setCurrentPage} />;
  };

  const renderSignup = () => {
    return <SignupPage onSignup={handleSignup} onPageChange={setCurrentPage} />;
  };

  const renderForgotPassword = () => {
    return <ForgotPasswordPage onPageChange={setCurrentPage} addNotification={addNotification} />;
  };

  const renderDonate = () => {
    return <DonatePage onDonation={handleDonation} />;
  };

  const renderUserDashboard = () => {
    const userDonations = mockDonations.filter(d => d.email === user?.email);
    const totalDonated = userDonations.reduce((sum, d) => sum + d.amount, 0);

    return (
      <div className="page">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1>Welcome back, {user?.name}!</h1>
            <p>Thank you for your continued support</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <DollarSign className="stat-icon" />
              <div className="stat-content">
                <h3>NPR {totalDonated.toLocaleString()}</h3>
                <p>Total Donated</p>
              </div>
            </div>
            <div className="stat-card">
              <Heart className="stat-icon" />
              <div className="stat-content">
                <h3>{userDonations.length}</h3>
                <p>Donations Made</p>
              </div>
            </div>
            <div className="stat-card">
              <Award className="stat-icon" />
              <div className="stat-content">
                <h3>Gold</h3>
                <p>Donor Status</p>
              </div>
            </div>
          </div>

          <div className="dashboard-actions">
            <button className="btn-primary" onClick={() => setCurrentPage('donate')}>
              Make New Donation
            </button>
            <button className="btn-secondary" onClick={() => setCurrentPage('profile')}>
              Edit Profile
            </button>
          </div>

          <div className="donation-history">
            <h2>Your Donation History</h2>
            {userDonations.length > 0 ? (
              <div className="donations-table">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Message</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDonations.map(donation => (
                      <tr key={donation.id}>
                        <td>{donation.date}</td>
                        <td>NPR {donation.amount.toLocaleString()}</td>
                        <td>{donation.message || 'No message'}</td>
                        <td><span className="status-badge success">Completed</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <Heart size={48} />
                <h3>No donations yet</h3>
                <p>Start making a difference today!</p>
                <button className="btn-primary" onClick={() => setCurrentPage('donate')}>
                  Make Your First Donation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAdminDashboard = () => {
    const totalDonations = mockDonations.reduce((sum, d) => sum + d.amount, 0);
    const averageDonation = totalDonations / mockDonations.length;

    return (
      <div className="page">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1>Admin Dashboard</h1>
            <p>Manage donations and view analytics</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <DollarSign className="stat-icon" />
              <div className="stat-content">
                <h3>NPR {totalDonations.toLocaleString()}</h3>
                <p>Total Donations</p>
              </div>
            </div>
            <div className="stat-card">
              <Users className="stat-icon" />
              <div className="stat-content">
                <h3>{mockDonations.length}</h3>
                <p>Total Donors</p>
              </div>
            </div>
            <div className="stat-card">
              <TrendingUp className="stat-icon" />
              <div className="stat-content">
                <h3>NPR {Math.round(averageDonation).toLocaleString()}</h3>
                <p>Average Donation</p>
              </div>
            </div>
            <div className="stat-card">
              <Calendar className="stat-icon" />
              <div className="stat-content">
                <h3>5</h3>
                <p>This Month</p>
              </div>
            </div>
          </div>

          <div className="admin-actions">
            <button className="btn-primary">Export Data</button>
            <button className="btn-secondary">Send Newsletter</button>
            <button className="btn-secondary">Generate Report</button>
          </div>

          <div className="donors-management">
            <h2>Donor Management</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Address</th>
                    <th>Message</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDonations.map(donation => (
                    <tr key={donation.id}>
                      <td>{donation.name}</td>
                      <td>{donation.email}</td>
                      <td>{donation.phone}</td>
                      <td>NPR {donation.amount.toLocaleString()}</td>
                      <td>{donation.date}</td>
                      <td>{donation.address}</td>
                      <td>{donation.message}</td>
                      <td>
                        <button className="btn-small">Contact</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProfile = () => {
    return (
      <ProfilePage 
        user={user} 
        addNotification={addNotification} 
        onPageChange={setCurrentPage}
        isAdmin={isAdmin}
      />
    );
  };

  const renderAbout = () => (
    <div className="page">
      <div className="about-container">
        <div className="about-header">
          <h1>About Dhansahayog</h1>
          <p>Service through Cooperation - Building a Better Nepal Together</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              Dhansahayog is dedicated to creating positive change in communities across Nepal through 
              transparent and effective donation management. We believe that every contribution, no matter 
              how small, can make a significant difference in someone's life.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <Shield className="value-icon" />
                <h3>Transparency</h3>
                <p>Every donation is tracked and reported with complete transparency to our donors.</p>
              </div>
              <div className="value-card">
                <Heart className="value-icon" />
                <h3>Compassion</h3>
                <p>We approach every project with empathy and understanding for those we serve.</p>
              </div>
              <div className="value-card">
                <Award className="value-icon" />
                <h3>Excellence</h3>
                <p>We strive for excellence in everything we do, ensuring maximum impact from every rupee.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Our Impact</h2>
            <div className="impact-stats">
              <div className="impact-stat">
                <h3>NPR 2,50,000+</h3>
                <p>Total funds raised</p>
              </div>
              <div className="impact-stat">
                <h3>500+</h3>
                <p>Lives impacted</p>
              </div>
              <div className="impact-stat">
                <h3>50+</h3>
                <p>Projects completed</p>
              </div>
              <div className="impact-stat">
                <h3>25+</h3>
                <p>Partner organizations</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Our Team</h2>
            <p>
              Based in Kathmandu, Nepal, our dedicated team works tirelessly to ensure that every 
              donation reaches those who need it most. We are committed to building trust through 
              transparency and delivering measurable results.
            </p>
          </section>
        </div>
      </div>
    </div>
  );

  const renderContact = () => {
    return <ContactPage addNotification={addNotification} />;
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home': return renderHome();
      case 'login': return renderLogin();
      case 'signup': return renderSignup();
      case 'forgot-password': return renderForgotPassword();
      case 'donate': return renderDonate();
      case 'user-dashboard': return renderUserDashboard();
      case 'admin-dashboard': return renderAdminDashboard();
      case 'profile': return renderProfile();
      case 'about': return renderAbout();
      case 'contact': return renderContact();
      default: return renderHome();
    }
  };

  return (
    <div className="app">
      {renderHeader()}
      {renderNotifications()}
      <main className="main">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;