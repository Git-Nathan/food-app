import { Admin } from "../Admin";
import { Product } from "../Product";
import { Store } from "../Store";
import { AppFetch } from "./AppFetch";

export const appFetch = new AppFetch("https://food-app-api-z0uw.onrender.com", {
  headers: { "Content-Type": "application/json" },
});

const admin = new Admin();
const product = new Product();
const store = new Store();

export const Api = { admin, product, store };
