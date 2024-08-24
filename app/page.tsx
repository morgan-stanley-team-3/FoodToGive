"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from './components/Header';

 

const HomePage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <Header />  {/* Imported and used the Header component */}

      <main>
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Singapore Food Bank Portal</h1>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_PW2BsuN_3oL96einYF1zuZdMrTO7MTbXLw&s"
              alt="Singapore Food Bank Portal"
              className="w-64 h-64 object-cover rounded-lg"
            />
            <div className="mt-8 md:mt-0 md:ml-8 text-left">
              <h2 className="text-2xl font-semibold mb-2">Work with Us</h2>
              <p className="text-gray-700 mb-4">Create your profile and begin listing your business as a donor!</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => router.push('/mission')}
              >
                Get Started as a Donor
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="mb-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_PW2BsuN_3oL96einYF1zuZdMrTO7MTbXLw&s" alt="Our Mission" className="mx-auto w-12 h-12"/>
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-700 mb-4">We strive to eliminate food wastage by redistributing excess food to those in need.</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => router.push('/mission')}
            >
              Learn More
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="mb-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_PW2BsuN_3oL96einYF1zuZdMrTO7MTbXLw&s" alt="Our Values" className="mx-auto w-12 h-12"/>
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <p className="text-gray-700 mb-4">We value sustainability, compassion, and community support.</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => router.push('/values')}
            >
              Explore Values
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="mb-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_PW2BsuN_3oL96einYF1zuZdMrTO7MTbXLw&s" alt="What We Do" className="mx-auto w-12 h-12"/>
            </div>
            <h3 className="text-xl font-semibold mb-2">What We Do</h3>
            <p className="text-gray-700 mb-4">We collect surplus food from businesses and distribute it to charities and families in need.</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => router.push('/what-we-do')}
            >
              Discover More
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
