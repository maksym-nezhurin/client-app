import Link from 'next/link';
import React from 'react';

const TrustBenefits = () => {
  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Why Choose <span style={styles.highlight}>AutoMarket</span>?</h2>
      <ul style={styles.list}>
        <li style={styles.item}>
          <span style={styles.icon}>🔒</span>
          <div>
            <strong>Secure Transactions</strong> — We guarantee transparency and reliability in every purchase.
          </div>
        </li>
        <li style={styles.item}>
          <span style={styles.icon}>🚀</span>
          <div>
            <strong>Fast Search</strong> — Convenient filters and smart search help you find your car in seconds.
          </div>
        </li>
        <li style={styles.item}>
          <span style={styles.icon}>🤝</span>
          <div>
            <strong>24/7 Support</strong> — Our team is always ready to assist you at every step.
          </div>
        </li>
        <li style={styles.item}>
          <span style={styles.icon}>💰</span>
          <div>
            <strong>Great Deals</strong> — We offer the best prices and offers from dealers and owners.
          </div>
        </li>
        <li style={styles.item}>
          <span style={styles.icon}>📱</span>
          <div>
            <strong>Mobile Friendly</strong> — Use our service anywhere, anytime.
          </div>
        </li>
      </ul>
      <div style={styles.ctaContainer}>
        <button style={{ ...styles.button, ...styles.primaryButton }}>Start Searching</button>
        <Link href="https://admin-liard-pi-71.vercel.app" style={{ ...styles.button, ...styles.secondaryButton }}>Post an Ad</Link>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: '#f9fafb',
    padding: '60px 20px',
    maxWidth: '900px',
    margin: '0 auto',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '2.4rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '40px',
    color: '#222',
  },
  highlight: {
    color: '#ff5a1f',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '40px',
  },
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px',
    fontSize: '1.1rem',
    marginBottom: '25px',
    color: '#444',
  },
  icon: {
    fontSize: '2rem',
    lineHeight: '1',
    flexShrink: 0,
  },
  ctaContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  button: {
    fontSize: '1.1rem',
    padding: '14px 30px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
  primaryButton: {
    backgroundColor: '#ff5a1f',
    color: '#fff',
  },
  secondaryButton: {
    backgroundColor: '#eee',
    color: '#333',
  },
};

export default TrustBenefits;
