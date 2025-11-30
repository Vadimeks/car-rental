"use client";

import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { fetchCarDetails } from "@/services/api";
import { Car } from "@/types/Car";
import { BookingForm } from "@/components/BookingForm/BookingForm";

interface IconProps {
  name: "location" | "auto" | "calendar" | "station" | "check" | "prefrencies";
  size?: number;
  colorVar?: string;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  colorVar = "var(--color-main)",
  style = {},
}) => {
  const href = `/sprite.svg#icon-${name}`;
  return (
    <svg
      width={size}
      height={size}
      aria-hidden="true"
      role="img"
      fill="currentColor"
      style={{
        color: colorVar,
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
        ...style,
      }}
    >
      <use href={href} xlinkHref={href} />
    </svg>
  );
};

const formatMileageDisplay = (value: string | number): string => {
  if (value === null || value === undefined) return "";
  const num = parseInt(value.toString().replace(/[^0-9]/g, ""), 10);
  return isNaN(num) ? "" : num.toLocaleString("en-US", { useGrouping: true });
};

const DetailContainer = styled.div`
  padding: 50px 0 150px 0;
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
  color: var(--color-main);
`;

const DetailBlockHeader = styled.h3`
  font-family: var(--font-family-main);
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: var(--color-main);
  margin-bottom: 20px;
`;

const DetailLine = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-family-main);
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: var(--color-gray);
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLineCondition = styled(DetailLine)``;

const PriceText = styled.p`
  font-family: var(--font-family-main);
  font-size: 24px;
  line-height: 32px;
  color: var(--color-main);
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
        <DetailLineCondition key={index}>
          <Icon name="check" colorVar="var(--color-main)" />
          {match[1].trim()}:
          <span style={{ fontWeight: 600, color: `var(--color-main)` }}>
            {match[2]}
          </span>
        </DetailLineCondition>
      );
    }
    return (
      <DetailLineCondition key={index}>
        <Icon name="check" colorVar="var(--color-main)" />
        {condition}
      </DetailLineCondition>
    );
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
              color: `var(--color-main)`,
              marginBottom: "8px",
            }}
          >
            {car.brand} {car.model}, {car.yea}
          </h2>
          <DetailLine>
            <Icon name="location" colorVar="var(--color-main)" />
            {city}, {country} &nbsp;|&nbsp; Id: {car.id} &nbsp;|&nbsp; Mileage:{" "}
            {formatMileageDisplay(car.mileage)} km
          </DetailLine>
          <PriceText>${car.rentalPrice}</PriceText>
          <Description
            style={{
              marginTop: "16px",
              fontSize: "16px",
              lineHeight: "1.6",
              color: `var(--color-main)`,
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
          <DetailLine>
            <Icon name="calendar" colorVar="var(--color-main)" />
            Year: {car.yea}
          </DetailLine>
          <DetailLine>
            <Icon name="auto" colorVar="var(--color-main)" />
            Type: {car.type}
          </DetailLine>
          <DetailLine>
            <Icon name="station" colorVar="var(--color-main)" />
            Fuel Consumption: {car.fuelConsumption}
          </DetailLine>
          <DetailLine>
            <Icon name="prefrencies" colorVar="var(--color-main)" />
            Engine Size: {car.engineSize}
          </DetailLine>
        </DetailBlock>
        <DetailBlock $spacing="0px">
          <DetailBlockHeader>
            Accessories and functionalities:
          </DetailBlockHeader>
          {allAccessories.map((acc, index) => (
            <DetailLineCondition key={index}>
              <Icon name="check" colorVar="var(--color-main)" />
              {acc}
            </DetailLineCondition>
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
