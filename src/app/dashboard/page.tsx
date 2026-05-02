'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event('auth-change'));
    router.push('/');
  };
  const [isSaving, setIsSaving] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    address: '123 Tech Park, Bangalore',
    preferences: 'Vegetarian, low spice'
  });

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load from local storage on mount to simulate a database
    const savedData = localStorage.getItem('userProfile');
    const savedPic = localStorage.getItem('profilePic');
    
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    }
    if (savedPic) {
      setProfilePic(savedPic);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePic(base64String);
        localStorage.setItem('profilePic', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call to save data
    setTimeout(() => {
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      setIsSaving(false);
      alert('Profile updated successfully!');
    }, 800);
  };

  return (
    <div className="container">
      <div className={styles.dashboardContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Dashboard</h1>
          <p className={styles.subtitle}>Manage your account, preferences, and orders.</p>
        </div>

        <div className={styles.dashboardGrid}>
          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.profilePicContainer}>
              {profilePic ? (
                <img src={profilePic} alt="Profile" className={styles.profilePic} />
              ) : (
                <span>👤</span>
              )}
            </div>
            
            <label className={styles.changePicLabel}>
              Change Picture
              <input 
                type="file" 
                accept="image/*" 
                className={styles.fileInput} 
                ref={fileInputRef}
                onChange={handlePicUpload}
              />
            </label>
            
            <h2 className={styles.userName}>{profileData.name}</h2>
            <p className={styles.userEmail}>{profileData.email}</p>

            <div className={styles.navMenu}>
              <button 
                className={`${styles.navItem} ${activeTab === 'profile' ? styles.active : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile Settings
              </button>
              <button 
                className={`${styles.navItem} ${activeTab === 'orders' ? styles.active : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                Order History
              </button>
              <button 
                className={`${styles.navItem} ${activeTab === 'reservations' ? styles.active : ''}`}
                onClick={() => setActiveTab('reservations')}
              >
                My Reservations
              </button>
              <button 
                className={styles.navItem}
                style={{ color: '#e63946', marginTop: '1rem', borderTop: '1px solid var(--border)', borderRadius: '0', paddingTop: '1rem' }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className={styles.mainContent}>
            {activeTab === 'profile' && (
              <div>
                <h3 className={styles.sectionTitle}>Personal Information</h3>
                <form onSubmit={handleSave}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Full Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={profileData.name} 
                        onChange={handleChange}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={profileData.email} 
                        onChange={handleChange}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={profileData.phone} 
                        onChange={handleChange}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Delivery Address</label>
                      <input 
                        type="text" 
                        name="address" 
                        value={profileData.address} 
                        onChange={handleChange}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                      <label className={styles.label}>Dining Preferences / Allergies</label>
                      <textarea 
                        name="preferences" 
                        value={profileData.preferences} 
                        onChange={handleChange}
                        className={styles.input}
                        rows={3}
                        style={{ resize: 'vertical' }}
                      />
                    </div>
                  </div>
                  
                  <button type="submit" className={styles.saveBtn} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div>
                <h3 className={styles.sectionTitle}>Recent Orders</h3>
                <p style={{ color: 'var(--text-muted)' }}>You haven't placed any orders yet.</p>
                <a href="/menu" className="btn-outline" style={{ display: 'inline-block', marginTop: '1rem' }}>
                  Browse Menu
                </a>
              </div>
            )}
            
            {activeTab === 'reservations' && (
              <div>
                <h3 className={styles.sectionTitle}>Upcoming Reservations</h3>
                <p style={{ color: 'var(--text-muted)' }}>You have no upcoming reservations.</p>
                <a href="/reservations" className="btn-outline" style={{ display: 'inline-block', marginTop: '1rem' }}>
                  Book a Table
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
