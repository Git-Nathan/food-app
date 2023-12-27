import { appFetch } from "./configs";

export class Order {
  getAllOrders() {
    return appFetch.get("/orders/getall");
  }

  getOrder(order_id: number) {
    return appFetch.get(`/orders/detail/${order_id}`);
  }
}
