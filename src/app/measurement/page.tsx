"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import CreateMeasurementForm from "@/components/form/CreateMeasurementForm";
import { getColumnDefs } from "./column";
import {
  CreateMeasurementDto,
  MeasurementDto,
  UpdateMeasurementDto,
} from "@/dto";
import MeasurementService from "../../services/measurement_service";
import NavBar from "@/components/navbar/NavBar";

const measurementService = new MeasurementService();

function Item() {
  const [measurement, setMeasurement] = useState<MeasurementDto[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const measurementsData = await measurementService.getMeasurement();
        setMeasurement(measurementsData);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    }

    fetchData();
  }, []);

  async function addMeasurement(data: CreateMeasurementDto): Promise<void> {
    try {
      await measurementService.createMeasurement(data);
      const measurementsData = await measurementService.getMeasurement();
      setMeasurement(measurementsData);
      alert("Measurement added successfully");
    } catch (error) {
      console.error("Error fetching measurement:", error);
      alert("Error fetching measurement ");
    }
  }

  async function editMeasurement(
    data: UpdateMeasurementDto,
    id: number
  ): Promise<void> {
    try {
      await measurementService.updateMeasurement(data, id);
      const measurementData = await measurementService.getMeasurement();
      setMeasurement(measurementData);
      alert("Measurement updated successfully");
    } catch (error) {
      console.error("Error fetching Measurements:", error);
      alert("Error fetching Measurements");
    }
  }

  async function deleteMeasurement(id: number): Promise<void> {
    try {
      await measurementService.deleteMeasurement(id);
      const measurementData = await measurementService.getMeasurement();
      setMeasurement(measurementData);
      alert("Measurement deleted successfully");
    } catch (error) {
      console.error("Error fetching Measurements:", error);
      alert("Error fetching Measurements");
    }
  }

  return (
    <div>
      <NavBar />
      <section className="py-24 px-20">
        <h1 className="text-blue-800 text-xl font-semibold">
          All Measurements
        </h1>
        <CreateMeasurementForm onSave={addMeasurement} />
        <br />
        <DataTable
          columns={getColumnDefs({
            onEdit: editMeasurement,
            onDelete: deleteMeasurement,
          })}
          data={measurement}
        />
      </section>
    </div>
  );
}

export default Item;
