# API Failure Sandbox

API Failure Sandbox is a full-stack MERN application built for learning purposes to simulate real-world API behaviors such as success, delay, and failure responses. This project helps frontend developers test applications effectively without relying on a fully developed backend.

## Problem Statement

Frontend developers often face challenges when backend APIs are not ready, unstable, or lack proper error simulation. This creates difficulty in testing application behavior for scenarios like failures, delays, or unexpected responses.

## Solution

This project provides a platform to create mock APIs with configurable responses, status codes, delays, and error states. It allows developers to simulate real-world API conditions and build more robust and resilient frontend applications.

## Purpose

This project was built as part of a learning process to gain hands-on experience in full stack development using the MERN stack, authentication, API design, and frontend-backend integration.

## Features

- User authentication using JWT
- Register and login functionality
- Create mock APIs dynamically
- Configure endpoint, status code, and delay
- Simulate API success and failure responses
- Dashboard to manage APIs
- Edit and update API configurations
- Delete APIs
- Protected routes for authenticated users
- Forgot password UI flow (frontend only)

## Tech Stack

Frontend:
- React.js
- Tailwind CSS
- React Router DOM
- Axios

Backend:
- Node.js
- Express.js

Database:
- MongoDB with Mongoose

Authentication:
- JSON Web Tokens (JWT)
- bcrypt.js

## Installation and Setup

### Prerequisites

Make sure the following are installed:

- Node.js
- npm (comes with Node.js)
- MongoDB (local or MongoDB Atlas)
- Git

### Steps to Run the Project

1. Clone the repository

git clone https://github.com/raksha408/api-failure-sandbox.git
cd api-failure-sandbox

2. Install backend dependencies

cd backend
npm install

3. Install frontend dependencies

cd ../frontend
npm install

4. Configure environment variables

Create a .env file inside the backend folder:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  

5. Run backend server

cd backend  
npm start  

6. Run frontend application

cd frontend  
npm start  

## Demo Video

[Watch Demo](https://drive.google.com/file/d/16KNVzJKAnXea_MOV0qb8qwZEjqoDWrOG/view?usp=sharing)

## Use Cases

- Frontend development without backend dependency
- Testing error handling scenarios
- Simulating API latency
- Validating application behavior under failures
- Learning API flow and integration

## Skills Demonstrated

- Full stack development using MERN
- REST API design and implementation
- Authentication and authorization using JWT
- React routing and state management
- API integration using Axios
- Middleware implementation in Express
- Error handling and validation
- CRUD operations
- Responsive UI development using Tailwind CSS
- Version control using Git and GitHub

## Future Enhancements

- Implement forgot password backend functionality with email reset link
- Email service integration for password reset
- Custom JSON response editor
- API request history and logs
- Analytics dashboard for API usage
- Deployment to cloud platforms
- Shareable public mock API endpoints
- Team collaboration features
- Role-based access control


## Author

Shriraksha Kulkarni
