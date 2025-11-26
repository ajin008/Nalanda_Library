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
src/
├── config/             # Configuration files (database, environment variables)
├── controllers/        # Express route handlers (traditional REST)
├── graphql/            # GraphQL schema, resolvers, and setup
├── middleware/         # Express middleware for auth, rate limiting, and roles
├── models/             # Mongoose/Sequelize models (database schemas)
├── repositories/       # Abstraction layer for direct database interaction
├── routes/             # Express route definitions (mapping URLs to controllers)
├── services/           # Business logic and complex operations
├── utils/              # Helper functions (tokens, error handling, responses)
├── app.js              # Express application setup
└── server.js           # Server startup file
🌳 Detailed Directory BreakdownTo keep the main README clean while providing all the detail, you can use the HTML <details> tag to make the sub-directories collapsible. This is great for showing detail without clutter.$\blacktriangleright$ View Full Structure Details<details><summary>Click to expand/collapse the full directory tree</summary>src/

├── config/
│   ├── db.js             # Database connection setup
│   └── env.js            # Environment variable loading and validation
│
├── controllers/
│   ├── admin.controller.js
│   ├── auth.controller.js
│   ├── book.controller.js
│   ├── borrow.controller.js
│   └── user.controller.js
│
├── graphql/
│   ├── schema.js         # The main GraphQL Schema definition
│   ├── resolvers.js      # Functions to fetch data for GraphQL queries/mutations
│   └── index.js          # GraphQL server setup (connecting schema/resolvers)
│
├── middleware/
│   ├── auth.js           # General authentication check (e.g., JWT verification)
│   ├── authUser.js       # User-specific authentication checks
│   ├── rateLimit.js      # Request rate limiting
│   └── role.js           # Authorization check based on user roles
│
├── models/
│   ├── Book.model.js     # Schema for Book entity
│   ├── Borrow.model.js   # Schema for Borrowing transaction entity
│   └── User.model.js     # Schema for User entity
│
├── repositories/
│   ├── book.repo.js      # Low-level DB access for Books (CRUD functions)
│   ├── borrow.repo.js    # Low-level DB access for Borrowing
│   └── user.repo.js      # Low-level DB access for Users
│
├── routes/
│   ├── admin.routes.js
│   ├── auth.routes.js
│   ├── book.routes.js
│   ├── borrow.routes.js
│   └── user.routes.js
│
├── services/
│   ├── book.service.js   # Business logic for Book operations
│   ├── borrow.service.js # Business logic for Borrowing operations
│   └── user.service.js   # Business logic for User operations
│
├── utils/
│   ├── error.js          # Custom error classes and handlers
│   ├── generateToken.js  # Function to create JWTs
│   ├── response.js       # Standardized API response formatter
│   └── setTokenCookie.js # Helper for setting token in HTTP-only cookie
│
├── app.js                # Core Express app initialization (middleware loading)
└── server.js             # Main entry point (starting the HTTP listener)


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


