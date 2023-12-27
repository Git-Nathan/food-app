import { IStore } from "@/models/storeModel";
import { appFetch } from "./configs";

export class Store {
  getAllStore() {
    return appFetch.get("/stores/getAllStores/");
  }

  getStore(store_id: number) {
    return appFetch.get(`/stores/getStore/${store_id}`);
  }

  addStore(data: IStore) {
    return appFetch.post(`/stores/add`, data);
  }

  updateStore(store_id: number, data: IStore) {
    return appFetch.put(`/stores/update/${store_id}`, data);
  }

  deleteStore(store_id: number) {
    return appFetch.delete(`/stores/delete/${store_id}`);
  }
}
