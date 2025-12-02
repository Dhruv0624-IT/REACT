// src/redux/ProductAction.js

import { v4 as uuidv4 } from 'uuid'; // You'll need to install this package

export const addProduct = (product) => {
  return (dispatch) => {
    // Generate a unique ID for the new product
    const newProduct = { ...product, id: uuidv4() };
    dispatch({
      type: 'ADD_PRODUCT',
      payload: newProduct,
    });
  };
};

export const deleteProduct = (id) => {
  return (dispatch) => {
    dispatch({
      type: 'DELETE_PRODUCT',
      payload: id,
    });
  };
};

export const updateProduct = (product) => {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: product,
    });
  };
};

