"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Avatar,
} from "@material-tailwind/react";
import DonationCard from "./DonationCard"; // Ensure correct import path
import Header from "@/components/Header"; // Adjust the path as needed
import Link from "next/link";

export interface Donation {
    foodName: string;
    foodType: string;
    foodCategory: string;
    consumeByTiming: string;
    quantity: number;
    expiryDate: string;
    donationStatus: string;
    pickUpLocation: string;
    pickUpTime: string;
    dropOffTime: string;
    numberOfServings: number;
    specialHandling: string;
    deliveryMethod: string;
}

// prettier-ignore
export default function DonorDashboardClient() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDonations() {
      try {
        const response = await axios.get('/api/donations'); // Adjust the API endpoint as needed
        setDonations(response.data);
        console.log(response.data);
        console.log(donations);
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDonations();
  }, []);

  useEffect(() => {
    console.log('Updated donations:', donations);
  }, [donations]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!donations.length) {
    return <div>No donations found.</div>;
  }

  return (
    <div className='bg-gray-50 min-h-screen p-8'>
      <Header />
      <div className='flex flex-row items-center justify-between'>
        <div className='mr-3 mb-3 text-3xl font-extrabold w-[90%]'>
          Donor Dashboard
        </div>
        <Link href='/donate' className='w-[10%]'>
          <button className='bg-green-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75'>
            New donation
          </button>
        </Link>
      </div>

      <div className='flex gap-8'>
        <div className='flex-1 min-w-[30%]'>
          <Card
                        shadow={false}
                        className="relative h-full w-full items-end justify-center overflow-hidden text-center"
                    >
                        <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
                        >
                            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                        </CardHeader>
                        <CardBody className="relative py-14 px-6 md:px-12">
                            <Typography
                                variant="h2"
                                color="white"
                                className="mb-6 font-medium leading-[1.5]"
                            >
                                Welcome Back
                            </Typography>
                            <Typography
                                variant="h5"
                                className="mb-4 text-gray-400"
                            >
                                Tania Andrew
                            </Typography>
                        </CardBody>
                    </Card>
        </div>

        {/* Right Column for Donation Cards */}
        <div className='flex-1 min-w-[70%] max-h-[calc(100vh-100px)] overflow-y-auto'>
          <h1 className='text-2xl font-bold mb-4 text-black'>My donations</h1>
          {donations.map((donation, index) => (
            <DonationCard
              key={index} // Add a unique key prop here
              donation={donation}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
