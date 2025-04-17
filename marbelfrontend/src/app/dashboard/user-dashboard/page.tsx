"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function UserDashboard() {
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      // If not authenticated, redirect to the login page
      router.push("/auth");
    }
  }, [router]);

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    // Redirect to the login page
    router.push("/auth");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ffed91e8] p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-[#1B3A57] mb-6">User  Dashboard</h2>
        <p className="text-gray-600">Welcome to your User Dashboard!</p>
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}