'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check initial state
    const checkAuth = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    
    checkAuth();

    // Listen for auth changes (custom event)
    window.addEventListener('auth-change', checkAuth);
    
    return () => {
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="logo">
          ✨ Lumina
        </Link>
        <nav className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/menu" className="nav-link">Menu</Link>
          <Link href="/reservations" className="nav-link">Reservations</Link>
          <Link href="/track" className="nav-link">Track</Link>
        </nav>
        
        <div className="nav-links" style={{ alignItems: 'center' }}>
          {isLoggedIn ? (
            <Link href="/dashboard" title="My Dashboard" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--primary)',
              color: '#fff',
              fontSize: '1.2rem',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-sm)'
            }}>
              👤
            </Link>
          ) : (
            <>
              <Link href="/signin" className="btn-outline">Sign In</Link>
              <Link href="/signup" className="btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
