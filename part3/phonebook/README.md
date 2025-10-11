# Full Stack Open 2025 - Part 3: Phonebook Backend (Task 3.11)

This project is part of the **Full Stack Open** course by the University of Helsinki.  
It covers **Part 3 – Programming a server with Node.js and Express**, specifically **Task 3.11**, which involves deploying the backend to the internet.

## 📖 Task Description

**3.11: Phonebook full stack**  
The goal of this exercise is to **deploy** the backend of the Phonebook application to an online service such as **Render** or **Fly.io**, and verify that it works with a web browser.

You should have:
- An Express server handling API routes for the phonebook.
- MongoDB as the database.
- The app deployed to the internet (with a public URL).
- A functional `/info` endpoint and working CRUD routes for phonebook entries.

---

## 🚀 Live Application

🔗 **Backend URL:**  
[https://fullstackopen-solutions-76v5.onrender.com/](https://fullstackopen-solutions-76v5.onrender.com/)

Example endpoints:
- `/api/persons` → List all contacts  
- `/api/persons/info` → Show number of contacts and server time  
- `/api/persons/:id` → Get a single contact  
- `POST /api/persons` → Add a new contact  
- `DELETE /api/persons/:id` → Remove a contact  

---

## 🛠️ Technologies Used

- **Node.js**
- **Express**
- **MongoDB / Mongoose**
- **dotenv** for environment variables
- **morgan** for request logging
- **cors** for cross-origin support
- **Render** (or other service) for deployment

---

## ⚙️ Running Locally

1. Clone the repository
```bash
git clone https://github.com//Bilal11123/FullStackOpen-Solutions.git
cd FullStackOpen-Solutions/part3/phonebook/phonebook-backend
```
2. Install dependencies
```bash
npm install
```
3. Set up environment variables
Create a .env file in the backend root:
```
PORT=3001
MONGODB_URI=your_mongodb_connection_string
```
4. Run the application
```bash
npm start
```
or during development:
```bash
npm run dev
```
The app will be available at http://localhost:3001.

---

## 📦 Deployment
The backend is deployed using Render.
To deploy:
- Push your code to GitHub.
- Create a new Render web service.
- Connect your GitHub repo.
- Set up root directory [part3/phonebook/phonebook-backend]
- Set environment variables (MONGODB_URI, PORT).
- Deploy automatically from main.