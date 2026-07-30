import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'Top 10 Used Cars for Families in 2026',
      date: 'April 10, 2026',
      excerpt: 'Discover the most reliable, spacious, and family-friendly used cars currently available on the UK market, keeping safety and fuel economy in mind.',
      category: 'Buying Guide',
      image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'How to Prepare Your Car for a Quick Sale',
      date: 'March 25, 2026',
      excerpt: 'First impressions matter. Learn exactly how to detail, photograph, and price your vehicle so you can attract serious buyers instantly.',
      category: 'Selling Tips',
      image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'The Rise of Electric Vehicles in the Used Market',
      date: 'March 15, 2026',
      excerpt: 'With EV infrastructure expanding rapidly across the UK, are second-hand EVs finally worth the investment? We break down the costs and benefits.',
      category: 'Industry News',
      image: 'https://plus.unsplash.com/premium_photo-1715639312136-56a01f236440?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWxlY3RyaWMlMjB2ZWhpY2xlc3xlbnwwfHwwfHx8MA%3D%3D'
    }
  ];

  return (
    <div className="container py-5">
      <h2 className="section-title">UKDrives Blog</h2>
      <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '3rem', fontSize: '1.1rem' }}>
        Automotive news, buying guides, and tips for selling your car.
      </p>

      <div className="grid-container grid-3">
        {posts.map(post => (
          <div className="card" key={post.id}>
            <img src={post.image} alt={post.title} className="card-img" />
            <div className="card-body">
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                {post.category}
              </span>
              <h3 className="card-title" style={{ marginTop: '0.5rem', fontSize: '1.3rem' }}>{post.title}</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1rem' }}>{post.date}</p>
              <p style={{ color: 'var(--text-color)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} className="btn btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
