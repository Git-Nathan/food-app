import { Api } from "@/api/configs";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class OrdersStore {
  orderList = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setOrderList(data: any) {
    this.orderList = data;
  }

  setLoading(data: boolean) {
    this.loading = data;
  }

  async getAllStores() {
    this.loading = true;
    const res = await Api.order.getAllOrders();
    if (res.ok) {
      const resData = await res.json();
      this.orderList = resData.data;
    } else {
      toast.error("Something went wrong");
    }
    this.loading = false;
  }
}

export const ordersStoreIntance = new OrdersStore();
