# Cinema Application

This is the frontend part of the application I created for the purposes of my Bachelor's thesis.

## Tech stack & Libraries used:

- HTML, CSS, JavaScript (ES6+)
- React (React Hooks)
- Socket.io (for real-time chat functionality)
- Material UI - React UI components library
- Axios - HTTP client
- Formik & yup - form handling and validation
- React router - routing
- Redux - state management
- various other helper libaries

## Security:

- Authentication flow:
  - 1. User login client-side
  - 2. User validation server-side
  - 3. Server sends back a generated JWT to the client
  - 4. JWT is saved to Local Storage and used in every subsequent request until user logs out

The purpose of the application is to serve as a place for end users to find movies of interest, movies which they wish to watch and to make reservations for a given combination of a cinema and screening time. Additionally, they can check their current movie reservations and leave a rating on a movie if the reservation has been made.

## There are three main roles in the application :

- Guest - movies overview
- Registered user
  - Guest rights
  - Movie reservation
  - Reservation overview
  - Profile info
- Administrator
  - Registered user rights
  - CRUD controls for cinemas, movies, screening times
