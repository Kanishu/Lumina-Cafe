import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Lumina Cafe & Restaurant | Smart Dining",
  description: "Experience smart dining at Lumina Cafe. Reserve tables, pre-order food, and get personalized recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main className="main-content">
          {children}
        </main>

        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <div className="logo">✨ Lumina</div>
                <p className="footer-desc">
                  Elevating your dining experience with smart reservations, seamless pre-ordering, and AI-driven recommendations.
                </p>
              </div>
              <div>
                <h4 className="footer-title">Quick Links</h4>
                <ul className="footer-links">
                  <li><Link href="/menu" className="footer-link">Our Menu</Link></li>
                  <li><Link href="/reservations" className="footer-link">Book a Table</Link></li>
                  <li><Link href="/track" className="footer-link">Track Order</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="footer-title">Contact</h4>
                <ul className="footer-links">
                  <li><span className="footer-link">123 Culinary Ave, City</span></li>
                  <li><span className="footer-link">hello@luminacafe.com</span></li>
                  <li><span className="footer-link">+1 (555) 123-4567</span></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              &copy; {new Date().getFullYear()} Lumina Cafe. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
