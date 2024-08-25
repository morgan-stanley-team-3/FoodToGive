"use client";

import React, { useState } from "react";
import Modal from "./Modal"; // Adjust the import path as needed
import Table from "./Table"; // Adjust the import path as needed
import MatchCard from "./MatchCard";
import foodRequest from "./beneficiariesRequest";
import donnorOffer from "./donnorOffer";
import matches from "./matches";
import Header from "@/components/Header"; // Adjust the path as needed

// Define the data type for food requests
interface FoodRequest {
    beneficiary: string;
    food_type_request: string;
    food_amount_requested: string;
}

const Dashboard: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAccept = () => {
        console.log("Accepted");
    };

    const handleReject = () => {
        console.log("Rejected");
    };

    // Define the columns
    // const columns: Column<FoodRequest>[] = [
    //     { header: "Beneficiary", accessor: "beneficiary" },
    //     { header: "Food Type Request", accessor: "food_type_request" },
    //     { header: "Food Amount Requested", accessor: "food_amount_requested" },
    // ];

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <Header />

            <main className="max-w-7xl mx-auto">
                <section className="bg-white rounded-lg shadow-lg p-12 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 bg-green-50 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-green-700">
                                Food Request by Beneficiaries
                            </h2>

                            <div className="flex items-center justify-between">
                                <p className="text-2xl font-semibold text-gray-700">
                                    {foodRequest.length}
                                </p>
                                <p
                                    onClick={openModal}
                                    className="text-green-500 underline cursor-pointer hover:text-green-600"
                                >
                                    Expand
                                </p>
                            </div>
                        </div>

                        <div className="p-6 bg-green-50 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-green-700">
                                Donor Offer
                            </h2>

                            <div className="flex items-center justify-between">
                                <p className="text-2xl font-semibold text-gray-700">
                                    {donnorOffer.length}
                                </p>
                                <p
                                    onClick={openModal}
                                    className="text-green-500 underline cursor-pointer hover:text-green-600"
                                >
                                    Expand
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-green-100 p-12 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-center mb-8 text-green-600">
                        Match Recommendation
                    </h1>
                    <p className="text-6xl font-bold text-gray-800 leading-tight text-center mb-12">
                        {matches.length}
                    </p>
                    {matches.map((match, index) => (
                        <div key={index} className="mb-4">
                            <MatchCard
                                donorPic="/images/images.jpeg"
                                beneficiaryPic="/images/images.jpeg"
                                donorName={match.donor}
                                beneficiaryName={match.beneficiary}
                                foodType={match.food_type}
                                quantityDonated={match.quantity_donated}
                                quantityRequested={match.quantity_requested}
                                matchDate={match.match_date}
                                onAccept={handleAccept}
                                onReject={handleReject}
                            />
                        </div>
                    ))}

                    <div className="text-center">Link</div>
                </section>
            </main>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-2xl font-semibold mb-4">
                    Food Request Details
                </h2>
                {/* <Table data={foodRequest} columns={columns} /> */}
            </Modal>
        </div>
    );
};

export default Dashboard;
