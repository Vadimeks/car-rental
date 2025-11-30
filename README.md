Вось прыгожа аформлены тэкст для файла README.md на аснове ўсіх прадстаўленых дэталяў, выкарыстоўваючы сінтаксіс Markdown для стварэння выразнай структуры. Я ўключыў усе секцыі, у тым ліку інфармацыю пра распрацоўшчыка.

🚗 RentalCar – Car Rental Service
Project Description
The project represents the frontend part of a web application for the "RentalCar" company, designed for demonstrating and booking rental cars.

Core Functionality
Routing: Implemented Home (/), Catalog (/catalog), and Car Details (/catalog/:id) pages using the Next.js App Router.

Catalog: Display of available vehicles with pagination ("Load More") and filtering capability by brand, price, and mileage. Filtering logic is performed on the backend.

Favorites: Functionality to add cars to a favorites list, with state persistence upon page refresh.

Booking Form: A validated form for renting a car on the individual car details page, with a notification upon successful booking.

Formatting: Display of car mileage with a space separator (e.g., 5 000 km).

🛠️ Technologies and Libraries Used
The project is built using Next.js and TypeScript, applying a component-based approach.

Framework & Core
Framework: Next.js

Purpose: Project foundation and routing (App Router).

Language: TypeScript

Purpose: Strict code typing.

State & Data Handling
State Management: Zustand

Purpose: Global state management (car list, filters, favorites).

HTTP Requests: Axios

Purpose: Used for interacting with the backend API.

UI & Styling
Styling: styled-components

Purpose: Component styling (CSS-in-JS).

Forms & Validation
Form Validation: Formik

Purpose: Form state management.

Validation Schemas: Yup

Purpose: Schemas for validating form input data.

Notifications: react-toastify (or similar Toaster library)

Purpose: Displaying notifications (e.g., after successful booking).

👨‍💻 Developer
Vadzim Simanau
