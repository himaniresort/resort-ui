# Resort Website - Interview Guide

## 1. Project in one sentence

- This is a resort website where visitors can explore rooms, services, and nearby attractions, while resort staff can access an admin area to review booking information.

## 2. Main features

- **Home page:** Introduces the resort with a photo carousel and sections about the resort, rooms, services, guest testimonials, nearby places, and contact information.
- **Room discovery:** Shows room categories and details such as descriptions, occupancy, and pricing.
- **Booking experience:** Lets visitors choose check-in and check-out dates, view room categories, and enter guest details through a booking form.
- **Resort services:** Presents information about facilities and activities, including catering, the swimming pool, drinks, driver hire, and sightseeing.
- **Nearby attractions:** Displays places to visit and their distance from the resort.
- **Admin login:** Provides a login page for staff, with password checking and a JWT-based access check.
- **Admin dashboard:** Shows booking information in a table for staff to review.
- **Responsive layout:** Uses responsive Material UI layouts and mobile-screen checks to support different screen sizes.

## 3. Technology used

- **Next.js 15 with the Pages Router** for pages and server-side API routes.
- **React 19 and TypeScript** for the user interface and typed application code.
- **Material UI** for common interface elements such as forms, dialogs, tables, and buttons.
- **SCSS modules and CSS** for component and global styling.
- **MongoDB and Mongoose** for database access and data models.
- **Zustand** for shared client-side state, including room, date, place, and booking data.
- **Axios and the Fetch API** for communication with API routes.
- **JWT and bcryptjs** for admin token handling and password comparison.
- **Day.js** for working with dates.

## 4. How the application is organized

- `src/pages` contains the website pages and API endpoints.
- `src/components` contains reusable interface sections and widgets.
- `src/models` and `src/types` define database models and TypeScript data shapes.
- `src/services` holds client-side service functions for API operations.
- `src/store` contains Zustand stores for shared application state.
- `src/lib` contains the MongoDB connection setup.
- `src/utils` and `src/constants` contain shared helpers and values.

## 5. Example user flows

### Visitor flow

1. A visitor opens the home page and explores the resort information.
2. They choose check-in and check-out dates.
3. They open the booking page and review room categories.
4. They enter guest details in the booking form.

### Admin flow

1. A staff member opens the admin login page.
2. The login API checks the supplied credentials against the management user record.
3. On successful login, the app stores the returned token in the browser.
4. The admin page checks the token and loads the dashboard.
5. The dashboard requests booking information and displays it in a table.

## 6. Talking points for an interview

- I built a resort website with both a visitor-facing experience and an admin area.
- I used reusable React components to organize the home page into clear sections.
- I used Next.js API routes to connect the front end to MongoDB-backed data.
- I used Zustand to share state such as selected dates and fetched room information between components.
- I used Material UI to build forms, dialogs, responsive layouts, and the admin table.
- I added an admin login flow that uses bcryptjs for password comparison and JWTs for protected API access.
- I separated the project into pages, components, services, stores, models, and shared utilities to keep responsibilities organized.

## 7. Current scope and next steps

- The booking screens and guest details form are present. The end-to-end booking submission and persistence flow should be verified and completed before describing it as production-ready.
- The admin dashboard includes booking information, while some summary figures and management actions are currently presentation elements rather than fully connected features.
- Useful next steps include completing and testing booking persistence, connecting dashboard figures to live data, and adding automated tests for the main visitor and admin flows.

## 8. Short project introduction

> “I worked on a resort website built with Next.js, React, and TypeScript. Visitors can explore room categories, resort services, and nearby attractions, and use the booking screens to enter their stay and guest details. The project also has an admin login and dashboard for reviewing bookings. I used MongoDB for data, API routes for server communication, Zustand for shared state, and Material UI for responsive interface components.”
