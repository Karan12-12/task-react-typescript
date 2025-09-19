import React, { useEffect, useState } from "react";

export type StudentShape = {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  course: string;
  password: string; 
};

type Props = {
  initial?: StudentShape;
  onSubmit: (data: StudentShape) => void;
  submitLabel?: string;
};

const empty: StudentShape = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  address: "",
  course: "",
  password: "",
};

const StudentForm: React.FC<Props> = ({
  initial,
  onSubmit,
  submitLabel = "Submit",
}) => {
  const [form, setForm] = useState<StudentShape>(initial || empty);

  useEffect(() => {
    setForm(initial || empty);
  }, [initial]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block mb-1 font-medium">Full Name</label>
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Gender</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Course Enrolled</label>
        <input
          name="course"
          value={form.course}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
