# Feedback Collection Tool

A fullstack feedback collection tool with real-time updates, admin dashboard, and secure authentication.

---

## Features
- User feedback form (name, email, feedback, rating)
- Real-time updates for admin dashboard (Socket.io)
- Admin login and JWT authentication
- Feedback stats and charts
- Filtering, sorting, and search for feedback
- MongoDB Atlas integration

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account (free tier is fine)

---

## Backend Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```
2. **Create a `.env` file in the `backend` directory:**
   ```env
   PORT=5000
   MONGODB_URI=your-mongodb-atlas-uri
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_URL=http://localhost:3000
   ```
3. **Start the backend:**
   ```bash
   npm run dev
   ```

---

## Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
2. **Start the frontend:**
   ```bash
   npm start
   ```

---

## Default Admin Credentials

- **Username:** `admin`
- **Password:** `admin123`

> You can create the initial admin by sending a POST request to `/api/admin/setup` with the above credentials:
> ```json
> {
>   "username": "admin",
>   "password": "admin123"
> }
> ```

---



## API Endpoints

### Public
- `POST /api/feedback` — Submit feedback
- `POST /api/admin/setup` — Create initial admin

### Admin (JWT required)
- `POST /api/admin/login` — Admin login
- `GET /api/feedback` — List all feedback
- `GET /api/feedback/stats` — Feedback stats

---

## Real-Time Updates
- The admin dashboard receives new feedback instantly via Socket.io.

---

## License
MIT 