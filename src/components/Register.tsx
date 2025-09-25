import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentForm from "./StudentForm";
import type { StudentShape } from "./StudentForm";
import { encryptData } from "../utils/crypto";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (data: StudentShape) => {
    
    const encryptedData: Record<string, string> = {};
    Object.entries(data).forEach(([key, value]) => {
      encryptedData[key] = encryptData(String(value));
    });

    await axios.post("http://localhost:5000/students", encryptedData);
    alert("Registration successful. Please login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <StudentForm onSubmit={handleRegister} submitLabel="Register" />
      </div>
    </div>
  );
};

export default Register;
