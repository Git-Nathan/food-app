import { IProduct } from "@/models/productModel";
import { appFetch } from "./configs";

export class Product {
  getAllProducts() {
    return appFetch.get("/products/getAllProducts");
  }

  getProduct(product_id: number) {
    return appFetch.get(`/products/getProduct/${product_id}`);
  }

  addProduct(data: IProduct) {
    return appFetch.post(`/products/add`, data);
  }

  updateProduct(product_id: number, data: IProduct) {
    return appFetch.put(`/products/update/${product_id}`, data);
  }

  deleteProduct(product_id: number) {
    return appFetch.delete(`/products/delete/${product_id}`);
  }
}
