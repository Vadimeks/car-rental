// src/types/Car.ts

export interface Car {
  id: string;
  yea: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

export type CarListResponse = {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
};

export type CarFilterParams = {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string | number;
  maxMileage?: string | number;
  limit?: number;
  page?: number;
};
