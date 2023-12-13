import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  UPDATE_PRODUCT,
} from "@/constants/actionTypes";
import { all, takeLatest } from "redux-saga/effects";
import {
  addProductSaga,
  deleteProductSaga,
  getAllProductsSaga,
  updateProductSaga,
} from "./sagas/productSagas";

export default function* rootSaga() {
  yield all([
    takeLatest(GET_ALL_PRODUCTS, getAllProductsSaga),
    takeLatest(ADD_PRODUCT, addProductSaga),
    takeLatest(UPDATE_PRODUCT, updateProductSaga),
    takeLatest(DELETE_PRODUCT, deleteProductSaga),
  ]);
}
