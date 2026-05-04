"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-500 via-emerald-800 to-emerald-700 text-white">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <Image
            src="/Ahall-logo-with-Name.png.bv.webp"
            alt="Atlantic Hall Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>

        <Link
          href="/login"
          className="bg-white text-blue-500 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Login
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 gap-10">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Smart Health Management System
          </h1>

          <p className="text-lg text-emerald-100 mb-8">
            Efficiently manage patient records, appointments, and healthcare
            workflows — all in one secure platform.
          </p>

          <div className="flex gap-4">
            <Link
              href="/login"
              className="bg-white text-blue-500 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-100 transition"
            >
              Get Started
            </Link>

            <Link
              href="#features"
              className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-500 transition"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-2xl"
        >
          <Image
            src="/home.jpg"
            alt="Healthcare Illustration"
            width={800}
            height={450}
            className="rounded-2xl shadow-2xl w-full object-cover"
          />
        </motion.div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="bg-white text-gray-800 py-16 px-8 md:px-16 rounded-t-3xl"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Patient Records",
              desc: "Securely store and access patient data anytime.",
            },
            {
              title: "Appointment Scheduling",
              desc: "Easily manage bookings and reduce waiting times.",
            },
            {
              title: "Analytics & Insights",
              desc: "Track performance and improve healthcare delivery.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl shadow-md border hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-emerald-100 text-sm">
        © {new Date().getFullYear()} Atlantic Hall Health System
      </footer>
    </div>
  );
}
