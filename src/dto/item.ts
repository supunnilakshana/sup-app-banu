import {ItemTypeDto} from "./item_type";
import {MeasurementDto} from "./measurement";
import {StoreItemDto} from "./store_item";

export interface ItemDto {
  id: number;
  name: string;
  image: string | null;
  type_id: number;
  measurement_id: number;
  type: ItemTypeDto;
  measurement: MeasurementDto;
  created_at: Date;
  updated_at: Date;
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

export interface ItemWSIDto {
  id: number;
  name: string;
  image: string | null;
  type_id: number;
  measurement_id: number;
  type: ItemTypeDto;
  measurement: MeasurementDto;
  store_items: StoreItemDto[];
  created_at: Date;
  updated_at: Date;
}
