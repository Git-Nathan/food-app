import { Api } from "@/api/configs";
import {
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_SUCCESS,
} from "@/constants/actionTypes";
import { IProduct } from "@/models/productModel";
import { toast } from "react-toastify";

import { call, put } from "redux-saga/effects";

export function* getAllProductsSaga(action: any) {
  try {
    const response: Response = yield call(Api.product.getAllProducts);

    const data: IProduct[] = yield call([response, "json"]);

    yield put({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: GET_ALL_PRODUCTS_FAILURE, error });
  }
}

export function* addProductSaga(action: any) {
  try {
    const response: Response = yield call(
      Api.product.addProduct,
      action.payload,
    );

    if (response.ok) {
      toast.success("Product added successfully");
      yield put({ type: ADD_PRODUCT_SUCCESS, payload: action.payload });
    } else {
      toast.success("Something went wrong");
    }
  } catch (error) {
    yield put({ type: ADD_PRODUCT_FAILURE, error });
  }
}

export function* updateProductSaga(action: any) {
  try {
    const response: Response = yield call(
      Api.product.updateProduct,
      action.payload.product_id,
      action.payload.data,
    );

    if (response.ok) {
      toast.success("Product edited successfully");
      yield put({ type: UPDATE_PRODUCT_SUCCESS, payload: action.payload });
    } else {
      toast.success("Something went wrong");
    }
  } catch (error) {
    yield put({ type: UPDATE_PRODUCT_FAILURE, error });
  }
}

export function* deleteProductSaga(action: any) {
  try {
    const response: Response = yield call(
      Api.product.deleteProduct,
      action.payload,
    );

    if (response.ok) {
      toast.success("Delete product successfully");
      yield put({ type: DELETE_PRODUCT_SUCCESS, payload: action.payload });
    } else {
      toast.success("Something went wrong");
    }
  } catch (error) {
    yield put({ type: DELETE_PRODUCT_FAILURE, error });
  }
}
