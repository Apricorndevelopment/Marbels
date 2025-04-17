"use client";

import React, { useEffect, useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  product: string | null;
  message: string | null;
}

const EnquiryPage = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/enquiries")
      .then((res) => res.json())
      .then((data) => setEnquiries(data))
      .catch((err) => console.error("Failed to fetch enquiries", err));
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this enquiry?");
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:8000/api/enquiries/${id}`, {
        method: "DELETE",
      });
      setEnquiries((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="p-3">
      <PageBreadcrumb pageTitle="Enquiries" />
      <h1 className="text-xl mb-4 font-bold">Customer Enquiries</h1>

      <div className="w-full overflow-x-auto">
        <table className="w-full max-w-[750px] table-fixed border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th className="w-6 border px-2 py-2">#</th>
              <th className="w-20 border px-2 py-2">Name</th>
              <th className="w-44 border px-2 py-2">Email</th>
              <th className="w-24 border px-2 py-2">Phone</th>
              <th className="w-24 border px-2 py-2">Product</th>
              <th className="w-[350px] border px-2 py-2">Message</th>
              <th className="w-20 border px-2 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No enquiries submitted yet.
                </td>
              </tr>
            ) : (
              enquiries.map((enquiry, index) => (
                <tr key={enquiry.id} className="text-sm text-center align-top">
                  <td className="border px-2 py-2">{index + 1}</td>
                  <td className="border px-2 py-2 break-all">{enquiry.name}</td>
                  <td className="border px-2 py-2 break-all">{enquiry.email}</td>
                  <td className="border px-2 py-2 break-all">{enquiry.phone}</td>
                  <td className="border px-2 py-2 break-all">{enquiry.product || "-"}</td>
                  <td className="border px-2 py-2 text-left">
                    <div className="whitespace-pre-wrap break-words break-all">
                      {enquiry.message || "-"}
                    </div>
                  </td>
                  <td className="border px-2 py-2">
                    <button
                      onClick={() => handleDelete(enquiry.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiryPage;
