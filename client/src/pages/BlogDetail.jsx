import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();

  // In a real app, this would come from an API. 
  // For this project, we'll use the same static data based on ID.
  const posts = {
    '1': {
      title: 'Top 10 Used Cars for Families in 2026',
      date: 'April 10, 2026',
      author: 'UKDrives Editorial',
      category: 'Buying Guide',
      image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=1200',
      content: `
        Finding the perfect family car in the pre-owned market is all about balancing safety, space, and economic value. In 2026, the market has shifted significantly towards hybrid and electric options, but reliable diesel and petrol models still hold their ground for long-distance commuters.

        Key considerations for your next family purchase:
        1. Safety Ratings: Look for 5-star Euro NCAP ratings.
        2. Boot Space: Ensure it fits the stroller, sports gear, and grocery bags.
        3. Reliability: Our data shows Toyota and Volvo are leading the charts this year.

        Whether you're looking at a spacious SUV like the Kia Sportage or a versatile hatchback like the Volkswagen Golf, verify the service history before committing.
      `
    },
    '2': {
      title: 'How to Prepare Your Car for a Quick Sale',
      date: 'March 25, 2026',
      author: 'Professional Seller Team',
      category: 'Selling Tips',
      image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=1200',
      content: `
        Selling your car quickly requires more than just a "For Sale" sign. In the digital age, presentation is everything. 

        Cleanliness is King: A professional detail can add hundreds to your final sale price. Ensure the interior is vacuumed and the exterior has a fresh wax coat.

        Photography Tips: Take your photos during 'Golden Hour' (just before sunset). Show all angles, the dashboard, and any minor imperfections to build trust with potential buyers.

        Pricing: Use the UKDrives price comparison tool to see what similar models are fetching in London, Manchester, and Birmingham.
      `
    },
    '3': {
      title: 'The Rise of Electric Vehicles in the Used Market',
      date: 'March 15, 2026',
      author: 'Tech Analyst',
      category: 'Industry News',
      image: 'https://plus.unsplash.com/premium_photo-1715639312136-56a01f236440?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWxlY3RyaWMlMjB2ZWhpY2xlc3xlbnwwfHwwfHx8MA%3D%3D',
      content: `
        The second-hand EV market is booming. As the 2030 targets approach, more and more drivers are looking to make the switch to electric without the premium price tag of a factory-new model.

        Battery Health: This is the most critical factor when buying a used Tesla or Nissan Leaf. Always ask for a battery health diagnostic report.

        Maintenance Savings: While the upfront cost might be higher, the long-term savings on brake wear and oil changes make used EVs a smart financial decision for city dwellers.
      `
    }
  };

  const post = posts[id];

  if (!post) return <div className="container py-5">Post not found. <Link to="/blog">Back to Blog</Link></div>;

  return (
    <div className="container py-5" style={{ maxWidth: '900px' }}>
      <Link to="/blog" style={{ color: 'var(--accent-color)', fontWeight: 600, marginBottom: '2rem', display: 'inline-block' }}>
        ← Back to Blog
      </Link>

      <article>
        <img src={post.image} alt={post.title} style={{ width: '100%', borderRadius: '12px', marginBottom: '2rem', height: '450px', objectFit: 'cover' }} />

        <span style={{ fontSize: '0.9rem', color: 'var(--accent-color)', fontWeight: 'bold', textTransform: 'uppercase' }}>
          {post.category}
        </span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '1rem', color: 'var(--primary-color)' }}>{post.title}</h1>
        <p style={{ color: 'var(--text-light)', margin: '1rem 0 2rem' }}>
          By <strong>{post.author}</strong> on {post.date}
        </p>

        <div style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#444', whiteSpace: 'pre-wrap' }}>
          {post.content}
        </div>
      </article>

      <div style={{ marginTop: '4rem', padding: '2rem', background: '#fff', borderRadius: '12px', border: '1px solid #eee' }}>
        <h3>Have a question about this article?</h3>
        <p>Contact our editorial team at blog@ukdrives.com</p>
      </div>
    </div>
  );
};

export default BlogDetail;
