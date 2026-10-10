import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [apiProduct, setApiProduct] = useState(null);
  
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiProduct(data)
      });
  }, [id]);
  
  const navigate = useNavigate();
  const formattedApiProduct = apiProduct
  ? {
      id: apiProduct.id,
      name: apiProduct.title,
      image: apiProduct.thumbnail,
      price: apiProduct.price,
      category: apiProduct.category,
      description: apiProduct.description,
    }
  : null;
  const product = formattedApiProduct;
  if (!product) {
    return (
      <div className="product-details">
        <h1>❌ Product Not Found</h1>
        <p>The product you're looking for does not exsit</p>
        <button onClick={() => navigate(-1)}>🔙 Back to Products</button>
      </div>
    );
  }
  return (
    <div className="product-details">
      <h2>API Product: {apiProduct?.title}</h2>
      
      <h2>Product Id: {id}</h2>
      <button onClick={() => navigate(-1)}>🔙 Back to Products</button>
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>₹{product.price}</p>
      <p>Category: {product.category}</p>
      <p>{product.description}</p>

      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}
export default ProductDetails;
