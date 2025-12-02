import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blog from './Pages/Blog';
import ViewBlog from './Pages/ViewBlog';
import { ToastContainer } from 'react-toastify';
import NavBar from './layout/NavBar'; 

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <NavBar /> 

      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/addBlog" element={<Blog />} />
        <Route path="/ViewBlog" element={<ViewBlog />} />
      </Routes>
    </Router>
  );
};

export default App;
