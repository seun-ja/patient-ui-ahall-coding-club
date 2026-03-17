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

  const toggleSidebar = () => {
    if (open) {
      setProfileOpen(false);
    }

    setOpen(!open);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <motion.div
      animate={{ width: open ? 240 : 60 }}
      transition={{ duration: 0.25 }}
      className="bg-white shadow-lg h-full flex flex-col overflow-hidden border-r border-gray-200"
    >
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="h-20 p-3 hover:bg-gray-100 transition text-3xl"
      >
        ☰
      </button>

      {/* Navigation */}
      <nav className="flex-1 mt-4 px-2">
        {/* Profile */}
        <div className="mb-2">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded-lg transition"
          >
            <span className="mr-2">👤</span>
            {open && <span className="font-medium text-gray-700">Profile</span>}
          </button>

          <AnimatePresence>
            {profileOpen && open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-8 mt-2 flex flex-col space-y-1"
              >
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm transition"
                >
                  View Profile
                </a>

                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm transition"
                >
                  Change Password
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Future links */}
        {/*<a
          href="#"
          className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg transition"
        >
          <span className="mr-2">📄</span>
          {open && <span className="text-gray-700">Other Section</span>}
        </a>*/}
      </nav>
      {/* Bottom Section: Sign Out */}
      <div className="px-2 mb-4">
        <button
          onClick={handleSignOut}
          className="flex items-center w-full px-3 py-2 hover:bg-red-100 rounded-lg transition text-red-600"
        >
          <span className="mr-2">🚪</span>
          {open && <span className="font-medium">Sign Out</span>}
        </button>
      </div>
    </motion.div>
  );
}
