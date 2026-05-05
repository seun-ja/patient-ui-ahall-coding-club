"use client";

import Image from "next/image";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 h-16 md:h-20 bg-blue-500 flex items-center justify-between px-6 text-white shadow-md">
      {/* Hamburger (VISIBLE ONLY ON MOBILE) */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-white/10 active:scale-95 transition md:hidden"
      >
        <span className="text-2xl">☰</span>
      </button>

      {/* Logo - Centered on mobile, left-aligned on desktop if needed */}
      <div className="flex-1 flex justify-center md:justify-start">
        <Image
          src="/Ahall-logo-with-Name.png.bv.webp"
          alt="logo"
          width={110}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Profile Placeholder/Right Side */}
      {/* <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
        <span className="text-sm">👤</span>
      </div> */}
    </header>
  );
}
