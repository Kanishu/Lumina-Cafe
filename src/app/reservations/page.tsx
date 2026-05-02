'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

export default function ReservationsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to backend
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.title}>Book a Table</h1>
          <p className={styles.subtitle}>
            Reserve your spot at Lumina. Our smart allocation system will ensure you have the perfect table waiting for you.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.reservationContainer}>
          {isSuccess ? (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>🎉</div>
              <h2 className={styles.successTitle}>Reservation Confirmed!</h2>
              <p className={styles.successDesc}>
                Thank you, {formData.name}. Your table for {formData.guests} has been booked for {formData.date} at {formData.time}.<br/><br/>
                We've sent a confirmation to {formData.email}. Want to pre-order your food to skip the wait?
              </p>
              <div style={{ marginTop: '2rem' }}>
                <a href="/menu" className="btn-primary">Pre-order Food</a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className={styles.input} 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className={styles.input} 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="date">Date</label>
                  <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    className={styles.input} 
                    required 
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="time">Time</label>
                  <input 
                    type="time" 
                    id="time" 
                    name="time" 
                    className={styles.input} 
                    required 
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
                
                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                  <label className={styles.label} htmlFor="guests">Number of Guests</label>
                  <select 
                    id="guests" 
                    name="guests" 
                    className={styles.input}
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                    <option value="9+">9+ Guests (Contact Us)</option>
                  </select>
                </div>
                
                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                  <label className={styles.label} htmlFor="specialRequests">Special Requests (Optional)</label>
                  <textarea 
                    id="specialRequests" 
                    name="specialRequests" 
                    className={styles.input} 
                    rows={3}
                    style={{ resize: 'vertical' }}
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="Allergies, seating preferences, occasions..."
                  ></textarea>
                </div>
              </div>
              
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? 'Confirming...' : 'Confirm Reservation'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
