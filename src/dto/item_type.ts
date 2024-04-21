export interface ItemTypeDto {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateItemTypeDto {
  name: string;
}

export interface UpdateItemTypeDto {
  name: string;
}
