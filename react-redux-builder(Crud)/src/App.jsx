import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddProduct from './components/AddProduct';
import ViewProducts from './components/ViewProducts';
import Crud from './components/Crud';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/add" element={<AddProduct />} />
          <Route path="/view" element={<ViewProducts />} />
          <Route path="/crud" element={<Crud />} />
          <Route path="*" element={
            <div>
              <h1>Welcome!</h1>
              <p>Please use the navigation bar to get started.</p>
            </div>
          } />
        </Routes>
      </main>
    </>
  );
}

export default App;
