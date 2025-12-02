import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="menu-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="12" x2="20" y2="12"></line>
      <line x1="4" y1="6" x2="20" y2="6"></line>
      <line x1="4" y1="18" x2="20" y2="18"></line>
    </svg>
  );

  const closeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="menu-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">
            CRUD
          </Link>
          <button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? closeIcon : menuIcon}
          </button>
        </div>

        <div className="navbar-links">
          <ul className="navbar-list">
            <li>
              <Link to="/add" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                Add Product
              </Link>
            </li>
            <li>
              <Link to="/view" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                View Products
              </Link>
            </li>
            <li>
              <Link to="/crud" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                CRUD
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={`mobile-menu-panel ${isMenuOpen ? 'open' : ''}`} id="mobile-menu">
        <ul className="mobile-list">
          <li>
            <Link to="/add" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
              Add Product
            </Link>
          </li>
          <li>
            <Link to="/view" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
              View Products
            </Link>
          </li>
          <li>
            <Link to="/crud" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
              CRUD
            </Link>
          </li>
        </ul>
      </div>

      <style>
        {`
          .navbar {
            background: linear-gradient(90deg, #1e40af 0%, #6b21a8 100%);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .navbar-container {
            max-width: 1280px;
            width: 100%;
            margin: 0 auto;
            padding: 0 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .navbar-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }

          .navbar-brand {
            color: #fff;
            font-weight: 800;
            font-size: 1.875rem;
            letter-spacing: 0.05em;
            text-decoration: none;
          }

          .navbar-links {
            display: none;
          }

          .navbar-list {
            margin: 0;
            padding: 0;
            display: flex;
            align-items: baseline;
            gap: 1.5rem;
          }

          .navbar-link {
            color: #fff;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.125rem;
            padding: 0.5rem;
            border-radius: 0.5rem;
            transition: color 0.2s;
          }
          
          .navbar-link:hover {
            color: #d1d5db;
          }
          
          .mobile-menu-button {
            display: none;
            background: none;
            border: none;
            padding: 0.5rem;
            cursor: pointer;
            border-radius: 0.375rem;
            color: #d1d5db;
            transition: background-color 0.2s, color 0.2s;
          }

          .mobile-menu-button:hover,
          .mobile-menu-button:focus {
            background-color: rgba(126, 34, 206, 0.8);
            color: #fff;
            outline: none;
            box-shadow: 0 0 0 2px rgba(167, 139, 250, 0.5);
          }

          .menu-icon {
            display: block;
            height: 1.5rem;
            width: 1.5rem;
          }

          .mobile-menu-panel {
            display: none;
            padding-top: 0.5rem;
            padding-bottom: 0.75rem;
          }

          .mobile-menu-panel.open {
            display: block;
          }
          
          .mobile-list {
            padding: 0.5rem 0.5rem 0.75rem 0.5rem;
            margin: 0;
            list-style: none;
          }
          
          .mobile-list li {
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
          }

          .mobile-link {
            display: block;
            color: #fff;
            font-size: 1rem;
            font-weight: 600;
            text-decoration: none;
            padding: 0.5rem;
            border-radius: 0.5rem;
            transition: background-color 0.2s;
          }

          .mobile-link:hover {
            background-color: rgba(126, 34, 206, 0.5);
          }
          
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
          }


          @media (min-width: 768px) {
            .navbar-header {
              width: auto;
            }
            .navbar-links {
              display: block;
              margin-left: 2.5rem;
            }
            .mobile-menu-button {
              display: none;
            }
            .mobile-menu-panel {
              display: none;
            }
          }
          
          @media (max-width: 767px) {
            .navbar {
              height: auto;
            }
            .navbar-container {
              flex-direction: column;
              align-items: flex-start;
              padding: 0.75rem 1rem;
            }
            .mobile-menu-button {
              display: inline-flex;
            }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
