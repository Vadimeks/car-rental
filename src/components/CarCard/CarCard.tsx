// src/components/CarCard/CarCard.tsx

"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Car } from "@/types/Car";
import { useCarStore } from "@/store/carStore";
// ❌ REMOVED: import Icon from "../Icon/Icon";

// Path to the SVG sprite in the public folder
const SPRITE_PATH = "/sprite.svg";

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
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  svg {
    width: 18px; /* Set the size of the SVG container */
    height: 18px;

    fill: ${(props) =>
      props.$isFavorite ? "var(--color-button-primary)" : "transparent"};

    stroke: ${(props) =>
      props.$isFavorite ? "var(--color-button-primary)" : "var(--color-white)"};

    transition: fill 250ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover svg {
    fill: ${(props) =>
      props.$isFavorite ? "var(--color-button-hover)" : "transparent"};
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
`;

const ModelSpan = styled.span`
  font-weight: 600;
  color: var(--color-button-primary);
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

  /* Applying fixes for uniform height (max 2 lines) */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to 2 lines of text */
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: calc(1.33em * 2); /* Ensure height is fixed for 2 lines */

  span:not(:last-child)::after {
    content: "|";
    color: var(--color-separator);
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
  font-size: 16px;
  font-weight: 500;
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

// ❌ REMOVED: HeartIcon component definition is removed
// The use of the sprite replaces it.

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
          {/* 🔑 NEW: Direct use of SVG sprite icon-heart */}
          <svg>
            <use href={`${SPRITE_PATH}#icon-heart`} />
          </svg>
        </FavoriteButton>
      </ImageContainer>
      <TitleBlock>
        <TitleText>
          {car.brand} <ModelSpan>{car.model}</ModelSpan>,{car.yea}
        </TitleText>
        <PriceText>{car.rentalPrice}$</PriceText>
      </TitleBlock>
      <InfoText>
        <span>{city}</span> <span>{country}</span>
        <span>{car.rentalCompany}</span> <span>{car.type}</span>
        <span>{car.model}</span> <span>{car.id.slice(0, 4)}...</span>
        <span>{car.functionalities[0]}</span>
      </InfoText>
      <LearnMoreLink href={`/auto/${car.id}`}>Read more</LearnMoreLink>
    </CardWrapper>
  );
};

export default CarCard;
