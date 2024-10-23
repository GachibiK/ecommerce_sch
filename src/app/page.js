"use client";

import React, { useState } from "react";

export default function Component() {
  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([
    {
      title: "Amazing kitchen gadget!",
      content:
        "This air fryer has completely changed how I cook. It's so easy to use, and the food comes out crispy and delicious every time. The app with recipes is a great bonus!",
    },
    {
      title: "Great for busy families",
      content:
        "I love how quickly I can prepare meals with this air fryer. The presets are really handy, and clean-up is a breeze. The only downside is that it's a bit bulky on the counter.",
    },
    {
      title: "Healthier cooking made easy",
      content:
        "I've been able to make so many of my favorite foods with less oil. The results are fantastic - crispy on the outside, tender on the inside. The app control is also very convenient.",
    },
  ]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const temporaryReview = { title: "Great and efficient home appliance", content: newReview };

    // Add the new review to the state temporarily
    setReviews((prevReviews) => [temporaryReview, ...prevReviews]);
    setNewReview("");

    // Remove the review after 5 seconds and show the error message
    setTimeout(() => {
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review !== temporaryReview)
      );
      setErrorMessage("Kindly make a purchase first to write a review");
    }, 5000);
  };

  return (
    <div className="container mx-auto px-4 py-4 h-screen flex flex-col justify-between">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-2 text-center">Ultenic K10 Air Fryer Oven Combo</h1>
          <div className="mb-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/81-4kHbKVNL._AC_SL1500_-GDxRWggGAADaNaGOY4OSioRpHk7ciA.jpg"
              alt="Ultenic K10 Air Fryer Oven Combo"
              className="w-60 h-auto rounded-lg shadow-lg"
            />
          </div>
          <button className="w-full bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300 mb-4">
            Add to Cart
          </button>
          <p className="text-gray-600 text-center mb-2">
            5.3QT, 11 Presets, One-Touch Screen, APP Control with 100+ Recipes, Nonstick Basket, Dishwasher-Safe
          </p>
          <div className="text-xl font-bold mb-4 text-center">18,000 KSh</div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-2 text-center">Customer Reviews</h2>
          <div className="space-y-2 mb-4">
            {reviews.map((review, index) => (
              <div key={index} className="border-b pb-2">
                <p className="font-semibold mb-1 text-sm">{review.title}</p>
                <p className="text-gray-600 text-xs">{review.content}</p>
              </div>
            ))}
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="text-red-600 text-sm font-semibold mb-2 text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmitReview} className="space-y-2">
            <h3 className="text-lg font-semibold text-center">Write a Review</h3>
            <div>
              <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                Your Review
              </label>
              <textarea
                id="review"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                rows={3}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                placeholder="Write your review here..."
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300 w-full"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
