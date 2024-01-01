import { appFetch } from "./configs";

export class Order {
  getAllOrders() {
    return appFetch.get("/orders/getall");
  }

  getOrder(order_id: number) {
    return appFetch.get(`/orders/detail/${order_id}`);
  }

  changeStatus(order_id: number, status: any) {
    return appFetch.put(`/orders/update/status/${order_id}`, {
      status: status,
    });
  }
}
