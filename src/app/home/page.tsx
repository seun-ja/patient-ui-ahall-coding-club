"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import AppointmentForm from "@/components/ui/AppointmentForm";
import { bookAppointments, getAppointments } from "@/services/appointments";
import { Appointment, AppointmentRequest } from "@/types/appointment";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Claims } from "@/services/jwt";
import jwt from "@/services/jwt";

export default function LandingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [claims, setClaims] = useState<Claims | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const nextAppointment = appointments.find((a) => a.status === "pending");
  const displayAppointment = nextAppointment ?? appointments[0];

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwt(token);
      setClaims(decoded.claims);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!claims?.sub) return;

    // TODO: Cache appointments
    getAppointments(claims.sub)
      .then((data) => {
        setAppointments(data);
      });
  }, [claims]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading...</p>;
  }

  if (!claims) return null;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        <main className="p-8 space-y-8 overflow-auto relative">
          {/* Floating Hamburger - Visible ONLY on Desktop */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed bottom-8 left-8 z-40 hidden md:flex items-center justify-center w-14 h-14 bg-blue-500 text-white rounded-full shadow-xl hover:bg-emerald-800 hover:scale-110 transition-all active:scale-95 border-2 border-white/20"
          >
            <span className="text-2xl">☰</span>
          </button>

          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Welcome back, {claims.firstName} 👋
            </h1>
            <p className="text-gray-500">
              Manage your appointments and health records
            </p>
          </div>

          {/* Next Appointment Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Next Appointment
              </h2>

              {appointments.length === 0 ? (
                <p className="text-gray-500 text-sm mt-2">
                  You have no appointments yet
                </p>
              ) : (
                <div className="mt-2">
                  <p className="font-medium text-gray-800">
                    Dr. {displayAppointment?.doctor_first_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(displayAppointment?.date).toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="bg-gray-500 hover:bg-blue-300 text-white px-6 py-2.5 rounded-xl font-medium transition shadow-md active:scale-95"
            >
              Book Appointment
            </button>
          </div>

          {/* Upcoming List */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Upcoming Appointments
            </h2>

            {appointments.length === 0 ? (
              <p className="text-gray-500 text-sm">No appointments scheduled</p>
            ) : (
              <div className="space-y-4">
                {appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        Dr. {appt.doctor_first_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(appt.date).toLocaleString()}
                      </p>
                    </div>

                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        appt.status
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-blue-500">
                  Book Appointment
                </h3>

                <button
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition"
                >
                  ✕
                </button>
              </div>

              <AppointmentForm
                modalOpen={modalOpen}
                error={bookingError || undefined}
                onClearError={() => setBookingError(null)}
                onSubmit={async (data: AppointmentRequest) => {
                  try {
                    const created = await bookAppointments(data);
                    const createdAppointment = {
                      id: created.appointmentId,
                      patient_id: claims.sub,
                      doctor_id: created.doctorId,
                      doctor_first_name: created.doctorFirstName,
                      date: created.date,
                      status: created.status,
                    };
                    setAppointments((prev) => [createdAppointment, ...prev]);
                    setModalOpen(false);
                  } catch (err: any) {
                    // Try to extract a meaningful error message
                    let msg = err?.response?.data?.message || err?.message || String(err);
                    if (typeof msg === "string" && msg.toLowerCase().includes("slot already taken")) {
                      setBookingError("Choose another time, already taken");
                    } else if (msg && typeof msg === "string" && msg !== "Network Error") {
                      setBookingError(msg);
                    } else {
                      setBookingError("Failed to book appointment. Please try again.");
                    }
                  }
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
