import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

function ContactPage({ addNotification }) {
  const [contactForm, setContactForm] = useState({
    name: '', email: '', subject: '', message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNotification('Message sent successfully! We will get back to you soon.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>Get in touch with our team</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <div className="contact-item">
              <MapPin className="contact-icon" />
              <div>
                <h3>Address</h3>
                <p>Thamel, Kathmandu 44600<br />Nepal</p>
              </div>
            </div>
            <div className="contact-item">
              <Phone className="contact-icon" />
              <div>
                <h3>Phone</h3>
                <p>+977-1-4441234<br />+977-9841234567</p>
              </div>
            </div>
            <div className="contact-item">
              <Mail className="contact-icon" />
              <div>
                <h3>Email</h3>
                <p>info@dhansahayog.org<br />support@dhansahayog.org</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <h2>Send us a Message</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                value={contactForm.subject}
                onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;