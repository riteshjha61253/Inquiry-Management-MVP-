# Inquiry Management System (MVP)

A simple **full-stack Inquiry Management System** built with **Node.js (Express)** and **React (Vite)**.

This project is an **MVP** focused on clean structure, correct logic, and practical trade-offs rather than production-level complexity.

---

## Project Walkthrough (Loom)

- https://www.loom.com/share/96e64e17eaa74a6a8b92d998b2750ff8

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
└── gitIgnore
```
---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
1. git clone https://github.com/riteshjha61253/Inquiry-Management-MVP-.git
2. cd inquiry-management
```

## 🖥️ Backend Setup

 1. cd backend
 2. Install Dependencies
 3. npm install
 4. npm start (to start backend server);

## Start Backend Server
- npm start


## Backend runs at:

http://localhost:5000


## Base API URL:

http://localhost:5000/api/inquiries

## Open new terminal 

## 🌐 Frontend Setup
1. cd frontend
2. Install Dependencies
3. npm install
4. npm run dev (to start frontend)
---
## Create Environment File

### Create a .env file inside the frontend directory:
and paste this:
VITE_API_URL=http://localhost:5000/api

- Restart the dev server after adding the environment file.

## Start Frontend
npm run dev

- Frontend runs at:

http://localhost:5173

---

## 🔗 API Endpoints

### Get All Inquiries
GET /api/inquiries

- Optional Query Parameters
1. status
2. source
---
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
---
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
---
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
---
## Here is Curl

### 1. Email + phone (both allowed)

```bash
curl -X POST http://localhost:5000/api/inquiries \
-H "Content-Type: application/json" \
-d '{
  "name": "Sneha",
  "email": "sneha@test.com",
  "phone": "+91-98765-43210",
  "source": "Referral"
}'
```
---

### 2. UPDATE STATUS 

Replace <ID> with a  inquiry ID from GET response

```bash
curl -X PATCH http://localhost:5000/api/inquiries/<ID>/status \
-H "Content-Type: application/json" \
-d '{
  "status": "Contacted"
}'
```
---
### 3. Get all inquiries

```bash
curl http://localhost:5000/api/inquiries
```
---
### 4. Filter by valid status

```bash
curl "http://localhost:5000/api/inquiries?status=New"
```
---
### 5. Filter by status + source

```bash
curl "http://localhost:5000/api/inquiries?status=Closed&source=Email"
```
---