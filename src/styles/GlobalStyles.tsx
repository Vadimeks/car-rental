// src/styles/GlobalStyles.tsx

"use client";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

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
  font-family: var(--font-family-main, sans-serif);
  font-weight: 400; 
  line-height: 1.5;
  color: var(--color-main); 
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
