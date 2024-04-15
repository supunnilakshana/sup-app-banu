"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import CreateMeasurementForm from "@/components/form/CreateMeasurementForm";
import { getColumnDefs } from "./column";
import { CreateMeasurementDto, MeasurementDto } from "@/dto";
import MeasurementService from "../../services/measurement_service";

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

  return (
    <div>
      <section className="py-24 px-20">
        <h1 className="text-blue-800 text-xl font-semibold">All Items</h1>
        <CreateMeasurementForm onSave={addMeasurement} />
        <DataTable columns={getColumnDefs} data={measurement} />
      </section>
    </div>
  );
}

export default Item;
