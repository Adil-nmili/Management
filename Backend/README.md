# Backend Setup

This directory contains the Laravel backend for the Management System project.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Database Migration & Seeding](#database-migration--seeding)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)

## Installation

1.  **Navigate to the Backend directory:**
    ```bash
    cd Backend
    ```

2.  **Install Composer dependencies:**
    ```bash
    composer install
    ```

3.  **Generate Application Key:**
    ```bash
    php artisan key:generate
    ```

## Configuration

1.  **Environment Variables:**
    Copy the `.env.example` file to `.env` and update the necessary environment variables, especially for database connection.
    ```bash
    cp .env.example .env
    ```
    Open the `.env` file and configure your database credentials:
    ```
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=your_database_user
    DB_PASSWORD=your_database_password
    ```

2.  **CORS Configuration:**
    Ensure that your frontend's URL is allowed in `config/cors.php` if it's different from the default `http://localhost:3000`.

## Database Migration & Seeding

1.  **Run Migrations:**
    ```bash
    php artisan migrate
    ```

2.  **Seed the Database (Optional):**
    ```bash
    php artisan db:seed
    ```

## Running the Server

Start the Laravel development server:
```bash
php artisan serve
```
The backend API will be available at `http://localhost:8000` (or the port specified in your `.env` file).

## API Endpoints

Refer to `routes/api.php` for a comprehensive list of API endpoints and their corresponding controllers.