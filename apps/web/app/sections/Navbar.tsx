'use client';

import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = ["Home", "Products", "Delivery", "Blog"];

  return (
    <div className="text-sm text-white w-full">
      <div className="text-center font-medium py-2 bg-[#0c3e26] text-white text-xs md:text-sm">
        <p>
          Exclusive Price Drop! Hurry,{" "}
          <span className="underline underline-offset-2">Offer Ends Soon!</span>
        </p>
      </div>

      <nav className="relative h-[70px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white text-gray-900 transition-all shadow">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-[#0c3e26] tracking-tight">
          <img src="/logo.png" alt="Urvann Logo" className="md:h-8 md:w-8 h-4 w-4" />
          <span>Urvann</span>
        </Link>

        <ul className="hidden md:flex items-center space-x-8 md:pl-28">
          {navItems.map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="hover:text-green-500 transition">
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Add Plant */}
        <Link href="/addplant" className="md:inline hidden bg-white hover:bg-gray-50 border border-gray-300 ml-20 px-9 py-2 rounded-full active:scale-95 transition-all text-center">
          Add Plant
        </Link>

        {/* Mobile Menu Button */}
        <button
          aria-label="menu-btn"
          type="button"
          className="menu-btn inline-block md:hidden active:scale-90 transition"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
            <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z"/>
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="mobile-menu absolute top-[70px] left-0 w-full bg-white shadow-sm p-6 md:hidden z-50">
            <ul className="flex flex-col space-y-4 text-lg">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-sm"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Add Plant */}
            <Link
              href="/addplant"
              className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full inline-flex items-center justify-center"
              onClick={() => setIsMobileOpen(false)}
            >
              Add Plant
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};
