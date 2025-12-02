import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'animate.css';

const SingleProduct = () => {
  const { ProductId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products/${ProductId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [ProductId]);

  if (!product) return <h5 className="text-center my-5">Loading...</h5>;

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-lg animate__animated animate__zoomIn">
        <div className="text-center mb-4">
          <img src={product.p_url} alt={product.p_name} width="200" className="img-thumbnail rounded shadow" />
        </div>
        <h4 className="text-center text-primary">{product.p_name}</h4>
        <hr />
        <ul className="list-group">
          <li className="list-group-item"><strong>ID:</strong> {product.id}</li>
          <li className="list-group-item"><strong>Category:</strong> {product.category}</li>
          <li className="list-group-item"><strong>Price:</strong> ₹{product.p_price}</li>
          <li className="list-group-item"><strong>Description:</strong> {product.p_desc}</li>
          <li className="list-group-item"><strong>Date:</strong> {new Date(product.createdAt).toLocaleDateString()}</li>
        </ul>
      </div>
    </div>
  );
};

export default SingleProduct;
