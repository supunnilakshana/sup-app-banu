import {CreateStoreItemDto, StoreItemDto, UpdateStoreItemDto} from "@/dto";
import supabase from "@/utils/supabase-client";

class StoreItemService {
  constructor() {}

  async createStoreItem(item: CreateStoreItemDto): Promise<void> {
    try {
      const res = await supabase.from("store_items").insert(item);
      if (res.error) {
        throw res.error;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getStoreItem(): Promise<StoreItemDto[]> {
    try {
      const {data, error} = await supabase.from("store_items").select("*");
      if (error) {
        throw error;
      }

      return data as StoreItemDto[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateStoreItem(item: UpdateStoreItemDto, id: number): Promise<void> {
    try {
      await supabase.from("store_items").update(item).eq("id", id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteStoreItem(id: number): Promise<void> {
    try {
      await supabase.from("store_items").delete().eq("id", id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getStoreItemByItemId(id: String): Promise<StoreItemDto[]> {
    try {
      const {data, error} = await supabase
        .from("store_items")
        .select("*")
        .eq("item_id", id);
      if (error) {
        throw error;
      }

      return data as StoreItemDto[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default StoreItemService;
