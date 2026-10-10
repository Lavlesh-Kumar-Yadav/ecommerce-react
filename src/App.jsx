import { Route, Routes } from "react-router-dom";
import ProductDetails from "./components/ProductDetail";
import { CartProvider } from "./context/CartContext";
import "./App.css";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";

import Home from "./components/Home";

function App() {
  return (
    <CartProvider>
      <Navbar />

      <Routes>
        <Route path="/product/:id" element={<ProductDetails/>}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
      {/* <Cart /> */}
    </CartProvider>
  );
}

export default App;
