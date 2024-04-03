import { CreateItemDto, ItemDto, UpdateItemDto } from "@/dto";
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

  async getItem(): Promise<ItemDto[]> {
    try {
      const { data, error } = await supabase.from("items").select("*");
      if (error) {
        throw error;
      }

      return data as ItemDto[];
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
