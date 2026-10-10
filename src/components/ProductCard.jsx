import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, onSelect }) {
  const { addToCart } = useContext(CartContext);
  const navigate= useNavigate();

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <img className="product-image" src={product.image} alt={product.name} />

      <h2>{product.name}</h2>

      <p className="product-price">₹{product.price}</p>

      <button
        className="add-button"
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
