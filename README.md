# Allocation Application

This is a full-stack web application for managing allocations. It includes a backend API, a client-facing web app, and an admin dashboard.

## Technologies Used

- **Backend:** Spring Boot, Spring Security, MySQL
- **Admin Frontend:** Angular
- **Client Frontend:** Next.js, React
- **Containerization:** Docker, Docker Compose

## Project Structure

The project is divided into three main parts:

- `Backend/`: The Spring Boot application that provides the REST API.
- `Frontnd/admin/`: The Angular application for the admin dashboard.
- `Frontnd/Client/`: The Next.js application for the client-facing website.

## Getting Started

To run the entire application, you need to have Docker and Docker Compose installed.

1.  Clone the repository.
2.  Navigate to the root directory of the project.
3.  Run the following command:

    ```bash
    docker-compose up --build
    ```

    This will build the images for the backend and frontends and start all the services.

-   The client application will be available at [http://localhost:3000](http://localhost:3000)
-   The admin dashboard will be available at [http://localhost:4200](http://localhost:4200)
-   The backend API will be available at [http://localhost:8081](http://localhost:8081)

## Admin Credentials

You can log in to the admin dashboard using the following credentials:

-   **Email:** `admin@kaoba.com`
-   **Password:** `password123`
