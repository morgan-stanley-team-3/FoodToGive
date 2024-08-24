"use client";

import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center mb-12 bg-white shadow-md p-4">
      <div className="text-3xl font-bold text-green-600">Food2Give - Singapore Food Bank </div>
      <nav className="space-x-6 text-lg">
        <a href="/" className="text-gray-700 hover:text-green-600">Home</a>
        <a href="/mission" className="text-gray-700 hover:text-green-600">Our Mission</a>
        <a href="/values" className="text-gray-700 hover:text-green-600">Our Values</a>
        <a href="/what-we-do" className="text-gray-700 hover:text-green-600">What We Do</a>
        <a href="/donor-login" className="text-gray-700 hover:text-green-600">Donor Login</a>
        <a href="/beneficiary-login" className="text-gray-700 hover:text-green-600">Beneficiary Login</a>
      </nav>
    </header>
  );
};

export default Header;
