"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import React from "react";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  // Client-side token check and redirect
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }
  }, [router]);

  // Render homepage content only after mount (browser)
  if (typeof window === "undefined") return null;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Navbar */}
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page content */}
        <main className="p-6 flex-1">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/Ahall-logo-with-Name.png.bv.webp"
              alt="Atlantic Hall Logo"
              className="h-16 object-contain"
              width={150}
              height={32}
            />
          </div>

          {/* Welcome message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to the Health Management System
          </h1>
          <p className="text-gray-600 mb-6">
            Use the sidebar to navigate to your profile or other sections.
          </p>

          {/* Optional: Landing illustration */}
          <div className="flex justify-center">
            <Image
              src="/login-illustration.jpg"
              alt="Landing Illustration"
              className="w-full max-w-lg rounded-xl shadow-lg"
              width={500}
              height={300}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
