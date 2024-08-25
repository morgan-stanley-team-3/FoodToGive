"use client";

import React, { useEffect, useState } from "react";
import Modal from "./Modal"; // Adjust the import path as needed
import Table from "./Table"; // Adjust the import path as needed
import MatchCard from "./MatchCard";
// import foodRequest from "./beneficiariesRequest";
// import donnorOffer from "./donnorOffer";
import matches from "./matches";
<<<<<<< HEAD
import Header from "../components/Header"; // Adjust the path as needed
import { FaHandsHelping, FaHandHolding } from "react-icons/fa"; // Import Font Awesome icons

// import MapComponent from "./map";

import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./map"), {
  ssr: false,
});
=======
import Header from "@/components/Header"; // Adjust the path as needed
>>>>>>> 42a61304da8d99d894fd98e05dced8c1b6a8b1c3

// Define the data type for food requests
interface FoodRequest {
  foodCategory: string;
  foodType: string;
  agencyName: string;
}

interface DonorOffer {
  foodName: string;
  foodCategory: string;
  deliveryMethod: string;
}

interface Column<T> {
  header: string;
  accessor: keyof T;
}

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBeneficiaryModalOpen, setIsBeneficiaryModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openBeneficiaryModal = () => setIsBeneficiaryModalOpen(true);
  const closeBeneficiaryModal = () => setIsBeneficiaryModalOpen(false);

  const handleAccept = () => {
    console.log("Accepted");
  };

  const handleReject = () => {
    console.log("Rejected");
  };

  const [donorData, setDonorData] = useState([]);
  const [foodRequest, setFoodRequest] = useState([]);

  // const appUrl = process.env.APP_URL;
  const appUrl = "http://localhost:3000";

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const [donorResponse, requestResponse] = await Promise.all([
          fetch(`${appUrl}/api/donations`, { cache: "no-store" }),
          fetch(`${appUrl}/api/requests`, { cache: "no-store" }),
        ]);

        const donorData = await donorResponse.json();
        setDonorData(donorData);

        const requestData = await requestResponse.json();
        setFoodRequest(requestData);
      } catch (error) {
        console.error("Error fetching donor or request data:", error);
      }
    };

    fetchDonorData();
  }, []);

  useEffect(() => console.log("donnor data:", donorData), [donorData]);

  // Define the columns
  const benColumns: Column<FoodRequest>[] = [
    { header: "agencyName", accessor: "agencyName" },
    { header: "foodType", accessor: "foodType" },
    { header: "foodCategory", accessor: "foodCategory" },
  ];

  const donorColumns: Column<DonorOffer>[] = [
    { header: "foodName", accessor: "foodName" },
    { header: "foodCategory", accessor: "foodCategory" },
    { header: "deliveryMethod", accessor: "deliveryMethod" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <Header />
      <main className="max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white p-8 rounded-lg shadow-lg">
          <div className="absolute inset-0 bg-black/50 rounded-lg" />
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4">Welcome Admin</h1>
            <p className="text-lg">
              We're glad to have you here. Explore our features and get started
              on your journey with us.
            </p>
          </div>
        </div>

        <section className="bg-white rounded-lg shadow-lg p-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="p-6 bg-[#F0F4E4] rounded-lg shadow-md flex items-center cursor-pointer hover:bg-[#E0E8D8] transition-colors"
              onClick={openBeneficiaryModal}
            >
              <div className="flex flex-col items-center w-full">
                <FaHandsHelping className="h-16 w-16 text-[#A2C765] mb-4" />
                <div className="flex flex-col items-center justify-center text-center">
                  <h2 className="text-2xl font-semibold mb-2 text-[#A2C765]">
                    Food Request
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    Cumulative requests by beneficiaries awaiting fulfillment.
                  </p>
                  <p className="text-4xl font-semibold text-gray-700">
                    {foodRequest.length}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="p-6 bg-[#F0F4E4] rounded-lg shadow-md flex items-center cursor-pointer hover:bg-[#E0E8D8] transition-colors"
              onClick={openModal}
            >
              <div className="flex flex-col items-center w-full text-center">
                <FaHandHolding className="h-16 w-16 text-[#A2C765] mb-4" />
                <h2 className="text-2xl font-semibold mb-2 text-[#A2C765]">
                  Donor Offer
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  Cumulative Donation awaiting distribution
                </p>
                <p className="text-4xl font-semibold text-gray-700">
                  {donorData.length}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F0F4E4] p-12 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-8 text-[#A2C765]">
            Match Recommendation
          </h1>

          <p className="text-6xl font-bold text-gray-800 leading-tight text-center mb-6">
            {matches.length}
          </p>

          <p className="text-lg text-gray-700 mb-8 text-center">
            The matching recommendations are based on several factors including
            distance, availability of stock, and other relevant parameters. The
            top recommendations are displayed at the top of the list to help you
            easily find the best matches.
          </p>

          <div className="h-96 overflow-y-auto">
            {matches.map((match, index) => (
              <div key={index} className="mb-6">
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
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <MapComponent />
        </section>
      </main>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-semibold mb-4">Food Request Details</h2>
        <Table data={donorData} columns={donorColumns} />
      </Modal>

      <Modal isOpen={isBeneficiaryModalOpen} onClose={closeBeneficiaryModal}>
        <h2 className="text-2xl font-semibold mb-4">Food Request Details</h2>
        <Table data={foodRequest} columns={benColumns} />
      </Modal>
    </div>
  );
};

export default Dashboard;
