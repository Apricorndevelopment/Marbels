"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Category {
  id: number;
  categorie_name: string;
}

const AddSubcategory = () => {
  const [subName, setSubName] = useState("");
  const [subSlug, setSubSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch all categories for the select input
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newSubcategory = {
      subcategorie_name: subName,
      subcategorie_slug: subSlug,
      category_id: parseInt(categoryId),
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/subcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubcategory),
      });

      if (res.ok) {
        console.log("Subcategory added!");
        router.push("/dashboard/admin-dashboard/subcateg");
      } else {
        console.error("Failed to add subcategory");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full h-[90vh]">
        <Link href="/dashboard/admin-dashboard/subcateg">
          <button className="bg-green-500 text-white py-2 px-5 text-xl">Go Back</button>
        </Link>
        <h1 className="text-2xl font-bold mb-4 text-center">Add Subcategory</h1>
        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label className="block text-sm font-medium text-gray-700">Subcategory Name:</label>
            <input
              type="text"
              value={subName}
              onChange={(e) => setSubName(e.target.value)}
              required
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subcategory Slug:</label>
            <input
              type="text"
              value={subSlug}
              onChange={(e) => setSubSlug(e.target.value)}
              required
              className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Parent Category:</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categorie_name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 mt-4 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Subcategory
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubcategory;
