import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <img
        className="product-image"
        src={product.image}
        alt={product.name}
      />

      <h2>{product.name}</h2>

      <p className="product-price">₹{product.price}</p>

      <button
        className="add-button"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;