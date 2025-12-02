import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/ProductAction';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    price: '',
    remarks: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, price } = form;

    if (!name.trim() || isNaN(price) || parseFloat(price) <= 0) {
      setError('Please enter a valid product name and price greater than 0.');
      return;
    }

    const newProduct = {
      name: name.trim(),
      price: parseFloat(price),
      remarks: form.remarks.trim(),
    };

    dispatch(addProduct(newProduct));
    setForm({ name: '', price: '', remarks: '' });
    setError('');
    navigate('/view');
  };

  return (
    <div className="container">
      <h2 className="title">➕ Add New Product</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="label">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="label">Price (₹)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="input"
            placeholder="Enter product price"
            required
            min="0.01"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="remarks" className="label">Remarks</label>
          <textarea
            id="remarks"
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            className="textarea"
            placeholder="Optional remarks"
            rows="3"
          />
        </div>

        <button type="submit" className="button">Add Product</button>
      </form>

      <style jsx>{`
        .container {
          max-width: 500px;
          margin: 40px auto;
          padding: 30px;
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          color: #333;
        }
        .title {
          text-align: center;
          margin-bottom: 25px;
          color: #1e40af;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #444;
          font-size: 1rem;
        }
        .input, .textarea {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
          font-size: 1rem;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .input:focus, .textarea:focus {
          border-color: #1e40af;
          outline: none;
          box-shadow: 0 0 0 2px rgba(30, 64, 175, 0.2);
        }
        .textarea {
          resize: vertical;
        }
        .button {
          width: 100%;
          padding: 12px;
          background-color: #1e40af;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }
        .button:hover {
          background-color: #1d3b9e;
          transform: translateY(-2px);
        }
        .error-message {
          background-color: #f8d7da;
          color: #721c24;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 0.9rem;
          border: 1px solid #f5c6cb;
        }
      `}</style>
    </div>
  );
}

export default AddProduct;