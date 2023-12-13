import { appFetch } from "./configs";

export class Store {
  getAllStore() {
    return appFetch.get("/stores/getAllStores/");
  }
}
