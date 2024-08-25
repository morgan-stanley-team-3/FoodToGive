'use client';

import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const sessionData = useSession();
  const router = useRouter();

  return (
    <header className='flex justify-between items-center mb-12 bg-white shadow-md p-4'>
      <a href='/'>
        <div className='flex flex-row items-center'>
          <span>
            <Image
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_PW2BsuN_3oL96einYF1zuZdMrTO7MTbXLw&s'
              alt='Our Mission'
              width={52}
              height={52}
              className='mr-2'
            />
          </span>
          <span className='text-3xl font-bold text-[#A2C765]'>FoodToGive</span>
        </div>
      </a>
      <nav className='space-x-6 text-lg'>
        {!sessionData.data?.user && (
          <a href='/' className='text-gray-700 hover:text-[#A2C765]'>
            Home
          </a>
        )}

        {sessionData.data?.user && (
          <a
            href={`/${sessionData.data?.user.role}Dashboard`}
            className='text-gray-700 hover:text-[#A2C765]'
          >
            Dashboard
          </a>
        )}

        <a
          href='/chatbot'
          className='block px-4 py-2 hover:bg-gray-100 hover:text-[#A2C765]'
        >
          Chatbot
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
          <a href='/signup' className='text-gray-700 hover:text-[#A2C765]'>
            Sign Up
          </a>
        )}
        {!sessionData.data?.user && (
          <Button
            onClick={() => {
              router.push('/login');
            }}
            className='bg-[#A2C765] text-white text-md rounded-full hover:bg-[#8BBE3D]'
          >
            Login
          </Button>
        )}
        {sessionData.data?.user && (
          <a href='/account' className='text-gray-700 hover:text-[#A2C765]'>
            Account
          </a>
        )}
        {sessionData.data?.user && (
          <Button
            className='bg-[#A2C765] text-white text-md rounded-full hover:bg-[#8BBE3D]'
            onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              await signOut();
              window.location.href = '/';
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
