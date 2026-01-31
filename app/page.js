'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <Image
            src="/hero.jpg"
            alt="GEN-I Discussion"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
          <div className="overlay"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Intimacy with <span className="highlight">The Father</span>
          </h1>
          <p className="hero-subtitle">
            Deepening our relationship with God through unfiltered conversations on faith, growth, and divine connection.
          </p>
          <div className="hero-actions">
            <Link href="/episodes" className="btn btn-primary">Start Listening</Link>
            <Link href="/about" className="btn btn-outline">Our Heart</Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="section featured">
        <div className="section-header">
          <h2 className="section-title">Latest Revelation</h2>
          <Link href="/episodes" className="view-all">Explore All Episodes →</Link>
        </div>

        <div className="featured-card">
          <div className="featured-content">
            <span className="tag">New Release</span>
            <h3>Deepening Your Walk</h3>
            <p>Listen to our latest talk on building a daily, vibrant relationship with Jesus.</p>
            <Link href="/episodes" className="btn btn-primary">Listen Now</Link>
          </div>
        </div>
      </section>

      <section className="section mission">
        <div className="mission-box">
          <h2>Why GEN-I?</h2>
          <p>
            Generation Intimacy (GEN-I) is a sanctuary for those seeking more than ritual.
            We believe in the power of authentic fellowship and the transformative peace of God's presence.
            Join us as we explore the depths of intimacy with the Father.
          </p>
        </div>
      </section>

      <style jsx>{`
        .home-container {
          padding-bottom: 4rem;
        }
        .hero {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          overflow: hidden;
          padding: 2rem;
        }
        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(14,14,14,0.3), rgba(14,14,14,0.9));
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 2;
        }
        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        .hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.4;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));
        }
        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
        }
        .highlight {
          color: var(--primary-yellow);
          position: relative;
          display: inline-block;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 2.5rem;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        .btn {
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary {
          background: var(--primary-yellow);
          color: #000;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(255, 215, 0, 0.3);
        }
        .btn-outline {
          border: 2px solid var(--border);
          background: transparent;
          color: var(--foreground);
        }
        .btn-outline:hover {
          background: var(--card-bg);
        }
        
        .circle-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255,215,0,0.15) 0%, rgba(0,0,0,0) 70%);
          transform: translate(-50%, -50%);
          z-index: -1;
          pointer-events: none;
        }

        .section {
          max-width: 1200px;
          margin: 4rem auto;
          padding: 0 1.5rem;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .section-title {
          font-size: 2rem;
          font-weight: 700;
        }
        .view-all {
          color: var(--primary-yellow);
          font-weight: 500;
        }

        .featured-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 3rem;
          text-align: center;
        }
        .tag {
          background: var(--primary-yellow);
          color: #000;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 1rem;
          display: inline-block;
        }
        
        .mission-box {
          background: linear-gradient(135deg, #1a1a1a 0%, #0e0e0e 100%);
          border: 1px solid var(--border);
          padding: 4rem 2rem;
          border-radius: 24px;
          text-align: center;
        }
        .mission-box h2 {
          color: var(--primary-yellow);
          margin-bottom: 1rem;
          font-size: 2.5rem;
        }
        .mission-box p {
          max-width: 700px;
          margin: 0 auto;
          font-size: 1.2rem;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 3rem;
          }
        }
      `}</style>
    </div>
  );
}
