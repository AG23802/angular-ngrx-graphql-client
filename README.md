# Angular NgRx GraphQL Client

This project is a professional-grade frontend client built with **Angular** and a modern technology stack. It showcases a robust client-side implementation for a secure, full-stack application that consumes a **GraphQL API**. This repository serves as a showcase for advanced frontend development practices.

***

## Key Features

### Secure Authentication

* **JWT Interceptor:** A custom HTTP interceptor automatically attaches the **JSON Web Token (JWT)** to every outgoing API request. This demonstrates an advanced understanding of Angular's interceptor pattern for secure, stateless communication.
* **Token Refresh:** The application implements a seamless token refresh mechanism. It intelligently detects when a token is about to expire and transparently fetches a new one from the backend, ensuring a continuous user session without requiring re-authentication.

### Advanced State Management

* **NgRx Store:** The application leverages **NgRx** for centralized, predictable state management. This approach provides a single source of truth for the application's data, which is crucial for building complex applications that are easy to debug and scale.
* **RxJS:** Extensive use of **RxJS** for reactive programming and managing asynchronous data streams from the API and the store.

### GraphQL Integration

* **GraphQL Client:** Utilizes an integrated GraphQL client to consume the backend API. This demonstrates proficiency with GraphQL's query language, allowing the client to fetch only the data it needs, reducing payload size and improving performance.
* **Queries & Mutations:** The application performs both **queries** (to fetch data) and **mutations** (to modify data) for full CRUD-like functionality.

***

## Getting Started

1.  Ensure the backend API is running.
2.  Clone the repository and install dependencies using `npm install`.
3.  Run the application with `ng serve`.
