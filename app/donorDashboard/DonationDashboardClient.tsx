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
import Header from "../components/Header"; // Adjust the path as needed

export interface Donation {
    foodName: string;
    foodCategory: string;
    timeOfPreparation: string;
    timeOfConsumption: string;
    ingredient: string;
    quantity: number;
    perishable: string;
    expiryDate: string;
    donationStatus: string;
    pickUpLocation: string;
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
                const response = await axios.get("/api/donations"); // Adjust the API endpoint as needed
                setDonations(response.data);
                console.log(response.data);
                console.log(donations);
            } catch (error) {
                console.error("Error fetching donations:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDonations();
    }, []);

    useEffect(() => {
        console.log("Updated donations:", donations);
    }, [donations]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!donations.length) {
        return <div>No donations found.</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <Header />

            <div className="flex gap-8">
                {/* Left Column for Welcome Card */}
                <div className="flex-1 min-w-[30%]">
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
                <div className="flex-1 min-w-[70%]">
                    <h1 className="text-2xl font-bold mb-4 text-black">
                        My donations
                    </h1>
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
