import Header from "../components/Header";

const DonorLoginPage: React.FC = () => {
    return (
        <div>
            <div className="bg-gray-50 min-h-screen p-8">
                <Header />
                <div className="mt-10 flex">
                    <div className="flex-col">
                        <h1 className="text-3xl font-bold">Donor Login</h1>
                        <form className="mt-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder=""
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonorLoginPage;
