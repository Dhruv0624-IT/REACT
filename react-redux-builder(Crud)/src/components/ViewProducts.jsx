import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, updateProduct } from '../redux/ProductAction';

function ViewProducts() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: '', price: '', remarks: '' });

  const handleEdit = (product) => {
    setEditId(product.id);
    setEditData(product);
  };

  const handleUpdate = () => {
    if (!editData.name || isNaN(parseFloat(editData.price)) || parseFloat(editData.price) <= 0) {
      alert('Please provide a valid name and a price greater than 0.');
      return;
    }

    dispatch(updateProduct({ ...editData, price: parseFloat(editData.price) }));
    setEditId(null);
    setEditData({ name: '', price: '', remarks: '' });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditData({ name: '', price: '', remarks: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="container">
      <h2 className="products-heading">Product List 🛒</h2>

      {products.length === 0 ? (
        <p className="status-message">No products found. Add one!</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {editId === product.id ? (
                <div className="product-edit-form">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    placeholder="Name"
                    className="edit-input"
                  />
                  <input
                    type="number"
                    value={editData.price}
                    onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                    placeholder="Price"
                    className="edit-input"
                  />
                  <textarea
                    value={editData.remarks}
                    onChange={(e) => setEditData({ ...editData, remarks: e.target.value })}
                    placeholder="Remarks"
                    className="edit-textarea"
                  />
                  <div className="product-actions">
                    <button className="update-button" onClick={handleUpdate}>Update</button>
                    <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">₹ {product.price}</p>
                    <p className="product-remarks">{product.remarks || 'No remarks'}</p>
                  </div>
                  <div className="product-actions">
                    <button className="edit-button" onClick={() => handleEdit(product)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(product.id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 40px auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .products-heading {
          text-align: center;
          color: #1e40af;
          margin-bottom: 40px;
          font-weight: 700;
          font-size: 2.5rem;
        }
        .status-message {
          text-align: center;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
          font-size: 1.1rem;
          color: #6b7280;
          background-color: #f3f4f6;
          border: 1px solid #e5e7eb;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 25px;
        }
        .product-card {
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          padding: 25px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        .product-name {
          font-size: 1.5rem;
          color: #1e40af;
          margin-bottom: 10px;
        }
        .product-price {
          font-size: 1.2rem;
          color: #059669;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .product-remarks {
          color: #6b7280;
          font-size: 1rem;
          font-style: italic;
          min-height: 40px;
        }
        .product-edit-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .edit-input, .edit-textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
        }
        .product-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        .edit-button, .delete-button, .update-button, .cancel-button {
          flex-grow: 1;
          padding: 10px;
          border: none;
          border-radius: 8px;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }
        .edit-button { background-color: #f59e0b; }
        .edit-button:hover { background-color: #d97706; }
        .delete-button { background-color: #ef4444; }
        .delete-button:hover { background-color: #dc2626; }
        .update-button { background-color: #059669; }
        .update-button:hover { background-color: #047857; }
        .cancel-button { background-color: #6b7280; }
        .cancel-button:hover { background-color: #4b5563; }
        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default ViewProducts;