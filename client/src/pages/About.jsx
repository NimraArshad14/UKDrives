import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="section-title">About the Project</h1>
        
        <div style={{ background: 'var(--white)', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>Student Developer</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--accent-color)', fontWeight: 'bold', marginBottom: '1rem' }}>Muhammad Aslam</p>
          <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '0.5rem' }}><strong>University:</strong> Birmingham City University</p>
          <p style={{ fontSize: '1.1rem', color: '#555' }}><strong>Project:</strong> UKDrives - Automotive Listing Platform</p>
        </div>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Academic Mission</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#444' }}>
            This web application, **UKDrives**, has been developed as part of my Final Year Web Development Project at Birmingham City University. The goal was to build a full-stack, industry-standard MERN (MongoDB, Express, React, Node.js) application that solves real-world problems in the automotive marketplace.
          </p>
        </section>

        <section style={{ marginBottom: '3rem', padding: '2rem', background: '#f9f9f9', borderRadius: '12px', borderLeft: '5px solid var(--accent-color)' }}>
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Technical Scope</h2>
          <p style={{ lineHeight: '1.8', color: '#444' }}>
            The project demonstrates advanced concepts in:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
            <li style={{ marginBottom: '0.8rem' }}>• Full CRUD operations for vehicle listings.</li>
            <li style={{ marginBottom: '0.8rem' }}>• Secure JWT-based User Authentication and Authorization.</li>
            <li style={{ marginBottom: '0.8rem' }}>• Responsive UI/UX design with modern CSS techniques.</li>
            <li style={{ marginBottom: '0.8rem' }}>• Integrated inquiry system and external contact launchers (WhatsApp).</li>
            <li style={{ marginBottom: '0.8rem' }}>• Dynamic data filtering and search optimization.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Future Roadmap</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#444' }}>
            As a student developer, I am committed to continuously improving this platform. Future updates will include integrated payment gateways for premium listings, advanced AI-driven price suggestions, and a more robust messaging dashboard.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
