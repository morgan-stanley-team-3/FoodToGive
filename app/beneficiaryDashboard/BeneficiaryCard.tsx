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
import { Request } from "./BeneficiaryDashboardClient";

interface RequestCardProps {
    request: Request;
}

const BeneficiaryCard: React.FC<RequestCardProps> = ({ request }) => {
    console.log(request);
    return (
        <Card
            shadow={false}
            className="relative mb-4 border border-black rounded-lg p-4"
        >
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    <FaBowlFood className="inline-block mr-2" />
                    {request.foodName} [{request.foodCategory}]
                </Typography>
                <Typography className="mb-2">
                    <FaQuestionCircle className="inline-block mr-2" />
                    Quantity: {request.quantity}
                </Typography>
                <Typography className="mb-2">
                    <FaClock className="inline-block mr-2" />
                    Time of Preparation: {request.timeOfPreparation}
                </Typography>
                <Typography className="mb-2">
                    <FaCalendarAlt className="inline-block mr-2" />
                    Time of Consumption: {request.timeOfConsumption}
                </Typography>
                <Typography className="mb-2">
                    <FaUtensils className="inline-block mr-2" />
                    Ingredients: {request.ingredient}
                </Typography>
                <Typography className="mb-2">
                    <FaQuestionCircle className="inline-block mr-2" />
                    Perishable: {request.perishable}
                </Typography>
                <Typography className="mb-2">
                    <FaQuestionCircle className="inline-block mr-2" />
                    request Status: {request.requestStatus}
                </Typography>
                <Typography className="mb-2">
                    <FaQuestionCircle className="inline-block mr-2" />
                    Delivery Method: {request.deliveryMethod}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button className="text-black">withdraw</Button>
            </CardFooter>
        </Card>
    );
};

export default BeneficiaryCard;
