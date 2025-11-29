// src/app/catalog/page.tsx

"use client";

import React, { useEffect } from "react";
import { useCarStore } from "@/store/carStore";
import styled from "styled-components";
import CarCard from "@/components/CarCard/CarCard";
import FilterForm from "@/components/FilterForm/FilterForm";
//Styles

const LoaderText = styled.h2`
  text-align: center;
  margin-top: 50px;
  color: var(--color-button-primary);
`;

const CatalogContainer = styled.div`
  max-width: 1440px;
  padding: 0px 120px;
  margin: 0 auto;
  width: 100%;
`;

const CarGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 48px 32px;
  margin-top: 56px;
  margin-bottom: 80px;
  list-style: none;
  padding: 0;
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 0 auto 150px;
  background: none;
  border: none;
  color: var(--color-button-primary);
  font-size: 16px;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    color: var(--color-button-hover);
  }
`;

// === Component Page ===

const CarCatalogPage: React.FC = () => {
  const cars = useCarStore((state) => state.cars);
  const isLoading = useCarStore((state) => state.isLoading);
  const fetchCars = useCarStore((state) => state.fetchCars);

  const page = useCarStore((state) => state.page);
  const totalPages = useCarStore((state) => state.totalPages);

  const showLoadMore = !isLoading && page < totalPages;

  useEffect(() => {
    if (cars.length === 0) {
      fetchCars(false);
    }
  }, [cars.length, fetchCars]);

  const handleLoadMore = () => {
    fetchCars(true);
  };

  return (
    <CatalogContainer>
      <FilterForm />

      {isLoading && cars.length === 0 && (
        <LoaderText>Загрузка аўтамабіляў...</LoaderText>
      )}

      {cars.length > 0 && (
        <CarGrid>
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </CarGrid>
      )}

      {showLoadMore && (
        <LoadMoreButton onClick={handleLoadMore} disabled={isLoading}>
          {isLoading && cars.length > 0 ? "Загрузка..." : "Load more"}
        </LoadMoreButton>
      )}

      {!isLoading && cars.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "50px" }}>
          Няма аўтамабіляў па запыце.
        </p>
      )}
    </CatalogContainer>
  );
};

export default CarCatalogPage;
