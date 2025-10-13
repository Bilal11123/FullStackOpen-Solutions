# Blog App

Backend for the **Blog List** application from the [Full Stack Open](https://fullstackopen.com/en/) course.

## Description
A Node.js + Express + MongoDB backend that stores and manages blog posts.  
Includes helper functions and unit tests for analyzing blog data.

## Features

- GET all blogs  
- POST a new blog  
- Basic Express app setup  
- Refactored structure (`app.js`, `controllers`, `models`, `utils`)  
- MongoDB + Mongoose integration  
- Unit tests for helper functions:
  - `dummy`
  - `totalLikes`
  - `favoriteBlog`
  - `mostBlogs`
  - `mostLikes`

## Setup
1. Installation
```bash
git clone <repo-url>
cd part4/blog-backend
npm install
```
2. Create a .env file:
```
MONGODB_URI=<your-mongodb-uri>
PORT=3003
```
3. Running the app
```bash
npm run dev
```
4. Running tests
```bash
npm test
```
## Tech Stack
- Node.js
- Express
- MongoDB + Mongoose
- Jest + Supertest for testing

## Folder Structure
```
.
├── controllers/
├── models/
├── tests/
├── utils/
│   └── list_helper.js
├── app.js
├── index.js
└── package.json
```