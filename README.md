# College Portal for Student-Faculty

A comprehensive web-based portal designed to facilitate seamless interaction between students and faculty members in an educational institution. This platform provides various features for managing academic activities, attendance, notes, and communication.

## Features

- **User Authentication**
  - Separate login portals for students and faculty
  - Secure authentication using JWT tokens
  - Password encryption using bcrypt

- **Student Features**
  - View and manage attendance records
  - Access study materials and notes
  - View academic calendar
  - Receive notifications
  - Team management for group activities

- **Faculty Features**
  - Manage student attendance
  - Upload and manage study materials
  - Post announcements and notifications
  - Schedule events in academic calendar
  - Create and manage teams

- **Admin Features**
  - User management
  - System configuration
  - Overview of portal activities

## Technology Stack

### Frontend
- React.js
- React Router for navigation
- FullCalendar for calendar management
- Axios for API requests
- SweetAlert for notifications
- FontAwesome for icons
- React DatePicker for date selection

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Socket.IO for real-time communication
- Nodemailer for email notifications
- Bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd College_portal_for_student-faculty
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
College_portal_for_student-faculty/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── index.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.js
│   └── package.json
└── thunder-tests/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- PES University for supporting this project
- All contributors who have helped in developing this portal
- Open source community for providing amazing tools and libraries 
