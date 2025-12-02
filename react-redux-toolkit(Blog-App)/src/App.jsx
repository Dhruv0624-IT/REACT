import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Blog from './Pages/Blog';
import ViewBlog from './Pages/ViewBlog';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold text-primary" to="/">
            📰 Blog App
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Add Blog</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/view" className="nav-link">View Blogs</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/view" element={<ViewBlog />} />
      </Routes>
    </Router>
  );
};

export default App;
