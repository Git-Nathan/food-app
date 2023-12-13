import { combineReducers } from "@reduxjs/toolkit";
import { productsReducer } from "./reducers/productsReducer";

const rootReducer = combineReducers({
  products: productsReducer,
});

export default rootReducer;
