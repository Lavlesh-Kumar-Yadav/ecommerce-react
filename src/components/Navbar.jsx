import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>My Store</h1>
      </div>
      <span className="navbar-cart">🛒 Cart ({cart.reduce((total,item)=>total+ item.quantity,0)})</span>
    </nav>
  );
}
export default Navbar;
