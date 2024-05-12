import {
  CreateItemDto,
  ItemDto,
  ItemTypeDto,
  ItemWSIDto,
  MeasurementDto,
  StoreItemDto,
  UpdateItemDto,
} from "@/dto";
import supabase from "@/utils/supabase-client";

class ItemService {
  constructor() {}

  async createItem(item: CreateItemDto): Promise<void> {
    try {
      await supabase.from("items").insert(item);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getItems(): Promise<ItemDto[]> {
    try {
      const {data, error} = await supabase
        .from("items")
        .select(`*, item_types(*), measurements(*)`);

      if (error) {
        throw error;
      }
      const list = data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        type_id: item.type_id,
        measurement_id: item.measurement_id,
        created_at: item.created_at,
        updated_at: item.updated_at,
        type: item.item_types as ItemTypeDto,
        measurement: item.measurements as MeasurementDto,
      })) as ItemDto[];
      console.log("list", list);
      return list;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getItemsWithStoreItems(): Promise<ItemWSIDto[]> {
    try {
      const {data, error} = await supabase
        .from("items")
        .select(`*, item_types(*), measurements(*), store_items(*)`);

      if (error) {
        throw error;
      }
      const list = data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        type_id: item.type_id,
        measurement_id: item.measurement_id,
        created_at: item.created_at,
        updated_at: item.updated_at,
        type: item.item_types as ItemTypeDto,
        measurement: item.measurements as MeasurementDto,
        store_items: item.store_items as StoreItemDto[],
      })) as ItemWSIDto[];
      console.log("list", list);
      return list;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateItem(item: UpdateItemDto, id: number): Promise<void> {
    try {
      await supabase.from("items").update(item).eq("id", id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteItem(id: number): Promise<void> {
    try {
      await supabase.from("items").delete().eq("id", id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ItemService;
