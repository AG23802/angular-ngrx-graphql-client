# Angular GraphQL Client

This is the frontend client for a full-stack application. It demonstrates a professional-grade single-page application built with **Angular** that consumes a secure **GraphQL API**. The application uses **NgRx** for robust state management and includes a custom **HTTP Interceptor** to handle **JWT authentication** and refresh tokens.

***

## Features

* **NgRx Store**: Centralized state management for a scalable and predictable application.
* **GraphQL Client**: Uses the Apollo client to efficiently query and mutate data from the backend API.
* **JWT Authentication**: Secure user login, session management, and protected route access.
* **HTTP Interceptor**: Automates the addition of JWTs to all API requests and handles transparent token refresh.
* **RxJS**: Extensive use of reactive programming to manage asynchronous data streams.

***

## Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js**
* **npm**
* **Angular CLI**

***

## Installation

1.  Clone the repository:
    ```
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```
2.  Navigate to the project directory:
    ```
    cd your-repo-name
    ```
3.  Install the dependencies:
    ```
    npm install
    ```

***

## Usage

1.  Ensure the backend API is running.
2.  Start the Angular development server:
    ```
    ng serve
    ```
3.  Open your browser and navigate to `http://localhost:4200`.

***
