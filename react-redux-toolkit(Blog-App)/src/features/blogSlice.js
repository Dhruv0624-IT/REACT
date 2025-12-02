import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    counter: 0,
    blogList: [],
    editBlogId: null,
  },
  reducers: {
    inc: (state) => {
      state.counter += 1;
    },
    dec: (state) => {
      if (state.counter > 0) state.counter -= 1;
    },
    reset: (state) => {
      state.counter = 0;
    },
    incByTen: (state, action) => {
      state.counter += action.payload;
    },
    addBlog: (state, action) => {
      state.blogList.push(action.payload);
    },
    deleteBlog: (state, action) => {
      const id = action.payload;
      state.blogList = state.blogList.filter((blog) => blog.id !== id);
    },
    setEditBlogId: (state, action) => {
      state.editBlogId = action.payload;
    },
    clearEditBlogId: (state) => {
      state.editBlogId = null;
    },
    editBlog: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.blogList.findIndex((blog) => blog.id === id);
      if (index !== -1) {
        state.blogList[index] = { ...state.blogList[index], ...updatedData };
      }
    },
  },
});
export const {inc,dec,reset,incByTen,addBlog,deleteBlog,editBlog,setEditBlogId,clearEditBlogId,} = blogSlice.actions;
export default blogSlice.reducer;
