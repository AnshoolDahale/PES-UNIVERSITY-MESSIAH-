import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import Login from "./components/Login/login";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard";
import FacultyInfo from "./components/Faculty/FacultyInfo";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminSchedule from "./components/Admin/AdminSchedule";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-schedule" element={<AdminSchedule />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/faculty-info" element={<FacultyInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;