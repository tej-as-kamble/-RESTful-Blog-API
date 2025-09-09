

# 📖 Blog API

A **RESTful Blog Application API** built with **Node.js, Express, MongoDB, and JWT**.
This project allows users to register, login, and perform CRUD operations on blog posts. Authentication and authorization ensure secure access.

---

## 🚀 Features

* **User Authentication**

  * Register new users
  * Login with JWT authentication
* **Posts**

  * Create posts (authenticated users only)
  * Read all posts (public)
  * Read single post (public)
  * Update post (only post’s author)
  * Delete post (only post’s author)

---

## 🛠 Tech Stack

* **Backend**: Node.js, Express
* **Database**: MongoDB + Mongoose
* **Authentication**: JWT (JSON Web Token)
* **Password Security**: bcrypt.js
* **Dev Tools**: Nodemon, Postman

---

## 📂 Project Structure

```
blog-api/
│── index.js              # entry point
│── .env                  # environment variables
│── package.json
│── .gitignore
│
├── config/
│   └── db.js             # MongoDB connection
│
├── models/               # Mongoose schemas
│   ├── User.js
│   ├── Post.js
│   └── Comment.js (future)
│
├── controllers/          # Business logic
│   ├── authController.js
│   └── postController.js
│
├── routes/               # Express routes
│   ├── auth.js
│   └── posts.js
│
└── middleware/
    └── authMiddleware.js # JWT validation
```

---

## ⚙️ Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/tej-as-kamble/-RESTful-Blog-API
cd blog-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the root:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/blog-api
JWT_SECRET=your_jwt_secret
```

### 4. Run Server

```bash
npm run dev
```

Server will start at:
👉 `http://localhost:3000`

---

## 📌 API Endpoints

### 🔑 Auth

* **Register**

  ```
  POST /api/auth/register
  ```

  **Body**:

  ```json
  {
    "username": "tejas",
    "email": "tejas@example.com",
    "password": "123456"
  }
  ```

* **Login**

  ```
  POST /api/auth/login
  ```

  **Body**:

  ```json
  {
    "email": "tejas@example.com",
    "password": "123456"
  }
  ```

---

### 📝 Posts

* **Create Post** (Auth required)

  ```
  POST /api/posts
  ```

  **Headers**:
  `Authorization: Bearer <token>`
  **Body**:

  ```json
  {
    "title": "My First Blog Post",
    "content": "This is the content of the blog post."
  }
  ```

* **Get All Posts**

  ```
  GET /api/posts
  ```

* **Get Single Post**

  ```
  GET /api/posts/:id
  ```

* **Update Post** (Author only)

  ```
  PUT /api/posts/:id
  ```

* **Delete Post** (Author only)

  ```
  DELETE /api/posts/:id
  ```

---

## ✅ Next Steps

* [ ] Add **Comments CRUD** (`/api/comments`)
* [ ] Add **Role-based Access Control (RBAC)**
* [ ] Add **API Documentation** using Swagger/Postman
* [ ] Write **Unit & Integration Tests**

---

## 👨‍💻 Author

**Tejas Kamble**

---


