import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentForm from "./StudentForm";
import type { StudentShape } from "./StudentForm";
import { encryptData, decryptData } from "../utils/crypto";

type StudentWithId = StudentShape & { id: number };

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<StudentWithId[]>([]);
  const [editing, setEditing] = useState<StudentWithId | null>(null);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const logged = JSON.parse(localStorage.getItem("student") || "null");

  const fetchStudents = async () => {
    const { data } = await axios.get("http://localhost:5000/students");
    const decryptedStudents: StudentWithId[] = data
      .map((record: any) => {
        try {
          const obj = JSON.parse(decryptData(record.encrypted));
          return { ...obj, id: record.id };
        } catch (err) {
          console.error("Failed to decrypt student:", err);
          return null;
        }
      })
      .filter(Boolean) as StudentWithId[];
    setStudents(decryptedStudents);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const logout = () => {
    localStorage.removeItem("student");
    navigate("/login");
  };

  const handleCreate = async (payload: StudentShape) => {
    const encrypted = encryptData(JSON.stringify(payload));
    await axios.post("http://localhost:5000/students", { encrypted });
    fetchStudents();
    setCreating(false);
  };

  const startEdit = (s: StudentWithId) => {
    setEditing(s);
    document.documentElement.classList.add("modal-open");
  };

  const closeEdit = () => {
    setEditing(null);
    document.documentElement.classList.remove("modal-open");
  };

  const handleSaveEdit = async (payload: StudentShape & { id?: number }) => {
    if (!payload.id) return;
    const encrypted = encryptData(JSON.stringify(payload));
    await axios.put(`http://localhost:5000/students/${payload.id}`, {
      encrypted,
    });
    closeEdit();
    fetchStudents();

    if (logged && logged.id === payload.id) {
      localStorage.setItem("student", JSON.stringify(payload));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this student?")) return;
    await axios.delete(`http://localhost:5000/students/${id}`);
    fetchStudents();

    if (logged && logged.id === id) {
      logout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Students</h2>
            {logged && (
              <div className="text-sm text-gray-600">
                Welcome, <strong>{logged.fullName}</strong>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCreating((c) => !c)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {creating ? "Close Create" : "Create New"}
            </button>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {creating && (
          <div className="mb-6 border p-4 rounded">
            <h3 className="font-semibold mb-3">Create Student</h3>
            <StudentForm onSubmit={handleCreate} submitLabel="Add Student" />
          </div>
        )}

        <div className="overflow-x-auto overflow-y-auto max-h-[56vh] border rounded">
          <table className="w-full border-collapse ">
            <thead className="bg-gray-200 sticky top-0 z-10">
              <tr>
                <th className="border px-3 py-2">Name</th>
                <th className="border px-3 py-2">Email</th>
                <th className="border px-3 py-2">Phone</th>
                <th className="border px-3 py-2">DOB</th>
                <th className="border px-3 py-2">Gender</th>
                <th className="border px-3 py-2">Address</th>
                <th className="border px-3 py-2">Course</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr
                  key={s.id}
                  className="text-center even:bg-white odd:bg-gray-50"
                >
                  <td className="border px-3 py-2">{s.fullName}</td>
                  <td className="border px-3 py-2">{s.email}</td>
                  <td className="border px-3 py-2">{s.phone}</td>
                  <td className="border px-3 py-2">{s.dob}</td>
                  <td className="border px-3 py-2">{s.gender}</td>
                  <td className="border px-3 py-2 text-left">{s.address}</td>
                  <td className="border px-3 py-2">{s.course}</td>
                  <td className="px-3 py-2 flex gap-5 space-x-2">
                    <button
                      onClick={() => startEdit(s)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-semibold mb-4">Edit Student</h3>

              <StudentForm
                initial={editing}
                onSubmit={(data) => handleSaveEdit({ ...data, id: editing.id })}
                submitLabel="Save Changes"
              />

              <div className="flex justify-end mt-3">
                <button
                  onClick={closeEdit}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
