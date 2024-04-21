export interface MeasurementDto {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
export interface CreateMeasurementDto {
  name: string;
}
export interface UpdateMeasurementDto {
  name: string;
}
