"use client";

import React from "react";
import Payment from "../../../public/images/cards_stack.png";

const PaymentLinkPage = () => {
  const simulateAsyncProcess = async () => {
    return new Promise((resolve) => setTimeout(resolve, 3000));
  };

  // Redirect to the payment page after the async process
  const handleRedirect = async () => {
    await simulateAsyncProcess();
    window.open("https://buy.stripe.com/test_3csbLF7e71Xw92w000", "_blank");
  };
  const thePicture = Payment.src;
  return (
    <div
      className="flex justify-center items-center  w-[100%] h-[100vh]"
      style={{ backgroundColor: "#BEBDBB" }}
    >
      <div
        className="h-[100%] w-[46%] bg-no-repeat mr-[8%] rounded-3xl"
        style={{
          background: `url(${thePicture})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex items-center space-x-3.8"
        style={{ backgroundColor: "white" }}
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Continue Your Payment
          </h1>
          <p className="text-gray-600">
            You will be redirected to the payment page in a few seconds. If you
            are not redirected, please click the button below.
          </p>
        </div>
        {/* <Image src={Payment} alt="Payment Image" width={300} height={200} /> */}
        <button
          onClick={handleRedirect}
          className="px-4 py-2 font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentLinkPage;










//commit