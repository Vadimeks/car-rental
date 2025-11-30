// src/app/auto/[id]/page.tsx

"use client";

import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { fetchCarDetails } from "@/services/api";
import { Car } from "@/types/Car";
import { BookingForm } from "@/components/BookingForm/BookingForm";

const formatMileageDisplay = (value: string | number): string => {
  if (value === null || value === undefined) return "";
  const num = parseInt(value.toString().replace(/[^0-9]/g, ""), 10);
  return isNaN(num) ? "" : num.toLocaleString("en-US");
};

const COLOR_PRIMARY = "#101828";
const COLOR_SECONDARY = "#8D929A";
const COLOR_BUTTON_PRIMARY = "#3470FF";

const DetailContainer = styled.div`
  max-width: 1440px;
  padding: 50px 120px 150px;
  margin: 0 auto;
  min-height: 80vh;
`;

const BackLink = styled.a`
  display: inline-block;
  margin-bottom: 20px;
  color: var(--color-button-primary);
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const ContentGrid = styled.div`
  display: flex;
  gap: 72px;
`;

const LeftColumn = styled.div`
  width: 640px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const RightColumn = styled.div`
  width: 488px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 640px;
  height: 512px;
  border-radius: 14px;
  overflow: hidden;
`;

interface DetailBlockProps {
  $spacing: string;
}

const DetailBlock = styled.div<DetailBlockProps>`
  margin-bottom: ${(props) => props.$spacing};
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${COLOR_PRIMARY};
`;

const DetailBlockHeader = styled.h3`
  font-family: Manrope;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: ${COLOR_PRIMARY};
  margin-bottom: 20px;
`;

const DetailLine = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: Manrope;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR_SECONDARY};
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PriceText = styled.p`
  font-family: Manrope;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: ${COLOR_BUTTON_PRIMARY};
  margin-top: 16px;
`;

interface CarDetailsProps {
  car: Car;
}

const CarDetailsContent: React.FC<CarDetailsProps> = ({ car }) => {
  const addressParts = String(car.address || "").split(", ");
  const city = addressParts[1] || "";
  const country = addressParts[2] || "";

  const allAccessories = [
    ...(car.accessories || []),
    ...(car.functionalities || []),
  ];

  const renderCondition = (condition: string, index: number) => {
    const match = condition.match(/(\D+):\s*(\d+)/);
    if (match) {
      return (
        <DetailLine key={index}>
          ✅ {match[1].trim()}:{" "}
          <span style={{ fontWeight: 600, color: COLOR_PRIMARY }}>
            {match[2]}
          </span>
        </DetailLine>
      );
    }
    return <DetailLine key={index}>✅ {condition}</DetailLine>;
  };

  return (
    <ContentGrid>
      <LeftColumn>
        <ImageWrapper>
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            fill
            style={{ objectFit: "cover" }}
            unoptimized
            loading="eager"
          />
        </ImageWrapper>
        <BookingForm />
      </LeftColumn>

      <RightColumn>
        <DetailBlock $spacing="68px">
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: COLOR_PRIMARY,
              marginBottom: "8px",
            }}
          >
            {car.brand} {car.model}, {car.yea}
          </h2>
          <DetailLine>
            📍 {city}, {country} &nbsp;|&nbsp; Id: {car.id} &nbsp;|&nbsp;
            Mileage: {formatMileageDisplay(car.mileage)} km
          </DetailLine>
          <PriceText>${car.rentalPrice}</PriceText>
          <Description
            style={{
              marginTop: "16px",
              fontSize: "16px",
              lineHeight: "1.6",
              color: COLOR_PRIMARY,
            }}
          >
            {car.description}
          </Description>
        </DetailBlock>

        <DetailBlock $spacing="110px">
          <DetailBlockHeader>Rental Conditions:</DetailBlockHeader>
          {(car.rentalConditions || []).map(renderCondition)}
        </DetailBlock>

        <DetailBlock $spacing="110px">
          <DetailBlockHeader>Car Specifications:</DetailBlockHeader>
          <DetailLine>📅 Year: {car.yea}</DetailLine>
          <DetailLine>🚗 Type: {car.type}</DetailLine>
          <DetailLine>⛽ Fuel Consumption: {car.fuelConsumption}</DetailLine>
          <DetailLine>⚙️ Engine Size: {car.engineSize}</DetailLine>
        </DetailBlock>

        <DetailBlock $spacing="0px">
          <DetailBlockHeader>
            Accessories and functionalities:
          </DetailBlockHeader>
          {allAccessories.map((acc, index) => (
            <DetailLine key={index}>✅ {acc}</DetailLine>
          ))}
        </DetailBlock>
      </RightColumn>
    </ContentGrid>
  );
};

const CarDetailsPage: React.FC = () => {
  const params = useParams();
  const carId = params.id as string;

  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadCar = useCallback(async (id: string) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const fetchedCar = await fetchCarDetails(id);
      setCar(fetchedCar);
    } catch {
      notFound();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCar(carId);
  }, [carId, loadCar]);

  if (isLoading) {
    return (
      <DetailContainer style={{ textAlign: "center", padding: "100px" }}>
        Loading car details...
      </DetailContainer>
    );
  }

  if (!car) {
    return (
      <DetailContainer style={{ textAlign: "center", padding: "100px" }}>
        Car not found.
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      <BackLink href="/catalog">← Back to Catalog</BackLink>
      <CarDetailsContent car={car} />
    </DetailContainer>
  );
};

export default CarDetailsPage;
