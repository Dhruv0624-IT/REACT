import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';

const Home = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const newData = { ...data, createdAt: new Date() };
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/products`, newData);
      toast.success('🎉 Product added successfully!', {
        position: 'top-center',
        transition: Bounce,
        theme: 'colored',
      });
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-white shadow-lg rounded animate__animated animate__fadeIn">
        <h3 className="text-center text-primary mb-4">➕ Add New Product</h3>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select className="form-select" {...register('category')} required>
            <option value="">-- Select Category --</option>
            <option value="Electronic">Electronic</option>
            <option value="Cloth">Cloth</option>
            <option value="Toy">Toy</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" {...register('p_name')} className="form-control" placeholder="Enter product name" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input type="number" {...register('p_price')} className="form-control" placeholder="Enter price" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input type="text" {...register('p_url')} className="form-control" placeholder="https://example.com/image.jpg" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea {...register('p_desc')} className="form-control" placeholder="Write a short description" required />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary px-5 py-2">Submit</button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Home;

