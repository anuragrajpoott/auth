# MERN Authentication System

A modern, production-ready authentication system built with the **MERN Stack**. It implements secure JWT authentication using **HTTP-only cookies**, email verification via OTP, password reset flow, protected routes, and a clean, responsive React frontend.

The project is designed to demonstrate real-world authentication practices while keeping the codebase simple, maintainable, and interview-friendly.

---

# Features

### Authentication

* User Registration
* Email Verification (OTP)
* Resend Verification OTP
* Login
* Logout
* Automatic Session Restoration
* Refresh Access Token
* Protected Routes
* Public Route Protection

### Password Management

* Forgot Password
* Verify Reset OTP
* Reset Password
* Change Password

### User Management

* Get Current User
* Delete Account

### Frontend

* Responsive UI
* Modern SaaS-inspired Design
* Form Validation
* Loading States
* Toast Notifications
* Reusable Components
* Redux Toolkit Authentication State
* Axios Instance with HTTP-only Cookie Support

---

# Tech Stack

## Frontend

* React
* React Router DOM
* Redux Toolkit
* React Redux
* Axios
* Tailwind CSS
* React Hook Form
* React Hot Toast

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* HTTP-only Cookies
* Nodemailer
* OTP Verification

---

# Folder Structure

```
Frontend
src/
│
├── app/
├── assets/
├── components/
│   ├── loaders/
│   └── ui/
├── features/
│   └── auth/
├── layouts/
├── pages/
├── routes/
├── services/
├── utils/
├── App.jsx
├── main.jsx
└── index.css

Backend
src/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── templates/
├── utils/
├── validations/
├── app.js
└── server.js
```

---

# Authentication Flow

## Registration

```
Register
      │
      ▼
Verify Email OTP
      │
      ▼
Login
      │
      ▼
Dashboard
```

## Forgot Password

```
Forgot Password
       │
       ▼
Verify Reset OTP
       │
       ▼
Reset Password
       │
       ▼
Login
```

---

# API Highlights

* Register
* Verify Email
* Resend Verification OTP
* Login
* Logout
* Refresh Token
* Get Current User
* Change Password
* Forgot Password
* Verify Reset OTP
* Reset Password
* Delete Account

---

# Security Features

* JWT Authentication
* HTTP-only Cookies
* Refresh Token Rotation
* Password Hashing
* Email OTP Verification
* Password Reset OTP
* Protected API Routes
* Server-side Authentication
* No Tokens Stored in Local Storage
* Cookie-based Session Management

---

# Environment Variables

## Backend

```env
PORT=

DATABASE_URL=

CLIENT_URL=

APP_NAME=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

EMAIL_USER=
EMAIL_PASS=

NODE_ENV=
```

## Frontend

```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd project
```

---

## Backend

```bash
cd backend
npm install
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Screens

* Login
* Register
* Verify Email
* Forgot Password
* Verify Reset OTP
* Reset Password
* Dashboard
* Profile
* 404 Page

---

# Project Highlights

* Clean Folder Structure
* Reusable UI Components
* Minimal Redux State
* Production-style API Layer
* Consistent Error Handling
* Responsive Design
* Maintainable Codebase
* Interview-friendly Architecture

---

# Future Improvements

* Remember Me
* Rate Limiting UI Feedback
* Account Lock after Multiple Failed Attempts
* Social Login (Google/GitHub)
* Profile Photo Upload
* User Roles & Permissions
* Unit & Integration Testing
* Docker Support
* CI/CD Pipeline

---

# Learning Outcomes

This project demonstrates:

* REST API Integration
* Authentication & Authorization
* JWT & Refresh Tokens
* HTTP-only Cookie Authentication
* React State Management
* Redux Toolkit
* Protected Routing
* Form Handling & Validation
* Production-ready Project Structure
* Secure Authentication Best Practices

---

# License

This project is intended for learning, portfolio, and interview purposes.
