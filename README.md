# Inspirante Event Registration Portal

## Project Overview
This is a full-stack College Event Registration Portal where admins can create and manage events and students can view and register for events with capacity restrictions.

## Tech Stack
Frontend uses React.js, backend uses Node.js with Express.js, and MySQL is used as the database for persistent storage with relational tables for users, events, and registrations.

## How to Run Locally
First clone the repository using git clone <repo-url> and open the folder in VS Code. Then go to backend folder, run npm install and start the server using node server.js which will run on http://localhost:3000. Then go to frontend folder, run npm install and start the frontend using npm start which will run on http://localhost:3001 or 3000 depending on setup.

## Environment Variables
Create a .env file inside backend with DB_HOST=localhost, DB_USER=root, DB_PASSWORD=yourpassword, DB_NAME=inspirante_portal, and PORT=3000.

## Database Setup
Run MySQL and create database inspirante_portal using CREATE DATABASE inspirante_portal; USE inspirante_portal; then run schema from db.sql or manually create tables, then seed data using node seed.js.

## API Prefix
All API endpoints are prefixed with /api such as /api/auth, /api/events, and /api/register.

## Known Issues
Date formatting depends on browser timezone but is handled in frontend, backend requires correct .env setup, and data must be seeded if database is reset.

## Features
Admin can create events and view registrations, students can view events and register, capacity limits are enforced, duplicate registrations are prevented, and all data persists in MySQL.