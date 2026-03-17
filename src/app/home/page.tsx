"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import AppointmentForm from "@/components/ui/AppointmentForm";
import { bookAppointments } from "@/services/appointments";
import { AppointmentCreated, AppointmentRequest } from "@/types/appointment";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Claims } from "@/services/jwt";
import jwt from "@/services/jwt";

export default function LandingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [claims, setClaims] = useState<Claims | null>(null);

  const [appointments, setAppointments] = useState<AppointmentCreated[]>([]);

  const [loading, setLoading] = useState(true);

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
      return;
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading...</p>;
  }

  if (!claims) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-8 space-y-8 overflow-auto">
          {/* Welcome */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Welcome back, {claims.firstName} 👋
            </h1>
            <p className="text-gray-500">
              Manage your appointments and health records
            </p>
          </div>

          {/* Next Appointment */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex justify-between items-center">
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
                    {appointments[0].doctorFirstName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(appointments[0].date).toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="bg-teal-400 hover:bg-emerald-900 text-white px-5 py-2 rounded-lg transition"
            >
              Book Appointment
            </button>
          </div>

          {/* Upcoming Appointments */}
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
                    key={appt.appointmentId}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        Dr. {appt.doctorFirstName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {new Date(appt.date).toLocaleString()}
                      </p>
                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        appt.status
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {appt.status ? "Confirmed" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Appointment Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold text-emerald-900">
                  Book Appointment
                </h3>

                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <AppointmentForm
                onSubmit={async (data: AppointmentRequest) => {
                  const created = await bookAppointments(data);

                  setAppointments((prev) => [created, ...prev]);
                  setModalOpen(false);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
