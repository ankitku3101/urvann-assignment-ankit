import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#0c3e26] text-white py-6 flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="mb-2">
        <img src="/logo.png" alt="Logo" className="h-10 w-10" />
      </div>

      {/* Company Info */}
      <div className="text-center">
        <p className="font-semibold">Urvann Pvt. Ltd.</p>
        <p className="text-sm">At your service since 2025</p>
      </div>

      {/* Made with love + GitHub */}
      <div className="mt-2 flex items-center gap-2 text-sm text-[#ddfed8]">
        <span>
          Made with <span className="text-red-500">❤️</span> by Ankit
        </span>
        <Link href="https://github.com/ankitku3101" target="_blank" className="hover:text-gray-300">
          <FaGithub size={18} />
        </Link>
      </div>
    </footer>
  );
};
