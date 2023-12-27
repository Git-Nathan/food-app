import { Admin } from "../Admin";
import { Order } from "../Order";
import { Product } from "../Product";
import { Store } from "../Store";
import { AppFetch } from "./AppFetch";

export const appFetch = new AppFetch("https://food-app-api-z0uw.onrender.com", {
  headers: { "Content-Type": "application/json" },
});

const admin = new Admin();
const product = new Product();
const store = new Store();
const order = new Order();

export const Api = { admin, product, store, order };
