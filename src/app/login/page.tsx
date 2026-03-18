"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { login } from "@/services/auth";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    // Changed to h-screen and overflow-hidden to lock the view
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-white">
      {/* 1. Top Image Section: h-[30vh] ensures it only takes 30% of mobile height */}
      <div className="relative h-[30vh] md:h-full w-full md:w-1/2 shrink-0">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-purple-600 opacity-20 md:opacity-80 md:rounded-tr-3xl md:rounded-br-3xl" />
        <Image
          src="/login-illustration.jpg"
          alt="Illustration"
          fill
          style={{ objectFit: "cover" }}
          className="relative z-10 md:rounded-tr-3xl md:rounded-br-3xl"
          priority
        />
      </div>

      {/* 2. Bottom Form Section: flex-1 fills the remaining 70% of the screen */}
      <div className="flex-1 flex flex-col justify-center items-center bg-linear-to-b from-white to-gray-50 p-4 md:p-12 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          // Added max-h-full to ensure the card never grows taller than its container
          className="w-full max-w-md bg-sky-500 p-6 md:p-10 rounded-3xl shadow-2xl border border-blue-400/20 max-h-full overflow-y-auto no-scrollbar"
        >
          {/* Company Logo - Reduced margin for mobile */}
          <div className="flex justify-center mb-4 md:mb-6">
            <Image
              src="/Ahall-logo-with-Name.png.bv.webp"
              alt="Company Logo"
              width={120}
              height={40}
              className="object-contain brightness-0 invert" // Makes logo white to match sky-500 theme
            />
          </div>

          <h1 className="text-xl md:text-3xl font-bold text-center mb-1 text-white">
            Welcome Back
          </h1>
          <p className="text-center text-blue-50 mb-6 md:mb-8 text-xs md:text-sm">
            Sign in to your account
          </p>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white text-xs p-2 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 md:gap-4"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-none rounded-xl p-3.5 md:p-4 bg-white/90 text-black outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
            />

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-none rounded-xl p-3.5 md:p-4 pr-12 bg-white/90 text-black outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-white text-sky-600 p-3.5 md:p-4 rounded-xl font-bold transition-all active:scale-[0.98] mt-2 shadow-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-blue-100 text-[10px] md:text-xs mt-6 md:mt-10">
            &copy; {new Date().getFullYear()} Atlantic Hall
          </p>
        </motion.div>
      </div>
    </div>
  );
}
