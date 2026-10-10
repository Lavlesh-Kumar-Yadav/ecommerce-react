import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { cart } = useContext(CartContext);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <h1>My Store</h1>
      </Link>
      <Link to="/Cart" className="navbar-cart">🛒 Cart ({cart.reduce((total,item)=>total+ item.quantity,0)})</Link>
    </nav>
  );
}
export default Navbar;
