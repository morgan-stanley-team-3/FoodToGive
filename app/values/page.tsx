"use client";

import React from 'react';

const ValuesPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <header className="flex justify-between items-center mb-12">
        <div className="text-3xl font-bold text-green-600">Singapore Food Bank</div>
        <nav className="space-x-6 text-lg">
          <a href="/" className="text-gray-700 hover:text-green-600">Home</a>
          <a href="/mission" className="text-gray-700 hover:text-green-600">Our Mission</a>
          <a href="/what-we-do" className="text-gray-700 hover:text-green-600">What We Do</a>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto">
        <section className="bg-white rounded-lg shadow-lg p-12 mb-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-green-600">Our Values</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-green-50 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-green-700">Sustainability</h2>
              <p className="text-gray-700">
                We are committed to creating sustainable solutions that reduce food waste and promote environmental stewardship. We believe that through responsible practices, we can protect our planet for future generations.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-green-700">Compassion</h2>
              <p className="text-gray-700">
                Compassion is at the heart of everything we do. We strive to serve our community with kindness, respect, and empathy, ensuring that everyone is treated with dignity and care.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-green-700">Community</h2>
              <p className="text-gray-700">
                We believe in the power of community. By fostering strong relationships and working together, we can achieve more and create lasting change for those in need.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-green-100 p-12 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-8">How We Live Our Values</h2>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li className="mb-4">We operate with transparency and accountability to maintain trust and integrity.</li>
            <li className="mb-4">We prioritize partnerships that align with our values and mission.</li>
            <li className="mb-4">We empower individuals and communities to take action against hunger and food waste.</li>
          </ul>
          <div className="text-center mt-8">
            <a href="/contact-us" className="inline-block bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700">
              Contact Us
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ValuesPage;
