/** @format */

import axios from "axios";

export const getAllProducts = () => {
  try {
    const request = axios.get("http://localhost:8000/product", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    return (dispatch) => {
      request.then((response) => {
        dispatch({
          type: "GET_PRODUCT",
          payload: response.data.data
        });
      });
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllCategory = () => {
  try {
    const request = axios.get("http://localhost:8000/product/category", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    return (dispatch) => {
      request.then((response) => {
        dispatch({
          type: "GET_CATEGORIES",
          payload: response.data.data
        });
      });
    };
  } catch (error) {
    console.log(error.message);
  }
};
