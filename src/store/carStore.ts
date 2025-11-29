// src/store/carStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Car, CarFilterParams } from "@/types/Car";
import { fetchCars } from "@/services/api";

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

  isLoading: boolean;
  page: number;
  totalPages: number;

  fetchCars: (isLoadMore?: boolean) => Promise<void>;
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
              acc[key as keyof FilterState] = value;
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

      setFilter: (newFilters) => {
        const currentFilters = get().filters;
        set({
          filters: { ...currentFilters, ...newFilters },
          cars: [],
          page: 1,
          totalPages: 1,
        });
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
