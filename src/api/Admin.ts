import { IAdmin } from "@/models/adminModel";
import { appFetch } from "./configs";

export class Admin {
  register(data: IAdmin) {
    return appFetch.post(`/admins/signup`, data);
  }

  signin(data: IAdmin) {
    return appFetch.post(`/admins/signin`, data);
  }
}
