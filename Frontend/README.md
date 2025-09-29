# Frontend Setup

This directory contains the React frontend for the Management System project.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Development Server](#running-the-development-server)
- [Building for Production](#building-for-production)

## Installation

1.  **Navigate to the Frontend directory:**
    ```bash
    cd Frontend
    ```

2.  **Install npm dependencies:**
    ```bash
    npm install
    # or yarn install
    ```

## Configuration

1.  **Environment Variables:**
    Create a `.env` file in the `Frontend` directory based on `.env.example`.
    ```bash
    cp .env.example .env
    ```
    Ensure the `VITE_BACKEND_URL` variable points to your backend API:
    ```
    VITE_BACKEND_URL=http://localhost:8000
    ```
    (Adjust the URL if your backend is running on a different address or port.)

## Running the Development Server

To start the frontend development server:
```bash
npm run dev
# or yarn dev
```
The application will be accessible at `http://localhost:3000` (or the port configured in `vite.config.js`).

## Building for Production

To build the frontend for production:
```bash
npm run build
# or yarn build
```
This will create a `dist` directory containing the optimized production build of your application.