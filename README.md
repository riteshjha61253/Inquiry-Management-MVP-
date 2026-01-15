Inquiry Management System
A simple full-stack Inquiry Management System(MVP) built with Node.js (Express) and React (Vite).

🚀 Features
Backend

Create new inquiries
Fetch all inquiries (with filters)
Update inquiry status
Email and phone validation
Duplicate inquiry prevention
File-based JSON storage
RESTful API structure

Frontend

Built with React + Vite
Material UI for clean UI
React Hook Form for form handling & validation
Axios for API communication


🧱 Tech Stack
Backend

Node.js
Express.js
UUID
File System (JSON storage)

Frontend

React (Vite)
Material UI (MUI)
React Hook Form
Axios


📂 Project Structure
textinquiry-management/
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

⚙️ Setup Instructions
1️⃣ Clone the Repository
Bashgit clone <your-repository-url>
cd inquiry-management
🖥️ Backend Setup
Install Dependencies
Bashcd backend
npm install
Start Backend Server
Bashnpm start
Backend runs at:
http://localhost:5000
Base API URL:
http://localhost:5000/api/inquiries
🌐 Frontend Setup
Install Dependencies
Bashcd frontend
npm install
Create Environment File
Create a .env file inside the frontend directory:
textREACT_APP_API_URL=http://localhost:5000/api
⚠️ Restart the dev server after adding .env.
Start Frontend
Bashnpm run dev
Frontend runs at:
http://localhost:5173

🔗 API Endpoints
Get All Inquiries
BashGET /api/inquiries
Optional Query Params:

status
source

Create Inquiry
BashPOST /api/inquiries
Request Body:
JSON{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "source": "Website"
}
Update Inquiry Status
BashPATCH /api/inquiries/:id/status
Request Body:
JSON{
  "status": "Contacted"
}
Valid Status Values:

New
Contacted
Closed


🧪 Validation Rules

Name is required
Either email or phone must be provided
Email must be valid
Phone must be 10–15 digits
Duplicate email or phone is not allowed
Source must be one of:
Website
WhatsApp
Email
Referral



📌 Notes

node_modules are ignored via .gitignore
This project uses file-based storage, not a database

