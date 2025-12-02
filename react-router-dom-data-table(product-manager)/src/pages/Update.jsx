import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'animate.css';

const Update = () => {
  const { id } = useParams();                   
  const navigate = useNavigate();                 
  const [product, setProduct] = useState({
    category: '',
    p_name: '',
    p_price: '',
    p_desc: '',
    p_url: ''
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updateProduct = async (e) => {
    e.preventDefault(); 
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/products/${id}`, product);
      navigate('/view'); 
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="container my-5">
      <form onSubmit={updateProduct} className="p-5 bg-light shadow-lg rounded animate__animated animate__fadeInDown">
        <h3 className="text-center text-info mb-4">✏️ Update Product</h3>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select name="category" value={product.category} onChange={handleChange} className="form-select" required>
            <option value="">--Select Category--</option>
            <option value="Electronic">Electronic</option>
            <option value="Cloth">Cloth</option>
            <option value="Toy">Toy</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="p_name"
            value={product.p_name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            name="p_price"
            value={product.p_price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            name="p_url"
            value={product.p_url}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="p_desc"
            value={product.p_desc}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-info text-white px-4 py-2">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
