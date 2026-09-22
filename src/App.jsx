import products from "./data/Products";
import ProductCard from "./components/ProductCard";
import { CartProvider } from "./context/CartContext";
import "./App.css";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <div className="products-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
      <Cart />
    </CartProvider>
  );
}

export default App;