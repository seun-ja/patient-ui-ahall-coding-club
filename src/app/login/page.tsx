"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { login } from "@/services/auth";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      router.push("/home");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Illustration */}
      <div className="hidden md:flex w-1/2 relative h-64 md:h-auto flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-80 rounded-tr-3xl rounded-br-3xl" />

        <Image
          src="/login-illustration.jpg"
          alt="Illustration"
          fill
          style={{ objectFit: "cover" }}
          className="relative z-10"
          priority
        />
      </div>

      {/* Right Login Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gradient-to-b from-white to-gray-50 p-6 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl flex-shrink-0"
        >
          {/* Company Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/Ahall-logo-with-Name.png.bv.webp" // Put your logo in public/
              alt="Company Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </div>

          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Welcome Back
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Sign in to your account
          </p>

          {error && (
            <div className="text-red-500 mb-4 text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            &copy; {new Date().getFullYear()} Atlantic Hall
          </p>
        </motion.div>
      </div>
    </div>
  );
}
