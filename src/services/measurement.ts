import {
  CreateMeasurementDto,
  ItemDto,
  MeasurementDto,
  UpdateItemDto,
  UpdateMeasurementDto,
} from "@/dto";
import supabase from "@/utils/supabase-client";

class MeasurementService {
  constructor() {}

  async createMeasurement(measurement: CreateMeasurementDto): Promise<void> {
    try {
      await supabase.from("measurements").insert(measurement);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMeasurement(): Promise<MeasurementDto[]> {
    try {
      const { data, error } = await supabase.from("measurements").select("*");
      if (error) {
        throw error;
      }

      return data as MeasurementDto[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateMeasurement(
    measurement: UpdateMeasurementDto,
    id: number
  ): Promise<void> {
    try {
      await supabase.from("measurements").update(measurement).eq("id", id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteMeasurement(id: number): Promise<void> {
    try {
      await supabase.from("measurements").delete().eq("id", id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default MeasurementService;
