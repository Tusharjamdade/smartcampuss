import Link from 'next/link';
import React from 'react';
import { FaUtensils, FaWallet, FaCoffee } from 'react-icons/fa';
import { FaPrint } from 'react-icons/fa';



function Page() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-20">
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        {/* Canteen Card 1 */}
        <Link href={"/user/home/canteen"}>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
          <div className="p-6 flex flex-col items-center text-center">
            <FaUtensils className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Canteen Services</h3>
            <p className="text-gray-600 mb-4">Order food and book seats in advance to save time and enjoy a hassle-free dining experience at your campus canteen</p>
            {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none"></button> */}
          </div>
        </div>
        </Link>

        {/* Canteen Card 2 */}
        <Link href={"/user/home/xerox"}>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
          <div className="p-6 flex flex-col items-center text-center">
          <FaPrint className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Xerox Services</h3>
            <p className="text-gray-600 mb-4">Easily send PDFs for printing to nearby Xerox shops and collect your documents without waiting in long queues.</p>
            {/* <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 focus:outline-none">Add Funds</button> */}
          </div>
        </div>
        </Link>

        {/* Canteen Card 3 */}
        {/* <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
          <div className="p-6 flex flex-col items-center text-center">
            <FaCoffee className="text-brown-600 text-4xl mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Coffee Subscription</h3>
            <p className="text-gray-600 mb-4">Enjoy your favorite coffees every day with the canteen's coffee subscription service.</p>
            <button className="bg-brown-600 text-white px-4 py-2 rounded-full hover:bg-brown-700 focus:outline-none">Subscribe Now</button>
          </div>
        </div> */}

      </div>
    </div>
  );
}

export default Page;
