export interface IProduct {
  product_id?: number;
  product_name: string;
  store_id: number | null;
  avatar: string;
  size: string;
  price: string;
  discount: string;
  status: boolean;
  rate: string;
  description: string;
}
