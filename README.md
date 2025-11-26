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

