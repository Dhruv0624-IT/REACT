import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEye, FaEdit, FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const About = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('asc');

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products
    .filter((p) => p.p_name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => category === 'All' || p.category === category)
    .sort((a, b) => (sort === 'asc' ? a.p_price - b.p_price : b.p_price - a.p_price));

  return (
    <div className="container my-5">
      <h2 className="text-center text-dark mb-4">📋 All Products</h2>

      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Electronic">Electronic</option>
            <option value="Cloth">Cloth</option>
            <option value="Toy">Toy</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <button className="btn btn-outline-primary w-100" onClick={() => setSort(sort === 'asc' ? 'desc' : 'asc')}>
            Sort Price {sort === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center align-middle shadow bg-white">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Desc</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td><img src={item.p_url} alt={item.p_name} width="60" height="60" /></td>
                <td>{item.p_name}</td>
                <td>{item.category}</td>
                <td><strong className="text-success">₹{item.p_price}</strong></td>
                <td>{item.p_desc}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <NavLink to={`/SingleProduct/${item.id}`} className="btn btn-sm btn-outline-warning mx-1"><FaEye /></NavLink>
                  <NavLink to={`/Update/${item.id}`} className="btn btn-sm btn-outline-info mx-1"><FaEdit /></NavLink>
                  <button onClick={() => deleteProduct(item.id)} className="btn btn-sm btn-outline-danger mx-1"><FaTrash /></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="8">No products found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default About;
