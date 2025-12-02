import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Header from './layout/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import SingleProduct from './pages/SingleProduct';
import Update from './pages/Update';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/SingleProduct/:ProductId" element={<SingleProduct />} />
        <Route path="/Update/:id" element={<Update />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
