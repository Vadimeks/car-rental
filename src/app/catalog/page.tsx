// src/app/catalog/page.tsx

"use client";

import React, { useEffect } from "react";
import { useCarStore } from "@/store/carStore";
import styled from "styled-components";

const LoaderText = styled.h2`
  text-align: center;
  margin-top: 50px;
  color: var(--color-button-primary);
`;

const CatalogContainer = styled.div`
  max-width: 1440px;
  padding: 40px 128px; /* Адпавядае макету */
  margin: 0 auto;
  min-height: 80vh;
`;

const CarCatalogPage: React.FC = () => {
  const cars = useCarStore((state) => state.cars);
  const isLoading = useCarStore((state) => state.isLoading);
  const fetchCars = useCarStore((state) => state.fetchCars);

  useEffect(() => {
    if (cars.length === 0) {
      fetchCars(false);
    }
  }, [cars.length, fetchCars]);

  return (
    <CatalogContainer>
      <h1>Каталог Аўтамабіляў</h1>
      {/* <FilterForm /> */}
      {/* Loader */}
      {isLoading && <LoaderText>Загрузка аўтамабіляў...</LoaderText>}

      {!isLoading && cars.length > 0 && (
        <>
          <p>Знойдзена {cars.length} аўтамабіляў.</p>
          {/* CarList */}
          <pre>{JSON.stringify(cars.slice(0, 2), null, 2)}</pre>
        </>
      )}
      {/* <LoadMoreButton /> */}

      {!isLoading && cars.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "50px" }}>
          Няма аўтамабіляў па запыце.
        </p>
      )}
    </CatalogContainer>
  );
};

export default CarCatalogPage;
