"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* SIDEBAR */}
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* HEADER */}
            <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100 bg-gray-50/50">
              {/*<span className="font-bold text-blue-500 text-lg">
                Navigation
              </span>*/}

              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-500 transition"
              >
                ✕
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 flex flex-col justify-between p-6">
              <div className="space-y-3">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center w-full px-4 py-3 rounded-2xl transition-all ${
                    profileOpen
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-xl">👤</span>
                  <span className="ml-4 font-semibold">Profile</span>
                  <span
                    className={`ml-auto transition-transform ${profileOpen ? "rotate-180" : ""}`}
                  >
                    ▾
                  </span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-12 overflow-hidden space-y-2 text-sm"
                    >
                      <button
                        onClick={() => router.push("/profile")}
                        className="w-full text-left py-2 text-gray-500 hover:text-emerald-600 transition"
                      >
                        View Profile
                      </button>
                      <p className="py-2 text-gray-500 hover:text-emerald-600 cursor-pointer transition">
                        Change Password
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={handleSignOut}
                className="flex items-center px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 font-semibold transition-colors"
              >
                <span className="text-xl">🚪</span>
                <span className="ml-4">Sign Out</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
