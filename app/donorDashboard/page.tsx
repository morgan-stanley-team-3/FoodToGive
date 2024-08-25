import DonationDashboardClient from "./DonationDashboardClient"; // Client component

export default async function DonorDashboardPage() {
    const appUrl = process.env.APP_URL;

    // Fetch data on the server side
    const res = await fetch(`${appUrl}/api/donations`, {
        cache: "no-store",
    });
    const donations = await res.json();

    return (
        // Render the client component and pass the data as props
        <></>
        // <DonationDashboardClient donations={donations} />
    );
}
