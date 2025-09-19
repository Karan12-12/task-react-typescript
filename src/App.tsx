import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/LoginForm";
import Register from "./components/Register";
import StudentList from "./components/StudentList";

const App: React.FC = () => {
  const logged = JSON.parse(localStorage.getItem("student") || "null");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={logged ? "/students" : "/login"} replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/students"
          element={logged ? <StudentList /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
