import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  UPDATE_PRODUCT,
} from "@/constants/actionTypes";
import { IProduct } from "@/models/productModel";

export const getAllProducts = () => ({
  type: GET_ALL_PRODUCTS,
});

export const getProduct = (product_id: number) => ({
  type: GET_PRODUCT,
  payload: product_id,
});

export const addProduct = (data: IProduct) => ({
  type: ADD_PRODUCT,
  payload: data,
});

export const updateProduct = (product_id: number, data: IProduct) => ({
  type: UPDATE_PRODUCT,
  payload: { product_id, data },
});

export const deleteProduct = (product_id: number) => ({
  type: DELETE_PRODUCT,
  payload: product_id,
});
