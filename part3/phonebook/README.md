# Full Stack Open 2025 - Part 3: Phonebook Backend

This project is part of the **Full Stack Open** course by the University of Helsinki.  
It covers **Part 3 – Programming a server with Node.js and Express**, where the goal is to **deploy the Phonebook backend** to the internet.

---

## 📖 Task Description

**Exercise 3.11: Phonebook full stack**

> Deploy your backend to the internet and make sure that it works in the browser.  
>  
> The backend still stores the data in memory (no database yet).  
>  
> Verify that endpoints like `/api/persons` and `/info` can be accessed through the deployed URL.

---

## 🚀 Live Application

🔗 **Backend URL:**  

[https://fullstackopen-solutions-76v5.onrender.com/](https://fullstackopen-solutions-76v5.onrender.com/)

Example endpoints:
- `/api/persons` → List all persons  
- `/api/persons/info` → Display info about the phonebook  
- `/api/persons/:id` → Get one person by id  
- `POST /api/persons` → Add a new person  
- `DELETE /api/persons/:id` → Delete a person  

---
## Directory
<pre>
phonebook
  phonebook (Frontend)
  phonebook-backend
</pre>

---

## 🛠️ Technologies Used

- **Node.js**
- **Express**
- **CORS** (for connecting with frontend)
- **Morgan** (for logging HTTP requests)
- **Render** (for deployment)

---

## ⚙️ Running Locally

1. Clone the repository
```bash
git clone https://github.com/Bilal11123/FullStackOpen-Solutions.git
cd FullStackOpen-Solutions/part3/phonebook/phonebook-backend
```
2. Install Dependencies
```bash
npm install
```
3. Run Server
```bash
npm start
or
npm run dev
```
4. Do the same for frontend
```bash
cd FullStackOpen-Solutions/part3/phonebook/phonebook-backend
npm install
npm start
or
npm run dev
```
---

## 📦 API Endpoints
| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| GET    | `/api/persons`     | Get all persons     |
| GET    | `/api/persons/:id` | Get person by ID    |
| POST   | `/api/persons`     | Add a new person    |
| DELETE | `/api/persons/:id` | Delete a person     |
| GET    | `/info`            | Show phonebook info |

