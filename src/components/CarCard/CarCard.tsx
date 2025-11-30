// src/components/CarCard/CarCard.tsx

"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Car } from "@/types/Car";
import { useCarStore } from "@/store/carStore";

const CardWrapper = styled.li`
  width: 276px;
  height: 424px;
  list-style: none;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ImageContainer = styled.div`
  width: 276px;
  height: 268px;
  margin-bottom: 14px;
  border-radius: 14px;
  overflow: hidden;
  position: relative;
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FavoriteButton = styled.button<{ $isFavorite: boolean }>`
  position: absolute;
  top: 14px;
  right: 14px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  svg {
    fill: ${(props) =>
      props.$isFavorite
        ? "var(--color-button-primary)"
        : "rgba(255, 255, 255, 0.8)"};
    stroke: ${(props) =>
      props.$isFavorite ? "var(--color-button-primary)" : "#fff"};
    transition: fill 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover svg {
    fill: var(--color-button-hover);
    stroke: var(--color-button-hover);
  }
`;

const TitleBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 1.5;
`;

const TitleText = styled.p`
  font-weight: 500;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    color: var(--color-button-primary);
  }
`;

const PriceText = styled.p`
  font-weight: 500;
  color: var(--color-text-primary);
  flex-shrink: 0;
`;

const InfoText = styled.p`
  color: var(--color-text-secondary);
  font-size: 12px;
  line-height: 1.33;
  margin-bottom: 28px;

  span:not(:last-child)::after {
    content: "|";
    color: rgba(18, 20, 23, 0.2);
    margin: 0 6px;
  }
`;

const LearnMoreLink = styled(Link)`
  width: 100%;
  height: 44px;
  background-color: var(--color-button-primary);
  color: var(--color-white);
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  &:hover {
    background-color: var(--color-button-hover);
  }
`;

const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="18" height="18" viewBox="0 0 18 18" {...props}>
    <path
      d="M15.4 1.5c-1.87 0-3.6 1.05-4.4 2.55C10.2 2.55 8.47 1.5 6.6 1.5 3.32 1.5.5 4.32.5 7.6c0 3.84 3.63 6.8 8.5 11.2 4.87-4.4 8.5-7.36 8.5-11.2 0-3.28-2.82-6.1-6.1-6.1z"
      strokeWidth="1.5"
    />
  </svg>
);

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const favorites = useCarStore((state) => state.favorites);
  const toggleFavorite = useCarStore((state) => state.toggleFavorite);

  const isFavorite = favorites.some((fav) => fav.id === car.id);

  const addressParts = car.address.split(", ");
  const city = addressParts[addressParts.length - 2];
  const country = addressParts[addressParts.length - 1];

  return (
    <CardWrapper>
      <ImageContainer>
        <CarImage
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          loading="lazy"
        />

        <FavoriteButton
          onClick={() => toggleFavorite(car)}
          $isFavorite={isFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <HeartIcon />
        </FavoriteButton>
      </ImageContainer>

      <TitleBlock>
        <TitleText>
          {car.brand} <span style={{ fontWeight: 600 }}>{car.model}</span>,{" "}
          {car.yea}
        </TitleText>
        <PriceText>{car.rentalPrice}$</PriceText>
      </TitleBlock>

      <InfoText>
        <span>{city}</span>
        <span>{country}</span>
        <span>{car.rentalCompany}</span>
        <span>{car.type}</span>
        <span>{car.model}</span>
        <span>{car.id.slice(0, 4)}...</span>
        <span>{car.functionalities[0]}</span>
      </InfoText>

      <LearnMoreLink href={`/auto/${car.id}`}>Learn more</LearnMoreLink>
    </CardWrapper>
  );
};

export default CarCard;
