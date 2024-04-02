export interface StoreDto {
  id: number;
  name: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateStoreDto {
  name: string;
  location: string;
}
export interface UpdateStoreDto {
  id: number;
  name: string;
  location: string;
}
