export interface StoreItemDto {
  id: number;
  name: string;
  price: number;
  per_qty: number;
  discount: number;
  store_id: number;
  item_id: number;
  created_at: Date;
  updated_at: Date;
}
export interface CreateStoreItemDto {
  name: string;
  price: number;
  per_qty: number;
  discount: number;
  store_id: number;
  item_id: number;
}
export interface UpdateStoreItemDto {
  name: string;
  price: number;
  per_qty: number;
  discount: number;
  store_id: number;
  item_id: number;
}
