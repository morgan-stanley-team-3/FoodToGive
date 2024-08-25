"use client";


const PostLoginNavbar: React.FC = () => {
  return (
    <header className="flex justify-between items-center mb-12 bg-white shadow-md p-4">
      <div className="text-2xl font-bold text-green-600">FoodToGive - Singapore Food Bank </div>
      <nav className="space-x-6 text-lg">
        <a href="/homepage" className="text-gray-700 hover:text-green-600">Home</a>
        <a href="/account" className="text-gray-700 hover:text-green-600">Account</a>
        <a href='/chatbot' className='text-gray-700 hover:text-green-600'>
          Chat
        </a>
      </nav>
    </header>
  );
};

export default PostLoginNavbar;
