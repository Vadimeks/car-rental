// src/app/page.tsx

"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";

// Styles Hero Section and Home Page

const HomePageWrapper = styled.div`
  width: 100%;
`;

const HeroSection = styled.section`
  height: 700px;
  background-image: url("/hero-2x.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  position: relative;
`;

const ContentBlock = styled.div`
  margin-top: 436px;
  width: 784px;
  height: 204px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 60px;
  line-height: 72px;
  font-weight: 700;
  color: var(--color-white);
  white-space: nowrap;
  text-align: center;
`;

const Subtitle = styled.p`
  margin-top: 16px;
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  color: var(--color-white);
  text-align: center;
`;

const CatalogButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  padding: 12px 99px;
  background-color: var(--color-button-primary);
  color: var(--color-white);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  &:hover {
    background-color: var(--color-button-hover);
  }
`;

// Component HomePage

export default function HomePage() {
  return (
    <HomePageWrapper>
      <HeroSection>
        <ContentBlock>
          <Title>Find your perfect rental car</Title>
          <Subtitle>
            Reliable and budget-friendly rentals for any journey
          </Subtitle>
          <CatalogButton href="/catalog">View Catalog</CatalogButton>
        </ContentBlock>
      </HeroSection>
    </HomePageWrapper>
  );
}
