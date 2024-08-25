"use client";

import React, { useEffect, useState } from "react";
import Modal from "./Modal"; // Adjust the import path as needed
import Table from "./Table"; // Adjust the import path as needed
import MatchCard from "./MatchCard";
import foodRequest from "./beneficiariesRequest";
import donnorOffer from "./donnorOffer";
import matches from "./matches";
import Header from "../components/Header"; // Adjust the path as needed
import MapComponent from "./map";

// Define the data type for food requests
interface FoodRequest {
  beneficiary: string;
  food_type_request: string;
  food_amount_requested: string;
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
  // const appUrl = process.env.APP_URL;
  const appUrl = "http://localhost:3000";

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const response = await fetch(`${appUrl}/api/donations`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDonorData(data);
      } catch (error) {
        console.error("Error donnor data:", error);
      }
    };

    fetchDonorData();
  }, []);

  useEffect(() => console.log("donnor data:", donorData), [donorData]);

  // Define the columns
  const benColumns: Column<FoodRequest>[] = [
    { header: "beneficiary", accessor: "beneficiary" },
    { header: "food_type_request", accessor: "food_type_request" },
    { header: "food_amount_requested", accessor: "food_amount_requested" },
  ];

  const donorColumns: Column<FoodRequest>[] = [
    { header: "foodName", accessor: "foodName" },
    { header: "foodCategory", accessor: "foodCategory" },
    { header: "deliveryMethod", accessor: "deliveryMethod" },
  ];

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
                  onClick={openBeneficiaryModal}
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
                  {donorData.length}
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
        <section>
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
