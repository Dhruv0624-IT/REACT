import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext.jsx';

const sections = ['home', 'about', 'education', 'skills', 'projects', 'experience', 'contact'];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setExpanded(false);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top glass-nav">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#home">
          <span className="brand-highlight">Dhruv Desai</span>
        </a>
        <button
          className="navbar-toggler border-0"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            {sections.map((section) => (
              <li className="nav-item" key={section}>
                <button
                  type="button"
                  className="btn nav-link px-2"
                  onClick={() => handleNavClick(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
          </ul>
          <motion.button
            type="button"
            className="btn theme-toggle-btn d-flex align-items-center"
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
          >
            {theme === 'light' ? <FaMoon className="me-2" /> : <FaSun className="me-2" />}
            <span className="d-none d-sm-inline">
              {theme === 'light' ? 'Dark' : 'Light'} mode
            </span>
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

