# Blog App

Backend for the **Blog List** application from the [Full Stack Open](https://fullstackopen.com/en/) course.

## 📌 Description

A production-ready **Node.js + Express + MongoDB** backend for managing blog posts and users.
Supports **JWT-based authentication**, **route protection**, and **comprehensive testing** (unit + integration).

## ✅ Features

### 📝 Blog Management

- `GET /api/blogs` – List all blogs (with user info populated)
- `POST /api/blogs` – Create a blog (token required)
- `PUT /api/blogs/:id` – Update a blog
- `DELETE /api/blogs/:id` – Delete a blog (only by creator)

### 👤 User Management

- `POST /api/users` – Create a new user with password hashing (bcrypt)
- `GET /api/users` – Get users with their blogs

### 🔐 Authentication

- `POST /api/login` – Login to receive a JWT token
- Token extracted by `middleware.tokenExtractor`
- Authenticated user loaded via `middleware.userExtractor`

### ⚙️ Middleware

- `requestLogger` – Logs method, path, and body
- `tokenExtractor` – Parses "Authorization: Bearer <token>"
- `userExtractor` – Verifies token and loads user
- `unknownEndpoint` – Handles invalid routes
- `errorHandler` – Centralized error handling (Mongoose, JWT, duplicates, etc.)

### 🔍 Testing

- Unit tests for helper functions:
    - `dummy`
    - `totalLikes`
    - `favoriteBlog`
    - `mostBlogs`
    - `mostLikes`

- Integration tests for:
    - Adding/updating/deleting blogs
    - Token-protected routes
    - Handling of missing/invalid token
    - User creation and validation

## 🚀 Setup

### 1️⃣ Clone & Install

```bash
git clone https://github.com//Bilal11123/FullStackOpen-Solutions.git
cd part4/blog-backend
npm install
```

### 2️⃣ Create `.env` file

```
MONGODB_URI=<your-mongodb-uri>
TEST_MONGODB_URI=<your-test-db-uri>
SECRET=<your-jwt-secret>
PORT=3003
```

### 3️⃣ Run in Development

```bash
npm run dev
```

### 4️⃣ Run Tests

```bash
npm test
```

## 🧰 Tech Stack

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **JWT + bcrypt**
- **Supertest + node:test / Jest** (depending on test runner)

## 📁 Folder Structure

```
.
├── controllers/
│   ├── blogs.js
│   ├── users.js
│   └── login.js
├── models/
│   ├── blog.js
│   └── user.js
├── utils/
│   ├── middleware.js
│   ├── logger.js
│   └── config.js
├── tests/
│   ├── test_helper.js
│   ├── blog_api.test.js
│   └── user_api.test.js (optional)
├── app.js
├── index.js
└── package.json
```

## ✅ Highlights

✔ Secure JWT-based authentication
✔ User ↔ Blog relationship (populate)
✔ Middleware-driven clean architecture
✔ Comprehensive testing coverage
✔ Modular and scalable folder structure
