'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

// Steps definition
const steps = [
  { id: 1, title: 'Order Placed', icon: '📝' },
  { id: 2, title: 'Preparing', icon: '👨‍🍳' },
  { id: 3, title: 'Out for Delivery', icon: '🛵' },
  { id: 4, title: 'Delivered', icon: '✅' },
];

export default function TrackOrderPage() {
  const [searchId, setSearchId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [orderData, setOrderData] = useState<{ id: string, status: number, time: string, items: string } | null>(null);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setIsSearching(true);
    setError('');
    setOrderData(null);

    // Simulate API call to track order
    setTimeout(() => {
      setIsSearching(false);
      
      // For demo: if ID is "123", show delivered. Else show preparing.
      if (searchId === '123') {
        setOrderData({
          id: 'ORD-123',
          status: 4,
          time: 'Placed 45 mins ago',
          items: '1x Classic Cappuccino, 1x Grilled Veggie Club Sandwich'
        });
      } else if (searchId.length > 3) {
        // Randomly assign a status between 1 and 3 for demo purposes
        const randomStatus = Math.floor(Math.random() * 3) + 1;
        setOrderData({
          id: `ORD-${searchId.toUpperCase()}`,
          status: randomStatus,
          time: 'Placed 15 mins ago',
          items: '2x Kadak Masala Chai, 1x Warm Chocolate Croissant'
        });
      } else {
        setError("Order not found. Please check your Order ID and try again.");
      }
    }, 1200);
  };

  return (
    <div className="container">
      <div className={styles.trackContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Track Your Order</h1>
          <p className={styles.subtitle}>Enter your Order ID below to see the real-time status of your food.</p>
        </div>

        <div className={styles.searchCard}>
          <p style={{ color: 'var(--text-muted)' }}>You can find your Order ID in the email receipt.</p>
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="e.g. 123 or XYZ987" 
              className={styles.searchInput}
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button type="submit" className={styles.searchBtn} disabled={isSearching || !searchId.trim()}>
              {isSearching ? 'Searching...' : 'Track Order'}
            </button>
          </form>
          {error && <p style={{ color: '#e63946', marginTop: '1rem' }}>{error}</p>}
        </div>

        {orderData && (
          <div className={styles.statusCard}>
            <div className={styles.orderHeader}>
              <div>
                <div className={styles.orderId}>Order #{orderData.id}</div>
                <div className={styles.orderTime}>{orderData.time}</div>
              </div>
              <div style={{ background: 'rgba(212, 163, 115, 0.1)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: '600' }}>
                {steps[orderData.status - 1].title}
              </div>
            </div>

            <div className={styles.stepper}>
              <div 
                className={styles.progressLine} 
                style={{ width: `${((orderData.status - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
              
              {steps.map((step) => {
                const isCompleted = orderData.status > step.id;
                const isActive = orderData.status === step.id;
                
                return (
                  <div key={step.id} className={`${styles.step} ${isCompleted ? styles.completed : ''} ${isActive ? styles.active : ''}`}>
                    <div className={styles.stepIcon}>
                      {step.icon}
                    </div>
                    <div className={styles.stepTitle}>{step.title}</div>
                  </div>
                );
              })}
            </div>

            <div className={styles.orderDetails}>
              <h4 className={styles.detailsTitle}>Items Ordered</h4>
              <p>{orderData.items}</p>
              
              {orderData.status === 3 && (
                <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
                  🛵 Your delivery partner is on the way. Expected arrival in 10-15 minutes.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
