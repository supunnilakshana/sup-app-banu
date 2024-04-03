export interface MeasurementDto {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateMeasurementDto {
  name: string;
}
export interface UpdateMeasurementDto {
  name: string;
}
