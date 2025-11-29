// src/styles/GlobalStyles.tsx
"use client";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  
  /* 1. CSS Variables (Colors) */
  :root {
    /* Primary Colors */
    --color-button-primary: #3470ff; /* Light Blue for buttons */
    --color-button-hover: #0b44cd; /* Darker blue for hover */
    
    /* Text Colors */
    --color-text-primary: #121417; /* Main text color */
    --color-text-secondary: rgba(18, 20, 23, 0.5); /* Lighter text (e.g., placeholder) */
    --color-text-details: rgba(18, 20, 23, 0.5); /* Details and specs */

    /* Backgrounds & Borders */
    --color-input-background: rgba(247, 247, 247, 1); /* Light gray for inputs/selects */
    --color-white: #ffffff;
    --color-border-light: rgba(138, 138, 137, 0.2); 
    
    /* Used in CarCard (not critical, but good to define) */
    --color-tag-background: #f9f9f9;
  }
  
  /* 2. Base Reset and Font Import */
  
  /* Font Import (Manrope) - Next.js usually handles this globally, 
     but we ensure the body uses it. */
  @font-face {
    font-family: 'Manrope';
    src: url('/fonts/Manrope-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Manrope';
    src: url('/fonts/Manrope-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Manrope';
    src: url('/fonts/Manrope-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
  }
  
  /* Reset */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    font-family: 'Manrope', sans-serif;
    font-weight: 400; 
    line-height: 1.5;
    color: var(--color-text-primary);
    background-color: var(--color-white);
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }
  
  ul, ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
  }

  /* Specific fix for select in Firefox to use background */
  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }
`;

export default GlobalStyles;
