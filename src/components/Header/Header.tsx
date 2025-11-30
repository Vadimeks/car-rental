// src/components/Header/Header.tsx
"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";

// === Styles for Header component ===

const HeaderWrapper = styled.header`
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-border-light);
  height: 68px;
  display: flex;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LogoLink = styled(Link)`
  /* Logo size estimation based on default font/style */
  font-size: 16px;
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: normal;
  text-decoration: none;
`;

const LogoText = styled.span<{ $isPrimary?: boolean }>`
  color: ${(props) =>
    props.$isPrimary
      ? "var(--color-button-primary)"
      : "var(--color-text-primary)"};
`;

const NavList = styled.ul`
  display: flex;
  gap: 32px;
  height: 100%;
  align-items: center;
`;

const NavItem = styled.li`
  list-style: none;
  height: 100%;
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)<{ $isActive: boolean; $width: string }>`
  width: ${(props) => props.$width};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: ${(props) => (props.$isActive ? "600" : "500")};
  color: ${(props) =>
    props.$isActive
      ? "var(--color-button-primary)"
      : "var(--color-text-primary)"}; // Default color
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;

  &:hover {
    color: var(--color-button-primary);
  }
`;

// === Header Component ===

const Header: React.FC = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", width: "44px" },
    { href: "/catalog", label: "Catalog", width: "60px" },
  ];

  return (
    <HeaderWrapper>
      <Nav>
        {/* Logo Link with primary color highlight */}
        <LogoLink href="/">
          <LogoText>Rental</LogoText>
          <LogoText $isPrimary>Car</LogoText>
        </LogoLink>
        {/* Navigation List */}
        <NavList>
          {links.map(({ href, label, width }) => (
            <NavItem key={href}>
              <NavLink href={href} $isActive={pathname === href} $width={width}>
                {label}
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
