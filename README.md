# Inquiry Management System (MVP)

A simple **full-stack Inquiry Management System** built with **Node.js (Express)** and **React (Vite)**.

This project is an **MVP** focused on clean structure, correct logic, and practical trade-offs rather than production-level complexity.

---

## 🚀 Features


### Backend
- Create new inquiries
- Fetch all inquiries (with optional filters)
- Update inquiry status
- Email and phone validation
- Duplicate inquiry prevention
- File-based JSON storage
- RESTful API structure

### Frontend
- Built with React + Vite
- Material UI (MUI) for clean UI
- React Hook Form for form handling and validation
- Axios for API communication

---

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- UUID
- File System (JSON storage)

### Frontend
- React (Vite)
- Material UI (MUI)
- React Hook Form
- Axios

---

## 📂 Project Structure

```text
inquiry-management/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── storage/
│   │   ├── utils/
│   │   └── app.js
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
│
└── README.md
```
---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
1. git clone <your-repository-url>
2. cd inquiry-management
```

## 🖥️ Backend Setup

 1. Install Dependencies
 2. cd backend
 3. npm install

## Start Backend Server
- npm start


## Backend runs at:

http://localhost:5000


## Base API URL:

http://localhost:5000/api/inquiries

## 🌐 Frontend Setup
1. Install Dependencies
2. cd frontend
3. npm install

## Create Environment File

### Create a .env file inside the frontend directory:

VITE_API_URL=http://localhost:5000/api

- Restart the dev server after adding the environment file.

## Start Frontend
npm run dev

- Frontend runs at:

http://localhost:5173

## 🔗 API Endpoints

### Get All Inquiries
GET /api/inquiries

- Optional Query Parameters
1. status
2. source

### Create Inquiry
POST /api/inquiries

Request Body
``` json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "source": "Website"
}
```

### Update Inquiry Status
PATCH /api/inquiries/:id/status


Request Body

```json
{
  "status": "Contacted"
}
```


### Valid Status Values
There are three status
1. New
2. Contacted
3. Closed

## 🧪 Validation Rules

1. Name is required
2. Either email or phone must be provided
3. Email must be valid
4. Phone must be 10–15 digits
5. Duplicate email or phone is not allowed
6. Source must be one of:
   -Website
   -WhatsApp
   -Email
   -Referral