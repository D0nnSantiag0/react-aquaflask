import axios from "axios";

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,

} from "../constants/productConstants";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCTS_REQUEST,
    });
    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products`);

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminProducts = () => async (dispatch) => {
  try {
      dispatch({ type: ADMIN_PRODUCTS_REQUEST })
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/products`, {
          //AxiosRequestConfig parameter
          withCredentials: true //correct
      })
      dispatch({
          type: ADMIN_PRODUCTS_SUCCESS,
          payload: data.products
      })
  } catch (error) {
      dispatch({
          type: ADMIN_PRODUCTS_FAIL,
          payload: error.response.data.message
      })
  }
};

export const newProduct = (productData) => async (dispatch) => {
  try {
      dispatch({ type: NEW_PRODUCT_REQUEST })
      const config = {
          headers: {
              'Content-Type': 'application/json'
          },
          // withCredentials: true //correct
      }
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/admin/product/new`, productData, config)
      dispatch({
          type: NEW_PRODUCT_SUCCESS,
          payload: data
      })
  } catch (error) {
      dispatch({
          type: NEW_PRODUCT_FAIL,
          payload: error.response.data.message
      })
  }

}

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST })
      const config = {
          headers: {
              'Content-Type': 'application/json'
          },
          withCredentials: true
      }
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/product/${id}`, productData, config)
      dispatch({
          type: UPDATE_PRODUCT_SUCCESS,
          payload: data.success
      })
  } catch (error) {
      dispatch({
          type: UPDATE_PRODUCT_FAIL,
          payload: error.response.data.message
      })
  }
}

