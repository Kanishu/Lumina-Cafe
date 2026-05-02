import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <Image 
            src="/hero.png" 
            alt="Lumina Cafe Interior" 
            fill 
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="container">
          <div className="hero-content">
            <span className="hero-tag">Smart Dining Experience</span>
            <h1 className="hero-title">
              Taste the Future of <span>Culinary Excellence</span>
            </h1>
            <p className="hero-desc">
              Experience Lumina Cafe. Reserve your table instantly, pre-order your favorite meals, and let our AI curate the perfect dining experience tailored just for you.
            </p>
            <div className="hero-actions">
              <Link href="/reservations" className="btn-primary">
                Book a Table
              </Link>
              <Link href="/menu" className="btn-outline">
                Explore Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Lumina?</h2>
            <p className="section-desc">
              We've reimagined the dining experience from the ground up to give you more time to enjoy your food.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🗓️</div>
              <h3 className="feature-title">Smart Reservations</h3>
              <p className="feature-desc">
                Book your ideal table in seconds. Our system ensures you never have to wait in line again.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Seamless Pre-ordering</h3>
              <p className="feature-desc">
                Order your meals before you arrive. Walk in, sit down, and enjoy your hot meal immediately.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3 className="feature-title">AI Recommendations</h3>
              <p className="feature-desc">
                Not sure what to eat? Our smart AI analyzes your taste profile to suggest the perfect dish.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
