"use client";
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';

const ProductDetails = ({ product }) => {
  return (
    <div className="product-details">
      <h1>{product.productname}</h1>
      <p>{product.productdescription}</p>

      <ReviewList productId={product.productID} />
      <ReviewForm productId={product.productID} />
    </div>
  );
};

export default ProductDetails;
