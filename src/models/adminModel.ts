export interface IAdmin {
  username: string;
  password: string;
}

export interface IAdminResponse {
  admin_id?: number;
  username?: string;
  password?: string;
  email?: string;
  fullname?: string;
}
