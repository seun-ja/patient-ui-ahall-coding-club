"use client";

import { useEffect, useState } from "react";
import jwt from "@/services/jwt";
import TimeSlots from "./TimeSlots";
import DateTimePicker from "./DateTime";
import { getSlots } from "@/services/redis";

import Toast from "./Toast";

export interface AppointmentFormProps {
  modalOpen: boolean;
  onSubmit: (data: {
    patient_id: string;
    preferred_doctor_first_name: string;
    preferred_doctor_id: string;
    date: string;
  }) => void;
  error?: string;
  onClearError?: () => void;
}

export default function AppointmentForm({
  modalOpen,
  onSubmit,
  error,
  onClearError,
}: AppointmentFormProps) {
  const token = localStorage.getItem("token");
  const { claims } = jwt(token!);

  const [date, setDate] = useState(""); // ISO date
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [doctors, setDoctors] = useState<{ first_name: string }[]>([
    { first_name: "Awe" },
    { first_name: "Chidinma" },
  ]);
  const [doctor, setDoctor] = useState("");
  const [doctorSlots, setDoctorSlots] = useState<Record<string, string[]>>({});

  // Fetch available slots for all doctors for today's date on mount
  useEffect(() => {
    if (!modalOpen) return;
    const today = new Date().toISOString().split("T")[0];

    const fetchAll = async () => {
      // const slotsMap: Record<string, string[]> = {};

      const results = await Promise.all(
        doctors.map((doc) =>
          getSlots(doc.first_name, today).then((slots) => ({
            name: doc.first_name,
            slots,
          })),
        ),
      );

      const slotsMap = Object.fromEntries(
        results.map((r) => [r.name, r.slots]),
      );

      setDoctorSlots(slotsMap);
    };

    fetchAll();
  }, [modalOpen]);

  // When doctor or date changes, set slots from pre-fetched if date is today, else fetch
  useEffect(() => {
    if (!date || !doctor) return;
    const day = date.split("T")[0];
    const today = new Date().toISOString().split("T")[0];
    if (day === today && doctorSlots[doctor]) {
      setSlots(doctorSlots[doctor]);
      return;
    }
    // Fallback: fetch for other dates
    const fetchSlots = async () => {
      try {
        const slots = await getSlots(doctor, day);
        setSlots(slots);
      } catch (err) {
        setSlots([]);
      }
    };
    fetchSlots();
  }, [date, doctor, doctorSlots]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !selectedTime) {
      alert("Please select date and time");
      return;
    }

    // Send local time string (no Z) so backend parses as local time
    const localDateTime = `${date.split("T")[0]}T${selectedTime}:00`;

    onSubmit({
      patient_id: claims.sub,
      preferred_doctor_first_name: doctor,
      preferred_doctor_id: "", // replace later
      date: localDateTime,
    });

    // reset
    setDate("");
    setDoctor("");
    setSelectedTime(null);
    setSlots([]);
  };

  return (
    <>
      {error && (
        <Toast message={error} type="error" onClose={onClearError || (() => {})} />
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Doctor */}
      <select
        value={doctor}
        onChange={(e) => {
          setDoctor(e.target.value);
          setSelectedTime(null); // reset slot when doctor changes
        }}
        required
        className="border border-gray-300 rounded-lg p-3 bg-white text-gray-500"
      >
        <option value="">Select Doctor</option>
        {doctors.map((doc, i) => (
          <option key={i} value={doc.first_name}>
            Dr. {doc.first_name}
          </option>
        ))}
      </select>

      {/* Date */}
      <DateTimePicker
        date={date}
        setDate={setDate}
        resetTime={() => setSelectedTime(null)}
      />

      {/* Time Slots */}
      {date && doctor && (
        <TimeSlots
          slots={slots}
          selected={selectedTime}
          onSelect={setSelectedTime}
        />
      )}

        <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg">
          Book
        </button>
      </form>
    </>
  );
}
