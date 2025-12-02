import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { addBlog, editBlog, clearEditBlogId } from "../features/blogSlice";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogList, editBlogId } = useSelector((state) => state.blog);

  useEffect(() => {
    if (editBlogId) {
      const blogToEdit = blogList.find((b) => b.id === editBlogId);
      if (blogToEdit) {
        setValue('blog_category', blogToEdit.blog_category);
        setValue('blog_title', blogToEdit.blog_title);
        setValue('blog_Date', blogToEdit.blog_Date.replaceAll("/", "-"));
      }
    }
  }, [editBlogId]);

  const save = (data) => {
    const [year, month, day] = data.blog_Date.split("-");
    const formattedDate = `${year}/${month}/${day}`;

    if (editBlogId) {
      dispatch(editBlog({ id: editBlogId, updatedData: { ...data, blog_Date: formattedDate } }));
      dispatch(clearEditBlogId());
      toast.success("Blog Updated!");
    } else {
      dispatch(addBlog({
        id: uuidv4(),
        ...data,
        blog_Date: formattedDate,
      }));
      toast.success("Blog Added!");
    }

    reset();
    navigate("/view");
  };

  return (
    <form onSubmit={handleSubmit(save)} className="col-lg-6 mx-auto my-5 shadow p-5 bg-white rounded-4 border">
      <h3 className="text-center mb-4 text-primary fw-bold">
        {editBlogId ? "✏️ Edit Blog" : "📝 Add New Blog"}
      </h3>

      <div className="form-floating mb-3">
        <input
          type="text"
          {...register('blog_category', { required: true })}
          className="form-control"
          placeholder="Category"
        />
        <label>Blog Category</label>
        {errors.blog_category && <small className="text-danger">Category is required</small>}
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          {...register('blog_title', { required: true })}
          className="form-control"
          placeholder="Title"
        />
        <label>Blog Title</label>
        {errors.blog_title && <small className="text-danger">Title is required</small>}
      </div>

      <div className="form-floating mb-4">
        <input
          type="date"
          {...register('blog_Date', { required: true })}
          className="form-control"
        />
        <label>Blog Date</label>
        {errors.blog_Date && <small className="text-danger">Date is required</small>}
      </div>

      <button type="submit" className="btn btn-lg btn-primary w-100">
        {editBlogId ? "✅ Update Blog" : "➕ Submit Blog"}
      </button>
    </form>
  );
};

export default Blog;
