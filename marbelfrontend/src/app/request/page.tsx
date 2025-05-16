"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Req } from "../components/buyingreq";
import { Counter } from "../components/counterup";

interface Enquiry {
  name: string;
  product: string | null;
  message: string | null;
}

export default function Request() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [requirement, setRequirement] = useState("");
  const [qnt, setQnt] = useState("");
  const [unit, setUnit] = useState("Pieces");

  const handleSubmit = async () => {
    if (!requirement || !qnt || !unit) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/quotations`, {
        requirement,
        qnt,
        unit,
      });
      alert("Quotation sent successfully!");
      // Optional: clear fields
      setRequirement("");
      setQnt("");
      setUnit("Pieces");
    } catch (error) {
      console.error("Failed to submit quotation", error);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enquiries`)
      .then((res) => res.json())
      .then((data) => setEnquiries(data))
      .catch((err) => console.error("Failed to fetch enquiries", err));
  }, []);

  return (
    <>
      <div className="sm:m-4 text-black bg-white border rounded-lg shadow-xl flex lg:justify-between flex-wrap justify-center items-center p-8">
        <div className="sm:text-3xl flex flex-col gap-4 sm:gap-16">
          <h1>REQUEST FOR QUOTATION </h1>
          <div className="flex gap-4 sm:gap-12">
            <div className="flex gap-2 sm:gap-4 items-center">
              <i className="bi bi-journal-arrow-up text-4xl border-[1.5px] border-black rounded-full p-3"></i>
              <h1>
                <Counter end={30000} /> + <br /> Requests
              </h1>
            </div>
            <div className="flex gap-4 items-center">
              <i className="bi bi-basket text-4xl border-[1.5px] border-black rounded-full p-3"></i>
              <h1>
                <Counter end={42000} /> + <br /> Products
              </h1>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-0 sm:p-6">
          <h2 className="text-2xl font-semibold">Want to get quotations?</h2>
          <input
            type="text"
            placeholder="What are you looking for.."
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            className="sm:w-full p-3 mt-4 border text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-[12px] sm:text-sm mt-1">
            Please input the name of product you need!
          </p>
          <div className="flex gap-4 mt-4">
            <input
              type="number"
              placeholder="Quantity"
              value={qnt}
              onChange={(e) => setQnt(e.target.value)}
              className="flex-1 w-full p-3 text-gray-700 border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="p-3 text-gray-700 border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Pieces</option>
              <option>Boxes</option>
              <option>Foot</option>
              <option>Meter</option>
            </select>
          </div>
          <p className="text-red-500 text-[13px] sm:text-sm mt-1">
            Please Input your Need Product Number!
          </p>
          <button
            onClick={handleSubmit}
            className="w-full mt-4 p-3 text-black bg-yellow-400 rounded-md hover:bg-yellow-300 transition"
          >
            Request For Quotation
          </button>
        </div>
      </div>

      <div className="mx-4 my-7 text-3xl font-bold">
        <h1>Buying Requests</h1>
      </div>

      {enquiries.length === 0 ? (
        <p className="p-4">No enquiries available yet.</p>
      ) : (
        enquiries.map((enquiry, index) => <Req key={index} req={enquiry} />)
      )}
    </>
  );
}
