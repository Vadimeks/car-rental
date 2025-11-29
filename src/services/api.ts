// src/services/api.ts

import axios from "axios";
import { Car, CarFilterParams, CarListResponse } from "@/types/Car";

const carRentalApi = axios.create({
  baseURL: "https://car-rental-api.goit.global",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCars = async (
  params: CarFilterParams
): Promise<CarListResponse> => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  );

  const { data } = await carRentalApi.get<CarListResponse>("/cars", {
    params: filteredParams,
  });
  return data;
};

export const fetchCarDetails = async (id: string): Promise<Car> => {
  const { data } = await carRentalApi.get<Car>(`/cars/${id}`);
  return data;
};

export const fetchCarBrands = async (): Promise<string[]> => {
  const { data } = await carRentalApi.get<string[]>("/brands");
  return data;
};
