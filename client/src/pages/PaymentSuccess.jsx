import React from 'react';
import { useState } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';

export default function PaymentSuccess() { // URL for the invoice
    const location=useLocation()
    const { url } = location.state || {}
    const {allowed}=location.state||false;
  // Function to handle invoice download
  const handleDownload = () => {
    console.log(url)
    if (url) {
      window.open(url, '_blank'); // Open the invoice in a new tab
    } else {
      alert('Invoice URL is not available.');
    }
  };
if(!allowed){
   return <Navigate to="/" />
}
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-gray-700 text-center">Thank you for your payment. Your transaction has been completed successfully.</p>
      <button
        onClick={handleDownload}
        className="mt-6 px-4 py-2 bg-blue-500 transition-all duration-200 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Download Invoice
      </button>
    </div></div>
  );
}
