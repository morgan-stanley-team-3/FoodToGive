"use client";

import React, { useState } from "react";

const Header: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex justify-between items-center mb-12 bg-white shadow-md p-4">
      <div className="text-3xl font-bold text-[#A2C765]">
        Food2Give - Singapore Food Bank
      </div>
      <nav className="space-x-6 text-lg">
        <a href="/" className="text-gray-700 hover:text-[#A2C765]">
          Home
        </a>
        <div
          className="relative inline-block text-gray-700"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <a href="#" className="hover:text-[#A2C765]">
            About
          </a>

          {isDropdownOpen && (
            <div className="absolute bg-white shadow-md mt-1 rounded-md">
              <a
                href="/mission"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-[#A2C765]"
              >
                Our Mission
              </a>
              <a
                href="/values"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-[#A2C765]"
              >
                Our Values
              </a>
              <a
                href="/what-we-do"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-[#A2C765]"
              >
                What We Do
              </a>
              <a
                href="/adminDashboard"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-[#A2C765]"
              >
                admin
              </a>
              <a
                href="/donorDashboard"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-[#A2C765]"
              >
                donor
              </a>
            </div>
          )}
        </div>
        <a href="/login" className="text-gray-700 hover:text-[#A2C765]">
          Login
        </a>
        <a href="/signup" className="text-gray-700 hover:text-[#A2C765]">
          Signup
        </a>
      </nav>
    </header>
  );
};

export default Header;
