import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import {
    FaClock,
    FaCalendarAlt,
    FaUtensils,
    FaQuestionCircle,
} from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { Donation } from "./DonationDashboardClient";

interface DonationCardProps {
    donation: Donation;
}

const DonationCard: React.FC<DonationCardProps> = ({ donation }) => {
    console.log(donation);
    return (
        <></>
        // <Card
        //     shadow={false}
        //     className="relative mb-4 border border-black rounded-lg p-4"
        // >
        //     <CardBody>
        //         <Typography variant="h5" color="blue-gray" className="mb-2">
        //             <FaBowlFood className="inline-block mr-2" />
        //             {donation.foodName} [{donation.foodCategory}]
        //         </Typography>
        //         <Typography className="mb-2">
        //             <FaQuestionCircle className="inline-block mr-2" />
        //             Quantity: {donation.quantity}
        //         </Typography>
        //         <Typography className="mb-2">
        //             <FaClock className="inline-block mr-2" />
        //             Time of Preparation: {donation.timeOfPreparation}
        //         </Typography>
        //         <Typography className="mb-2">
        //             <FaCalendarAlt className="inline-block mr-2" />
        //             Time of Consumption: {donation.timeOfConsumption}
        //         </Typography>
        //         <Typography className="mb-2">
        //             <FaUtensils className="inline-block mr-2" />
        //             Ingredients: {donation.ingredient}
        //         </Typography>
        //         <Typography className="mb-2">
        //             <FaQuestionCircle className="inline-block mr-2" />
        //             Perishable: {donation.perishable}
        //         </Typography>
        //         <Typography className="mb-2">
        //             <FaQuestionCircle className="inline-block mr-2" />
        //             Donation Status: {donation.donationStatus}
        //         </Typography>
        //         <Typography className="mb-2">
        //             <FaQuestionCircle className="inline-block mr-2" />
        //             Delivery Method: {donation.deliveryMethod}
        //         </Typography>
        //     </CardBody>
        //     <CardFooter className="pt-0">
        //         <Button className="text-black">withdraw</Button>
        //     </CardFooter>
        // </Card>
    );
};

export default DonationCard;
