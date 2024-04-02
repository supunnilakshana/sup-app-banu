export interface StoreItem {
  id: number;
  name: string;
  price: number;
  per_qty: number;
  discount: number;
  store_id: number;
  item_id: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateStoreItem {
  name: string;
  price: number;
  per_qty: number;
  discount: number;
  store_id: number;
  item_id: number;
}
export interface UpdateStoreItem {
  id: number;
  name: string;
  price: number;
  per_qty: number;
  discount: number;
  store_id: number;
  item_id: number;
}
