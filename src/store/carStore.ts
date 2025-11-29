// src/store/carStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Car, CarFilterParams } from "@/types/Car";
import { fetchCars, fetchCarBrands } from "@/services/api";

interface FilterState {
  brand: string | null;
  rentalPrice: string | null;
  minMileage: string | null;
  maxMileage: string | null;
}

interface CarState {
  cars: Car[];
  favorites: Car[];
  filters: FilterState;

  availableBrands: string[];

  isLoading: boolean;
  page: number;
  totalPages: number;

  fetchCars: (isLoadMore?: boolean) => Promise<void>;
  fetchAvailableBrands: () => Promise<void>;
  setFilter: (newFilters: Partial<FilterState>) => void;
  toggleFavorite: (car: Car) => void;
}

const CARS_PER_PAGE = 12;

export const useCarStore = create<CarState>()(
  persist(
    (set, get) => ({
      cars: [],
      favorites: [],
      filters: {
        brand: null,
        rentalPrice: null,
        minMileage: null,
        maxMileage: null,
      },
      availableBrands: [],
      isLoading: false,
      page: 1,
      totalPages: 1,

      fetchCars: async (isLoadMore = false) => {
        set({ isLoading: true });

        const currentPage = isLoadMore ? get().page + 1 : 1;
        const currentFilters = get().filters;

        const cleanFilters = Object.entries(currentFilters).reduce(
          (acc, [key, value]) => {
            if (value !== null) {
              if (key === "rentalPrice" && value) {
                acc[key as keyof FilterState] = parseInt(
                  value as string,
                  10
                ).toString();
              } else {
                acc[key as keyof FilterState] = value;
              }
            }
            return acc;
          },
          {} as Partial<CarFilterParams>
        );

        const params: CarFilterParams = {
          ...cleanFilters,
          limit: CARS_PER_PAGE,
          page: currentPage,
        };

        try {
          const result = await fetchCars(params);

          set((state) => ({
            cars: isLoadMore ? [...state.cars, ...result.cars] : result.cars,
            page: currentPage,
            totalPages: result.totalPages,
          }));
        } catch (error) {
          console.error("Error fetching cars:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      fetchAvailableBrands: async () => {
        try {
          const brands = await fetchCarBrands();
          set({ availableBrands: brands.sort() });
        } catch (error) {
          console.error("Error fetching available brands:", error);
        }
      },

      setFilter: (newFilters) => {
        const currentFilters = get().filters;
        set({
          filters: { ...currentFilters, ...newFilters },
          cars: [],
          page: 1,
          totalPages: 1,
        });
        get().fetchCars(false);
      },

      toggleFavorite: (car) => {
        set((state) => {
          const isFavorite = state.favorites.some((fav) => fav.id === car.id);
          if (isFavorite) {
            return {
              favorites: state.favorites.filter((fav) => fav.id !== car.id),
            };
          } else {
            return {
              favorites: [...state.favorites, car],
            };
          }
        });
      },
    }),
    {
      name: "favorite-cars-storage",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
