'use client';

import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import styles from './page.module.css';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  icon: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prevCart.map(cartItem => 
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((count, item) => count + item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Get user details from localStorage
    const savedData = localStorage.getItem('userProfile');
    let userName = 'Valued Customer';
    let userEmail = '';
    
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      userName = parsedData.name || 'Valued Customer';
      userEmail = parsedData.email || '';
    }

    if (!userEmail) {
      userEmail = prompt("Please enter your email to receive the receipt:") || '';
      if (!userEmail) {
        setIsCheckingOut(false);
        return; // Cancel checkout
      }
    }

    const orderDetails = cart.map(item => `${item.quantity}x ${item.name}`).join(', ');
    const trackingId = Math.random().toString(36).substring(2, 8).toUpperCase();

    const templateParams = {
      to_name: userName,
      to_email: userEmail,
      order_details: orderDetails,
      total_amount: cartTotal.toFixed(2),
      tracking_id: trackingId
    };

    emailjs.send(
      'service_8sbjjap', // Service ID
      'template_be4f8mb', // Order Template ID
      templateParams,
      { publicKey: 'NFmkg5h6XGEhrJ8Wb' } // Public Key
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setIsCheckingOut(false);
      setCart([]);
      setIsCartOpen(false);
      alert(`Order placed successfully! Your Tracking ID is: ${trackingId}\nA receipt has been sent to your email.`);
    })
    .catch((err) => {
      console.log('FAILED...', err);
      setIsCheckingOut(false);
      alert(`Email Failed to Send: ${err?.text || err?.message || JSON.stringify(err)}. Make sure your EmailJS Template contains the exact variables: {{to_name}}, {{to_email}}, {{order_details}}, and {{total_amount}}`);
      // Don't clear cart so they can try again if they want
    });
  };

  useEffect(() => {
    // In a real app, this would be an API call: fetch('/api/menu')
    // Simulating backend data fetch
    setTimeout(() => {
      setMenuItems([
        { id: '1', name: 'Classic Cappuccino', description: 'Rich espresso shot topped with perfectly frothed hot milk.', price: 120.00, category: 'Drinks', icon: '☕' },
        { id: '2', name: 'Iced Caramel Macchiato', description: 'Chilled espresso poured over milk and sweet caramel syrup.', price: 160.00, category: 'Drinks', icon: '🥤' },
        { id: '3', name: 'Grilled Veggie Club Sandwich', description: 'Triple-decker sandwich loaded with grilled zucchini, bell peppers, cheese, and pesto.', price: 180.00, category: 'Food', icon: '🥪' },
        { id: '4', name: 'Smoked Chicken & Cheese Sandwich', description: 'Tender smoked chicken breast, melted cheddar, and chipotle mayo on toasted sourdough.', price: 240.00, category: 'Food', icon: '🥪' },
        { id: '5', name: 'Spicy Paneer Tikka Panini', description: 'Indian-spiced paneer chunks grilled to perfection inside a crispy panini.', price: 210.00, category: 'Food', icon: '🥪' },
        { id: '6', name: 'Kadak Masala Chai', description: 'Strong Indian tea brewed with cardamom, ginger, and aromatic spices.', price: 60.00, category: 'Drinks', icon: '🍵' },
        { id: '7', name: 'Iced Lemon Peach Tea', description: 'Refreshing black tea infused with peach syrup and freshly squeezed lemon.', price: 140.00, category: 'Drinks', icon: '🍹' },
        { id: '8', name: 'Hazelnut Frappé', description: 'Blended cold coffee with hazelnut flavor, topped with whipped cream.', price: 190.00, category: 'Drinks', icon: '🧋' },
        { id: '9', name: 'Signature Cold Brew', description: '24-hour steeped single origin coffee, served over ice for a smooth finish.', price: 150.00, category: 'Drinks', icon: '🧊' },
        { id: '10', name: 'Warm Chocolate Croissant', description: 'Flaky, buttery French pastry filled with rich dark chocolate.', price: 130.00, category: 'Dessert', icon: '🥐' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={styles.menuPageWrapper}>
      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <button className={styles.floatingCartBtn} onClick={() => setIsCartOpen(!isCartOpen)}>
          🛒 {totalItems} items (₹{cartTotal.toFixed(2)})
        </button>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className={styles.cartSidebar}>
          <div className={styles.cartHeader}>
            <h3>Your Order</h3>
            <button onClick={() => setIsCartOpen(false)} className={styles.closeCart}>✕</button>
          </div>
          {cart.length === 0 ? (
            <p className={styles.emptyCart}>Your cart is empty.</p>
          ) : (
            <div className={styles.cartItemsList}>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div>
                    <h4 className={styles.cartItemName}>{item.name}</h4>
                    <span className={styles.cartItemPrice}>₹{item.price.toFixed(2)} x {item.quantity}</span>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>Remove</button>
                </div>
              ))}
              <div className={styles.cartTotalRow}>
                <span>Total:</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <button className={styles.checkoutBtn} onClick={handleCheckout} disabled={isCheckingOut}>
                {isCheckingOut ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          )}
        </div>
      )}

      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.title}>Our Menu</h1>
          <p className={styles.subtitle}>
            Discover our carefully curated selection of dishes, prepared with the finest ingredients and culinary passion.
          </p>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading menu...</div>
        ) : (
          <div className={styles.menuGrid}>
            {menuItems.map((item) => (
              <div key={item.id} className={styles.menuItem}>
                <div className={styles.imagePlaceholder}>{item.icon}</div>
                <div className={styles.content}>
                  <div className={styles.header}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <span className={styles.price}>₹{item.price.toFixed(2)}</span>
                  </div>
                  <p className={styles.description}>{item.description}</p>
                  <button className={styles.addToCart} onClick={() => addToCart(item)}>
                    Pre-order (Add to Cart)
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
