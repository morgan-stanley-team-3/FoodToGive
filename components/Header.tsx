'use client';

import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const sessionData = useSession();
  const router = useRouter();

  return (
    <header className='flex justify-between items-center mb-12 bg-white shadow-md p-4'>
      <div className='text-3xl font-bold text-green-600'>
        <a href='/'>FoodToGive - Singapore Food Bank</a>
      </div>
      <nav className='space-x-6 text-lg'>
        <a href='/' className='text-gray-700 hover:text-[#A2C765]'>
          Home
        </a>
        <div
          className='relative inline-block text-gray-700'
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <a href='#' className='hover:text-[#A2C765]'>
            About
          </a>
          {isDropdownOpen && (
            <div className='absolute bg-white shadow-md mt-1 rounded-md'>
              <a
                href='/mission'
                className='block px-4 py-2 hover:bg-gray-100 hover:text-[#A2C765]'
              >
                Our Mission
              </a>
              <a
                href='/values'
                className='block px-4 py-2 hover:bg-gray-100 hover:text-[#A2C765]'
              >
                Our Values
              </a>
              <a
                href='/what-we-do'
                className='block px-4 py-2 hover:bg-gray-100 hover:text-[#A2C765]'
              >
                What We Do
              </a>
            </div>
          )}
        </div>
        {!sessionData.data?.user && (
          <a href='/login' className='text-gray-700 hover:text-[#A2C765]'>
            Login
          </a>
        )}
        {!sessionData.data?.user && (
          <a href='/signup' className='text-gray-700 hover:text-[#A2C765]'>
            Signup
          </a>
        )}
        {sessionData.data?.user && (
          <a href='/account' className='text-gray-700 hover:text-[#A2C765]'>
            Account
          </a>
        )}
        {sessionData.data?.user && (
          <Button
            className='bg-[#A2C765] text-white text-md rounded-full hover:bg-[#8BBE3D]'
            onClick={async () => {
              await signOut();
              router.replace('/');
            }}
          >
            Logout
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
