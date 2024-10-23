"use client";
import { useState } from 'react';

const ReviewForm = ({ productId }) => {
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [orderID, setOrderID] = useState('');

  const submitReview = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, review, rating, productID: productId, orderID }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={submitReview} className="review-form">
      <h3>Write a Review</h3>
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Order ID"
        value={orderID}
        onChange={(e) => setOrderID(e.target.value)}
        required
      />
      <textarea
        placeholder="Your review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        {[...Array(6)].map((_, i) => (
          <option key={i} value={i}>{i}</option>
        ))}
      </select>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
