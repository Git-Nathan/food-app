import {
  ADD_PRODUCT,
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS_SUCCESS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_SUCCESS,
} from "@/constants/actionTypes";
import { IProduct } from "@/models/productModel";

interface IState {
  list: IProduct[];
  total: number;
  isLoading: boolean;
  error: string | null;
}

const initialState = {
  list: [],
  total: 0,
  isLoading: false,
  error: null,
};

export function productsReducer(state: IState = initialState, action: any) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        list: action.payload.data,
        total: action.payload.total,
        isLoading: false,
        error: null,
      };
    case GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        error: null,
      };
    case ADD_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_PRODUCT_SUCCESS: {
      const newList = state.list.map((item) => {
        if (item.product_id === action.payload.product_id) {
          return { ...action.payload.data, product_id: item.product_id };
        }

        return item;
      });

      return {
        ...state,
        list: newList,
        isLoading: false,
        error: null,
      };
    }
    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_PRODUCT_SUCCESS: {
      let newList = [...state.list];
      newList = newList.filter((item) => item.product_id !== action.payload);

      return {
        ...state,
        list: newList,
        isLoading: false,
        error: null,
      };
    }
    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
