# MERN Stack Blog Application

A full-stack blog application built with MongoDB, Express.js, React, and Node.js.

## Features

- User authentication (register/login)
- Create, read, update, and delete blog posts
- Category management
- Tag system for posts
- Responsive design
- Author-based post permissions

## Tech Stack

- **Frontend**: React, React Router, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-blog
Backend Setup

bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
Frontend Setup

bash
cd client
npm install
cp .env.example .env
npm run dev
Access the Application

Frontend: http://localhost:3000

Backend API: http://localhost:5000

API Endpoints
POST /api/auth/register - User registration

POST /api/auth/login - User login

GET /api/posts - Get all posts (paginated)

GET /api/posts/:id - Get single post

POST /api/posts - Create new post (protected)

PUT /api/posts/:id - Update post (protected)

DELETE /api/posts/:id - Delete post (protected)

GET /api/categories - Get all categories

Environment Variables
Server (.env)
text
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your_jwt_secret
Client (.env)
text
VITE_API_BASE_URL=http://localhost:5000/api
