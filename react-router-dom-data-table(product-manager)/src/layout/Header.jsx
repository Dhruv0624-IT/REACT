import { NavLink } from "react-router-dom";
import "../styles/custom.css";


const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fs-3 fw-bold text-warning" to="/">🛍️ ProductHub</NavLink>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto text-uppercase">
            <li className="nav-item">
              <NavLink className="nav-link mx-2" to="/">Add</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link mx-2" to="/view">View</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link mx-2" to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
