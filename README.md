# 📚 Nalanda Library Backend

Backend for the **Nalanda Library System**, built using **Node.js**, **Express**, **MongoDB**, **JWT authentication**, and optional **GraphQL** support.  
It provides APIs for user management, book inventory, borrowing system, and admin analytics.

---

## 🚀 Features

### 🔐 Authentication
- JWT (HTTP-only cookie) authentication
- Separate login for **users** and **admins**
- Role-based access with middleware
- Rate limiting for signup & login

### 📚 Book Management
- Create / Update / Delete books
- Pagination & search
- ISBN validation
- REST + GraphQL support for CRUD

### 📖 Borrow System
- Borrow & return books
- Prevent duplicate borrowing
- Auto update available copies
- Borrow history
- Borrow statistics

### 🧑‍💼 Admin API
- View all users
- Admin stats
- Most borrowed books (aggregation)

### 🧩 Hybrid Architecture
- Full REST API
- Optional GraphQL API (for learning)
- JWT-protected GraphQL resolvers

---

## 📁 Project Structure
## 📁 Project Structure

```bash
src/

├── config/               # Environment, Database, and third-party service settings
│   ├── db.js             # Database connection and initialization
│   └── env.js            # Environment variable loading and validation
│
├── controllers/          # Express request handlers for REST endpoints
│   ├── admin.controller.js
│   ... (etc.)
│
├── graphql/              # GraphQL implementation components
│   ├── schema.js         # The main GraphQL Schema Definition Language (SDL)
│   ... (etc.)
│
└── server.js             # Entry point, responsible for starting the HTTP listener

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT + HTTP-only cookies |
| API Style | REST + GraphQL |
| Security | CORS, rate limiting |
| Utilities | bcrypt, cookie-parser |

---

## ⚙️ Installation

### 1️⃣ Clone repo
```bash
git clone https://github.com/YOUR_USERNAME/Nalanda_Library_backend.git
cd Nalanda_Library_backend

2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables

Create a .env file:

PORT=8000
MONGO_URI=mongodb://localhost:27017/library
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173

4️⃣ Start server
npm run dev


Server runs at:

http://localhost:8000

🔐 Authentication Flow

Login generates JWT

JWT stored in HTTP-Only cookie

Backend middleware verifyToken protects REST routes

Frontend (Next.js) middleware checks cookie + user role

GraphQL resolvers use authUser(context)

📡 REST API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/admin/login
POST /api/auth/admin/signup

Books
POST   /api/books/create
GET    /api/books/getAllBook
GET    /api/books/getById/:id
PUT    /api/books/update/:id
DELETE /api/books/deleteById/:id
GET    /api/books/search?q=...

Borrow
POST /api/borrow/borrow
POST /api/borrow/return
GET  /api/borrow/currentBorrowed
GET  /api/borrow/history
GET  /api/borrow/stats

🧩 GraphQL API
URL
POST /graphql

Example Mutation
mutation {
  createBook(
    title: "Dune",
    author: "Frank Herbert",
    isbn: "1234567890",
    publicationDate: "1965-01-01",
    genre: "Sci-Fi",
    copies: 5
  ) {
    success
    message
  }
}

📈 Admin Features

Total books

Total current borrowed

Available copies

Registered members

Most borrowed books aggregation




