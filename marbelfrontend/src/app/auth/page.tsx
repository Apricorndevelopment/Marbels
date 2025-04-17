"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // Updated import for useRouter
import { toast } from "react-hot-toast";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "user", // Default role
  });
  const router = useRouter(); // Initialize useRouter

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isSignUp ? "http://127.0.0.1:8000/api/register" : "http://127.0.0.1:8000/api/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Store the token
        toast.success(isSignUp ? "Account Created Successfully" : "Logged In Successfully"); // Use toast for notifications
        
        // Redirect based on user role
        if (isSignUp) {
          // After signup, you might want to redirect to a different page or show a success message
          router.push("/auth"); // Redirect to login page after signup
        } else {
          // Redirect based on user role
          if (formData.role === 'admin') {
            router.push("/dashboard/admin-dashboard");
          } else if (formData.role === 'seller') {
            router.push("/dashboard/seller-dashboard");
          } else {
            router.push("/dashboard/user-dashboard");
          }
        }
      } else {
        toast.error(data.message || "An error occurred"); // Use toast for error messages
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred."); // Handle unexpected errors
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ffed91e8] p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center"
      >
        <h2 className="text-2xl font-bold text-[#1B3A57] mb-6">
          {isSignUp ? "Create an Account" : "Sign In"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-md placeholder-gray-500"
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
              >
                <option value="user">User  </option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md placeholder-gray-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md placeholder-gray-500"
          />
          {isSignUp && (
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              value={formData.password_confirmation}
              onChange={handleChange}
              className="w-full p-3 border rounded-md placeholder-gray-500"
            />
          )}
          {!isSignUp && (
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            >
              <option value="user">User  </option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#1B3A57] text-white py-3 rounded-md hover:bg-[#164060] transition"
            type="submit"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </motion.button>
        </form>

        <p className="mt-4 text-gray-600">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#FFA559] font-bold hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}