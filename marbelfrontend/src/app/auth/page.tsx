"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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
    if (!formData.email) {
      toast.error("Email is required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send-otp-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(result.message);
        setOtpSent(true);
      } else {
        console.error("OTP Error:", result);
        toast.error(result.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error("Network Error:", err);
      toast.error("Network error while sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp || !formData.email) {
      toast.error("Enter OTP and email");
      return;
    }

    setLoading(true);
    try {
      if (formData.otp.length === 6) {
        toast.success("OTP will be verified during registration");
        setOtpVerified(true);
      } else {
        toast.error("OTP must be 6 digits");
      }
    } catch (error) {
      console.error("Error while verifying OTP:", error);
      toast.error("Something went wrong while verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setFormError(null);
  
    if (isSignUp) {
      if (!otpSent) {
        toast.error("Please get OTP first");
        return;
      }
      if (!otpVerified) {
        toast.error("Please verify your OTP first");
        return;
      }
      if (formData.password !== formData.password_confirmation) {
        toast.error("Passwords do not match");
        return;
      }
    }
  
    setLoading(true);
    const url = isSignUp
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/register`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/login`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          otp: formData.otp,
        }),
      });
      const data = await response.json();
  
      if (response.ok) {
        setFormError(null);
  
        if (isSignUp) {
          toast.success("Account created successfully! Please sign in.");
          setSignUpSuccess(true);
          setIsSignUp(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            otp: "",
            password: "",
            password_confirmation: "",
            role: "user",
          });
          setOtpSent(false);
          setOtpVerified(false);
        } else {
          localStorage.setItem("token", data.token);
          toast.success("Logged In Successfully");
  
          if (formData.role === "admin") {
            router.push("/dashboard/admin-dashboard");
          } else if (formData.role === "seller") {
            router.push("/dashboard/seller-dashboard");
          } else {
            router.push("/dashboard/user-dashboard");
          }
        }
      } else {
        const errorMessage = data.message || data.error || "An error occurred";
  
        // Check if error message contains "unauthorized", "invalid", or any of the keywords for login issues
        if (!isSignUp) {
          if (errorMessage.toLowerCase().includes("invalid email address")) {
            setFormError("Incorrect email address");
          } else if (errorMessage.toLowerCase().includes("incorrect password")) {
            setFormError("Incorrect password");
          } else if (errorMessage.toLowerCase().includes("invalid role selected")) {
            setFormError("Incorrect role selected");
          } else {
            setFormError("Incorrect email, password, or role");
          }
        }
        else {
          setFormError(errorMessage);
        }
  
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred.");
      setFormError("An unexpected error occurred.");
    } finally {
      setLoading(false);
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

        {signUpSuccess && !isSignUp && (
          <div className="mb-4 text-green-600 font-semibold">
            Account created successfully! Please sign in.
          </div>
        )}

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
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-md placeholder-gray-500"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-md placeholder-gray-500"
                required
              />

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading || otpSent}
                  className={`flex-1 py-2 rounded-md ${
                    loading || otpSent
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {loading ? "Sending..." : otpSent ? "OTP Sent" : "Send OTP"}
                </button>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  className="flex-1 w-full p-3 border rounded-md placeholder-gray-500"
                  required
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={loading || otpVerified || !formData.otp}
                  className={`flex-1 py-2 rounded-md ${
                    loading || otpVerified || !formData.otp
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {otpVerified ? "Verified" : "Verify"}
                </button>
              </div>

              {otpSent && !otpVerified && (
                <p className="text-sm text-gray-600">
                  OTP sent to your email. Please check your inbox.
                </p>
              )}

              {otpVerified && (
                <p className="text-sm text-green-600">
                  OTP verified successfully!
                </p>
              )}

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
                required
              >
                <option value="user">User</option>
                <option value="seller">Seller</option>
              </select>
            </>
          )}

          {!isSignUp && (
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-md placeholder-gray-500"
              required
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md placeholder-gray-500"
            required
          />

          {isSignUp && (
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              value={formData.password_confirmation}
              onChange={handleChange}
              className="w-full p-3 border rounded-md placeholder-gray-500"
              required
            />
          )}

          {!isSignUp && (
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            >
              <option value="user">User</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          )}

          {formError && (
            <div className="text-red-600 text-sm text-left">{formError}</div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`w-full py-3 rounded-md transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#1B3A57] text-white hover:bg-[#164060]"
            }`}
            type="submit"
          >
            {loading
              ? "Processing..."
              : isSignUp
              ? "Sign Up"
              : "Sign In"}
          </motion.button>
        </form>

        <p className="mt-4 text-gray-600">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setOtpSent(false);
              setOtpVerified(false);
              setSignUpSuccess(false);
              setFormError(null);
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
