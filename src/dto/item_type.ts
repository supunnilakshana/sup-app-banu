export interface ItemTypeDto {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateItemTypeDto {
  name: string;
}

export interface UpdateItemTypeDto {
  id: number;
  name: string;
}
