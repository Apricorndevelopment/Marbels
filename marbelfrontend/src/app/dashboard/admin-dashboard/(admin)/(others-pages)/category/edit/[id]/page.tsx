// src/app/dashboard/admin-dashboard/category/edit/[id]/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const EditCategoryPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    categorie_name: "",
    categorie_slug: "",
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/categories/${id}`);
        setFormData({
          categorie_name: res.data.categorie_name,
          categorie_slug: res.data.categorie_slug,
        });
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    if (id) fetchCategory();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/categories/${id}`, formData);
      alert("Category updated successfully!");
      router.push("/dashboard/admin-dashboard/category");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Category Name</label>
          <input
            type="text"
            name="categorie_name"
            value={formData.categorie_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Category Slug</label>
          <input
            type="text"
            name="categorie_slug"
            value={formData.categorie_slug}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditCategoryPage;
