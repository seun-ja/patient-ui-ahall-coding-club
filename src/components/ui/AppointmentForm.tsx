"use client";

import { useState } from "react";
import jwt from "@/services/jwt";
import DateTimePicker from "./DateTime";

export interface AppointmentFormProps {
  onSubmit: (data: {
    patient_id: string;
    preferred_doctor_first_name: string;
    date: string;
    preferred_doctor_id: string;
  }) => void;
}

export default function AppointmentForm({ onSubmit }: AppointmentFormProps) {
  const token = localStorage.getItem("token");
  const { claims } = jwt(token!);

  const [date, setDate] = useState("");
  const [preferredDoctorFirstName, setPreferredDoctorFirstName] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      date: date,
      preferred_doctor_first_name: preferredDoctorFirstName,
      patient_id: claims.sub,
      preferred_doctor_id: "",
    });
    setDate("");
    setPreferredDoctorFirstName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Doctor First Name"
        value={preferredDoctorFirstName}
        onChange={(e) => setPreferredDoctorFirstName(e.target.value)}
        required
        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-700"
      />
      {/* TODO: Make this a dropdown */}
      <DateTimePicker date={date} setDate={setDate} />
      <button
        type="submit"
        className="bg-emerald-900 hover:bg-emerald-900 text-white py-2 rounded-lg transition-colors"
      >
        Book
      </button>
    </form>
  );
}
