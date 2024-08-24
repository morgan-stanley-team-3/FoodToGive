import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  FaApple,
  FaClock,
  FaCalendarAlt,
  FaUtensils,
  FaQuestionCircle,
} from "react-icons/fa";

interface DonationProps {
  donation: {
    foodName: string;
    timeOfPreparation: string;
    timeOfConsumption: string;
    ingredient: string;
    perishable: string;
    donationStatus: string;
  };
}

const DonationCard: React.FC<DonationProps> = ({ donation }) => {
  return (
    <Card
      shadow={false}
      className="relative mb-4 border border-black rounded-lg p-4"
    >
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          <FaApple className="inline-block mr-2" />
          {donation.foodName}
        </Typography>
        <Typography className="mb-2">
          <FaClock className="inline-block mr-2" />
          Time of Preparation: {donation.timeOfPreparation}
        </Typography>
        <Typography className="mb-2">
          <FaCalendarAlt className="inline-block mr-2" />
          Time of Consumption: {donation.timeOfConsumption}
        </Typography>
        <Typography className="mb-2">
          <FaUtensils className="inline-block mr-2" />
          Ingredient: {donation.ingredient}
        </Typography>
        <Typography className="mb-2">
          <FaQuestionCircle className="inline-block mr-2" />
          Perishable: {donation.perishable}
        </Typography>
        <Typography className="mb-2">
          <FaQuestionCircle className="inline-block mr-2" />
          Donation Status: {donation.donationStatus}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button className="text-black">withdraw</Button>
      </CardFooter>
    </Card>
  );
};

export default DonationCard;
