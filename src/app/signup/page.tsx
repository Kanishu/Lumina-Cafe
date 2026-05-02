'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import styles from '../auth.module.css';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Simple strong password check
    if (e.target.name === 'password') {
      const val = e.target.value;
      if (val.length > 0 && val.length < 8) {
        setPasswordError('Password must be at least 8 characters long.');
      } else if (val.length >= 8 && !/[A-Z]/.test(val)) {
        setPasswordError('Password must contain at least one uppercase letter.');
      } else if (val.length >= 8 && !/[0-9]/.test(val)) {
        setPasswordError('Password must contain at least one number.');
      } else {
        setPasswordError('');
      }
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordError) {
      alert("Please fix the errors before submitting.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Set login state
    localStorage.setItem('isLoggedIn', 'true');
    window.dispatchEvent(new Event('auth-change'));

    const templateParams = {
      to_name: formData.name,
      to_email: formData.email,
    };

    emailjs.send(
      'service_8sbjjap', // Service ID
      'template_smgor6w', // Signup Template ID
      templateParams,
      { publicKey: 'NFmkg5h6XGEhrJ8Wb' } // Public Key
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setIsSubmitting(false);
      alert(`Welcome, ${formData.name}! Your account has been created and a confirmation email has been sent.`);
      router.push('/dashboard'); // Redirect to dashboard
    })
    .catch((err) => {
      console.log('FAILED...', err);
      setIsSubmitting(false);
      alert(`Email Failed to Send: ${err?.text || err?.message || JSON.stringify(err)}. Make sure your EmailJS Template contains the exact variables: {{to_name}} and {{to_email}}`);
      router.push('/dashboard');
    });
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>Join Lumina Cafe for a smarter dining experience.</p>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className={styles.input} 
              required 
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email ID</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className={styles.input} 
              required 
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              className={styles.input} 
              required 
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.formGroup} style={{ marginBottom: passwordError ? '0.5rem' : '1.5rem' }}>
            <label className={styles.label} htmlFor="password">Strong Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className={styles.input} 
              required 
              placeholder="Min 8 chars, 1 Uppercase, 1 Number"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          {passwordError && (
            <p className={styles.passwordHint} style={{ color: '#e63946' }}>{passwordError}</p>
          )}
          {!passwordError && (
            <p className={styles.passwordHint}>Use at least 8 characters with a mix of letters and numbers.</p>
          )}

          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className={styles.switchLink}>
          Already have an account? 
          <Link href="/signin">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
