"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AddCategory = () => {
  const [categorie_name, setCategorieName] = useState("");
  const [categorie_slug, setCategorieSlug] = useState("");
  const [category_image, setCategoryImage] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("categorie_name", categorie_name);
    formData.append("categorie_slug", categorie_slug);
    if (category_image) {
      formData.append("category_image", category_image);
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/categories", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        console.log("Category added:", result);
        router.push("/dashboard/admin-dashboard/category");
      } else {
        const error = await res.json();
        console.error("Error adding category:", error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 mx-2
       rounded-lg shadow-lg w-full">
        <Link href="/dashboard/admin-dashboard/category">
          <button className="bg-green-500 text-white py-2 px-5 text-xl mb-4">
            Go Back
          </button>
        </Link>
        <h1 className="text-2xl font-bold mb-4 text-center">Add Category</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name:</label>
            <input
              type="text"
              value={categorie_name}
              onChange={(e) => setCategorieName(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Slug:</label>
            <input
              type="text"
              value={categorie_slug}
              onChange={(e) => setCategorieSlug(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCategoryImage(e.target.files ? e.target.files[0] : null)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
