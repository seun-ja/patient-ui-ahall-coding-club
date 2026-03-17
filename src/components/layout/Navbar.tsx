"use client";

import Image from "next/image";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  return (
    <header className="h-20 bg-emerald-900 border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Image
          src="/Ahall-logo-with-Name.png.bv.webp"
          alt="logo"
          width={120}
          height={40}
        />
      </div>
    </header>
  );
}
