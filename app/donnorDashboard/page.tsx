"use client";

import React from "react";
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

import donations from "./donnorOffer";

const Dashboard: React.FC = () => {
  console.log(donations);
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <header className="flex justify-between items-center mb-12 bg-white shadow-md p-4">
        <div className="text-3xl font-bold text-green-600">
          Food2Give - Singapore Food Bank{" "}
        </div>
        <nav className="space-x-6 text-lg">
          <a href="/" className="text-gray-700 hover:text-green-600">
            Home
          </a>
          <a href="/mission" className="text-gray-700 hover:text-green-600">
            Our Mission
          </a>
          <a href="/values" className="text-gray-700 hover:text-green-600">
            Our Values
          </a>
          <a href="/what-we-do" className="text-gray-700 hover:text-green-600">
            What We Do
          </a>
          <a href="/donor-login" className="text-gray-700 hover:text-green-600">
            Donor Login
          </a>
          <a
            href="/beneficiary-login"
            className="text-gray-700 hover:text-green-600"
          >
            Beneficiary Login
          </a>
        </nav>
      </header>

      <div className="flex gap-8">
        {/* Left Column for Welcome Card */}
        <div className="flex-1 min-w-[33%]">
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
              <Typography variant="h5" className="mb-4 text-gray-400">
                Tania Andrew
              </Typography>
              {/* Uncomment and configure Avatar if needed */}
              {/* <Avatar
                size="xl"
                variant="circular"
                alt="tania andrew"
                className="border-2 border-white"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              /> */}
            </CardBody>
          </Card>
        </div>

        {/* Right Column for Donation Cards */}
        <div className="flex-1 min-w-[66%]">
          <h1 className="text-2xl font-bold mb-4 text-black">My donations</h1>
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
};

export default Dashboard;
