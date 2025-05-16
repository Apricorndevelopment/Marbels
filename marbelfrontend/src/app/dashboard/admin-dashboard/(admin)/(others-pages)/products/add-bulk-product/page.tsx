"use client";

import { useState } from "react";
import axiosInstance from "../../../../../../../../utils/axiosInstance";
import Link from "next/link";

export default function CsvUpload() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!csvFile || !zipFile) {
      alert("Please select both CSV and ZIP files");
      return;
    }

    const formData = new FormData();
    formData.append("product_file", csvFile); 
    formData.append("image_zip", zipFile);     
    try {
      const response = await axiosInstance.post("/upload-csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.msg);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6 border border-gray-200">
      <Link href="/dashboard/admin-dashboard/products">
        <button className="bg-green-500 text-white py-2 px-5 text-xl mb-5">Go Back</button>
      </Link>
      <h2 className="text-2xl font-bold text-gray-800 text-center">Upload CSV & Images</h2>

      <div className="flex flex-col space-y-2">
        <label className="block text-sm font-medium text-gray-700">Choose CSV file:</label>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setCsvFile(e.target.files[0]);
            }
          }}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="block text-sm font-medium text-gray-700">Choose ZIP of images:</label>
        <input
          type="file"
          accept=".zip"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setZipFile(e.target.files[0]);
            }
          }}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
        />
      </div>

      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
      >
        Upload
      </button>
    </div>
  );
}
