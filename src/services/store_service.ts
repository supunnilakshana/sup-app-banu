import { CreateStoreDto, StoreDto, UpdateStoreDto } from "@/dto";
import supabase from "@/utils/supabase-client";

class StoreService {
  constructor() {}

  async createStore(store: CreateStoreDto): Promise<void> {
    try {
      await supabase.from("store").insert(store);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getStore(): Promise<StoreDto[]> {
    try {
      const { data, error } = await supabase.from("store").select("*");
      if (error) {
        throw error;
      }

      return data as StoreDto[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateStore(store: UpdateStoreDto, id: number): Promise<void> {
    try {
      await supabase.from("store").update(store).eq("id", id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteStore(id: number): Promise<void> {
    try {
      await supabase.from("store").delete().eq("id", id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default StoreService;
