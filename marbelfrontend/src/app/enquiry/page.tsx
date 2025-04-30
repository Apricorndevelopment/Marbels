"use client";

import { useState , useEffect} from "react";
import { AxiosError } from "axios";
import axiosInstance from "../../../utils/axiosInstance";
import { useSearchParams } from "next/navigation";

interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  product: string;
  message: string;
}

interface EnquiryResponse {
  message: string;
  data: EnquiryFormData;
}

export default function EnquiryPage() {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: "",
    email: "",
    phone: "",
    product: "",
    message: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const searchParams = useSearchParams();
const productFromQuery = searchParams.get("product");

useEffect(() => {
  if (productFromQuery) {
    setFormData((prev) => ({ ...prev, product: productFromQuery }));
  }
}, [productFromQuery]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axiosInstance.post<EnquiryResponse>(
        "/enquiries",
        formData
      );

      if (response.status === 201) {
        setSuccessMessage(response.data.message);
        setFormData({ name: "", email: "", phone: "", product: "", message: "" });
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-3 py-12">
      <h2 className="text-3xl font-semibold mb-6 text-center text-black">Product Enquiry Form</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-6 space-y-4 border border-gray-200"
      >
        <label className="text-sm font-medium text-gray-700">Enter Your Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          required
        />

        <label className="text-sm font-medium text-gray-700">Enter Your Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          required
        />

        <label className="text-sm font-medium text-gray-700">Enter Your Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          required
        />

        <label className="text-sm font-medium text-gray-700">Enter the product name</label>
        <input
          type="text"
          name="product"
          value={formData.product}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />

        <label className="text-sm font-medium text-gray-700">Enter the message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={4}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 resize-none"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Enquiry"}
        </button>

        {successMessage && <p className="text-green-600 text-sm mt-2">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
}
