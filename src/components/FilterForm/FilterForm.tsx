//src/components/FilterForm/FilterForm.tsx
"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { useCarStore } from "@/store/carStore";

const formatMileageDisplay = (value: string) => {
  if (!value) return "";
  const num = parseInt(value.replace(/[^0-9]/g, ""), 10);
  return isNaN(num) ? "" : num.toLocaleString("en-US");
};

const cleanMileage = (value: string) => {
  return value.replace(/[^0-9]/g, "");
};

// === Form Styling ===

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 0;
  margin-bottom: 50px;
  padding-top: 50px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  &:not(:last-child) {
    margin-right: 18px;
  }
`;

const Label = styled.label`
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
`;

const StyledSelect = styled.select<{ $customWidth: string }>`
  width: ${(props) => props.$customWidth};
  height: 44px;
  padding: 10px 18px;
  border-radius: 14px;
  background-color: rgba(247, 247, 247, 1);
  border: none;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.11;
  color: var(--color-text-primary);
  appearance: none;
  cursor: pointer;

  background-image: url('data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7.5L10 12.5L15 7.5" stroke="%23121417" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  background-repeat: no-repeat;
  background-position: right 14px center;
  margin: 0;
`;

const MileageWrapper = styled.div`
  display: flex;
  width: 320px;
`;

const StyledInput = styled.input<{ $isLeft?: boolean }>`
  width: 160px;
  height: 44px;
  padding: 10px 14px;
  background-color: rgba(247, 247, 247, 1);
  border: none;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.11;
  color: var(--color-text-primary);
  border-radius: ${(props) =>
    props.$isLeft ? "14px 0 0 14px" : "0 14px 14px 0"};
  border-right: ${(props) =>
    props.$isLeft ? "1px solid rgba(138, 138, 137, 0.2)" : "none"};
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  width: 156px;
  height: 44px;
  background-color: var(--color-button-primary);
  color: var(--color-white);
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  margin-left: 18px;
  &:hover {
    background-color: var(--color-button-hover);
  }
`;

// === FilterForm Component ===

const FilterForm: React.FC = () => {
  const filters = useCarStore((state) => state.filters);
  const setFilter = useCarStore((state) => state.setFilter);
  const availableBrands = useCarStore((state) => state.availableBrands);

  const [brand, setBrand] = useState(filters?.brand || "");
  const [price, setPrice] = useState(filters?.rentalPrice || "");
  const [mileageFrom, setMileageFrom] = useState(filters?.minMileage || "");
  const [mileageTo, setMileageTo] = useState(filters?.maxMileage || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filtersPayload = {
      brand: brand || null,
      rentalPrice: price || null,
      minMileage: cleanMileage(mileageFrom) || null,
      maxMileage: cleanMileage(mileageTo) || null,
    };
    setFilter(filtersPayload);
  };

  const brandOptions = availableBrands || [];
  const priceOptions = [30, 40, 50, 60, 70, 80, 90, 100, 150, 200];

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormField>
        <Label htmlFor="carBrand">Car brand</Label>
        <StyledSelect
          $customWidth="204px"
          id="carBrand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">Enter the text</option>
          {brandOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </StyledSelect>
      </FormField>

      <FormField>
        <Label htmlFor="priceHour">Price/1 hour</Label>
        <StyledSelect
          $customWidth="196px"
          id="priceHour"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option value="">To $</option>
          {priceOptions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </StyledSelect>
      </FormField>

      <FormField>
        <Label>Car mileage / km</Label>
        <MileageWrapper>
          <StyledInput
            $isLeft
            type="text"
            placeholder="From"
            value={`From ${formatMileageDisplay(mileageFrom)}`}
            onChange={(e) => setMileageFrom(cleanMileage(e.target.value))}
          />
          <StyledInput
            type="text"
            placeholder="To"
            value={`To ${formatMileageDisplay(mileageTo)}`}
            onChange={(e) => setMileageTo(cleanMileage(e.target.value))}
          />
        </MileageWrapper>
      </FormField>

      <SearchButton type="submit">Search</SearchButton>
    </FormContainer>
  );
};

export default FilterForm;
