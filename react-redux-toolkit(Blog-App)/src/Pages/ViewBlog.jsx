import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { deleteBlog, setEditBlogId } from '../features/blogSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ViewBlog = () => {
  const { blogList } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const trash = (id) => {
    if (window.confirm("Do you want to delete this Blog?")) {
      dispatch(deleteBlog(id));
      toast.info("Blog Deleted");
    }
  };

  const edit = (id) => {
    dispatch(setEditBlogId(id));
    navigate("/");
  };

  return (
    <div className="container my-5">
      <table className='table table-bordered table-hover shadow-sm bg-white rounded-4'>
        <thead className='table-primary text-center'>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Title</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="align-middle text-center">
          {blogList && blogList.length > 0 ? blogList.map((blog, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td><span className="badge bg-info">{blog.blog_category}</span></td>
              <td className="fw-semibold">{blog.blog_title}</td>
              <td>{blog.blog_Date}</td>
              <td>
                <button onClick={() => edit(blog.id)} className='btn btn-sm btn-outline-primary me-2'>
                  <FaEdit /> Edit
                </button>
                <button onClick={() => trash(blog.id)} className='btn btn-sm btn-outline-danger'>
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" className="text-muted">No blogs found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBlog;
