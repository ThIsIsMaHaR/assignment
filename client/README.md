# Full-Stack Task Management System (PrimeTrade Assignment)

A secure, scalable MERN stack application featuring JWT authentication, Role-Based Access Control (RBAC), and a responsive React frontend.

## 🚀 Features
- **Secure Auth:** JWT-based authentication with password hashing (bcrypt).
- **RBAC:** Admins can see/manage all tasks; Users can only manage their own.
- **RESTful API:** Clean API versioning (`/api/v1/...`) and standard HTTP status codes.
- **Responsive UI:** Built with React, Tailwind CSS, and Lucide Icons.

## 🛠️ Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS, Axios.
- **Backend:** Node.js, Express.js, MongoDB, Mongoose.

## 📈 Scalability Note (For Reviewers)
To prepare this system for a production environment:
1. **Caching:** Implement **Redis** for frequently accessed tasks to reduce DB load.
2. **Database:** Add indexing on the `userId` field in the Task model for faster queries.
3. **Architecture:** The modular folder structure (Controllers/Routes/Models) allows for an easy transition to a **Microservices** architecture.
4. **Security:** Add `helmet.js` for header security and `express-rate-limit` to prevent Brute Force attacks.