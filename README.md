# Swasthya Healthcare Platform

Swasthya Healthcare Platform is a full-stack patient-doctor appointment and communication system. It includes an  React frontend and an Express/MongoDB backend, with support for authentication, role-based access, online appointment booking, chat, reviews, and payment status tracking.

## 🚀 Project Structure

- `CLIENT/`: React app (Vite-based) with layouts, routes, pages, and API service modules.
- `SERVER/`: Node.js + Express API with Mongoose models, controllers, routes, middlewares, and Cloudinary support for file uploads.

## 🧩 Core Features

### Authentication
- Patient and Doctor signup/login
- JWT-based auth tokens
- Role-based route protection

### Doctor flows
- Profile management
- Appointment history and status control
- Doctor chat and patient reviews

### Patient flows
- Search and list doctors
- Book and view appointments
- Track appointment/payment status
- Edit profile and view analytics

### Shared features
- Real-time chat (Socket.IO)
- Health report uploads and retrieval
- Admin-ready lists and monitoring endpoints

## ⚙️ Environment and Setup

### 1) Server

1. Go to `SERVER/`
2. Copy `.env.example` to `.env` and configure:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLOUDINARY_*` 
3. Install and run:

```bash
cd SERVER
npm install
npm run dev
```

### 2) Client

1. Go to `CLIENT/`
2. Create `.env` with API URL values, e.g.:
   - `VITE_BASE_URL=http://localhost:5000`
3. Install and run:

```bash
cd CLIENT
npm install
npm run dev
```

## 🛠️ API Endpoints (selected)

### /api/auth
- `POST /login`
- `POST /register`

### /api/doctor
- `GET /` (list doctors)
- `POST /create` (doctor profile)

### /api/patient
- `POST /book-appointment`
- `GET /appointments`

### /api/chat
- `GET /:chatId`
- `POST /message`


## 📦 Dependencies

- Frontend: React, React Router, Axios, Tailwind CSS, Socket.IO client
- Backend: Express, Mongoose, bcrypt, jsonwebtoken, multer, cloudinary

## 📝 Notes
- Run backend before frontend.
- Ensure up-to-date Node.js (>=18) and npm.
- For production configure env vars and use a process manager (`pm2` or similar) and secure HTTPS.

## 🤝 Contributions

Pull requests welcome. Please follow code style and lint rules in `CLIENT/eslint.config.js` and `SERVER` conventions.

## 📄 License
MIT
