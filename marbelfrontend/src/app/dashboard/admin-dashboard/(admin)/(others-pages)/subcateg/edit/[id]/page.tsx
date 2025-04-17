"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const EditSubcategory = () => {
  const { id } = useParams();
  const router = useRouter();

  const [subcatName, setSubcatName] = useState("");
  const [subcatSlug, setSubcatSlug] = useState("");
  const [parentCatId, setParentCatId] = useState("");
  const [categories, setCategories] = useState<{ id: number; categorie_name: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, subRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/categories"),
          axios.get(`http://127.0.0.1:8000/api/subcategories/${id}`),
        ]);

        setCategories(catRes.data);
        setSubcatName(subRes.data.subcategorie_name);
        setSubcatSlug(subRes.data.subcategorie_slug);
        setParentCatId(subRes.data.category_id);
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/subcategories/${id}`, {
        subcategorie_name: subcatName,
        subcategorie_slug: subcatSlug,
        category_id: parentCatId,
      });
      router.push("/dashboard/admin-dashboard/subcateg");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="p-8">
      <Link href="/dashboard/admin-dashboard/subcateg">
        <button className="bg-green-600 text-white px-4 py-2 rounded mb-4">
          Go Back
        </button>
      </Link>
      <h1 className="text-2xl font-bold mb-6">Edit Subcategory</h1>
      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block font-medium">Subcategory Name</label>
          <input
            type="text"
            value={subcatName}
            onChange={(e) => setSubcatName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Subcategory Slug</label>
          <input
            type="text"
            value={subcatSlug}
            onChange={(e) => setSubcatSlug(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Parent Category</label>
          <select
            value={parentCatId}
            onChange={(e) => setParentCatId(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.categorie_name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Update Subcategory
        </button>
      </form>
    </div>
  );
};

export default EditSubcategory;
