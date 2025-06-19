Candidate Referral System

A full-stack web application that streamlines the process of referring, tracking, and managing candidates in an organization. Built using **React**, **Node.js**, **Express**, and **MongoDB**.

---

 Features
-  Candidate Registration with resume upload
-  Filter candidates by job title or status (Pending, Interview Scheduled, Hired)
-  Update candidate status in real-time
-  Backend REST API using Express.js
-  Resume file storage (local or cloud-ready)
-  Clean UI built with React and modular components
-  Postman Collection for API testing
-  Ready for authentication and deployment

---

Project Structure
candidate_referral_system/
│
├── backend/ # Node.js + Express backend
├── frontend/ # React.js frontend
├── Candidate Referral System.postman_collection.json
└── README.md

Installation and Running Locally

Prerequisites

- Node.js (v18 or above)
- MongoDB (local or Atlas)
- Postman (for API testing)

Steps to Run

1.Clone the repo
   ```bash
   git clone https://github.com/yourusername/candidate-referral-system.git
   cd candidate_referral_system

Backend Setup

cd backend
npm install
npm start
The server will start on http://localhost:5000

Frontend Setup (in new terminal)

cd frontend
npm install
npm start
React app runs at http://localhost:3000

API Documentation (Postman)
To test backend APIs, import the Postman collection:

Candidate Referral System.postman_collection.json

*Example Endpoints
Method	Endpoint	Description
GET	/api/candidates	List all candidates
POST	/api/candidates	Add a new candidate
PUT	/api/candidates/:id/status	Update candidate status

Future Enhancements
-JWT-based user authentication
-Cloud resume storage (AWS S3 or Firebase)
-Metrics dashboard (Total referred, Status-wise count)
-Admin vs. Referrer user roles

Assumptions / Limitations
-No authentication implemented yet
-Resume files stored locally for now
-Limited job titles in filtering (can be extended)

Deployment
-This project is ready for deployment to:
-Frontend: Netlify, Vercel, or GitHub Pages
-Backend: Render, Railway, or Cyclic
-MongoDB: MongoDB Atlas
-Deployment scripts can be added for easy CI/CD

Author
-Roobika Ravi
GitHub: Roobiravi94
