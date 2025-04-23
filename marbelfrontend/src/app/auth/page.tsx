"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    password: "",
    password_confirmation: "",
    role: "user",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    if (!formData.phone) {
      toast.error("Phone number is required");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: formData.phone }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("OTP sent successfully");
        setOtpSent(true);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error while sending OTP:", error);
      toast.error("Something went wrong while sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp || !formData.phone) {
      toast.error("Enter OTP and phone number");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: Number(formData.phone),
          otp: Number(formData.otp),
        }),        
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("OTP verified successfully");
        setOtpVerified(true);
      } else {
        toast.error(data.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("Error while verifying OTP:", error);
      toast.error("Something went wrong while verifying OTP");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp && !otpVerified) {
      toast.error("Please verify your phone number before signing up");
      return;
    }

    const url = isSignUp
      ? "http://127.0.0.1:8000/api/register"
      : "http://127.0.0.1:8000/api/login";

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
        localStorage.setItem("token", data.token);
        toast.success(
          isSignUp ? "Account Created Successfully" : "Logged In Successfully"
        );

        if (isSignUp) {
          router.push("/auth");
        } else {
          if (formData.role === "admin") {
            router.push("/dashboard/admin-dashboard");
          } else if (formData.role === "seller") {
            router.push("/dashboard/seller-dashboard");
          } else {
            router.push("/");
          }
        }
      } else {
        toast.error(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
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
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-md placeholder-gray-500"
              />
              {otpSent && (
                <p className="text-green-600 text-sm mt-2">OTP sent successfully to your phone</p>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-md"
                >
                  Send OTP
                </button>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  className="flex-1 p-3 border rounded-md placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="flex-1 bg-green-500 text-white py-2 rounded-md"
                >
                  Verify OTP
                </button>
              </div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
              >
                <option value="user">User</option>
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
              <option value="user">User</option>
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
            onClick={() => {
              setIsSignUp(!isSignUp);
              setOtpSent(false);
              setOtpVerified(false);
            }}
            className="text-[#FFA559] font-bold hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
