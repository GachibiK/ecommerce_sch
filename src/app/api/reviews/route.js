// src/app/api/reviews/route.js
import { connectToDatabase } from '../../../../lib/db';

// POST method to handle review submission
export async function POST(req) {
  const db = await connectToDatabase();
  const { email, review, productID, orderID } = await req.json();

  try {
    // Check if the order exists for this user
    const [order] = await db.query(
      'SELECT * FROM orders WHERE orderID = ? AND userID = (SELECT userid FROM users WHERE email = ?)',
      [orderID, email]
    );

    if (order.length === 0) {
      return new Response(JSON.stringify({ message: 'Order not found. Please make a purchase first.' }), { status: 400 });
    }

    // Add the review to the database
    await db.query(
        'INSERT INTO reviews (review, userID, productID, orderID) VALUES (?, (SELECT userid FROM users WHERE email = ?), ?, ?)',
        [review, email, productID, orderID]
    );

    return new Response(JSON.stringify({ message: 'Review added successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'An error occurred while adding the review.' }), { status: 500 });
  }
}

// GET method to fetch reviews for a product
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const productID = searchParams.get('productID');

  if (!productID) {
    return new Response(JSON.stringify({ message: 'Product ID is required' }), { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    const [reviews] = await db.query(
      'SELECT r.reviewID, r.review, u.username FROM reviews r JOIN users u ON r.userID = u.userid WHERE r.productID = ?',
      [productID]
    );

    return new Response(JSON.stringify(reviews), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'An error occurred while fetching reviews.' }), { status: 500 });
  }
}
