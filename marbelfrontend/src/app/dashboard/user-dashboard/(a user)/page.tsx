"use client";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  country_code: string;
  role: "admin" | "seller" | "user";
}

const countryCodes = [
  { code: "+91", flag: "🇮🇳" },
  { code: "+1", flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+971", flag: "🇦🇪" },
  { code: "+92", flag: "🇵🇰" },
  { code: "+880", flag: "🇧🇩" },
  { code: "+61", flag: "🇦🇺" },
  { code: "+81", flag: "🇯🇵" },
  { code: "+49", flag: "🇩🇪" },
  { code: "+33", flag: "🇫🇷" },
  { code: "+39", flag: "🇮🇹" },
  { code: "+86", flag: "🇨🇳" },
  { code: "+966", flag: "🇸🇦" },
  { code: "+974", flag: "🇶🇦" },
  { code: "+93", flag: "🇦🇫" },
  { code: "+7", flag: "🇷🇺" },
  { code: "+34", flag: "🇪🇸" },
  { code: "+46", flag: "🇸🇪" },
  { code: "+60", flag: "🇲🇾" },
  { code: "+63", flag: "🇵🇭" },
  { code: "+82", flag: "🇰🇷" },
  { code: "+62", flag: "🇮🇩" },
  { code: "+65", flag: "🇸🇬" },
  { code: "+20", flag: "🇪🇬" },
  { code: "+27", flag: "🇿🇦" },
];

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<User & {
    password?: string;
    password_confirmation?: string;
  }>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    country_code: "+91",
    role: "user",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
            setFormData({
              ...data.user,
              password: "",
              password_confirmation: "",
            });
          }
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (res.ok) {
        alert("Profile updated successfully!");
        setUser(data.user);
        setEditMode(false);
      } else {
        alert("Update failed.");
        console.error(data.errors || data);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong.");
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="p-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-8 bg-white dark:bg-gray-900 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        User Profile
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">

        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Name</p>
          {editMode ? (
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
          ) : (
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              {user.name}
            </p>
          )}
        </div>

        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</p>
          {editMode ? (
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
          ) : (
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              {user.email}
            </p>
          )}
        </div>

        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Country Code
          </p>
          {editMode ? (
            <select
              name="country_code"
              value={formData.country_code || ""}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            >
              <option value="">Select Country Code</option>
              {countryCodes.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              {user.country_code}
            </p>
          )}
        </div>

        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone</p>
          {editMode ? (
            <input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
          ) : (
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              {user.phone}
            </p>
          )}
        </div>

        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Role</p>
          <p className="text-sm font-medium text-gray-800 dark:text-white capitalize">
            {user.role}
          </p>
        </div>

        {editMode && (
          <>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                New Password
              </p>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="p-2 border rounded w-full"
              />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Confirm Password
              </p>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                className="p-2 border rounded w-full"
              />
            </div>
          </>
        )}
      </div>

      <div className="mt-6">
        {editMode ? (
          <div className="flex gap-4">
            <button
              onClick={handleProfileUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
