export interface ItemDto {
  id: number;
  name: string;
  image: string | null;
  type_id: number;
  measurement_id: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateItemDto {
  name: string;
  image: string | null;
  type_id: number;
  measurement_id: number;
}
export interface UpdateItemDto {
  name: string;
  image: string | null;
  type_id: number;
  measurement_id: number;
}
