import { Api } from "@/api/configs";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class Stores {
  storeList = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setStoreList(data: any) {
    this.storeList = data;
  }

  setLoading(data: boolean) {
    this.loading = data;
  }

  async getAllStores() {
    this.loading = true;

    const res = await Api.store.getAllStore();
    if (res.ok) {
      const resData = await res.json();

      this.storeList = resData.data;
    } else {
      toast.error("Something went wrong");
    }

    this.loading = false;
  }
}

export const storesIntance = new Stores();
