export interface StoreDto {
  id: number;
  name: string;
  location: string;
  created_at: Date;
  updated_at: Date;
}
export interface CreateStoreDto {
  name: string;
  location: string;
}
export interface UpdateStoreDto {
  name: string;
  location: string;
}
