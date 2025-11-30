// src/components/Header/Header.tsx
"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SPRITE_PATH = "/sprite.svg";

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

const LogoIcon = styled.svg`
  width: 104px;
  height: 16px;
  display: block;

  .logo-primary {
    fill: var(--color-button-primary); /* Blue */
  }

  .logo-secondary {
    fill: var(--color-text-primary); /* Dark/Black */
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  text-decoration: none;
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
      : "var(--color-text-primary)"};
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
        <LogoLink href="/">
          <LogoIcon>
            <use href={`${SPRITE_PATH}#icon-logo`} />
          </LogoIcon>
        </LogoLink>

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
