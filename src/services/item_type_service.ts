import {CreateItemTypeDto, ItemTypeDto, UpdateItemTypeDto} from "@/dto";
import supabase from "@/utils/supabase-client";

class ItemTypeService {
  constructor() {}

  async createItemType(itemType: CreateItemTypeDto): Promise<void> {
    try {
      await supabase.from("item_types").insert(itemType);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getItemTypes(): Promise<ItemTypeDto[]> {
    try {
      const {data, error} = await supabase
        .from("item_types")
        .select("*")
        .order("created_at", {ascending: false});
      if (error) {
        throw error;
      }

      return data as ItemTypeDto[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateItemType(itemType: UpdateItemTypeDto, id: number): Promise<void> {
    try {
      await supabase.from("item_types").update(itemType).eq("id", id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteItemType(id: number): Promise<void> {
    try {
      await supabase.from("item_types").delete().eq("id", id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ItemTypeService;
