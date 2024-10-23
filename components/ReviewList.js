"use client";
import { useEffect, useState } from 'react';

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(`/api/reviews?productID=${productId}`);
      const data = await response.json();
      setReviews(data);
    };
    fetchReviews();
  }, [productId]);

  return (
    <div className="reviews">
      <h3>Reviews</h3>
      {reviews.map((review) => (
        <div key={review.reviewID} className="review">
          <p>{review.review}</p>
          <small>Rating: {review.rating} / 5</small>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
